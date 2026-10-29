import type { FeatureCollection } from "geojson";
import {
    GeoJSONSource,
    type AllPaintProperties,
    type ExpressionSpecification,
} from "maplibre-gl";
import {
    getPaintForCircleOverlay,
    getPaintForFillOverlay,
    getPaintForLineOverlay,
    getRandomColor,
    splitColorRamp,
} from "../helpers/functions";
import type { Overlay } from "../helpers/overlay-helpers";
import type {
    FetchData,
    LegendConfig,
    RangeBound,
    RemoteRangeConfig,
} from "../types/map-types";
import { BaseLegend } from "./base-legend";
import type { MapLibre } from "@/helpers/map-wrapper";

/**
 * Legend that discretizes a numeric range into hard-edged buckets.
 */
export class RangeLegend extends BaseLegend {
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
            this.legendConfig.colorRamp = this.legendConfig.colorRamp ?? [
                getRandomColor(-1),
                getRandomColor(-1),
            ];
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
        if (this.legendConfig.bounds == null) {
            resolve();
            return;
        }
        this.bounds = this.legendConfig.bounds as RangeBound;
        this.applyRangeColors();
        resolve();
    }

    /**
     * Updates the color of a single bin and reapplies the step expression
     * without triggering the load-complete listener.
     *
     * On the first edit, `colorRamp` is expanded via `splitColorRamp` into
     * an explicit per-bin list (length === `numSteps`). Subsequent edits
     * mutate a single index without affecting the other bins.
     *
     * @param index - Bin index, in `[0, numSteps)`.
     * @param color - New color for that bin.
     */
    setColor(index: number, color: string): void {
        const steps = this.legendConfig.numSteps as number;
        const ramp = this.legendConfig.colorRamp as string[];
        if (!ramp) return;

        const resolved =
            ramp.length === steps ? ramp : splitColorRamp(ramp, steps);

        if (index < 0 || index >= resolved.length) return;
        resolved[index] = color;
        this.legendConfig.colorRamp = resolved;
        this.applyRangeColors(false);
    }

    /**
     * Applies the step expression to the layer.
     *
     * @param notify - When `true` (default), fires the load-complete
     *   listener. Live edits from the control pass `false`.
     */
    applyRangeColors(notify: boolean = true) {
        if (!this.bounds) return;

        const minValue = this.bounds.min;
        const maxValue = this.bounds.max;

        const steps = this.legendConfig.numSteps as number;
        const colors = splitColorRamp(
            this.legendConfig.colorRamp as string[],
            steps
        );

        const stepSize = (maxValue - minValue) / steps;

        const stepsData: unknown[] = [colors[0] as string];
        for (let i = 1; i < steps; i++) {
            stepsData.push(minValue + i * stepSize, colors[i]);
        }

        const styleExpression = [
            "step",
            ["get", this.legendConfig.coloringProperty],
            ...stepsData,
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
        if (notify) {
            this.onLoadCompleteListener(this.layerId, this.legendConfig.id);
        }
    }

    doExtraStyling() {
        if (!this.parentOverlay.isLoaded) return;
        if (
            this.legendConfig.bounds !== null &&
            this.legendConfig.bounds !== undefined
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
        const cfg = data as RemoteRangeConfig;
        this.legendConfig.numSteps = cfg.numSteps;
        this.legendConfig.bounds = cfg.bounds ?? null;
        this.legendConfig.colorRamp = cfg.colorRamp ?? [
            getRandomColor(-1),
            getRandomColor(-1),
        ];
        return Promise.resolve();
    }
}
