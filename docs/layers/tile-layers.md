# Tile layers

A `TileLayer` is a raster basemap rendered below the overlays. It appears in the
layer selector and can be toggled like any other layer.

```python
from django_map_libre.map import TileLayer

TileLayer(
    id="osm-base",
    label="OpenStreetMap",
    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    selected=True,
)
```

## Fields

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `str` | yes | Unique identifier of the layer. |
| `label` | `str` | yes | Text shown in the layer selector. |
| `url` | `str` | yes | Tile URL template with `{z}`, `{x}` and `{y}` placeholders. |
| `attribution` | `str` | yes | HTML attribution string shown in the map corner. |
| `selected` | `bool` | yes | Whether the layer is visible on load. |

## Two basemaps

```python
tile_layers = [
    TileLayer(
        id="osm-base",
        label="OpenStreetMap",
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution="© OpenStreetMap",
        selected=True,
    ),
    TileLayer(
        id="esri-satellite",
        label="Esri Satellite",
        url=(
            "https://server.arcgisonline.com/ArcGIS/rest/services/"
            "World_Imagery/MapServer/tile/{z}/{y}/{x}"
        ),
        attribution="© Esri",
        selected=False,
    ),
]
```

Basemaps are mutually exclusive in the selector, so at most one tile layer
should have `selected=True` when the map loads.
