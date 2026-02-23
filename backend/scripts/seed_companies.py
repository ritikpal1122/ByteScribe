"""
Seed the companies table with real tech company data.

Fetches descriptions from Wikipedia and logos from Clearbit.
Idempotent — skips companies whose slug already exists.

Usage:
    cd backend
    python scripts/seed_companies.py
"""

import asyncio
import sys
from pathlib import Path

# Ensure the backend package is importable when running as a script
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import httpx
from slugify import slugify as _slugify
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from app.config import get_settings
from app.models.company import Company

# ---------------------------------------------------------------------------
# Curated company list — (display name, domain, wikipedia slug)
# ---------------------------------------------------------------------------

COMPANIES: list[tuple[str, str, str]] = [
    # FAANG
    ("Google", "google.com", "Google"),
    ("Meta", "meta.com", "Meta_Platforms"),
    ("Apple", "apple.com", "Apple_Inc."),
    ("Amazon", "amazon.com", "Amazon_(company)"),
    ("Netflix", "netflix.com", "Netflix"),
    # Big Tech
    ("Microsoft", "microsoft.com", "Microsoft"),
    ("Salesforce", "salesforce.com", "Salesforce"),
    ("Oracle", "oracle.com", "Oracle_Corporation"),
    ("Adobe", "adobe.com", "Adobe_Inc."),
    ("IBM", "ibm.com", "IBM"),
    ("Intel", "intel.com", "Intel"),
    ("Cisco", "cisco.com", "Cisco"),
    ("SAP", "sap.com", "SAP"),
    ("VMware", "vmware.com", "VMware"),
    ("Qualcomm", "qualcomm.com", "Qualcomm"),
    # Cloud / Infrastructure
    ("Snowflake", "snowflake.com", "Snowflake_Inc."),
    ("Databricks", "databricks.com", "Databricks"),
    ("Cloudflare", "cloudflare.com", "Cloudflare"),
    ("HashiCorp", "hashicorp.com", "HashiCorp"),
    ("MongoDB", "mongodb.com", "MongoDB_Inc."),
    ("Elastic", "elastic.co", "Elastic_NV"),
    ("Confluent", "confluent.io", "Confluent_(software_company)"),
    ("DigitalOcean", "digitalocean.com", "DigitalOcean"),
    # AI / ML
    ("OpenAI", "openai.com", "OpenAI"),
    ("Anthropic", "anthropic.com", "Anthropic"),
    ("NVIDIA", "nvidia.com", "Nvidia"),
    ("DeepMind", "deepmind.com", "Google_DeepMind"),
    ("Hugging Face", "huggingface.co", "Hugging_Face"),
    ("Scale AI", "scale.com", "Scale_AI"),
    ("Cohere", "cohere.com", "Cohere"),
    # Fintech
    ("Stripe", "stripe.com", "Stripe_(company)"),
    ("Block", "block.xyz", "Block,_Inc."),
    ("Robinhood", "robinhood.com", "Robinhood_Markets"),
    ("Coinbase", "coinbase.com", "Coinbase"),
    ("PayPal", "paypal.com", "PayPal"),
    ("Plaid", "plaid.com", "Plaid_(company)"),
    ("Affirm", "affirm.com", "Affirm_(company)"),
    ("Brex", "brex.com", "Brex"),
    ("Chime", "chime.com", "Chime_(company)"),
    # Rideshare / Delivery
    ("Uber", "uber.com", "Uber"),
    ("Lyft", "lyft.com", "Lyft"),
    ("DoorDash", "doordash.com", "DoorDash"),
    ("Instacart", "instacart.com", "Instacart"),
    ("Grab", "grab.com", "Grab_(company)"),
    # Social / Communication
    ("X", "x.com", "X_(social_network)"),
    ("Snap", "snap.com", "Snap_Inc."),
    ("Pinterest", "pinterest.com", "Pinterest"),
    ("Reddit", "reddit.com", "Reddit"),
    ("Discord", "discord.com", "Discord"),
    ("LinkedIn", "linkedin.com", "LinkedIn"),
    ("ByteDance", "bytedance.com", "ByteDance"),
    ("Telegram", "telegram.org", "Telegram_(software)"),
    # Enterprise SaaS
    ("Atlassian", "atlassian.com", "Atlassian"),
    ("Twilio", "twilio.com", "Twilio"),
    ("Datadog", "datadoghq.com", "Datadog"),
    ("Splunk", "splunk.com", "Splunk"),
    ("ServiceNow", "servicenow.com", "ServiceNow"),
    ("Workday", "workday.com", "Workday,_Inc."),
    ("Palantir", "palantir.com", "Palantir_Technologies"),
    ("Palo Alto Networks", "paloaltonetworks.com", "Palo_Alto_Networks"),
    ("CrowdStrike", "crowdstrike.com", "CrowdStrike"),
    ("Okta", "okta.com", "Okta"),
    ("HubSpot", "hubspot.com", "HubSpot"),
    ("Zendesk", "zendesk.com", "Zendesk"),
    # E-commerce / Retail Tech
    ("Shopify", "shopify.com", "Shopify"),
    ("eBay", "ebay.com", "EBay"),
    ("Etsy", "etsy.com", "Etsy"),
    ("Walmart Labs", "walmart.com", "Walmart"),
    ("Wayfair", "wayfair.com", "Wayfair"),
    # Gaming
    ("Roblox", "roblox.com", "Roblox"),
    ("Unity Technologies", "unity.com", "Unity_Technologies"),
    ("Epic Games", "epicgames.com", "Epic_Games"),
    # Other notable tech
    ("Airbnb", "airbnb.com", "Airbnb"),
    ("Spotify", "spotify.com", "Spotify"),
    ("Zoom", "zoom.us", "Zoom_Video_Communications"),
    ("Dropbox", "dropbox.com", "Dropbox_(service)"),
    ("DocuSign", "docusign.com", "DocuSign"),
    ("Figma", "figma.com", "Figma_(software)"),
    ("Notion", "notion.so", "Notion_(productivity_software)"),
    ("Vercel", "vercel.com", "Vercel"),
    ("Canva", "canva.com", "Canva"),
    ("Grammarly", "grammarly.com", "Grammarly"),
    ("GitLab", "gitlab.com", "GitLab"),
    ("GitHub", "github.com", "GitHub"),
    ("Asana", "asana.com", "Asana_(software)"),
    ("Slack", "slack.com", "Slack_(software)"),
]

WIKI_API = "https://en.wikipedia.org/api/rest_v1/page/summary"
CLEARBIT_LOGO = "https://logo.clearbit.com"


def _make_slug(name: str) -> str:
    """Deterministic slug (no random suffix) so idempotency check works."""
    return _slugify(name, max_length=200)


async def fetch_description(client: httpx.AsyncClient, wiki_slug: str) -> str | None:
    """Fetch the first-paragraph extract from Wikipedia."""
    try:
        resp = await client.get(
            f"{WIKI_API}/{wiki_slug}",
            headers={"User-Agent": "SeedCompaniesBot/1.0 (educational project)"},
        )
        if resp.status_code == 200:
            data = resp.json()
            return data.get("extract")
    except httpx.HTTPError:
        pass
    return None


async def get_logo_url(client: httpx.AsyncClient, domain: str) -> str | None:
    """Validate that Clearbit has a logo for the domain."""
    url = f"{CLEARBIT_LOGO}/{domain}"
    try:
        resp = await client.head(url, follow_redirects=True)
        if resp.status_code == 200:
            return url
    except httpx.HTTPError:
        pass
    return None


async def seed_company(
    session: AsyncSession,
    client: httpx.AsyncClient,
    name: str,
    domain: str,
    wiki_slug: str,
) -> str:
    """Seed a single company. Returns 'added', 'skipped', or 'failed'."""
    slug = _make_slug(name)

    # Idempotency check
    existing = await session.execute(select(Company).where(Company.slug == slug))
    if existing.scalar_one_or_none() is not None:
        return "skipped"

    try:
        description = await fetch_description(client, wiki_slug)
        logo_url = await get_logo_url(client, domain)

        company = Company(
            name=name,
            slug=slug,
            logo_url=logo_url,
            website=f"https://{domain}",
            description=description,
            experience_count=0,
            problem_count=0,
        )
        session.add(company)
        await session.flush()
        return "added"
    except Exception as exc:
        print(f"  ERROR seeding {name}: {exc}")
        return "failed"


async def main() -> None:
    settings = get_settings()

    engine = create_async_engine(settings.DATABASE_URL, echo=False)
    session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    added = skipped = failed = 0
    total = len(COMPANIES)

    print(f"Seeding {total} companies ...\n")

    async with httpx.AsyncClient(timeout=15.0) as client:
        async with session_factory() as session:
            for i, (name, domain, wiki_slug) in enumerate(COMPANIES, 1):
                result = await seed_company(session, client, name, domain, wiki_slug)

                if result == "added":
                    added += 1
                    print(f"  [{i}/{total}] + {name}")
                elif result == "skipped":
                    skipped += 1
                    print(f"  [{i}/{total}] ~ {name} (exists)")
                else:
                    failed += 1
                    print(f"  [{i}/{total}] ! {name} (failed)")

                # Rate-limit: 200ms between requests
                if i < total:
                    await asyncio.sleep(0.2)

            await session.commit()

    await engine.dispose()

    print(f"\nSeeded {added} companies ({skipped} skipped, {failed} failed)")


if __name__ == "__main__":
    asyncio.run(main())
