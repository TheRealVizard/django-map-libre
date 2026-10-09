import type { TrackedLayer } from "@/types/map-types";
import type { LayerSpecification, Map as MapLibre } from "maplibre-gl";
import { OverlayControl } from "./base-controls";

export class LayerSelector extends OverlayControl {
    timeout: ReturnType<typeof setTimeout> | undefined = undefined;
    isPinned = false;
    titleLayers = new Map<string, TrackedLayer>();

    onAdd(map: MapLibre): HTMLElement {
        this.map = map;

        this.container = document.createElement("div");
        this.container.classList.add(
            "maplibregl-ctrl",
            "maplibregl-ctrl-group",
            "django-map-libre-control",
            "map-overlay-container"
        );

        const mainPanel = document.createElement("div");
        mainPanel.classList.add("map-panel");

        const btnIcon = document.createElement("button");
        btnIcon.classList.add(
            "map-layer-selector",
            "map-panel-button",
            "map-control-btn"
        );
        this.btnIcon = btnIcon;

        mainPanel.append(btnIcon);

        btnIcon.addEventListener("click", () => {
            this.panelVisible = !this.panelVisible;
            if (this.panelVisible) {
                mainPanel.classList.add("expanded");
            } else {
                mainPanel.classList.remove("expanded");
            }
        });

        const contentPanel = document.createElement("div");
        contentPanel.classList.add("map-expanded-container");

        const header = document.createElement("div");
        header.classList.add("map-panel-header");

        header.addEventListener("click", () => {
            this.isPinned = !this.isPinned;
            this.panelVisible = !this.panelVisible;
            if (this.panelVisible) {
                mainPanel.classList.add("expanded");
            } else {
                mainPanel.classList.remove("expanded");
            }
        });

        const hideBtn = document.createElement("button");
        hideBtn.classList.add("map-hide-panel-btn");

        const textHeader = document.createElement("span");
        textHeader.textContent = "Layers"; // TODO: LANGUAGE
        header.appendChild(textHeader);
        header.append(hideBtn);

        contentPanel.appendChild(header);

        mainPanel.appendChild(contentPanel);

        this.container.appendChild(mainPanel);

        const legendWrapper = document.createElement("div");
        legendWrapper.classList.add("map-panel-wrapper");
        contentPanel.appendChild(legendWrapper);
        this.panel = legendWrapper;

        map.on("styledata", () => {
            this.populateLayerList();
        });

        return this.container;
    }
    _addLayer(layerId: string, label: string, visible: boolean) {
        if (this.titleLayers.has(layerId)) return;
        this.titleLayers.set(layerId, {
            id: layerId,
            label: label || layerId,
            visible: visible,
        });
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
    }

    clearLayers() {
        this.titleLayers.clear();
    }

    populateLayerList() {
        const panel = this.panel;

        if (!panel) return;

        while (panel.firstChild) panel.removeChild(panel.firstChild);

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
                const item = this.createLayerItem(layer, true);
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
                const item = this.createLayerItem(layer, false);
                panel.appendChild(item);
            });
        }
    }

    createLayerItem(
        layer: LayerSpecification,
        isTile: boolean
    ): HTMLDivElement {
        const item = document.createElement("div");
        const layerInfo = isTile
            ? this.titleLayers.get(layer.id)
            : this.overlayManager.getOverlay(layer.id).layerConfig;
        const label = layerInfo?.label || layer.id;

        item.classList.add("layer-item");

        const input = document.createElement("input");
        input.type = isTile ? "radio" : "checkbox";
        input.name = isTile ? "tile-layer" : "";
        input.setAttribute("data-layer-id", layer.id);
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
                for (const layerID of this.titleLayers.keys()) {
                    if (layerID == layer.id) continue;
                    const otherInput = this.panel?.querySelector(
                        `input[data-layer-id="${layerID}"]`
                    ) as HTMLInputElement;
                    if (otherInput) otherInput.checked = false;
                    this.map?.setLayoutProperty(layerID, "visibility", "none");
                }
            }
        });

        input.dataset.layerId = layer.id;

        return item;
    }
    onRemove(): void {
        super.onRemove();
        clearTimeout(this.timeout);
    }
}
