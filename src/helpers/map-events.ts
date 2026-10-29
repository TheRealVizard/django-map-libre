import type {
    FeatureHighlight,
    FeatureListHighlight,
    GoToFeature,
    GoToKind,
} from "@/types/map-types";
import type { LngLatLike } from "maplibre-gl";

// GoToDetail — solo tiene sentido para kind === "feature"
interface GoToDetail {
    kind: GoToKind;
    coord: LngLatLike;
    bbox: [number, number, number, number];
    zoom?: number;
    feature: GoToFeature;
    /** When true and kind === "feature", also highlights the feature. */
    highlight?: boolean;
}

export interface GoToEvent extends CustomEvent {
    detail: GoToDetail;
}

export interface HighlightEvent extends CustomEvent {
    detail: FeatureHighlight | FeatureListHighlight | FeatureListHighlight[];
}
