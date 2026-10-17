import { Map as BaseMap, GeoJSONSource, type MapOptions } from "maplibre-gl";
import type { GoToEvent } from "./map-events";
import { OverlayManager } from "./overlay-helpers";

const DEFAULT_MAP_ZOOM_LEVEL = 17;

export class MapLibre extends BaseMap {
    highlighted: boolean = false;
    layers: string[] = [];
    sources: string[] = [];
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
    highlight = (_ev: Event) => {};
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

        return this.geometryBbox(feature.geometry);
    }
    getOverlayManager(): OverlayManager {
        return this.overlayManager;
    }
}
