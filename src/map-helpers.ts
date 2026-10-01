import type { Feature, FeatureCollection } from "geojson";
import {
    GeoJSONSource,
    Map as MapLibre,
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
    splitColorRamp,
    toTitleCase,
} from "./map-functions";
import type {
    CompleteCallback,
    DataCallback,
    ErrorCallback,
    FetchData,
    LayerConfig,
    LayerType,
    Legend,
    LegendConfig,
} from "./map-types";

const DefaultMapMarkerID = `marker-django-map-libre-default`;
const FallBackColor = "#c0c0c0";

export class DataLoader {
    private url: string;
    private onData: DataCallback;
    private onComplete: CompleteCallback;
    private onError: ErrorCallback;
    private workerUrl: string;
    private worker: Worker | null;

    constructor(
        url: string,
        onData: DataCallback,
        onComplete: CompleteCallback,
        onError: ErrorCallback,
        workerUrl: string
    ) {
        this.url = url;
        this.onData = onData;
        this.onComplete = onComplete;
        this.onError = onError;
        this.workerUrl = workerUrl;
        this.worker = null;
    }

    load() {
        try {
            this.worker = new Worker(this.workerUrl);
            this.worker.onmessage = (e) => {
                const { type, data, error } = e.data;

                if (type === "line") {
                    try {
                        const parsed = JSON.parse(data);
                        this.onData(parsed);
                    } catch (parseError) {
                        console.warn(
                            "[DataLoader] Failed to parse line:",
                            data,
                            parseError
                        );
                    }
                } else if (type === "data") {
                    this.onData(data);
                } else if (type === "complete") {
                    this.onComplete();
                } else if (type === "error") {
                    this.onError(error);
                }
            };

            this.worker.onerror = (e) => {
                this.onError(e.message);
            };

            this.worker.postMessage({ url: this.url });
        } catch (error) {
            console.error("[DataLoader] Failed to create worker:", error);
            this.onError(
                error instanceof Error ? error.message : String(error)
            );
        }
    }
}

class Loaddable {
    loader: DataLoader | null = null;
    private pendingTasks: Set<Promise<void>> = new Set();
    private completeReceived = false;
    load(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.loader) resolve(); // Prevent multiple loads
            if (this.getUrl() === null || this.getUrl() === undefined) {
                this.onLoadComplete();
                return resolve();
            }
            this.loader = new DataLoader(
                this.getUrl(),
                (data: FetchData) => {
                    this.pendingTasks.add(this.onLoadData(data));
                    this.tryComplete(resolve);
                },
                () => {
                    this.completeReceived = true;
                    this.tryComplete(resolve);
                },
                (error: string) => {
                    this.onLoadError(error);
                    reject();
                },
                import.meta.resolve("map-worker")
            );
            this.loader.load();
        });
    }
    private tryComplete(resolve: (value: void | PromiseLike<void>) => void) {
        if (this.completeReceived) {
            Promise.all(this.pendingTasks).then(() => {
                this.pendingTasks.clear();
                this.onLoadComplete();
                resolve();
            });
        }
    }
    onLoadComplete(): void { }
    onLoadError(error: string): void {
        console.error(`Error loading data:`, error);
        this.loader = null; // Reset loader on error to allow retry
    }
    onLoadData(_data: FetchData): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getUrl(): string {
        throw new Error("Method not implemented.");
    }
}

export class OverlayLegend extends Loaddable {
    legendConfig: LegendConfig;
    legendData: Legend | null;
    isLoaded: boolean;
    map: MapLibre;
    layerId: string;
    colors: string[] = [];
    markers: string[] = [];
    minValue?: number;
    maxValue?: number;
    parentOverlay: Overlay;
    paintScheduled: boolean = false;
    onLoadCompleteListener: (layerID: string, legendID: string) => void =
        () => { };

    constructor(
        layerId: string,
        legendConfig: LegendConfig,
        overlay: Overlay,
        map: MapLibre,
        onLoadCompleteListener: (layerID: string, legendID: string) => void
    ) {
        super();
        this.layerId = layerId;
        this.legendConfig = legendConfig;
        this.legendData = null;
        this.isLoaded = false;
        this.map = map;
        this.parentOverlay = overlay;
        this.onLoadCompleteListener = onLoadCompleteListener;
        if (
            legendConfig.type === "categorical" &&
            legendConfig.categoryMapping !== undefined &&
            typeof legendConfig.categoryMapping !== "string"
        ) {
            this.isLoaded = true;
            this.legendData = legendConfig.categoryMapping as Legend;
            this.cacheColors();
            this.cacheIcons();
        }
    }
    getUrl(): string {
        return this.legendConfig.categoryMapping as string;
    }
    updateMapLayout(): Promise<void> {
        return new Promise((resolve, _reject) => {
            switch (this.legendConfig.type) {
                case "fixed":
                    this.applyFixedLegendConfig(resolve);
                    break;

                case "categorical":
                    this.applyCategoricalConfig(resolve);
                    break;
                case "range":
                    this.applyRangeConfig(resolve);
                    break;
            }
        });
    }
    applyRangeConfig = (resolve: (value: void | PromiseLike<void>) => void) => {
        if (
            this.legendConfig.minValue == null ||
            this.legendConfig.maxValue == null
        ) {
            resolve();
            return;
        }
        this.minValue = this.legendConfig.minValue as number;
        this.maxValue = this.legendConfig.maxValue as number;
        this.applyRangeColors();
        resolve();
    };

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
    applyRangeColors = () => {
        if (!this.minValue || !this.maxValue) return;
        const steps = this.legendConfig.numSteps as number;
        const colors = splitColorRamp(
            this.legendConfig.colorRamp as string[],
            steps
        );

        const stepSize = (this.maxValue - this.minValue) / steps;

        const stepsData: unknown[] = [colors[0] as string];
        for (let i = 1; i < steps; i++) {
            stepsData.push(this.minValue + i * stepSize, colors[i]);
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
        this.onLoadCompleteListener(this.layerId, this.legendConfig.id);
    };
    applyColors() {
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
        this.onLoadCompleteListener(this.layerId, this.legendConfig.id);
    }
    doExtraStyling() {
        if (
            this.legendConfig.type === "categorical" &&
            (this.legendConfig.categoryMapping === undefined ||
                this.legendConfig.categoryMapping === null) &&
            this.parentOverlay.isLoaded
        ) {
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
                    for (const feature of (data as FeatureCollection)
                        .features) {
                        const colorKey =
                            feature.properties?.[
                            this.legendConfig.coloringProperty as string
                            ];
                        if (colorKey == null || colorKeys.has(colorKey))
                            continue;
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
        } else if (
            this.legendConfig.type === "range" &&
            (this.legendConfig.minValue === null ||
                this.legendConfig.minValue === undefined) &&
            this.parentOverlay.isLoaded
        ) {
            if (this.minValue !== undefined && this.minValue !== null) {
                this.applyRangeColors();
            } else {
                const source = this.parentOverlay.map.getSource(
                    `overlay-${this.parentOverlay.layerConfig.id}-source`
                ) as GeoJSONSource | undefined;
                source?.getData().then((data) => {
                    let minValue = Number.POSITIVE_INFINITY;
                    let maxValue = Number.NEGATIVE_INFINITY;
                    for (const feature of (data as FeatureCollection)
                        .features) {
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
                    this.minValue = minValue;
                    this.maxValue = maxValue;
                    this.applyRangeColors();
                });
            }
        }
    }
    applyFixedLegendConfig(resolve: (value: void | PromiseLike<void>) => void) {
        switch (this.parentOverlay.layerType) {
            case "fill":
                for (const [prop, value] of Object.entries(
                    getPaintForFillOverlay(this.legendConfig)
                )) {
                    this.map.setPaintProperty(
                        this.layerId,
                        prop as keyof AllPaintProperties,
                        value
                    );
                }
                break;
            case "line":
                for (const [prop, value] of Object.entries(
                    getPaintForLineOverlay(this.legendConfig)
                )) {
                    this.map.setPaintProperty(
                        this.layerId,
                        prop as keyof AllPaintProperties,
                        value
                    );
                }
                break;
            case "circle":
                for (const [prop, value] of Object.entries(
                    getPaintForCircleOverlay(this.legendConfig)
                )) {
                    this.map.setPaintProperty(
                        this.layerId,
                        prop as keyof AllPaintProperties,
                        value
                    );
                }
                break;
            case "icon":
                for (const [prop, value] of Object.entries(
                    getLayoutForSymbolOverlay(
                        this.map,
                        this.layerId,
                        this.legendConfig
                    )
                )) {
                    this.map.setLayoutProperty(
                        this.layerId,
                        prop as keyof AllLayoutProperties,
                        value
                    );
                }
                break;
        }
        this.onLoadCompleteListener(this.layerId, this.legendConfig.id);
        resolve();
    }
    onLoadData(data: FetchData): Promise<void> {
        // TODO: ALLOW NDJSON
        this.legendData = data as Legend;
        return Promise.resolve();
    }
    onLoadComplete(): void {
        this.isLoaded = true;
        this.cacheColors();
        this.cacheIcons();
        this.updateMapLayout();
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
}

export class Overlay extends Loaddable {
    layerConfig: LayerConfig;
    layerType: LayerType;
    isDisplayed: boolean = false;
    isLoaded: boolean = false;
    map: MapLibre;
    activeLegend: OverlayLegend | undefined;
    legends: OverlayLegend[];
    overlayLoadCompleteListener?: (layerID: string) => void;
    legendLoadCompleteListener?: (layerID: string, legendID: string) => void;

    public setOverlayLoadCompleteListener(fn: (layerID: string) => void) {
        this.overlayLoadCompleteListener = fn;
    }

    public setLegendLoadCompleteListener(
        fn: (layerID: string, legendID: string) => void
    ) {
        this.legendLoadCompleteListener = fn;
    }

    constructor(
        layerConfig: LayerConfig,
        layerType: LayerType,
        map: MapLibre,
        activeLegend: LegendConfig,
        legends: LegendConfig[]
    ) {
        super();
        this.layerConfig = layerConfig;
        this.layerType = layerType;
        this.map = map;
        this.isDisplayed = layerConfig.selected;
        this.legends = legends.map((l) => {
            const legendOverlay = new OverlayLegend(
                layerConfig.id,
                l,
                this,
                map,
                (layerID, legendID) =>
                    this.onLegendLoadComplete(layerID, legendID)
            );
            if (l === activeLegend) {
                this.activeLegend = legendOverlay;
            }
            return legendOverlay;
        });
    }
    onLegendLoadComplete(layerID: string, legendID: string) {
        if (this.legendLoadCompleteListener)
            this.legendLoadCompleteListener(layerID, legendID);
    }

    toggleVisibility() {
        if (!this.isLoaded) {
            this.load();
        }
        this.isDisplayed = !this.isDisplayed;
        this.map.setLayoutProperty(
            this.layerConfig.id,
            "visibility",
            this.isDisplayed ? "visible" : "none"
        );
    }
    getUrl(): string {
        return this.layerConfig.url;
    }

    onLoadData(data: FetchData): Promise<void> {
        let newFeatures: Feature[] = [];
        if (Array.isArray(data)) {
            for (const item of data) {
                if (Array.isArray(item)) {
                    for (const subItem of item) {
                        if (subItem.type === "Feature") {
                            newFeatures.push(subItem);
                        } else if (subItem.type === "FeatureCollection") {
                            newFeatures.push(...subItem.features);
                        }
                    }
                } else {
                    if (item.type === "Feature") {
                        newFeatures.push(item);
                    } else if (item.type === "FeatureCollection") {
                        newFeatures.push(...item.features);
                    }
                }
            }
        } else {
            if (data.type === "Feature") {
                newFeatures = [data];
            } else if (data.type === "FeatureCollection") {
                newFeatures = data.features;
            } else {
                console.warn("[Overlay] Unexpected data type:", data);
                return Promise.resolve();
            }
        }

        const source = this.map.getSource(
            `overlay-${this.layerConfig.id}-source`
        ) as GeoJSONSource | undefined;
        if (source) {
            return source.updateData({ add: newFeatures });
        }
        return Promise.resolve();
    }
    onLoadComplete(): void {
        this.isLoaded = true;
        this.activeLegend?.doExtraStyling();
    }
    load(): Promise<void> {
        return (this.activeLegend?.updateMapLayout() as Promise<void>)
            .then(() => super.load())
            .then(() => {
                if (this.overlayLoadCompleteListener)
                    this.overlayLoadCompleteListener(this.layerConfig.id);
                return Promise.resolve();
            });
    }
}

export class OverlayManager {
    overlays = new Map<string, Overlay>();
    overlayLoadListeners = new Set<(layerID: string) => void>();
    legendLoadListeners = new Set<
        (layerID: string, legendID: string) => void
    >();
    legendHideListeners = new Set<
        (layerID: string, legendID: string) => void
    >();
    legendDisplayListeners = new Set<
        (layerID: string, legendID: string) => void
    >();
    overlayAddListeners = new Set<(layerID: string) => void>();

    map: MapLibre;

    constructor(map: MapLibre) {
        this.map = map;
    }

    getOverlays(): Overlay[] {
        return Array.from(this.overlays.values());
    }

    getOverlay(id: string): Overlay {
        return this.overlays.get(id) as Overlay;
    }

    addOverlay(id: string, overlay: Overlay) {
        this.overlays.set(id, overlay);
        overlay.setLegendLoadCompleteListener((layerID, legendID) =>
            this.onLegendLoadComplete(layerID, legendID)
        );
        overlay.setOverlayLoadCompleteListener((layerID) =>
            this.onOverlayLoadComplete(layerID)
        );
        for (const fn of this.overlayAddListeners) {
            fn(id);
        }
    }

    removeOverlay(id: string) {
        this.overlays.delete(id);
    }

    hasOverlay(id: string): boolean {
        return this.overlays.has(id);
    }

    getIDs(): string[] {
        return Array.from(this.overlays.keys());
    }
    toggleOverlayVisibility(id: string) {
        const overlay = this.getOverlay(id);
        if (overlay) {
            overlay.toggleVisibility();
            if (!overlay.isDisplayed) {
                for (const fn of this.legendHideListeners) {
                    fn(overlay.layerConfig.id, overlay.activeLegend?.legendConfig.id as string);
                }
            } else {
                for (const fn of this.legendDisplayListeners) {
                    fn(overlay.layerConfig.id, overlay.activeLegend?.legendConfig.id as string);
                }
            }
        }
    }
    onOverlayLoadComplete(layerID: string) {
        for (const fn of this.overlayLoadListeners) {
            fn(layerID);
        }
    }
    onLegendLoadComplete(layerID: string, legendID: string) {
        for (const fn of this.legendLoadListeners) {
            fn(layerID, legendID);
        }
    }
    addOverlayLoadListener(fn: (layerID: string) => void) {
        this.overlayLoadListeners.add(fn);
    }
    addLegendLoadListener(fn: (layerID: string, legendID: string) => void) {
        this.legendLoadListeners.add(fn);
    }
    addOverlayAddListener(fn: (layerID: string) => void) {
        this.overlayAddListeners.add(fn);
    }
    addLegendHideListener(fn: (layerID: string, legendID: string) => void) {
        this.legendHideListeners.add(fn);
    }
    addLegendDisplayListener(fn: (layerID: string, legendID: string) => void) {
        this.legendDisplayListeners.add(fn);
    }
}
