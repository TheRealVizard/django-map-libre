import type { ControlPosition, IControl, Map as MapLibre } from "maplibre-gl";
import type { OverlayManager } from "../helpers/overlay-helpers";

export class Control implements IControl {
    map: MapLibre | null = null;
    container: HTMLDivElement | null = null;
    panelVisible = false;
    panel: HTMLDivElement | null = null;
    btnIcon: HTMLButtonElement | null = null;

    onAdd(_map: MapLibre): HTMLElement {
        return document.createElement("div");
    }
    _openPanel() {
        this.panelVisible = true;
        this.panel?.classList.add("panel-open");
        requestAnimationFrame(() => {
            this._adjustVerticalPosition();
            this._adjustHorizontalPosition();
        });
    }

    _closePanel() {
        this.panelVisible = false;
        this.panel?.classList.remove("panel-open");
        this.btnIcon?.classList.remove("pinned");
    }
    _adjustVerticalPosition() {
        const panel = this.panel;
        if (!panel) return;

        const btnIcon = this.btnIcon;
        const mapContainer = this.map?.getContainer();
        const btnRect = btnIcon?.getBoundingClientRect();
        const containerRect = mapContainer?.getBoundingClientRect();

        const naturalHeight = panel?.scrollHeight || 200;
        const maxAllowedHeight = Math.min(
            300,
            (containerRect?.height || 0) * 0.5
        );
        const panelHeight = Math.min(naturalHeight, maxAllowedHeight);

        const margin = 10;
        const spaceBelow =
            (containerRect?.bottom || 0) - (btnRect?.bottom || 0) - margin;
        const spaceAbove =
            (btnRect?.top || 0) - (containerRect?.top || 0) - margin;

        panel.style.top = "";
        panel.style.bottom = "";
        panel.style.maxHeight = maxAllowedHeight + "px";
        panel.style.overflowY = "auto";

        if (spaceBelow >= panelHeight) {
            panel.style.top = "100%";
        } else if (spaceAbove >= panelHeight) {
            panel.style.bottom = "100%";
        } else {
            if (spaceBelow > spaceAbove) {
                panel.style.top = "100%";
                const limitedHeight = Math.min(panelHeight, spaceBelow);
                panel.style.maxHeight = Math.max(limitedHeight, 50) + "px";
            } else {
                panel.style.bottom = "100%";
                const limitedHeight = Math.min(panelHeight, spaceAbove);
                panel.style.maxHeight = Math.max(limitedHeight, 50) + "px";
            }
        }
    }

    _adjustHorizontalPosition() {
        const panel = this.panel;

        if (!panel) return;

        const btnIcon = this.btnIcon;
        const mapContainer = this.map?.getContainer();
        const btnRect = btnIcon?.getBoundingClientRect();
        const containerRect = mapContainer?.getBoundingClientRect();

        const naturalWidth = panel?.scrollWidth || 150;
        const maxAllowedWidth = Math.min(
            300,
            (containerRect?.width || 0) * 0.7
        );
        const panelWidth = Math.min(naturalWidth, maxAllowedWidth);

        const margin = 10;
        const spaceRight =
            (containerRect?.right || 0) - (btnRect?.right || 0) - margin;
        const spaceLeft =
            (btnRect?.left || 0) - (containerRect?.left || 0) - margin;

        panel.style.left = "";
        panel.style.right = "";
        panel.style.maxWidth = maxAllowedWidth + "px";
        panel.style.overflowX = "auto";

        if (spaceRight >= panelWidth) {
            panel.style.left = "0";
        } else if (spaceLeft >= panelWidth) {
            panel.style.right = "0";
            panel.style.left = "auto";
        } else {
            if (spaceRight > spaceLeft) {
                panel.style.left = "0";
                const limitedWidth = Math.min(panelWidth, spaceRight);
                panel.style.maxWidth = Math.max(limitedWidth, 50) + "px";
            } else {
                panel.style.right = "0";
                panel.style.left = "auto";
                const limitedWidth = Math.min(panelWidth, spaceLeft);
                panel.style.maxWidth = Math.max(limitedWidth, 50) + "px";
            }
        }
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
