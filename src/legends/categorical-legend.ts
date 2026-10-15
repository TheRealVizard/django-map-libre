import type { FeatureCollection } from "geojson";
import {
    GeoJSONSource,
    type AllLayoutProperties,
    type AllPaintProperties,
    type ExpressionSpecification,
} from "maplibre-gl";
import {
    getLayoutForSymbolOverlay,
    getPaintForCircleOverlay,
    getPaintForFillOverlay,
    getPaintForLineOverlay,
    getRandomColor,
    loadImageOnMap,
    toTitleCase,
} from "../helpers/functions";
import type { Overlay } from "../helpers/overlay-helpers";
import type { FetchData, Legend, LegendConfig } from "../types/map-types";
import { BaseLegend } from "./base-legend";
import type { MapLibre } from "@/helpers/map-wrapper";

const DefaultMapMarkerID = `marker-django-map-libre-default`;
const FallBackColor = "#c0c0c0";

/**
 * Legend that assigns a distinct color (and optionally icon) per category.
 */
export class CategoricalLegend extends BaseLegend {
    legendData: Legend | null = null;
    colors: string[] = [];
    markers: string[] = [];

    constructor(
        layerId: string,
        legendConfig: LegendConfig,
        overlay: Overlay,
        map: MapLibre,
        onLoadCompleteListener: (layerID: string, legendID: string) => void
    ) {
        super(layerId, legendConfig, overlay, map, onLoadCompleteListener);
        if (
            legendConfig.categoryMapping !== undefined &&
            typeof legendConfig.categoryMapping !== "string"
        ) {
            this.isLoaded = true;
            this.legendData = legendConfig.categoryMapping as Legend;
            this.cacheColors();
            this.cacheIcons();
        }
    }

    getUrl(): string | undefined {
        return typeof this.legendConfig.categoryMapping === "string"
            ? this.legendConfig.categoryMapping
            : undefined;
    }

    updateMapLayout(): Promise<void> {
        return new Promise((resolve, _reject) => {
            this.applyCategoricalConfig(resolve);
        });
    }

    applyCategoricalConfig(resolve: (value: void | PromiseLike<void>) => void) {
        if (
            this.legendConfig.categoryMapping === undefined ||
            this.legendConfig.categoryMapping === null
        ) {
            resolve();
        } else if (this.isLoaded) {
            this.applyColors();
            resolve();
        } else {
            this.load()
                .then(() => resolve())
                .catch(() => resolve());
        }
    }

    /**
     * Applies the match expression to the layer.
     *
     * @param notify - When `true` (default), fires the load-complete
     *   listener so the legend control rebuilds its section. Live edits
     *   from the control pass `false` to avoid tearing down the color
     *   picker mid-drag.
     */
    applyColors(notify: boolean = true) {
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
                this.map.setPaintProperty(this.layerId, "fill-color", [
                    "match",
                    ["get", this.legendConfig.coloringProperty],
                    ...this.colors,
                    FallBackColor,
                ] as unknown as ExpressionSpecification);
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
                this.map.setPaintProperty(this.layerId, "line-color", [
                    "match",
                    ["get", this.legendConfig.coloringProperty],
                    ...this.colors,
                    FallBackColor,
                ] as unknown as ExpressionSpecification);
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
                this.map.setPaintProperty(this.layerId, "circle-color", [
                    "match",
                    ["get", this.legendConfig.coloringProperty],
                    ...this.colors,
                    FallBackColor,
                ] as unknown as ExpressionSpecification);
                break;
            case "icon":
                for (const [prop, value] of Object.entries(
                    getLayoutForSymbolOverlay(
                        this.map,
                        this.layerId,
                        this.legendConfig,
                        true
                    )
                )) {
                    this.map.setLayoutProperty(
                        this.layerId,
                        prop as keyof AllLayoutProperties,
                        value
                    );
                }
                this.map.setLayoutProperty(this.layerId, "icon-image", [
                    "match",
                    ["get", this.legendConfig.coloringProperty],
                    ...this.markers,
                    DefaultMapMarkerID,
                ] as unknown as ExpressionSpecification);
                break;
        }
        if (notify) {
            this.onLoadCompleteListener(this.layerId, this.legendConfig.id);
        }
    }

    doExtraStyling() {
        if (!this.parentOverlay.isLoaded) return;
        if (
            this.legendConfig.categoryMapping !== undefined &&
            this.legendConfig.categoryMapping !== null
        ) {
            return;
        }
        if (this.colors.length != 0) {
            this.applyColors();
        } else {
            const source = this.parentOverlay.map.getSource(
                `overlay-${this.parentOverlay.layerConfig.id}-source`
            ) as GeoJSONSource | undefined;
            source?.getData().then((data) => {
                this.legendData = {};
                const colorKeys = new Set<string>();
                let index = 0;
                for (const feature of (data as FeatureCollection).features) {
                    const colorKey =
                        feature.properties?.[
                            this.legendConfig.coloringProperty as string
                        ];
                    if (colorKey == null || colorKeys.has(colorKey)) continue;
                    const color = getRandomColor(index);
                    this.legendData = {
                        ...this.legendData,
                        [colorKey]: {
                            label: toTitleCase(colorKey),
                            color: color,
                        },
                    };
                    colorKeys.add(colorKey);
                    this.colors.push(colorKey, color);
                    index++;
                }
                this.applyColors();
            });
        }
    }

    onLoadData(data: FetchData): Promise<void> {
        this.legendData = data as Legend;
        return Promise.resolve();
    }

    cacheColors() {
        if (!this.legendData || this.parentOverlay.layerType === "icon") return;
        let index = 0;
        for (const [key, value] of Object.entries(this.legendData)) {
            this.colors.push(key);
            if (!value.color) {
                value.color = getRandomColor(index);
            }
            this.colors.push(value.color);
            index++;
        }
    }

    cacheIcons() {
        if (!this.legendData || this.parentOverlay.layerType !== "icon") return;
        loadImageOnMap(null, this.map, DefaultMapMarkerID);
        for (const [key, data] of Object.entries(this.legendData)) {
            const markerID = `marker-${key}-${this.layerId}`;
            this.markers.push(key, markerID);
            loadImageOnMap(data.icon, this.map, markerID);
        }
    }
    /**
     * Updates the color of a single category and reapplies the match
     * expression without triggering the load-complete listener.
     *
     * The `colors` array is the flat `[key1, color1, key2, color2, ...]`
     * list consumed by the `match` expression, so the new color is written
     * next to its key instead of rebuilding the whole array.
     *
     * @param key - Category key as stored in `legendData`.
     * @param color - New color for the category.
     */
    setColor(key: string, color: string): void {
        if (!this.legendData || !this.legendData[key]) return;
        this.legendData[key].color = color;
        const idx = this.colors.indexOf(key);
        if (idx >= 0 && idx + 1 < this.colors.length) {
            this.colors[idx + 1] = color;
        }
        this.applyColors(false);
    }
}
