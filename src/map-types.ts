import type { Feature, FeatureCollection } from "geojson";
import type { ControlPosition, Unit } from "maplibre-gl";

export interface TrackedLayer {
    id: string;
    label: string;
    visible: boolean;
}

export type LayerType = "fill" | "line" | "circle" | "icon" | "symbol";
export type LegendType = "fixed" | "categorical" | "range";
export type Anchor =
    | "center"
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
export type Overlap = "never" | "always" | "cooperative";
export interface LegendConfig {
    id: string;
    label: string;
    type: LegendType;

    coloringProperty?: string | null;
    displayProperty?: string | null;

    color?: string | null;
    image?: string | null;

    categoryMapping?: Legend | string | null;

    minValue?: number | null;
    maxValue?: number | null;
    colorRamp?: string[] | null;

    circleRadius?: number | null;
    circleOpacity?: number | null;
    circleStrokeColor?: string | null;
    circleStrokeWidth?: number | null;

    iconSize?: number | null;
    iconOverlap?: Overlap | null;
    iconAnchor?: Anchor | null;

    active?: boolean;
}

export interface LayerConfig {
    id: string;
    label: string;
    url: string;
    selected: boolean;
}

export interface OverlayLayerConfig extends LayerConfig {
    layerType: LayerType;
    legends: LegendConfig[];
}

export interface TileLayerConfig extends LayerConfig {
    attribution: string;
}

export interface MapWidgetDataset extends DOMStringMap {
    center: string;
    tileLayer: string;
    overlayLayer: string;
    navigationPosition: ControlPosition;
    layerSelectorPosition: ControlPosition;
    showScale: string;
    metricUnit: Unit;
    scalePosition: ControlPosition;
    allowFullscreen: string;
    loadingText: string;
    autoInit: string;
}

export interface LegendData {
    label?: string;
    icon?: string;
    color?: string;
}

export type Legend = Record<string, LegendData>;

export type FetchData =
    Legend | FeatureCollection[] | FeatureCollection | Feature[] | Feature;

export type DataCallback = (data: FetchData) => void;
export type CompleteCallback = () => void;
export type ErrorCallback = (error: string) => void;
