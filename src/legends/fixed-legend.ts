import type { AllLayoutProperties, AllPaintProperties } from "maplibre-gl";
import {
    getLayoutForSymbolOverlay,
    getPaintForCircleOverlay,
    getPaintForFillOverlay,
    getPaintForLineOverlay,
} from "../helpers/functions";
import { BaseLegend } from "./base-legend";

/**
 * Legend that applies a single, static style to the layer.
 */
export class FixedLegend extends BaseLegend {
    updateMapLayout(): Promise<void> {
        return new Promise((resolve, _reject) => {
            this.applyFixedLegendConfig(resolve);
        });
    }

    doExtraStyling(): void {}

    applyFixedLegendConfig(
        resolve: (value: void | PromiseLike<void>) => void,
        notify: boolean = true
    ) {
        switch (this.parentOverlay.layerType) {
            case "fill":
                for (const [prop, value] of Object.entries(
                    getPaintForFillOverlay(this.legendConfig)
                )) {
                    this.map.setPaintProperty(
                        this.layerId,
                        prop as keyof AllPaintProperties,
                        value
                    );
                }
                break;
            case "line":
                for (const [prop, value] of Object.entries(
                    getPaintForLineOverlay(this.legendConfig)
                )) {
                    this.map.setPaintProperty(
                        this.layerId,
                        prop as keyof AllPaintProperties,
                        value
                    );
                }
                break;
            case "circle":
                for (const [prop, value] of Object.entries(
                    getPaintForCircleOverlay(this.legendConfig)
                )) {
                    this.map.setPaintProperty(
                        this.layerId,
                        prop as keyof AllPaintProperties,
                        value
                    );
                }
                break;
            case "icon":
                for (const [prop, value] of Object.entries(
                    getLayoutForSymbolOverlay(
                        this.map,
                        this.layerId,
                        this.legendConfig
                    )
                )) {
                    this.map.setLayoutProperty(
                        this.layerId,
                        prop as keyof AllLayoutProperties,
                        value
                    );
                }
                break;
        }
        if (notify) {
            this.onLoadCompleteListener(this.layerId, this.legendConfig.id);
        }
        resolve();
    }
    /**
     * Updates the fixed color and reapplies the style without triggering the
     * load-complete listener. Used for live editing from the legend control.
     */
    setColor(color: string): void {
        this.legendConfig.color = color;
        this.applyFixedLegendConfig(() => {}, false);
    }
}
