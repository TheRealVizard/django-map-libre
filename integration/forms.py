"""Forms wiring the demo map widget with every supported layer type."""

from django.forms import CharField, Form

from django_map_libre.map import MapWidget

from integration.constants import MAP_CENTER
from integration.layers import overlay_layers, tile_layers


class MapForm(Form):
    """Form wiring the demo map widget with every supported layer type."""

    map = CharField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["map"].widget = MapWidget(
            center=MAP_CENTER,
            tile_layers=tile_layers(),
            overlay_layers=overlay_layers(),
        )