import {
    type AllLayoutProperties,
    type AllPaintProperties,
    type Map as MapLibre
} from "maplibre-gl";
import type { LegendConfig } from "./map-types";

const loadSvgImage = async (url: string): Promise<HTMLImageElement> => {
    const response = await fetch(url);
    if (!response.ok)
        throw new Error(`HTTP ${response.status} al cargar ${url}`);

    const svgText = await response.text();
    const blob = new Blob([svgText], { type: "image/svg+xml" });
    const blobUrl = URL.createObjectURL(blob);

    try {
        return await new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`SVG inválido: ${url}`));
            img.src = blobUrl;
        });
    } finally {
        URL.revokeObjectURL(blobUrl);
    }
};

export const getRandomColor = (): string => {
    const h = Math.round(360 * Math.random());
    const s = Math.round(90 * Math.random()) + 10;
    const l = Math.round(80 * Math.random()) + 20;
    return `hsl(${h},${s}%,${l}%)`;
};

export const getPaintForFillOverlay = (activeLegend: LegendConfig): AllPaintProperties => {
    return {
        "fill-color": activeLegend.color || "red",
        "fill-opacity": 0.7,
        "fill-outline-color": "black",
        "fill-antialias": true,
    }
}

export const getPaintForLineOverlay = (activeLegend: LegendConfig): AllPaintProperties => {
    return {
        "line-color": activeLegend.color || "red",
        "line-width": 3,
        "line-opacity": 0.8,
    }
}

export const getPaintForCircleOverlay = (activeLegend: LegendConfig): AllPaintProperties => {
    return {
        "circle-color": activeLegend.color || "red",
        "circle-radius": activeLegend.circleRadius || 6,
        "circle-opacity": activeLegend.circleOpacity || 0.5,
        "circle-stroke-color":
            activeLegend.circleStrokeColor || "black",
        "circle-stroke-width": activeLegend.circleStrokeWidth || 2,
    }
}


// TODO: Include in future for symbol
// Layout
// 'text-field': activeLegend.text_field || '',
// 'text-size': activeLegend.text_size || 12,
// paint: {
//     "text-color": activeLegend.color || "#333333",
//     "text-halo-color": "#ffffff",
//     "text-halo-width": 2,
// },
export const getLayoutForSymbolOverlay = async (map: MapLibre,
    id: string, activeLegend: LegendConfig): Promise<AllLayoutProperties> => {
    const markerID = `marker-${id}`;

    if (!map.hasImage(markerID)) {
        const imageURL =
            activeLegend.image || import.meta.resolve("map-marker");

        let image: HTMLImageElement | ImageBitmap;

        if (imageURL.toLowerCase().endsWith(".svg")) {
            image = await loadSvgImage(imageURL);
        } else {
            const response = await map.loadImage(imageURL);
            image = response.data;
        }

        map.addImage(markerID, image);
    }
    return {
        "icon-image": markerID,
        "icon-size": activeLegend.iconSize || 1, //1 activeLegend.icon_size || 1.0,
        "icon-anchor": activeLegend.iconAnchor || "bottom",
        "icon-overlap": activeLegend.iconOverlap || "always",
    }
}
