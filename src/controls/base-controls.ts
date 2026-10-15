import type { ControlPosition, IControl } from "maplibre-gl";
import type { OverlayManager } from "../helpers/overlay-helpers";
import type { MapLibre } from "@/helpers/map-wrapper";

export class Control implements IControl {
    map: MapLibre | null = null;
    container: HTMLDivElement | null = null;
    panelVisible = false;
    panel: HTMLDivElement | null = null;
    btnIcon: HTMLButtonElement | null = null;

    onAdd(_map: MapLibre): HTMLElement {
        return document.createElement("div");
    }
    onRemove() {
        if (this.container?.parentNode) {
            this.container?.parentNode.removeChild(this.container);
        }
        this.map = null;
        this.container = null;
        this.panel = null;
        this.btnIcon = null;
    }

    getDefaultPosition(): ControlPosition {
        return "top-right";
    }
}
export class OverlayControl extends Control {
    overlayManager: OverlayManager;

    constructor(overlayManager: OverlayManager) {
        super();
        this.overlayManager = overlayManager;
    }
}
