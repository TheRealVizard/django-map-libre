import {
    type AllLayoutProperties,
    type AllPaintProperties,
    type Map as MapLibre,
} from "maplibre-gl";
import type { LegendConfig } from "./map-types";

const COLOR_PALETTE = [
    "#8dd3c7",
    "#ffffb3",
    "#bebada",
    "#fb8072",
    "#80b1d3",
    "#fdb462",
    "#b3de69",
    "#fccde5",
    "#d9d9d9",
    "#bc80bd",
    "#ccebc5",
    "#ffed6f",
    "#a6cee3",
    "#1f78b4",
    "#33a02c",
    "#fb9a99",
    "#e31a1c",
    "#fdbf6f",
    "#ff7f00",
    "#cab2d6",
    "#6a3d9a",
    "#ffff99",
    "#b15928",
    "#F0F8FF",
    "#7FFFD4",
    "#FFEBCD",
    "#0000FF",
    "#8A2BE2",
    "#A52A2A",
    "#DEB887",
    "#5F9EA0",
    "#7FFF00",
    "#D2691E",
    "#FF7F50",
    "#6495ED",
    "#DC143C",
    "#00FFFF",
    "#00008B",
    "#008B8B",
    "#B8860B",
    "#A9A9A9",
    "#006400",
    "#BDB76B",
    "#8B008B",
    "#556B2F",
    "#FF8C00",
    "#9932CC",
    "#8B0000",
    "#E9967A",
    "#8FBC8F",
    "#483D8B",
    "#2F4F4F",
    "#00CED1",
    "#9400D3",
    "#FF1493",
    "#00BFFF",
    "#696969",
    "#1E90FF",
    "#B22222",
    "#228B22",
    "#FF00FF",
    "#FFD700",
    "#DAA520",
    "#808080",
    "#ADFF2F",
    "#FF69B4",
    "#CD5C5C",
    "#4B0082",
    "#F0E68C",
    "#7CFC00",
    "#F08080",
    "#E0FFFF",
    "#FAFAD2",
    "#90EE90",
    "#FFB6C1",
    "#FFA07A",
    "#20B2AA",
    "#87CEFA",
    "#778899",
    "#B0C4DE",
    "#FFFFE0",
    "#32CD32",
    "#FF00FF",
    "#800000",
    "#66CDAA",
    "#0000CD",
    "#BA55D3",
    "#9370DB",
    "#3CB371",
    "#7B68EE",
    "#00FA9A",
    "#48D1CC",
    "#C71585",
    "#000080",
    "#6B8E23",
    "#FF4500",
    "#DA70D6",
    "#EEE8AA",
    "#98FB98",
    "#AFEEEE",
    "#DB7093",
    "#CD853F",
    "#FFC0CB",
    "#DDA0DD",
    "#B0E0E6",
    "#800080",
    "#663399",
    "#FF0000",
    "#BC8F8F",
    "#4169E1",
    "#FA8072",
    "#F4A460",
    "#2E8B57",
    "#A0522D",
    "#87CEEB",
    "#6A5ACD",
    "#00FF7F",
    "#4682B4",
    "#D2B48C",
    "#008080",
    "#D8BFD8",
    "#FF6347",
    "#40E0D0",
    "#EE82EE",
    "#FFFF00",
    "#9ACD32",
];

const loadSvgImage = async (url: string): Promise<HTMLImageElement> => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status} loading ${url}`);

    const svgText = await response.text();
    const blob = new Blob([svgText], { type: "image/svg+xml" });
    const blobUrl = URL.createObjectURL(blob);

    try {
        return await new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Invalid SVG: ${url}`));
            img.src = blobUrl;
        });
    } finally {
        URL.revokeObjectURL(blobUrl);
    }
};

export const getRandomColor = (index: number = 0): string => {
    return COLOR_PALETTE[index % COLOR_PALETTE.length] as string;
};

export const getPaintForFillOverlay = (
    activeLegend: LegendConfig,
    basic = false
): AllPaintProperties => {
    return {
        "fill-opacity": 0.7,
        "fill-layer-opacity": 1,
        "fill-outline-color": "black",
        "fill-antialias": true,
        ...(basic
            ? {}
            : {
                "fill-color": activeLegend.color || "red",
            }),
    };
};

export const getPaintForLineOverlay = (
    activeLegend: LegendConfig,
    basic = false
): AllPaintProperties => {
    return {
        "line-width": 3,
        "line-opacity": 0.8,
        ...(basic
            ? {}
            : {
                "line-color": activeLegend.color || "red",
            }),
    };
};

export const getPaintForCircleOverlay = (
    activeLegend: LegendConfig,
    basic = false
): AllPaintProperties => {
    return {
        "circle-radius": activeLegend.circleRadius || 6,
        "circle-opacity": activeLegend.circleOpacity || 0.5,
        "circle-stroke-color": activeLegend.circleStrokeColor || "black",
        "circle-stroke-width": activeLegend.circleStrokeWidth || 2,
        ...(basic
            ? {}
            : {
                "circle-color": activeLegend.color || "red",
            }),
    };
};

// TODO: Include in future for symbol
// Layout
// 'text-field': activeLegend.text_field || '',
// 'text-size': activeLegend.text_size || 12,
// paint: {
//     "text-color": activeLegend.color || "#333333",
//     "text-halo-color": "#ffffff",
//     "text-halo-width": 2,
// },
export const getLayoutForSymbolOverlay = async (
    map: MapLibre,
    id: string,
    activeLegend: LegendConfig,
    basic = false
): Promise<AllLayoutProperties> => {
    const markerID = `marker-${id}-${activeLegend.id}`;

    if (!basic && !map.hasImage(markerID)) {
        await loadImageOnMap(activeLegend.image, map, markerID);
    }
    return {
        "icon-size": activeLegend.iconSize || 1, //1 activeLegend.icon_size || 1.0,
        "icon-anchor": activeLegend.iconAnchor || "bottom",
        "icon-overlap": activeLegend.iconOverlap || "always",
        ...(basic
            ? {}
            : {
                "icon-image": markerID,
            }),
    };
};

export async function loadImageOnMap(
    url: string | null | undefined,
    map: MapLibre,
    markerID: string
) {
    if (map.hasImage(markerID)) return;

    const imageURL = url || import.meta.resolve("map-marker");

    let image: HTMLImageElement | ImageBitmap;

    if (imageURL.toLowerCase().endsWith(".svg")) {
        image = await loadSvgImage(imageURL);
    } else {
        const response = await map.loadImage(imageURL);
        image = response.data;
    }
    map.addImage(markerID, image);
}

export const toTitleCase = (str: string) =>
    str
        .toLowerCase()
        .replace(
            /(^|[\s\-/([{"])([a-z])/g,
            (_, sep, ch) => sep + ch.toUpperCase()
        );

export const hexToRgb = (hex: string): [number, number, number] => {
    const cleaned = hex.replace("#", "");
    return [
        parseInt(cleaned.substring(0, 2), 16),
        parseInt(cleaned.substring(2, 4), 16),
        parseInt(cleaned.substring(4, 6), 16),
    ];
};

export const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (n: number): string =>
        Math.max(0, Math.min(255, Math.round(n)))
            .toString(16)
            .padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const interpolateHex = (a: string, b: string, t: number): string => {
    const [r1, g1, b1] = hexToRgb(a);
    const [r2, g2, b2] = hexToRgb(b);
    return rgbToHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
};

export const splitColorRamp = (ramp: string[], steps: number): string[] => {
    const result: string[] = [];
    for (let i = 0; i < steps; i++) {
        const position = (i / (steps - 1)) * (ramp.length - 1);
        const lower = Math.floor(position);
        const upper = Math.min(lower + 1, ramp.length - 1);
        result.push(
            interpolateHex(
                ramp[lower] as string,
                ramp[upper] as string,
                position - lower
            )
        );
    }
    return result;
};
