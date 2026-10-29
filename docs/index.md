# 🗺️ django-map-libre

**django-map-libre** is a lightweight integration package that brings
[MapLibre GL](https://maplibre.org/) into your Django project with minimal
effort.

Everything is configured from Python: tile layers, GeoJSON overlays and legends.
The widget serializes the configuration to `data-*` attributes and a JavaScript
module initializes the map on the client side.

## Requirements

- Python 3.14+
- Django 5.0+

## Installation

<!-- ```bash
pip install django-map-libre
``` -->

Add the app to `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    # ...
    "django_map_libre",
]
```

This makes the widget template and the static assets discoverable by Django.

## Quickstart

`MapWidget` is a Django `Widget`. Attach it to a form field:

```python
from django import forms
from django_map_libre.helpers import LayerType
from django_map_libre.map import (
    FixedLegend,
    MapWidget,
    OverlayLayer,
    TileLayer,
)

class MapForm(forms.Form):
    map = forms.CharField(
        required=False,
        widget=MapWidget(
            tile_layers=[
                TileLayer(
                    id="osm-base",
                    label="OpenStreetMap",
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png",
                    attribution="© OpenStreetMap",
                    selected=True,
                ),
            ],
            overlay_layers=[
                OverlayLayer(
                    id="parcels",
                    label="Parcels",
                    url="/api/parcels.geojson",
                    layer_type=LayerType.FILL,
                    legends=[
                        FixedLegend(
                            id="parcels-default",
                            label="Default",
                            color="#4A90D9",
                            active=True,
                        ),
                    ],
                    selected=True,
                ),
            ],
            center=(-3.7038, 40.4168),  # (latitude, longitude)
        ),
    )
```

Render the form in your template:

```django
{{ form.media }}
{{ form }}
```

`{{ form.media }}` is required. It outputs the import map and the module script
that initializes the map. Without it, the map container stays empty.

## The `center` argument

`center` accepts two forms:

- a `Coordinate` instance:

  ```python
  from django_map_libre.helpers import Coordinate

  center=Coordinate(longitude=-3.7038, latitude=40.4168)
  ```

- a tuple in `(latitude, longitude)` order:

  ```python
  center=(-3.7038, 40.4168)
  ```

Note the tuple order: **latitude first**, longitude second. This is the opposite
of the usual GeoJSON order. If you prefer to avoid the ambiguity, use
`Coordinate`, where the field names make the order explicit.

If `center` is omitted, the map opens at MapLibre's default position.

## Widget options

`MapWidget` accepts the following keyword arguments. All of them are optional.

| Argument | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `tile_layers` | `list[TileLayer] \| None` | `None` | Basemaps available in the layer selector. |
| `overlay_layers` | `list[OverlayLayer] \| None` | `None` | GeoJSON overlays available in the layer selector. |
| `auto_init` | `bool` | `True` | Initialize the map automatically on page load. |
| `center` | `Coordinate \| tuple[float, float] \| None` | `None` | Initial center of the map. |
| `navigation_position` | `Position` | `Position.TopLeft` | Where to place the navigation controls. |
| `allow_fullscreen` | `bool` | `True` | Show the fullscreen toggle. |
| `allow_download` | `bool` | `True` | Show the "download as image" button. |
| `show_scale` | `bool` | `True` | Show the scale bar. |
| `metric_unit` | `MetricSystem` | `MetricSystem.Metric` | Metric system used by the scale bar. |
| `scale_position` | `Position` | `Position.BottomRight` | Where to place the scale bar. |
| `layer_selector_position` | `Position` | `Position.TopRight` | Where to place the layer selector. |
| `layer_legend_position` | `Position` | `Position.BottomLeft` | Where to place the legend control. |
| `download_position` | `Position` | `Position.TopLeft` | Where to place the download button. |
| `legend_display` | `Display` | `Display.Expanded` | Initial display of the legend. |
| `class_name` | `str` | `"map-widget"` | CSS class applied to the map container. |
| `loading_text` | `str \| None` | `"Loading Map"` | Text shown while the map loads. `None` hides it. |

`Position` values: `TopLeft`, `TopRight`, `BottomLeft`, `BottomRight`.
`Display` values: `Expanded`, `Collapsed`.
`MetricSystem` values: `Metric`, `Imperial`.

## Next steps

- [Tile layers](layers/tile-layers.md)
- [Overlay layers](layers/overlay-layers.md)
- Legends: [Fixed](legends/fixed.md), [Categorical](legends/categorical.md),
  [Range](legends/range.md), [Interpolated](legends/interpolated.md)
- Events: [goTo](events/goto.md), [highlight](events/highlight.md)
