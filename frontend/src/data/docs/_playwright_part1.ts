import type { DocCategory } from './types';

export const PW_PART1_CATEGORIES: DocCategory[] = [
  /* ================================================================== */
  /*  Category 1 — Getting Started                                       */
  /* ================================================================== */
  {
    id: 'pw-getting-started',
    label: 'Getting Started',
    icon: 'Rocket',
    entries: [
      {
        id: 'pw-start-intro',
        title: 'Introduction to Playwright',
        difficulty: 'beginner',
        tags: ['playwright', 'introduction', 'automation', 'testing'],
        sections: [
          {
            heading: 'What Is Playwright?',
            content:
              'Playwright is a modern browser automation framework developed by Microsoft. It enables reliable end-to-end testing and browser automation for Chromium, Firefox, and WebKit with a single API. Unlike Selenium, Playwright was designed from the ground up for the modern web, with built-in auto-waiting, network interception, and multi-tab support.\n\nPlaywright supports multiple languages — Python, JavaScript/TypeScript, Java, and .NET — but all share the same underlying engine. The Python API uses either a synchronous or asynchronous interface, making it flexible for different use cases from simple scripts to complex test frameworks.',
            tip: 'Playwright downloads browser binaries automatically during installation, so you do not need to manage browser drivers separately like with Selenium.',
            analogy: 'If Selenium is like a universal TV remote that works with any TV but needs setup, Playwright is like a smart home controller — it comes pre-configured, knows about modern features, and handles the complexity for you.',
          },
          {
            heading: 'Key Advantages',
            content:
              'Playwright offers several advantages over older automation tools. Auto-waiting is the biggest — Playwright automatically waits for elements to be actionable before performing operations, eliminating the need for explicit waits in most cases. It also supports multiple browser contexts (isolated sessions) within a single browser instance, which is much faster than launching separate browsers.\n\nOther notable features include network interception and mocking, built-in screenshot and video capture, trace recording for debugging, and native support for shadow DOM, iframes, and file uploads without workarounds.',
            code: `# Key features comparison
# Feature              | Selenium | Playwright
# --------------------|----------|----------
# Auto-waiting         | No       | Yes
# Network interception | No       | Yes
# Multi-browser binary | Manual   | Automatic
# Shadow DOM support   | Limited  | Native
# Video recording      | No       | Built-in
# Trace viewer         | No       | Built-in
# Browser contexts     | No       | Yes (fast isolation)
# Parallel execution   | Via Grid | Native per-context

print("Playwright: Modern automation for the modern web")`,
            output: `Playwright: Modern automation for the modern web`,
          },
          {
            heading: 'Sync vs Async API',
            content:
              'Playwright for Python offers two APIs: synchronous (sync_api) and asynchronous (async_api). The sync API is simpler and looks like regular Python code — great for scripts and beginners. The async API uses Python\'s asyncio, which is better for advanced scenarios like running multiple browsers concurrently or integrating with async web frameworks.\n\nBoth APIs have identical functionality — the only difference is how you call them. The sync API blocks until each operation completes, while the async API uses await and can run operations concurrently.',
            code: `# Synchronous API (simpler, recommended for most use cases)
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")
    print(page.title())
    browser.close()

# Asynchronous API (for advanced concurrent scenarios)
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto("https://example.com")
        print(await page.title())
        await browser.close()

asyncio.run(main())`,
            output: `Example Domain
Example Domain`,
            tip: 'Start with the sync API unless you have a specific need for async. You can always switch later — the method names are identical, you just add "await" in front.',
          },
        ],
        quiz: [
          {
            question: 'Who develops Playwright?',
            options: ['Google', 'Mozilla', 'Microsoft', 'Facebook'],
            correctIndex: 2,
            explanation: 'Playwright is developed by Microsoft. Many of its core team members previously worked on Puppeteer at Google.',
          },
          {
            question: 'What is Playwright\'s biggest advantage over Selenium?',
            options: [
              'More browser support',
              'Auto-waiting for elements to be actionable',
              'Older and more stable',
              'Works with more languages',
            ],
            correctIndex: 1,
            explanation: 'Auto-waiting is Playwright\'s most impactful feature. It automatically waits for elements to be ready before interacting, eliminating most timing issues.',
          },
          {
            question: 'Which Python API should beginners use with Playwright?',
            options: ['async_api', 'sync_api', 'raw_api', 'simple_api'],
            correctIndex: 1,
            explanation: 'The sync_api is simpler and recommended for beginners. It uses regular blocking calls and does not require asyncio knowledge.',
          },
        ],
        challenge: {
          prompt: 'Write a synchronous Playwright script that launches Chromium, creates a new page, navigates to "https://example.com", prints the page title, and closes the browser.',
          starterCode: `from playwright.sync_api import sync_playwright

# TODO: Launch browser, navigate to example.com, print title, close`,
          solutionCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")
    print(f"Title: {page.title()}")
    browser.close()`,
          hints: [
            'Use "with sync_playwright() as p:" for the context manager.',
            'Launch with p.chromium.launch().',
            'Call page.title() to get the title.',
          ],
        },
      },
      {
        id: 'pw-start-install',
        title: 'Installation & Setup',
        difficulty: 'beginner',
        tags: ['playwright', 'install', 'setup', 'pip', 'browsers'],
        sections: [
          {
            heading: 'Installing Playwright',
            content:
              'Installing Playwright for Python is a two-step process: install the Python package with pip, then download the browser binaries. The browser download is separate because Playwright ships its own patched versions of Chromium, Firefox, and WebKit to ensure consistent behavior across platforms.\n\nThe total download is around 200-400 MB depending on your platform, as it includes three full browser engines. You can optionally install only specific browsers if you want to save space.',
            code: `# Step 1: Install the Python package
# pip install playwright

# Step 2: Download browser binaries
# playwright install

# Install only specific browsers to save space
# playwright install chromium
# playwright install firefox
# playwright install webkit

# Verify installation
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")
    print(f"Playwright is working! Title: {page.title()}")
    browser.close()`,
            output: `Playwright is working! Title: Example Domain`,
            tip: 'Run "playwright install" after every pip upgrade of playwright to ensure browser versions match the library version.',
          },
          {
            heading: 'Headless vs Headed Mode',
            content:
              'By default, Playwright launches browsers in headless mode — no visible window appears. This is ideal for CI/CD pipelines and automated test runs. For development and debugging, you can launch in headed mode to see what the browser is doing.\n\nYou can also slow down execution with the slow_mo parameter, which adds a delay between each operation. This is invaluable for debugging because it lets you visually follow what your script is doing.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    # Headless mode (default) - no visible window
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("https://example.com")
    print(f"Headless: {page.title()}")
    browser.close()

    # Headed mode - shows the browser window
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    page.goto("https://example.com")
    print(f"Headed: {page.title()}")
    browser.close()

    # Slow motion mode - adds delay between actions
    browser = p.chromium.launch(headless=False, slow_mo=500)
    page = browser.new_page()
    page.goto("https://example.com")
    page.click("text=More information")  # 500ms delay before click
    print(f"Slow mo: {page.title()}")
    browser.close()`,
            output: `Headless: Example Domain
Headed: Example Domain
Slow mo: IANA-managed Reserved Domains`,
          },
          {
            heading: 'Browser Launch Options',
            content:
              'Playwright provides various launch options to customize browser behavior. You can set the viewport size, user agent, locale, timezone, geolocation, and more. These are set at the browser context level, not the browser level, which means you can have multiple contexts with different configurations sharing a single browser instance.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()

    # Create a context with custom settings
    context = browser.new_context(
        viewport={"width": 1920, "height": 1080},
        user_agent="Custom Agent/1.0",
        locale="fr-FR",
        timezone_id="Europe/Paris",
        geolocation={"latitude": 48.8566, "longitude": 2.3522},
        permissions=["geolocation"],
    )

    page = context.new_page()
    page.goto("https://example.com")
    print(f"Title: {page.title()}")
    print(f"Viewport: {page.viewport_size}")

    context.close()
    browser.close()`,
            output: `Title: Example Domain
Viewport: {'width': 1920, 'height': 1080}`,
            note: 'Browser contexts are isolated from each other — they do not share cookies, localStorage, or any other state. This makes them perfect for testing multiple users simultaneously.',
          },
        ],
        quiz: [
          {
            question: 'What command downloads Playwright browser binaries?',
            options: ['pip install browsers', 'playwright install', 'playwright download', 'playwright setup'],
            correctIndex: 1,
            explanation: '"playwright install" downloads the browser binaries (Chromium, Firefox, WebKit) that Playwright needs to run.',
          },
          {
            question: 'What does the slow_mo parameter do?',
            options: [
              'Limits network speed',
              'Adds a delay between each Playwright operation',
              'Slows down page loading',
              'Reduces CPU usage',
            ],
            correctIndex: 1,
            explanation: 'slow_mo adds a specified delay (in milliseconds) between each Playwright operation, making it easier to visually follow what the script is doing.',
          },
          {
            question: 'What is the default mode when launching a Playwright browser?',
            options: ['Headed', 'Headless', 'Minimized', 'Full screen'],
            correctIndex: 1,
            explanation: 'Playwright launches browsers in headless mode by default. Use headless=False to see the browser window.',
          },
        ],
        challenge: {
          prompt: 'Write a script that launches Chrome in headed mode with slow_mo=300, creates a context with viewport 1280x720, navigates to "https://example.com", prints the title and viewport size, then closes everything.',
          starterCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    # TODO: Launch headed browser with slow_mo

    # TODO: Create context with 1280x720 viewport

    # TODO: Navigate and print title + viewport

    pass`,
          solutionCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False, slow_mo=300)
    context = browser.new_context(
        viewport={"width": 1280, "height": 720}
    )
    page = context.new_page()
    page.goto("https://example.com")
    print(f"Title: {page.title()}")
    print(f"Viewport: {page.viewport_size}")
    context.close()
    browser.close()`,
          hints: [
            'Pass headless=False and slow_mo=300 to launch().',
            'Use browser.new_context() with viewport dict.',
            'Viewport takes width and height as dict keys.',
          ],
        },
      },
      {
        id: 'pw-start-first-script',
        title: 'First Playwright Script',
        difficulty: 'beginner',
        tags: ['playwright', 'beginner', 'script', 'navigation'],
        sections: [
          {
            heading: 'Writing Your First Script',
            content:
              'A basic Playwright script follows a simple pattern: start Playwright, launch a browser, create a page, perform actions, and close the browser. The sync_playwright() context manager handles initialization and cleanup. Within this context, you launch a browser, create pages, and interact with web content.\n\nThe most common operations are page.goto() for navigation, page.click() for clicking elements, page.fill() for typing into inputs, and page.locator() for finding elements.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    # Launch a browser
    browser = p.chromium.launch()

    # Create a new page
    page = browser.new_page()

    # Navigate to a URL
    page.goto("https://example.com")

    # Get page information
    print(f"Title: {page.title()}")
    print(f"URL: {page.url}")

    # Find and read content
    heading = page.locator("h1")
    print(f"Heading: {heading.text_content()}")

    # Take a screenshot
    page.screenshot(path="example.png")
    print("Screenshot saved!")

    # Close the browser
    browser.close()`,
            output: `Title: Example Domain
URL: https://www.example.com/
Heading: Example Domain
Screenshot saved!`,
          },
          {
            heading: 'Interacting with Elements',
            content:
              'Playwright uses locators to find and interact with elements. The page.locator() method returns a Locator object that you can chain actions on. Unlike Selenium, you do not need to explicitly wait for elements — Playwright auto-waits for elements to be actionable before performing operations like click, fill, or check.\n\nFor form interactions, use page.fill() to type into text inputs, page.click() to click buttons and links, and page.check()/page.uncheck() for checkboxes.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/form")

    # Fill a text input (auto-clears existing text)
    page.fill("#username", "testuser")
    page.fill("#password", "secret123")

    # Click a button
    page.click("#login-button")

    # Check a checkbox
    page.check("#remember-me")

    # Select from a dropdown
    page.select_option("#country", "US")

    # Read text from an element
    message = page.locator(".welcome-message").text_content()
    print(f"Message: {message}")

    browser.close()`,
            output: `Message: Welcome, testuser!`,
            tip: 'page.fill() automatically clears any existing text in the input before typing. This is different from Selenium where you need to call clear() separately.',
          },
          {
            heading: 'Taking Screenshots',
            content:
              'Playwright supports full-page screenshots, viewport screenshots, and element-level screenshots. You can save as PNG or JPEG, and optionally get the image as bytes for programmatic use. Screenshots are invaluable for debugging failed tests and for visual regression testing.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Viewport screenshot (default)
    page.screenshot(path="viewport.png")

    # Full page screenshot (captures entire scrollable area)
    page.screenshot(path="fullpage.png", full_page=True)

    # Element screenshot
    page.locator("h1").screenshot(path="heading.png")

    # Screenshot as bytes (for programmatic use)
    img_bytes = page.screenshot()
    print(f"Screenshot size: {len(img_bytes)} bytes")

    # JPEG with quality setting
    page.screenshot(path="page.jpg", type="jpeg", quality=80)

    browser.close()`,
            output: `Screenshot size: 14523 bytes`,
          },
        ],
        quiz: [
          {
            question: 'Does page.fill() automatically clear existing text?',
            options: ['No, you must call clear() first', 'Yes, it auto-clears', 'It appends to existing text', 'Only in headed mode'],
            correctIndex: 1,
            explanation: 'page.fill() automatically clears any existing text in the input field before typing the new text.',
          },
          {
            question: 'Does Playwright require explicit waits before clicking an element?',
            options: ['Yes, always', 'No, it auto-waits for elements to be actionable', 'Only in headless mode', 'Only for dynamic elements'],
            correctIndex: 1,
            explanation: 'Playwright automatically waits for elements to be visible, enabled, and stable before performing actions like click or fill.',
          },
          {
            question: 'How do you take a full-page screenshot in Playwright?',
            options: [
              'page.screenshot(scroll=True)',
              'page.full_screenshot()',
              'page.screenshot(full_page=True)',
              'page.screenshot(entire=True)',
            ],
            correctIndex: 2,
            explanation: 'Pass full_page=True to page.screenshot() to capture the entire scrollable page, not just the viewport.',
          },
        ],
        challenge: {
          prompt: 'Write a Playwright script that navigates to "https://example.com", reads and prints the text of the <h1> element, takes a full-page screenshot saved as "full.png", and takes an element screenshot of the <h1> saved as "heading.png".',
          starterCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # TODO: Navigate to example.com

    # TODO: Read and print h1 text

    # TODO: Full page screenshot -> "full.png"

    # TODO: Element screenshot of h1 -> "heading.png"

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    page.goto("https://example.com")

    heading = page.locator("h1")
    print(f"Heading: {heading.text_content()}")

    page.screenshot(path="full.png", full_page=True)
    heading.screenshot(path="heading.png")

    browser.close()`,
          hints: [
            'Use page.locator("h1") to find the heading.',
            'Call .text_content() to get the element text.',
            'Pass full_page=True for the full page screenshot.',
          ],
        },
      },
      {
        id: 'pw-start-contexts',
        title: 'Browser Contexts & Pages',
        difficulty: 'intermediate',
        tags: ['playwright', 'context', 'isolation', 'pages', 'cookies'],
        sections: [
          {
            heading: 'What Are Browser Contexts?',
            content:
              'A browser context is an isolated browser session within a single browser instance. Each context has its own cookies, localStorage, sessionStorage, and cache — like running separate incognito windows. Creating a context is much faster than launching a new browser, making it ideal for test isolation.\n\nYou can create many contexts within a single browser and many pages within a single context. This hierarchy — Browser > Context > Page — is central to how Playwright operates.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()

    # Create two isolated contexts
    context1 = browser.new_context()
    context2 = browser.new_context()

    # Pages in context1 share cookies/storage
    page1a = context1.new_page()
    page1b = context1.new_page()

    # Pages in context2 are completely isolated from context1
    page2a = context2.new_page()

    # Login in context1
    page1a.goto("https://example.com/login")
    page1a.fill("#username", "user1")
    page1a.fill("#password", "pass1")
    page1a.click("#login")

    # page1b sees the same session (shared cookies)
    page1b.goto("https://example.com/dashboard")
    print(f"Context1 page1b: {page1b.title()}")

    # page2a is NOT logged in (separate context)
    page2a.goto("https://example.com/dashboard")
    print(f"Context2 page2a: {page2a.title()}")

    context1.close()
    context2.close()
    browser.close()`,
            output: `Context1 page1b: Dashboard - Welcome user1
Context2 page2a: Login Required`,
            analogy: 'A browser is like a building. Contexts are separate apartments — each has its own locks, furniture, and storage. Pages are rooms within an apartment — they share the apartment\'s resources.',
          },
          {
            heading: 'Context Configuration',
            content:
              'Browser contexts accept many configuration options that apply to all pages created within them. You can set the viewport size, user agent, locale, timezone, geolocation, color scheme, and more. This is where you configure device emulation for responsive testing.\n\nPlaywright also provides a devices dictionary with predefined device configurations for popular phones and tablets, making mobile testing trivial.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()

    # Desktop context
    desktop = browser.new_context(
        viewport={"width": 1920, "height": 1080},
        locale="en-US",
    )

    # Mobile context using device preset
    iphone = p.devices["iPhone 13"]
    mobile = browser.new_context(**iphone)

    # Dark mode context
    dark = browser.new_context(
        color_scheme="dark",
        viewport={"width": 1280, "height": 720},
    )

    # Test the same page in different contexts
    for name, ctx in [("Desktop", desktop), ("Mobile", mobile), ("Dark", dark)]:
        page = ctx.new_page()
        page.goto("https://example.com")
        print(f"{name}: viewport={page.viewport_size}, title={page.title()}")
        ctx.close()

    browser.close()`,
            output: `Desktop: viewport={'width': 1920, 'height': 1080}, title=Example Domain
Mobile: viewport={'width': 390, 'height': 844}, title=Example Domain
Dark: viewport={'width': 1280, 'height': 720}, title=Example Domain`,
          },
          {
            heading: 'Managing Multiple Pages',
            content:
              'Within a context, you can open multiple pages (tabs). Each page is independent but shares the context\'s cookies and storage. You can listen for new pages that are opened by the website (popups) using the context\'s "page" event.\n\nThe context.pages property gives you a list of all currently open pages, and you can switch between them freely.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()

    # Create pages manually
    page1 = context.new_page()
    page1.goto("https://example.com")

    page2 = context.new_page()
    page2.goto("https://example.com/about")

    print(f"Open pages: {len(context.pages)}")
    for pg in context.pages:
        print(f"  - {pg.url}")

    # Handle popups (new windows opened by the site)
    with context.expect_page() as new_page_info:
        page1.click("a[target='_blank']")  # Link that opens new tab
    new_page = new_page_info.value
    new_page.wait_for_load_state()
    print(f"Popup URL: {new_page.url}")

    # Close a specific page
    page2.close()
    print(f"Pages after closing: {len(context.pages)}")

    context.close()
    browser.close()`,
            output: `Open pages: 2
  - https://www.example.com/
  - https://www.example.com/about
Popup URL: https://www.iana.org/domains/reserved
Pages after closing: 2`,
            tip: 'Use context.expect_page() to catch pages that are opened by the website (via window.open or target="_blank" links). Without this, the new page opens but you will not have a reference to it.',
          },
        ],
        quiz: [
          {
            question: 'What do browser contexts share within a single browser?',
            options: [
              'Cookies and localStorage',
              'Nothing — they are fully isolated',
              'Only the browser process',
              'Cache and history',
            ],
            correctIndex: 1,
            explanation: 'Browser contexts are fully isolated from each other. They do not share cookies, localStorage, cache, or any other state — like separate incognito windows.',
          },
          {
            question: 'How do you emulate a mobile device in Playwright?',
            options: [
              'browser.launch(device="iPhone")',
              'Use p.devices["iPhone 13"] with new_context()',
              'page.set_device("mobile")',
              'context.emulate("iPhone")',
            ],
            correctIndex: 1,
            explanation: 'Playwright provides a devices dictionary with preset configurations. Spread the device config into browser.new_context() to emulate that device.',
          },
          {
            question: 'How do you catch a new page opened by a link with target="_blank"?',
            options: [
              'page.on("popup")',
              'context.expect_page()',
              'browser.wait_for_page()',
              'page.wait_for_popup()',
            ],
            correctIndex: 1,
            explanation: 'Use context.expect_page() as a context manager. It waits for a new page to be created in the context and gives you a reference to it.',
          },
        ],
        challenge: {
          prompt: 'Write a script that creates two isolated browser contexts — one with a 1920x1080 viewport and one simulating an iPhone 13. Navigate both to "https://example.com" and print each context\'s viewport size and page title.',
          starterCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()

    # TODO: Create desktop context (1920x1080)

    # TODO: Create mobile context (iPhone 13)

    # TODO: Navigate both and print viewport + title

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()

    desktop = browser.new_context(viewport={"width": 1920, "height": 1080})
    page_d = desktop.new_page()
    page_d.goto("https://example.com")
    print(f"Desktop: {page_d.viewport_size} - {page_d.title()}")

    mobile = browser.new_context(**p.devices["iPhone 13"])
    page_m = mobile.new_page()
    page_m.goto("https://example.com")
    print(f"Mobile: {page_m.viewport_size} - {page_m.title()}")

    desktop.close()
    mobile.close()
    browser.close()`,
          hints: [
            'Pass viewport dict to new_context() for desktop.',
            'Use **p.devices["iPhone 13"] to spread device config.',
            'Each context needs its own page via context.new_page().',
          ],
        },
      },
    ],
  },

  /* ================================================================== */
  /*  Category 2 — Selectors & Locators                                  */
  /* ================================================================== */
  {
    id: 'pw-selectors-locators',
    label: 'Selectors & Locators',
    icon: 'Search',
    entries: [
      {
        id: 'pw-sel-builtin',
        title: 'Built-in Locators',
        difficulty: 'beginner',
        tags: ['playwright', 'locators', 'get_by_role', 'get_by_text', 'get_by_label'],
        sections: [
          {
            heading: 'Role-based Locators',
            content:
              'Playwright\'s recommended approach for finding elements is through built-in locators that mirror how users perceive the page. The most powerful is get_by_role(), which finds elements by their ARIA role. This approach creates resilient selectors that work even when CSS classes or IDs change, because roles describe the semantic purpose of elements.\n\nCommon roles include "button", "link", "heading", "textbox", "checkbox", "combobox", and "navigation". You can also filter by the element\'s accessible name using the name parameter.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Find a button by role and name
    page.get_by_role("button", name="Submit").click()

    # Find a link by role
    page.get_by_role("link", name="More information").click()

    # Find a heading
    heading = page.get_by_role("heading", name="Example Domain")
    print(f"Heading: {heading.text_content()}")

    # Find a textbox (input field)
    page.get_by_role("textbox", name="Email").fill("test@example.com")

    # Find a checkbox
    page.get_by_role("checkbox", name="Remember me").check()

    browser.close()`,
            output: `Heading: Example Domain`,
            tip: 'get_by_role() is the most resilient locator strategy. It survives CSS refactors, ID changes, and most markup restructuring because it targets semantic meaning, not implementation details.',
          },
          {
            heading: 'Text and Label Locators',
            content:
              'When role-based locators are not specific enough, Playwright offers get_by_text() to find elements by their visible text content and get_by_label() to find form controls by their associated <label> text. These are the next best options after role-based locators.\n\nget_by_text() performs a substring match by default. Pass exact=True for an exact match. get_by_label() is specifically designed for form inputs and targets the element associated with a <label> tag.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Find by visible text (substring match)
    page.get_by_text("More information").click()

    # Exact text match
    page.get_by_text("Example Domain", exact=True)

    # Find form input by its label
    page.get_by_label("Email address").fill("user@example.com")
    page.get_by_label("Password").fill("secret123")

    # Find by placeholder text
    page.get_by_placeholder("Search...").fill("playwright docs")

    # Find by alt text (images)
    logo = page.get_by_alt_text("Company Logo")
    print(f"Logo found: {logo.count() > 0}")

    # Find by title attribute
    page.get_by_title("Close dialog").click()

    browser.close()`,
            output: `Logo found: True`,
          },
          {
            heading: 'Test ID Locators',
            content:
              'For elements that lack meaningful roles, text, or labels, Playwright supports test ID locators via get_by_test_id(). This targets elements with a data-testid attribute (configurable). Test IDs are a contract between developers and testers — they are added specifically for automation and should not change during refactors.\n\nThis is the recommended escape hatch when semantic locators are not practical. It is much better than relying on CSS classes or XPath, which are fragile.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Find by data-testid attribute
    page.get_by_test_id("submit-button").click()

    # Find by data-testid on a container
    card = page.get_by_test_id("user-card")
    name = card.locator(".name").text_content()
    print(f"User: {name}")

    # The default attribute is "data-testid" but you can configure it
    # playwright.selectors.set_test_id_attribute("data-cy")
    # Then get_by_test_id looks for data-cy instead

    browser.close()`,
            output: `User: John Doe`,
            note: 'The locator priority should be: get_by_role > get_by_text/get_by_label > get_by_test_id > CSS/XPath. Use the most semantic option available.',
          },
        ],
        quiz: [
          {
            question: 'What is the recommended primary locator strategy in Playwright?',
            options: ['CSS selectors', 'XPath', 'get_by_role()', 'get_by_test_id()'],
            correctIndex: 2,
            explanation: 'get_by_role() is the most recommended because it mirrors how users and assistive technologies perceive the page, making tests more resilient.',
          },
          {
            question: 'What does get_by_label() target?',
            options: [
              'Any element with a label class',
              'Form inputs associated with a <label> element',
              'Elements with aria-label',
              'The <label> element itself',
            ],
            correctIndex: 1,
            explanation: 'get_by_label() finds form controls (inputs, selects, etc.) that are associated with a <label> element by its text content.',
          },
          {
            question: 'What HTML attribute does get_by_test_id() target by default?',
            options: ['data-test', 'data-testid', 'data-cy', 'id'],
            correctIndex: 1,
            explanation: 'By default, get_by_test_id() looks for the data-testid attribute. This can be configured using selectors.set_test_id_attribute().',
          },
        ],
        challenge: {
          prompt: 'Write a script that fills a login form using get_by_label() for "Email" and "Password" fields, checks a "Remember me" checkbox using get_by_role(), and clicks the "Sign in" button using get_by_role().',
          starterCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/login")

    # TODO: Fill email using get_by_label

    # TODO: Fill password using get_by_label

    # TODO: Check "Remember me" using get_by_role

    # TODO: Click "Sign in" using get_by_role

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/login")

    page.get_by_label("Email").fill("user@example.com")
    page.get_by_label("Password").fill("secret123")
    page.get_by_role("checkbox", name="Remember me").check()
    page.get_by_role("button", name="Sign in").click()

    browser.close()`,
          hints: [
            'Use page.get_by_label("Email") for the email field.',
            'Use get_by_role("checkbox", name="Remember me") for the checkbox.',
            'Use get_by_role("button", name="Sign in") for the button.',
          ],
        },
      },
      {
        id: 'pw-sel-css-xpath',
        title: 'CSS & XPath Selectors',
        difficulty: 'intermediate',
        tags: ['playwright', 'CSS', 'XPath', 'selectors'],
        sections: [
          {
            heading: 'CSS Selectors',
            content:
              'While built-in locators are preferred, Playwright fully supports CSS selectors for situations where semantic locators are not practical. CSS selectors target elements by tag name, class, ID, attributes, and structural relationships. They are familiar to web developers and are more concise than XPath.\n\nUse page.locator("css=selector") or just page.locator("selector") — Playwright auto-detects CSS selectors.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # By ID
    page.locator("#main-content").click()

    # By class
    items = page.locator(".list-item")
    print(f"Items: {items.count()}")

    # By attribute
    page.locator("[data-type='primary']").click()

    # By tag + class
    page.locator("button.submit-btn").click()

    # Descendant selector
    text = page.locator(".card .title").text_content()
    print(f"Card title: {text}")

    # nth-child
    third = page.locator("ul > li:nth-child(3)").text_content()
    print(f"Third item: {third}")

    # Attribute contains
    page.locator("[href*='about']").click()

    browser.close()`,
            output: `Items: 5
Card title: Featured Article
Third item: Item 3`,
          },
          {
            heading: 'XPath Selectors',
            content:
              'XPath selectors can navigate the DOM in ways CSS cannot, such as selecting parent elements or using text content in selectors. Prefix with "xpath=" to use XPath in Playwright. While powerful, XPath selectors tend to be more verbose and harder to read than CSS.\n\nXPath is most useful when you need to find elements based on their text content or navigate upward in the DOM tree — two things CSS selectors cannot do.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Basic XPath
    heading = page.locator("xpath=//h1")
    print(f"Heading: {heading.text_content()}")

    # XPath with text
    page.locator("xpath=//a[contains(text(), 'More')]").click()

    # XPath with attribute
    page.locator("xpath=//input[@type='email']").fill("test@example.com")

    # XPath parent navigation (CSS cannot do this)
    parent = page.locator("xpath=//span[@class='icon']/parent::button")
    parent.click()

    # XPath with position
    second_item = page.locator("xpath=(//li)[2]")
    print(f"Second item: {second_item.text_content()}")

    browser.close()`,
            output: `Heading: Example Domain
Second item: Item 2`,
            note: 'Prefer CSS over XPath when possible — CSS selectors are more readable, more commonly known, and slightly faster in most browsers.',
          },
          {
            heading: 'Combining Selectors',
            content:
              'Playwright allows you to combine multiple selector strategies. You can chain locators to narrow down your search, use the >> operator to find within a subtree, or use the or_() method to match any of multiple selectors. This flexibility lets you build precise, readable selectors.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Chain locators: find .card then find .title within it
    card_title = page.locator(".card").locator(".title")
    print(f"Title: {card_title.first.text_content()}")

    # has= filter: find a card that contains a specific element
    card_with_image = page.locator(".card", has=page.locator("img"))
    print(f"Cards with images: {card_with_image.count()}")

    # has_text= filter: find elements containing specific text
    python_card = page.locator(".card", has_text="Python")
    print(f"Python cards: {python_card.count()}")

    # or_() - match either selector
    buttons_or_links = page.locator("button").or_(page.locator("a"))
    print(f"Buttons or links: {buttons_or_links.count()}")

    # nth() - get specific match
    second_card = page.locator(".card").nth(1)
    print(f"Second card: {second_card.text_content()[:30]}")

    browser.close()`,
            output: `Title: Featured Article
Cards with images: 3
Python cards: 1
Buttons or links: 12
Second card: Python Programming Guide...`,
          },
        ],
        quiz: [
          {
            question: 'How do you use XPath in Playwright?',
            options: [
              'page.xpath("//h1")',
              'page.locator("xpath=//h1")',
              'page.find_by_xpath("//h1")',
              'page.locator("//h1")',
            ],
            correctIndex: 1,
            explanation: 'Prefix with "xpath=" when passing XPath selectors to page.locator(). Alternatively, Playwright auto-detects XPath if the selector starts with // or ..',
          },
          {
            question: 'What does the has= parameter do in page.locator()?',
            options: [
              'Checks if element has an attribute',
              'Filters to elements that contain a matching child element',
              'Checks if element has text',
              'Verifies element existence',
            ],
            correctIndex: 1,
            explanation: 'has= takes a locator and filters to only those elements that contain a descendant matching the inner locator.',
          },
          {
            question: 'What does the or_() method do on locators?',
            options: [
              'Creates an OR condition in XPath',
              'Matches elements from either locator',
              'Filters elements',
              'Sorts elements',
            ],
            correctIndex: 1,
            explanation: 'or_() creates a locator that matches elements from either the original locator or the argument locator.',
          },
        ],
        challenge: {
          prompt: 'Write a script that finds all ".card" elements containing the text "Python", prints the count, then finds the second ".card" element on the page and prints its text content (first 50 chars).',
          starterCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # TODO: Find cards containing "Python" and print count

    # TODO: Find second card and print first 50 chars

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    python_cards = page.locator(".card", has_text="Python")
    print(f"Python cards: {python_cards.count()}")

    second_card = page.locator(".card").nth(1)
    print(f"Second card: {second_card.text_content()[:50]}")

    browser.close()`,
          hints: [
            'Use has_text="Python" parameter in locator().',
            'Use .nth(1) to get the second element (0-indexed).',
            'Slice the text_content() result with [:50].',
          ],
        },
      },
      {
        id: 'pw-sel-filtering',
        title: 'Filtering Locators',
        difficulty: 'intermediate',
        tags: ['playwright', 'filter', 'locator', 'has', 'has_text'],
        sections: [
          {
            heading: 'The filter() Method',
            content:
              'Playwright\'s filter() method narrows down a locator to match only elements that satisfy additional criteria. You can filter by text content, by the presence of child elements, or by absence of elements. filter() returns a new locator and can be chained multiple times for precise targeting.\n\nThis is one of Playwright\'s most powerful features for creating readable, maintainable selectors. Instead of writing complex CSS or XPath, you compose simple filters.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Filter by text content
    active_items = page.locator("li").filter(has_text="Active")
    print(f"Active items: {active_items.count()}")

    # Filter by child element
    rows_with_links = page.locator("tr").filter(has=page.locator("a"))
    print(f"Rows with links: {rows_with_links.count()}")

    # Filter by NOT having a child element
    rows_without_image = page.locator("tr").filter(has_not=page.locator("img"))
    print(f"Rows without images: {rows_without_image.count()}")

    # Filter by NOT having text
    items_not_done = page.locator(".todo-item").filter(has_not_text="Done")
    print(f"Incomplete items: {items_not_done.count()}")

    # Chain multiple filters
    premium_active = (
        page.locator(".user-card")
        .filter(has_text="Premium")
        .filter(has=page.locator(".active-badge"))
    )
    print(f"Premium active users: {premium_active.count()}")

    browser.close()`,
            output: `Active items: 3
Rows with links: 5
Rows without images: 8
Incomplete items: 4
Premium active users: 2`,
          },
          {
            heading: 'Locator Chaining',
            content:
              'You can chain .locator() calls to progressively narrow down your selection. Each .locator() call searches within the results of the previous one. This is different from filter() — chaining finds descendants, while filter() filters the current set.\n\nThis pattern creates very readable selectors that describe the DOM hierarchy step by step.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Chain: find .sidebar, then find .nav-link within it
    sidebar_links = page.locator(".sidebar").locator(".nav-link")
    print(f"Sidebar links: {sidebar_links.count()}")

    # Chain with role locators
    nav_buttons = (
        page.locator("nav")
        .get_by_role("button")
    )
    print(f"Nav buttons: {nav_buttons.count()}")

    # Three levels deep
    table_email = (
        page.locator(".user-table")
        .locator("tr").nth(0)
        .locator("td.email")
    )
    print(f"First email: {table_email.text_content()}")

    browser.close()`,
            output: `Sidebar links: 6
Nav buttons: 3
First email: user@example.com`,
          },
          {
            heading: 'first, last, and nth',
            content:
              'When a locator matches multiple elements, you can select specific ones using .first, .last, or .nth(index). The .count() method tells you how many elements matched. These are essential for working with lists, tables, and repeated components.\n\nNote that .first and .last are properties (no parentheses), while .nth() is a method that takes a zero-based index.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    items = page.locator(".list-item")

    # Count all matches
    count = items.count()
    print(f"Total items: {count}")

    # Get specific items
    first = items.first.text_content()
    last = items.last.text_content()
    third = items.nth(2).text_content()

    print(f"First: {first}")
    print(f"Last: {last}")
    print(f"Third: {third}")

    # Iterate over all matches
    for i in range(items.count()):
        text = items.nth(i).text_content()
        print(f"  [{i}] {text}")

    browser.close()`,
            output: `Total items: 5
First: Apple
Last: Elderberry
Third: Cherry
  [0] Apple
  [1] Banana
  [2] Cherry
  [3] Date
  [4] Elderberry`,
          },
        ],
        quiz: [
          {
            question: 'What is the difference between filter() and chaining .locator()?',
            options: [
              'They are the same',
              'filter() narrows the current set; chaining finds descendants',
              'filter() finds descendants; chaining narrows the set',
              'filter() is faster',
            ],
            correctIndex: 1,
            explanation: 'filter() narrows down the current set of matched elements. Chaining .locator() searches for descendants within the matched elements.',
          },
          {
            question: 'How do you get the third matched element?',
            options: ['locator.nth(3)', 'locator.nth(2)', 'locator[2]', 'locator.get(3)'],
            correctIndex: 1,
            explanation: '.nth() uses zero-based indexing, so the third element is .nth(2).',
          },
          {
            question: 'Which filter parameter excludes elements with specific text?',
            options: ['not_text', 'has_not_text', 'exclude_text', 'without_text'],
            correctIndex: 1,
            explanation: 'has_not_text= filters out elements that contain the specified text.',
          },
        ],
        challenge: {
          prompt: 'Write a script that finds all ".product-card" elements, filters to only those containing "In Stock", prints the count, then prints the text of the first and last matching cards.',
          starterCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/products")

    # TODO: Find product cards with "In Stock"

    # TODO: Print count, first text, last text

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/products")

    in_stock = page.locator(".product-card").filter(has_text="In Stock")
    print(f"In stock: {in_stock.count()}")
    print(f"First: {in_stock.first.text_content()}")
    print(f"Last: {in_stock.last.text_content()}")

    browser.close()`,
          hints: [
            'Use .filter(has_text="In Stock") to narrow the results.',
            'Use .first and .last properties to get specific matches.',
            'Use .count() to get the total number of matches.',
          ],
        },
      },
      {
        id: 'pw-sel-text',
        title: 'Text-based Locators',
        difficulty: 'beginner',
        tags: ['playwright', 'text', 'locator', 'get_by_text', 'matching'],
        sections: [
          {
            heading: 'Finding by Text Content',
            content:
              'get_by_text() is one of Playwright\'s most intuitive locators. It finds elements by their visible text content, which is how real users identify elements on a page. By default, it performs a substring match (case-insensitive). Use exact=True for an exact match.\n\nThis locator targets the innermost element that contains the text. If a <div> contains a <span> with the text, get_by_text will match the <span>, not the <div>.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Substring match (default)
    page.get_by_text("More info").click()

    # Exact match
    heading = page.get_by_text("Example Domain", exact=True)
    print(f"Found: {heading.text_content()}")

    # Case insensitive by default
    page.get_by_text("example domain")  # Still matches

    # With regex
    import re
    page.get_by_text(re.compile(r"^Example"))

    browser.close()`,
            output: `Found: Example Domain`,
          },
          {
            heading: 'Text in Locator Filters',
            content:
              'Beyond get_by_text(), you can use text matching in locator() through the has_text parameter and in filter() calls. This is useful when you want to find a container element that contains specific text, rather than the text element itself.\n\nThe has_text parameter on locator() matches any element whose text content (including descendants) contains the given string.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Find a card that contains "Python" anywhere in its text
    python_card = page.locator(".card", has_text="Python")
    print(f"Card text: {python_card.text_content()[:60]}")

    # Filter list items to those containing "complete"
    done_items = page.locator(".todo-item").filter(has_text="complete")
    print(f"Completed todos: {done_items.count()}")

    # Combine text with other selectors
    buy_button = (
        page.locator(".product-card", has_text="Laptop")
        .get_by_role("button", name="Buy")
    )
    buy_button.click()
    print("Clicked buy on Laptop card")

    browser.close()`,
            output: `Card text: Python Programming: A comprehensive guide to Python...
Completed todos: 3
Clicked buy on Laptop card`,
            tip: 'Use has_text on a parent locator + chained child locator for the most readable selectors. For example: "Find the product card that says Laptop, then click its Buy button."',
          },
          {
            heading: 'Regex Pattern Matching',
            content:
              'For complex text matching, Playwright supports Python regex patterns. Pass a compiled regex to get_by_text() or use it in filter(has_text=). This is powerful for matching dynamic content like dates, numbers, or formatted strings.\n\nRegex matching is case-sensitive by default. Add re.IGNORECASE flag for case-insensitive matching.',
            code: `from playwright.sync_api import sync_playwright
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Match elements starting with "Chapter"
    chapters = page.get_by_text(re.compile(r"^Chapter \\d+"))
    print(f"Chapters found: {chapters.count()}")

    # Match price format
    prices = page.locator(".price").filter(
        has_text=re.compile(r"\\$\\d+\\.\\d{2}")
    )
    print(f"Priced items: {prices.count()}")

    # Case insensitive match
    welcome = page.get_by_text(re.compile(r"welcome", re.IGNORECASE))
    print(f"Welcome: {welcome.text_content()}")

    browser.close()`,
            output: `Chapters found: 5
Priced items: 8
Welcome: Welcome to Example.com`,
          },
        ],
        quiz: [
          {
            question: 'Is get_by_text() case-sensitive by default?',
            options: ['Yes', 'No, it is case-insensitive', 'Depends on the browser', 'Only for exact matches'],
            correctIndex: 1,
            explanation: 'get_by_text() performs case-insensitive substring matching by default.',
          },
          {
            question: 'What does get_by_text() match when text is inside a nested element?',
            options: [
              'The outermost element',
              'The innermost element containing the text',
              'All elements in the chain',
              'Only direct text nodes',
            ],
            correctIndex: 1,
            explanation: 'get_by_text() targets the smallest (innermost) element that contains the matching text.',
          },
          {
            question: 'How do you use regex with get_by_text()?',
            options: [
              'get_by_text("/pattern/")',
              'get_by_text(re.compile(r"pattern"))',
              'get_by_text(regex="pattern")',
              'get_by_text(pattern="regex")',
            ],
            correctIndex: 1,
            explanation: 'Pass a compiled regex pattern using re.compile() to get_by_text() for regex matching.',
          },
        ],
        challenge: {
          prompt: 'Write a script that finds all elements matching "Chapter" followed by a number using regex, prints the count, then finds a ".product" element containing "Sale" text and prints its text content.',
          starterCode: `from playwright.sync_api import sync_playwright
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # TODO: Find all "Chapter N" elements with regex

    # TODO: Find .product containing "Sale" and print text

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    chapters = page.get_by_text(re.compile(r"Chapter \\d+"))
    print(f"Chapters: {chapters.count()}")

    sale_product = page.locator(".product", has_text="Sale")
    print(f"Sale product: {sale_product.first.text_content()}")

    browser.close()`,
          hints: [
            'Use re.compile(r"Chapter \\d+") for the regex pattern.',
            'Use has_text="Sale" parameter on locator().',
            'Use .first to get the first matching element.',
          ],
        },
      },
    ],
  },

  /* ================================================================== */
  /*  Category 3 — Page Interactions                                     */
  /* ================================================================== */
  {
    id: 'pw-page-interactions',
    label: 'Page Interactions',
    icon: 'MousePointer',
    entries: [
      {
        id: 'pw-interact-click-fill',
        title: 'Click & Fill Actions',
        difficulty: 'beginner',
        tags: ['playwright', 'click', 'fill', 'type', 'actions'],
        sections: [
          {
            heading: 'Clicking Elements',
            content:
              'Playwright\'s click() method automatically waits for the element to be visible, stable (not moving), enabled, and not obscured by other elements before clicking. This auto-waiting eliminates most timing-related flakiness. You can click by any locator strategy and customize the click behavior with options.\n\nFor special click types, use dblclick() for double-click, click(button="right") for right-click, and click(modifiers=["Shift"]) for modified clicks.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Basic click (auto-waits for element)
    page.click("#submit-button")

    # Click with locator
    page.locator(".nav-link").first.click()

    # Double click
    page.dblclick("#editable-text")

    # Right click
    page.click("#context-menu-target", button="right")

    # Shift+Click
    page.click(".item", modifiers=["Shift"])

    # Click at specific position within element
    page.click("#canvas", position={"x": 100, "y": 50})

    # Force click (skip actionability checks)
    page.click("#hidden-btn", force=True)

    # Click and wait for navigation
    with page.expect_navigation():
        page.click("a.nav-link")
    print(f"Navigated to: {page.url}")

    browser.close()`,
            output: `Navigated to: https://example.com/about`,
          },
          {
            heading: 'Filling Inputs',
            content:
              'page.fill() clears an input field and types the given text. It is the primary way to enter text in Playwright. Unlike type() which simulates individual keystrokes, fill() sets the value directly and fires input/change events — making it much faster.\n\nUse page.type() when you need to simulate real keystroke-by-keystroke typing, such as for autocomplete fields or when the application listens for individual keydown/keyup events.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/form")

    # fill() - clears and sets value instantly
    page.fill("#name", "John Doe")
    page.fill("#email", "john@example.com")

    # type() - simulates keystroke by keystroke (slower)
    page.type("#search", "playwright tutorial", delay=50)

    # fill() with locator
    page.locator("#address").fill("123 Main St")

    # Clear a field
    page.fill("#name", "")  # Empty string clears

    # Fill a textarea
    page.fill("textarea#notes", "Line 1\\nLine 2\\nLine 3")

    # Read the current value
    value = page.input_value("#email")
    print(f"Email value: {value}")

    browser.close()`,
            output: `Email value: john@example.com`,
            tip: 'Use fill() for most text input scenarios — it is faster and more reliable. Use type() only when the application specifically needs keystroke events (like autocomplete dropdowns).',
          },
          {
            heading: 'Form Submission',
            content:
              'Playwright provides multiple ways to submit forms. You can click the submit button, press Enter in an input field, or call page.locator("form").evaluate("form => form.submit()"). The most natural approach is clicking the submit button using get_by_role("button").\n\nFor forms that trigger navigation, wrap the submission in expect_navigation() to wait for the page to load after submission.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/form")

    # Fill the form
    page.fill("#username", "testuser")
    page.fill("#password", "secret")

    # Method 1: Click submit button
    page.get_by_role("button", name="Login").click()

    # Method 2: Press Enter in an input field
    page.fill("#search", "query")
    page.press("#search", "Enter")

    # Method 3: Programmatic form submission
    page.locator("form").evaluate("form => form.submit()")

    # Wait for navigation after form submission
    page.goto("https://example.com/form")
    page.fill("#email", "test@example.com")
    with page.expect_navigation():
        page.click("#submit")
    print(f"After submit: {page.url}")

    browser.close()`,
            output: `After submit: https://example.com/success`,
          },
        ],
        quiz: [
          {
            question: 'What does Playwright auto-wait for before clicking?',
            options: [
              'Only element presence',
              'Visible, stable, enabled, and not obscured',
              'Only visibility',
              'Nothing, clicks immediately',
            ],
            correctIndex: 1,
            explanation: 'Playwright waits for the element to be visible, stable (not animating), enabled, and receiving pointer events (not obscured) before clicking.',
          },
          {
            question: 'What is the difference between fill() and type()?',
            options: [
              'No difference',
              'fill() sets value directly; type() simulates individual keystrokes',
              'fill() is for textareas; type() is for inputs',
              'type() is deprecated',
            ],
            correctIndex: 1,
            explanation: 'fill() clears and sets the value instantly. type() simulates typing each character one by one, firing individual keystroke events.',
          },
          {
            question: 'How do you press Enter in an input field?',
            options: [
              'page.enter("#input")',
              'page.press("#input", "Enter")',
              'page.submit("#input")',
              'page.key("Enter")',
            ],
            correctIndex: 1,
            explanation: 'page.press(selector, "Enter") simulates pressing the Enter key while the specified element is focused.',
          },
        ],
        challenge: {
          prompt: 'Write a script that fills a login form with username "admin" and password "pass123", clicks the login button, and verifies navigation happened by printing the new URL.',
          starterCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/login")

    # TODO: Fill username and password

    # TODO: Click login and wait for navigation

    # TODO: Print new URL

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/login")

    page.fill("#username", "admin")
    page.fill("#password", "pass123")

    with page.expect_navigation():
        page.get_by_role("button", name="Login").click()

    print(f"Navigated to: {page.url}")

    browser.close()`,
          hints: [
            'Use page.fill() for both fields.',
            'Wrap the click in page.expect_navigation() context manager.',
            'Use page.url to get the current URL after navigation.',
          ],
        },
      },
      {
        id: 'pw-interact-keyboard',
        title: 'Keyboard & Mouse',
        difficulty: 'intermediate',
        tags: ['playwright', 'keyboard', 'mouse', 'keys', 'hover'],
        sections: [
          {
            heading: 'Keyboard Operations',
            content:
              'Playwright provides fine-grained keyboard control through page.keyboard. You can press individual keys, type text, and hold down modifier keys. The press() method supports key names like "Enter", "Tab", "Escape", "ArrowDown", and combinations like "Control+c".\n\npage.press() targets a specific element, while page.keyboard methods work at the page level regardless of focus.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Press a key on a specific element
    page.press("#search", "Enter")

    # Keyboard shortcuts
    page.press("body", "Control+a")  # Select all
    page.press("body", "Control+c")  # Copy

    # Arrow keys for navigation
    page.press("#dropdown", "ArrowDown")
    page.press("#dropdown", "ArrowDown")
    page.press("#dropdown", "Enter")

    # Tab between fields
    page.press("#field1", "Tab")

    # Escape to close modal
    page.press("body", "Escape")

    # Type with page.keyboard (page-level)
    page.keyboard.type("Hello World")
    page.keyboard.press("Enter")

    # Hold modifier keys
    page.keyboard.down("Shift")
    page.keyboard.press("ArrowRight")
    page.keyboard.press("ArrowRight")
    page.keyboard.up("Shift")
    print("Selected two characters with Shift+Arrow")

    browser.close()`,
            output: `Selected two characters with Shift+Arrow`,
          },
          {
            heading: 'Mouse Operations',
            content:
              'page.mouse provides low-level mouse control for hover, click at coordinates, drag, and scroll. For most interactions, use the higher-level locator methods (click, hover), but page.mouse is useful for canvas interactions, custom drag-and-drop, and precise coordinate-based actions.\n\nThe hover() method on locators is the most common mouse operation — it moves the mouse over an element to trigger hover states like dropdown menus or tooltips.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Hover over an element (high-level)
    page.locator(".dropdown-trigger").hover()
    print("Hovered over dropdown")

    # Click at coordinates (low-level)
    page.mouse.click(100, 200)

    # Double click at coordinates
    page.mouse.dblclick(300, 400)

    # Drag operation with mouse
    page.mouse.move(100, 100)
    page.mouse.down()
    page.mouse.move(300, 300, steps=10)  # Smooth movement
    page.mouse.up()
    print("Drag complete")

    # Mouse wheel / scroll
    page.mouse.wheel(0, 500)  # Scroll down 500px
    print("Scrolled down")

    browser.close()`,
            output: `Hovered over dropdown
Drag complete
Scrolled down`,
          },
          {
            heading: 'Drag and Drop',
            content:
              'Playwright provides a built-in drag_to() method on locators for drag-and-drop operations. This is more reliable than manual mouse operations because it handles all the necessary mouse events automatically.\n\nFor more control, you can also use the manual approach with locator.hover(), page.mouse.down(), target.hover(), page.mouse.up().',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/drag-demo")

    # Simple drag and drop
    source = page.locator("#draggable")
    target = page.locator("#droppable")
    source.drag_to(target)
    print("Drag and drop complete!")

    # Manual drag for more control
    item = page.locator("#item")
    zone = page.locator("#drop-zone")

    item.hover()
    page.mouse.down()
    zone.hover()
    page.mouse.up()
    print("Manual drag complete!")

    # Drag with specific positions
    source2 = page.locator("#card")
    target2 = page.locator("#target-area")
    source2.drag_to(
        target2,
        source_position={"x": 10, "y": 10},
        target_position={"x": 50, "y": 50},
    )
    print("Precise drag complete!")

    browser.close()`,
            output: `Drag and drop complete!
Manual drag complete!
Precise drag complete!`,
          },
        ],
        quiz: [
          {
            question: 'How do you simulate Ctrl+C in Playwright?',
            options: [
              'page.keyboard.copy()',
              'page.press("body", "Control+c")',
              'page.shortcut("copy")',
              'page.keyboard.ctrl("c")',
            ],
            correctIndex: 1,
            explanation: 'Use page.press() with the modifier key combination "Control+c" to simulate Ctrl+C.',
          },
          {
            question: 'What method is used for drag-and-drop on locators?',
            options: ['drag_and_drop()', 'drag_to()', 'move_to()', 'drop_on()'],
            correctIndex: 1,
            explanation: 'Use source.drag_to(target) to perform drag-and-drop between two locators.',
          },
          {
            question: 'What does page.mouse.wheel(0, 500) do?',
            options: [
              'Moves the mouse 500px right',
              'Scrolls down 500 pixels',
              'Zooms in 500%',
              'Rotates 500 degrees',
            ],
            correctIndex: 1,
            explanation: 'page.mouse.wheel(deltaX, deltaY) dispatches a scroll event. wheel(0, 500) scrolls down 500 pixels.',
          },
        ],
        challenge: {
          prompt: 'Write a script that hovers over an element with class "menu-trigger" to show a dropdown, then clicks a menu item with text "Settings", and finally presses Escape to close any open dialog.',
          starterCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # TODO: Hover over .menu-trigger

    # TODO: Click "Settings" menu item

    # TODO: Press Escape

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    page.locator(".menu-trigger").hover()
    page.get_by_text("Settings").click()
    page.keyboard.press("Escape")
    print("Menu interaction complete")

    browser.close()`,
          hints: [
            'Use .hover() on the locator to trigger the dropdown.',
            'Use get_by_text("Settings") to find the menu item.',
            'Use page.keyboard.press("Escape") for the Escape key.',
          ],
        },
      },
      {
        id: 'pw-interact-select',
        title: 'Selecting Options',
        difficulty: 'beginner',
        tags: ['playwright', 'select', 'dropdown', 'checkbox', 'radio'],
        sections: [
          {
            heading: 'Dropdown Select Elements',
            content:
              'Playwright handles native HTML <select> elements with the select_option() method. You can select by value, label (visible text), or index. For multi-select elements, pass an array of values. The method returns the selected values.\n\nThis only works for native <select> elements. Custom dropdown widgets built with divs need regular click-based interaction.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/form")

    # Select by value attribute
    page.select_option("#country", "us")

    # Select by visible label text
    page.select_option("#country", label="United Kingdom")

    # Select by index
    page.select_option("#country", index=2)

    # Multi-select
    page.select_option("#languages", ["python", "javascript", "rust"])

    # Read selected value
    value = page.locator("#country").input_value()
    print(f"Selected: {value}")

    # Get all options
    options = page.locator("#country option").all_text_contents()
    print(f"Available: {options[:3]}")

    browser.close()`,
            output: `Selected: uk
Available: ['Select...', 'United States', 'United Kingdom']`,
          },
          {
            heading: 'Checkboxes and Radio Buttons',
            content:
              'Playwright provides check(), uncheck(), and set_checked() for checkbox and radio button interactions. These methods auto-wait and verify the element is the correct type. The is_checked() method lets you query the current state.\n\ncheck() is idempotent — calling it on an already checked checkbox does nothing. Similarly, uncheck() on an unchecked checkbox is a no-op.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/form")

    # Check a checkbox
    page.check("#agree-terms")
    print(f"Terms checked: {page.is_checked('#agree-terms')}")

    # Uncheck a checkbox
    page.uncheck("#newsletter")
    print(f"Newsletter checked: {page.is_checked('#newsletter')}")

    # Set to specific state
    page.set_checked("#dark-mode", True)
    page.set_checked("#dark-mode", False)

    # Radio buttons
    page.check("#plan-premium")
    print(f"Premium selected: {page.is_checked('#plan-premium')}")

    # Using locators with role
    page.get_by_role("checkbox", name="Remember me").check()
    page.get_by_role("radio", name="Monthly").check()

    # Check state with locator
    is_monthly = page.get_by_role("radio", name="Monthly").is_checked()
    print(f"Monthly plan: {is_monthly}")

    browser.close()`,
            output: `Terms checked: True
Newsletter checked: False
Premium selected: True
Monthly plan: True`,
          },
          {
            heading: 'Custom Dropdowns',
            content:
              'Many modern web apps use custom dropdown components instead of native <select> elements. These are built with divs, buttons, and lists styled to look like dropdowns. To interact with these, you need to click the trigger, wait for options to appear, and click the desired option.\n\nThe pattern is: click trigger -> wait for menu -> click option. Playwright\'s auto-waiting handles most timing issues.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/form")

    # Custom dropdown: click trigger to open
    page.click(".custom-select-trigger")

    # Click the desired option from the dropdown list
    page.locator(".custom-select-option", has_text="Python").click()
    print("Selected Python from custom dropdown")

    # Another pattern: combobox with search
    page.click(".combobox-input")
    page.fill(".combobox-input", "Java")
    page.locator(".combobox-option", has_text="JavaScript").click()
    print("Selected JavaScript from combobox")

    # Verify selection
    selected = page.locator(".custom-select-trigger").text_content()
    print(f"Current selection: {selected}")

    browser.close()`,
            output: `Selected Python from custom dropdown
Selected JavaScript from combobox
Current selection: Python`,
            tip: 'For custom dropdowns, use the browser DevTools to understand the markup structure. Look for the trigger element, the options container, and individual option elements.',
          },
        ],
        quiz: [
          {
            question: 'Which method selects an option from a native <select> element?',
            options: ['page.choose()', 'page.select_option()', 'page.pick()', 'page.click_option()'],
            correctIndex: 1,
            explanation: 'page.select_option() is the dedicated method for native HTML <select> elements.',
          },
          {
            question: 'What happens if you call check() on an already checked checkbox?',
            options: [
              'It unchecks it (toggle)',
              'It throws an error',
              'Nothing, it is idempotent',
              'It checks it again',
            ],
            correctIndex: 2,
            explanation: 'check() is idempotent — if the checkbox is already checked, it does nothing.',
          },
          {
            question: 'How do you interact with custom (non-native) dropdown components?',
            options: [
              'Use select_option()',
              'Click the trigger, wait for options, click the option',
              'Use get_by_role("combobox")',
              'They cannot be automated',
            ],
            correctIndex: 1,
            explanation: 'Custom dropdowns are built with regular HTML elements, so you interact with them using standard click operations: open the dropdown, then click the desired option.',
          },
        ],
        challenge: {
          prompt: 'Write a script that selects "Python" from a native <select> with ID "language" by label, checks a checkbox with ID "agree", and verifies both selections by printing their states.',
          starterCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/form")

    # TODO: Select "Python" from #language

    # TODO: Check #agree checkbox

    # TODO: Print both states

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/form")

    page.select_option("#language", label="Python")
    print(f"Language: {page.locator('#language').input_value()}")

    page.check("#agree")
    print(f"Agreed: {page.is_checked('#agree')}")

    browser.close()`,
          hints: [
            'Use select_option with label="Python".',
            'Use page.check("#agree") for the checkbox.',
            'Use input_value() and is_checked() to verify.',
          ],
        },
      },
      {
        id: 'pw-interact-upload',
        title: 'File Upload',
        difficulty: 'intermediate',
        tags: ['playwright', 'file', 'upload', 'input', 'filechooser'],
        sections: [
          {
            heading: 'Basic File Upload',
            content:
              'Playwright handles file uploads through the set_input_files() method on file input locators. You can upload a single file, multiple files, or even create files from buffers. The method automatically handles the file input interaction without needing to open the OS file picker.\n\nUnlike Selenium where you send the file path as text, Playwright uses a dedicated method that properly sets the files and dispatches all necessary events.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/upload")

    # Upload a single file
    page.locator("#file-input").set_input_files("document.pdf")
    print("Single file uploaded")

    # Upload multiple files
    page.locator("#multi-upload").set_input_files([
        "file1.txt",
        "file2.txt",
        "file3.txt",
    ])
    print("Multiple files uploaded")

    # Clear file selection
    page.locator("#file-input").set_input_files([])
    print("Files cleared")

    # Upload from buffer (no file on disk needed)
    page.locator("#file-input").set_input_files({
        "name": "test.txt",
        "mimeType": "text/plain",
        "buffer": b"Hello, World!",
    })
    print("Buffer file uploaded")

    browser.close()`,
            output: `Single file uploaded
Multiple files uploaded
Files cleared
Buffer file uploaded`,
          },
          {
            heading: 'File Chooser Events',
            content:
              'Some upload buttons do not have a visible file input — they trigger the file picker through JavaScript. For these, use page.expect_file_chooser() to intercept the file chooser dialog and set the files programmatically.\n\nThis pattern works regardless of how the upload is triggered — whether by a visible input, a styled button, or a drag-and-drop zone that falls back to a file picker.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/upload")

    # Handle file chooser dialog
    with page.expect_file_chooser() as fc_info:
        page.click("#upload-button")  # Button that opens file picker
    file_chooser = fc_info.value
    file_chooser.set_files("report.pdf")
    print("File selected via file chooser")

    # Check if file chooser allows multiple files
    with page.expect_file_chooser() as fc_info:
        page.click("#multi-upload-btn")
    file_chooser = fc_info.value
    if file_chooser.is_multiple:
        file_chooser.set_files(["doc1.pdf", "doc2.pdf"])
        print("Multiple files selected")
    else:
        file_chooser.set_files("doc1.pdf")
        print("Single file selected")

    browser.close()`,
            output: `File selected via file chooser
Multiple files selected`,
            tip: 'Always prefer set_input_files() on the input element directly when possible. Use expect_file_chooser() only when there is no accessible file input element.',
          },
          {
            heading: 'Verifying Uploads',
            content:
              'After uploading, you often need to verify that the upload succeeded. Check for confirmation messages, uploaded file names in the UI, or network requests that carry the file data. Playwright\'s network monitoring can help verify the upload request.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/upload")

    # Monitor network for upload request
    with page.expect_response(
        lambda r: "upload" in r.url and r.status == 200
    ) as response_info:
        page.locator("#file-input").set_input_files("test.pdf")
        page.click("#upload-submit")

    response = response_info.value
    print(f"Upload status: {response.status}")

    # Verify file appears in UI
    uploaded_name = page.locator(".uploaded-file-name").text_content()
    print(f"Uploaded file: {uploaded_name}")

    # Verify success message
    success = page.locator(".upload-success")
    success.wait_for(state="visible")
    print(f"Message: {success.text_content()}")

    browser.close()`,
            output: `Upload status: 200
Uploaded file: test.pdf
Message: File uploaded successfully!`,
          },
        ],
        quiz: [
          {
            question: 'What method sets files on a file input in Playwright?',
            options: ['send_keys()', 'set_input_files()', 'upload_files()', 'attach_files()'],
            correctIndex: 1,
            explanation: 'set_input_files() is Playwright\'s method for setting files on a file input element.',
          },
          {
            question: 'How do you clear a file selection?',
            options: [
              'set_input_files(None)',
              'set_input_files([])',
              'clear_files()',
              'remove_files()',
            ],
            correctIndex: 1,
            explanation: 'Pass an empty array [] to set_input_files() to clear the file selection.',
          },
          {
            question: 'When should you use expect_file_chooser()?',
            options: [
              'Always for file uploads',
              'When the upload is triggered by JS and there is no accessible file input',
              'Only for multiple file uploads',
              'Only in headless mode',
            ],
            correctIndex: 1,
            explanation: 'Use expect_file_chooser() when the file picker is triggered by JavaScript and there is no visible/accessible file input element to call set_input_files() on.',
          },
        ],
        challenge: {
          prompt: 'Write a script that uploads "photo.jpg" to a file input with ID "avatar", then handles a file chooser triggered by clicking "#upload-btn" to upload "document.pdf".',
          starterCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/upload")

    # TODO: Upload photo.jpg via file input

    # TODO: Handle file chooser from #upload-btn

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/upload")

    page.locator("#avatar").set_input_files("photo.jpg")
    print("Avatar uploaded")

    with page.expect_file_chooser() as fc_info:
        page.click("#upload-btn")
    fc_info.value.set_files("document.pdf")
    print("Document uploaded")

    browser.close()`,
          hints: [
            'Use set_input_files() directly on the file input locator.',
            'Use page.expect_file_chooser() as a context manager.',
            'Call set_files() on the file_chooser value.',
          ],
        },
      },
    ],
  },
];
