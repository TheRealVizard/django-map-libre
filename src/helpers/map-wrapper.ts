import type { Feature, GeoJsonProperties, Geometry } from "geojson";
import {
    Map as BaseMap,
    GeoJSONSource,
    type CircleLayerSpecification,
    type LineLayerSpecification,
    type MapOptions,
} from "maplibre-gl";
import { getMapPaintForLineOverlay } from "./functions";
import type { GoToEvent, HighlightEvent } from "./map-events";
import { OverlayManager } from "./overlay-helpers";

const DEFAULT_MAP_ZOOM_LEVEL = 17;

export class MapLibre extends BaseMap {
    highlighted: boolean = false;
    highlightLayers: string[] = [];
    highlightSources: string[] = [];
    container: HTMLElement;
    overlayManager: OverlayManager;

    constructor(options: MapOptions) {
        super(options);
        this.container = options.container as HTMLElement;
        this.container.addEventListener("goTo", this.goTo);
        this.container.addEventListener("highlight", this.highlight);
        this.overlayManager = new OverlayManager(this);
    }
    goTo = async (ev: Event) => {
        const event = ev as GoToEvent;
        if (event.detail.kind === "bbox") {
            this.fitBounds([
                [event.detail.bbox[0], event.detail.bbox[1]],
                [event.detail.bbox[2], event.detail.bbox[3]],
            ]);
        } else if (event.detail.kind === "coord") {
            this.flyTo({
                center: event.detail.coord,
                zoom: event.detail.zoom ?? DEFAULT_MAP_ZOOM_LEVEL,
                essential: true,
            });
        } else {
            await this.getFeatureBbox(
                event.detail.feature.layerID,
                event.detail.feature.id
            ).then(async (bbox) => {
                if (!bbox) return;

                let [minLng, minLat, maxLng, maxLat] = bbox;
                if (minLng === maxLng && minLat === maxLat) {
                    const pad = 0.001;
                    minLng -= pad;
                    minLat -= pad;
                    maxLng += pad;
                    maxLat += pad;
                }

                this.fitBounds(
                    [
                        [minLng, minLat],
                        [maxLng, maxLat],
                    ],
                    { padding: 40 }
                );

                if (event.detail.highlight) {
                    if (this.highlighted) {
                        this.highlighted = false;
                        this.removeHighlight();
                    }
                    await this.applyHighlight(
                        event.detail.feature.layerID,
                        [event.detail.feature.id]
                    );
                }
            });
        }
    };
    highlight = async (ev: Event) => {
        if (this.highlighted) {
            this.highlighted = false;
            this.removeHighlight();
        }
        const event = ev as HighlightEvent;
        if (Array.isArray(event.detail)) {
            let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity;
            let anyGoTo = false;

            for (const target of event.detail) {
                await this.applyHighlight(target.layerID, target.ids, target.highlightColor);
                if (!target.goTo) continue;
                anyGoTo = true;
                for (const id of target.ids) {
                    const bbox = await this.getFeatureBbox(target.layerID, id);
                    if (!bbox) continue;
                    if (bbox[0] < minLng) minLng = bbox[0];
                    if (bbox[1] < minLat) minLat = bbox[1];
                    if (bbox[2] > maxLng) maxLng = bbox[2];
                    if (bbox[3] > maxLat) maxLat = bbox[3];
                }
            }

            if (anyGoTo && Number.isFinite(minLng)) {
                if (minLng === maxLng && minLat === maxLat) {
                    const pad = 0.001;
                    minLng -= pad; minLat -= pad; maxLng += pad; maxLat += pad;
                }
                this.fitBounds([[minLng, minLat], [maxLng, maxLat]], { padding: 40 });
            }
        } else if ("id" in event.detail) {
            await this.applyHighlight(
                event.detail.layerID,
                [event.detail.id],
                event.detail.highlightColor
            );
            if (event.detail.goTo) await this.fitToIds(event.detail.layerID, [event.detail.id]);
        } else if ("ids" in event.detail) {
            await this.applyHighlight(
                event.detail.layerID,
                event.detail.ids,
                event.detail.highlightColor
            );
            if (event.detail.goTo) await this.fitToIds(event.detail.layerID, event.detail.ids);
        }
    }
    private async applyHighlight(
        layerID: string,
        ids: (string | number)[],
        highlightColor?: string
    ): Promise<void> {
        if (!this.overlayManager.hasOverlay(layerID)) return;
        const overlay = this.overlayManager.getOverlay(layerID);
        if (overlay.layerType === "icon") return;

        const features: Feature[] = [];
        for (const id of ids) {
            const f = await this.getFeature(layerID, id);
            if (f) features.push(f);
        }
        if (features.length === 0) return;

        const source = this.addHighlight(
            layerID,
            highlightColor || overlay.highlightColor || "#ff4500"
        );
        (this.getSource(source) as GeoJSONSource).updateData({ add: features });
        this.highlighted = true;
    }
    geometryBbox(
        geom: GeoJSON.Geometry
    ): [number, number, number, number] | null {
        let minLng = Infinity,
            minLat = Infinity,
            maxLng = -Infinity,
            maxLat = -Infinity;

        const visit = (coords: unknown): void => {
            if (typeof (coords as unknown[])[0] === "number") {
                const [lng, lat] = coords as [number, number];
                if (lng < minLng) minLng = lng;
                if (lat < minLat) minLat = lat;
                if (lng > maxLng) maxLng = lng;
                if (lat > maxLat) maxLat = lat;
            } else {
                for (const c of coords as unknown[]) visit(c);
            }
        };

        if (!("coordinates" in geom)) return null;
        visit((geom as { coordinates: unknown }).coordinates);
        if (!Number.isFinite(minLng)) return null;
        return [minLng, minLat, maxLng, maxLat];
    }
    async getFeatureBbox(
        layerID: string,
        featureID: string | number
    ): Promise<[number, number, number, number] | null> {
        const feature = await this.getFeature(layerID, featureID);
        if (!feature) return null;
        return this.geometryBbox(feature.geometry);
    }
    async getFeature(
        layerID: string,
        featureID: string | number
    ): Promise<Feature<Geometry, GeoJsonProperties> | null> {
        const layer = this.getLayer(layerID);
        if (!layer) return null;

        const source = this.getSource(layer.source as string) as
            GeoJSONSource | undefined;
        if (!source) return null;

        const data = await source.getData();
        const feature = (data as GeoJSON.FeatureCollection).features.find(
            (f) => f.id === featureID
        );
        if (!feature) return null;
        return feature;
    }
    getOverlayManager(): OverlayManager {
        return this.overlayManager;
    }
    removeHighlight = () => {
        this.highlightLayers.forEach((id) => {
            this.removeLayer(id);
        });
        this.highlightSources.forEach((id) => {
            this.removeSource(id);
        });
        this.highlightLayers = [];
        this.highlightSources = [];
        this.highlighted = false;
    };
    private async fitToIds(
        layerID: string,
        ids: (string | number)[]
    ): Promise<void> {
        let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity;
        for (const id of ids) {
            const bbox = await this.getFeatureBbox(layerID, id);
            if (!bbox) continue;
            if (bbox[0] < minLng) minLng = bbox[0];
            if (bbox[1] < minLat) minLat = bbox[1];
            if (bbox[2] > maxLng) maxLng = bbox[2];
            if (bbox[3] > maxLat) maxLat = bbox[3];
        }
        if (!Number.isFinite(minLng)) return;
        if (minLng === maxLng && minLat === maxLat) {
            const pad = 0.001;
            minLng -= pad; minLat -= pad; maxLng += pad; maxLat += pad;
        }
        this.fitBounds([[minLng, minLat], [maxLng, maxLat]], { padding: 40 });
    }
    removeHighlightForLayer = (layerId: string): void => {
        const id = `highlight-layer-${layerId}`;
        const source = `${id}-source`;
        if (this.getLayer(id)) this.removeLayer(id);
        if (this.getSource(source)) this.removeSource(source);
        this.highlightLayers = this.highlightLayers.filter((l) => l !== id);
        this.highlightSources = this.highlightSources.filter((s) => s !== source);
        if (this.highlightLayers.length === 0) this.highlighted = false;
    };
    addHighlight(layerId: string, highlightColor: string): string {
        const layer = this.getLayer(layerId);
        const id = `highlight-layer-${layerId}`;
        const source = `${id}-source`;
        if (layer?.type === "circle") {
            const baseRadius = this.getPaintProperty(layerId, "circle-radius");
            const extra = 6; // how much bigger than the base circle

            const radius = typeof baseRadius === "number"
                ? baseRadius + extra
                : ["+", baseRadius ?? 6, extra];

            this.addSource(source, {
                type: "geojson",
                data: { type: "FeatureCollection", features: [] },
            });
            this.addLayer(
                {
                    type: "circle",
                    id,
                    source,
                    paint: {
                        "circle-color": highlightColor,
                        "circle-radius": radius,
                    },
                } as CircleLayerSpecification, layerId
            );
        } else {
            this.addSource(source, {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: [],
                },
            });
            this.addLayer({
                type: "line",
                id: id,
                source: source,
                layout: {
                    visibility: "visible",
                },
                paint: {
                    ...getMapPaintForLineOverlay(highlightColor),
                    "line-width": 9,
                },
            } as LineLayerSpecification, layerId);
        }
        this.highlightLayers.push(id);
        this.highlightSources.push(source);
        return source;
    }
}
