"""Shared constants for the integration test project."""

from typing import Final


MAP_CENTER: Final[tuple[float, float]] = (37.753574, -122.447303)

DEFAULT_FEATURE_COUNT: Final[int] = 300
DEFAULT_BATCH_SIZE: Final[int] = 1

PARCEL_LATITUDE_RANGE: Final[tuple[float, float]] = (37.708, 37.812)
PARCEL_LONGITUDE_RANGE: Final[tuple[float, float]] = (-122.527, -122.348)
PARCEL_HALF_SIZE: Final[float] = 0.001

STREET_NAMES: Final[tuple[str, ...]] = (
    "Market St",
    "Mission St",
    "Valencia St",
    "Dolores St",
    "Castro St",
)

LAND_USES: Final[tuple[str, ...]] = (
    "residential",
    "commercial",
    "mixed-use",
    "biohazard",
    "unknown",
)

LAND_USE_MAPPING: Final[dict[str, dict]] = {
    "biohazard": {"label": "Biohazard", "color": "#D94A4A"},
    "residential": {"label": "Residential", "color": "#4A90D9"},
    "commercial": {"label": "Commercial", "color": "#D9A64A"},
    "mixed-use": {"label": "Mixed Use", "color": "#7BD94A"},
    "unknown": {"label": "Unknown"},
}
