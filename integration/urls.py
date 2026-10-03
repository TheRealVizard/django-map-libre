"""URL patterns for the integration test project."""

from django.urls import path

from integration.views.data import (
    icon,
    json_parcels,
    ndjson_parcels,
    random_color_legend,
    random_icon_legend,
    random_range_legend,
)
from integration.views.pages import map_view


urlpatterns = [
    path("", map_view, name="map"),
    path("icons/<str:name>.svg", icon, name="icon"),
    path("data/json-parcels/", json_parcels, name="json_parcels"),
    path("data/ndjson-parcels/", ndjson_parcels, name="ndjson_parcels"),
    path("data/random-color-legend/", random_color_legend, name="random_color_legend"),
    path("data/random-icon-legend/", random_icon_legend, name="random_icon_legend"),
    path("data/random-range-legend/", random_range_legend, name="range_legend"),
]
