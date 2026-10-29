# FixedLegend

Every feature is rendered with the same visual. Use `color` for fill, line and
circle layers, and `image` for icon layers.

```python
from django_map_libre.map import FixedLegend

FixedLegend(
    id="parcels-default",
    label="Default",
    color="#4A90D9",
    active=True,
)
```

## Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `str` | Unique identifier inside the overlay. |
| `label` | `str` | Text shown in the legend selector. |
| `active` | `bool` | Whether this legend is the rendered one. |
| `color` | `str \| None` | Hex color for fill, line and circle layers. |
| `image` | `str \| None` | Icon URL for icon layers. |

At least one of `color` or `image` must be provided. The frontend uses whichever
matches the parent layer type; the other one is ignored.

## Icon layer

```python
FixedLegend(
    id="marker",
    label="Marker",
    image="/static/svg/map-marker.svg",
    active=True,
)
```