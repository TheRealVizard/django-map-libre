"""Random categorical legend builders for color and icon schemes."""

from django.http import HttpRequest
from django.urls import reverse

from integration.constants import DEFAULT_FEATURE_COUNT
from integration.icons import ICONS, random_hex_color


def build_color_legend_entry(index: int) -> tuple[str, dict]:
    """Return a ``(key, entry)`` pair for a color categorical legend."""
    return f"P{index}", {"label": f"Parcel ID: {index}", "color": random_hex_color()}


def build_icon_legend_entry(index: int, request: HttpRequest) -> tuple[str, dict]:
    """Return a ``(key, entry)`` pair for an icon categorical legend."""
    names = list(ICONS)
    name = names[index % len(names)]
    icon_url = request.build_absolute_uri(reverse("icon", args=[name]))
    return f"P{index}", {"label": name.capitalize(), "icon": icon_url}


def build_color_legend(request: HttpRequest) -> dict:
    """Return a random categorical color legend keyed by parcel id."""
    count = int(request.GET.get("count", DEFAULT_FEATURE_COUNT))
    return dict(build_color_legend_entry(i) for i in range(count))


def build_icon_legend(request: HttpRequest) -> dict:
    """Return a random categorical icon legend keyed by parcel id."""
    count = int(request.GET.get("count", DEFAULT_FEATURE_COUNT))
    return dict(build_icon_legend_entry(i, request) for i in range(count))
