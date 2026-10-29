# CategoricalLegend

Assigns a distinct visual to each distinct value found in `coloring_property`.

```python
from django_map_libre.map import CategoricalLegend

CategoricalLegend(
    id="land-use",
    label="Land Use",
    coloring_property="land_use",
    category_mapping={
        "residential": {"label": "Residential", "color": "#FFD700"},
        "commercial":  {"label": "Commercial",  "color": "#FF4500"},
        "industrial":  {"label": "Industrial",  "color": "#8A2BE2"},
    },
    active=True,
)
```

## Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `str` | Unique identifier inside the overlay. |
| `label` | `str` | Text shown in the legend selector. |
| `coloring_property` | `str` | Feature property whose value is matched against the mapping. Required. |
| `display_property` | `str \| None` | Optional feature property used as label when the mapping entry has no `label`. |
| `category_mapping` | `dict \| str \| None` | Static mapping, URL returning one, or `None` to auto-generate. |
| `active` | `bool` | Whether this legend is the rendered one. |

## Forms of `category_mapping`

**Static dict** — each key is a value of `coloring_property`:

```python
category_mapping={
    "residential": {"label": "Residential", "color": "#FFD700"},
    "commercial":  {"label": "Commercial",  "color": "#FF4500"},
}
```

**URL string** — must return a JSON object with the same shape:

```python
category_mapping="https://api.example.com/legend/categories"
```

**`None`** — the frontend generates a color per distinct value found in the data.
Labels are derived from the value itself. Only valid for fill, line and circle
layers; icon layers require an explicit mapping because icons are never
generated automatically.

## Entry fields

| Key | Type | Description |
| :--- | :--- | :--- |
| `label` | `str` | Text shown in the legend. |
| `color` | `str` | Hex color for fill, line and circle layers. Random if omitted. |
| `icon` | `str` | Icon URL for icon layers. Generic marker if omitted. |

Unknown keys raise `ValueError`.

## Label resolution

For each feature, the label is resolved in this order, first hit wins:

1. `label` inside the matching `category_mapping` entry.
2. The value of `display_property` on the feature, if provided.
3. The value of `coloring_property` on the feature, title-cased.

## Icon layers

```python
CategoricalLegend(
    id="amenities",
    label="Amenities",
    coloring_property="amenity_type",
    category_mapping={
        "hospital": {"label": "Hospital", "icon": "/static/svg/hospital.svg"},
        "school":   {"label": "School",   "icon": "/static/svg/school.svg"},
        "park":     {"label": "Park"},  # falls back to the generic marker
    },
    active=True,
)
```