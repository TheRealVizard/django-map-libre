import type { MapLibre } from "@/helpers/map-wrapper";
import { Control } from "../controls/base-controls";

export class DownloadControl extends Control {
    onAdd(map: MapLibre): HTMLElement {
        this.map = map;

        this.container = document.createElement("div");
        this.container.classList.add(
            "maplibregl-ctrl",
            "maplibregl-ctrl-group",
            "django-map-libre-control"
        );

        const btnIcon = document.createElement("button");
        btnIcon.type = "button";
        btnIcon.title = "Download map as image"; // TODO LANGUAGE
        btnIcon.classList.add("map-download-button", "map-control-btn");
        this.btnIcon = btnIcon;

        btnIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            this.downloadMap();
        });

        this.container.appendChild(btnIcon);

        return this.container;
    }

    private downloadMap(): void {
        if (!this.map) return;
        this.map.once("render", () => {
            const canvas = this.map!.getCanvas();
            const dataUrl = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.download = `map-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
        });
        this.map.triggerRepaint();
    }
}
