import {LayerSelector} from "map-controls"
import {
  FullscreenControl,
  Map,
  NavigationControl,
  ScaleControl,
} from "maplibre-gl"

import {DataLoader} from "map-helpers"

const layerTypes = ["fill", "line", "circle", "icon"]

const parseTileLayers = rawData => {
  let config = []
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
    config[0].selected = true
  }
  return config
}

const buildStyleFromTileLayers = tileLayers => {
  const sources = {}
  const layers = []
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
      label: cfg.label || cfg.id,
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

const registerTileLayers = (selector, tileLayers) => {
  tileLayers.forEach(cfg => {
    selector.addTileLayer(cfg.id, cfg.label || cfg.id)
  })
}

const parseOverlayLayers = rawData => {
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
const addOverlayLayer = async (map, overlayConfig, selector) => {
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

  let paint = {}
  let layout = {
    visibility: selected ? "visible" : "none",
  }
  // TODO: IMPLEMENT EXTRA STYLE
  switch (mapType) {
    case "fill":
      paint = {
        "fill-color": activeLegend.color,
        "fill-opacity": 0.7,
        "fill-outline-color": "black",
        "fill-antialias": true,
      }
      break
    case "line":
      paint = {
        "line-color": activeLegend.color,
        "line-width": 3,
        "line-opacity": 0.8,
      }
      break
    case "circle":
      paint = {
        "circle-color": activeLegend.color,
        "circle-radius": activeLegend.circle_radius || 6,
        "circle-opacity": activeLegend.circle_opacity || 0.8,
        "circle-stroke-color": activeLegend.circle_stroke_color,
        "circle-stroke-width": activeLegend.circle_stroke_width || 2,
      }
      break
    case "symbol":
      paint = {
        "text-color": activeLegend.text_color || "#333333",
        "text-halo-color": "#ffffff",
        "text-halo-width": 2,
      }

      let image = activeLegend.image
      if (!activeLegend.image) {
        const defaultMapMarker = map.loadImage(
          import.meta.resolve("map-marker")
        )
        image = defaultMapMarker
      }
      layout = {
        ...layout,
        "icon-image": image,
        // "text-field": activeLegend.text_field || "",
        // "text-size": activeLegend.text_size || 12,
        // "text-font": activeLegend.text_font || ["Open Sans Regular"],
        // "icon-size": activeLegend.icon_size || 1.0,
      }
  }

  if (!map.getLayer(id)) {
    map.addLayer({
      id: id,
      source: sourceId,
      type: mapType,
      paint: paint,
      layout: layout,
    })
  }

  selector.addOverlayLayer(id, label || id, selected)

  const loader = new DataLoader(
    url,
    data => {
      let newFeatures = []
      if (data.type === "Feature") {
        newFeatures = [data]
      } else if (data.type === "FeatureCollection") {
        newFeatures = data.features
      } else if (Array.isArray(data)) {
        newFeatures = data
      } else {
        return
      }

      const source = map.getSource(sourceId)
      if (source) {
        source.updateData({
          add: newFeatures,
        })
      }
    },
    () => {
      console.log(`[Overlay ${id}] Data loading complete.`)
    },
    error => {
      console.error(`[Overlay ${id}] Error loading data:`, error)
    },
    import.meta.resolve("map-worker")
  )

  loader.load()
}

const initMap = mapContainer => {
  mapContainer.classList.add("django-map-libre-control-container")

  const loadingOverlay = document.createElement("div")
  loadingOverlay.className = "map-loading-overlay"

  const spinner = document.createElement("div")
  spinner.className = "map-loading-spinner"
  loadingOverlay.appendChild(spinner)

  const loadingText = mapContainer.dataset.loadingText
  if (loadingText) {
    const text = document.createElement("div")
    text.className = "map-loading-text"
    text.innerHTML = `${loadingText}<span class="map-loading-dots"></span>`
    loadingOverlay.appendChild(text)
  }

  mapContainer.appendChild(loadingOverlay)

  const centerConfig = JSON.parse(mapContainer.dataset.center)
  const center = centerConfig ? centerConfig : [0, 0]

  // ---- Tile layers ----
  const tileLayers = parseTileLayers(mapContainer.dataset.tileLayer)
  const style = buildStyleFromTileLayers(tileLayers)

  const map = new Map({
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
    mapContainer.dataset.navigationPosition
  )
  if (mapContainer.dataset.showScale) {
    map.addControl(
      new ScaleControl({
        maxWidth: 80,
        unit: mapContainer.dataset.metricUnit,
      }),
      mapContainer.dataset.scalePosition
    )
  }
  if (mapContainer.dataset.allowFullscreen) {
    map.addControl(new FullscreenControl())
  }

  // ---- Layer Selector ----
  const layerSelector = new LayerSelector()
  map.addControl(layerSelector, mapContainer.dataset.layerSelectorPosition)

  registerTileLayers(layerSelector, tileLayers)

  // ---- Overlay layers ----
  const overlayLayers = parseOverlayLayers(mapContainer.dataset.overlayLayer)

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

for (const mapContainer of document.querySelectorAll(".map-widget")) {
  if (mapContainer.dataset.autoInit) {
    initMap(mapContainer)
  } else {
    mapContainer.addEventListener("initMap", () => initMap(mapContainer))
  }
}

document.addEventListener("initAllMaps", () => {
  for (const mapContainer of document.querySelectorAll(".map-widget")) {
    initMap(mapContainer)
  }
})
