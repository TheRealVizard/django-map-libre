import json
from dataclasses import dataclass
from enum import Enum

from django.forms.widgets import MediaAsset
from django.templatetags.static import static
from django.utils.html import mark_safe
from django.utils.safestring import SafeString


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


class MetricSystem(Enum):
    Imperial = "imperial"
    Metric = "metric"


class ColorSchemeType(str, Enum):
    FIXED = "fixed"
    CATEGORICAL = "categorical"
    HEATMAP = "heatmap"


class LayerType(str, Enum):
    """Types of layers supported by MapLibre for overlays."""

    FILL = "fill"  # Polygons (areas)
    LINE = "line"
    CIRCLE = "circle"
    SYMBOL = "symbol"  # Points with icons


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
