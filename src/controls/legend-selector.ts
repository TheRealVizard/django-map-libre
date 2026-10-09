import { splitColorRamp, toTitleCase } from "@/helpers/functions";
import type { Overlay, OverlayManager } from "@/helpers/overlay-helpers";
import type {
    CategoricalLegend,
    FixedLegend,
    InterpolatedLegend,
    RangeLegend,
} from "@/legends";
import type {
    ColorStop,
    Display,
    LegendType,
    RangeBound,
} from "@/types/map-types";
import type { Map as MapLibre } from "maplibre-gl";
import { OverlayControl } from "./base-controls";

export class LegendControl extends OverlayControl {
    loadingOverlay: HTMLDivElement | undefined;
    initialDisplay: Display;
    containers = new Map<string, HTMLElement>();

    constructor(overlayManager: OverlayManager, initialDisplay: Display) {
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
        this.initialDisplay = initialDisplay;
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
    onLegendDisplay(layerID: string, legendID: string): void {
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

        if (overlay.legends.length > 1) {
            const legendTypeContainer = document.createElement("div");
            legendTypeContainer.classList.add("legend-type-container");
            body.appendChild(legendTypeContainer);

            const label = document.createElement("span");
            label.textContent = "Legend by:"; // TODO: LANGUAGE

            legendTypeContainer.appendChild(label);

            const checkBox = document.createElement("select");
            legendTypeContainer.appendChild(checkBox);

            for (const legend of overlay.legends) {
                const option = document.createElement("option");
                option.textContent = legend.legendConfig.label;
                if (
                    legend.legendConfig.id ===
                    overlay.activeLegend?.legendConfig.id
                ) {
                    option.selected = true;
                }
                option.value = legend.legendConfig.id;
                checkBox.appendChild(option);
                checkBox.addEventListener("change", () => {
                    this.overlayManager.setOverlayLegend(
                        overlay.layerConfig.id,
                        checkBox.value
                    );
                });
            }
        }

        section.appendChild(body);

        const container = this.containers.get(layerID);
        container?.classList.add("with-content");
        container?.appendChild(section);

        if (!overlay.activeLegend) return;

        if (overlay.activeLegend.legendConfig.type === "fixed") {
            body.appendChild(
                this.getLegendRow(
                    overlay,
                    overlay.activeLegend.legendConfig.type,
                    overlay.activeLegend.legendConfig.label ||
                        toTitleCase(overlay.activeLegend.legendConfig.id),
                    overlay.activeLegend.legendConfig.color as string,
                    overlay.activeLegend.legendConfig.image as string
                )
            );
        } else if (overlay.activeLegend.legendConfig.type === "categorical") {
            const config = overlay.activeLegend as CategoricalLegend;
            if (!config?.legendData) return;
            for (const [key, data] of Object.entries(config?.legendData)) {
                body.appendChild(
                    this.getLegendRow(
                        overlay,
                        overlay.activeLegend.legendConfig.type,
                        data.label || toTitleCase(key),
                        data.color as string,
                        data.icon as string,
                        key
                    )
                );
            }
        } else if (overlay.activeLegend.legendConfig.type === "range") {
            const config = overlay.activeLegend as RangeLegend;
            if (config.legendConfig.bounds && !config.bounds) return;

            const bounds = (config.legendConfig.bounds ||
                config.bounds) as RangeBound;

            const min = bounds.min;
            const max = bounds.max;

            const steps = overlay.activeLegend.legendConfig.numSteps as number;
            const colors = splitColorRamp(
                overlay.activeLegend.legendConfig.colorRamp as string[],
                steps
            );
            const stepSize = (max - min) / steps;
            for (let i = 0; i < steps; i++) {
                const low = min + i * stepSize;
                const high = min + (i + 1) * stepSize;
                body.appendChild(
                    this.getLegendRow(
                        overlay,
                        overlay.activeLegend.legendConfig.type,
                        `${low.toFixed(0)} - ${high.toFixed(0)}`,
                        colors[i] as string,
                        "",
                        i
                    )
                );
            }
        } else {
            const config = overlay.activeLegend as InterpolatedLegend;

            if (
                !config.legendConfig.colorStops ||
                config.legendConfig.colorStops.length < 2
            )
                return;

            let stops: ColorStop[];
            if (typeof config.legendConfig.colorStops?.[0] === "object") {
                stops = config.legendConfig.colorStops as ColorStop[];
            } else {
                if (!config.bounds) return;

                const colors = config.legendConfig.colorStops as string[];
                const min = config.bounds.min;
                const max = config.bounds.max;
                const count = colors.length;
                const step = count > 1 ? (max - min) / (count - 1) : 0;

                stops = colors.map((color, i) => {
                    return { value: min + i * step, color: color };
                });
            }

            const min = (stops[0] as ColorStop).value as number;
            const max = (stops[stops.length - 1] as ColorStop).value as number;
            const totalRange = max - min;

            const positioned = stops.map((s, _i) => ({
                value: ((s.value - min) * 100) / totalRange,
                color: s.color,
                label:
                    s.value > Math.trunc(s.value)
                        ? s.value.toFixed(2)
                        : s.value.toFixed(0),
            }));

            const gradient = document.createElement("div");
            gradient.classList.add("legend-gradient-bar");
            gradient.style.background = `linear-gradient(to right, ${positioned
                .map((s) => `${s.color} ${s.value}%`)
                .join(", ")})`;
            body.appendChild(gradient);

            const labels = document.createElement("div");
            labels.classList.add("legend-gradient-labels");
            for (const s of positioned) {
                const stepValueLabel = document.createElement("span");
                stepValueLabel.classList.add("legend-gradient-label");
                stepValueLabel.style.left = `${s.value}%`;
                stepValueLabel.textContent = s.label.toString();
                labels.appendChild(stepValueLabel);
            }
            body.appendChild(labels);
        }
    }
    getLegendRow(
        overlay: Overlay,
        legendType: LegendType,
        title: string,
        color: string,
        icon: string,
        key?: string | number
    ) {
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
            const tagType =
                overlay.layerType === "symbol" || legendType === "interpolated"
                    ? "span"
                    : "input";
            const preview = document.createElement(tagType);
            preview.classList.add(`legend-preview-${overlay.layerType}`);
            if (tagType === "input") {
                preview.setAttribute("type", "color");
                const input = preview as HTMLInputElement;
                input.value = color;
                input.addEventListener("input", (e) => {
                    const newColor = (e.target as HTMLInputElement).value;
                    if (legendType === "fixed") {
                        (overlay.activeLegend as FixedLegend).setColor(
                            newColor
                        );
                    } else if (legendType === "categorical") {
                        (overlay.activeLegend as CategoricalLegend).setColor(
                            key as string,
                            newColor
                        );
                    } else if (legendType === "range") {
                        (overlay.activeLegend as RangeLegend).setColor(
                            key as number,
                            newColor
                        );
                    }
                });
            } else {
                preview.style.background = color;
            }
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

        if (this.initialDisplay == "expanded") {
            mainPanel.classList.add("expanded");
        }

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
