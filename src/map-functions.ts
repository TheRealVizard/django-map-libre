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
    "#FAEBD7",
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
    "#FFFAF0",
    "#228B22",
    "#FF00FF",
    "#DCDCDC",
    "#F8F8FF",
    "#FFD700",
    "#DAA520",
    "#808080",
    "#ADFF2F",
    "#F0FFF0",
    "#FF69B4",
    "#CD5C5C",
    "#4B0082",
    "#F0E68C",
    "#E6E6FA",
    "#FFF0F5",
    "#7CFC00",
    "#F08080",
    "#E0FFFF",
    "#FAFAD2",
    "#D3D3D3",
    "#90EE90",
    "#FFB6C1",
    "#FFA07A",
    "#20B2AA",
    "#87CEFA",
    "#778899",
    "#B0C4DE",
    "#FFFFE0",
    "#00FF00",
    "#32CD32",
    "#FAF0E6",
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
    "#FFE4E1",
    "#FFDEAD",
    "#000080",
    "#FDF5E6",
    "#808000",
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
    "#708090",
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

const hashString = (str: string): number => {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) + hash + str.charCodeAt(i);
    }
    return hash >>> 0;
};

export const getRandomColor = (index: string): string => {
    return COLOR_PALETTE[hashString(index) % COLOR_PALETTE.length] as string;
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
    const markerID = `marker-${id}`;

    if (!basic && !map.hasImage(markerID)) {
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
