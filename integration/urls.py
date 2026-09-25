"""
URL configuration for integration project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

import json
import random
from typing import Final

from django.forms import CharField, Form
from django.http import HttpRequest, HttpResponse, JsonResponse, StreamingHttpResponse
from django.template.response import TemplateResponse
from django.urls import path, reverse

from django_map_libre.helpers import ColorSchemeType, LayerType
from django_map_libre.map import Legend, MapWidget, OverlayLayer, TileLayer

ICONS: Final[dict] = {
    "home": '<path d="M3 11l9-8 9 8v10H3z"/>',
    "heart": '<path d="M12 21s-8-5-8-11a5 5 0 019-3 5 5 0 019 3c0 6-8 11-8 11z"/>',
    "star": '<path d="M12 2l3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9z"/>',
    "check": '<path d="M4 12l6 6L20 6"/>',
    "search": '<circle cx="10" cy="10" r="7"/><path d="M15 15l6 6"/>',
    "user": '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    "bolt": '<path d="M13 2L4 14h6l-1 8 9-12h-6z"/>',
    "trash": '<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14"/>',
}


def render_icon(name: str) -> str:
    """Return an inline SVG string for the given icon name."""
    body = ICONS[name]
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" '
        f'width="24px" height="24px" fill="{get_random_color()}" stroke="black" stroke-width="3">{body}</svg>'
    )


def icon(request, name):
    resp = HttpResponse(render_icon(name), content_type="image/svg+xml")
    resp["Cache-Control"] = "public, max-age=86400"
    return resp


def random_icon_legend(request: HttpRequest):
    count = int(request.GET.get("count", 300))
    names = list(ICONS.keys())
    return JsonResponse(
        {
            f"P{i}": {
                "label": names[i % len(names)].capitalize(),
                "icon": request.build_absolute_uri(
                    reverse("icon", args=[names[i % len(names)]])
                ),
            }
            for i in range(count)
        },
    )


def get_random_color() -> str:
    return "#{:06x}".format(random.randint(0, 0xFFFFFF))


def random_legend(request):
    return JsonResponse(
        {
            f"P{i}": {"label": f"Parcel ID:{i}", "color": get_random_color()}
            for i in range(int(request.GET.get("count", 300)))
        }
    )


def json_parcels(request):
    return JsonResponse(
        {
            "type": "FeatureCollection",
            "features": get_features(int(request.GET.get("count", 300))),
        }
    )


def get_features(features_count):
    features = []
    for i in range(features_count):
        lat = random.uniform(37.708, 37.812)
        lon = random.uniform(-122.527, -122.348)
        half = 0.002 / 2
        coords = [
            [lon - half, lat - half],
            [lon + half, lat - half],
            [lon + half, lat + half],
            [lon - half, lat + half],
            [lon - half, lat - half],
        ]
        feature = {
            "id": f"FID{i}",
            "type": "Feature",
            "geometry": {"type": "Polygon", "coordinates": [coords]},
            "properties": {
                "parcel_id": f"P{i}",
                "area_sqft": round(random.uniform(2000, 8000), 1),
                "address": f"{random.randint(1, 999)} {random.choice(['Market St', 'Mission St', 'Valencia St', 'Dolores St', 'Castro St'])}",
                "land_use": random.choice(["residential", "commercial", "mixed-use"]),
            },
        }
        features.append(feature)
    return features


def ndjson_parcels(request):
    def generate():
        counts = int(request.GET.get("count", 300))
        batch = int(request.GET.get("batch", 1))
        for i in range(counts // batch):
            # time.sleep(0.00005)  # Simulate some processing delay
            features = []
            for b in range(batch):
                lat = random.uniform(37.708, 37.812)
                lon = random.uniform(-122.527, -122.348)
                half = 0.002 / 2
                coords = [
                    [lon - half, lat - half],
                    [lon + half, lat - half],
                    [lon + half, lat + half],
                    [lon - half, lat + half],
                    [lon - half, lat - half],
                ]
                feature = {
                    "id": f"FIDD{i}-{b}",
                    "type": "Feature",
                    "geometry": {"type": "Polygon", "coordinates": [coords]},
                    "properties": {
                        "parcel_id": f"P{i}",
                        "area_sqft": round(random.uniform(2000, 8000), 1),
                        "address": f"{random.randint(1, 999)} {random.choice(['Market St', 'Mission St', 'Valencia St', 'Dolores St', 'Castro St'])}",
                        "land_use": random.choice(
                            ["residential", "commercial", "mixed-use"]
                        ),
                    },
                }
                features.append(feature)
            yield json.dumps(features) + "\n"

    return StreamingHttpResponse(generate(), content_type="application/x-ndjson")


class MapForm(Form):
    map = CharField(
        widget=MapWidget(
            center=(37.753574, -122.447303),
            tile_layers=[
                TileLayer(
                    id="osm-layer",
                    label="OpenStreetMap",
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png",
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                    selected=True,
                ),
                TileLayer(
                    id="esri-satellite-layer",
                    label="Satélite Esri",
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                    attribution="© Esri",
                    selected=False,
                ),
            ],
            overlay_layers=[
                OverlayLayer(
                    id="json",
                    label="FULL JSON LAYER",
                    url="http://127.0.0.1:8000/data/json-parcels/",
                    layer_type=LayerType.FILL,
                    legends=[
                        Legend(
                            id="fixed-clean",
                            label="Default View",
                            type=ColorSchemeType.FIXED,
                            color="#4A90D9",
                            active=True,
                        ),
                    ],
                    selected=False,
                ),
                OverlayLayer(
                    id="dnjson",
                    label="NDJSON LAYER",
                    url="http://127.0.0.1:8000/data/ndjson-parcels/",
                    legends=[
                        Legend(
                            id="fixed-clean",
                            label="Default View",
                            type=ColorSchemeType.FIXED,
                            color="#D94A4A",
                            active=True,
                        ),
                    ],
                    selected=False,
                ),
                OverlayLayer(
                    id="categorical-mapping-clean",
                    label="Categorical Mapping Hardcode",
                    url="http://127.0.0.1:8000/data/json-parcels/?count=10",
                    layer_type=LayerType.FILL,
                    legends=[
                        Legend(
                            id="categorical-mapping-clean",
                            label="Default View",
                            type=ColorSchemeType.CATEGORICAL,
                            coloring_property="parcel_id",
                            category_mapping={
                                "P0": {"label": "PARCEL 0", "color": "#aaF0af"},
                                "P1": {"label": "PARCEL 1"},
                                "P2": {"label": "PARCEL 2", "color": "#0aF0ff"},
                                "P3": {"label": "PARCEL 3"},
                                "P4": {"label": "PARCEL 4"},
                                "P5": {"label": "PARCEL 5"},
                                "P6": {"label": "PARCEL 6", "color": "#CfCF0C"},
                                "P7": {
                                    "label": "PARCEL 7",
                                },
                                "P8": {"label": "PARCEL 8", "color": "#AAA0Af"},
                                "P9": {"label": "PARCEL 9", "color": "#0fb0ff"},
                                "P10": {"label": "PARCEL 10"},
                            },
                            active=True,
                        ),
                    ],
                    selected=False,
                ),
                OverlayLayer(
                    id="categorical-mapping-api-legend",
                    label="Categorical Mapping API Legend",
                    url="http://127.0.0.1:8000/data/ndjson-parcels/?count=100&batch=10",
                    layer_type=LayerType.FILL,
                    legends=[
                        Legend(
                            id="categorical-mapping-api-legend",
                            label="Default View",
                            type=ColorSchemeType.CATEGORICAL,
                            coloring_property="parcel_id",
                            category_mapping="http://127.0.0.1:8000/data/random_legend/?count=90",
                            active=True,
                        ),
                    ],
                    selected=False,
                ),
                OverlayLayer(
                    id="categorical-mapping-generated-legend",
                    label="Categorical Generated Legend",
                    url="http://127.0.0.1:8000/data/ndjson-parcels/?count=400000&batch=1000",
                    layer_type=LayerType.FILL,
                    legends=[
                        Legend(
                            id="categorical-generated-legend",
                            label="Default View",
                            type=ColorSchemeType.CATEGORICAL,
                            coloring_property="parcel_id",
                            category_mapping=None,
                            active=True,
                        ),
                    ],
                    selected=False,
                ),
                OverlayLayer(
                    id="line-categorical-mapping-clean",
                    label="Categorical Line Mapping Hardcode",
                    url="http://127.0.0.1:8000/data/json-parcels/?count=10",
                    layer_type=LayerType.LINE,
                    legends=[
                        Legend(
                            id="categorical-line-mapping-clean",
                            label="Default View",
                            type=ColorSchemeType.CATEGORICAL,
                            coloring_property="parcel_id",
                            category_mapping={
                                "P0": {"label": "PARCEL 0", "color": "#FF0000"},
                                "P1": {"label": "PARCEL 1"},
                                "P2": {"label": "PARCEL 2", "color": "#90FF90"},
                                "P3": {"label": "PARCEL 3"},
                                "P4": {"label": "PARCEL 4"},
                                "P5": {"label": "PARCEL 5"},
                                "P6": {"label": "PARCEL 6", "color": "#CfCF0C"},
                                "P7": {
                                    "label": "PARCEL 7",
                                },
                                "P8": {"label": "PARCEL 8", "color": "#AAA0Af"},
                                "P9": {"label": "PARCEL 9", "color": "#0fb0ff"},
                                "P10": {"label": "PARCEL 10"},
                            },
                            active=True,
                        ),
                    ],
                    selected=False,
                ),
                OverlayLayer(
                    id="line-categorical-api",
                    label="Categorical Line Mapping API",
                    url="http://127.0.0.1:8000/data/json-parcels/?count=30",
                    layer_type=LayerType.LINE,
                    legends=[
                        Legend(
                            id="categorical-line-api",
                            label="Default View",
                            type=ColorSchemeType.CATEGORICAL,
                            coloring_property="parcel_id",
                            category_mapping="http://127.0.0.1:8000/data/random_legend/?count=30",
                            active=True,
                        ),
                    ],
                    selected=False,
                ),
                OverlayLayer(
                    id="line-categorical-generated",
                    label="Categorical Line Generated",
                    url="http://127.0.0.1:8000/data/json-parcels/?count=30000",
                    layer_type=LayerType.LINE,
                    legends=[
                        Legend(
                            id="categorical-line-api",
                            label="Default View",
                            type=ColorSchemeType.CATEGORICAL,
                            coloring_property="parcel_id",
                            category_mapping=None,
                            active=True,
                        ),
                    ],
                    selected=False,
                ),
                OverlayLayer(
                    id="fixed-icons",
                    label="Fixed Icons",
                    url="http://127.0.0.1:8000/data/json-parcels/?count=8",
                    layer_type=LayerType.ICON,
                    legends=[
                        Legend(
                            id="fixed-icons",
                            label="Icon View",
                            type=ColorSchemeType.CATEGORICAL,
                            coloring_property="parcel_id",
                            category_mapping={
                                "P0": {
                                    "label": "Home",
                                    "icon": "http://127.0.0.1:8000/icons/home.svg",
                                },
                                "P1": {
                                    "label": "Heart",
                                    "icon": "http://127.0.0.1:8000/icons/heart.svg",
                                },
                                "P2": {
                                    "label": "Star",
                                    "icon": "http://127.0.0.1:8000/icons/star.svg",
                                },
                                "P3": {
                                    "label": "Check",
                                    "icon": "http://127.0.0.1:8000/icons/check.svg",
                                },
                                "P4": {
                                    "label": "Search",
                                    "icon": "http://127.0.0.1:8000/icons/search.svg",
                                },
                                "P5": {
                                    "label": "User",
                                    "icon": "http://127.0.0.1:8000/icons/user.svg",
                                },
                                "P6": {
                                    "label": "Bolt",
                                    "icon": "http://127.0.0.1:8000/icons/bolt.svg",
                                },
                                "P7": {
                                    "label": "Trash",
                                    "icon": "http://127.0.0.1:8000/icons/trash.svg",
                                },
                            },
                            active=True,
                        ),
                    ],
                    selected=True,
                ),
                OverlayLayer(
                    id="categorical-icons-api",
                    label="Categorical Icons API",
                    url="http://127.0.0.1:8000/data/json-parcels/?count=30",
                    layer_type=LayerType.ICON,
                    legends=[
                        Legend(
                            id="categorical-icons-api",
                            label="Icon View",
                            type=ColorSchemeType.CATEGORICAL,
                            coloring_property="parcel_id",
                            category_mapping="http://127.0.0.1:8000/data/random_icon_legend/?count=30",
                            active=True,
                        ),
                    ],
                    selected=True,
                ),
            ],
        )
    )


def map(request):
    return TemplateResponse(request, "test.html", context={"form": MapForm()})


urlpatterns = [
    path("", map),
    path("data/json-parcels/", json_parcels, name="json_parcels"),
    path("data/ndjson-parcels/", ndjson_parcels, name="ndjson_parcels"),
    path("data/random_legend/", random_legend, name="random_legend"),
    path("data/random_icon_legend/", random_icon_legend, name="random_icon_legend"),
    path("icons/<str:name>.svg", icon, name="icon"),
]
