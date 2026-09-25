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

from django.forms import CharField, Form
from django.http import JsonResponse, StreamingHttpResponse
from django.template.response import TemplateResponse
from django.urls import path

from django_map_libre.helpers import ColorSchemeType, LayerType
from django_map_libre.map import Legend, MapWidget, OverlayLayer, TileLayer


def get_random_color():
    r = f"{random.randint(0, 255):0x}"
    g = f"{random.randint(0, 255):0x}"
    b = f"{random.randint(0, 255):0x}"
    return f"#{r.ljust(2,'0')}{g.ljust(2,'0')}{b.ljust(2,'0')}"


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
]
