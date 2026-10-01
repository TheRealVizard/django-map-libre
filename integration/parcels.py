"""Random parcel feature generation used by the mock data providers."""

import random

from integration.constants import (
    LAND_USES,
    PARCEL_HALF_SIZE,
    PARCEL_LATITUDE_RANGE,
    PARCEL_LONGITUDE_RANGE,
    STREET_NAMES,
)


def random_parcel_ring() -> list[list[float]]:
    """Return the closed coordinate ring of a random square parcel."""
    lat = random.uniform(*PARCEL_LATITUDE_RANGE)
    lon = random.uniform(*PARCEL_LONGITUDE_RANGE)
    half = PARCEL_HALF_SIZE / 2
    return [
        [lon - half, lat - half],
        [lon + half, lat - half],
        [lon + half, lat + half],
        [lon - half, lat + half],
        [lon - half, lat - half],
    ]


def build_parcel_feature(index: int, batch: int | None = None) -> dict:
    """Return a random polygon feature representing a single parcel."""
    feature_id = f"FID{index}" if batch is None else f"FID{index}-{batch}"
    return {
        "id": feature_id,
        "type": "Feature",
        "geometry": {"type": "Polygon", "coordinates": [random_parcel_ring()]},
        "properties": {
            "parcel_id": f"P{index}",
            "area_sqft": round(random.uniform(2000, 8000), 1),
            "score": round(random.uniform(1, 100), 1),
            "address": f"{random.randint(1, 999)} {random.choice(STREET_NAMES)}",
            "land_use": random.choice(LAND_USES),
        },
    }
