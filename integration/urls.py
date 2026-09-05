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
import time

from django.forms import CharField, Form
from django.http import JsonResponse, StreamingHttpResponse
from django.template.response import TemplateResponse
from django.urls import path

from django_map_libre.helpers import ColorSchemeType
from django_map_libre.map import Legend, MapWidget, OverlayLayer, TileLayer


def json_parcels(request):
    features = []
    for i in range(300):
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
                "parcel_id": f"P{random.randint(10000, 99999)}",
                "area_sqft": round(random.uniform(2000, 8000), 1),
                "address": f"{random.randint(1, 999)} {random.choice(['Market St', 'Mission St', 'Valencia St', 'Dolores St', 'Castro St'])}",
                "land_use": random.choice(["residential", "commercial", "mixed-use"]),
            },
        }
        features.append(feature)
    return JsonResponse({"type": "FeatureCollection", "features": features})


def ndjson_parcels(request):
    def generate():
        for i in range(100000):
            time.sleep(0.00005)  # Simulate some processing delay
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
                "id": f"FIDD{i}",
                "type": "Feature",
                "geometry": {"type": "Polygon", "coordinates": [coords]},
                "properties": {
                    "parcel_id": f"P{random.randint(10000, 99999)}",
                    "area_sqft": round(random.uniform(2000, 8000), 1),
                    "address": f"{random.randint(1, 999)} {random.choice(['Market St', 'Mission St', 'Valencia St', 'Dolores St', 'Castro St'])}",
                    "land_use": random.choice(
                        ["residential", "commercial", "mixed-use"]
                    ),
                },
            }
            yield json.dumps(feature) + "\n"

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
                    legends=[
                        # 1. FIXED COLOR - Clean blue outline with subtle fill
                        Legend(
                            id="fixed-clean",
                            label="Default View",
                            type=ColorSchemeType.FIXED,
                            color="#4A90D9",
                            active=True,  # This is the default view
                        ),
                    ],
                    selected=True,
                ),
                OverlayLayer(
                    id="dnjson",
                    label="NDJSON LAYER",
                    url="http://127.0.0.1:8000/data/ndjson-parcels/",
                    legends=[
                        # 1. FIXED COLOR - Clean blue outline with subtle fill
                        Legend(
                            id="fixed-clean",
                            label="Default View",
                            type=ColorSchemeType.FIXED,
                            color="#D94A4A",
                            active=True,  # This is the default view
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
]
