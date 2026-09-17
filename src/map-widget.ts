import {
    FullscreenControl,
    Map as MapLibre,
    NavigationControl,
    ScaleControl,
    type AllLayoutProperties,
    type CircleLayerSpecification,
    type FillLayerSpecification,
    type LayerSpecification,
    type LineLayerSpecification,
    type SourceSpecification,
    type StyleSpecification,
    type SymbolLayerSpecification,
    setWorkerUrl,
} from "maplibre-gl";
import { LayerSelector } from "./map-controls";
import { Overlay, OverlayManager } from "./map-helpers";
import type {
    MapWidgetDataset,
    OverlayLayerConfig,
    TileLayerConfig,
} from "./map-types";

setWorkerUrl(import.meta.resolve("maplibre-gl-worker"));

const layerTypes = ["fill", "line", "circle", "icon"];

const parseTileLayers = (rawData: string): TileLayerConfig[] => {
    let config: TileLayerConfig[] = [];
    if (rawData) {
        try {
            config = JSON.parse(rawData);
        } catch (_e) {
            console.warn("Invalid tileLayer config, using fallback.");
        }
    }
    if (!config || config.length === 0) {
        config = [
            {
                id: "osm-layer",
                label: "OpenStreetMap",
                url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
                attribution:
                    '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                selected: true,
            },
        ];
    }
    // Ensure only one selected
    let foundSelected = false;
    config.forEach((layer) => {
        if (layer.selected && !foundSelected) {
            foundSelected = true;
        } else if (layer.selected && foundSelected) {
            layer.selected = false;
        }
    });
    if (!foundSelected && config.length > 0) {
        if (config[0]) {
            config[0].selected = true;
        }
    }
    return config;
};

const buildStyleFromTileLayers = (
    tileLayers: TileLayerConfig[]
): StyleSpecification => {
    const sources: Record<string, SourceSpecification> = {};
    const layers: LayerSpecification[] = [];
    tileLayers.forEach((cfg) => {
        const sourceId = cfg.id + "-source";
        sources[sourceId] = {
            type: "raster",
            tiles: [cfg.url],
            tileSize: 256,
            attribution: cfg.attribution || "",
        };
        layers.push({
            id: cfg.id,
            type: "raster",
            source: sourceId,
            layout: {
                visibility: cfg.selected ? "visible" : "none",
            },
        });
    });
    return {
        version: 8,
        sources: sources,
        layers: layers,
    };
};

const registerTileLayers = (
    selector: LayerSelector,
    tileLayers: TileLayerConfig[]
) => {
    let first = true;
    tileLayers.forEach((cfg) => {
        selector.addTileLayer(cfg.id, cfg.label || cfg.id, first);
        first = false;
    });
};

const parseOverlayLayers = (rawData: string): OverlayLayerConfig[] => {
    if (!rawData) return [];
    try {
        return JSON.parse(rawData);
    } catch (_e) {
        console.warn("Invalid overlayLayer config.");
        return [];
    }
};

/**
 * Adds a single overlay layer to the map.
 */
const addOverlayLayer = async (
    map: MapLibre,
    overlayManager: OverlayManager,
    overlayConfig: OverlayLayerConfig
) => {
    const { id, label, layerType, url, legends, selected } = overlayConfig;

    // Find active legend (or first one)
    const activeLegend = legends.find((l) => l.active) || legends[0];
    if (!activeLegend) {
        console.warn(`No legend found for overlay ${id}, skipping.`);
        return;
    }

    if (!layerTypes.includes(layerType)) {
        console.warn(`Invalid layer type for overlay ${id}, skipping.`);
        return;
    }

    // Only 'fixed' is implemented for now
    if (activeLegend.type !== "fixed" && activeLegend.type !== "categorical") {
        console.warn(
            `Legend type '${activeLegend.type}' not yet implemented for overlay ${id}.`
        );
        return;
    }

    const sourceId = `overlay-${id}-source`;

    const mapType = layerType === "icon" ? "symbol" : layerType;

    if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: [],
            },
        });
    }

    const layout: AllLayoutProperties = {
        visibility: selected ? "visible" : "none",
    };

    let layer:
        | FillLayerSpecification
        | LineLayerSpecification
        | CircleLayerSpecification
        | SymbolLayerSpecification;

    switch (mapType) {
        case "fill": {
            layer = {
                id,
                source: sourceId,
                type: "fill",
                layout: layout,
            } as FillLayerSpecification;
            break;
        }
        case "line": {
            layer = {
                id,
                source: sourceId,
                type: "line",
                layout: layout,
            } as LineLayerSpecification;
            break;
        }
        case "circle": {
            layer = {
                id,
                source: sourceId,
                type: "circle",
                layout: layout,
            } as CircleLayerSpecification;
            break;
        }
        case "symbol": {
            layer = {
                id,
                source: sourceId,
                type: "symbol",
                layout: {
                    ...layout,
                },
            } as SymbolLayerSpecification;
            break;
        }
    }

    if (!map.getLayer(id)) {
        map.addLayer(layer);
    }

    const overlay = new Overlay(
        { id, label, url, selected },
        layerType,
        map,
        activeLegend,
        legends
    );
    overlayManager.addOverlay(id, overlay);
    if (selected) {
        overlay.load();
    }
};

const initMap = (mapContainer: HTMLElement) => {
    const mapConfig = mapContainer.dataset as MapWidgetDataset;

    mapContainer.classList.add("django-map-libre-control-container");

    const loadingOverlay = document.createElement("div");
    loadingOverlay.className = "map-loading-overlay";

    const spinner = document.createElement("div");
    spinner.className = "map-loading-spinner";
    loadingOverlay.appendChild(spinner);

    const loadingText = mapConfig.loadingText;
    if (loadingText) {
        const text = document.createElement("div");
        text.className = "map-loading-text";
        text.innerHTML = `${loadingText}<span class="map-loading-dots"></span>`;
        loadingOverlay.appendChild(text);
    }

    mapContainer.appendChild(loadingOverlay);

    const centerConfig = JSON.parse(mapConfig.center);
    const center = centerConfig ? centerConfig : [0, 0];

    // ---- Tile layers ----
    const tileLayers = parseTileLayers(mapConfig.tileLayer);
    const style = buildStyleFromTileLayers(tileLayers);

    const map = new MapLibre({
        container: mapContainer,
        zoom: 13,
        center: center,
        transformRequest: (url, _resourceType) => ({
            url: url,
            referrerPolicy: "strict-origin-when-cross-origin",
        }),
    });
    map.setStyle(style);

    // ---- Controls ----
    map.addControl(
        new NavigationControl({
            visualizePitch: true,
            visualizeRoll: true,
            showZoom: true,
            showCompass: true,
        }),
        mapConfig.navigationPosition
    );
    if (mapConfig.showScale) {
        map.addControl(
            new ScaleControl({
                maxWidth: 80,
                unit: mapConfig.metricUnit,
            }),
            mapConfig.scalePosition
        );
    }
    if (mapConfig.allowFullscreen) {
        map.addControl(new FullscreenControl());
    }

    // ---- Layer Selector ----
    const overlayManager = new OverlayManager(map);
    const layerSelector = new LayerSelector(overlayManager);
    map.addControl(layerSelector, mapConfig.layerSelectorPosition);

    registerTileLayers(layerSelector, tileLayers);

    // ---- Overlay layers ----
    const overlayLayers = parseOverlayLayers(mapConfig.overlayLayer);

    if (overlayLayers.length > 0) {
        // Wait for map to be ready before adding overlays
        map.on("load", () => {
            loadingOverlay?.remove();
            overlayLayers.forEach((overlay) => {
                addOverlayLayer(map, overlayManager, overlay);
            });
        });
    }
};

// -----------------------------------------------------------------------------
// Auto-initialization
// -----------------------------------------------------------------------------

for (const mapContainer of document.querySelectorAll<HTMLElement>(
    ".map-widget"
)) {
    const dataset = mapContainer.dataset as MapWidgetDataset;
    if (dataset.autoInit === "True") {
        initMap(mapContainer);
    } else {
        mapContainer.addEventListener("initMap", () => initMap(mapContainer));
    }
}

document.addEventListener("initAllMaps", () => {
    for (const mapContainer of document.querySelectorAll<HTMLElement>(
        ".map-widget"
    )) {
        initMap(mapContainer);
    }
});
