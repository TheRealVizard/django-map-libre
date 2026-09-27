"""HTML page views for the integration test project."""

from django.http import HttpRequest
from django.template.response import TemplateResponse

from integration.forms import MapForm


def map_view(request: HttpRequest) -> TemplateResponse:
    """Render the demo page with the map widget form."""
    return TemplateResponse(request, "test.html", context={"form": MapForm()})
