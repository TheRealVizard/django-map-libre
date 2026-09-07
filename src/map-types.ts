import type {ControlPosition, Unit} from "maplibre-gl"
import type {Feature, FeatureCollection} from "geojson"

export interface TrackedLayer {
  id: string
  label: string
  type: "tile" | "overlay"
  visible: boolean
}

export type LayerType = "fill" | "line" | "circle" | "icon" | "symbol"
export type LegendType = "fixed" | "categorical" | "heatmap"

export interface LegendConfig {
  id: string
  label: string
  type: LegendType

  coloring_property?: string | null
  display_property?: string | null

  color?: string | null
  image?: string | null

  category_mapping?:
    | Record<string, {label?: string; color?: string; icon?: string}>
    | string
    | null

  min_value?: number | null
  max_value?: number | null
  color_ramp?: string[] | null

  active?: boolean
}

interface LayerConfig {
  id: string
  label: string
  url: string
  selected?: boolean
}

export interface OverlayLayerConfig extends LayerConfig {
  layer_type: LayerType
  legends: LegendConfig[]
}

export interface TileLayerConfig extends LayerConfig {
  attribution: string
}

export interface MapWidgetDataset extends DOMStringMap {
  center: string
  tileLayer: string
  overlayLayer: string
  navigationPosition: ControlPosition
  layerSelectorPosition: ControlPosition
  showScale: string
  metricUnit: Unit
  scalePosition: ControlPosition
  allowFullscreen: string
  loadingText: string
  autoInit: string
}

export type DataCallback = (
  data: FeatureCollection[] | FeatureCollection | Feature[] | Feature
) => void
export type CompleteCallback = () => void
export type ErrorCallback = (error: string) => void
