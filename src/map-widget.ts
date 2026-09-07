import {
  FullscreenControl,
  GeoJSONSource,
  Map as MapLibre,
  NavigationControl,
  ScaleControl,
  type AllLayoutProperties,
  type CircleLayerSpecification,
  type FillLayerSpecification,
  type LayerSpecification,
  type LineLayerSpecification,
  type SourceSpecification,
  type StyleSpecification,
  type SymbolLayerSpecification,
  setWorkerUrl,
} from "maplibre-gl"
import {LayerSelector} from "./map-controls"
import {DataLoader} from "./map-helpers"
import type {
  MapWidgetDataset,
  OverlayLayerConfig,
  TileLayerConfig,
} from "./map-types"
import type {Feature, FeatureCollection} from "geojson"

setWorkerUrl(import.meta.resolve("maplibre-gl-worker"))

const layerTypes = ["fill", "line", "circle", "icon"]

const parseTileLayers = (rawData: string): TileLayerConfig[] => {
  let config: TileLayerConfig[] = []
  if (rawData) {
    try {
      config = JSON.parse(rawData)
    } catch (_e) {
      console.warn("Invalid tileLayer config, using fallback.")
    }
  }
  if (!config || config.length === 0) {
    config = [
      {
        id: "osm-layer",
        label: "OpenStreetMap",
        url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        selected: true,
      },
    ]
  }
  // Ensure only one selected
  let foundSelected = false
  config.forEach(layer => {
    if (layer.selected && !foundSelected) {
      foundSelected = true
    } else if (layer.selected && foundSelected) {
      layer.selected = false
    }
  })
  if (!foundSelected && config.length > 0) {
    config[0] && (config[0].selected = true)
  }
  return config
}

const buildStyleFromTileLayers = (
  tileLayers: TileLayerConfig[]
): StyleSpecification => {
  const sources: Record<string, SourceSpecification> = {}
  const layers: LayerSpecification[] = []
  tileLayers.forEach(cfg => {
    const sourceId = cfg.id + "-source"
    sources[sourceId] = {
      type: "raster",
      tiles: [cfg.url],
      tileSize: 256,
      attribution: cfg.attribution || "",
    }
    layers.push({
      id: cfg.id,
      type: "raster",
      source: sourceId,
      layout: {
        visibility: cfg.selected ? "visible" : "none",
      },
    })
  })
  return {
    version: 8,
    sources: sources,
    layers: layers,
  }
}

const registerTileLayers = (
  selector: LayerSelector,
  tileLayers: TileLayerConfig[]
) => {
  tileLayers.forEach(cfg => {
    selector.addTileLayer(cfg.id, cfg.label || cfg.id)
  })
}

const parseOverlayLayers = (rawData: string): OverlayLayerConfig[] => {
  if (!rawData) return []
  try {
    return JSON.parse(rawData)
  } catch (_e) {
    console.warn("Invalid overlayLayer config.")
    return []
  }
}

/**
 * Adds a single overlay layer to the map.
 */
const addOverlayLayer = async (
  map: MapLibre,
  overlayConfig: OverlayLayerConfig,
  selector: LayerSelector
) => {
  const {id, label, layer_type, url, legends, selected = false} = overlayConfig

  // Find active legend (or first one)
  const activeLegend = legends.find(l => l.active) || legends[0]
  if (!activeLegend) {
    console.warn(`No legend found for overlay ${id}, skipping.`)
    return
  }

  if (!layerTypes.includes(layer_type)) {
    console.warn(`Invalid layer type for overlay ${id}, skipping.`)
    return
  }

  // Only 'fixed' is implemented for now
  if (activeLegend.type !== "fixed") {
    console.warn(
      `Legend type '${activeLegend.type}' not yet implemented for overlay ${id}.`
    )
    return
  }

  const sourceId = `overlay-${id}-source`

  const mapType = layer_type === "icon" ? "symbol" : layer_type

  if (!map.getSource(sourceId)) {
    map.addSource(sourceId, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    })
  }

  let layout: AllLayoutProperties = {
    visibility: selected ? "visible" : "none",
  }

  let layer:
    | FillLayerSpecification
    | LineLayerSpecification
    | CircleLayerSpecification
    | SymbolLayerSpecification

  // TODO: IMPLEMENT EXTRA STYLE

  switch (mapType) {
    case "fill":
      layer = {
        id,
        source: sourceId,
        type: "fill",
        paint: {
          "fill-color": activeLegend.color || "red",
          "fill-opacity": 0.7,
          "fill-outline-color": "black",
          "fill-antialias": true,
        },
        layout: layout,
      }
      break

    case "line":
      layer = {
        id,
        source: sourceId,
        type: "line",
        paint: {
          "line-color": activeLegend.color || "red",
          "line-width": 3,
          "line-opacity": 0.8,
        },
        layout: layout,
      }
      break

    case "circle":
      layer = {
        id,
        source: sourceId,
        type: "circle",
        paint: {
          "circle-color": activeLegend.color || "red",
          // 'circle-radius': activeLegend.circle_radius || 6,
          // 'circle-opacity': activeLegend.circle_opacity || 0.8,
          // 'circle-stroke-color': activeLegend.circle_stroke_color || '#ffffff',
          // 'circle-stroke-width': activeLegend.circle_stroke_width || 2,
        },
        layout: layout,
      }
      break

    case "symbol":
      // Mantenemos los comentarios tal cual
      // let image: string|ImageBitmap | HTMLImageElement|undefined|null = activeLegend.image;

      // if (!image) {
      //   const defaultMarkerResponse = await map.loadImage(import.meta.resolve('map-marker'));
      //   image = defaultMarkerResponse.data;
      // }

      layer = {
        id,
        source: sourceId,
        type: "symbol",
        paint: {
          "text-color": activeLegend.color || "#333333",
          "text-halo-color": "#ffffff",
          "text-halo-width": 2,
        },
        layout: {
          ...layout,
          // 'icon-image': image,
          // 'text-field': activeLegend.text_field || '',
          // 'text-size': activeLegend.text_size || 12,
          // 'text-font': activeLegend.text_font || ['Open Sans Regular'],
          // 'icon-size': activeLegend.icon_size || 1.0,
        },
      }
      break
  }

  if (!map.getLayer(id)) {
    map.addLayer(layer)
  }

  selector.addOverlayLayer(id, label || id, selected)

  const loader = new DataLoader(
    url,
    (data: FeatureCollection[] | FeatureCollection | Feature[] | Feature) => {
      let newFeatures: Feature[] = []
      console.log("HERE", data)

      if (Array.isArray(data)) {
        for (const item of data) {
          if (item.type === "Feature") {
            newFeatures.push(item)
          } else if (item.type === "FeatureCollection") {
            newFeatures.push(...item.features)
          }
        }
      } else {
        if (data.type === "Feature") {
          newFeatures = [data]
        } else if (data.type === "FeatureCollection") {
          newFeatures = data.features
        } else {
          console.warn("[Overlay] Unexpected data type:", data)
          return
        }
      }

      const source = map.getSource(sourceId) as GeoJSONSource | undefined
      if (source && typeof source.updateData === "function") {
        source.updateData({add: newFeatures})
      }
    },
    () => {
      console.log(`[Overlay ${id}] Data loading complete.`)
    },
    (error: string) => {
      console.error(`[Overlay ${id}] Error loading data:`, error)
    },
    import.meta.resolve("map-worker")
  )

  loader.load()
}

const initMap = (mapContainer: HTMLElement) => {
  const mapConfig = mapContainer.dataset as MapWidgetDataset

  mapContainer.classList.add("django-map-libre-control-container")

  const loadingOverlay = document.createElement("div")
  loadingOverlay.className = "map-loading-overlay"

  const spinner = document.createElement("div")
  spinner.className = "map-loading-spinner"
  loadingOverlay.appendChild(spinner)

  const loadingText = mapConfig.loadingText
  if (loadingText) {
    const text = document.createElement("div")
    text.className = "map-loading-text"
    text.innerHTML = `${loadingText}<span class="map-loading-dots"></span>`
    loadingOverlay.appendChild(text)
  }

  mapContainer.appendChild(loadingOverlay)

  const centerConfig = JSON.parse(mapConfig.center)
  const center = centerConfig ? centerConfig : [0, 0]

  // ---- Tile layers ----
  const tileLayers = parseTileLayers(mapConfig.tileLayer)
  const style = buildStyleFromTileLayers(tileLayers)

  const map = new MapLibre({
    container: mapContainer,
    zoom: 13,
    center: center,
  })
  map.setStyle(style)

  // ---- Controls ----
  map.addControl(
    new NavigationControl({
      visualizePitch: true,
      visualizeRoll: true,
      showZoom: true,
      showCompass: true,
    }),
    mapConfig.navigationPosition
  )
  if (mapConfig.showScale) {
    map.addControl(
      new ScaleControl({
        maxWidth: 80,
        unit: mapConfig.metricUnit,
      }),
      mapConfig.scalePosition
    )
  }
  if (mapConfig.allowFullscreen) {
    map.addControl(new FullscreenControl())
  }

  // ---- Layer Selector ----
  const layerSelector = new LayerSelector()
  map.addControl(layerSelector, mapConfig.layerSelectorPosition)

  registerTileLayers(layerSelector, tileLayers)

  // ---- Overlay layers ----
  const overlayLayers = parseOverlayLayers(mapConfig.overlayLayer)

  if (overlayLayers.length > 0) {
    // Wait for map to be ready before adding overlays
    map.on("load", () => {
      loadingOverlay?.remove()
      overlayLayers.forEach(overlay => {
        addOverlayLayer(map, overlay, layerSelector)
      })
    })
  }
}

// -----------------------------------------------------------------------------
// Auto-initialization
// -----------------------------------------------------------------------------

for (const mapContainer of document.querySelectorAll<HTMLElement>(
  ".map-widget"
)) {
  const dataset = mapContainer.dataset as MapWidgetDataset
  if (dataset.autoInit === "True") {
    initMap(mapContainer)
  } else {
    mapContainer.addEventListener("initMap", () => initMap(mapContainer))
  }
}

document.addEventListener("initAllMaps", () => {
  for (const mapContainer of document.querySelectorAll<HTMLElement>(
    ".map-widget"
  )) {
    initMap(mapContainer)
  }
})
