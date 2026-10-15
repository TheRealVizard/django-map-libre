import { Map as BaseMap, type MapOptions } from "maplibre-gl";

export class MapLibre extends BaseMap {
    highlighted: boolean = false;
    layers: string[] = [];
    sources: string[] = [];
    container: HTMLElement;

    constructor(options: MapOptions) {
        super(options);
        this.container = options.container as HTMLElement;
    }
}
