"""Random categorical legend builders for color and icon schemes."""

from django.http import HttpRequest
from django.urls import reverse

from integration.constants import (
    DEFAULT_FEATURE_COUNT,
    RANGE_LEGEND_DEFAULT_STEPS,
    RANGE_LEGEND_DEFAULT_MIN,
    RANGE_LEGEND_DEFAULT_MAX,
    RANGE_LEGEND_DEFAULT_RAMP,
)
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


def build_range_legend(request: HttpRequest) -> dict:
    """Return a range legend payload for the given request."""
    steps = int(request.GET.get("steps", RANGE_LEGEND_DEFAULT_STEPS))
    min_value = float(request.GET.get("min", RANGE_LEGEND_DEFAULT_MIN))
    max_value = float(request.GET.get("max", RANGE_LEGEND_DEFAULT_MAX))
    return {
        "numSteps": steps,
        "bounds": {"min": min_value, "max": max_value},
        "colorRamp": RANGE_LEGEND_DEFAULT_RAMP,
    }
