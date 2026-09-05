import json
from dataclasses import dataclass

from django.forms.widgets import Script, Widget

from django_map_libre.helpers import (
    ColorSchemeType,
    Coordinate,
    ImportMap,
    LayerType,
    MetricSystem,
    Position,
)


@dataclass
class Legend:
    """
    Represents a coloring scheme for an overlay.
    """

    id: str
    label: str
    type: ColorSchemeType

    # For CATEGORICAL: which property to use as the key (mandatory)
    # For SEQUENTIAL: which numeric property to interpolate (mandatory)
    # For FIXED: ignored
    coloring_property: str | None = None

    # For CATEGORICAL: optional property to use as display label.
    # If not provided, the coloring_property value itself is used as label.
    display_property: str | None = None

    # For FIXED: a single color
    color: str | None = None
    # For FIXED: a single image
    image: str | None = None

    # For CATEGORICAL: mapping from coloring_property values to display info.
    # Can be:
    #   - None: auto-generated from data IF LAYER TYPE IS NOT ICON
    #       any ICON layer without category_mapping will use a default marker Icon
    #   - str: URL to fetch the mapping from an API
    #   - dict: static mapping { "value1": {"label": "Name1", "color": "#FF0000"}, ... }
    #   - dict: static mapping { "value1": {"label": "Name1", "icon": "icon/house.svg"}, ... }
    #         - If label is not provided for one of the values and display_property is provided t
    #         the display_property will be used. If not the value will be set to TitleCase and used.
    #         - If color is not provided a random one will be used
    #         - If icon is not provided a default marker will be used

    category_mapping: dict[str, dict[str, str]] | str | None = None

    # For HEATMAP: color interpolation settings # TODO: Increase settings
    min_value: float | None = None
    max_value: float | None = None
    color_ramp: list[str] | None = None  # e.g., ["#0000FF", "#00FF00", "#FF0000"]

    active: bool = False

    def __post_init__(self):
        """Validate the scheme configuration."""
        if self.type == ColorSchemeType.CATEGORICAL or self.type == ColorSchemeType.HEATMAP:
            if not self.coloring_property:
                raise ValueError("CATEGORICAL & HEATMAP schemes requires 'coloring_property'")
        elif self.type == ColorSchemeType.FIXED:
            if not self.color and not self.image:
                raise ValueError("FIXED scheme requires 'color' or 'image'")

    def to_dict(self) -> dict:
        """Serialize to dictionary for JSON output."""
        data = {
            "id": self.id,
            "label": self.label,
            "type": self.type.value,
            "coloring_property": self.coloring_property,
            "display_property": self.display_property,
            "color": self.color,
            "min_value": self.min_value,
            "max_value": self.max_value,
            "color_ramp": self.color_ramp,
            "active": self.active,
        }

        if self.category_mapping is not None:
            if isinstance(self.category_mapping, dict):
                data["category_mapping"] = self.category_mapping
            elif isinstance(self.category_mapping, str):
                data["category_mapping_url"] = self.category_mapping

        return {k: v for k, v in data.items() if v is not None}


@dataclass
class Layer:
    id: str
    label: str
    selected: bool


@dataclass
class TileLayer(Layer):
    url: str
    attribution: str

    def to_dict(self):
        return {
            "id": self.id,
            "label": self.label,
            "url": self.url,
            "attribution": self.attribution,
            "selected": self.selected,
        }


@dataclass
class OverlayLayer(Layer):
    """
    Represents a GeoJSON overlay layer with multiple coloring schemes.
    Inherits id, label, and selected from Layer.
    """

    url: str
    legends: list[Legend]
    layer_type: LayerType = LayerType.FILL

    def __post_init__(self):
        """Ensure at least one scheme is active."""
        if not self.legends:
            raise ValueError("OverlayLayer must have at least one LegendScheme.")
        # If no scheme is marked active, activate the first one
        if not any(s.active for s in self.legends):
            self.legends[0].active = True

    def to_dict(self) -> dict:
        """
        Serialize the overlay layer and its schemes to a dictionary
        that can be passed to the JavaScript frontend.
        """
        return {
            "id": self.id,
            "label": self.label,
            "selected": self.selected,
            "url": self.url,
            "layer_type": self.layer_type.value,
            "legends": [legend.to_dict() for legend in self.legends],
        }


class Filter: ...


class Cluster: ...


class MapWidget(Widget):
    template_name = "django_map_libre_widget.html"

    class Media:
        js = (
            ImportMap(
                **{
                    "map-controls": "js/map-controls.js",
                    "maplibre-gl": "vendor/js/maplibre-gl.mjs",
                }
            ),
            Script("vendor/js/maplibre-gl.mjs", type="module"),
            Script("js/map-widget.js", type="module"),
        )
        css = {"all": ("vendor/css/maplibre-gl.css", "css/django-map-libre.css")}

    def __init__(
        self,
        tile_layers: list[TileLayer] | None = None,
        overlay_layers: list[OverlayLayer] | None = None,
        auto_init: bool = True,
        auto_load: bool = True,
        center: Coordinate | tuple[float, float] | None = None,
        navigation_position: Position = Position.TopLeft,
        allow_fullscreen: bool = True,
        show_scale: bool = True,
        metric_unit: MetricSystem = MetricSystem.Metric,
        scale_position: Position = Position.BottomLeft,
        layer_selector_position: Position = Position.TopRight,
        class_name: str = "map-widget",
    ):
        """
        Initialize the MapWidget with tile and overlay layer configurations.
        :param tile_layers: List of TileLayer objects to be available in the map.
        :param overlay_layers: List of OverlayLayer objects (GeoJSON) to be available in the map.
        :param auto_init: If True, the map will be initialized automatically.
        :param auto_load: If True, the map data will be loaded automatically.
        :param center: Initial center coordinates (latitude, longitude).
        :param navigation_position: Position of navigation controls.
        :param allow_fullscreen: Whether to allow fullscreen toggle.
        :param show_scale: Whether to show the scale control.
        :param metric_unit: Metric system unit (Metric or Imperial).
        :param scale_position: Position of the scale control.
        :param layer_selector_position: Position of the layer selector control.
        :param class_name: CSS class name for the widget container.
        """
        if isinstance(center, tuple):
            if len(center) == 2:
                lat, lon = center
                center = Coordinate(latitude=lat, longitude=lon)
            else:
                raise ValueError(
                    "Center must have exactly 2 elements (latitude, longitude)"
                )

        self.attrs = {
            "data-auto-init": auto_init,
            "data-auto-load": auto_load,
            "data-navigation-position": navigation_position.value,
            "data-center": center,
            "data-tile-layer": (
                None
                if tile_layers is None or len(tile_layers) == 0
                else json.dumps([layer.to_dict() for layer in tile_layers])
            ),
            "data-overlay-layer": (
                None
                if overlay_layers is None or len(overlay_layers) == 0
                else json.dumps([layer.to_dict() for layer in overlay_layers])
            ),
            "data-allow-fullscreen": allow_fullscreen,
            "data-show-scale": show_scale,
            "data-metric-unit": metric_unit.value,
            "data-scale-position": scale_position.value,
            "data-layer-selector-position": layer_selector_position.value,
            "class": class_name,
        }
