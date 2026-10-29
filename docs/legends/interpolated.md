# InterpolatedLegend

Produces a continuous gradient across a numeric range. Unlike `RangeLegend`,
transitions between colors are smooth.

## Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `str` | Unique identifier inside the overlay. |
| `label` | `str` | Text shown in the legend selector. |
| `coloring_property` | `str` | Numeric feature property driving the gradient. Required. |
| `color_stops` | `list[ColorStep] \| list[str] \| None` | Explicit stops, or a list of colors. |
| `config_url` | `str \| None` | URL returning a `colorStops` array. |
| `active` | `bool` | Whether this legend is the rendered one. |

## Explicit stops

Use `ColorStep(value=..., color=...)`:

```python
from django_map_libre.helpers import ColorStep
from django_map_libre.map import InterpolatedLegend

InterpolatedLegend(
    id="temp",
    label="Annual Temp",
    coloring_property="annual_temp",
    color_stops=[
        ColorStep(value=-30.0, color="#9000FF"),
        ColorStep(value=-10.0, color="#0000FF"),
        ColorStep(value=0.0,   color="#FF0000"),
        ColorStep(value=25.0,  color="#FFFF00"),
        ColorStep(value=40.0,  color="#FFFDD2"),
    ],
    active=True,
)
```

Values must be in strictly ascending order and there must be at least two stops.
Values below the first stop are clamped to the first color; values above the last
are clamped to the last color.

## Color-only stops

A plain list of colors spreads them evenly across the range of
`coloring_property`, which is inferred from the features:

```python
InterpolatedLegend(
    id="temp-generated",
    label="Annual Temp (Generated)",
    coloring_property="annual_temp",
    color_stops=["#9000FF", "#FF0000", "#FFFDD2"],
    active=True,
)
```

## Remote configuration

When `config_url` is set, `color_stops` must **not** be provided. The endpoint
must return:

```json
{
  "colorStops": [
    { "value": -10, "color": "#0000FF" },
    { "value": 0,   "color": "#FF0000" },
    { "value": 25,  "color": "#FFFF00" },
    { "value": 40,  "color": "#FFFFFF" }
  ]
}
```

```python
InterpolatedLegend(
    id="temp-api",
    label="Annual Temp",
    coloring_property="annual_temp",
    config_url="/api/legend/interpolated",
    active=True,
)
```