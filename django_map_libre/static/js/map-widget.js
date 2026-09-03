import {LayerSelector} from 'map-controls'
import {
  FullscreenControl,
  Map,
  NavigationControl,
  ScaleControl,
} from 'maplibre-gl'

const parseTileLayers = rawData => {
  let config = []
  if (rawData) {
    try {
      config = JSON.parse(rawData)
    } catch (_e) {
      console.warn('Invalid tileLayer config, using fallback.')
    }
  }
  if (!config || config.length === 0) {
    config = [
      {
        id: 'osm-layer',
        label: 'OpenStreetMap',
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
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
    const sourceId = cfg.id + '-source'
    sources[sourceId] = {
      type: 'raster',
      tiles: [cfg.url],
      tileSize: 256,
      attribution: cfg.attribution || '',
    }
    layers.push({
      id: cfg.id,
      label: cfg.label || cfg.id,
      type: 'raster',
      source: sourceId,
      layout: {
        visibility: cfg.selected ? 'visible' : 'none',
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
    selector.addLayer(cfg.id, cfg.label || cfg.id, 'tile')
  })
}

const parseOverlayLayers = rawData => {
  if (!rawData) return []
  try {
    return JSON.parse(rawData)
  } catch (_e) {
    console.warn('Invalid overlayLayer config.')
    return []
  }
}

/**
 * Adds a single overlay layer to the map.
 * Currently supports only 'fixed' legend type.
 */
const addOverlayLayer = async (map, overlayConfig, selector) => {
  const {id, label, url, legends, selected = false} = overlayConfig

  // Find active legend (or first one)
  const activeLegend = legends.find(l => l.active) || legends[0]
  if (!activeLegend) {
    console.warn(`No legend found for overlay ${id}, skipping.`)
    return
  }

  // Only 'fixed' is implemented for now
  if (activeLegend.type !== 'fixed') {
    console.warn(
      `Legend type '${activeLegend.type}' not yet implemented for overlay ${id}.`
    )
    return
  }

  try {
    // 1. Fetch GeoJSON
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const geojson = await response.json()

    // 2. Detect geometry type (first feature)
    let layerType = 'fill'
    if (geojson.features && geojson.features.length > 0) {
      const geomType = geojson.features[0].geometry.type
      if (geomType === 'LineString' || geomType === 'MultiLineString') {
        layerType = 'line'
      } else if (geomType === 'Point' || geomType === 'MultiPoint') {
        layerType = 'circle'
      }
    }

    // 3. Build paint properties for fixed color
    const color = activeLegend.color || '#3388ff'
    let paint = {}
    if (layerType === 'fill') {
      paint = {
        'fill-color': color,
        'fill-opacity': 0.7,
        'fill-outline-color': '#000000',
      }
    } else if (layerType === 'line') {
      paint = {
        'line-color': color,
        'line-width': 3,
        'line-opacity': 0.8,
      }
    } else if (layerType === 'circle') {
      paint = {
        'circle-color': color,
        'circle-radius': 6,
        'circle-opacity': 0.8,
      }
    }

    // 4. Add source and layer
    const sourceId = id + '-source'
    if (!map.getSource(sourceId)) {
      map.addSource(sourceId, {
        type: 'geojson',
        data: geojson,
      })
    }

    if (!map.getLayer(id)) {
      map.addLayer({
        id: id,
        type: layerType,
        source: sourceId,
        paint: paint,
        layout: {
          visibility: selected ? 'visible' : 'none',
        },
      })
    }

    // 5. Register in selector
    selector.addLayer(id, label || id, 'overlay')

    console.log(`Overlay "${label}" added successfully.`)
  } catch (error) {
    console.error(`Error adding overlay "${id}":`, error)
  }
}

const initMap = mapContainer => {
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
    map.on('load', () => {
      overlayLayers.forEach(overlay => {
        addOverlayLayer(map, overlay, layerSelector)
      })
    })
  }
}

// -----------------------------------------------------------------------------
// Auto-initialization
// -----------------------------------------------------------------------------

for (const mapContainer of document.querySelectorAll('.map-widget')) {
  if (mapContainer.dataset.autoInit) {
    initMap(mapContainer)
  } else {
    mapContainer.addEventListener('initMap', () => initMap(mapContainer))
  }
}

document.addEventListener('initAllMaps', () => {
  for (const mapContainer of document.querySelectorAll('.map-widget')) {
    initMap(mapContainer)
  }
})
