export class LayerSelector {
  _map = null
  _container = null
  _panelVisible = false
  _timeout = null
  _isPinned = false
  _panel = null
  _btnIcon = null
  _trackedLayers = new Map()

  constructor(initialLayers = []) {
    initialLayers.forEach(item => {
      const id = typeof item === "string" ? item : item.id
      const label = typeof item === "string" ? item : item.label || item.id
      const type = item.type || "overlay"
      this._trackedLayers.set(id, {id, label, type, visible: true})
    })
  }

  onAdd(map) {
    this._map = map

    this._container = document.createElement("div")
    this._container.classList.add(
      "maplibregl-ctrl",
      "maplibregl-ctrl-group",
      "django-map-libre-control"
    )

    const btnIcon = document.createElement("button")
    btnIcon.classList.add("maplibregl-ctrl-icon", "map-layer-selector")
    this._btnIcon = btnIcon

    const panel = document.createElement("div")
    panel.classList.add("maplibregl-ctrl-layers-panel")
    this._panel = panel

    this._container.addEventListener("mouseenter", () => {
      clearTimeout(this._timeout)
      if (!this._isPinned) this._openPanel()
    })

    this._container.addEventListener("mouseleave", e => {
      if (this._isPinned) return
      const relatedTarget = e.relatedTarget
      if (this._container.contains(relatedTarget)) return
      this._timeout = setTimeout(() => this._closePanel(), 150)
    })

    btnIcon.addEventListener("click", e => {
      e.stopPropagation()
      this._isPinned = !this._isPinned
      if (this._isPinned) {
        this._openPanel()
        btnIcon.classList.add("pinned")
      } else {
        this._closePanel()
        btnIcon.classList.remove("pinned")
      }
    })

    document.addEventListener("click", e => {
      if (this._isPinned) return
      if (this._container && !this._container.contains(e.target)) {
        this._closePanel()
      }
    })

    map.on("styledata", () => {
      if (this._panelVisible) {
        requestAnimationFrame(() => {
          this._adjustVerticalPosition()
          this._adjustHorizontalPosition()
        })
      }
    })

    this._container.appendChild(btnIcon)
    this._container.appendChild(panel)

    return this._container
  }

  _addLayer(layerId, label, type, visible) {
    if (this._trackedLayers.has(layerId)) return
    this._trackedLayers.set(layerId, {
      id: layerId,
      label: label || layerId,
      type: type,
      visible: visible,
    })
    if (this._panelVisible) {
      this._populateLayerList()
      requestAnimationFrame(() => {
        this._adjustVerticalPosition()
        this._adjustHorizontalPosition()
      })
    }
  }

  addOverlayLayer(layerId, label, visible = true) {
    this._addLayer(layerId, label, "overlay", visible)
  }

  addTileLayer(layerId, label) {
    this._addLayer(layerId, label, "tile", true)
  }

  removeLayer(layerId) {
    if (!this._trackedLayers.has(layerId)) return
    this._trackedLayers.delete(layerId)
    if (this._panelVisible) {
      this._populateLayerList()
      requestAnimationFrame(() => {
        this._adjustVerticalPosition()
        this._adjustHorizontalPosition()
      })
    }
  }

  clearLayers() {
    this._trackedLayers.clear()
    if (this._panelVisible) {
      this._populateLayerList()
      requestAnimationFrame(() => {
        this._adjustVerticalPosition()
        this._adjustHorizontalPosition()
      })
    }
  }

  _openPanel() {
    this._panelVisible = true
    this._panel.classList.add("panel-open")
    this._populateLayerList()
    requestAnimationFrame(() => {
      this._adjustVerticalPosition()
      this._adjustHorizontalPosition()
    })
  }

  _closePanel() {
    this._panelVisible = false
    this._panel.classList.remove("panel-open")
    this._btnIcon.classList.remove("pinned")
  }

  _populateLayerList() {
    const panel = this._panel
    panel.innerHTML = ""

    if (!this._map) return

    const allLayers = this._map.getStyle().layers || []
    const trackedIds = new Set(this._trackedLayers.keys())
    const layersToShow = allLayers.filter(layer => trackedIds.has(layer.id))
    if (layersToShow.length === 0) {
      const emptyMsg = document.createElement("div")
      emptyMsg.textContent = "No layers added"
      emptyMsg.classList.add("empty-layers")
      panel.appendChild(emptyMsg)
      return
    }

    const tileLayers = layersToShow.filter(
      l => this._trackedLayers.get(l.id)?.type === "tile"
    )
    const overlayLayers = layersToShow.filter(
      l => this._trackedLayers.get(l.id)?.type === "overlay"
    )

    if (tileLayers.length > 0) {
      const tileGroupLabel = document.createElement("div")
      tileGroupLabel.textContent = "Base Maps"
      tileGroupLabel.classList.add("layer-group-title")
      panel.appendChild(tileGroupLabel)

      tileLayers.forEach(layer => {
        const item = this._createLayerItem(layer, true)
        panel.appendChild(item)
      })
    }

    if (overlayLayers.length > 0) {
      if (tileLayers.length > 0) {
        const separator = document.createElement("hr")
        separator.classList.add("layer-group-separator")
        panel.appendChild(separator)
      }
      const overlayGroupLabel = document.createElement("div")
      overlayGroupLabel.textContent = "Overlays"
      overlayGroupLabel.classList.add("layer-group-title")
      panel.appendChild(overlayGroupLabel)

      overlayLayers.forEach(layer => {
        const item = this._createLayerItem(layer, false)
        panel.appendChild(item)
      })
    }
  }

  _createLayerItem(layer, isTile) {
    const item = document.createElement("div")
    const layerInfo = this._trackedLayers.get(layer.id)
    const label = layerInfo?.label || layer.id

    item.classList.add("layer-item")

    const input = document.createElement("input")
    input.type = isTile ? "radio" : "checkbox"
    input.name = isTile ? "tile-layer" : ""
    input.classList.add("layer-input-control")

    const visibility = this._map.getLayoutProperty(layer.id, "visibility")
    const isVisible = visibility !== "none"
    input.checked = isVisible

    const labelSpan = document.createElement("span")
    labelSpan.classList.add("layer-input-span")
    labelSpan.textContent = label

    item.appendChild(input)
    item.appendChild(labelSpan)

    item.addEventListener("click", e => {
      if (e.target === input) return
      if (isTile) {
        if (!input.checked) {
          input.checked = !input.checked
        }
      } else {
        input.checked = !input.checked
      }
      const changeEvent = new Event("change", {bubbles: true})
      input.dispatchEvent(changeEvent)
    })

    input.addEventListener("change", () => {
      const newVisibility = input.checked ? "visible" : "none"
      this._map.setLayoutProperty(layer.id, "visibility", newVisibility)

      if (isTile && input.checked) {
        const allLayers = this._map.getStyle().layers || []
        const trackedIds = new Set(this._trackedLayers.keys())
        const otherTileLayers = allLayers.filter(
          l =>
            trackedIds.has(l.id) &&
            l.id !== layer.id &&
            this._trackedLayers.get(l.id)?.type === "tile"
        )
        otherTileLayers.forEach(other => {
          this._map.setLayoutProperty(other.id, "visibility", "none")
          const otherInput = this._panel.querySelector(
            `input[data-layer-id="${other.id}"]`
          )
          if (otherInput) otherInput.checked = false
        })
      }
    })

    input.dataset.layerId = layer.id

    return item
  }

  _adjustVerticalPosition() {
    const panel = this._panel
    const btnIcon = this._btnIcon
    const mapContainer = this._map.getContainer()
    const btnRect = btnIcon.getBoundingClientRect()
    const containerRect = mapContainer.getBoundingClientRect()

    const naturalHeight = panel.scrollHeight || 200
    const maxAllowedHeight = Math.min(300, containerRect.height * 0.5)
    const panelHeight = Math.min(naturalHeight, maxAllowedHeight)

    const margin = 10
    const spaceBelow = containerRect.bottom - btnRect.bottom - margin
    const spaceAbove = btnRect.top - containerRect.top - margin

    panel.style.top = ""
    panel.style.bottom = ""
    panel.style.maxHeight = maxAllowedHeight + "px"
    panel.style.overflowY = "auto"

    if (spaceBelow >= panelHeight) {
      panel.style.top = "100%"
    } else if (spaceAbove >= panelHeight) {
      panel.style.bottom = "100%"
    } else {
      if (spaceBelow > spaceAbove) {
        panel.style.top = "100%"
        const limitedHeight = Math.min(panelHeight, spaceBelow)
        panel.style.maxHeight = Math.max(limitedHeight, 50) + "px"
      } else {
        panel.style.bottom = "100%"
        const limitedHeight = Math.min(panelHeight, spaceAbove)
        panel.style.maxHeight = Math.max(limitedHeight, 50) + "px"
      }
    }
  }

  _adjustHorizontalPosition() {
    const panel = this._panel
    const btnIcon = this._btnIcon
    const mapContainer = this._map.getContainer()
    const btnRect = btnIcon.getBoundingClientRect()
    const containerRect = mapContainer.getBoundingClientRect()

    const naturalWidth = panel.scrollWidth || 150
    const maxAllowedWidth = Math.min(300, containerRect.width * 0.7)
    const panelWidth = Math.min(naturalWidth, maxAllowedWidth)

    const margin = 10
    const spaceRight = containerRect.right - btnRect.right - margin
    const spaceLeft = btnRect.left - containerRect.left - margin

    panel.style.left = ""
    panel.style.right = ""
    panel.style.maxWidth = maxAllowedWidth + "px"
    panel.style.overflowX = "auto"

    if (spaceRight >= panelWidth) {
      panel.style.left = "0"
    } else if (spaceLeft >= panelWidth) {
      panel.style.right = "0"
      panel.style.left = "auto"
    } else {
      if (spaceRight > spaceLeft) {
        panel.style.left = "0"
        const limitedWidth = Math.min(panelWidth, spaceRight)
        panel.style.maxWidth = Math.max(limitedWidth, 50) + "px"
      } else {
        panel.style.right = "0"
        panel.style.left = "auto"
        const limitedWidth = Math.min(panelWidth, spaceLeft)
        panel.style.maxWidth = Math.max(limitedWidth, 50) + "px"
      }
    }
  }

  onRemove() {
    clearTimeout(this._timeout)
    if (this._container.parentNode) {
      this._container.parentNode.removeChild(this._container)
    }
    this._map = null
    this._container = null
    this._panel = null
    this._btnIcon = null
  }

  getDefaultPosition() {
    return "top-right"
  }
}
