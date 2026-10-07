import type { FeatureCollection } from "geojson";
import type { Map as MapLibre } from "maplibre-gl";
import {
    GeoJSONSource,
    type AllPaintProperties,
    type ExpressionSpecification,
} from "maplibre-gl";
import {
    getPaintForCircleOverlay,
    getPaintForFillOverlay,
    getPaintForLineOverlay,
} from "../helpers/functions";
import type { Overlay } from "../helpers/overlay-helpers";
import type {
    ColorStop,
    FetchData,
    LegendConfig,
    RangeBound,
    RemoteInterpolatedConfig,
} from "../types/map-types";
import { BaseLegend } from "./base-legend";

/**
 * Legend that produces a continuous gradient across a numeric range.
 */
export class InterpolatedLegend extends BaseLegend {
    bounds?: RangeBound;

    constructor(
        layerId: string,
        legendConfig: LegendConfig,
        overlay: Overlay,
        map: MapLibre,
        onLoadCompleteListener: (layerID: string, legendID: string) => void
    ) {
        super(layerId, legendConfig, overlay, map, onLoadCompleteListener);
        if (!legendConfig.configUrl) {
            this.isLoaded = true;
        }
    }

    getUrl(): string | undefined {
        return this.legendConfig.configUrl as string;
    }

    updateMapLayout(): Promise<void> {
        return new Promise((resolve, _reject) => {
            this.applyRangeConfig(resolve);
        });
    }

    applyRangeConfig(resolve: (value: void | PromiseLike<void>) => void): void {
        if (this.legendConfig.configUrl && !this.isLoaded) {
            this.load()
                .then(() => resolve())
                .catch(() => resolve());
            return;
        }
        if (typeof this.legendConfig.colorStops?.[0] !== "object") {
            resolve();
            return;
        }
        this.applyRangeColors();
        resolve();
    }

    applyRangeColors() {
        if (this.invalidColorStop()) return;

        const flat: unknown[] = [];

        if (typeof this.legendConfig.colorStops?.[0] !== "object") {
            if (!this.bounds) return;
            const colors = this.legendConfig.colorStops as string[];
            const minValue = this.bounds.min;
            const maxValue = this.bounds.max;
            const count = colors.length;
            const stepSize = (maxValue - minValue) / (count - 1);

            for (let i = 0; i < count; i++) {
                flat.push(minValue + i * stepSize, colors[i]);
            }
        } else {
            for (const stop of this.legendConfig.colorStops as ColorStop[]) {
                flat.push(stop.value, stop.color);
            }
        }

        const styleExpression = [
            "interpolate",
            ["linear"],
            ["get", this.legendConfig.coloringProperty],
            ...flat,
        ] as unknown as ExpressionSpecification;

        switch (this.parentOverlay.layerType) {
            case "fill":
                for (const [prop, value] of Object.entries(
                    getPaintForFillOverlay(this.legendConfig, true)
                )) {
                    this.map.setPaintProperty(
                        this.layerId,
                        prop as keyof AllPaintProperties,
                        value
                    );
                }
                this.map.setPaintProperty(
                    this.layerId,
                    "fill-color",
                    styleExpression
                );
                break;
            case "line":
                for (const [prop, value] of Object.entries(
                    getPaintForLineOverlay(this.legendConfig, true)
                )) {
                    this.map.setPaintProperty(
                        this.layerId,
                        prop as keyof AllPaintProperties,
                        value
                    );
                }
                this.map.setPaintProperty(
                    this.layerId,
                    "line-color",
                    styleExpression
                );
                break;
            case "circle":
                for (const [prop, value] of Object.entries(
                    getPaintForCircleOverlay(this.legendConfig, true)
                )) {
                    this.map.setPaintProperty(
                        this.layerId,
                        prop as keyof AllPaintProperties,
                        value
                    );
                }
                this.map.setPaintProperty(
                    this.layerId,
                    "circle-color",
                    styleExpression
                );
                break;
        }
        this.onLoadCompleteListener(this.layerId, this.legendConfig.id);
    }

    private invalidColorStop() {
        return (
            !this.legendConfig.colorStops ||
            this.legendConfig.colorStops.length < 2
        );
    }

    doExtraStyling() {
        if (!this.parentOverlay.isLoaded) return;
        if (
            this.invalidColorStop() ||
            typeof this.legendConfig.colorStops?.[0] === "object"
        ) {
            return;
        }
        if (this.bounds !== undefined && this.bounds !== null) {
            this.applyRangeColors();
        } else {
            const source = this.parentOverlay.map.getSource(
                `overlay-${this.parentOverlay.layerConfig.id}-source`
            ) as GeoJSONSource | undefined;
            source?.getData().then((data) => {
                let minValue = Number.POSITIVE_INFINITY;
                let maxValue = Number.NEGATIVE_INFINITY;
                for (const feature of (data as FeatureCollection).features) {
                    let value =
                        feature.properties?.[
                            this.legendConfig.coloringProperty as string
                        ];
                    if (value) {
                        value = Number.parseFloat(value);
                        minValue = Math.min(minValue, value);
                        maxValue = Math.max(maxValue, value);
                    }
                }
                this.bounds = {
                    min: minValue,
                    max: maxValue,
                };
                this.applyRangeColors();
            });
        }
    }

    onLoadData(data: FetchData): Promise<void> {
        this.legendConfig.colorStops = (
            data as RemoteInterpolatedConfig
        ).colorStops;
        return Promise.resolve();
    }
}
