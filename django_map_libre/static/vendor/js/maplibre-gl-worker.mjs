/**
 * MapLibre GL JS
 * @license 3-Clause BSD. Full text of license: https://github.com/maplibre/maplibre-gl-js/blob/v6.7.0/LICENSE.txt
 */
import {
  An as e,
  B as t,
  Bi as n,
  D as r,
  Dn as i,
  En as a,
  G as o,
  Hr as s,
  I as c,
  Ln as l,
  Mn as u,
  Ot as d,
  P as f,
  Pn as p,
  Rr as m,
  S as h,
  St as g,
  Ut as _,
  W as v,
  ar as y,
  br as b,
  c as x,
  d as S,
  dr as C,
  ft as w,
  g as T,
  gt as ee,
  i as E,
  in as D,
  kt as O,
  l as k,
  m as A,
  mn as j,
  n as te,
  o as ne,
  p as re,
  pn as ie,
  pr as M,
  q as N,
  rn as P,
  rr as F,
  sn as I,
  vr as L,
  x as R,
  yn as z,
  zn as B,
} from "./maplibre-gl-shared.mjs"
function V(e2) {
  let t2 = typeof e2
  if (t2 === `number` || t2 === `boolean` || t2 === `string` || e2 == null)
    return JSON.stringify(e2)
  if (Array.isArray(e2)) {
    let t3 = `[`
    for (let n3 of e2) t3 += `${V(n3)},`
    return `${t3}]`
  }
  let n2 = Object.keys(e2).sort(),
    r2 = `{`
  for (let t3 = 0; t3 < n2.length; t3++)
    r2 += `${JSON.stringify(n2[t3])}:${V(e2[n2[t3]])},`
  return `${r2}}`
}
function H(e2) {
  let t2 = ``
  for (let n2 of z) t2 += `/${V(e2[n2])}`
  return t2
}
function U(e2, t2) {
  let n2 = {}
  for (let r3 = 0; r3 < e2.length; r3++) {
    let i2 = (t2 && t2[e2[r3].id]) || H(e2[r3])
    t2 && (t2[e2[r3].id] = i2)
    let a2 = n2[i2]
    ;((a2 ||= n2[i2] = []), a2.push(e2[r3]))
  }
  let r2 = []
  for (let e3 in n2) r2.push(n2[e3])
  return r2
}
var W = class {
    constructor(e2, t2) {
      ;((this.keyCache = {}), e2 && this.replace(e2, t2))
    }
    replace(e2, t2) {
      ;((this._layerConfigs = {}), (this._layers = {}), this.update(e2, [], t2))
    }
    update(e2, t2, n2) {
      for (let t3 of e2) {
        this._layerConfigs[t3.id] = t3
        let e3 = (this._layers[t3.id] = h(t3, n2))
        ;((e3._featureFilter = ie(e3.filter, `layers[${t3.id}].filter`, n2)),
          this.keyCache[t3.id] && delete this.keyCache[t3.id])
      }
      for (let e3 of t2)
        (delete this.keyCache[e3],
          delete this._layerConfigs[e3],
          delete this._layers[e3])
      this.familiesBySource = {}
      let r2 = U(Object.values(this._layerConfigs), this.keyCache)
      for (let e3 of r2) {
        let t3 = e3.map(e4 => this._layers[e4.id]),
          n3 = t3[0]
        if (n3.isHidden()) continue
        let r3 = n3.source || ``,
          i2 = this.familiesBySource[r3]
        i2 ||= this.familiesBySource[r3] = {}
        let a2 = n3.sourceLayer || `_geojsonTileLayer`,
          o2 = i2[a2]
        ;((o2 ||= i2[a2] = []), o2.push(t3))
      }
    }
  },
  G = class {
    constructor(e2) {
      let t2 = {},
        n2 = []
      for (let r3 in e2) {
        let i3 = e2[r3],
          a3 = (t2[r3] = {})
        for (let e3 in i3) {
          let t3 = i3[e3]
          if (!t3 || t3.bitmap.width === 0 || t3.bitmap.height === 0) continue
          let r4 = {x: 0, y: 0, w: t3.bitmap.width + 2, h: t3.bitmap.height + 2}
          ;(n2.push(r4), (a3[e3] = {rect: r4, metrics: t3.metrics}))
        }
      }
      let {w: r2, h: i2} = c(n2),
        a2 = new d({width: r2 || 1, height: i2 || 1})
      for (let n3 in e2) {
        let r3 = e2[n3]
        for (let e3 in r3) {
          let i3 = r3[e3]
          if (!i3 || i3.bitmap.width === 0 || i3.bitmap.height === 0) continue
          let o2 = t2[n3][e3].rect
          d.copy(
            i3.bitmap,
            a2,
            {x: 0, y: 0},
            {x: o2.x + 1, y: o2.y + 1},
            i3.bitmap
          )
        }
      }
      ;((this.image = a2), (this.positions = t2))
    }
  }
I(`GlyphAtlas`, G)
var K = class {
  constructor(e2) {
    ;((this.tileID = new T(
      e2.tileID.overscaledZ,
      e2.tileID.wrap,
      e2.tileID.canonical.z,
      e2.tileID.canonical.x,
      e2.tileID.canonical.y
    )),
      (this.uid = e2.uid),
      (this.zoom = e2.zoom),
      (this.pixelRatio = e2.pixelRatio),
      (this.tileSize = e2.tileSize),
      (this.source = e2.source),
      (this.overscaling = this.tileID.overscaleFactor()),
      (this.showCollisionBoxes = e2.showCollisionBoxes),
      (this.collectResourceTiming = !!e2.collectResourceTiming),
      (this.returnDependencies = !!e2.returnDependencies),
      (this.promoteId = e2.promoteId),
      (this.inFlightDependencies = []))
  }
  async parse(e2, t2, n2, i2, a2) {
    ;((this.data = e2), (this.collisionBoxArray = new _()))
    let o2 = new S(Object.keys(e2.layers).sort()),
      s2 = new x(this.tileID, this.promoteId)
    s2.bucketLayerIDs = []
    let c2 = {},
      l2 = {
        featureIndex: s2,
        iconDependencies: {},
        patternDependencies: {},
        glyphDependencies: {},
        dashDependencies: {},
        availableImages: n2,
        subdivisionGranularity: a2,
      },
      u2 = t2.familiesBySource[this.source]
    for (let t3 in u2) {
      let r2 = e2.layers[t3]
      if (!r2) continue
      r2.version === 1 &&
        m(
          `Vector tile source "${this.source}" layer "${t3}" does not use vector tile spec v2 and therefore may have some rendering errors.`
        )
      let i3 = o2.encode(t3),
        a3 = []
      for (let e3 = 0; e3 < r2.length; e3++) {
        let n3 = r2.feature(e3),
          o3 = s2.getId(n3, t3)
        a3.push({feature: n3, id: o3, index: e3, sourceLayerIndex: i3})
      }
      for (let e3 of u2[t3]) {
        let t4 = e3[0]
        ;(t4.source !== this.source &&
          m(
            `layer.source = ${t4.source} does not equal this.source = ${this.source}`
          ),
          !t4.isHidden(this.zoom, true) &&
            (q(e3, this.zoom, n2),
            (c2[t4.id] = t4.createBucket({
              index: s2.bucketLayerIDs.length,
              layers: e3,
              zoom: this.zoom,
              pixelRatio: this.pixelRatio,
              overscaling: this.overscaling,
              collisionBoxArray: this.collisionBoxArray,
              sourceLayerIndex: i3,
              sourceID: this.source,
            })).populate(a3, l2, this.tileID.canonical),
            s2.bucketLayerIDs.push(e3.map(e4 => e4.id))))
      }
    }
    let d2 = b(l2.glyphDependencies, e3 => Object.keys(e3))
    for (let e3 of this.inFlightDependencies) e3?.abort()
    this.inFlightDependencies = []
    let p2 = Promise.resolve({})
    if (Object.keys(d2).length) {
      let e3 = new AbortController()
      ;(this.inFlightDependencies.push(e3),
        (p2 = i2.sendAsync(
          {
            type: `GG`,
            data: {
              stacks: d2,
              source: this.source,
              tileID: this.tileID,
              type: `glyphs`,
            },
          },
          e3
        )))
    }
    let h2 = Object.keys(l2.iconDependencies),
      g2 = Promise.resolve({})
    if (h2.length) {
      let e3 = new AbortController()
      ;(this.inFlightDependencies.push(e3),
        (g2 = i2.sendAsync(
          {
            type: `GI`,
            data: {
              icons: h2,
              source: this.source,
              tileID: this.tileID,
              type: `icons`,
            },
          },
          e3
        )))
    }
    let y2 = Object.keys(l2.patternDependencies),
      C2 = Promise.resolve({})
    if (y2.length) {
      let e3 = new AbortController()
      ;(this.inFlightDependencies.push(e3),
        (C2 = i2.sendAsync(
          {
            type: `GI`,
            data: {
              icons: y2,
              source: this.source,
              tileID: this.tileID,
              type: `patterns`,
            },
          },
          e3
        )))
    }
    let w2 = l2.dashDependencies,
      T2 = Promise.resolve({})
    if (Object.keys(w2).length) {
      let e3 = new AbortController()
      ;(this.inFlightDependencies.push(e3),
        (T2 = i2.sendAsync({type: `GDA`, data: {dashes: w2}}, e3)))
    }
    let [E2, D2, O2, k2] = await Promise.all([p2, g2, C2, T2]),
      A2 = new G(E2),
      j2 = new f(D2, O2)
    for (let e3 in c2) {
      let t3 = c2[e3]
      t3 instanceof r
        ? (q(t3.layers, this.zoom, n2),
          te({
            bucket: t3,
            glyphMap: E2,
            glyphPositions: A2.positions,
            imageMap: D2,
            imagePositions: j2.iconPositions,
            showCollisionBoxes: this.showCollisionBoxes,
            canonical: this.tileID.canonical,
            subdivisionGranularity: l2.subdivisionGranularity,
          }))
        : t3.hasDependencies &&
          (t3 instanceof ee || t3 instanceof N || t3 instanceof v) &&
          (q(t3.layers, this.zoom, n2),
          t3.addFeatures(l2, this.tileID.canonical, j2.patternPositions, k2))
    }
    return {
      buckets: Object.values(c2).filter(e3 => !e3.isEmpty()),
      featureIndex: s2,
      collisionBoxArray: this.collisionBoxArray,
      glyphAtlasImage: A2.image,
      imageAtlas: j2,
      dashPositions: k2,
      glyphMap: this.returnDependencies ? E2 : null,
      iconMap: this.returnDependencies ? D2 : null,
      glyphPositions: this.returnDependencies ? A2.positions : null,
    }
  }
}
function q(e2, t2, n2) {
  let r2 = new P(t2)
  for (let t3 of e2) t3.recalculate(r2, n2)
}
var J = class {
    constructor() {
      ;((this.loading = {}), (this.loaded = {}), (this.parsing = {}))
    }
    startLoading(e2, t2) {
      this.loading[e2] = t2
    }
    finishLoading(e2) {
      delete this.loading[e2]
    }
    abort(e2) {
      let t2 = this.loading[e2]
      t2?.abort && (t2.abort.abort(), delete this.loading[e2])
    }
    getParsing(e2) {
      return this.parsing[e2]
    }
    setParsing(e2, t2) {
      this.parsing[e2] = t2
    }
    removeParsing(e2) {
      delete this.parsing[e2]
    }
    markLoaded(e2, t2) {
      this.loaded[e2] = t2
    }
    getLoaded(e2) {
      let t2 = this.loaded[e2]
      if (t2) return t2
    }
    removeLoaded(e2) {
      delete this.loaded[e2]
    }
    clearLoaded() {
      this.loaded = {}
    }
  },
  Y = class {
    constructor(e2) {
      ;((this.start = `${e2}#start`),
        (this.end = `${e2}#end`),
        (this.measure = e2),
        performance.mark(this.start))
    }
    finish() {
      performance.mark(this.end)
      let e2 = performance.getEntriesByName(this.measure)
      return (
        e2.length === 0 &&
          (performance.measure(this.measure, this.start, this.end),
          (e2 = performance.getEntriesByName(this.measure)),
          performance.clearMarks(this.start),
          performance.clearMarks(this.end),
          performance.clearMeasures(this.measure)),
        e2
      )
    }
  },
  ae = class {
    constructor(e2, t2, n2, r2, i2) {
      ;((this.type = e2),
        (this.properties = n2 || {}),
        (this.extent = i2),
        (this.pointsArray = t2),
        (this.id = r2))
    }
    loadGeometry() {
      return this.pointsArray.map(e2 => e2.map(e3 => new n(e3.x, e3.y)))
    }
  },
  oe = class {
    constructor(e2, t2, n2) {
      ;((this.version = 2),
        (this._myFeatures = e2),
        (this.name = t2),
        (this.length = e2.length),
        (this.extent = n2))
    }
    feature(e2) {
      return this._myFeatures[e2]
    }
  },
  se = class {
    constructor() {
      this.layers = {}
    }
    addLayer(e2) {
      this.layers[e2.name] = e2
    }
  }
function ce(e2, t2, n2) {
  let {extent: r2} = e2,
    i2 = 2 ** (n2.z - t2.z),
    a2 = (n2.x - t2.x * i2) * r2,
    o2 = (n2.y - t2.y * i2) * r2,
    s2 = []
  for (let t3 = 0; t3 < e2.length; t3++) {
    let n3 = e2.feature(t3),
      c2 = n3.loadGeometry()
    for (let e3 of c2)
      for (let t4 of e3) ((t4.x = t4.x * i2 - a2), (t4.y = t4.y * i2 - o2))
    ;((c2 = E(c2, n3.type, -128, -128, r2 + 128, r2 + 128)),
      c2.length !== 0 && s2.push(new ae(n3.type, c2, n3.properties, n3.id, r2)))
  }
  return new oe(s2, e2.name, r2)
}
var le = class {
    constructor(e2, t2, n2) {
      ;((this.actor = e2),
        (this.layerIndex = t2),
        (this.availableImages = n2),
        (this.tileState = new J()),
        (this.overzoomedTileResultCache = new ne(1e3)))
    }
    loadVectorTile(e2, n2) {
      try {
        return {
          vectorTile: e2.encoding === `mlt` ? new k(n2) : new w(new t(n2)),
          rawData: n2,
        }
      } catch (t2) {
        let r2 = new Uint8Array(n2),
          i2 = r2[0] === 31 && r2[1] === 139,
          a2 = `Unable to parse the tile at ${e2.request.url}, `
        throw (
          (a2 += i2
            ? `please make sure the data is not gzipped and that you have configured the relevant header in the server`
            : `got error: ${F(t2).message}`),
          Error(a2)
        )
      }
    }
    async loadTile(e2) {
      let {uid: t2, overzoomParameters: n2} = e2
      n2 && (e2.request = n2.overzoomRequest)
      let r2 = this._startRequestTiming(e2),
        i2 = new K(e2)
      this.tileState.startLoading(t2, i2)
      let o2 = new AbortController()
      i2.abort = o2
      try {
        let s2 = await a(e2.request, o2)
        if (e2.etag && e2.etag === s2.etag)
          return (
            this.tileState.finishLoading(t2),
            this._getEtagUnmodifiedResult(s2, r2)
          )
        let c2 = this.loadVectorTile(e2, s2.data)
        if ((this.tileState.finishLoading(t2), !c2)) return null
        let {vectorTile: l2, rawData: u2} = c2
        n2 && ({vectorTile: l2, rawData: u2} = this._getOverzoomTile(e2, l2))
        let d2 = this._getExpiryData(s2),
          f2 = this._finishRequestTiming(r2)
        ;((i2.vectorTile = l2),
          (i2.etag = s2.etag),
          this.tileState.markLoaded(t2, i2))
        let p2 = {rawData: u2, cacheControl: d2, resourceTiming: f2}
        return (
          this.tileState.setParsing(t2, p2), await this._parseWorkerTile(i2, e2)
        )
      } catch (e3) {
        throw (
          this.tileState.finishLoading(t2),
          this.tileState.markLoaded(t2, i2),
          e3
        )
      }
    }
    _getEtagUnmodifiedResult(e2, t2) {
      let n2 = this._getExpiryData(e2),
        r2 = this._finishRequestTiming(t2)
      return y({etagUnmodified: true}, n2, r2)
    }
    async _parseWorkerTile(e2, t2) {
      let n2 = this.tileState.getParsing(e2.uid),
        r2 = await e2.parse(
          e2.vectorTile,
          this.layerIndex,
          this.availableImages,
          this.actor,
          t2.subdivisionGranularity
        )
      if (n2) {
        let {rawData: i2, cacheControl: a2, resourceTiming: o2} = n2,
          s2 = t2.overzoomParameters ? `mvt` : t2.encoding
        ;((r2 = y({rawTileData: i2.slice(0), encoding: s2}, r2, a2, o2)),
          this.tileState.removeParsing(e2.uid))
      } else e2.etag && (r2 = y(r2, {etag: e2.etag}))
      return r2
    }
    _getExpiryData({expires: e2, cacheControl: t2, etag: n2}) {
      let r2 = {}
      return (
        e2 && (r2.expires = e2),
        t2 && (r2.cacheControl = t2),
        n2 && (r2.etag = n2),
        r2
      )
    }
    _startRequestTiming(e2) {
      if (e2.request?.collectResourceTiming) return new Y(e2.request.url)
    }
    _finishRequestTiming(e2) {
      let t2 = e2?.finish()
      return t2 ? {resourceTiming: JSON.parse(JSON.stringify(t2))} : {}
    }
    _getOverzoomTile(e2, t2) {
      let {tileID: n2, source: r2, overzoomParameters: i2} = e2,
        {maxZoomTileID: a2} = i2,
        o2 = `${a2.key}_${n2.key}_${e2.request?.url}`,
        s2 = this.overzoomedTileResultCache.get(o2)
      if (s2) return s2
      let c2 = new se(),
        l2 = this.layerIndex.familiesBySource[r2]
      for (let e3 in l2) {
        let r3 = t2.layers[e3]
        if (!r3) continue
        let i3 = ce(r3, a2, n2.canonical)
        i3.length > 0 && c2.addLayer(i3)
      }
      let u2 = {vectorTile: c2, rawData: A(c2).buffer}
      return (this.overzoomedTileResultCache.set(o2, u2), u2)
    }
    async reloadTile(e2) {
      let t2 = e2.uid,
        n2 = this.tileState.getLoaded(t2)
      if (!n2)
        throw Error(
          `Should not be trying to reload a tile that was never loaded or has been removed`
        )
      if (n2.vectorTile)
        return (
          (n2.showCollisionBoxes = e2.showCollisionBoxes),
          await this._parseWorkerTile(n2, e2)
        )
    }
    async abortTile(e2) {
      this.tileState.abort(e2.uid)
    }
    async removeTile(e2) {
      this.tileState.removeLoaded(e2.uid)
    }
  },
  X = class {
    constructor() {
      this.loaded = {}
    }
    async loadTile(e2) {
      let {
          uid: t2,
          encoding: n2,
          rawImageData: r2,
          redFactor: i2,
          greenFactor: a2,
          blueFactor: o2,
          baseShift: s2,
        } = e2,
        c2 = r2.width + 2,
        l2 = r2.height + 2,
        u2 = M(r2)
          ? new O({width: c2, height: l2}, await C(r2, -1, -1, c2, l2))
          : r2,
        d2 = new g(t2, u2, n2, i2, a2, o2, s2)
      return ((this.loaded ||= {}), (this.loaded[t2] = d2), d2)
    }
    removeTile(e2) {
      let t2 = this.loaded,
        n2 = e2.uid
      t2?.[n2] && delete t2[n2]
    }
  },
  ue = class {
    constructor(e2, t2, n2, r2 = de) {
      ;((this.actor = e2),
        (this.layerIndex = t2),
        (this.availableImages = n2),
        (this.tileState = new J()),
        (this._createGeoJSONIndex = r2))
    }
    loadVectorTile(e2) {
      if (!this._geoJSONIndex)
        throw Error(`Unable to parse the data into a cluster or geojson`)
      let {z: t2, x: n2, y: r2} = e2.tileID.canonical,
        i2 = this._geoJSONIndex.getTile(t2, n2, r2)
      if (!i2) return null
      let a2 = new re(i2.features, {version: 2, extent: s})
      return {vectorTile: a2, rawData: A(a2, B).buffer}
    }
    async loadTile(e2) {
      let {uid: t2} = e2,
        n2 = new K(e2)
      n2.abort = new AbortController()
      try {
        let r2 = this.loadVectorTile(e2)
        if (!r2) return null
        let {vectorTile: i2, rawData: a2} = r2
        ;((n2.vectorTile = i2), this.tileState.markLoaded(t2, n2))
        let o2 = {rawData: a2}
        return (
          this.tileState.setParsing(t2, o2), await this._parseWorkerTile(n2, e2)
        )
      } catch (e3) {
        throw (this.tileState.markLoaded(t2, n2), e3)
      }
    }
    async _parseWorkerTile(e2, t2) {
      let n2 = this.tileState.getParsing(e2.uid),
        r2 = await e2.parse(
          e2.vectorTile,
          this.layerIndex,
          this.availableImages,
          this.actor,
          t2.subdivisionGranularity
        )
      if (n2) {
        let {rawData: t3} = n2
        ;((r2 = y({rawTileData: t3.slice(0), encoding: `mvt`}, r2)),
          this.tileState.removeParsing(e2.uid))
      }
      return r2
    }
    async abortTile(e2) {
      this.tileState.abort(e2.uid)
    }
    async removeTile(e2) {
      this.tileState.removeLoaded(e2.uid)
    }
    async loadData(e2) {
      this._pendingRequest?.abort()
      let t2 = this._startRequestTiming(e2)
      this._pendingRequest = new AbortController()
      try {
        ;(await this.loadAndProcessGeoJSON(e2, this._pendingRequest),
          delete this._pendingRequest,
          this.tileState.clearLoaded())
        let n2 = {}
        return (
          e2.request && (n2.data = e2.data),
          this._finishRequestTiming(t2, e2, n2),
          n2
        )
      } catch (e3) {
        if ((delete this._pendingRequest, !l(e3))) throw e3
        return {abandoned: true}
      }
    }
    _startRequestTiming(e2) {
      if (e2.request?.collectResourceTiming) return new Y(e2.request.url)
    }
    _finishRequestTiming(e2, t2, n2) {
      let r2 = e2?.finish()
      r2 && (n2.resourceTiming = {[t2.source]: JSON.parse(JSON.stringify(r2))})
    }
    async reloadTile(e2) {
      let t2 = e2.uid,
        n2 = this.tileState.getLoaded(t2)
      if (!n2) return await this.loadTile(e2)
      if (n2.vectorTile)
        return (
          (n2.showCollisionBoxes = e2.showCollisionBoxes),
          await this._parseWorkerTile(n2, e2)
        )
    }
    async loadAndProcessGeoJSON(e2, t2) {
      if ((e2.request && (e2.data = (await i(e2.request, t2)).data), e2.data)) {
        ;((e2.data = this._filterGeoJSON(e2.data, e2.filter, e2.source)),
          (this._geoJSONIndex = this._createGeoJSONIndex(e2.data, e2)))
        return
      }
      if (e2.dataDiff) {
        ;((this._geoJSONIndex ??= this._createGeoJSONIndex(
          {type: `FeatureCollection`, features: []},
          e2
        )),
          this._geoJSONIndex.updateData(
            e2.dataDiff,
            this._getFilterPredicate(e2.filter, e2.source)
          ))
        return
      }
      if (
        (e2.updateCluster &&
          this._geoJSONIndex.updateClusterOptions(
            e2.geojsonVtOptions.cluster,
            Z(e2)
          ),
        this._geoJSONIndex == null)
      )
        throw Error(
          `Input data given to '${e2.source}' is not a valid GeoJSON object.`
        )
    }
    _filterGeoJSON(e2, t2, n2) {
      if (e2.type !== `FeatureCollection`) return e2
      let r2 = this._getFilterPredicate(t2, n2)
      return r2
        ? {
            type: `FeatureCollection`,
            features: e2.features.filter(e3 => r2(e3)),
          }
        : e2
    }
    _getFilterPredicate(e2, t2) {
      if (typeof e2 != `boolean` && !e2?.length) return
      let n2 = j(e2, `sources.${t2}.filter`, {
        type: `boolean`,
        "property-type": `data-driven`,
        overridable: false,
        transition: false,
      })
      if (n2.result === `error`)
        throw Error(n2.value.map(e3 => `${e3.key}: ${e3.message}`).join(`, `))
      return e3 => n2.value.evaluate({zoom: 0}, e3)
    }
    async removeSource(e2) {
      this._pendingRequest?.abort()
    }
    getClusterExpansionZoom(e2) {
      return this._geoJSONIndex.getClusterExpansionZoom(e2.clusterId)
    }
    getClusterChildren(e2) {
      return this._geoJSONIndex.getClusterChildren(e2.clusterId)
    }
    getClusterLeaves(e2) {
      return this._geoJSONIndex.getClusterLeaves(
        e2.clusterId,
        e2.limit,
        e2.offset
      )
    }
  }
function de(e2, t2) {
  let n2 = y(t2.geojsonVtOptions || {}, {
    updateable: true,
    clusterOptions: Z(t2),
  })
  return new o(e2, n2)
}
function Z({geojsonVtOptions: e2, clusterProperties: t2, source: n2}) {
  if (!t2 || !e2.clusterOptions) return e2.clusterOptions
  let r2 = {},
    i2 = {},
    a2 = {accumulated: null, zoom: 0},
    o2 = {properties: null},
    s2 = Object.keys(t2)
  for (let e3 of s2) {
    let [a3, o3] = t2[e3],
      s3 = j(o3, `sources.${n2}.clusterProperties.${e3}[1]`),
      c2 = j(
        typeof a3 == `string` ? [a3, [`accumulated`], [`get`, e3]] : a3,
        `sources.${n2}.clusterProperties.${e3}[0]`
      )
    ;((r2[e3] = s3.value), (i2[e3] = c2.value))
  }
  return (
    (e2.clusterOptions.map = e3 => {
      o2.properties = e3
      let t3 = {}
      for (let e4 of s2) t3[e4] = r2[e4].evaluate(a2, o2)
      return t3
    }),
    (e2.clusterOptions.reduce = (e3, t3) => {
      o2.properties = t3
      for (let t4 of s2)
        ((a2.accumulated = e3[t4]), (e3[t4] = i2[t4].evaluate(a2, o2)))
    }),
    e2.clusterOptions
  )
}
async function Q(e2) {
  if (e2.endsWith(`.mjs`)) {
    await import(e2)
    return
  }
  let t2 = await fetch(e2, {credentials: `same-origin`})
  if (!t2.ok) throw Error(`Failed to load ${e2}: ${t2.status}`)
  let n2 = await t2.text()
  if (/^[ \t]*(import|export)\s/m.test(n2)) {
    let e3 = URL.createObjectURL(new Blob([n2], {type: `text/javascript`}))
    try {
      await import(e3)
    } finally {
      URL.revokeObjectURL(e3)
    }
    return
  }
  globalThis.eval(n2)
}
var $ = class {
  constructor(t2) {
    ;((this.self = t2),
      (this.actor = new R(t2)),
      (this.layerIndexes = {}),
      (this.availableImages = {}),
      (this.workerSources = {}),
      (this.demWorkerSources = {}),
      (this.externalWorkerSourceTypes = {}),
      (this.globalStates = /* @__PURE__ */ new Map()),
      (this.self.registerWorkerSource = (e2, t3) => {
        if (this.externalWorkerSourceTypes[e2])
          throw Error(`Worker source with name "${e2}" already registered.`)
        this.externalWorkerSourceTypes[e2] = t3
      }),
      (this.self.addProtocol = u),
      (this.self.removeProtocol = p),
      (this.self.registerRTLTextPlugin = e2 => {
        D.setMethods(e2)
      }),
      (this.self.makeRequest = e),
      this.actor.registerMessageHandler(`LDT`, (e2, t3) =>
        this._getDEMWorkerSource(e2, t3.source).loadTile(t3)
      ),
      this.actor.registerMessageHandler(`RDT`, async (e2, t3) => {
        this._getDEMWorkerSource(e2, t3.source).removeTile(t3)
      }),
      this.actor.registerMessageHandler(`GCEZ`, async (e2, t3) =>
        this._getWorkerSource(e2, t3.type, t3.source).getClusterExpansionZoom(
          t3
        )
      ),
      this.actor.registerMessageHandler(`GCC`, async (e2, t3) =>
        this._getWorkerSource(e2, t3.type, t3.source).getClusterChildren(t3)
      ),
      this.actor.registerMessageHandler(`GCL`, async (e2, t3) =>
        this._getWorkerSource(e2, t3.type, t3.source).getClusterLeaves(t3)
      ),
      this.actor.registerMessageHandler(`LD`, (e2, t3) =>
        this._getWorkerSource(e2, t3.type, t3.source).loadData(t3)
      ),
      this.actor.registerMessageHandler(`LT`, (e2, t3) =>
        this._getWorkerSource(e2, t3.type, t3.source).loadTile(t3)
      ),
      this.actor.registerMessageHandler(`RT`, (e2, t3) =>
        this._getWorkerSource(e2, t3.type, t3.source).reloadTile(t3)
      ),
      this.actor.registerMessageHandler(`AT`, (e2, t3) =>
        this._getWorkerSource(e2, t3.type, t3.source).abortTile(t3)
      ),
      this.actor.registerMessageHandler(`RMT`, (e2, t3) =>
        this._getWorkerSource(e2, t3.type, t3.source).removeTile(t3)
      ),
      this.actor.registerMessageHandler(`RS`, async (e2, t3) => {
        if (!this.workerSources[e2]?.[t3.type]?.[t3.source]) return
        let n2 = this.workerSources[e2][t3.type][t3.source]
        ;(delete this.workerSources[e2][t3.type][t3.source],
          n2.removeSource !== void 0 && n2.removeSource(t3))
      }),
      this.actor.registerMessageHandler(`RM`, async e2 => {
        ;(delete this.layerIndexes[e2],
          delete this.availableImages[e2],
          delete this.workerSources[e2],
          delete this.demWorkerSources[e2],
          this.globalStates.delete(e2))
      }),
      this.actor.registerMessageHandler(`SR`, async (e2, t3) => {
        this.referrer = t3
      }),
      this.actor.registerMessageHandler(`SRPS`, (e2, t3) =>
        this._syncRTLPluginState(e2, t3)
      ),
      this.actor.registerMessageHandler(`IS`, async (e2, t3) => {
        await Q(t3)
      }),
      this.actor.registerMessageHandler(`SI`, (e2, t3) =>
        this._setImages(e2, t3)
      ),
      this.actor.registerMessageHandler(`UL`, async (e2, t3) => {
        this._getLayerIndex(e2).update(
          t3.layers,
          t3.removedIds,
          this._getGlobalState(e2)
        )
      }),
      this.actor.registerMessageHandler(`UGS`, async (e2, t3) => {
        let n2 = this._getGlobalState(e2)
        for (let e3 in t3) n2[e3] = t3[e3]
      }),
      this.actor.registerMessageHandler(`SL`, async (e2, t3) => {
        this._getLayerIndex(e2).replace(t3, this._getGlobalState(e2))
      }))
  }
  _getGlobalState(e2) {
    let t2 = this.globalStates.get(e2)
    return (t2 || ((t2 = {}), this.globalStates.set(e2, t2)), t2)
  }
  async _setImages(e2, t2) {
    this.availableImages[e2] = t2
    for (let n2 in this.workerSources[e2]) {
      let r2 = this.workerSources[e2][n2]
      for (let e3 in r2) r2[e3].availableImages = t2
    }
  }
  async _syncRTLPluginState(e2, t2) {
    return await D.syncState(t2, Q)
  }
  _getAvailableImages(e2) {
    let t2 = this.availableImages[e2]
    return ((t2 ||= []), t2)
  }
  _getLayerIndex(e2) {
    let t2 = this.layerIndexes[e2]
    return ((t2 ||= this.layerIndexes[e2] = new W()), t2)
  }
  _getWorkerSource(e2, t2, n2) {
    if (
      ((this.workerSources[e2] ||= {}),
      (this.workerSources[e2][t2] ||= {}),
      !this.workerSources[e2][t2][n2])
    ) {
      let r2 = {
        sendAsync: (t3, n3) => (
          (t3.targetMapId = e2),
          this.actor.sendAsync(t3, n3)
        ),
      }
      switch (t2) {
        case `vector`:
          this.workerSources[e2][t2][n2] = new le(
            r2,
            this._getLayerIndex(e2),
            this._getAvailableImages(e2)
          )
          break
        case `geojson`:
          this.workerSources[e2][t2][n2] = new ue(
            r2,
            this._getLayerIndex(e2),
            this._getAvailableImages(e2)
          )
          break
        default:
          this.workerSources[e2][t2][n2] = new this.externalWorkerSourceTypes[
            t2
          ](r2, this._getLayerIndex(e2), this._getAvailableImages(e2))
      }
    }
    return this.workerSources[e2][t2][n2]
  }
  _getDEMWorkerSource(e2, t2) {
    return (
      (this.demWorkerSources[e2] ||= {}),
      (this.demWorkerSources[e2][t2] ||= new X()),
      this.demWorkerSources[e2][t2]
    )
  }
}
L(self) && (self.worker = new $(self))
export {$ as default}
