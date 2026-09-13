import type {
    ControlPosition,
    IControl,
    LayerSpecification,
    Map as MapLibre,
} from "maplibre-gl";
import type { OverlayManager } from "./map-helpers";
import type { TrackedLayer } from "./map-types";

export class LayerSelector implements IControl {
    map: MapLibre | null = null;
    container: HTMLDivElement | null = null;
    panelVisible = false;
    timeout: ReturnType<typeof setTimeout> | undefined = undefined;
    isPinned = false;
    panel: HTMLDivElement | null = null;
    btnIcon: HTMLButtonElement | null = null;
    titleLayers = new Map<string, TrackedLayer>();
    overlayManager: OverlayManager;

    constructor(overlayManager: OverlayManager) {
        this.overlayManager = overlayManager;
    }

    onAdd(map: MapLibre): HTMLElement {
        this.map = map;

        this.container = document.createElement("div");
        this.container.classList.add(
            "maplibregl-ctrl",
            "maplibregl-ctrl-group",
            "django-map-libre-control"
        );

        const btnIcon = document.createElement("button");
        btnIcon.classList.add("maplibregl-ctrl-icon", "map-layer-selector");
        this.btnIcon = btnIcon;

        const panel = document.createElement("div");
        panel.classList.add("maplibregl-ctrl-layers-panel");
        this.panel = panel;

        this.container.addEventListener("mouseenter", () => {
            clearTimeout(this.timeout);
            if (!this.isPinned) this._openPanel();
        });

        this.container.addEventListener("mouseleave", (e) => {
            if (this.isPinned) return;
            const relatedTarget = e.relatedTarget as Node;
            if (this.container?.contains(relatedTarget)) return;
            this.timeout = setTimeout(() => this._closePanel(), 150);
        });

        btnIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            this.isPinned = !this.isPinned;
            if (this.isPinned) {
                this._openPanel();
                btnIcon.classList.add("pinned");
            } else {
                this._closePanel();
                btnIcon.classList.remove("pinned");
            }
        });

        document.addEventListener("click", (e) => {
            if (this.isPinned) return;
            if (this.container && !this.container.contains(e.target as Node)) {
                this._closePanel();
            }
        });

        map.on("styledata", () => {
            if (this.panelVisible) {
                requestAnimationFrame(() => {
                    this._adjustVerticalPosition();
                    this._adjustHorizontalPosition();
                });
            }
        });

        this.container.appendChild(btnIcon);
        this.container.appendChild(panel);

        return this.container;
    }

    _addLayer(layerId: string, label: string, visible: boolean) {
        if (this.titleLayers.has(layerId)) return;
        this.titleLayers.set(layerId, {
            id: layerId,
            label: label || layerId,
            visible: visible,
        });
        if (this.panelVisible) {
            this._populateLayerList();
            requestAnimationFrame(() => {
                this._adjustVerticalPosition();
                this._adjustHorizontalPosition();
            });
        }
    }

    addTileLayer(layerId: string, label: string, visible: boolean) {
        this._addLayer(layerId, label, visible);
    }

    removeLayer(layerId: string) {
        if (!this.titleLayers.has(layerId)) return;
        this.titleLayers.delete(layerId);
        let hasVisibleLayer = false;
        for (const layer of this.titleLayers.values()) {
            if (layer.visible) {
                hasVisibleLayer = true;
                break;
            }
        }

        if (!hasVisibleLayer) {
            const firstLayer = this.titleLayers.values().next().value as
                TrackedLayer | undefined;

            if (firstLayer) {
                firstLayer.visible = true;
                this.map?.setLayoutProperty(
                    firstLayer.id,
                    "visibility",
                    "visible"
                );
            }
        }

        if (this.panelVisible) {
            this._populateLayerList();
            requestAnimationFrame(() => {
                this._adjustVerticalPosition();
                this._adjustHorizontalPosition();
            });
        }
    }

    clearLayers() {
        this.titleLayers.clear();
        if (this.panelVisible) {
            this._populateLayerList();
            requestAnimationFrame(() => {
                this._adjustVerticalPosition();
                this._adjustHorizontalPosition();
            });
        }
    }

    _openPanel() {
        this.panelVisible = true;
        this.panel?.classList.add("panel-open");
        this._populateLayerList();
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

    _populateLayerList() {
        const panel = this.panel;

        if (!panel) return;
        panel.innerHTML = "";

        if (!this.map) return;

        const mapLayers = this.map.getStyle().layers || [];
        const trackedIds = new Set([
            ...this.titleLayers.keys(),
            ...this.overlayManager.getIDs(),
        ]);
        const targetMapLayers = mapLayers.filter((layer) =>
            trackedIds.has(layer.id)
        );
        if (targetMapLayers.length === 0) {
            const emptyMsg = document.createElement("div");
            emptyMsg.textContent = "No layers added";
            emptyMsg.classList.add("empty-layers");
            panel.appendChild(emptyMsg);
            return;
        }

        const tileLayers = targetMapLayers.filter((l) =>
            this.titleLayers.has(l.id)
        );
        const overlayLayers = targetMapLayers.filter((l) =>
            this.overlayManager.hasOverlay(l.id)
        );

        if (targetMapLayers.length > 0) {
            const tileGroupLabel = document.createElement("div");
            tileGroupLabel.textContent = "Base Maps";
            tileGroupLabel.classList.add("layer-group-title");
            panel.appendChild(tileGroupLabel);

            tileLayers.forEach((layer) => {
                const item = this._createLayerItem(layer, true);
                panel.appendChild(item);
            });
        }

        if (overlayLayers.length > 0) {
            if (tileLayers.length > 0) {
                const separator = document.createElement("hr");
                separator.classList.add("layer-group-separator");
                panel.appendChild(separator);
            }
            const overlayGroupLabel = document.createElement("div");
            overlayGroupLabel.textContent = "Overlays";
            overlayGroupLabel.classList.add("layer-group-title");
            panel.appendChild(overlayGroupLabel);

            overlayLayers.forEach((layer) => {
                const item = this._createLayerItem(layer, false);
                panel.appendChild(item);
            });
        }
    }

    _createLayerItem(
        layer: LayerSpecification,
        isTile: boolean
    ): HTMLDivElement {
        const item = document.createElement("div");
        const layerInfo = this.titleLayers.get(layer.id);
        const label = layerInfo?.label || layer.id;

        item.classList.add("layer-item");

        const input = document.createElement("input");
        input.type = isTile ? "radio" : "checkbox";
        input.name = isTile ? "tile-layer" : "";
        input.classList.add("layer-input-control");

        const visibility = this.map?.getLayoutProperty(layer.id, "visibility");
        const isVisible = visibility !== "none";
        input.checked = isVisible;

        const labelSpan = document.createElement("span");
        labelSpan.classList.add("layer-input-span");
        labelSpan.textContent = label;

        item.appendChild(input);
        item.appendChild(labelSpan);

        item.addEventListener("click", (e) => {
            if (e.target === input) return;
            if (isTile) {
                if (!input.checked) {
                    input.checked = !input.checked;
                }
            } else {
                input.checked = !input.checked;
            }
            const changeEvent = new Event("change", { bubbles: true });
            input.dispatchEvent(changeEvent);
        });

        input.addEventListener("change", () => {
            const newVisibility = input.checked ? "visible" : "none";
            if (isTile) {
                this.map?.setLayoutProperty(
                    layer.id,
                    "visibility",
                    newVisibility
                );
            } else {
                this.overlayManager.toggleOverlayVisibility(layer.id);
            }

            if (isTile && input.checked) {
                const allLayers = this.map?.getStyle().layers || [];
                allLayers.forEach((l) => {
                    if (!this.titleLayers.has(l.id) || l.id !== layer.id)
                        return;
                    this.map?.setLayoutProperty(l.id, "visibility", "none");
                    const otherInput = this.panel?.querySelector(
                        `input[data-layer-id="${l.id}"]`
                    ) as HTMLInputElement;
                    if (otherInput) otherInput.checked = false;
                });
            }
        });

        input.dataset.layerId = layer.id;

        return item;
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
        clearTimeout(this.timeout);
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
