import type { Feature } from "geojson";
import { GeoJSONSource, Map as MapLibre } from "maplibre-gl";
import { Loaddable } from "../data/loader";
import { createLegend, type BaseLegend } from "../legends";
import type {
    FetchData,
    LayerConfig,
    LayerType,
    LegendConfig,
} from "../types/map-types";

export class Overlay extends Loaddable {
    layerConfig: LayerConfig;
    layerType: LayerType;
    isDisplayed: boolean = false;
    isLoaded: boolean = false;
    map: MapLibre;
    activeLegend: BaseLegend | undefined;
    legends: BaseLegend[];
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
            const legendOverlay = createLegend(
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
                    fn(
                        overlay.layerConfig.id,
                        overlay.activeLegend?.legendConfig.id as string
                    );
                }
            } else {
                for (const fn of this.legendDisplayListeners) {
                    fn(
                        overlay.layerConfig.id,
                        overlay.activeLegend?.legendConfig.id as string
                    );
                }
            }
        }
    }
    setOverlayLegend(layerID: string, legendID: string) {
        const overlay = this.getOverlay(layerID);
        if (overlay) {
            for (const legend of overlay.legends) {
                if (legend.legendConfig.id === legendID) {
                    overlay.activeLegend = legend;
                    overlay.activeLegend.updateMapLayout().then(() => {
                        overlay.activeLegend?.doExtraStyling();
                    });
                    return;
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
