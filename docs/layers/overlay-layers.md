# Overlay layers

An `OverlayLayer` is a GeoJSON layer rendered on top of the basemaps. Each
overlay carries one or more **legends**, but only one legend is active at a
time.

```python
from django_map_libre.helpers import LayerType
from django_map_libre.map import FixedLegend, OverlayLayer

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
)
```

## Fields

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `str` | yes | Unique identifier. It becomes the MapLibre layer id. |
| `label` | `str` | yes | Text shown in the layer selector. |
| `url` | `str` | yes | URL of the GeoJSON document. |
| `legends` | `list[Legend]` | yes | At least one legend. Exactly one must be active. |
| `layer_type` | `LayerType` | no | Defaults to `LayerType.FILL`. |
| `highlight_color` | `str \| None` | no | Default color used by the `highlight` event. |
| `selected` | `bool` | yes | Whether the layer is visible on load. |

## `layer_type`

| Value | Rendered as |
| :--- | :--- |
| `LayerType.FILL` | Filled polygons. |
| `LayerType.LINE` | Stroked lines. |
| `LayerType.CIRCLE` | Circles at feature coordinates. |
| `LayerType.ICON` | Icons at feature coordinates. |

## Legend activation

If several legends are provided and none is marked `active=True`, the first one
is activated automatically. Marking more than one as active raises
`ValueError`.

```python
OverlayLayer(
    id="parcels",
    label="Parcels",
    url="/api/parcels.geojson",
    legends=[
        FixedLegend(id="plain", label="Plain", color="#4A90D9"),
        RangeLegend(
            id="area",
            label="Area",
            coloring_property="area_sqft",
            num_steps=5,
            color_ramp=["#0000FF", "#00FF00", "#FF0000"],
            active=True,
        ),
    ],
    selected=True,
)
```

## Validation against the layer type

`OverlayLayer` cross-checks each legend against `layer_type` and raises
`ValueError` when they are incompatible:

| Case | Allowed? |
| :--- | :--- |
| Circle styling (`circle_*`) on `CIRCLE` | yes |
| Icon styling (`icon_*`) on `ICON` | yes |
| Circle styling on `FILL`, `LINE` or `ICON` | no |
| Icon styling on `FILL`, `LINE` or `CIRCLE` | no |
| `FixedLegend` on `ICON` without `image` | no |
| `FixedLegend` on `FILL`/`LINE`/`CIRCLE` without `color` | no |
| `CategoricalLegend` on `ICON` with `category_mapping=None` | no (icons are never generated) |
| `RangeLegend` or `InterpolatedLegend` on `ICON` | no |

## Highlight color

`highlight_color` is the default color used by the frontend `highlight` event
for this layer. It can be overridden per event:

```python
OverlayLayer(
    id="parcels",
    label="Parcels",
    url="/api/parcels.geojson",
    highlight_color="#ff0000",
    legends=[...],
    selected=True,
)
