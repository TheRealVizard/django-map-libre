import type {
    ControlPosition,
    IControl,
    LayerSpecification,
    Map as MapLibre,
} from "maplibre-gl";
import type { Overlay, OverlayManager } from "./map-helpers";
import type { TrackedLayer } from "./map-types";
import { splitColorRamp, toTitleCase } from "./map-functions";

class Control implements IControl {
    map: MapLibre | null = null;
    container: HTMLDivElement | null = null;
    panelVisible = false;
    panel: HTMLDivElement | null = null;
    btnIcon: HTMLButtonElement | null = null;
    overlayManager: OverlayManager;

    constructor(overlayManager: OverlayManager) {
        this.overlayManager = overlayManager;
    }
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

export class LayerSelector extends Control {
    timeout: ReturnType<typeof setTimeout> | undefined = undefined;
    isPinned = false;
    titleLayers = new Map<string, TrackedLayer>();

    onAdd(map: MapLibre): HTMLElement {
        this.map = map;

        this.container = document.createElement("div");
        this.container.classList.add(
            "maplibregl-ctrl",
            "maplibregl-ctrl-group",
            "django-map-libre-control"
        );

        const btnIcon = document.createElement("button");
        btnIcon.classList.add("map-layer-selector", "map-control-btn");
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
            this._populateLayerList();
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
    _openPanel(): void {
        super._openPanel();
    }
    _addLayer(layerId: string, label: string, visible: boolean) {
        if (this.titleLayers.has(layerId)) return;
        this.titleLayers.set(layerId, {
            id: layerId,
            label: label || layerId,
            visible: visible,
        });
        if (this.panelVisible) {
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
            requestAnimationFrame(() => {
                this._adjustVerticalPosition();
                this._adjustHorizontalPosition();
            });
        }
    }

    clearLayers() {
        this.titleLayers.clear();
        if (this.panelVisible) {
            requestAnimationFrame(() => {
                this._adjustVerticalPosition();
                this._adjustHorizontalPosition();
            });
        }
    }

    _populateLayerList() {
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
export class LegendControl extends Control {
    loadingOverlay: HTMLDivElement | undefined;
    containers = new Map<string, HTMLElement>();

    constructor(overlayManager: OverlayManager) {
        super(overlayManager);
        overlayManager.addOverlayAddListener((layerID) =>
            this.onOverlayAdd(layerID)
        );
        overlayManager.addLegendLoadListener((layerID, legendID) =>
            this.onLegendLoad(layerID, legendID)
        );
        overlayManager.addLegendHideListener((layerID, legendID) =>
            this.onLegendHide(layerID, legendID)
        );
        overlayManager.addLegendDisplayListener((layerID, legendID) =>
            this.onLegendDisplay(layerID, legendID)
        );
    }
    onLegendLoad(layerID: string, _legendID: string): void {
        if (!this.containers.has(layerID)) return;
        if (this.loadingOverlay) {
            this.loadingOverlay?.remove();
            this.loadingOverlay = undefined;
        }
        this.cleanContainer(layerID);
        this.buildLegendSection(layerID);
    }
    onLegendHide(layerID: string, _legendID: string): void {
        if (!this.containers.has(layerID)) return;
        this.cleanContainer(layerID);
        const container = this.containers.get(layerID);
        container?.classList.remove("with-content");
    }
    onLegendDisplay(layerID: string,  legendID: string): void {
        this.onLegendLoad(layerID, legendID);
    }
    buildLegendSection(layerID: string) {
        const overlay = this.overlayManager.getOverlay(layerID);

        const section = document.createElement("div");
        section.classList.add("legend-section");

        const header = document.createElement("div");
        header.classList.add("legend-section-header");

        const toggle = document.createElement("span");
        toggle.classList.add("legend-chevron");

        const title = document.createElement("span");
        title.classList.add("legend-section-title");
        title.textContent = overlay.layerConfig.label;

        header.appendChild(toggle);
        header.appendChild(title);
        section.appendChild(header);

        header.addEventListener("click", () => {
            section.classList.toggle("collapsed");
            toggle.classList.toggle("legend-chevron-toggle");
        });

        const body = document.createElement("div");
        body.classList.add("legend-section-body");

        section.appendChild(body);

        const container = this.containers.get(layerID);
        container?.classList.add("with-content");
        container?.appendChild(section);

        if (!overlay.activeLegend) return;

        const config = overlay.activeLegend.legendConfig;

        if (config.type === "fixed") {
            body.appendChild(
                this.getLegendRow(
                    overlay,
                    config.label || toTitleCase(config.id),
                    config.color as string,
                    config.image as string
                )
            );
        } else if (config.type === "categorical") {
            if (!overlay.activeLegend?.legendData) return;
            for (const [key, data] of Object.entries(
                overlay.activeLegend?.legendData
            )) {
                body.appendChild(
                    this.getLegendRow(
                        overlay,
                        data.label || toTitleCase(key),
                        data.color as string,
                        data.icon as string
                    )
                );
            }
        } else {
            if (config.minValue && !overlay.activeLegend.minValue) return;

            const min = (config.minValue ||
                overlay.activeLegend.minValue) as number;
            const max = (config.maxValue ||
                overlay.activeLegend.maxValue) as number;

            const steps = config.numSteps as number;
            const colors = splitColorRamp(config.colorRamp as string[], steps);
            const stepSize = (max - min) / steps;
            for (let i = 0; i < steps; i++) {
                const low = min + i * stepSize;
                const high = min + (i + 1) * stepSize;
                body.appendChild(
                    this.getLegendRow(
                        overlay,
                        `${low.toFixed(0)} - ${high.toFixed(0)}`,
                        colors[i] as string,
                        ""
                    )
                );
            }
        }
    }
    getLegendRow(overlay: Overlay, title: string, color: string, icon: string) {
        const row = document.createElement("div");
        row.classList.add("legend-section-row");
        const text = document.createElement("span");
        text.textContent = title;
        if (overlay.layerType === "icon") {
            const preview = document.createElement("img");
            preview.classList.add("legend-preview-img");
            preview.src = icon;
            row.appendChild(preview);
        } else {
            const preview = document.createElement("span");
            preview.classList.add(`legend-preview-${overlay.layerType}`);
            preview.style.background = color;
            row.appendChild(preview);
        }
        row.appendChild(text);
        return row;
    }

    cleanContainer(layerID: string) {
        const container = this.containers.get(layerID);
        while (container?.firstChild != null) {
            container.removeChild(container.firstChild);
        }
    }

    onOverlayAdd(layerID: string) {
        if (this.containers.has(layerID)) return;
        const container = document.createElement("div");
        container.classList.add("legend-list-container");
        this.containers.set(layerID, container);
        if (!this.panel?.contains(container)) {
            this.panel?.appendChild(container);
        }
    }

    onAdd(map: MapLibre): HTMLElement {
        this.map = map;

        this.container = document.createElement("div");
        this.container.classList.add(
            "maplibregl-ctrl",
            "maplibregl-ctrl-group",
            "django-map-libre-control",
            "map-legend-container"
        );

        const mainPanel = document.createElement("div");
        mainPanel.classList.add("map-legend-panel");

        const btnIcon = document.createElement("button");
        btnIcon.classList.add("map-legend-button", "map-control-btn");
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
        contentPanel.classList.add("map-legend-expanded-container");

        const header = document.createElement("div");
        header.classList.add("map-legend-header");
        header.addEventListener("click", () => {
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
        textHeader.textContent = "Legend"; // TODO: LANGUAGE
        header.appendChild(textHeader);
        header.append(hideBtn);

        contentPanel.appendChild(header);

        mainPanel.appendChild(contentPanel);

        const loadingOverlay = document.createElement("div");
        loadingOverlay.className = "map-loading-overlay";

        const spinner = document.createElement("div");
        spinner.className = "map-loading-spinner";
        loadingOverlay.appendChild(spinner);
        this.loadingOverlay = loadingOverlay;
        contentPanel.appendChild(loadingOverlay);

        this.container.appendChild(mainPanel);

        const legendWrapper = document.createElement("div");
        legendWrapper.classList.add("map-legend-wrapper");
        contentPanel.appendChild(legendWrapper);
        this.panel = legendWrapper;

        return this.container;
    }
}
