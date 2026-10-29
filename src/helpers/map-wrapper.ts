import type { Feature, GeoJsonProperties, Geometry } from "geojson";
import {
    Map as BaseMap,
    GeoJSONSource,
    type CircleLayerSpecification,
    type LineLayerSpecification,
    type MapOptions,
} from "maplibre-gl";
import type { GoToEvent, HighlightEvent } from "./map-events";
import { OverlayManager } from "./overlay-helpers";
import { getMapPaintForLineOverlay } from "./functions";

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
            ).then((bbox) => {
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
        } else if ("id" in event.detail) {
            if (this.overlayManager.hasOverlay(event.detail.layerID)) {
                const overlay = this.overlayManager.getOverlay(
                    event.detail.layerID
                );
                if (overlay.layerType !== "icon") {
                    const feature = await this.getFeature(
                        event.detail.layerID,
                        event.detail.id
                    );
                    if (feature) {
                        const source = this.addHighlight(
                            event.detail.layerID,
                            event.detail.highlightColor ||
                                overlay.highlightColor ||
                                "#ff4500"
                        );
                        (this.getSource(source) as GeoJSONSource).updateData({
                            add: [feature],
                        });
                        this.highlighted = true;
                    }
                }
            }
        } else if ("ids" in event.detail) {
        }
    };
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
    };
    addHighlight(layerId: string, highlightColor: string): string {
        const layer = this.getLayer(layerId);
        const id = `highlight-layer-${layerId}`;
        const source = `${id}-source`;
        if (layer?.type === "circle") {
            const baseRadius = this.getPaintProperty(layerId, "circle-radius");
            const extra = 3; // how much bigger than the base circle

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
                } as CircleLayerSpecification
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
                    "line-width": 6,
                },
            } as LineLayerSpecification);
        }
        this.highlightLayers.push(id);
        this.highlightSources.push(source);
        return source;
    }
}
