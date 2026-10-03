"""Mock data endpoints consumed by the demo map widget."""

import json

from django.http import (
    HttpRequest,
    HttpResponse,
    JsonResponse,
    StreamingHttpResponse,
)

from integration.constants import DEFAULT_BATCH_SIZE, DEFAULT_FEATURE_COUNT
from integration.icons import render_icon_svg
from integration.legend import build_color_legend, build_icon_legend, build_range_legend
from integration.parcels import build_parcel_feature


def icon(request: HttpRequest, name: str) -> HttpResponse:
    """Return a cacheable SVG icon response for the given icon name."""
    response = HttpResponse(render_icon_svg(name), content_type="image/svg+xml")
    response["Cache-Control"] = "public, max-age=86400"
    return response


def random_color_legend(request: HttpRequest) -> JsonResponse:
    """Return a random categorical color legend keyed by parcel id."""
    return JsonResponse(build_color_legend(request))


def random_icon_legend(request: HttpRequest) -> JsonResponse:
    """Return a random categorical icon legend keyed by parcel id."""
    return JsonResponse(build_icon_legend(request))


def random_range_legend(request: HttpRequest) -> JsonResponse:
    """Return a range legend payload for ``RangeLegend.config_url``."""
    return JsonResponse(build_range_legend(request))


def json_parcels(request: HttpRequest) -> JsonResponse:
    """Return a ``FeatureCollection`` of random parcels as JSON."""
    count = int(request.GET.get("count", DEFAULT_FEATURE_COUNT))
    return JsonResponse(
        {
            "type": "FeatureCollection",
            "features": [build_parcel_feature(i) for i in range(count)],
        }
    )


def ndjson_parcels(request: HttpRequest) -> StreamingHttpResponse:
    """Stream random parcels as newline-delimited JSON batches."""
    count = int(request.GET.get("count", DEFAULT_FEATURE_COUNT))
    batch = int(request.GET.get("batch", DEFAULT_BATCH_SIZE))

    def stream():
        for index in range(count // batch):
            features = [build_parcel_feature(index, b) for b in range(batch)]
            yield json.dumps(features) + "\n"

    return StreamingHttpResponse(stream(), content_type="application/x-ndjson")
