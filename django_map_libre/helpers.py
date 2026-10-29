import json
from dataclasses import dataclass
from enum import Enum

from django.forms.widgets import MediaAsset
from django.templatetags.static import static
from django.utils.html import mark_safe
from django.utils.safestring import SafeString


@dataclass(kw_only=True)
class ColorStep:
    """A single value/color pair used by InterpolatedLegend."""

    value: float
    """Numeric position of the color in the interpolation range."""

    color: str
    """Hex color at this value."""

    def __post_init__(self) -> None:
        if not isinstance(self.value, (int, float)):
            raise TypeError("ColorStep 'value' must be a number.")
        if not isinstance(self.color, str) or not self.color.strip():
            raise ValueError("ColorStep 'color' must be a non-empty string.")


@dataclass
class Coordinate:
    longitude: float
    latitude: float

    def __str__(self):
        return json.dumps({"lng": self.longitude, "lat": self.latitude})


class Position(Enum):
    TopLeft = "top-left"
    TopRight = "top-right"
    BottomLeft = "bottom-left"
    BottomRight = "bottom-right"


class Display(Enum):
    Expanded = "expanded"
    Collapsed = "collapsed"


class MetricSystem(Enum):
    Imperial = "imperial"
    Metric = "metric"
    Nautical = "nautical"


class ColorSchemeType(str, Enum):
    FIXED = "fixed"
    CATEGORICAL = "categorical"
    RANGE = "range"
    INTERPOLATED = "interpolated"


class LayerType(str, Enum):
    """Types of layers supported by MapLibre for overlays."""

    FILL = "fill"  # Polygons (areas)
    LINE = "line"
    CIRCLE = "circle"
    ICON = "icon"  # Points with icons


class OverlapType(str, Enum):
    NEVER = "never"
    ALWAYS = "always"
    COOPERATIVE = "cooperative"


class AnchorType(str, Enum):
    CENTER = "center"
    LEFT = "left"
    RIGHT = "right"
    TOP = "top"
    BOTTOM = "bottom"
    TOP_LEFT = "top-left"
    TOP_RIGHT = "top-right"
    BOTTOM_LEFT = "bottom-left"
    BOTTOM_RIGHT = "bottom-right"


class ImportMap(MediaAsset):
    def __init__(self, **attributes):
        super().__init__("", **attributes)

    def __str__(self):
        return self.render()

    def render(self, *, attrs: dict | None = None) -> SafeString:
        attributes = {**(attrs or {}), **self.attributes}
        for k, v in attributes.items():
            attributes[k] = static(v)
        imports_json = json.dumps({"imports": attributes})
        return mark_safe(f'<script type="importmap">{imports_json}</script>')
