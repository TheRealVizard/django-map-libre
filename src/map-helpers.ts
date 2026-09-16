import type { Feature } from "geojson";
import {
    GeoJSONSource,
    Map as MapLibre,
    type ExpressionSpecification,
} from "maplibre-gl";
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
import { getRandomColor } from "./map-functions";

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
                    this._cleanup();
                } else if (type === "error") {
                    this.onError(error);
                    this._cleanup();
                }
            };

            this.worker.onerror = (e) => {
                this.onError(e.message);
                this._cleanup();
            };

            this.worker.postMessage({ url: this.url });
        } catch (error) {
            console.error("[DataLoader] Failed to create worker:", error);
            this.onError(
                error instanceof Error ? error.message : String(error)
            );
        }
    }

    _cleanup() {
        if (this.worker) {
            this.worker.terminate();
            this.worker = null;
        }
    }
}

class Loaddable {
    loader: DataLoader | null = null;
    load(): void {
        if (this.loader) return; // Prevent multiple loads
        this.loader = new DataLoader(
            this.getUrl(),
            (data: FetchData) => {
                this.onLoadData(data);
            },
            () => {
                this.onLoadComplete();
            },
            (error: string) => {
                this.onLoadError(error);
            },
            import.meta.resolve("map-worker")
        );

        this.loader.load();
    }
    onLoadComplete(): void {}
    onLoadError(error: string): void {
        console.error(`Error loading data:`, error);
        this.loader = null; // Reset loader on error to allow retry
    }
    onLoadData(_data: FetchData): void {
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

    constructor(layerId: string, legendConfig: LegendConfig, map: MapLibre) {
        super();
        this.layerId = layerId;
        this.legendConfig = legendConfig;
        this.legendData = null;
        this.isLoaded = false;
        this.map = map;
        if (
            legendConfig.type === "categorical" &&
            legendConfig.categoryMapping !== null &&
            typeof legendConfig.categoryMapping !== "string"
        ) {
            this.isLoaded = true;
            this.legendData = legendConfig.categoryMapping as Legend;
            for (const [key, value] of Object.entries(this.legendData)) {
                this.colors.push(key);
                this.colors.push(value.color ?? getRandomColor());
            }
        }
    }
    getUrl(): string {
        return this.legendConfig.categoryMapping as string;
    }
    updateMapLayout(): void {
        if (this.legendData === null) return;
        switch (this.legendConfig.type) {
            case "fixed":
                break;

            case "categorical":
                if (this.isLoaded) {
                    this.map.setPaintProperty(this.layerId, "fill-color", [
                        "match",
                        ["get", this.legendConfig.coloringProperty],
                        ...this.colors,
                        "#c0c0c0",
                    ] as unknown as ExpressionSpecification);
                } else {
                    // TODO: ADD LOAD LOGIC TO SAVE DATA onLoadData
                    this.load();
                }
                break;
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
        this.legends = legends.map((l) => {
            const legendOverlay = new OverlayLegend(layerConfig.id, l, map);
            if (l === activeLegend) {
                this.activeLegend = legendOverlay;
            }
            return legendOverlay;
        });
    }

    toggleVisibility() {
        this.isDisplayed = !this.isDisplayed;
        this.map.setLayoutProperty(
            this.layerConfig.id,
            "visibility",
            this.isDisplayed ? "visible" : "none"
        );
        if (!this.isLoaded) {
            this.load();
        }
    }
    getUrl(): string {
        return this.layerConfig.url;
    }

    onLoadData(data: FetchData): void {
        let newFeatures: Feature[] = [];
        if (Array.isArray(data)) {
            for (const item of data) {
                if (item.type === "Feature") {
                    newFeatures.push(item);
                } else if (item.type === "FeatureCollection") {
                    newFeatures.push(...item.features);
                }
            }
        } else {
            if (data.type === "Feature") {
                newFeatures = [data];
            } else if (data.type === "FeatureCollection") {
                newFeatures = data.features;
            } else {
                console.warn("[Overlay] Unexpected data type:", data);
                return;
            }
        }

        const source = this.map.getSource(
            `overlay-${this.layerConfig.id}-source`
        ) as GeoJSONSource | undefined;
        if (source) {
            source.updateData({ add: newFeatures });
        }
    }
    onLoadComplete(): void {
        this.isLoaded = true;
    }
    load(): void {
        this.activeLegend?.updateMapLayout();
        super.load();
    }
}

export class OverlayManager {
    overlays = new Map<string, Overlay>();

    map: MapLibre;

    constructor(map: MapLibre) {
        this.map = map;
    }

    getOverlay(id: string): Overlay {
        return this.overlays.get(id) as Overlay;
    }

    addOverlay(id: string, overlay: Overlay) {
        this.overlays.set(id, overlay);
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
        }
    }
}
