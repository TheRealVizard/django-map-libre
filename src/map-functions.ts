import type {
    Map as MapLibre,
    CircleLayerSpecification,
    FillLayerSpecification,
    LineLayerSpecification,
    SymbolLayerSpecification,
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

export const getMapFixedOverlay = async (
    map: MapLibre,
    id: string,
    layer:
        | FillLayerSpecification
        | LineLayerSpecification
        | CircleLayerSpecification
        | SymbolLayerSpecification,
    activeLegend: LegendConfig
): Promise<
    | FillLayerSpecification
    | LineLayerSpecification
    | CircleLayerSpecification
    | SymbolLayerSpecification
> => {
    switch (layer.type) {
        case "fill": {
            layer = {
                ...layer,
                paint: {
                    "fill-color": activeLegend.color || "red",
                    "fill-opacity": 0.7,
                    "fill-outline-color": "black",
                    "fill-antialias": true,
                },
            };
            break;
        }
        case "line": {
            layer = {
                ...layer,
                paint: {
                    "line-color": activeLegend.color || "red",
                    "line-width": 3,
                    "line-opacity": 0.8,
                },
            };
            break;
        }
        case "circle": {
            layer = {
                ...layer,
                paint: {
                    "circle-color": activeLegend.color || "red",
                    "circle-radius": activeLegend.circleRadius || 6,
                    "circle-opacity": activeLegend.circleOpacity || 0.5,
                    "circle-stroke-color":
                        activeLegend.circleStrokeColor || "black",
                    "circle-stroke-width": activeLegend.circleStrokeWidth || 2,
                },
            };
            break;
        }
        case "symbol": {
            const imageURL =
                activeLegend.image || import.meta.resolve("map-marker");
            const markerID = `marker-${id}`;

            let image: HTMLImageElement | ImageBitmap;

            if (imageURL.toLowerCase().endsWith(".svg")) {
                image = await loadSvgImage(imageURL);
            } else {
                const response = await map.loadImage(imageURL);
                image = response.data;
            }

            if (!map.hasImage(markerID)) {
                map.addImage(markerID, image);
            }

            layer = {
                ...layer,
                paint: {
                    "text-color": activeLegend.color || "#333333",
                    "text-halo-color": "#ffffff",
                    "text-halo-width": 2,
                },
                layout: {
                    ...layer.layout,
                    "icon-image": markerID,
                    // TODO: Include in future
                    // 'text-field': activeLegend.text_field || '',
                    // 'text-size': activeLegend.text_size || 12,
                    "icon-size": activeLegend.iconSize || 1, //1 activeLegend.icon_size || 1.0,
                    "icon-anchor": activeLegend.iconAnchor || "bottom",
                    "icon-overlap": activeLegend.iconOverlap || "always",
                },
            };
            break;
        }
    }
    return layer;
};
