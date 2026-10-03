import json
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any, ClassVar

from django.forms.widgets import Script, Widget

from django_map_libre.helpers import (
    AnchorType,
    ColorSchemeType,
    Coordinate,
    Display,
    ImportMap,
    LayerType,
    MetricSystem,
    OverlapType,
    Position,
)

# ---------------------------------------------------------------------------
# Legend hierarchy
# ---------------------------------------------------------------------------
#
# A Legend describes how a GeoJSON feature is turned into something the user
# can see on the map: a fill, a line, a circle or an icon.
#
# The hierarchy is split by COLOR SCHEME TYPE, not by layer type:
#
#     Legend (abstract)
#     ├── FixedLegend       -> every feature looks the same
#     ├── CategoricalLegend -> one color/icon per distinct value
#     └── RangeLegend       -> color interpolated over a numeric range
#
# Styling that depends on the LAYER type (circle radius, icon size, etc.)
# lives on the base class because any legend type can be combined with any
# layer type. Only the scheme-specific fields live on the subclasses.
#
# Cross-validation between a legend and its parent layer (for example, that
# icon styling is not used on a FILL layer) is done by OverlayLayer, because
# the legend itself does not know which layer_type it will be attached to.
# ---------------------------------------------------------------------------


@dataclass(kw_only=True)
class Legend(ABC):
    """
    Base class for every legend attached to an OverlayLayer.

    A legend is a "coloring scheme": it answers the question "given a
    GeoJSON feature, what should it look like?". The answer depends on the
    legend type (fixed, categorical, range), which is why this class is
    abstract.

    Every legend has:

    * a unique ``id`` and a human-readable ``label``;
    * an ``active`` flag, because a layer may carry several legends but
      only one is rendered at a time;
    * optional circle/icon styling, shared by all legend types, that is
      only meaningful when the parent layer has the matching layer type.

    :param id: Unique identifier of the legend inside an OverlayLayer.
        The frontend uses it to switch between legends.
    :param label: Text shown in the legend selector.
    :param active: Whether this legend is currently rendered. If no legend
        is active when the parent OverlayLayer is built, the first one is
        activated automatically.
    :param circle_radius: Radius, in pixels, of the rendered circle. Only
        used when the parent layer has ``layer_type == LayerType.CIRCLE``.
    :param circle_opacity: Fill opacity of the circle, between 0 and 1.
    :param circle_stroke_color: Hex color of the circle stroke, e.g.
        ``"#FF0000"``.
    :param circle_stroke_width: Width, in pixels, of the circle stroke.
    :param icon_size: Size, in pixels, of the rendered icon. Only used when
        the parent layer has ``layer_type == LayerType.ICON``.
    :param icon_overlap: Strategy used when two icons overlap.
    :param icon_anchor: Anchor point of the icon relative to the feature
        coordinate.
    """

    # --- Identity (required) ----------------------------------------------
    id: str
    """Unique identifier of the legend inside its parent OverlayLayer."""

    label: str
    """Human readable name shown in the legend selector."""

    # --- State -------------------------------------------------------------
    active: bool = False
    """Whether this legend is the one currently rendered on the map."""

    # --- Circle styling (LayerType.CIRCLE only) ---------------------------
    circle_radius: float | None = None
    """Radius in pixels of the circle. Circle layers only."""

    circle_opacity: float | None = None
    """Fill opacity of the circle, between 0 and 1. Circle layers only."""

    circle_stroke_color: str | None = None
    """Hex color of the circle stroke. Circle layers only."""

    circle_stroke_width: float | None = None
    """Width in pixels of the circle stroke. Circle layers only."""

    # --- Icon styling (LayerType.ICON only) -------------------------------
    icon_size: float | None = None
    """Size in pixels of the icon. Icon layers only."""

    icon_overlap: OverlapType | None = None
    """Overlap strategy for icons. Icon layers only."""

    icon_anchor: AnchorType | None = None
    """Anchor point of the icon. Icon layers only."""

    # --- Class metadata ----------------------------------------------------
    type: ClassVar[ColorSchemeType]
    """Discriminator telling the frontend which scheme this legend uses."""

    # --- Serialization -----------------------------------------------------
    def to_dict(self) -> dict[str, Any]:
        """
        Serialize the legend to a JSON-friendly dictionary.

        Common fields are emitted here; the subclass contributes its own
        fields through ``type_specific_dict``. Keys whose value is ``None``
        are stripped so the frontend only receives what was configured
        explicitly.

        :return: Dictionary ready to be serialized to JSON.
        """
        data: dict[str, Any] = {
            "id": self.id,
            "label": self.label,
            "type": self.type.value,
            "active": self.active,
            "circleRadius": self.circle_radius,
            "circleOpacity": self.circle_opacity,
            "circleStrokeColor": self.circle_stroke_color,
            "circleStrokeWidth": self.circle_stroke_width,
            "iconSize": self.icon_size,
            "iconOverlap": (
                self.icon_overlap.value if self.icon_overlap is not None else None
            ),
            "iconAnchor": (
                self.icon_anchor.value if self.icon_anchor is not None else None
            ),
        }
        data.update(self.type_specific_dict())
        return {k: v for k, v in data.items() if v is not None}

    @abstractmethod
    def type_specific_dict(self) -> dict[str, Any]:
        """
        Return the fields that only exist for this specific legend type.

        Implemented by every concrete subclass and merged into the output of
        ``to_dict``.

        :return: Dictionary with the type-specific fields of the legend.
        """
        raise NotImplementedError


@dataclass(kw_only=True)
class FixedLegend(Legend):
    """
    Legend that renders every feature with the SAME visual.

    Use cases:

    * ``LayerType.FILL`` / ``LayerType.LINE`` / ``LayerType.CIRCLE``:
      provide ``color`` with a hex string.
    * ``LayerType.ICON``: provide ``image`` with the URL of the icon.

    At least one of ``color`` or ``image`` must be provided. The frontend
    picks whichever matches the parent layer type.

    :param color: Hex color used for fill, line and circle layers, e.g.
        ``"#3B82F6"``.
    :param image: URL of the icon used for icon layers.
    :raises ValueError: If neither ``color`` nor ``image`` is provided.
    """

    type: ClassVar[ColorSchemeType] = ColorSchemeType.FIXED

    color: str | None = None
    """Hex color for fill, line and circle layers."""

    image: str | None = None
    """URL of the icon for icon layers."""

    def __post_init__(self) -> None:
        if self.color is None and self.image is None:
            raise ValueError(
                "FixedLegend requires 'color' (fill/line/circle) or 'image' (icon)."
            )

    def type_specific_dict(self) -> dict[str, Any]:
        """
        :return: Dictionary with the fields specific to FixedLegend.
        """
        return {
            "color": self.color,
            "image": self.image,
        }


@dataclass(kw_only=True)
class CategoricalLegend(Legend):
    """
    Legend that assigns a distinct visual to each distinct value found in
    ``coloring_property``.

    How the visual is chosen:

    The value of ``coloring_property`` on each feature is matched against
    the keys of ``category_mapping``. The matching entry describes how the
    feature is rendered:

    * ``label``: text shown in the legend. If missing, the resolution order
      described in ``display_property`` applies.
    * ``color``: color used for fill, line and circle layers. If missing, a
      random one is generated by the frontend.
    * ``icon``: icon used for icon layers. If missing, a generic marker is
      used. Unlike ``color``, a unique icon is NEVER generated
      automatically, because that would be meaningless. For icon layers,
      ``category_mapping`` must be a ``dict`` or a URL ``str``; ``None`` is
      not allowed.

    How the label is resolved, in this exact order, first hit wins:

    1. ``label`` inside the matching ``category_mapping`` entry.
    2. The value of ``display_property`` on the feature, if provided.
    3. The value of ``coloring_property`` on the feature, title-cased.

    Forms of ``category_mapping``:

    * ``dict``: static mapping.
    * ``str``: URL returning a JSON object with the same shape.
    * ``None``: auto-generated from the data. Only valid for fill, line and
      circle layers. NOT allowed for icon layers.

    Example of a static ``category_mapping`` for a fill/line/circle layer,
    with ``color`` provided for every entry::

        {
            "residential": {"label": "Residential", "color": "#FFD700"},
            "commercial":  {"label": "Commercial",  "color": "#FF4500"},
            "industrial":  {"label": "Industrial",  "color": "#8A2BE2"},
        }

    Example of a static ``category_mapping`` for a fill/line/circle layer,
    where ``color`` is omitted for some entries. Those entries get a random
    color generated by the frontend::

        {
            "residential": {"label": "Residential", "color": "#FFD700"},
            "commercial":  {"label": "Commercial"},
            "industrial":  {"label": "Industrial"},
        }

    Example of a static ``category_mapping`` for an icon layer. Note that
    ``icon`` is optional: entries without it fall back to a generic marker,
    not to a randomly generated icon::

        {
            "hospital": {"label": "Hospital", "icon": "svg/hospital.svg"},
            "school":   {"label": "School",   "icon": "svg/school.svg"},
            "park":     {"label": "Park"},
        }

    In this example, ``"park"`` features are rendered with the generic
    marker, because no specific icon was provided.

    Note that ``color`` is meaningless for icon layers and ``icon`` is
    meaningless for fill/line/circle layers. Providing both is not an
    error, the frontend simply ignores the one that does not apply.

    Example of a ``str`` value::

        "https://api.example.com/legend/categories"

    The URL must return a JSON object with the same shape as the static
    dict examples above.

    :param coloring_property: Feature property whose value is matched
        against the category mapping. Required.
    :param display_property: Optional feature property used as the display
        label for each category, when the mapping entry does not provide
        one.
    :param category_mapping: Static dict, URL string, or ``None`` to
        auto-generate. ``None`` is only valid for fill, line and circle
        layers.
    :raises ValueError: If ``coloring_property`` is empty, if
        ``category_mapping`` is neither a dict, a non-empty string, nor
        ``None``, or if any entry of a dict ``category_mapping`` has an
        invalid shape or unknown keys.
    """

    type: ClassVar[ColorSchemeType] = ColorSchemeType.CATEGORICAL

    coloring_property: str
    """Feature property whose value is matched against ``category_mapping``."""

    display_property: str | None = None
    """Optional feature property used as the label when the mapping does
    not provide one."""

    category_mapping: dict[str, dict[str, str]] | str | None = None
    """Static mapping, URL to fetch one, or ``None`` to auto-generate."""

    def __post_init__(self) -> None:
        if not self.coloring_property:
            raise ValueError(
                "CategoricalLegend requires a non-empty 'coloring_property'."
            )

        if self.category_mapping is None:
            return

        if isinstance(self.category_mapping, str):
            if not self.category_mapping.strip():
                raise ValueError("category_mapping URL must be a non-empty string.")
            return

        if not isinstance(self.category_mapping, dict):
            raise ValueError(
                "category_mapping must be a dict, a non-empty URL string, "
                f"or None. Got {type(self.category_mapping).__name__}."
            )

        allowed_keys = {"label", "color", "icon"}
        for key, entry in self.category_mapping.items():
            if not isinstance(entry, dict):
                raise ValueError(
                    f"category_mapping['{key}'] must be a dict, "
                    f"got {type(entry).__name__}."
                )
            unknown = set(entry) - allowed_keys
            if unknown:
                raise ValueError(
                    f"category_mapping['{key}'] has unknown keys: "
                    f"{sorted(unknown)}. Allowed keys: {sorted(allowed_keys)}."
                )
            for field_name in allowed_keys:
                value = entry.get(field_name)
                if value is not None and not isinstance(value, str):
                    raise ValueError(
                        f"category_mapping['{key}']['{field_name}'] must be "
                        f"a string, got {type(value).__name__}."
                    )

    def type_specific_dict(self) -> dict[str, Any]:
        """
        :return: Dictionary with the fields specific to CategoricalLegend.
        """
        return {
            "coloringProperty": self.coloring_property,
            "displayProperty": self.display_property,
            "categoryMapping": self.category_mapping,
        }


@dataclass(kw_only=True)
class RangeLegend(Legend):
    """
    Legend that interpolates a color across a numeric range of values.

    The value of ``coloring_property`` on each feature is placed inside
    ``[min_value, max_value]`` and mapped to a color taken from
    ``color_ramp``. The ramp is discretized into ``num_steps`` buckets.

    A range can be configured in two mutually exclusive ways:

    * **locally**, by providing ``num_steps`` (required), and optionally
        `bounds`` and ``color_ramp``;
    * **remotely**, by providing ``config_url``. The URL must return a
    JSON object with the same shape produced by the local fields::

        {
            "numSteps": 5,
            "bounds": {"min": 0, "max": 100},
            "colorRamp": ["#0000FF", "#00FF00", "#FF0000"],
        }

    When ``config_url`` is set, ``num_steps``, ``bounds`` and
    ``color_ramp`` must NOT be provided.

    :param coloring_property: Numeric feature property that drives the
        interpolation. Required.
    :param config_url: URL returning a JSON object with ``numSteps``,
        ``bounds`` and ``colorRamp``. Mutually exclusive with the local
        fields.
    :param num_steps: Number of discrete color steps (buckets). Required.
    :param bounds: Tuple of lower bound of the range and Upper bound of the range.
        Inferred from the data when omitted.
    :param color_ramp: Ordered list of hex colors used to build the ramp,
        e.g. ``["#0000FF", "#00FF00", "#FF0000"]``. When omitted, the
        frontend generates one.
    :raises ValueError: If ``coloring_property`` is empty, if ``num_steps``
        is not greater than 1, if ``min bound`` is greater than
        ``max bound``, if ``color_ramp`` has fewer than two colors,
        if ``bounds`` does not have both bounds, and if ``num_steps`` and
        ``color_ramp`` are not even or odd.
    """

    type: ClassVar[ColorSchemeType] = ColorSchemeType.RANGE

    coloring_property: str
    """Numeric feature property that drives the color interpolation."""

    config_url: str | None = None
    """URL returning a JSON object with ``numSteps``, ``bounds`` and ``colorRamp``."""

    num_steps: int | None = None
    """Number of discrete color steps (buckets) the range is split into."""

    bounds: tuple[float, float] | None = None
    """Lower and Upper bounds of the range. Inferred from the data when omitted."""

    color_ramp: list[str] | None = None
    """Ordered list of hex colors used to build the ramp."""

    def __post_init__(self) -> None:
        if not self.coloring_property:
            raise ValueError("RangeLegend requires a non-empty 'coloring_property'.")

        if self.config_url is not None:
            if not self.config_url.strip():
                raise ValueError("config_url must be a non-empty string.")
            if any(
                v is not None for v in (self.num_steps, self.bounds, self.color_ramp)
            ):
                raise ValueError(
                    "When 'config_url' is set, 'num_steps', 'bounds' and "
                    "'color_ramp' must not be provided."
                )
            return

        if self.num_steps <= 1:
            raise ValueError("num_steps must be greater than 1.")
        elif (
            self.color_ramp is not None
            and self.num_steps % 2 != len(self.color_ramp) % 2
        ):
            raise ValueError("Both `num_steps` and `color_ramp` must be even or odd.")

        if self.bounds is not None and len(self.bounds) < 2:
            raise ValueError("Missing bound.")
        elif self.bounds is not None and len(self.bounds) > 2:
            raise ValueError("Only 2 values were expected.")
        elif self.bounds is not None:
            min_value, max_value = self.bounds
            if (
                min_value is not None
                and max_value is not None
                and min_value > max_value
            ):
                raise ValueError("Min bound cannot be greater than Max bound.")

        if self.color_ramp is not None and len(self.color_ramp) < 2:
            raise ValueError("color_ramp must contain at least two colors.")

    def type_specific_dict(self) -> dict[str, Any]:
        """
        :return: Dictionary with the fields specific to RangeLegend.
        """
        return {
            "coloringProperty": self.coloring_property,
            "numSteps": self.num_steps,
            "bounds": None
            if self.bounds is None
            else {
                "min": self.bounds[0],
                "max": self.bounds[1],
            },
            "colorRamp": self.color_ramp,
            "configUrl": self.config_url,
        }


# ---------------------------------------------------------------------------
# Layers
# ---------------------------------------------------------------------------


@dataclass
class Layer:
    """
    Base class for anything that can be listed in the layer selector.

    :param id: Unique identifier of the layer.
    :param label: Text shown in the layer selector.
    :param selected: Whether the layer is selected (visible) when the map
        loads.
    """

    id: str
    label: str
    selected: bool


@dataclass
class TileLayer(Layer):
    """
    Raster tile layer, typically a basemap from a tile server.

    :param url: Tile URL template, e.g.
        ``"https://tile.openstreetmap.org/{z}/{x}/{y}.png"``.
    :param attribution: HTML attribution string shown in the corner of the
        map.
    """

    url: str
    attribution: str

    def to_dict(self) -> dict[str, Any]:
        """
        :return: Dictionary ready to be serialized to JSON.
        """
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
    GeoJSON overlay layer rendered with one or more legends.

    Exactly one legend is active at a time: the one the frontend uses to
    render the features. If none is marked active when the layer is built,
    the first one is activated automatically.

    In addition to the local validation done by each Legend subclass, this
    layer cross-validates its legends against its own ``layer_type``:

    * ``circle_*`` styling is only allowed on ``CIRCLE`` layers.
    * ``icon_*`` styling is only allowed on ``ICON`` layers.
    * ``FixedLegend`` on an ``ICON`` layer must provide ``image``.
    * ``FixedLegend`` on FILL/LINE/CIRCLE must provide ``color``.
    * ``CategoricalLegend`` on an ``ICON`` layer cannot have
      ``category_mapping=None``, because icons are never auto-generated.

    :param url: URL of the GeoJSON document describing the features.
    :param legends: Legends available for this layer. Must contain at least
        one.
    :param layer_type: How the features are rendered: fill, line, circle or
        icon.
    :raises ValueError: If ``legends`` is empty, if more than one legend is
        active, or if any legend is incompatible with ``layer_type``.
    """

    url: str
    legends: list[Legend]
    layer_type: LayerType = LayerType.FILL

    def __post_init__(self) -> None:
        if not self.legends:
            raise ValueError("OverlayLayer must have at least one Legend.")

        active_legends = [legend for legend in self.legends if legend.active]
        if len(active_legends) > 1:
            raise ValueError(
                f"OverlayLayer '{self.id}' has {len(active_legends)} active "
                "legends, but at most one can be active."
            )
        if not active_legends:
            self.legends[0].active = True

        for legend in self.legends:
            self.validate_legend(legend)

    def validate_legend(self, legend: Legend) -> None:
        """
        Check that a legend is compatible with this layer's ``layer_type``.

        :param legend: The legend to validate against this layer.
        :raises ValueError: If the legend uses styling that does not match
            the layer type, or lacks fields required by the layer type.
        """
        uses_circle_styling = any(
            value is not None
            for value in (
                legend.circle_radius,
                legend.circle_opacity,
                legend.circle_stroke_color,
                legend.circle_stroke_width,
            )
        )
        uses_icon_styling = any(
            value is not None
            for value in (
                legend.icon_size,
                legend.icon_overlap,
                legend.icon_anchor,
            )
        )

        if self.layer_type == LayerType.CIRCLE:
            if uses_icon_styling:
                raise ValueError(
                    f"Legend '{legend.id}' uses icon styling, but layer "
                    f"'{self.id}' has layer_type CIRCLE."
                )
        elif self.layer_type == LayerType.ICON:
            if uses_circle_styling:
                raise ValueError(
                    f"Legend '{legend.id}' uses circle styling, but layer "
                    f"'{self.id}' has layer_type ICON."
                )
        else:
            if uses_circle_styling:
                raise ValueError(
                    f"Legend '{legend.id}' uses circle styling, but layer "
                    f"'{self.id}' has layer_type {self.layer_type.name}."
                )
            if uses_icon_styling:
                raise ValueError(
                    f"Legend '{legend.id}' uses icon styling, but layer "
                    f"'{self.id}' has layer_type {self.layer_type.name}."
                )

        if isinstance(legend, FixedLegend):
            if self.layer_type == LayerType.ICON:
                if legend.image is None:
                    raise ValueError(
                        f"FixedLegend '{legend.id}' on ICON layer "
                        f"'{self.id}' requires 'image'."
                    )
            else:
                if legend.color is None:
                    raise ValueError(
                        f"FixedLegend '{legend.id}' on "
                        f"{self.layer_type.name} layer '{self.id}' requires "
                        "'color'."
                    )

        if isinstance(legend, CategoricalLegend):
            if self.layer_type == LayerType.ICON and legend.category_mapping is None:
                raise ValueError(
                    f"CategoricalLegend '{legend.id}' on ICON layer "
                    f"'{self.id}' requires 'category_mapping' (dict or URL). "
                    "It cannot be None because icons are never auto-generated."
                )

    def to_dict(self) -> dict[str, Any]:
        """
        :return: Dictionary ready to be serialized to JSON, including every
            legend attached to the layer.
        """
        return {
            "id": self.id,
            "label": self.label,
            "selected": self.selected,
            "url": self.url,
            "layerType": self.layer_type.value,
            "legends": [legend.to_dict() for legend in self.legends],
        }


# ---------------------------------------------------------------------------
# Widget
# ---------------------------------------------------------------------------


class Filter: ...


class Cluster: ...


class MapWidget(Widget):
    """
    Django form widget that renders an interactive MapLibre map.

    The configuration (tile layers, overlay layers, controls, etc.) is
    serialized to JSON and attached to the container as ``data-*``
    attributes. The JavaScript module ``map-widget.js`` reads those
    attributes and initializes the map on the client side.
    """

    template_name = "django_map_libre_widget.html"

    class Media:
        js = (
            ImportMap(
                **{
                    "map-worker": "js/map-worker.js",
                    "maplibre-gl-worker": "vendor/js/maplibre-gl-worker.mjs",
                    "map-marker": "svg/map-marker.svg",
                }
            ),
            Script("js/map-widget.js", type="module"),
        )
        css = {"all": ("vendor/css/maplibre-gl.css", "css/django-map-libre.css")}

    def __init__(
        self,
        tile_layers: list[TileLayer] | None = None,
        overlay_layers: list[OverlayLayer] | None = None,
        auto_init: bool = True,
        center: Coordinate | tuple[float, float] | None = None,
        navigation_position: Position = Position.TopLeft,
        allow_fullscreen: bool = True,
        allow_download: bool = True,
        show_scale: bool = True,
        metric_unit: MetricSystem = MetricSystem.Metric,
        scale_position: Position = Position.BottomRight,
        layer_selector_position: Position = Position.TopRight,
        layer_legend_position: Position = Position.BottomLeft,
        download_position: Position = Position.TopLeft,
        legend_display: Display = Display.Expanded,
        class_name: str = "map-widget",
        loading_text: str | None = "Loading Map",
    ):
        """
        Build a new map widget.

        :param tile_layers: Basemaps available in the layer selector.
        :param overlay_layers: GeoJSON overlays available in the layer
            selector.
        :param auto_init: Initialize the map automatically on page load.
        :param center: Initial center of the map. Accepts a ``Coordinate``
            or a ``(latitude, longitude)`` tuple.
        :param navigation_position: Where to place the navigation controls.
        :param allow_fullscreen: Show the fullscreen toggle.
        :param allow_download: Show the "download as image" button.
        :param show_scale: Show the scale bar.
        :param metric_unit: Metric system used by the scale bar.
        :param scale_position: Where to place the scale bar.
        :param layer_selector_position: Where to place the layer selector.
        :param layer_legend_position: Where to place the legend selector.
        :param download_position: Where to place the download button.
        :param legend_display: Initial display of the legend.
        :param class_name: CSS class applied to the map container.
        :param loading_text: Text shown while the map is loading. ``None``
            to hide it.
        :raises ValueError: If ``center`` is a tuple that does not have
            exactly two elements.
        """
        if isinstance(center, tuple):
            if len(center) != 2:
                raise ValueError(
                    "center must have exactly 2 elements (latitude, longitude)."
                )
            lat, lon = center
            center = Coordinate(latitude=lat, longitude=lon)

        self.attrs = {
            "data-auto-init": auto_init,
            "data-navigation-position": navigation_position.value,
            "data-center": center,
            "data-tile-layer": (
                None
                if not tile_layers
                else json.dumps([layer.to_dict() for layer in tile_layers])
            ),
            "data-overlay-layer": (
                None
                if not overlay_layers
                else json.dumps([layer.to_dict() for layer in overlay_layers])
            ),
            "data-allow-fullscreen": allow_fullscreen,
            "data-allow-download": allow_download,
            "data-show-scale": show_scale,
            "data-metric-unit": metric_unit.value,
            "data-scale-position": scale_position.value,
            "data-download-position": download_position.value,
            "data-layer-selector-position": layer_selector_position.value,
            "data-layer-legend-position": layer_legend_position.value,
            "data-legend-display": legend_display.value,
            "data-loading-text": loading_text,
            "class": class_name,
        }
