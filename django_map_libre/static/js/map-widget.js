import {LayerSelector} from "map-controls"
import {
  FullscreenControl,
  Map,
  NavigationControl,
  ScaleControl,
} from "maplibre-gl"

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
 * Currently supports only 'fixed' legend type.
 */
const addOverlayLayer = async (map, overlayConfig, selector) => {
  const {id, label, _url, legends, selected = false} = overlayConfig

  // Find active legend (or first one)
  const activeLegend = legends.find(l => l.active) || legends[0]
  if (!activeLegend) {
    console.warn(`No legend found for overlay ${id}, skipping.`)
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
  const geojson = {}

  if (!map.getSource(sourceId)) {
    map.addSource(sourceId, {
      type: "geojson",
      data: geojson,
    })
  }

  if (!map.getLayer(id)) {
    map.addLayer({
      id: id,
      source: sourceId,
      type: "fill",
      layout: {
        visibility: selected ? "visible" : "none",
      },
    })
  }

  selector.addOverlayLayer(id, label || id, selected)
}

const initMap = mapContainer => {
  mapContainer.classList.add("django-map-libre-control-container")

  const loadingOverlay = document.createElement("div")
  loadingOverlay.className = "map-loading-overlay"

  const spinner = document.createElement("div")
  spinner.className = "map-loading-spinner"
  loadingOverlay.appendChild(spinner)

  const text = document.createElement("div")
  text.className = "map-loading-text"
  text.innerHTML = 'Loading map<span class="map-loading-dots"></span>'
  loadingOverlay.appendChild(text)

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
      loadingOverlay.remove()
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
