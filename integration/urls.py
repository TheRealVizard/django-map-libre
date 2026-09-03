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

from django.forms import CharField, Form
from django.template.response import TemplateResponse
from django.urls import path

from django_map_libre.helpers import ColorSchemeType
from django_map_libre.map import Legend, MapWidget, OverlayLayer, TileLayer


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
                    id="sf-neighborhoods",
                    label="San Francisco Neighborhoods",
                    url="https://raw.githubusercontent.com/paulavidela/utdt_cienciadedatos/main/data/sf_neighborhoods.geojson",
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
            ],
        )
    )


def map(request):
    return TemplateResponse(request, "test.html", context={"form": MapForm()})


urlpatterns = [
    path("", map),
]
