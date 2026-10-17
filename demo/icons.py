"""Inline SVG icon catalog and rendering helpers."""

import random
from typing import Final


ICONS: Final[dict[str, str]] = {
    "home": '<path d="M3 11l9-8 9 8v10H3z"/>',
    "heart": '<path d="M12 21s-8-5-8-11a5 5 0 019-3 5 5 0 019 3c0 6-8 11-8 11z"/>',
    "star": '<path d="M12 2l3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9z"/>',
    "check": '<path d="M4 12l6 6L20 6"/>',
    "search": '<circle cx="10" cy="10" r="7"/><path d="M15 15l6 6"/>',
    "user": '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    "bolt": '<path d="M13 2L4 14h6l-1 8 9-12h-6z"/>',
    "trash": '<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14"/>',
}


def random_hex_color() -> str:
    """Return a random hexadecimal color string in ``#RRGGBB`` form."""
    return "#{:06x}".format(random.randint(0, 0xFFFFFF))


def render_icon_svg(name: str) -> str:
    """Return an inline SVG document for the given icon name."""
    body = ICONS[name]
    fill = random_hex_color()
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" '
        f'width="24px" height="24px" fill="{fill}" stroke="black" '
        f'stroke-width="3">{body}</svg>'
    )
