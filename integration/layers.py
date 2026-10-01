"""Overlay and tile layer factories grouped by layer type."""

from django.urls import reverse

from django_map_libre.helpers import LayerType
from django_map_libre.map import (
    CategoricalLegend,
    FixedLegend,
    OverlayLayer,
    RangeLegend,
    TileLayer,
)

from integration.constants import LAND_USE_MAPPING


def tile_layers() -> list[TileLayer]:
    """Return the base tile layers rendered by the map widget."""
    return [
        TileLayer(
            id="osm-base",
            label="OpenStreetMap",
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
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


def fill_layers() -> list[OverlayLayer]:
    """Return the fill overlay layers used by the demo."""
    return [
        OverlayLayer(
            id="parcel-footprint",
            label="Parcel Footprint",
            url=f"{reverse('json_parcels')}",
            layer_type=LayerType.FILL,
            legends=[
                FixedLegend(
                    id="parcel-footprint-default",
                    label="Default View",
                    color="#4A90D9",
                    active=True,
                )
            ],
            selected=False,
        ),
        OverlayLayer(
            id="land-use-classification",
            label="Land Use Classification",
            url=f"{reverse('json_parcels')}?count=300",
            layer_type=LayerType.FILL,
            legends=[
                CategoricalLegend(
                    id="land-use-classification",
                    label="Land Use",
                    coloring_property="land_use",
                    category_mapping=LAND_USE_MAPPING,
                    active=True,
                ),
            ],
            selected=True,
        ),
        OverlayLayer(
            id="parcel-palette-api",
            label="Parcel Palette (API)",
            url=f"{reverse('json_parcels')}?count=90",
            layer_type=LayerType.FILL,
            legends=[
                CategoricalLegend(
                    id="parcel-palette-api",
                    label="Palette from API",
                    coloring_property="parcel_id",
                    category_mapping=(f"{reverse('random_color_legend')}?count=90"),
                    active=True,
                ),
            ],
            selected=True,
        ),
        OverlayLayer(
            id="parcel-palette-streamed",
            label="Parcel Palette (Streamed)",
            url=f"{reverse('ndjson_parcels')}?count=4000&batch=400",
            layer_type=LayerType.FILL,
            legends=[
                CategoricalLegend(
                    id="parcel-palette-generated",
                    label="Auto-generated Palette",
                    coloring_property="parcel_id",
                    category_mapping=None,
                    active=True,
                ),
            ],
            selected=False,
        ),
        OverlayLayer(
            id="parcel-area-fill",
            label="Parcel Area (Range)",
            url=f"{reverse('json_parcels')}?count=300",
            layer_type=LayerType.FILL,
            legends=[
                RangeLegend(
                    id="parcel-area-fill",
                    label="Area",
                    coloring_property="area_sqft",
                    num_steps=5,
                    bounds=(2000,8000),
                    color_ramp=["#0000FF", "#00FF00", "#FF0000"],
                    active=True,
                ),
            ],
            selected=False,
        ),
        OverlayLayer(
            id="parcel-score-fill",
            label="Parcel Score (Range)",
            url=f"{reverse('json_parcels')}?count=300",
            layer_type=LayerType.FILL,
            legends=[
                RangeLegend(
                    id="parcel-score-fill",
                    label="Score",
                    coloring_property="score",
                    num_steps=11,
                    color_ramp=["#FF0000", "#E1FF00", "#00FF1A"],
                    active=True,
                ),
            ],
            selected=True,
        ),
    ]


def line_layers() -> list[OverlayLayer]:
    """Return the line overlay layers used by the demo."""
    return [
        OverlayLayer(
            id="parcel-outlines",
            label="Parcel Outlines",
            url=f"{reverse('json_parcels')}?count=300",
            layer_type=LayerType.LINE,
            legends=[
                FixedLegend(
                    id="parcel-outlines-default",
                    label="Default View",
                    color="#1F2937",
                    active=True,
                ),
            ],
            selected=False,
        ),
        OverlayLayer(
            id="parcel-zoning-lines",
            label="Zoning Boundaries",
            url=f"{reverse('json_parcels')}?count=60",
            layer_type=LayerType.LINE,
            legends=[
                CategoricalLegend(
                    id="parcel-zoning-lines",
                    label="Land Use (Lines)",
                    coloring_property="land_use",
                    category_mapping=LAND_USE_MAPPING,
                    active=True,
                ),
            ],
            selected=False,
        ),
        OverlayLayer(
            id="parcel-outlines-streamed",
            label="Parcel Outlines (Streamed)",
            url=f"{reverse('ndjson_parcels')}?count=2000&batch=200",
            layer_type=LayerType.LINE,
            legends=[
                CategoricalLegend(
                    id="parcel-outlines-streamed",
                    label="Auto-generated Palette",
                    coloring_property="parcel_id",
                    category_mapping=None,
                    active=True,
                ),
            ],
            selected=False,
        ),
        OverlayLayer(
            id="parcel-area-lines",
            label="Parcel Area (Range)",
            url=f"{reverse('json_parcels')}?count=300",
            layer_type=LayerType.LINE,
            legends=[
                RangeLegend(
                    id="parcel-area-lines",
                    label="Area",
                    coloring_property="area_sqft",
                    num_steps=7,
                    bounds=(2000,8000),
                    color_ramp=["#00FF00", "#FFFF00", "#FF0000"],
                    active=True,
                ),
            ],
            selected=False,
        ),
    ]


def circle_layers() -> list[OverlayLayer]:
    """Return the circle overlay layers used by the demo."""
    return [
        OverlayLayer(
            id="parcel-centroids",
            label="Parcel Centroids",
            url=f"{reverse('json_parcels')}?count=200",
            layer_type=LayerType.CIRCLE,
            legends=[
                FixedLegend(
                    id="parcel-centroids-default",
                    label="Default View",
                    color="#3388FF",
                    active=True,
                ),
            ],
            selected=False,
        ),
        OverlayLayer(
            id="property-centroids-api",
            label="Property Centroids (API)",
            url=f"{reverse('json_parcels')}?count=120",
            layer_type=LayerType.CIRCLE,
            legends=[
                CategoricalLegend(
                    id="property-centroids-api",
                    label="Palette from API",
                    coloring_property="parcel_id",
                    category_mapping=(f"{reverse('random_color_legend')}?count=120"),
                    active=True,
                ),
            ],
            selected=False,
        ),
        OverlayLayer(
            id="parcel-area-circles",
            label="Parcel Area (Range)",
            url=f"{reverse('json_parcels')}?count=200",
            layer_type=LayerType.CIRCLE,
            legends=[
                RangeLegend(
                    id="parcel-area-circles",
                    label="Area",
                    coloring_property="area_sqft",
                    num_steps=4,
                    bounds=(2000,8000),
                    color_ramp=["#00FFFF", "#0000FF"],
                    active=True,
                ),
            ],
            selected=False,
        ),
    ]


def icon_layers() -> list[OverlayLayer]:
    """Return the icon overlay layers used by the demo."""
    return [
        OverlayLayer(
            id="amenity-markers",
            label="Amenity Markers",
            url=f"{reverse('json_parcels')}?count=8",
            layer_type=LayerType.ICON,
            legends=[
                CategoricalLegend(
                    id="amenity-markers",
                    label="Amenities",
                    coloring_property="parcel_id",
                    category_mapping={
                        "P0": {
                            "label": "Home",
                            "icon": f"{reverse('icon', args=['home'])}",
                        },
                        "P1": {
                            "label": "Heart",
                            "icon": f"{reverse('icon', args=['heart'])}",
                        },
                        "P2": {
                            "label": "Star",
                            "icon": f"{reverse('icon', args=['star'])}",
                        },
                        "P3": {
                            "label": "Check",
                            "icon": f"{reverse('icon', args=['check'])}",
                        },
                        "P4": {
                            "label": "Search",
                            "icon": f"{reverse('icon', args=['search'])}",
                        },
                        "P5": {
                            "label": "User",
                            "icon": f"{reverse('icon', args=['user'])}",
                        },
                        "P6": {
                            "label": "Bolt",
                            "icon": f"{reverse('icon', args=['bolt'])}",
                        },
                        "P7": {
                            "label": "Trash",
                            "icon": f"{reverse('icon', args=['trash'])}",
                        },
                    },
                    active=True,
                ),
            ],
            selected=False,
        ),
        OverlayLayer(
            id="poi-markers-api",
            label="Points of Interest (API)",
            url=f"{reverse('json_parcels')}?count=40",
            layer_type=LayerType.ICON,
            legends=[
                CategoricalLegend(
                    id="poi-markers-api",
                    label="Icons from API",
                    coloring_property="parcel_id",
                    category_mapping=(f"{reverse('random_icon_legend')}?count=40"),
                    active=True,
                ),
            ],
            selected=False,
        ),
    ]


def overlay_layers() -> list[OverlayLayer]:
    """Return every overlay layer used to exercise each supported type."""
    return [
        *fill_layers(),
        *line_layers(),
        *circle_layers(),
        *icon_layers(),
    ]
