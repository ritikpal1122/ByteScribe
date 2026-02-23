import uuid

from slugify import slugify as _slugify


def generate_slug(title: str, *, max_length: int = 80) -> str:
    """Create a URL-safe slug from *title* with a random suffix.

    The suffix is a short hex string derived from a UUID-4, which makes
    collisions practically impossible without requiring a database check.

    Examples
    --------
    >>> generate_slug("Hello World!")
    'hello-world-a3f7b2c1'
    """
    base = _slugify(title, max_length=max_length - 9)  # reserve room for -<8 hex chars>
    suffix = uuid.uuid4().hex[:8]
    return f"{base}-{suffix}"
