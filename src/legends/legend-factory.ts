import type { Map as MapLibre } from "maplibre-gl";
import type { Overlay } from "../helpers/overlay-helpers";
import type { LegendConfig } from "../types/map-types";
import { BaseLegend } from "./base-legend";
import { CategoricalLegend } from "./categorical-legend";
import { FixedLegend } from "./fixed-legend";
import { InterpolatedLegend } from "./interpolated-legend";
import { RangeLegend } from "./range-legend";

export function createLegend(
    layerId: string,
    config: LegendConfig,
    overlay: Overlay,
    map: MapLibre,
    onLoadCompleteListener: (layerID: string, legendID: string) => void
): BaseLegend {
    switch (config.type) {
        case "fixed":
            return new FixedLegend(
                layerId,
                config,
                overlay,
                map,
                onLoadCompleteListener
            );
        case "categorical":
            return new CategoricalLegend(
                layerId,
                config,
                overlay,
                map,
                onLoadCompleteListener
            );
        case "range":
            return new RangeLegend(
                layerId,
                config,
                overlay,
                map,
                onLoadCompleteListener
            );
        case "interpolated":
            return new InterpolatedLegend(
                layerId,
                config,
                overlay,
                map,
                onLoadCompleteListener
            );
    }
}
