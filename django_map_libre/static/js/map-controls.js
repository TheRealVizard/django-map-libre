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
      const id = typeof item === 'string' ? item : item.id
      const label = typeof item === 'string' ? item : item.label || item.id
      const type = item.type || 'overlay'
      this._trackedLayers.set(id, {id, label, type, visible: true})
    })
  }

  onAdd(map) {
    this._map = map

    this._container = document.createElement('div')
    this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group'
    this._container.style.position = 'relative'
    this._container.style.display = 'inline-block'

    const btnIcon = document.createElement('button')
    btnIcon.className = 'maplibregl-ctrl-icon'
    btnIcon.style.border = 'none'
    btnIcon.style.borderRadius = '4px'
    btnIcon.style.background = 'white'
    btnIcon.style.cursor = 'pointer'
    btnIcon.style.display = 'flex'
    btnIcon.style.alignItems = 'center'
    btnIcon.style.justifyContent = 'center'
    btnIcon.style.padding = '0'
    btnIcon.style.transition = 'background 0.2s'
    this._btnIcon = btnIcon

    const svgIcon = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    )
    svgIcon.setAttribute('width', '20')
    svgIcon.setAttribute('height', '20')
    svgIcon.setAttribute('viewBox', '0 0 24 24')
    svgIcon.setAttribute('fill', 'none')
    svgIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svgIcon.innerHTML = `
            <path d="M4.97883 9.68508C2.99294 8.89073 2 8.49355 2 8C2 7.50645 2.99294 7.10927 4.97883 6.31492L7.7873 5.19153C9.77318 4.39718 10.7661 4 12 4C13.2339 4 14.2268 4.39718 16.2127 5.19153L19.0212 6.31492C21.0071 7.10927 22 7.50645 22 8C22 8.49355 21.0071 8.89073 19.0212 9.68508L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L4.97883 9.68508Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 8C2 8.49355 2.99294 8.89073 4.97883 9.68508L7.7873 10.8085C9.77318 11.6028 10.7661 12 12 12C13.2339 12 14.2268 11.6028 16.2127 10.8085L19.0212 9.68508C21.0071 8.89073 22 8.49355 22 8C22 7.50645 21.0071 7.10927 19.0212 6.31492L16.2127 5.19153C14.2268 4.39718 13.2339 4 12 4C10.7661 4 9.77318 4.39718 7.7873 5.19153L4.97883 6.31492C2.99294 7.10927 2 7.50645 2 8Z" fill="black"/>
            <path d="M19.0212 13.6851L16.2127 14.8085C14.2268 15.6028 13.2339 16 12 16C10.7661 16 9.77318 15.6028 7.7873 14.8085L4.97883 13.6851C2.99294 12.8907 2 12.4935 2 12C2 11.5551 2.80681 11.1885 4.42043 10.5388L7.56143 11.7952C9.41007 12.535 10.572 13 12 13C13.428 13 14.5899 12.535 16.4386 11.7952L19.5796 10.5388C21.1932 11.1885 22 11.5551 22 12C22 12.4935 21.0071 12.8907 19.0212 13.6851Z" fill="black"/>
            <path d="M19.0212 17.6849L16.2127 18.8083C14.2268 19.6026 13.2339 19.9998 12 19.9998C10.7661 19.9998 9.77318 19.6026 7.7873 18.8083L4.97883 17.6849C2.99294 16.8905 2 16.4934 2 15.9998C2 15.5549 2.80681 15.1883 4.42043 14.5386L7.56143 15.795C9.41007 16.5348 10.572 16.9998 12 16.9998C13.428 16.9998 14.5899 16.5348 16.4386 15.795L19.5796 14.5386C21.1932 15.1883 22 15.5549 22 15.9998C22 16.4934 21.0071 16.8905 19.0212 17.6849Z" fill="black"/>
        `
    btnIcon.appendChild(svgIcon)

    const panel = document.createElement('div')
    panel.className = 'maplibregl-ctrl-layers-panel'
    panel.style.display = 'none'
    panel.style.position = 'absolute'
    panel.style.background = 'white'
    panel.style.borderRadius = '4px'
    panel.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'
    panel.style.padding = '6px'
    panel.style.minWidth = '150px'
    panel.style.maxWidth = '300px'
    panel.style.maxHeight = '300px'
    panel.style.overflow = 'auto'
    panel.style.zIndex = '1000'
    this._panel = panel

    this._container.addEventListener('mouseenter', () => {
      clearTimeout(this._timeout)
      if (!this._isPinned) this._openPanel()
    })

    this._container.addEventListener('mouseleave', e => {
      if (this._isPinned) return
      const relatedTarget = e.relatedTarget
      if (this._container.contains(relatedTarget)) return
      this._timeout = setTimeout(() => this._closePanel(), 150)
    })

    btnIcon.addEventListener('click', e => {
      e.stopPropagation()
      this._isPinned = !this._isPinned
      if (this._isPinned) {
        this._openPanel()
        btnIcon.style.boxShadow = '0 0 2px 2px #0096ff'
      } else {
        this._closePanel()
        btnIcon.style.boxShadow = 'none'
      }
    })

    document.addEventListener('click', e => {
      if (this._isPinned) return
      if (this._container && !this._container.contains(e.target)) {
        this._closePanel()
      }
    })

    map.on('styledata', () => {
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

  addLayer(layerId, label, type = 'overlay') {
    if (this._trackedLayers.has(layerId)) return
    this._trackedLayers.set(layerId, {
      id: layerId,
      label: label || layerId,
      type: type,
      visible: true,
    })
    if (this._panelVisible) {
      this._populateLayerList()
      requestAnimationFrame(() => {
        this._adjustVerticalPosition()
        this._adjustHorizontalPosition()
      })
    }
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
    this._panel.style.display = 'block'
    this._btnIcon.style.background = '#e0e0e0'
    this._populateLayerList()
    requestAnimationFrame(() => {
      this._adjustVerticalPosition()
      this._adjustHorizontalPosition()
    })
  }

  _closePanel() {
    this._panelVisible = false
    this._panel.style.display = 'none'
    this._btnIcon.style.background = 'white'
    this._btnIcon.style.boxShadow = 'none'
    this._panel.style.top = ''
    this._panel.style.bottom = ''
    this._panel.style.left = ''
    this._panel.style.right = ''
    this._panel.style.maxWidth = '300px'
    this._panel.style.maxHeight = '300px'
    this._panel.style.overflow = 'auto'
  }

  _populateLayerList() {
    const panel = this._panel
    panel.innerHTML = ''

    if (!this._map) return

    const allLayers = this._map.getStyle().layers || []
    const trackedIds = new Set(this._trackedLayers.keys())
    const layersToShow = allLayers.filter(layer => trackedIds.has(layer.id))

    if (layersToShow.length === 0) {
      const emptyMsg = document.createElement('div')
      emptyMsg.textContent = 'No layers added'
      emptyMsg.style.padding = '4px 8px'
      emptyMsg.style.color = '#888'
      emptyMsg.style.fontSize = '12px'
      panel.appendChild(emptyMsg)
      return
    }

    const tileLayers = layersToShow.filter(
      l => this._trackedLayers.get(l.id)?.type === 'tile'
    )
    const overlayLayers = layersToShow.filter(
      l => this._trackedLayers.get(l.id)?.type === 'overlay'
    )

    if (tileLayers.length > 0) {
      const tileGroupLabel = document.createElement('div')
      tileGroupLabel.textContent = 'Base Maps'
      tileGroupLabel.style.fontWeight = 'bold'
      tileGroupLabel.style.fontSize = '12px'
      tileGroupLabel.style.marginTop = '4px'
      tileGroupLabel.style.marginBottom = '2px'
      tileGroupLabel.style.color = '#555'
      panel.appendChild(tileGroupLabel)

      tileLayers.forEach(layer => {
        const item = this._createLayerItem(layer, true)
        panel.appendChild(item)
      })
    }

    if (overlayLayers.length > 0) {
      if (tileLayers.length > 0) {
        const separator = document.createElement('hr')
        separator.style.margin = '6px 0'
        panel.appendChild(separator)
      }
      const overlayGroupLabel = document.createElement('div')
      overlayGroupLabel.textContent = 'Overlays'
      overlayGroupLabel.style.fontWeight = 'bold'
      overlayGroupLabel.style.fontSize = '12px'
      overlayGroupLabel.style.marginTop = '4px'
      overlayGroupLabel.style.marginBottom = '2px'
      overlayGroupLabel.style.color = '#555'
      panel.appendChild(overlayGroupLabel)

      overlayLayers.forEach(layer => {
        const item = this._createLayerItem(layer, false)
        panel.appendChild(item)
      })
    }
  }

  _createLayerItem(layer, isTile) {
    const item = document.createElement('div')
    const layerInfo = this._trackedLayers.get(layer.id)
    const label = layerInfo?.label || layer.id

    item.style.padding = '4px 8px'
    item.style.cursor = 'pointer'
    item.style.borderBottom = '1px solid #eee'
    item.style.fontSize = '12px'
    item.style.transition = 'background 0.2s'
    item.style.display = 'flex'
    item.style.alignItems = 'center'
    item.style.gap = '6px'

    const input = document.createElement('input')
    input.type = isTile ? 'radio' : 'checkbox'
    input.name = isTile ? 'tile-layer' : ''
    input.style.margin = '0'
    input.style.flexShrink = '0'

    const visibility = this._map.getLayoutProperty(layer.id, 'visibility')
    const isVisible = visibility !== 'none'
    input.checked = isVisible

    const labelSpan = document.createElement('span')
    labelSpan.textContent = label
    labelSpan.style.flex = '1'

    item.appendChild(input)
    item.appendChild(labelSpan)

    item.addEventListener('click', e => {
      if (e.target === input) return
      if (isTile) {
        if (!input.checked) {
          input.checked = !input.checked
        }
      } else {
        input.checked = !input.checked
      }
      const changeEvent = new Event('change', {bubbles: true})
      input.dispatchEvent(changeEvent)
    })

    input.addEventListener('change', () => {
      const newVisibility = input.checked ? 'visible' : 'none'
      this._map.setLayoutProperty(layer.id, 'visibility', newVisibility)

      if (isTile && input.checked) {
        const allLayers = this._map.getStyle().layers || []
        const trackedIds = new Set(this._trackedLayers.keys())
        const otherTileLayers = allLayers.filter(
          l =>
            trackedIds.has(l.id) &&
            l.id !== layer.id &&
            this._trackedLayers.get(l.id)?.type === 'tile'
        )
        otherTileLayers.forEach(other => {
          this._map.setLayoutProperty(other.id, 'visibility', 'none')
          const otherInput = this._panel.querySelector(
            `input[data-layer-id="${other.id}"]`
          )
          if (otherInput) otherInput.checked = false
        })
      }
    })

    input.dataset.layerId = layer.id

    item.addEventListener('mouseenter', () => {
      item.style.background = '#f0f0f0'
    })
    item.addEventListener('mouseleave', () => {
      item.style.background = 'transparent'
    })

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

    panel.style.top = ''
    panel.style.bottom = ''
    panel.style.maxHeight = maxAllowedHeight + 'px'
    panel.style.overflowY = 'auto'

    if (spaceBelow >= panelHeight) {
      panel.style.top = '100%'
    } else if (spaceAbove >= panelHeight) {
      panel.style.bottom = '100%'
    } else {
      if (spaceBelow > spaceAbove) {
        panel.style.top = '100%'
        const limitedHeight = Math.min(panelHeight, spaceBelow)
        panel.style.maxHeight = Math.max(limitedHeight, 50) + 'px'
      } else {
        panel.style.bottom = '100%'
        const limitedHeight = Math.min(panelHeight, spaceAbove)
        panel.style.maxHeight = Math.max(limitedHeight, 50) + 'px'
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

    panel.style.left = ''
    panel.style.right = ''
    panel.style.maxWidth = maxAllowedWidth + 'px'
    panel.style.overflowX = 'auto'

    if (spaceRight >= panelWidth) {
      panel.style.left = '0'
    } else if (spaceLeft >= panelWidth) {
      panel.style.right = '0'
      panel.style.left = 'auto'
    } else {
      if (spaceRight > spaceLeft) {
        panel.style.left = '0'
        const limitedWidth = Math.min(panelWidth, spaceRight)
        panel.style.maxWidth = Math.max(limitedWidth, 50) + 'px'
      } else {
        panel.style.right = '0'
        panel.style.left = 'auto'
        const limitedWidth = Math.min(panelWidth, spaceLeft)
        panel.style.maxWidth = Math.max(limitedWidth, 50) + 'px'
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
    return 'top-right'
  }
}
