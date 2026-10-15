import type { GoToFeature, GoToKind } from "@/types/map-types";
import type { LngLatLike } from "maplibre-gl";

interface GoToDetail {
    kind: GoToKind;
    coord: LngLatLike;
    bbox: [number, number, number, number];
    zoom?: number;
    feature: GoToFeature;
}

export interface GoToEvent extends CustomEvent {
    detail: GoToDetail;
}
