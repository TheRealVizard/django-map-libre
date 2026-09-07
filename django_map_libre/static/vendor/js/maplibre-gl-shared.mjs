/**
 * MapLibre GL JS
 * @license 3-Clause BSD. Full text of license: https://github.com/maplibre/maplibre-gl-js/blob/v6.7.0/LICENSE.txt
 */
var e = Object.create,
  t = Object.defineProperty,
  n = Object.getOwnPropertyDescriptor,
  r = Object.getOwnPropertyNames,
  i = Object.getPrototypeOf,
  a = Object.prototype.hasOwnProperty,
  o = (e52, t2) => () => (
    t2 || (e52((t2 = {exports: {}}).exports, t2), (e52 = null)),
    t2.exports
  ),
  s = (e52, i2, o2, s2) => {
    if ((i2 && typeof i2 == `object`) || typeof i2 == `function`)
      for (var c2 = r(i2), l2 = 0, u2 = c2.length, d2; l2 < u2; l2++)
        ((d2 = c2[l2]),
          !a.call(e52, d2) &&
            d2 !== o2 &&
            t(e52, d2, {
              get: (e53 => i2[e53]).bind(null, d2),
              enumerable: !(s2 = n(i2, d2)) || s2.enumerable,
            }))
    return e52
  },
  c = (n2, r2, o2) => (
    (o2 = n2 == null ? {} : e(i(n2))),
    s(
      r2 || !n2 || !n2.__esModule || !a.call(n2, `default`)
        ? t(o2, `default`, {value: n2, enumerable: true})
        : o2,
      n2
    )
  )
function l(e52, t2) {
  ;((this.x = e52), (this.y = t2))
}
;((l.prototype = {
  clone() {
    return new l(this.x, this.y)
  },
  add(e52) {
    return this.clone()._add(e52)
  },
  sub(e52) {
    return this.clone()._sub(e52)
  },
  multByPoint(e52) {
    return this.clone()._multByPoint(e52)
  },
  divByPoint(e52) {
    return this.clone()._divByPoint(e52)
  },
  mult(e52) {
    return this.clone()._mult(e52)
  },
  div(e52) {
    return this.clone()._div(e52)
  },
  rotate(e52) {
    return this.clone()._rotate(e52)
  },
  rotateAround(e52, t2) {
    return this.clone()._rotateAround(e52, t2)
  },
  matMult(e52) {
    return this.clone()._matMult(e52)
  },
  unit() {
    return this.clone()._unit()
  },
  perp() {
    return this.clone()._perp()
  },
  round() {
    return this.clone()._round()
  },
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  },
  equals(e52) {
    return this.x === e52.x && this.y === e52.y
  },
  dist(e52) {
    return Math.sqrt(this.distSqr(e52))
  },
  distSqr(e52) {
    let t2 = e52.x - this.x,
      n2 = e52.y - this.y
    return t2 * t2 + n2 * n2
  },
  angle() {
    return Math.atan2(this.y, this.x)
  },
  angleTo(e52) {
    return Math.atan2(this.y - e52.y, this.x - e52.x)
  },
  angleWith(e52) {
    return this.angleWithSep(e52.x, e52.y)
  },
  angleWithSep(e52, t2) {
    return Math.atan2(this.x * t2 - this.y * e52, this.x * e52 + this.y * t2)
  },
  _matMult(e52) {
    let t2 = e52[0] * this.x + e52[1] * this.y,
      n2 = e52[2] * this.x + e52[3] * this.y
    return ((this.x = t2), (this.y = n2), this)
  },
  _add(e52) {
    return ((this.x += e52.x), (this.y += e52.y), this)
  },
  _sub(e52) {
    return ((this.x -= e52.x), (this.y -= e52.y), this)
  },
  _mult(e52) {
    return ((this.x *= e52), (this.y *= e52), this)
  },
  _div(e52) {
    return ((this.x /= e52), (this.y /= e52), this)
  },
  _multByPoint(e52) {
    return ((this.x *= e52.x), (this.y *= e52.y), this)
  },
  _divByPoint(e52) {
    return ((this.x /= e52.x), (this.y /= e52.y), this)
  },
  _unit() {
    return (this._div(this.mag()), this)
  },
  _perp() {
    let e52 = this.y
    return ((this.y = this.x), (this.x = -e52), this)
  },
  _rotate(e52) {
    let t2 = Math.cos(e52),
      n2 = Math.sin(e52),
      r2 = t2 * this.x - n2 * this.y,
      i2 = n2 * this.x + t2 * this.y
    return ((this.x = r2), (this.y = i2), this)
  },
  _rotateAround(e52, t2) {
    let n2 = Math.cos(e52),
      r2 = Math.sin(e52),
      i2 = t2.x + n2 * (this.x - t2.x) - r2 * (this.y - t2.y),
      a2 = t2.y + r2 * (this.x - t2.x) + n2 * (this.y - t2.y)
    return ((this.x = i2), (this.y = a2), this)
  },
  _round() {
    return ((this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this)
  },
  constructor: l,
}),
  (l.convert = function (e52) {
    if (e52 instanceof l) return e52
    if (Array.isArray(e52)) return new l(+e52[0], +e52[1])
    if (e52.x !== void 0 && e52.y !== void 0) return new l(+e52.x, +e52.y)
    throw Error(`Expected [x, y] or {x, y} point format`)
  }))
function u(e52, t2, n2, r2) {
  let i2 = 3 * e52,
    a2 = 3 * (n2 - e52) - i2,
    o2 = 1 - i2 - a2,
    s2 = 3 * t2,
    c2 = 3 * (r2 - t2) - s2,
    l2 = 1 - s2 - c2
  return function (e53, t3 = 1e-6) {
    if (e53 <= 0) return 0
    if (e53 >= 1) return 1
    let n3 = e53
    for (let r4 = 0; r4 < 8; r4++) {
      let r5 = ((o2 * n3 + a2) * n3 + i2) * n3 - e53
      if (Math.abs(r5) < t3) return ((l2 * n3 + c2) * n3 + s2) * n3
      let u3 = (3 * o2 * n3 + 2 * a2) * n3 + i2
      if (Math.abs(u3) < 1e-6) break
      n3 -= r5 / u3
    }
    let r3 = 0,
      u2 = 1
    n3 = e53
    for (let s3 = 0; s3 < 20; s3++) {
      let s4 = ((o2 * n3 + a2) * n3 + i2) * n3
      if (Math.abs(s4 - e53) < t3) break
      ;(e53 > s4 ? (r3 = n3) : (u2 = n3), (n3 = (r3 + u2) * 0.5))
    }
    return ((l2 * n3 + c2) * n3 + s2) * n3
  }
}
let d
function f() {
  return (
    (d ??=
      typeof OffscreenCanvas < `u` &&
      new OffscreenCanvas(1, 1).getContext(`2d`) &&
      typeof createImageBitmap == `function`),
    d
  )
}
let p
function m() {
  if (p == null && ((p = false), f())) {
    let e52 = new OffscreenCanvas(5, 5).getContext(`2d`, {
      willReadFrequently: true,
    })
    if (e52) {
      for (let t3 = 0; t3 < 25; t3++) {
        let n2 = t3 * 4
        ;((e52.fillStyle = `rgb(${n2},${n2 + 1},${n2 + 2})`),
          e52.fillRect(t3 % 5, Math.floor(t3 / 5), 1, 1))
      }
      let t2 = e52.getImageData(0, 0, 5, 5).data
      for (let e53 = 0; e53 < 100; e53++)
        if (e53 % 4 != 3 && t2[e53] !== e53) {
          p = true
          break
        }
    }
  }
  return p || false
}
var h = typeof Float32Array < `u` ? Float32Array : Array
;(Math.PI / 180, 180 / Math.PI)
function g() {
  var e52 = new h(9)
  return (
    h != Float32Array &&
      ((e52[1] = 0),
      (e52[2] = 0),
      (e52[3] = 0),
      (e52[5] = 0),
      (e52[6] = 0),
      (e52[7] = 0)),
    (e52[0] = 1),
    (e52[4] = 1),
    (e52[8] = 1),
    e52
  )
}
function _(e52) {
  var t2 = e52[0],
    n2 = e52[1],
    r2 = e52[2],
    i2 = e52[3],
    a2 = e52[4],
    o2 = e52[5],
    s2 = e52[6],
    c2 = e52[7],
    l2 = e52[8]
  return (
    t2 * (l2 * a2 - o2 * c2) +
    n2 * (-l2 * i2 + o2 * s2) +
    r2 * (c2 * i2 - a2 * s2)
  )
}
function v(e52, t2) {
  var n2 = Math.sin(t2),
    r2 = Math.cos(t2)
  return (
    (e52[0] = r2),
    (e52[1] = n2),
    (e52[2] = 0),
    (e52[3] = -n2),
    (e52[4] = r2),
    (e52[5] = 0),
    (e52[6] = 0),
    (e52[7] = 0),
    (e52[8] = 1),
    e52
  )
}
function y(e52, t2) {
  var n2 = t2[0],
    r2 = t2[1],
    i2 = t2[2],
    a2 = t2[3],
    o2 = n2 + n2,
    s2 = r2 + r2,
    c2 = i2 + i2,
    l2 = n2 * o2,
    u2 = r2 * o2,
    d2 = r2 * s2,
    f2 = i2 * o2,
    p2 = i2 * s2,
    m2 = i2 * c2,
    h2 = a2 * o2,
    g2 = a2 * s2,
    _2 = a2 * c2
  return (
    (e52[0] = 1 - d2 - m2),
    (e52[3] = u2 - _2),
    (e52[6] = f2 + g2),
    (e52[1] = u2 + _2),
    (e52[4] = 1 - l2 - m2),
    (e52[7] = p2 - h2),
    (e52[2] = f2 - g2),
    (e52[5] = p2 + h2),
    (e52[8] = 1 - l2 - d2),
    e52
  )
}
function b() {
  var e52 = new h(16)
  return (
    h != Float32Array &&
      ((e52[1] = 0),
      (e52[2] = 0),
      (e52[3] = 0),
      (e52[4] = 0),
      (e52[6] = 0),
      (e52[7] = 0),
      (e52[8] = 0),
      (e52[9] = 0),
      (e52[11] = 0),
      (e52[12] = 0),
      (e52[13] = 0),
      (e52[14] = 0)),
    (e52[0] = 1),
    (e52[5] = 1),
    (e52[10] = 1),
    (e52[15] = 1),
    e52
  )
}
function x(e52) {
  var t2 = new h(16)
  return (
    (t2[0] = e52[0]),
    (t2[1] = e52[1]),
    (t2[2] = e52[2]),
    (t2[3] = e52[3]),
    (t2[4] = e52[4]),
    (t2[5] = e52[5]),
    (t2[6] = e52[6]),
    (t2[7] = e52[7]),
    (t2[8] = e52[8]),
    (t2[9] = e52[9]),
    (t2[10] = e52[10]),
    (t2[11] = e52[11]),
    (t2[12] = e52[12]),
    (t2[13] = e52[13]),
    (t2[14] = e52[14]),
    (t2[15] = e52[15]),
    t2
  )
}
function S(e52, t2) {
  return (
    (e52[0] = t2[0]),
    (e52[1] = t2[1]),
    (e52[2] = t2[2]),
    (e52[3] = t2[3]),
    (e52[4] = t2[4]),
    (e52[5] = t2[5]),
    (e52[6] = t2[6]),
    (e52[7] = t2[7]),
    (e52[8] = t2[8]),
    (e52[9] = t2[9]),
    (e52[10] = t2[10]),
    (e52[11] = t2[11]),
    (e52[12] = t2[12]),
    (e52[13] = t2[13]),
    (e52[14] = t2[14]),
    (e52[15] = t2[15]),
    e52
  )
}
function C(e52) {
  return (
    (e52[0] = 1),
    (e52[1] = 0),
    (e52[2] = 0),
    (e52[3] = 0),
    (e52[4] = 0),
    (e52[5] = 1),
    (e52[6] = 0),
    (e52[7] = 0),
    (e52[8] = 0),
    (e52[9] = 0),
    (e52[10] = 1),
    (e52[11] = 0),
    (e52[12] = 0),
    (e52[13] = 0),
    (e52[14] = 0),
    (e52[15] = 1),
    e52
  )
}
function w(e52, t2) {
  var n2 = t2[0],
    r2 = t2[1],
    i2 = t2[2],
    a2 = t2[3],
    o2 = t2[4],
    s2 = t2[5],
    c2 = t2[6],
    l2 = t2[7],
    u2 = t2[8],
    d2 = t2[9],
    f2 = t2[10],
    p2 = t2[11],
    m2 = t2[12],
    h2 = t2[13],
    g2 = t2[14],
    _2 = t2[15],
    v2 = n2 * s2 - r2 * o2,
    y2 = n2 * c2 - i2 * o2,
    b2 = n2 * l2 - a2 * o2,
    x2 = r2 * c2 - i2 * s2,
    S2 = r2 * l2 - a2 * s2,
    C2 = i2 * l2 - a2 * c2,
    w2 = u2 * h2 - d2 * m2,
    T2 = u2 * g2 - f2 * m2,
    E2 = u2 * _2 - p2 * m2,
    D2 = d2 * g2 - f2 * h2,
    O2 = d2 * _2 - p2 * h2,
    k2 = f2 * _2 - p2 * g2,
    A2 = v2 * k2 - y2 * O2 + b2 * D2 + x2 * E2 - S2 * T2 + C2 * w2
  return A2
    ? ((A2 = 1 / A2),
      (e52[0] = (s2 * k2 - c2 * O2 + l2 * D2) * A2),
      (e52[1] = (i2 * O2 - r2 * k2 - a2 * D2) * A2),
      (e52[2] = (h2 * C2 - g2 * S2 + _2 * x2) * A2),
      (e52[3] = (f2 * S2 - d2 * C2 - p2 * x2) * A2),
      (e52[4] = (c2 * E2 - o2 * k2 - l2 * T2) * A2),
      (e52[5] = (n2 * k2 - i2 * E2 + a2 * T2) * A2),
      (e52[6] = (g2 * b2 - m2 * C2 - _2 * y2) * A2),
      (e52[7] = (u2 * C2 - f2 * b2 + p2 * y2) * A2),
      (e52[8] = (o2 * O2 - s2 * E2 + l2 * w2) * A2),
      (e52[9] = (r2 * E2 - n2 * O2 - a2 * w2) * A2),
      (e52[10] = (m2 * S2 - h2 * b2 + _2 * v2) * A2),
      (e52[11] = (d2 * b2 - u2 * S2 - p2 * v2) * A2),
      (e52[12] = (s2 * T2 - o2 * D2 - c2 * w2) * A2),
      (e52[13] = (n2 * D2 - r2 * T2 + i2 * w2) * A2),
      (e52[14] = (h2 * y2 - m2 * x2 - g2 * v2) * A2),
      (e52[15] = (u2 * x2 - d2 * y2 + f2 * v2) * A2),
      e52)
    : null
}
function T(e52, t2, n2) {
  var r2 = t2[0],
    i2 = t2[1],
    a2 = t2[2],
    o2 = t2[3],
    s2 = t2[4],
    c2 = t2[5],
    l2 = t2[6],
    u2 = t2[7],
    d2 = t2[8],
    f2 = t2[9],
    p2 = t2[10],
    m2 = t2[11],
    h2 = t2[12],
    g2 = t2[13],
    _2 = t2[14],
    v2 = t2[15],
    y2 = n2[0],
    b2 = n2[1],
    x2 = n2[2],
    S2 = n2[3]
  return (
    (e52[0] = y2 * r2 + b2 * s2 + x2 * d2 + S2 * h2),
    (e52[1] = y2 * i2 + b2 * c2 + x2 * f2 + S2 * g2),
    (e52[2] = y2 * a2 + b2 * l2 + x2 * p2 + S2 * _2),
    (e52[3] = y2 * o2 + b2 * u2 + x2 * m2 + S2 * v2),
    (y2 = n2[4]),
    (b2 = n2[5]),
    (x2 = n2[6]),
    (S2 = n2[7]),
    (e52[4] = y2 * r2 + b2 * s2 + x2 * d2 + S2 * h2),
    (e52[5] = y2 * i2 + b2 * c2 + x2 * f2 + S2 * g2),
    (e52[6] = y2 * a2 + b2 * l2 + x2 * p2 + S2 * _2),
    (e52[7] = y2 * o2 + b2 * u2 + x2 * m2 + S2 * v2),
    (y2 = n2[8]),
    (b2 = n2[9]),
    (x2 = n2[10]),
    (S2 = n2[11]),
    (e52[8] = y2 * r2 + b2 * s2 + x2 * d2 + S2 * h2),
    (e52[9] = y2 * i2 + b2 * c2 + x2 * f2 + S2 * g2),
    (e52[10] = y2 * a2 + b2 * l2 + x2 * p2 + S2 * _2),
    (e52[11] = y2 * o2 + b2 * u2 + x2 * m2 + S2 * v2),
    (y2 = n2[12]),
    (b2 = n2[13]),
    (x2 = n2[14]),
    (S2 = n2[15]),
    (e52[12] = y2 * r2 + b2 * s2 + x2 * d2 + S2 * h2),
    (e52[13] = y2 * i2 + b2 * c2 + x2 * f2 + S2 * g2),
    (e52[14] = y2 * a2 + b2 * l2 + x2 * p2 + S2 * _2),
    (e52[15] = y2 * o2 + b2 * u2 + x2 * m2 + S2 * v2),
    e52
  )
}
function E(e52, t2, n2) {
  var r2 = n2[0],
    i2 = n2[1],
    a2 = n2[2],
    o2,
    s2,
    c2,
    l2,
    u2,
    d2,
    f2,
    p2,
    m2,
    h2,
    g2,
    _2
  return (
    t2 === e52
      ? ((e52[12] = t2[0] * r2 + t2[4] * i2 + t2[8] * a2 + t2[12]),
        (e52[13] = t2[1] * r2 + t2[5] * i2 + t2[9] * a2 + t2[13]),
        (e52[14] = t2[2] * r2 + t2[6] * i2 + t2[10] * a2 + t2[14]),
        (e52[15] = t2[3] * r2 + t2[7] * i2 + t2[11] * a2 + t2[15]))
      : ((o2 = t2[0]),
        (s2 = t2[1]),
        (c2 = t2[2]),
        (l2 = t2[3]),
        (u2 = t2[4]),
        (d2 = t2[5]),
        (f2 = t2[6]),
        (p2 = t2[7]),
        (m2 = t2[8]),
        (h2 = t2[9]),
        (g2 = t2[10]),
        (_2 = t2[11]),
        (e52[0] = o2),
        (e52[1] = s2),
        (e52[2] = c2),
        (e52[3] = l2),
        (e52[4] = u2),
        (e52[5] = d2),
        (e52[6] = f2),
        (e52[7] = p2),
        (e52[8] = m2),
        (e52[9] = h2),
        (e52[10] = g2),
        (e52[11] = _2),
        (e52[12] = o2 * r2 + u2 * i2 + m2 * a2 + t2[12]),
        (e52[13] = s2 * r2 + d2 * i2 + h2 * a2 + t2[13]),
        (e52[14] = c2 * r2 + f2 * i2 + g2 * a2 + t2[14]),
        (e52[15] = l2 * r2 + p2 * i2 + _2 * a2 + t2[15])),
    e52
  )
}
function D(e52, t2, n2) {
  var r2 = n2[0],
    i2 = n2[1],
    a2 = n2[2]
  return (
    (e52[0] = t2[0] * r2),
    (e52[1] = t2[1] * r2),
    (e52[2] = t2[2] * r2),
    (e52[3] = t2[3] * r2),
    (e52[4] = t2[4] * i2),
    (e52[5] = t2[5] * i2),
    (e52[6] = t2[6] * i2),
    (e52[7] = t2[7] * i2),
    (e52[8] = t2[8] * a2),
    (e52[9] = t2[9] * a2),
    (e52[10] = t2[10] * a2),
    (e52[11] = t2[11] * a2),
    (e52[12] = t2[12]),
    (e52[13] = t2[13]),
    (e52[14] = t2[14]),
    (e52[15] = t2[15]),
    e52
  )
}
function O(e52, t2, n2) {
  var r2 = Math.sin(n2),
    i2 = Math.cos(n2),
    a2 = t2[4],
    o2 = t2[5],
    s2 = t2[6],
    c2 = t2[7],
    l2 = t2[8],
    u2 = t2[9],
    d2 = t2[10],
    f2 = t2[11]
  return (
    t2 !== e52 &&
      ((e52[0] = t2[0]),
      (e52[1] = t2[1]),
      (e52[2] = t2[2]),
      (e52[3] = t2[3]),
      (e52[12] = t2[12]),
      (e52[13] = t2[13]),
      (e52[14] = t2[14]),
      (e52[15] = t2[15])),
    (e52[4] = a2 * i2 + l2 * r2),
    (e52[5] = o2 * i2 + u2 * r2),
    (e52[6] = s2 * i2 + d2 * r2),
    (e52[7] = c2 * i2 + f2 * r2),
    (e52[8] = l2 * i2 - a2 * r2),
    (e52[9] = u2 * i2 - o2 * r2),
    (e52[10] = d2 * i2 - s2 * r2),
    (e52[11] = f2 * i2 - c2 * r2),
    e52
  )
}
function k(e52, t2, n2) {
  var r2 = Math.sin(n2),
    i2 = Math.cos(n2),
    a2 = t2[0],
    o2 = t2[1],
    s2 = t2[2],
    c2 = t2[3],
    l2 = t2[8],
    u2 = t2[9],
    d2 = t2[10],
    f2 = t2[11]
  return (
    t2 !== e52 &&
      ((e52[4] = t2[4]),
      (e52[5] = t2[5]),
      (e52[6] = t2[6]),
      (e52[7] = t2[7]),
      (e52[12] = t2[12]),
      (e52[13] = t2[13]),
      (e52[14] = t2[14]),
      (e52[15] = t2[15])),
    (e52[0] = a2 * i2 - l2 * r2),
    (e52[1] = o2 * i2 - u2 * r2),
    (e52[2] = s2 * i2 - d2 * r2),
    (e52[3] = c2 * i2 - f2 * r2),
    (e52[8] = a2 * r2 + l2 * i2),
    (e52[9] = o2 * r2 + u2 * i2),
    (e52[10] = s2 * r2 + d2 * i2),
    (e52[11] = c2 * r2 + f2 * i2),
    e52
  )
}
function A(e52, t2, n2) {
  var r2 = Math.sin(n2),
    i2 = Math.cos(n2),
    a2 = t2[0],
    o2 = t2[1],
    s2 = t2[2],
    c2 = t2[3],
    l2 = t2[4],
    u2 = t2[5],
    d2 = t2[6],
    f2 = t2[7]
  return (
    t2 !== e52 &&
      ((e52[8] = t2[8]),
      (e52[9] = t2[9]),
      (e52[10] = t2[10]),
      (e52[11] = t2[11]),
      (e52[12] = t2[12]),
      (e52[13] = t2[13]),
      (e52[14] = t2[14]),
      (e52[15] = t2[15])),
    (e52[0] = a2 * i2 + l2 * r2),
    (e52[1] = o2 * i2 + u2 * r2),
    (e52[2] = s2 * i2 + d2 * r2),
    (e52[3] = c2 * i2 + f2 * r2),
    (e52[4] = l2 * i2 - a2 * r2),
    (e52[5] = u2 * i2 - o2 * r2),
    (e52[6] = d2 * i2 - s2 * r2),
    (e52[7] = f2 * i2 - c2 * r2),
    e52
  )
}
function ee(e52, t2) {
  return (
    (e52[0] = t2[0]),
    (e52[1] = 0),
    (e52[2] = 0),
    (e52[3] = 0),
    (e52[4] = 0),
    (e52[5] = t2[1]),
    (e52[6] = 0),
    (e52[7] = 0),
    (e52[8] = 0),
    (e52[9] = 0),
    (e52[10] = t2[2]),
    (e52[11] = 0),
    (e52[12] = 0),
    (e52[13] = 0),
    (e52[14] = 0),
    (e52[15] = 1),
    e52
  )
}
function te(e52, t2, n2, r2, i2) {
  var a2 = 1 / Math.tan(t2 / 2)
  if (
    ((e52[0] = a2 / n2),
    (e52[1] = 0),
    (e52[2] = 0),
    (e52[3] = 0),
    (e52[4] = 0),
    (e52[5] = a2),
    (e52[6] = 0),
    (e52[7] = 0),
    (e52[8] = 0),
    (e52[9] = 0),
    (e52[11] = -1),
    (e52[12] = 0),
    (e52[13] = 0),
    (e52[15] = 0),
    i2 != null && i2 !== 1 / 0)
  ) {
    var o2 = 1 / (r2 - i2)
    ;((e52[10] = (i2 + r2) * o2), (e52[14] = 2 * i2 * r2 * o2))
  } else ((e52[10] = -1), (e52[14] = -2 * r2))
  return e52
}
var ne = te
function re(e52, t2, n2, r2, i2, a2, o2) {
  var s2 = 1 / (t2 - n2),
    c2 = 1 / (r2 - i2),
    l2 = 1 / (a2 - o2)
  return (
    (e52[0] = -2 * s2),
    (e52[1] = 0),
    (e52[2] = 0),
    (e52[3] = 0),
    (e52[4] = 0),
    (e52[5] = -2 * c2),
    (e52[6] = 0),
    (e52[7] = 0),
    (e52[8] = 0),
    (e52[9] = 0),
    (e52[10] = 2 * l2),
    (e52[11] = 0),
    (e52[12] = (t2 + n2) * s2),
    (e52[13] = (i2 + r2) * c2),
    (e52[14] = (o2 + a2) * l2),
    (e52[15] = 1),
    e52
  )
}
var ie = re
function ae(e52, t2) {
  return (
    e52[0] === t2[0] &&
    e52[1] === t2[1] &&
    e52[2] === t2[2] &&
    e52[3] === t2[3] &&
    e52[4] === t2[4] &&
    e52[5] === t2[5] &&
    e52[6] === t2[6] &&
    e52[7] === t2[7] &&
    e52[8] === t2[8] &&
    e52[9] === t2[9] &&
    e52[10] === t2[10] &&
    e52[11] === t2[11] &&
    e52[12] === t2[12] &&
    e52[13] === t2[13] &&
    e52[14] === t2[14] &&
    e52[15] === t2[15]
  )
}
function oe(e52, t2) {
  var n2 = e52[0],
    r2 = e52[1],
    i2 = e52[2],
    a2 = e52[3],
    o2 = e52[4],
    s2 = e52[5],
    c2 = e52[6],
    l2 = e52[7],
    u2 = e52[8],
    d2 = e52[9],
    f2 = e52[10],
    p2 = e52[11],
    m2 = e52[12],
    h2 = e52[13],
    g2 = e52[14],
    _2 = e52[15],
    v2 = t2[0],
    y2 = t2[1],
    b2 = t2[2],
    x2 = t2[3],
    S2 = t2[4],
    C2 = t2[5],
    w2 = t2[6],
    T2 = t2[7],
    E2 = t2[8],
    D2 = t2[9],
    O2 = t2[10],
    k2 = t2[11],
    A2 = t2[12],
    ee2 = t2[13],
    te2 = t2[14],
    ne2 = t2[15]
  return (
    Math.abs(n2 - v2) <= 1e-6 * Math.max(1, Math.abs(n2), Math.abs(v2)) &&
    Math.abs(r2 - y2) <= 1e-6 * Math.max(1, Math.abs(r2), Math.abs(y2)) &&
    Math.abs(i2 - b2) <= 1e-6 * Math.max(1, Math.abs(i2), Math.abs(b2)) &&
    Math.abs(a2 - x2) <= 1e-6 * Math.max(1, Math.abs(a2), Math.abs(x2)) &&
    Math.abs(o2 - S2) <= 1e-6 * Math.max(1, Math.abs(o2), Math.abs(S2)) &&
    Math.abs(s2 - C2) <= 1e-6 * Math.max(1, Math.abs(s2), Math.abs(C2)) &&
    Math.abs(c2 - w2) <= 1e-6 * Math.max(1, Math.abs(c2), Math.abs(w2)) &&
    Math.abs(l2 - T2) <= 1e-6 * Math.max(1, Math.abs(l2), Math.abs(T2)) &&
    Math.abs(u2 - E2) <= 1e-6 * Math.max(1, Math.abs(u2), Math.abs(E2)) &&
    Math.abs(d2 - D2) <= 1e-6 * Math.max(1, Math.abs(d2), Math.abs(D2)) &&
    Math.abs(f2 - O2) <= 1e-6 * Math.max(1, Math.abs(f2), Math.abs(O2)) &&
    Math.abs(p2 - k2) <= 1e-6 * Math.max(1, Math.abs(p2), Math.abs(k2)) &&
    Math.abs(m2 - A2) <= 1e-6 * Math.max(1, Math.abs(m2), Math.abs(A2)) &&
    Math.abs(h2 - ee2) <= 1e-6 * Math.max(1, Math.abs(h2), Math.abs(ee2)) &&
    Math.abs(g2 - te2) <= 1e-6 * Math.max(1, Math.abs(g2), Math.abs(te2)) &&
    Math.abs(_2 - ne2) <= 1e-6 * Math.max(1, Math.abs(_2), Math.abs(ne2))
  )
}
function se() {
  var e52 = new h(3)
  return (h != Float32Array && ((e52[0] = 0), (e52[1] = 0), (e52[2] = 0)), e52)
}
function ce(e52) {
  var t2 = new h(3)
  return ((t2[0] = e52[0]), (t2[1] = e52[1]), (t2[2] = e52[2]), t2)
}
function le(e52) {
  var t2 = e52[0],
    n2 = e52[1],
    r2 = e52[2]
  return Math.sqrt(t2 * t2 + n2 * n2 + r2 * r2)
}
function ue(e52, t2, n2) {
  var r2 = new h(3)
  return ((r2[0] = e52), (r2[1] = t2), (r2[2] = n2), r2)
}
function de(e52, t2, n2) {
  return (
    (e52[0] = t2[0] + n2[0]),
    (e52[1] = t2[1] + n2[1]),
    (e52[2] = t2[2] + n2[2]),
    e52
  )
}
function fe(e52, t2, n2) {
  return (
    (e52[0] = t2[0] - n2[0]),
    (e52[1] = t2[1] - n2[1]),
    (e52[2] = t2[2] - n2[2]),
    e52
  )
}
function pe(e52, t2, n2) {
  return (
    (e52[0] = t2[0] * n2), (e52[1] = t2[1] * n2), (e52[2] = t2[2] * n2), e52
  )
}
function me(e52, t2, n2, r2) {
  return (
    (e52[0] = t2[0] + n2[0] * r2),
    (e52[1] = t2[1] + n2[1] * r2),
    (e52[2] = t2[2] + n2[2] * r2),
    e52
  )
}
function he(e52, t2) {
  return ((e52[0] = -t2[0]), (e52[1] = -t2[1]), (e52[2] = -t2[2]), e52)
}
function ge(e52, t2) {
  var n2 = t2[0],
    r2 = t2[1],
    i2 = t2[2],
    a2 = n2 * n2 + r2 * r2 + i2 * i2
  return (
    a2 > 0 && (a2 = 1 / Math.sqrt(a2)),
    (e52[0] = t2[0] * a2),
    (e52[1] = t2[1] * a2),
    (e52[2] = t2[2] * a2),
    e52
  )
}
function _e(e52, t2) {
  return e52[0] * t2[0] + e52[1] * t2[1] + e52[2] * t2[2]
}
function ve(e52, t2, n2) {
  var r2 = t2[0],
    i2 = t2[1],
    a2 = t2[2],
    o2 = n2[0],
    s2 = n2[1],
    c2 = n2[2]
  return (
    (e52[0] = i2 * c2 - a2 * s2),
    (e52[1] = a2 * o2 - r2 * c2),
    (e52[2] = r2 * s2 - i2 * o2),
    e52
  )
}
function ye(e52, t2, n2) {
  var r2 = t2[0],
    i2 = t2[1],
    a2 = t2[2],
    o2 = n2[3] * r2 + n2[7] * i2 + n2[11] * a2 + n2[15]
  return (
    (o2 ||= 1),
    (e52[0] = (n2[0] * r2 + n2[4] * i2 + n2[8] * a2 + n2[12]) / o2),
    (e52[1] = (n2[1] * r2 + n2[5] * i2 + n2[9] * a2 + n2[13]) / o2),
    (e52[2] = (n2[2] * r2 + n2[6] * i2 + n2[10] * a2 + n2[14]) / o2),
    e52
  )
}
function be(e52, t2, n2) {
  var r2 = t2[0],
    i2 = t2[1],
    a2 = t2[2]
  return (
    (e52[0] = r2 * n2[0] + i2 * n2[3] + a2 * n2[6]),
    (e52[1] = r2 * n2[1] + i2 * n2[4] + a2 * n2[7]),
    (e52[2] = r2 * n2[2] + i2 * n2[5] + a2 * n2[8]),
    e52
  )
}
function xe(e52, t2, n2) {
  var r2 = n2[0],
    i2 = n2[1],
    a2 = n2[2],
    o2 = n2[3],
    s2 = t2[0],
    c2 = t2[1],
    l2 = t2[2],
    u2 = i2 * l2 - a2 * c2,
    d2 = a2 * s2 - r2 * l2,
    f2 = r2 * c2 - i2 * s2
  return (
    (u2 += u2),
    (d2 += d2),
    (f2 += f2),
    (e52[0] = s2 + o2 * u2 + i2 * f2 - a2 * d2),
    (e52[1] = c2 + o2 * d2 + a2 * u2 - r2 * f2),
    (e52[2] = l2 + o2 * f2 + r2 * d2 - i2 * u2),
    e52
  )
}
function Se(e52, t2, n2, r2) {
  var i2 = [],
    a2 = []
  return (
    (i2[0] = t2[0] - n2[0]),
    (i2[1] = t2[1] - n2[1]),
    (i2[2] = t2[2] - n2[2]),
    (a2[0] = i2[0]),
    (a2[1] = i2[1] * Math.cos(r2) - i2[2] * Math.sin(r2)),
    (a2[2] = i2[1] * Math.sin(r2) + i2[2] * Math.cos(r2)),
    (e52[0] = a2[0] + n2[0]),
    (e52[1] = a2[1] + n2[1]),
    (e52[2] = a2[2] + n2[2]),
    e52
  )
}
function Ce(e52, t2, n2, r2) {
  var i2 = [],
    a2 = []
  return (
    (i2[0] = t2[0] - n2[0]),
    (i2[1] = t2[1] - n2[1]),
    (i2[2] = t2[2] - n2[2]),
    (a2[0] = i2[2] * Math.sin(r2) + i2[0] * Math.cos(r2)),
    (a2[1] = i2[1]),
    (a2[2] = i2[2] * Math.cos(r2) - i2[0] * Math.sin(r2)),
    (e52[0] = a2[0] + n2[0]),
    (e52[1] = a2[1] + n2[1]),
    (e52[2] = a2[2] + n2[2]),
    e52
  )
}
function we(e52, t2, n2, r2) {
  var i2 = [],
    a2 = []
  return (
    (i2[0] = t2[0] - n2[0]),
    (i2[1] = t2[1] - n2[1]),
    (i2[2] = t2[2] - n2[2]),
    (a2[0] = i2[0] * Math.cos(r2) - i2[1] * Math.sin(r2)),
    (a2[1] = i2[0] * Math.sin(r2) + i2[1] * Math.cos(r2)),
    (a2[2] = i2[2]),
    (e52[0] = a2[0] + n2[0]),
    (e52[1] = a2[1] + n2[1]),
    (e52[2] = a2[2] + n2[2]),
    e52
  )
}
function Te(e52) {
  return ((e52[0] = 0), (e52[1] = 0), (e52[2] = 0), e52)
}
var Ee = fe,
  De = le
;(function () {
  var e52 = se()
  return function (t2, n2, r2, i2, a2, o2) {
    var s2, c2
    for (
      n2 ||= 3,
        r2 ||= 0,
        c2 = i2 ? Math.min(i2 * n2 + r2, t2.length) : t2.length,
        s2 = r2;
      s2 < c2;
      s2 += n2
    )
      ((e52[0] = t2[s2]),
        (e52[1] = t2[s2 + 1]),
        (e52[2] = t2[s2 + 2]),
        a2(e52, e52, o2),
        (t2[s2] = e52[0]),
        (t2[s2 + 1] = e52[1]),
        (t2[s2 + 2] = e52[2]))
    return t2
  }
})()
function Oe() {
  var e52 = new h(4)
  return (
    h != Float32Array &&
      ((e52[0] = 0), (e52[1] = 0), (e52[2] = 0), (e52[3] = 0)),
    e52
  )
}
function ke(e52, t2, n2, r2) {
  var i2 = new h(4)
  return ((i2[0] = e52), (i2[1] = t2), (i2[2] = n2), (i2[3] = r2), i2)
}
function Ae(e52, t2, n2) {
  return (
    (e52[0] = t2[0] * n2[0]),
    (e52[1] = t2[1] * n2[1]),
    (e52[2] = t2[2] * n2[2]),
    (e52[3] = t2[3] * n2[3]),
    e52
  )
}
function je(e52, t2, n2) {
  return (
    (e52[0] = t2[0] * n2),
    (e52[1] = t2[1] * n2),
    (e52[2] = t2[2] * n2),
    (e52[3] = t2[3] * n2),
    e52
  )
}
function Me(e52, t2) {
  var n2 = t2[0],
    r2 = t2[1],
    i2 = t2[2],
    a2 = t2[3],
    o2 = n2 * n2 + r2 * r2 + i2 * i2 + a2 * a2
  return (
    o2 > 0 && (o2 = 1 / Math.sqrt(o2)),
    (e52[0] = n2 * o2),
    (e52[1] = r2 * o2),
    (e52[2] = i2 * o2),
    (e52[3] = a2 * o2),
    e52
  )
}
function Ne(e52, t2, n2) {
  var r2 = t2[0],
    i2 = t2[1],
    a2 = t2[2],
    o2 = t2[3]
  return (
    (e52[0] = n2[0] * r2 + n2[4] * i2 + n2[8] * a2 + n2[12] * o2),
    (e52[1] = n2[1] * r2 + n2[5] * i2 + n2[9] * a2 + n2[13] * o2),
    (e52[2] = n2[2] * r2 + n2[6] * i2 + n2[10] * a2 + n2[14] * o2),
    (e52[3] = n2[3] * r2 + n2[7] * i2 + n2[11] * a2 + n2[15] * o2),
    e52
  )
}
var Pe = Ae
;(function () {
  var e52 = Oe()
  return function (t2, n2, r2, i2, a2, o2) {
    var s2, c2
    for (
      n2 ||= 4,
        r2 ||= 0,
        c2 = i2 ? Math.min(i2 * n2 + r2, t2.length) : t2.length,
        s2 = r2;
      s2 < c2;
      s2 += n2
    )
      ((e52[0] = t2[s2]),
        (e52[1] = t2[s2 + 1]),
        (e52[2] = t2[s2 + 2]),
        (e52[3] = t2[s2 + 3]),
        a2(e52, e52, o2),
        (t2[s2] = e52[0]),
        (t2[s2 + 1] = e52[1]),
        (t2[s2 + 2] = e52[2]),
        (t2[s2 + 3] = e52[3]))
    return t2
  }
})()
function Fe() {
  var e52 = new h(4)
  return (
    h != Float32Array && ((e52[0] = 0), (e52[1] = 0), (e52[2] = 0)),
    (e52[3] = 1),
    e52
  )
}
function Ie(e52, t2, n2) {
  n2 *= 0.5
  var r2 = Math.sin(n2)
  return (
    (e52[0] = r2 * t2[0]),
    (e52[1] = r2 * t2[1]),
    (e52[2] = r2 * t2[2]),
    (e52[3] = Math.cos(n2)),
    e52
  )
}
function Le(e52, t2, n2) {
  var r2 = t2[0],
    i2 = t2[1],
    a2 = t2[2],
    o2 = t2[3],
    s2 = n2[0],
    c2 = n2[1],
    l2 = n2[2],
    u2 = n2[3]
  return (
    (e52[0] = r2 * u2 + o2 * s2 + i2 * l2 - a2 * c2),
    (e52[1] = i2 * u2 + o2 * c2 + a2 * s2 - r2 * l2),
    (e52[2] = a2 * u2 + o2 * l2 + r2 * c2 - i2 * s2),
    (e52[3] = o2 * u2 - r2 * s2 - i2 * c2 - a2 * l2),
    e52
  )
}
function Re(e52, t2, n2, r2) {
  var i2 = t2[0],
    a2 = t2[1],
    o2 = t2[2],
    s2 = t2[3],
    c2 = n2[0],
    l2 = n2[1],
    u2 = n2[2],
    d2 = n2[3],
    f2,
    p2 = i2 * c2 + a2 * l2 + o2 * u2 + s2 * d2,
    m2,
    h2,
    g2
  return (
    p2 < 0 && ((p2 = -p2), (c2 = -c2), (l2 = -l2), (u2 = -u2), (d2 = -d2)),
    1 - p2 > 1e-6
      ? ((f2 = Math.acos(p2)),
        (m2 = Math.sin(f2)),
        (h2 = Math.sin((1 - r2) * f2) / m2),
        (g2 = Math.sin(r2 * f2) / m2))
      : ((h2 = 1 - r2), (g2 = r2)),
    (e52[0] = h2 * i2 + g2 * c2),
    (e52[1] = h2 * a2 + g2 * l2),
    (e52[2] = h2 * o2 + g2 * u2),
    (e52[3] = h2 * s2 + g2 * d2),
    e52
  )
}
function ze(e52, t2) {
  var n2 = t2[0] + t2[4] + t2[8],
    r2
  if (n2 > 0)
    ((r2 = Math.sqrt(n2 + 1)),
      (e52[3] = 0.5 * r2),
      (r2 = 0.5 / r2),
      (e52[0] = (t2[5] - t2[7]) * r2),
      (e52[1] = (t2[6] - t2[2]) * r2),
      (e52[2] = (t2[1] - t2[3]) * r2))
  else {
    var i2 = 0
    ;(t2[4] > t2[0] && (i2 = 1), t2[8] > t2[i2 * 3 + i2] && (i2 = 2))
    var a2 = (i2 + 1) % 3,
      o2 = (i2 + 2) % 3
    ;((r2 = Math.sqrt(t2[i2 * 3 + i2] - t2[a2 * 3 + a2] - t2[o2 * 3 + o2] + 1)),
      (e52[i2] = 0.5 * r2),
      (r2 = 0.5 / r2),
      (e52[3] = (t2[a2 * 3 + o2] - t2[o2 * 3 + a2]) * r2),
      (e52[a2] = (t2[a2 * 3 + i2] + t2[i2 * 3 + a2]) * r2),
      (e52[o2] = (t2[o2 * 3 + i2] + t2[i2 * 3 + o2]) * r2))
  }
  return e52
}
function Be(e52, t2, n2, r2) {
  var i2 =
      arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : `zyx`,
    a2 = Math.PI / 360
  ;((t2 *= a2), (r2 *= a2), (n2 *= a2))
  var o2 = Math.sin(t2),
    s2 = Math.cos(t2),
    c2 = Math.sin(n2),
    l2 = Math.cos(n2),
    u2 = Math.sin(r2),
    d2 = Math.cos(r2)
  switch (i2) {
    case `xyz`:
      ;((e52[0] = o2 * l2 * d2 + s2 * c2 * u2),
        (e52[1] = s2 * c2 * d2 - o2 * l2 * u2),
        (e52[2] = s2 * l2 * u2 + o2 * c2 * d2),
        (e52[3] = s2 * l2 * d2 - o2 * c2 * u2))
      break
    case `xzy`:
      ;((e52[0] = o2 * l2 * d2 - s2 * c2 * u2),
        (e52[1] = s2 * c2 * d2 - o2 * l2 * u2),
        (e52[2] = s2 * l2 * u2 + o2 * c2 * d2),
        (e52[3] = s2 * l2 * d2 + o2 * c2 * u2))
      break
    case `yxz`:
      ;((e52[0] = o2 * l2 * d2 + s2 * c2 * u2),
        (e52[1] = s2 * c2 * d2 - o2 * l2 * u2),
        (e52[2] = s2 * l2 * u2 - o2 * c2 * d2),
        (e52[3] = s2 * l2 * d2 + o2 * c2 * u2))
      break
    case `yzx`:
      ;((e52[0] = o2 * l2 * d2 + s2 * c2 * u2),
        (e52[1] = s2 * c2 * d2 + o2 * l2 * u2),
        (e52[2] = s2 * l2 * u2 - o2 * c2 * d2),
        (e52[3] = s2 * l2 * d2 - o2 * c2 * u2))
      break
    case `zxy`:
      ;((e52[0] = o2 * l2 * d2 - s2 * c2 * u2),
        (e52[1] = s2 * c2 * d2 + o2 * l2 * u2),
        (e52[2] = s2 * l2 * u2 + o2 * c2 * d2),
        (e52[3] = s2 * l2 * d2 - o2 * c2 * u2))
      break
    case `zyx`:
      ;((e52[0] = o2 * l2 * d2 - s2 * c2 * u2),
        (e52[1] = s2 * c2 * d2 + o2 * l2 * u2),
        (e52[2] = s2 * l2 * u2 - o2 * c2 * d2),
        (e52[3] = s2 * l2 * d2 + o2 * c2 * u2))
      break
    default:
      throw Error(`Unknown angle order ` + i2)
  }
  return e52
}
var Ve = ke,
  He = Me
;((function () {
  var e52 = se(),
    t2 = ue(1, 0, 0),
    n2 = ue(0, 1, 0)
  return function (r2, i2, a2) {
    var o2 = _e(i2, a2)
    return o2 < -0.999999
      ? (ve(e52, t2, i2),
        De(e52) < 1e-6 && ve(e52, n2, i2),
        ge(e52, e52),
        Ie(r2, e52, Math.PI),
        r2)
      : o2 > 0.999999
        ? ((r2[0] = 0), (r2[1] = 0), (r2[2] = 0), (r2[3] = 1), r2)
        : (ve(e52, i2, a2),
          (r2[0] = e52[0]),
          (r2[1] = e52[1]),
          (r2[2] = e52[2]),
          (r2[3] = 1 + o2),
          He(r2, r2))
  }
})(),
  (function () {
    var e52 = Fe(),
      t2 = Fe()
    return function (n2, r2, i2, a2, o2, s2) {
      return (
        Re(e52, r2, o2, s2),
        Re(t2, i2, a2, s2),
        Re(n2, e52, t2, 2 * s2 * (1 - s2)),
        n2
      )
    }
  })(),
  (function () {
    var e52 = g()
    return function (t2, n2, r2, i2) {
      return (
        (e52[0] = r2[0]),
        (e52[3] = r2[1]),
        (e52[6] = r2[2]),
        (e52[1] = i2[0]),
        (e52[4] = i2[1]),
        (e52[7] = i2[2]),
        (e52[2] = -n2[0]),
        (e52[5] = -n2[1]),
        (e52[8] = -n2[2]),
        He(t2, ze(t2, e52))
      )
    }
  })())
function Ue() {
  var e52 = new h(2)
  return (h != Float32Array && ((e52[0] = 0), (e52[1] = 0)), e52)
}
function We(e52, t2) {
  var n2 = new h(2)
  return ((n2[0] = e52), (n2[1] = t2), n2)
}
function Ge(e52, t2, n2) {
  return ((e52[0] = t2[0] * n2), (e52[1] = t2[1] * n2), e52)
}
function Ke(e52) {
  var t2 = e52[0],
    n2 = e52[1]
  return Math.sqrt(t2 * t2 + n2 * n2)
}
function qe(e52) {
  var t2 = e52[0],
    n2 = e52[1]
  return t2 * t2 + n2 * n2
}
function Je(e52, t2) {
  return e52[0] * t2[0] + e52[1] * t2[1]
}
function Ye(e52) {
  return ((e52[0] = 0), (e52[1] = 0), e52)
}
var Xe = qe
;(function () {
  var e52 = Ue()
  return function (t2, n2, r2, i2, a2, o2) {
    var s2, c2
    for (
      n2 ||= 2,
        r2 ||= 0,
        c2 = i2 ? Math.min(i2 * n2 + r2, t2.length) : t2.length,
        s2 = r2;
      s2 < c2;
      s2 += n2
    )
      ((e52[0] = t2[s2]),
        (e52[1] = t2[s2 + 1]),
        a2(e52, e52, o2),
        (t2[s2] = e52[0]),
        (t2[s2 + 1] = e52[1]))
    return t2
  }
})()
const j = 8192
function Ze(e52, t2, n2) {
  return t2 * (j / (e52.tileSize * 2 ** (n2 - e52.tileID.overscaledZ)))
}
const Qe = `__$json__:`
function $e(e52) {
  return e52 instanceof Error
    ? e52
    : Error(typeof e52 == `string` ? e52 : String(e52))
}
function et() {
  return new Float64Array(4)
}
function tt() {
  return new Float64Array(3)
}
function nt() {
  return new Float64Array(16)
}
function rt() {
  let e52 = new Float64Array(16)
  return (C(e52), e52)
}
function it() {
  let e52 = new Float32Array(16)
  return (C(e52), e52)
}
function at(e52, t2, n2, r2, i2 = false) {
  if (!n2[0] && !n2[1]) return [0, 0]
  let a2 = i2
    ? r2 === `map`
      ? -e52.bearingInRadians
      : 0
    : r2 === `viewport`
      ? e52.bearingInRadians
      : 0
  if (a2) {
    let e53 = Math.sin(a2),
      t3 = Math.cos(a2)
    n2 = [n2[0] * t3 - n2[1] * e53, n2[0] * e53 + n2[1] * t3]
  }
  return [
    i2 ? n2[0] : Ze(t2, n2[0], e52.zoom),
    i2 ? n2[1] : Ze(t2, n2[1], e52.zoom),
  ]
}
function ot(e52, t2) {
  return e52[0] * t2[0] + e52[1] * t2[1] + e52[2] * t2[2] + e52[3]
}
function st(e52, t2, n2) {
  let r2 = _([e52[0], e52[1], e52[2], t2[0], t2[1], t2[2], n2[0], n2[1], n2[2]])
  if (r2 === 0) return null
  let i2 = ve([], [t2[0], t2[1], t2[2]], [n2[0], n2[1], n2[2]]),
    a2 = ve([], [n2[0], n2[1], n2[2]], [e52[0], e52[1], e52[2]]),
    o2 = ve([], [e52[0], e52[1], e52[2]], [t2[0], t2[1], t2[2]]),
    s2 = pe([], i2, -e52[3])
  return (
    de(s2, s2, pe([], a2, -t2[3])),
    de(s2, s2, pe([], o2, -n2[3])),
    pe(s2, s2, 1 / r2),
    s2
  )
}
function ct(e52, t2, n2) {
  let r2 = e52[0] * n2[0] + e52[1] * n2[1] + e52[2] * n2[2],
    i2 = t2[0] * n2[0] + t2[1] * n2[1] + t2[2] * n2[2]
  return i2 === 0 ? null : (-r2 - n2[3]) / i2
}
function lt(e52, t2, n2, r2) {
  let i2 = Math.sqrt(e52 * e52 + t2 * t2),
    a2 = Math.sqrt(n2 * n2 + r2 * r2)
  ;((e52 /= i2), (t2 /= i2), (n2 /= a2), (r2 /= a2))
  let o2 = e52 * n2 + t2 * r2,
    s2 = Math.acos(o2)
  return -t2 * n2 + e52 * r2 > 0 ? s2 : -s2
}
function ut(e52, t2) {
  let n2 = ft(e52, 360),
    r2 = ft(t2, 360),
    i2 = r2 - n2,
    a2 = r2 > n2 ? i2 - 360 : i2 + 360
  return Math.abs(i2) < Math.abs(a2) ? i2 : a2
}
function dt(e52, t2) {
  let n2 = ft(e52, Math.PI * 2),
    r2 = ft(t2, Math.PI * 2)
  return Math.min(
    Math.abs(n2 - r2),
    Math.abs(n2 - r2 + Math.PI * 2),
    Math.abs(n2 - r2 - Math.PI * 2)
  )
}
function ft(e52, t2) {
  return ((e52 % t2) + t2) % t2
}
function pt(e52, t2, n2, r2, i2) {
  return mt(r2, i2, bt((e52 - t2) / (n2 - t2), 0, 1))
}
function mt(e52, t2, n2) {
  return e52 * (1 - n2) + t2 * n2
}
function ht(e52) {
  let t2 = 1 / 0,
    n2 = 1 / 0,
    r2 = -1 / 0,
    i2 = -1 / 0
  for (let a2 of e52)
    ((t2 = Math.min(t2, a2.x)),
      (n2 = Math.min(n2, a2.y)),
      (r2 = Math.max(r2, a2.x)),
      (i2 = Math.max(i2, a2.y)))
  return [t2, n2, r2, i2]
}
function gt(e52) {
  if (!e52.length) return /* @__PURE__ */ new Set()
  let t2 = Math.max(...e52.map(e53 => e53.canonical.z)),
    n2 = 1 / 0,
    r2 = -1 / 0,
    i2 = 1 / 0,
    a2 = -1 / 0,
    o2 = []
  for (let s3 of e52) {
    let {x: e53, y: c2, z: l2} = s3.canonical,
      u2 = 2 ** (t2 - l2),
      d2 = e53 * u2,
      f2 = c2 * u2
    ;(o2.push({id: s3, x: d2, y: f2}),
      d2 < n2 && (n2 = d2),
      d2 > r2 && (r2 = d2),
      f2 < i2 && (i2 = f2),
      f2 > a2 && (a2 = f2))
  }
  let s2 = /* @__PURE__ */ new Set()
  for (let e53 of o2)
    (e53.x === n2 || e53.x === r2 || e53.y === i2 || e53.y === a2) &&
      s2.add(e53.id)
  return s2
}
function _t(e52) {
  if (e52 <= 0) return 0
  if (e52 >= 1) return 1
  let t2 = e52 * e52,
    n2 = t2 * e52
  return 4 * (e52 < 0.5 ? n2 : 3 * (e52 - t2) + n2 - 0.75)
}
function vt(e52, t2, n2, r2) {
  return u(e52, t2, n2, r2)
}
const yt = vt(0.25, 0.1, 0.25, 1)
function bt(e52, t2, n2) {
  return Math.min(n2, Math.max(t2, e52))
}
function xt(e52, t2, n2) {
  let r2 = n2 - t2,
    i2 = ((((e52 - t2) % r2) + r2) % r2) + t2
  return i2 === t2 ? n2 : i2
}
function St(e52, ...t2) {
  for (let n2 of t2) for (let t3 in n2) e52[t3] = n2[t3]
  return e52
}
function Ct(e52, t2) {
  let n2 = {}
  for (let r2 of t2) r2 in e52 && (n2[r2] = e52[r2])
  return n2
}
let wt = 1
function Tt() {
  return wt++
}
function Et(e52) {
  return (Math.log(e52) / Math.LN2) % 1 == 0
}
function Dt(e52) {
  return e52 <= 1 ? 1 : 2 ** Math.ceil(Math.log(e52) / Math.LN2)
}
function Ot(e52) {
  return 2 ** e52
}
function kt(e52) {
  return Math.log(e52) / Math.LN2
}
function At(e52, t2, n2) {
  if (t2 <= 0) return e52
  let r2 = 1 / t2
  return n2 === void 0 || Math.abs(n2) < 1e-10
    ? Math.round(e52 * r2) / r2
    : (n2 > 0 ? Math.ceil(e52 * r2 - 1e-9) : Math.floor(e52 * r2 + 1e-10)) / r2
}
function jt(e52, t2, n2) {
  let r2 = {}
  for (let i2 in e52) r2[i2] = t2.call(n2 || this, e52[i2], i2, e52)
  return r2
}
function Mt(e52, t2, n2) {
  let r2 = {}
  for (let i2 in e52)
    t2.call(n2 || this, e52[i2], i2, e52) && (r2[i2] = e52[i2])
  return r2
}
function Nt(e52, t2) {
  if (Array.isArray(e52)) {
    if (!Array.isArray(t2) || e52.length !== t2.length) return false
    for (let n2 = 0; n2 < e52.length; n2++)
      if (!Nt(e52[n2], t2[n2])) return false
    return true
  }
  if (typeof e52 == `object` && e52 && t2 !== null) {
    if (
      typeof t2 != `object` ||
      Object.keys(e52).length !== Object.keys(t2).length
    )
      return false
    for (let n2 in e52) if (!Nt(e52[n2], t2[n2])) return false
    return true
  }
  return e52 === t2
}
function Pt(e52) {
  return Array.isArray(e52)
    ? e52.map(Pt)
    : typeof e52 == `object` && e52
      ? jt(e52, Pt)
      : e52
}
const Ft = {}
function It(e52) {
  Ft[e52] || (typeof console < `u` && console.warn(e52), (Ft[e52] = true))
}
function Lt(e52, t2, n2) {
  return (n2.y - e52.y) * (t2.x - e52.x) > (t2.y - e52.y) * (n2.x - e52.x)
}
function Rt(e52, t2, n2, r2) {
  let i2 = t2.y - e52.y,
    a2 = t2.x - e52.x,
    o2 = r2.y - n2.y,
    s2 = r2.x - n2.x,
    c2 = o2 * a2 - s2 * i2
  if (c2 === 0) return null
  let u2 = e52.y - n2.y,
    d2 = e52.x - n2.x,
    f2 = (s2 * u2 - o2 * d2) / c2
  return new l(e52.x + f2 * a2, e52.y + f2 * i2)
}
function zt([e52, t2, n2]) {
  return (
    (t2 += 90),
    (t2 *= Math.PI / 180),
    (n2 *= Math.PI / 180),
    [
      e52 * Math.cos(t2) * Math.sin(n2),
      e52 * Math.sin(t2) * Math.sin(n2),
      e52 * Math.cos(n2),
    ]
  )
}
function Bt(e52) {
  return (
    typeof WorkerGlobalScope < `u` &&
    e52 !== void 0 &&
    e52 instanceof WorkerGlobalScope
  )
}
function Vt(e52) {
  let t2 =
      /(?:^|(?:\s*\,\s*))([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)(?:\=(?:([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)|(?:\"((?:[^"\\]|\\.)*)\")))?/g,
    n2 = {}
  if (
    (e52.replace(t2, (e53, t3, r2, i2) => {
      let a2 = r2 || i2
      return ((n2[t3] = !a2 || a2.toLowerCase()), ``)
    }),
    n2[`max-age`])
  ) {
    let e53 = parseInt(n2[`max-age`], 10)
    isNaN(e53) ? delete n2[`max-age`] : (n2[`max-age`] = e53)
  }
  return n2
}
let Ht = null
function Ut(e52) {
  if (Ht == null) {
    let t2 = e52.navigator ? e52.navigator.userAgent : null
    Ht =
      !!e52.safari ||
      !!(
        t2 &&
        (/\b(iPad|iPhone|iPod)\b/.test(t2) ||
          (t2.match(`Safari`) && !t2.match(`Chrome`)))
      )
  }
  return Ht
}
function Wt(e52) {
  return typeof ImageBitmap < `u` && e52 instanceof ImageBitmap
}
const Gt = async (e52, t2) => {
    if (e52.byteLength === 0) return createImageBitmap(new ImageData(1, 1), t2)
    let n2 = new Blob([new Uint8Array(e52)], {type: `image/png`})
    try {
      return createImageBitmap(n2, t2)
    } catch (e53) {
      throw Error(
        `Could not load image because of ${$e(e53).message}. Please make sure to use a supported image type such as PNG or JPEG. Note that SVGs are not supported.`
      )
    }
  },
  Kt = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=`,
  qt = e52 =>
    new Promise((t2, n2) => {
      let r2 = new Image()
      ;((r2.onload = () => {
        ;(t2(r2),
          URL.revokeObjectURL(r2.src),
          (r2.onload = null),
          window.requestAnimationFrame(() => (r2.src = Kt)))
      }),
        (r2.onerror = () =>
          n2(
            Error(
              `Could not load image. Please make sure to use a supported image type such as PNG or JPEG. Note that SVGs are not supported.`
            )
          )))
      let i2 = new Blob([new Uint8Array(e52)], {type: `image/png`})
      r2.src = e52.byteLength ? URL.createObjectURL(i2) : Kt
    })
function Jt(e52, t2, n2, r2, i2) {
  let a2 = Math.max(-t2, 0) * 4,
    o2 = (Math.max(0, n2) - n2) * r2 * 4 + a2,
    s2 = r2 * 4,
    c2 = Math.max(0, t2),
    l2 = Math.max(0, n2),
    u2 = Math.min(e52.width, t2 + r2),
    d2 = Math.min(e52.height, n2 + i2)
  return {
    rect: {x: c2, y: l2, width: u2 - c2, height: d2 - l2},
    layout: [{offset: o2, stride: s2}],
  }
}
async function Yt(e52, t2, n2, r2, i2) {
  if (typeof VideoFrame > `u`) throw Error(`VideoFrame not supported`)
  let a2 = new VideoFrame(e52, {timestamp: 0})
  try {
    let o2 = a2?.format
    if (!o2 || !(o2.startsWith(`BGR`) || o2.startsWith(`RGB`)))
      throw Error(`Unrecognized format ${o2}`)
    let s2 = o2.startsWith(`BGR`),
      c2 = new Uint8ClampedArray(r2 * i2 * 4)
    if ((await a2.copyTo(c2, Jt(e52, t2, n2, r2, i2)), s2))
      for (let e53 = 0; e53 < c2.length; e53 += 4) {
        let t3 = c2[e53]
        ;((c2[e53] = c2[e53 + 2]), (c2[e53 + 2] = t3))
      }
    return c2
  } finally {
    a2.close()
  }
}
let Xt, Zt
function Qt(e52, t2, n2, r2, i2) {
  let a2 = e52.width,
    o2 = e52.height
  ;((!Xt || !Zt) &&
    ((Xt = new OffscreenCanvas(a2, o2)),
    (Zt = Xt.getContext(`2d`, {willReadFrequently: true}))),
    (Xt.width = a2),
    (Xt.height = o2),
    Zt.drawImage(e52, 0, 0, a2, o2))
  let s2 = Zt.getImageData(t2, n2, r2, i2)
  return (Zt.clearRect(0, 0, a2, o2), s2.data)
}
async function $t(e52, t2, n2, r2, i2) {
  if (m())
    try {
      return await Yt(e52, t2, n2, r2, i2)
    } catch {}
  return Qt(e52, t2, n2, r2, i2)
}
function en(e52, t2, n2, r2) {
  return (
    e52.addEventListener(t2, n2, r2),
    {
      unsubscribe: () => {
        e52.removeEventListener(t2, n2, r2)
      },
    }
  )
}
function tn(e52) {
  return (e52 * Math.PI) / 180
}
function nn(e52) {
  return (e52 / Math.PI) * 180
}
function rn(e52, t2) {
  return (
    e52.roll == t2.roll && e52.pitch == t2.pitch && e52.bearing == t2.bearing
  )
}
function an(e52) {
  let t2 = new Float64Array(9)
  y(t2, e52)
  let n2 = nn(-Math.asin(bt(t2[2], -1, 1))),
    r2,
    i2
  return (
    Math.hypot(t2[5], t2[8]) < 1e-3
      ? ((r2 = 0), (i2 = -nn(Math.atan2(t2[3], t2[4]))))
      : ((r2 = nn(t2[5] === 0 && t2[8] === 0 ? 0 : Math.atan2(t2[5], t2[8]))),
        (i2 = nn(t2[1] === 0 && t2[0] === 0 ? 0 : Math.atan2(t2[1], t2[0])))),
    {roll: r2, pitch: n2 + 90, bearing: i2}
  )
}
function on(e52, t2, n2) {
  let r2 = We(t2.x - n2.x, t2.y - n2.y),
    i2 = We(e52.x - n2.x, e52.y - n2.y),
    a2 = r2[0] * i2[1] - r2[1] * i2[0]
  return nn(Math.atan2(a2, Je(r2, i2)))
}
function sn(e52, t2, n2) {
  let r2 = new Float64Array(4)
  return (Be(r2, e52, t2 - 90, n2), r2)
}
const cn = 85.051129,
  ln = {
    touchstart: true,
    touchmove: true,
    touchmoveWindow: true,
    touchend: true,
    touchcancel: true,
  },
  un = {
    dblclick: true,
    click: true,
    mouseover: true,
    mouseout: true,
    mousedown: true,
    mousemove: true,
    mousemoveWindow: true,
    mouseup: true,
    mouseupWindow: true,
    contextmenu: true,
    wheel: true,
  }
function dn(e52, t2) {
  return ln[t2] && `touches` in e52
}
function fn(e52, t2) {
  if (!un[t2]) return false
  let n2 = e52,
    r2 = n2?.target?.ownerDocument?.defaultView || window
  return n2 instanceof r2.MouseEvent || n2 instanceof r2.WheelEvent
}
function pn(e52) {
  return ln[e52] || un[e52]
}
const mn = `AbortError`
var hn = class extends Error {
  constructor(e52 = mn) {
    ;(super(e52 instanceof Error ? e52.message : e52),
      (this.name = mn),
      e52 instanceof Error && e52.stack && (this.stack = e52.stack))
  }
}
function gn(e52) {
  return e52 instanceof Error && e52.name === `AbortError`
}
function _n(e52) {
  if (e52.aborted) throw new hn(e52.reason)
}
const vn = {
  MAX_PARALLEL_IMAGE_REQUESTS: 16,
  MAX_PARALLEL_IMAGE_REQUESTS_PER_FRAME: 8,
  MAX_TILE_CACHE_ZOOM_LEVELS: 5,
  REGISTERED_PROTOCOLS: {},
  WORKER_URL: ``,
}
function yn(e52) {
  return vn.REGISTERED_PROTOCOLS[e52.substring(0, e52.indexOf(`://`))]
}
function bn(e52, t2) {
  vn.REGISTERED_PROTOCOLS[e52] = t2
}
function xn(e52) {
  delete vn.REGISTERED_PROTOCOLS[e52]
}
const Sn = `global-dispatcher`
var Cn = class extends Error {
  constructor(e52, t2, n2, r2) {
    ;(super(`AJAXError: ${t2} (${e52}): ${n2}`),
      (this.status = e52),
      (this.statusText = t2),
      (this.url = n2),
      (this.body = r2))
  }
}
function wn() {
  if (Bt(self)) return self.worker?.referrer
  if (window.location.protocol === `blob:`)
    try {
      return window.parent.location.href
    } catch {}
  return window.location.href
}
const Tn = e52 =>
  e52.startsWith(`file:`) || (wn()?.startsWith(`file:`) && !/^\w+:/.test(e52))
async function En(e52, t2) {
  let n2 = new Request(e52.url, {
    method: e52.method || `GET`,
    body: e52.body,
    credentials: e52.credentials,
    headers: e52.headers,
    cache: e52.cache,
    referrer: wn(),
    referrerPolicy: e52.referrerPolicy,
    signal: t2.signal,
  })
  e52.type === `json` &&
    !n2.headers.has(`Accept`) &&
    n2.headers.set(`Accept`, `application/json`)
  let r2
  try {
    r2 = await fetch(n2)
  } catch (t3) {
    throw gn(t3) ? t3 : new Cn(0, $e(t3).message, e52.url, new Blob())
  }
  if (!r2.ok) {
    let t3 = await r2.blob()
    throw new Cn(r2.status, r2.statusText, e52.url, t3)
  }
  let i2
  i2 =
    e52.type === `arrayBuffer` || e52.type === `image`
      ? r2.arrayBuffer()
      : e52.type === `json`
        ? r2.json()
        : r2.text()
  let a2 = await i2
  return (
    _n(t2.signal),
    {
      data: a2,
      cacheControl: r2.headers.get(`Cache-Control`),
      expires: r2.headers.get(`Expires`),
      etag: r2.headers.get(`ETag`),
    }
  )
}
function Dn(e52, t2) {
  return new Promise((n2, r2) => {
    let i2 = new XMLHttpRequest()
    ;(i2.open(e52.method || `GET`, e52.url, true),
      (e52.type === `arrayBuffer` || e52.type === `image`) &&
        (i2.responseType = `arraybuffer`))
    for (let t3 in e52.headers) i2.setRequestHeader(t3, e52.headers[t3])
    ;(e52.type === `json` &&
      ((i2.responseType = `text`),
      e52.headers?.Accept || i2.setRequestHeader(`Accept`, `application/json`)),
      (i2.withCredentials = e52.credentials === `include`),
      (i2.onerror = () => {
        r2(Error(i2.statusText))
      }),
      (i2.onload = () => {
        if (!t2.signal.aborted) {
          if (
            ((i2.status >= 200 && i2.status < 300) || i2.status === 0) &&
            i2.response !== null
          ) {
            let t3 = i2.response
            if (e52.type === `json`)
              try {
                t3 = JSON.parse(i2.response)
              } catch (e53) {
                r2(e53)
                return
              }
            n2({
              data: t3,
              cacheControl: i2.getResponseHeader(`Cache-Control`),
              expires: i2.getResponseHeader(`Expires`),
              etag: i2.getResponseHeader(`ETag`),
            })
          } else {
            let t3 = new Blob([i2.response], {
              type: i2.getResponseHeader(`Content-Type`),
            })
            r2(new Cn(i2.status, i2.statusText, e52.url, t3))
          }
        }
      }),
      t2.signal.addEventListener(`abort`, () => {
        ;(i2.abort(), r2(new hn(t2.signal.reason)))
      }),
      i2.send(e52.body))
  })
}
const On = async function (e52, t2) {
    if (e52.url.includes(`://`) && !/^https?:|^file:/.test(e52.url)) {
      let n2 = yn(e52.url)
      if (n2) {
        let r2 = await n2(e52, t2)
        return !r2.data && e52.type === `arrayBuffer`
          ? St(r2, {data: new ArrayBuffer(0)})
          : r2
      }
      if (Bt(self) && self.worker?.actor)
        return self.worker.actor.sendAsync(
          {type: `GR`, data: e52, targetMapId: Sn},
          t2
        )
    }
    if (!Tn(e52.url)) {
      if (
        fetch &&
        Request &&
        AbortController &&
        Object.hasOwn(Request.prototype, `signal`)
      )
        return En(e52, t2)
      if (Bt(self) && self.worker?.actor)
        return self.worker.actor.sendAsync(
          {type: `GR`, data: e52, mustQueue: true, targetMapId: Sn},
          t2
        )
    }
    return Dn(e52, t2)
  },
  kn = (e52, t2) => On(St(e52, {type: `json`}), t2),
  An = (e52, t2) => On(St(e52, {type: `arrayBuffer`}), t2)
function jn(e52) {
  if (!e52 || e52.startsWith(`data:image/`)) return true
  if (e52.startsWith(`blob:`) && ((e52 = e52.slice(5)), e52.startsWith(`null`)))
    return false
  if (e52.indexOf(`://`) <= 0) return true
  let t2 = new URL(e52),
    n2 = window.location
  return t2.protocol === n2.protocol && t2.host === n2.host
}
const Mn = e52 => {
  let t2 = window.document.createElement(`video`)
  return (
    (t2.muted = true),
    new Promise(n2 => {
      t2.onloadstart = () => {
        n2(t2)
      }
      for (let n3 of e52) {
        let e53 = window.document.createElement(`source`)
        ;(jn(n3) || (t2.crossOrigin = `Anonymous`),
          (e53.src = n3),
          t2.appendChild(e53))
      }
    })
  )
}
function Nn(e52, t2, n2) {
  n2[e52]?.includes(t2) || ((n2[e52] ||= []), n2[e52].push(t2))
}
function Pn(e52, t2, n2) {
  if (n2?.[e52]) {
    let r2 = n2[e52].indexOf(t2)
    r2 !== -1 && n2[e52].splice(r2, 1)
  }
}
var Fn = class {
    constructor(e52, t2 = {}) {
      ;(St(this, t2), (this.type = e52))
    }
  },
  In = class extends Fn {
    constructor(e52, t2 = {}) {
      super(`error`, St({error: e52}, t2))
    }
  },
  Ln = class {
    on(e52, t2) {
      return (
        (this._listeners ||= {}),
        Nn(e52, t2, this._listeners),
        {
          unsubscribe: () => {
            this.off(e52, t2)
          },
        }
      )
    }
    off(e52, t2) {
      return (
        Pn(e52, t2, this._listeners), Pn(e52, t2, this._oneTimeListeners), this
      )
    }
    once(e52, t2) {
      return t2
        ? ((this._oneTimeListeners ||= {}),
          Nn(e52, t2, this._oneTimeListeners),
          this)
        : new Promise(t3 => this.once(e52, t3))
    }
    fire(e52, t2) {
      let n2 = typeof e52 == `string` ? new Fn(e52, t2 || {}) : e52,
        r2 = n2.type
      if (this.listens(r2)) {
        n2.target = this
        let e53 = this._listeners?.[r2]?.slice() ?? []
        for (let t4 of e53) t4.call(this, n2)
        let t3 = this._oneTimeListeners?.[r2]?.slice() ?? []
        for (let e54 of t3)
          (Pn(r2, e54, this._oneTimeListeners), e54.call(this, n2))
        let i2 = this._eventedParent
        i2 &&
          (St(
            n2,
            typeof this._eventedParentData == `function`
              ? this._eventedParentData()
              : this._eventedParentData
          ),
          i2.fire(n2))
      } else n2 instanceof In && console.error(n2.error)
      return this
    }
    listens(e52) {
      return !!(
        this._listeners?.[e52]?.length ||
        this._oneTimeListeners?.[e52]?.length ||
        this._eventedParent?.listens(e52)
      )
    }
    setEventedParent(e52, t2) {
      return ((this._eventedParent = e52), (this._eventedParentData = t2), this)
    }
  },
  Rn = {
    $version: 8,
    $root: {
      version: {required: true, type: `enum`, values: [8]},
      name: {type: `string`},
      metadata: {type: `*`},
      center: {type: `array`, value: `number`, length: 2},
      centerAltitude: {type: `number`},
      zoom: {type: `number`},
      bearing: {type: `number`, default: 0, period: 360, units: `degrees`},
      pitch: {type: `number`, default: 0, units: `degrees`},
      roll: {type: `number`, default: 0, units: `degrees`},
      state: {type: `state`, default: {}},
      light: {type: `light`},
      sky: {type: `sky`},
      projection: {type: `projection`},
      terrain: {type: `terrain`},
      sources: {required: true, type: `sources`},
      sprite: {type: `sprite`},
      glyphs: {type: `string`},
      "font-faces": {type: `fontFaces`},
      transition: {type: `transition`},
      layers: {required: true, type: `array`, value: `layer`},
    },
    sources: {"*": {type: `source`}},
    source: [
      `source_vector`,
      `source_raster`,
      `source_raster_dem`,
      `source_geojson`,
      `source_video`,
      `source_image`,
    ],
    source_vector: {
      type: {required: true, type: `enum`, values: {vector: {}}},
      url: {type: `string`},
      tiles: {type: `array`, value: `string`},
      bounds: {
        type: `array`,
        value: `number`,
        length: 4,
        default: [-180, -85.051129, 180, 85.051129],
      },
      scheme: {type: `enum`, values: {xyz: {}, tms: {}}, default: `xyz`},
      minzoom: {type: `number`, default: 0},
      maxzoom: {type: `number`, default: 22},
      attribution: {type: `string`},
      promoteId: {type: `promoteId`},
      volatile: {type: `boolean`, default: false},
      encoding: {type: `enum`, values: {mvt: {}, mlt: {}}, default: `mvt`},
      "*": {type: `*`},
    },
    source_raster: {
      type: {required: true, type: `enum`, values: {raster: {}}},
      url: {type: `string`},
      tiles: {type: `array`, value: `string`},
      bounds: {
        type: `array`,
        value: `number`,
        length: 4,
        default: [-180, -85.051129, 180, 85.051129],
      },
      minzoom: {type: `number`, default: 0},
      maxzoom: {type: `number`, default: 22},
      tileSize: {type: `number`, default: 512, units: `pixels`},
      scheme: {type: `enum`, values: {xyz: {}, tms: {}}, default: `xyz`},
      attribution: {type: `string`},
      volatile: {type: `boolean`, default: false},
      "*": {type: `*`},
    },
    source_raster_dem: {
      type: {required: true, type: `enum`, values: {"raster-dem": {}}},
      url: {type: `string`},
      tiles: {type: `array`, value: `string`},
      bounds: {
        type: `array`,
        value: `number`,
        length: 4,
        default: [-180, -85.051129, 180, 85.051129],
      },
      minzoom: {type: `number`, default: 0},
      maxzoom: {type: `number`, default: 22},
      tileSize: {type: `number`, default: 512, units: `pixels`},
      attribution: {type: `string`},
      encoding: {
        type: `enum`,
        values: {terrarium: {}, mapbox: {}, custom: {}},
        default: `mapbox`,
      },
      redFactor: {type: `number`, default: 1},
      blueFactor: {type: `number`, default: 1},
      greenFactor: {type: `number`, default: 1},
      baseShift: {type: `number`, default: 0},
      volatile: {type: `boolean`, default: false},
      "*": {type: `*`},
    },
    source_geojson: {
      type: {required: true, type: `enum`, values: {geojson: {}}},
      data: {required: true, type: `*`},
      maxzoom: {type: `number`, default: 18},
      attribution: {type: `string`},
      buffer: {type: `number`, default: 128, maximum: 512, minimum: 0},
      filter: {type: `filter`},
      tolerance: {type: `number`, default: 0.375},
      cluster: {type: `boolean`, default: false},
      clusterRadius: {type: `number`, default: 50, minimum: 0},
      clusterMaxZoom: {type: `number`},
      clusterMinPoints: {type: `number`},
      clusterProperties: {type: `*`},
      lineMetrics: {type: `boolean`, default: false},
      generateId: {type: `boolean`, default: false},
      promoteId: {type: `promoteId`},
    },
    source_video: {
      type: {required: true, type: `enum`, values: {video: {}}},
      urls: {required: true, type: `array`, value: `string`},
      coordinates: {
        required: true,
        type: `array`,
        length: 4,
        value: {type: `array`, length: 2, value: `number`},
      },
    },
    source_image: {
      type: {required: true, type: `enum`, values: {image: {}}},
      url: {type: `string`},
      coordinates: {
        required: true,
        type: `array`,
        length: 4,
        value: {type: `array`, length: 2, value: `number`},
      },
    },
    layer: {
      id: {type: `string`, required: true},
      type: {
        type: `enum`,
        values: {
          fill: {},
          line: {},
          symbol: {},
          circle: {},
          heatmap: {},
          "fill-extrusion": {},
          raster: {},
          hillshade: {},
          "color-relief": {},
          background: {},
        },
        required: true,
      },
      metadata: {type: `*`},
      source: {type: `string`},
      "source-layer": {type: `string`},
      minzoom: {type: `number`, minimum: 0, maximum: 24},
      maxzoom: {type: `number`, minimum: 0, maximum: 24},
      filter: {type: `filter`},
      layout: {type: `layout`},
      paint: {type: `paint`},
    },
    layout: [
      `layout_fill`,
      `layout_line`,
      `layout_circle`,
      `layout_heatmap`,
      `layout_fill-extrusion`,
      `layout_symbol`,
      `layout_raster`,
      `layout_hillshade`,
      `layout_color-relief`,
      `layout_background`,
    ],
    layout_background: {
      visibility: {
        type: `enum`,
        values: {visible: {}, none: {}},
        default: `visible`,
        expression: {interpolated: false, parameters: [`global-state`]},
        "property-type": `data-constant`,
      },
    },
    layout_fill: {
      "fill-sort-key": {
        type: `number`,
        expression: {interpolated: false, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      visibility: {
        type: `enum`,
        values: {visible: {}, none: {}},
        default: `visible`,
        expression: {interpolated: false, parameters: [`global-state`]},
        "property-type": `data-constant`,
      },
    },
    layout_circle: {
      "circle-sort-key": {
        type: `number`,
        expression: {interpolated: false, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      visibility: {
        type: `enum`,
        values: {visible: {}, none: {}},
        default: `visible`,
        expression: {interpolated: false, parameters: [`global-state`]},
        "property-type": `data-constant`,
      },
    },
    layout_heatmap: {
      visibility: {
        type: `enum`,
        values: {visible: {}, none: {}},
        default: `visible`,
        expression: {interpolated: false, parameters: [`global-state`]},
        "property-type": `data-constant`,
      },
    },
    "layout_fill-extrusion": {
      visibility: {
        type: `enum`,
        values: {visible: {}, none: {}},
        default: `visible`,
        expression: {interpolated: false, parameters: [`global-state`]},
        "property-type": `data-constant`,
      },
      "fill-extrusion-rounded-corner-distance": {
        type: `number`,
        default: 0,
        minimum: 0,
        units: `meters`,
        "property-type": `constant`,
      },
    },
    layout_line: {
      "line-cap": {
        type: `enum`,
        values: {butt: {}, round: {}, square: {}},
        default: `butt`,
        expression: {interpolated: false, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "line-join": {
        type: `enum`,
        values: {bevel: {}, round: {}, miter: {}},
        default: `miter`,
        expression: {interpolated: false, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "line-miter-limit": {
        type: `number`,
        default: 2,
        requires: [{"line-join": `miter`}],
        expression: {interpolated: true, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "line-round-limit": {
        type: `number`,
        default: 1.05,
        requires: [{"line-join": `round`}],
        expression: {interpolated: true, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "line-sort-key": {
        type: `number`,
        expression: {interpolated: false, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      visibility: {
        type: `enum`,
        values: {visible: {}, none: {}},
        default: `visible`,
        expression: {interpolated: false, parameters: [`global-state`]},
        "property-type": `data-constant`,
      },
    },
    layout_symbol: {
      "symbol-placement": {
        type: `enum`,
        values: {point: {}, line: {}, "line-center": {}},
        default: `point`,
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "symbol-spacing": {
        type: `number`,
        default: 250,
        minimum: 1,
        units: `pixels`,
        requires: [{"symbol-placement": `line`}],
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "symbol-avoid-edges": {
        type: `boolean`,
        default: false,
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "symbol-sort-key": {
        type: `number`,
        expression: {interpolated: false, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "symbol-z-order": {
        type: `enum`,
        values: {auto: {}, "viewport-y": {}, source: {}},
        default: `auto`,
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "icon-allow-overlap": {
        type: `boolean`,
        default: false,
        requires: [`icon-image`, {"!": `icon-overlap`}],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "icon-overlap": {
        type: `enum`,
        values: {never: {}, always: {}, cooperative: {}},
        requires: [`icon-image`],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "icon-ignore-placement": {
        type: `boolean`,
        default: false,
        requires: [`icon-image`],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "icon-optional": {
        type: `boolean`,
        default: false,
        requires: [`icon-image`, `text-field`],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "icon-rotation-alignment": {
        type: `enum`,
        values: {map: {}, viewport: {}, auto: {}},
        default: `auto`,
        requires: [`icon-image`],
        expression: {interpolated: false, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "icon-size": {
        type: `number`,
        default: 1,
        minimum: 0,
        units: `factor of the original icon size`,
        requires: [`icon-image`],
        expression: {interpolated: true, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "icon-text-fit": {
        type: `enum`,
        values: {none: {}, width: {}, height: {}, both: {}},
        default: `none`,
        requires: [`icon-image`, `text-field`],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "icon-text-fit-padding": {
        type: `array`,
        value: `number`,
        length: 4,
        default: [0, 0, 0, 0],
        units: `pixels`,
        requires: [
          `icon-image`,
          `text-field`,
          {"icon-text-fit": [`both`, `width`, `height`]},
        ],
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "icon-image": {
        type: `resolvedImage`,
        tokens: true,
        expression: {interpolated: false, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "icon-rotate": {
        type: `number`,
        default: 0,
        period: 360,
        units: `degrees`,
        requires: [`icon-image`],
        expression: {interpolated: true, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "icon-padding": {
        type: `padding`,
        default: [2],
        units: `pixels`,
        requires: [`icon-image`],
        expression: {interpolated: true, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "icon-keep-upright": {
        type: `boolean`,
        default: false,
        requires: [
          `icon-image`,
          {"icon-rotation-alignment": `map`},
          {"symbol-placement": [`line`, `line-center`]},
        ],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "icon-offset": {
        type: `array`,
        value: `number`,
        length: 2,
        default: [0, 0],
        requires: [`icon-image`],
        expression: {interpolated: true, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "icon-anchor": {
        type: `enum`,
        values: {
          center: {},
          left: {},
          right: {},
          top: {},
          bottom: {},
          "top-left": {},
          "top-right": {},
          "bottom-left": {},
          "bottom-right": {},
        },
        default: `center`,
        requires: [`icon-image`],
        expression: {interpolated: false, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "icon-pitch-alignment": {
        type: `enum`,
        values: {map: {}, viewport: {}, auto: {}},
        default: `auto`,
        requires: [`icon-image`],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "text-pitch-alignment": {
        type: `enum`,
        values: {map: {}, viewport: {}, auto: {}},
        default: `auto`,
        requires: [`text-field`],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "text-rotation-alignment": {
        type: `enum`,
        values: {map: {}, viewport: {}, "viewport-glyph": {}, auto: {}},
        default: `auto`,
        requires: [`text-field`],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "text-field": {
        type: `formatted`,
        default: ``,
        tokens: true,
        expression: {interpolated: false, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "text-font": {
        type: `array`,
        value: `string`,
        default: [`Open Sans Regular`, `Arial Unicode MS Regular`],
        requires: [`text-field`],
        expression: {interpolated: false, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "text-size": {
        type: `number`,
        default: 16,
        minimum: 0,
        units: `pixels`,
        requires: [`text-field`],
        expression: {interpolated: true, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "text-max-width": {
        type: `number`,
        default: 10,
        minimum: 0,
        units: `ems`,
        requires: [`text-field`],
        expression: {interpolated: true, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "text-line-height": {
        type: `number`,
        default: 1.2,
        units: `ems`,
        requires: [`text-field`],
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "text-letter-spacing": {
        type: `number`,
        default: 0,
        units: `ems`,
        requires: [`text-field`],
        expression: {interpolated: true, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "text-justify": {
        type: `enum`,
        values: {auto: {}, left: {}, center: {}, right: {}},
        default: `center`,
        requires: [`text-field`],
        expression: {interpolated: false, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "text-radial-offset": {
        type: `number`,
        units: `ems`,
        default: 0,
        requires: [`text-field`],
        "property-type": `data-driven`,
        expression: {interpolated: true, parameters: [`zoom`, `feature`]},
      },
      "text-variable-anchor": {
        type: `array`,
        value: `enum`,
        values: {
          center: {},
          left: {},
          right: {},
          top: {},
          bottom: {},
          "top-left": {},
          "top-right": {},
          "bottom-left": {},
          "bottom-right": {},
        },
        requires: [`text-field`, {"symbol-placement": [`point`]}],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "text-variable-anchor-offset": {
        type: `variableAnchorOffsetCollection`,
        requires: [`text-field`, {"symbol-placement": [`point`]}],
        expression: {interpolated: true, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "text-anchor": {
        type: `enum`,
        values: {
          center: {},
          left: {},
          right: {},
          top: {},
          bottom: {},
          "top-left": {},
          "top-right": {},
          "bottom-left": {},
          "bottom-right": {},
        },
        default: `center`,
        requires: [`text-field`, {"!": `text-variable-anchor`}],
        expression: {interpolated: false, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "text-max-angle": {
        type: `number`,
        default: 45,
        units: `degrees`,
        requires: [`text-field`, {"symbol-placement": [`line`, `line-center`]}],
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "text-writing-mode": {
        type: `array`,
        value: `enum`,
        values: {horizontal: {}, vertical: {}},
        requires: [`text-field`, {"symbol-placement": [`point`]}],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "text-rotate": {
        type: `number`,
        default: 0,
        period: 360,
        units: `degrees`,
        requires: [`text-field`],
        expression: {interpolated: true, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "text-padding": {
        type: `number`,
        default: 2,
        minimum: 0,
        units: `pixels`,
        requires: [`text-field`],
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "text-keep-upright": {
        type: `boolean`,
        default: true,
        requires: [
          `text-field`,
          {"text-rotation-alignment": `map`},
          {"symbol-placement": [`line`, `line-center`]},
        ],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "text-transform": {
        type: `enum`,
        values: {none: {}, uppercase: {}, lowercase: {}},
        default: `none`,
        requires: [`text-field`],
        expression: {interpolated: false, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "text-offset": {
        type: `array`,
        value: `number`,
        units: `ems`,
        length: 2,
        default: [0, 0],
        requires: [`text-field`, {"!": `text-radial-offset`}],
        expression: {interpolated: true, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "text-allow-overlap": {
        type: `boolean`,
        default: false,
        requires: [`text-field`, {"!": `text-overlap`}],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "text-overlap": {
        type: `enum`,
        values: {never: {}, always: {}, cooperative: {}},
        requires: [`text-field`],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "text-ignore-placement": {
        type: `boolean`,
        default: false,
        requires: [`text-field`],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "text-optional": {
        type: `boolean`,
        default: false,
        requires: [`text-field`, `icon-image`],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "symbol-height-offset": {
        type: `number`,
        default: 0,
        units: `meters`,
        requires: [{"symbol-placement": [`point`]}],
        expression: {interpolated: true, parameters: [`zoom`, `feature`]},
        "property-type": `data-driven`,
      },
      "symbol-height-anchor": {
        type: `enum`,
        values: {ground: {}, absolute: {}},
        default: `ground`,
        requires: [`symbol-height-offset`],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      visibility: {
        type: `enum`,
        values: {visible: {}, none: {}},
        default: `visible`,
        expression: {interpolated: false, parameters: [`global-state`]},
        "property-type": `data-constant`,
      },
    },
    layout_raster: {
      visibility: {
        type: `enum`,
        values: {visible: {}, none: {}},
        default: `visible`,
        expression: {interpolated: false, parameters: [`global-state`]},
        "property-type": `data-constant`,
      },
    },
    layout_hillshade: {
      visibility: {
        type: `enum`,
        values: {visible: {}, none: {}},
        default: `visible`,
        expression: {interpolated: false, parameters: [`global-state`]},
        "property-type": `data-constant`,
      },
    },
    "layout_color-relief": {
      visibility: {
        type: `enum`,
        values: {visible: {}, none: {}},
        default: `visible`,
        expression: {interpolated: false, parameters: [`global-state`]},
        "property-type": `data-constant`,
      },
    },
    filter: {
      type: `boolean`,
      expression: {interpolated: false, parameters: [`zoom`, `feature`]},
      "property-type": `data-driven`,
    },
    filter_operator: {
      type: `enum`,
      values: {
        "==": {},
        "!=": {},
        ">": {},
        ">=": {},
        "<": {},
        "<=": {},
        in: {},
        "!in": {},
        all: {},
        any: {},
        none: {},
        has: {},
        "!has": {},
      },
    },
    geometry_type: {
      type: `enum`,
      values: {Point: {}, LineString: {}, Polygon: {}},
    },
    function: {
      expression: {type: `expression`},
      stops: {type: `array`, value: `function_stop`},
      base: {type: `number`, default: 1, minimum: 0},
      property: {type: `string`, default: `$zoom`},
      type: {
        type: `enum`,
        values: {identity: {}, exponential: {}, interval: {}, categorical: {}},
        default: `exponential`,
      },
      colorSpace: {
        type: `enum`,
        values: {rgb: {}, lab: {}, hcl: {}},
        default: `rgb`,
      },
      default: {type: `*`, required: false},
    },
    function_stop: {
      type: `array`,
      minimum: 0,
      maximum: 24,
      value: [`number`, `color`],
      length: 2,
    },
    expression: {type: `array`, value: `expression_name`, minimum: 1},
    light: {
      anchor: {
        type: `enum`,
        default: `viewport`,
        values: {map: {}, viewport: {}},
        "property-type": `data-constant`,
        transition: false,
        expression: {interpolated: false, parameters: [`zoom`]},
      },
      position: {
        type: `array`,
        default: [1.15, 210, 30],
        length: 3,
        value: `number`,
        "property-type": `data-constant`,
        transition: true,
        expression: {interpolated: true, parameters: [`zoom`]},
      },
      color: {
        type: `color`,
        "property-type": `data-constant`,
        default: `#ffffff`,
        expression: {interpolated: true, parameters: [`zoom`]},
        transition: true,
      },
      intensity: {
        type: `number`,
        "property-type": `data-constant`,
        default: 0.5,
        minimum: 0,
        maximum: 1,
        expression: {interpolated: true, parameters: [`zoom`]},
        transition: true,
      },
    },
    sky: {
      "sky-color": {
        type: `color`,
        "property-type": `data-constant`,
        default: `#88C6FC`,
        expression: {interpolated: true, parameters: [`zoom`]},
        transition: true,
      },
      "horizon-color": {
        type: `color`,
        "property-type": `data-constant`,
        default: `#ffffff`,
        expression: {interpolated: true, parameters: [`zoom`]},
        transition: true,
      },
      "fog-color": {
        type: `color`,
        "property-type": `data-constant`,
        default: `#ffffff`,
        expression: {interpolated: true, parameters: [`zoom`]},
        transition: true,
      },
      "fog-ground-blend": {
        type: `number`,
        "property-type": `data-constant`,
        default: 0.5,
        minimum: 0,
        maximum: 1,
        expression: {interpolated: true, parameters: [`zoom`]},
        transition: true,
      },
      "horizon-fog-blend": {
        type: `number`,
        "property-type": `data-constant`,
        default: 0.8,
        minimum: 0,
        maximum: 1,
        expression: {interpolated: true, parameters: [`zoom`]},
        transition: true,
      },
      "sky-horizon-blend": {
        type: `number`,
        "property-type": `data-constant`,
        default: 0.8,
        minimum: 0,
        maximum: 1,
        expression: {interpolated: true, parameters: [`zoom`]},
        transition: true,
      },
      "atmosphere-blend": {
        type: `number`,
        "property-type": `data-constant`,
        default: 0.8,
        minimum: 0,
        maximum: 1,
        expression: {interpolated: true, parameters: [`zoom`]},
        transition: true,
      },
    },
    terrain: {
      source: {type: `string`, required: true},
      exaggeration: {type: `number`, minimum: 0, default: 1},
    },
    projection: {
      type: {
        type: `projectionDefinition`,
        default: `mercator`,
        "property-type": `data-constant`,
        transition: false,
        expression: {interpolated: true, parameters: [`zoom`]},
      },
    },
    paint: [
      `paint_fill`,
      `paint_line`,
      `paint_circle`,
      `paint_heatmap`,
      `paint_fill-extrusion`,
      `paint_symbol`,
      `paint_raster`,
      `paint_hillshade`,
      `paint_color-relief`,
      `paint_background`,
    ],
    paint_fill: {
      "fill-antialias": {
        type: `boolean`,
        default: true,
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "fill-opacity": {
        type: `number`,
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: true,
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "fill-layer-opacity": {
        type: `number`,
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: true,
        expression: {interpolated: true, parameters: [`zoom`, `global-state`]},
        "property-type": `data-constant`,
      },
      "fill-color": {
        type: `color`,
        default: `#000000`,
        transition: true,
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "fill-outline-color": {
        type: `color`,
        transition: true,
        requires: [{"!": `fill-pattern`}, {"fill-antialias": true}],
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "fill-translate": {
        type: `array`,
        value: `number`,
        length: 2,
        default: [0, 0],
        transition: true,
        units: `pixels`,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "fill-translate-anchor": {
        type: `enum`,
        values: {map: {}, viewport: {}},
        default: `map`,
        requires: [`fill-translate`],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "fill-pattern": {
        type: `resolvedImage`,
        transition: true,
        expression: {interpolated: false, parameters: [`zoom`, `feature`]},
        "property-type": `cross-faded-data-driven`,
      },
    },
    "paint_fill-extrusion": {
      "fill-extrusion-opacity": {
        type: `number`,
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: true,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "fill-extrusion-color": {
        type: `color`,
        default: `#000000`,
        transition: true,
        requires: [{"!": `fill-extrusion-pattern`}],
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "fill-extrusion-translate": {
        type: `array`,
        value: `number`,
        length: 2,
        default: [0, 0],
        transition: true,
        units: `pixels`,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "fill-extrusion-translate-anchor": {
        type: `enum`,
        values: {map: {}, viewport: {}},
        default: `map`,
        requires: [`fill-extrusion-translate`],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "fill-extrusion-pattern": {
        type: `resolvedImage`,
        transition: true,
        expression: {interpolated: false, parameters: [`zoom`, `feature`]},
        "property-type": `cross-faded-data-driven`,
      },
      "fill-extrusion-height": {
        type: `number`,
        default: 0,
        minimum: 0,
        units: `meters`,
        transition: true,
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "fill-extrusion-base": {
        type: `number`,
        default: 0,
        minimum: 0,
        units: `meters`,
        transition: true,
        requires: [`fill-extrusion-height`],
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "fill-extrusion-vertical-gradient": {
        type: `boolean`,
        default: true,
        transition: false,
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
    },
    paint_line: {
      "line-opacity": {
        type: `number`,
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: true,
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "line-layer-opacity": {
        type: `number`,
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: true,
        expression: {interpolated: true, parameters: [`zoom`, `global-state`]},
        "property-type": `data-constant`,
      },
      "line-color": {
        type: `color`,
        default: `#000000`,
        transition: true,
        requires: [{"!": `line-pattern`}],
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "line-translate": {
        type: `array`,
        value: `number`,
        length: 2,
        default: [0, 0],
        transition: true,
        units: `pixels`,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "line-translate-anchor": {
        type: `enum`,
        values: {map: {}, viewport: {}},
        default: `map`,
        requires: [`line-translate`],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "line-width": {
        type: `number`,
        default: 1,
        minimum: 0,
        transition: true,
        units: `pixels`,
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "line-gap-width": {
        type: `number`,
        default: 0,
        minimum: 0,
        transition: true,
        units: `pixels`,
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "line-offset": {
        type: `number`,
        default: 0,
        transition: true,
        units: `pixels`,
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "line-blur": {
        type: `number`,
        default: 0,
        minimum: 0,
        transition: true,
        units: `pixels`,
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "line-dasharray": {
        type: `array`,
        value: `number`,
        minimum: 0,
        transition: true,
        units: `line widths`,
        requires: [{"!": `line-pattern`}],
        expression: {interpolated: false, parameters: [`zoom`, `feature`]},
        "property-type": `cross-faded-data-driven`,
      },
      "line-pattern": {
        type: `resolvedImage`,
        transition: true,
        expression: {interpolated: false, parameters: [`zoom`, `feature`]},
        "property-type": `cross-faded-data-driven`,
      },
      "line-gradient": {
        type: `color`,
        transition: false,
        requires: [
          {"!": `line-dasharray`},
          {"!": `line-pattern`},
          {source: `geojson`, has: {lineMetrics: true}},
        ],
        expression: {interpolated: true, parameters: [`line-progress`]},
        "property-type": `color-ramp`,
      },
    },
    paint_circle: {
      "circle-radius": {
        type: `number`,
        default: 5,
        minimum: 0,
        transition: true,
        units: `pixels`,
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "circle-color": {
        type: `color`,
        default: `#000000`,
        transition: true,
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "circle-blur": {
        type: `number`,
        default: 0,
        transition: true,
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "circle-opacity": {
        type: `number`,
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: true,
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "circle-translate": {
        type: `array`,
        value: `number`,
        length: 2,
        default: [0, 0],
        transition: true,
        units: `pixels`,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "circle-translate-anchor": {
        type: `enum`,
        values: {map: {}, viewport: {}},
        default: `map`,
        requires: [`circle-translate`],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "circle-pitch-scale": {
        type: `enum`,
        values: {map: {}, viewport: {}},
        default: `map`,
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "circle-pitch-alignment": {
        type: `enum`,
        values: {map: {}, viewport: {}},
        default: `viewport`,
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "circle-stroke-width": {
        type: `number`,
        default: 0,
        minimum: 0,
        transition: true,
        units: `pixels`,
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "circle-stroke-color": {
        type: `color`,
        default: `#000000`,
        transition: true,
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "circle-stroke-opacity": {
        type: `number`,
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: true,
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
    },
    paint_heatmap: {
      "heatmap-radius": {
        type: `number`,
        default: 30,
        minimum: 1,
        transition: true,
        units: `pixels`,
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "heatmap-weight": {
        type: `number`,
        default: 1,
        minimum: 0,
        transition: false,
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "heatmap-intensity": {
        type: `number`,
        default: 1,
        minimum: 0,
        transition: true,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "heatmap-color": {
        type: `color`,
        default: [
          `interpolate`,
          [`linear`],
          [`heatmap-density`],
          0,
          `rgba(0, 0, 255, 0)`,
          0.1,
          `royalblue`,
          0.3,
          `cyan`,
          0.5,
          `lime`,
          0.7,
          `yellow`,
          1,
          `red`,
        ],
        transition: false,
        expression: {interpolated: true, parameters: [`heatmap-density`]},
        "property-type": `color-ramp`,
      },
      "heatmap-opacity": {
        type: `number`,
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: true,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
    },
    paint_symbol: {
      "icon-opacity": {
        type: `number`,
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: true,
        requires: [`icon-image`],
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "icon-color": {
        type: `color`,
        default: `#000000`,
        transition: true,
        requires: [`icon-image`],
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "icon-halo-color": {
        type: `color`,
        default: `rgba(0, 0, 0, 0)`,
        transition: true,
        requires: [`icon-image`],
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "icon-halo-width": {
        type: `number`,
        default: 0,
        minimum: 0,
        transition: true,
        units: `pixels`,
        requires: [`icon-image`],
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "icon-halo-blur": {
        type: `number`,
        default: 0,
        minimum: 0,
        transition: true,
        units: `pixels`,
        requires: [`icon-image`],
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "icon-translate": {
        type: `array`,
        value: `number`,
        length: 2,
        default: [0, 0],
        transition: true,
        units: `pixels`,
        requires: [`icon-image`],
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "icon-translate-anchor": {
        type: `enum`,
        values: {map: {}, viewport: {}},
        default: `map`,
        requires: [`icon-image`, `icon-translate`],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "text-opacity": {
        type: `number`,
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: true,
        requires: [`text-field`],
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "text-color": {
        type: `color`,
        default: `#000000`,
        transition: true,
        overridable: true,
        requires: [`text-field`],
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "text-halo-color": {
        type: `color`,
        default: `rgba(0, 0, 0, 0)`,
        transition: true,
        requires: [`text-field`],
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "text-halo-width": {
        type: `number`,
        default: 0,
        minimum: 0,
        transition: true,
        units: `pixels`,
        requires: [`text-field`],
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "text-halo-blur": {
        type: `number`,
        default: 0,
        minimum: 0,
        transition: true,
        units: `pixels`,
        requires: [`text-field`],
        expression: {
          interpolated: true,
          parameters: [`zoom`, `feature`, `feature-state`],
        },
        "property-type": `data-driven`,
      },
      "text-translate": {
        type: `array`,
        value: `number`,
        length: 2,
        default: [0, 0],
        transition: true,
        units: `pixels`,
        requires: [`text-field`],
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "text-translate-anchor": {
        type: `enum`,
        values: {map: {}, viewport: {}},
        default: `map`,
        requires: [`text-field`, `text-translate`],
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
    },
    paint_raster: {
      "raster-opacity": {
        type: `number`,
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: true,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "raster-hue-rotate": {
        type: `number`,
        default: 0,
        period: 360,
        transition: true,
        units: `degrees`,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "raster-brightness-min": {
        type: `number`,
        default: 0,
        minimum: 0,
        maximum: 1,
        transition: true,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "raster-brightness-max": {
        type: `number`,
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: true,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "raster-saturation": {
        type: `number`,
        default: 0,
        minimum: -1,
        maximum: 1,
        transition: true,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "raster-contrast": {
        type: `number`,
        default: 0,
        minimum: -1,
        maximum: 1,
        transition: true,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      resampling: {
        type: `enum`,
        values: {linear: {}, nearest: {}},
        default: `linear`,
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "raster-resampling": {
        type: `enum`,
        values: {linear: {}, nearest: {}},
        default: `linear`,
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "raster-fade-duration": {
        type: `number`,
        default: 300,
        minimum: 0,
        transition: false,
        units: `milliseconds`,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
    },
    paint_hillshade: {
      "hillshade-illumination-direction": {
        type: `numberArray`,
        default: 335,
        minimum: 0,
        maximum: 359,
        transition: false,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "hillshade-illumination-altitude": {
        type: `numberArray`,
        default: 45,
        minimum: 0,
        maximum: 90,
        transition: false,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "hillshade-illumination-anchor": {
        type: `enum`,
        values: {map: {}, viewport: {}},
        default: `viewport`,
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "hillshade-exaggeration": {
        type: `number`,
        default: 0.5,
        minimum: 0,
        maximum: 1,
        transition: true,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "hillshade-shadow-color": {
        type: `colorArray`,
        default: `#000000`,
        transition: true,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "hillshade-highlight-color": {
        type: `colorArray`,
        default: `#FFFFFF`,
        transition: true,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "hillshade-accent-color": {
        type: `color`,
        default: `#000000`,
        transition: true,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "hillshade-method": {
        type: `enum`,
        values: {
          standard: {},
          basic: {},
          combined: {},
          igor: {},
          multidirectional: {},
        },
        default: `standard`,
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      resampling: {
        type: `enum`,
        values: {linear: {}, nearest: {}},
        default: `linear`,
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
    },
    "paint_color-relief": {
      "color-relief-opacity": {
        type: `number`,
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: true,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "color-relief-color": {
        type: `color`,
        transition: false,
        expression: {interpolated: true, parameters: [`elevation`]},
        "property-type": `color-ramp`,
      },
      resampling: {
        type: `enum`,
        values: {linear: {}, nearest: {}},
        default: `linear`,
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
    },
    paint_background: {
      "background-color": {
        type: `color`,
        default: `#000000`,
        transition: true,
        requires: [{"!": `background-pattern`}],
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
      "background-pattern": {
        type: `resolvedImage`,
        transition: true,
        expression: {interpolated: false, parameters: [`zoom`]},
        "property-type": `cross-faded`,
      },
      "background-opacity": {
        type: `number`,
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: true,
        expression: {interpolated: true, parameters: [`zoom`]},
        "property-type": `data-constant`,
      },
    },
    transition: {
      duration: {
        type: `number`,
        default: 300,
        minimum: 0,
        units: `milliseconds`,
      },
      delay: {type: `number`, default: 0, minimum: 0, units: `milliseconds`},
    },
    "property-type": {
      "data-driven": {type: `property-type`},
      "cross-faded": {type: `property-type`},
      "cross-faded-data-driven": {type: `property-type`},
      "color-ramp": {type: `property-type`},
      "data-constant": {type: `property-type`},
      constant: {type: `property-type`},
    },
    promoteId: {"*": {type: `string`}},
    interpolation: {type: `array`, value: `interpolation_name`, minimum: 1},
    interpolation_name: {
      type: `enum`,
      values: {
        linear: {
          syntax: {
            overloads: [{parameters: [], "output-type": `interpolation`}],
            parameters: [],
          },
        },
        exponential: {
          syntax: {
            overloads: [{parameters: [`base`], "output-type": `interpolation`}],
            parameters: [{name: `base`, type: `number literal`}],
          },
        },
        "cubic-bezier": {
          syntax: {
            overloads: [
              {
                parameters: [`x1`, `y1`, `x2`, `y2`],
                "output-type": `interpolation`,
              },
            ],
            parameters: [
              {name: `x1`, type: `number literal`},
              {name: `y1`, type: `number literal`},
              {name: `x2`, type: `number literal`},
              {name: `y2`, type: `number literal`},
            ],
          },
        },
      },
    },
  }
const M = Rn,
  zn = [
    `type`,
    `source`,
    `source-layer`,
    `minzoom`,
    `maxzoom`,
    `filter`,
    `layout`,
  ]
var N = class {
  constructor(e52, t2, n2, r2, i2 = `error`) {
    ;((this.message = (e52 ? `${e52}: ` : ``) + n2),
      r2 && (this.identifier = r2),
      (this.severity = i2),
      t2 != null && t2.__line__ && (this.line = t2.__line__))
  }
}
const Bn = {kind: `null`},
  P = {kind: `number`},
  F = {kind: `string`},
  I = {kind: `boolean`},
  Vn = {kind: `color`},
  Hn = {kind: `projectionDefinition`},
  Un = {kind: `object`},
  L = {kind: `value`},
  Wn = {kind: `error`},
  Gn = {kind: `collator`},
  Kn = {kind: `formatted`},
  qn = {kind: `padding`},
  Jn = {kind: `colorArray`},
  Yn = {kind: `numberArray`},
  Xn = {kind: `resolvedImage`},
  Zn = {kind: `variableAnchorOffsetCollection`}
function Qn(e52, t2) {
  return {kind: `array`, itemType: e52, N: t2}
}
function R(e52) {
  if (e52.kind === `array`) {
    let t2 = R(e52.itemType)
    return typeof e52.N == `number`
      ? `array<${t2}, ${e52.N}>`
      : e52.itemType.kind === `value`
        ? `array`
        : `array<${t2}>`
  }
  return e52.kind
}
const $n = [Bn, P, F, I, Vn, Hn, Kn, Un, Qn(L), qn, Yn, Jn, Xn, Zn]
function er(e52, t2) {
  if (t2.kind === `error`) return null
  if (e52.kind === `array`) {
    if (
      t2.kind === `array` &&
      ((t2.N === 0 && t2.itemType.kind === `value`) ||
        !er(e52.itemType, t2.itemType)) &&
      (typeof e52.N != `number` || e52.N === t2.N)
    )
      return null
  } else if (e52.kind === t2.kind) return null
  else if (e52.kind === `value`) {
    for (let e53 of $n) if (!er(e53, t2)) return null
  }
  return `Expected ${R(e52)} but found ${R(t2)} instead.`
}
function tr(e52, t2) {
  return t2.some(t3 => t3.kind === e52.kind)
}
function nr(e52, t2) {
  return t2.some(t3 =>
    t3 === `null`
      ? e52 === null
      : t3 === `array`
        ? Array.isArray(e52)
        : t3 === `object`
          ? e52 && !Array.isArray(e52) && typeof e52 == `object`
          : t3 === typeof e52
  )
}
function rr(e52, t2) {
  return e52.kind === `array` && t2.kind === `array`
    ? e52.itemType.kind === t2.itemType.kind && typeof e52.N == `number`
    : e52.kind === t2.kind
}
const ir = 0.96422,
  ar = 0.82521,
  or = 4 / 29,
  sr = 6 / 29,
  cr = 3 * sr * sr,
  lr = Math.PI / 180,
  ur = 180 / Math.PI
function dr(e52) {
  return ((e52 %= 360), e52 < 0 && (e52 += 360), e52)
}
function fr([e52, t2, n2, r2]) {
  ;((e52 = pr(e52)), (t2 = pr(t2)), (n2 = pr(n2)))
  let i2,
    a2,
    o2 = mr((0.2225045 * e52 + 0.7168786 * t2 + 0.0606169 * n2) / 1)
  e52 === t2 && t2 === n2
    ? (i2 = a2 = o2)
    : ((i2 = mr((0.4360747 * e52 + 0.3850649 * t2 + 0.1430804 * n2) / ir)),
      (a2 = mr((0.0139322 * e52 + 0.0971045 * t2 + 0.7141733 * n2) / ar)))
  let s2 = 116 * o2 - 16
  return [s2 < 0 ? 0 : s2, 500 * (i2 - o2), 200 * (o2 - a2), r2]
}
function pr(e52) {
  return e52 <= 0.04045 ? e52 / 12.92 : ((e52 + 0.055) / 1.055) ** 2.4
}
function mr(e52) {
  return e52 > 0.008856451679035631 ? e52 ** (1 / 3) : e52 / cr + or
}
function hr([e52, t2, n2, r2]) {
  let i2 = (e52 + 16) / 116,
    a2 = isNaN(t2) ? i2 : i2 + t2 / 500,
    o2 = isNaN(n2) ? i2 : i2 - n2 / 200
  return (
    (i2 = 1 * _r(i2)),
    (a2 = ir * _r(a2)),
    (o2 = ar * _r(o2)),
    [
      gr(3.1338561 * a2 - 1.6168667 * i2 - 0.4906146 * o2),
      gr(-0.9787684 * a2 + 1.9161415 * i2 + 0.033454 * o2),
      gr(0.0719453 * a2 - 0.2289914 * i2 + 1.4052427 * o2),
      r2,
    ]
  )
}
function gr(e52) {
  return (
    (e52 = e52 <= 304e-5 ? 12.92 * e52 : 1.055 * e52 ** (1 / 2.4) - 0.055),
    e52 < 0 ? 0 : e52 > 1 ? 1 : e52
  )
}
function _r(e52) {
  return e52 > sr ? e52 * e52 * e52 : cr * (e52 - or)
}
function vr(e52) {
  let [t2, n2, r2, i2] = fr(e52),
    a2 = Math.sqrt(n2 * n2 + r2 * r2)
  return [Math.round(a2 * 1e4) ? dr(Math.atan2(r2, n2) * ur) : NaN, a2, t2, i2]
}
function yr([e52, t2, n2, r2]) {
  return (
    (e52 = isNaN(e52) ? 0 : e52 * lr),
    hr([n2, Math.cos(e52) * t2, Math.sin(e52) * t2, r2])
  )
}
function br([e52, t2, n2, r2]) {
  ;((e52 = dr(e52)), (t2 /= 100), (n2 /= 100))
  function i2(r3) {
    let i3 = (r3 + e52 / 30) % 12,
      a2 = t2 * Math.min(n2, 1 - n2)
    return n2 - a2 * Math.max(-1, Math.min(i3 - 3, 9 - i3, 1))
  }
  return [i2(0), i2(8), i2(4), r2]
}
const xr =
  Object.hasOwn ||
  function (e52, t2) {
    return Object.prototype.hasOwnProperty.call(e52, t2)
  }
function Sr(e52, t2) {
  return xr(e52, t2) ? e52[t2] : void 0
}
function Cr(e52) {
  if (((e52 = e52.toLowerCase().trim()), e52 === `transparent`))
    return [0, 0, 0, 0]
  let t2 = Sr(Or, e52)
  if (t2) {
    let [e53, n3, r2] = t2
    return [e53 / 255, n3 / 255, r2 / 255, 1]
  }
  if (
    e52.startsWith(`#`) &&
    /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(e52)
  ) {
    let t3 = e52.length < 6 ? 1 : 2,
      n3 = 1
    return [
      wr(e52.slice(n3, (n3 += t3))),
      wr(e52.slice(n3, (n3 += t3))),
      wr(e52.slice(n3, (n3 += t3))),
      wr(e52.slice(n3, n3 + t3) || `ff`),
    ]
  }
  if (e52.startsWith(`rgb`)) {
    let t3 = e52.match(
      /^rgba?\(\s*([\de.+-]+)(%)?(?:\s+|\s*(,)\s*)([\de.+-]+)(%)?(?:\s+|\s*(,)\s*)([\de.+-]+)(%)?(?:\s*([,\/])\s*([\de.+-]+)(%)?)?\s*\)$/
    )
    if (t3) {
      let [e53, n3, r2, i2, a2, o2, s2, c2, l2, u2, d2, f2] = t3,
        p2 = [i2 || ` `, s2 || ` `, u2].join(``)
      if (p2 === `  ` || p2 === `  /` || p2 === `,,` || p2 === `,,,`) {
        let e54 = [r2, o2, l2].join(``),
          t4 = e54 === `%%%` ? 100 : e54 === `` ? 255 : 0
        if (t4) {
          let e55 = [
            Er(+n3 / t4, 0, 1),
            Er(+a2 / t4, 0, 1),
            Er(+c2 / t4, 0, 1),
            d2 ? Tr(+d2, f2) : 1,
          ]
          if (Dr(e55)) return e55
        }
      }
      return
    }
  }
  let n2 = e52.match(
    /^hsla?\(\s*([\de.+-]+)(?:deg)?(?:\s+|\s*(,)\s*)([\de.+-]+)%(?:\s+|\s*(,)\s*)([\de.+-]+)%(?:\s*([,\/])\s*([\de.+-]+)(%)?)?\s*\)$/
  )
  if (n2) {
    let [e53, t3, r2, i2, a2, o2, s2, c2, l2] = n2,
      u2 = [r2 || ` `, a2 || ` `, s2].join(``)
    if (u2 === `  ` || u2 === `  /` || u2 === `,,` || u2 === `,,,`) {
      let e54 = [+t3, Er(+i2, 0, 100), Er(+o2, 0, 100), c2 ? Tr(+c2, l2) : 1]
      if (Dr(e54)) return br(e54)
    }
  }
}
function wr(e52) {
  return parseInt(e52.padEnd(2, e52), 16) / 255
}
function Tr(e52, t2) {
  return Er(t2 ? e52 / 100 : e52, 0, 1)
}
function Er(e52, t2, n2) {
  return Math.min(Math.max(t2, e52), n2)
}
function Dr(e52) {
  return !e52.some(Number.isNaN)
}
const Or = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50],
}
function kr(e52, t2, n2) {
  return e52 + n2 * (t2 - e52)
}
function Ar(e52, t2, n2) {
  return e52.map((e53, r2) => kr(e53, t2[r2], n2))
}
function jr(e52) {
  return e52 === `rgb` || e52 === `hcl` || e52 === `lab`
}
var z = class e2 {
  constructor(e52, t2, n2, r2 = 1, i2 = true) {
    ;((this.r = e52),
      (this.g = t2),
      (this.b = n2),
      (this.a = r2),
      i2 ||
        ((this.r *= r2),
        (this.g *= r2),
        (this.b *= r2),
        r2 || this.overwriteGetter(`rgb`, [e52, t2, n2, r2])))
  }
  static {
    this.black = new e2(0, 0, 0, 1)
  }
  static {
    this.white = new e2(1, 1, 1, 1)
  }
  static {
    this.transparent = new e2(0, 0, 0, 0)
  }
  static {
    this.red = new e2(1, 0, 0, 1)
  }
  static parse(t2) {
    if (t2 instanceof e2) return t2
    if (typeof t2 != `string`) return
    let n2 = Cr(t2)
    if (n2) return new e2(...n2, false)
  }
  get rgb() {
    let {r: e52, g: t2, b: n2, a: r2} = this,
      i2 = r2 || 1 / 0
    return this.overwriteGetter(`rgb`, [e52 / i2, t2 / i2, n2 / i2, r2])
  }
  get hcl() {
    return this.overwriteGetter(`hcl`, vr(this.rgb))
  }
  get lab() {
    return this.overwriteGetter(`lab`, fr(this.rgb))
  }
  overwriteGetter(e52, t2) {
    return (Object.defineProperty(this, e52, {value: t2}), t2)
  }
  toString() {
    let [e52, t2, n2, r2] = this.rgb
    return `rgba(${[e52, t2, n2].map(e53 => Math.round(e53 * 255)).join(`,`)},${r2})`
  }
  static interpolate(t2, n2, r2, i2 = `rgb`) {
    switch (i2) {
      case `rgb`: {
        let [i3, a2, o2, s2] = Ar(t2.rgb, n2.rgb, r2)
        return new e2(i3, a2, o2, s2, false)
      }
      case `hcl`: {
        let [i3, a2, o2, s2] = t2.hcl,
          [c2, l2, u2, d2] = n2.hcl,
          f2,
          p2
        if (!isNaN(i3) && !isNaN(c2)) {
          let e52 = c2 - i3
          ;(c2 > i3 && e52 > 180
            ? (e52 -= 360)
            : c2 < i3 && i3 - c2 > 180 && (e52 += 360),
            (f2 = i3 + r2 * e52))
        } else
          isNaN(i3)
            ? isNaN(c2)
              ? (f2 = NaN)
              : ((f2 = c2), (o2 === 1 || o2 === 0) && (p2 = l2))
            : ((f2 = i3), (u2 === 1 || u2 === 0) && (p2 = a2))
        let [m2, h2, g2, _2] = yr([
          f2,
          p2 ?? kr(a2, l2, r2),
          kr(o2, u2, r2),
          kr(s2, d2, r2),
        ])
        return new e2(m2, h2, g2, _2, false)
      }
      case `lab`: {
        let [i3, a2, o2, s2] = hr(Ar(t2.lab, n2.lab, r2))
        return new e2(i3, a2, o2, s2, false)
      }
    }
  }
}
const Mr = [`bottom`, `center`, `top`]
var Nr = class {
    constructor(e52, t2, n2, r2, i2, a2) {
      ;((this.text = e52),
        (this.image = t2),
        (this.scale = n2),
        (this.fontStack = r2),
        (this.textColor = i2),
        (this.verticalAlign = a2))
    }
  },
  Pr = class e3 {
    constructor(e52) {
      this.sections = e52
    }
    static fromString(t2) {
      return new e3([new Nr(t2, null, null, null, null, null)])
    }
    isEmpty() {
      return (
        this.sections.length === 0 ||
        !this.sections.some(
          e52 =>
            e52.text.length !== 0 || (e52.image && e52.image.name.length !== 0)
        )
      )
    }
    static factory(t2) {
      return t2 instanceof e3 ? t2 : e3.fromString(t2)
    }
    toString() {
      return this.sections.length === 0
        ? ``
        : this.sections.map(e52 => e52.text).join(``)
    }
  },
  Fr = class e4 {
    constructor(e52) {
      this.values = e52.slice()
    }
    static parse(t2) {
      if (t2 instanceof e4) return t2
      if (typeof t2 == `number`) return new e4([t2, t2, t2, t2])
      if (Array.isArray(t2) && !(t2.length < 1 || t2.length > 4)) {
        for (let e52 of t2) if (typeof e52 != `number`) return
        switch (t2.length) {
          case 1:
            t2 = [t2[0], t2[0], t2[0], t2[0]]
            break
          case 2:
            t2 = [t2[0], t2[1], t2[0], t2[1]]
            break
          case 3:
            t2 = [t2[0], t2[1], t2[2], t2[1]]
        }
        return new e4(t2)
      }
    }
    toString() {
      return JSON.stringify(this.values)
    }
    static interpolate(t2, n2, r2) {
      return new e4(Ar(t2.values, n2.values, r2))
    }
  },
  Ir = class e5 {
    constructor(e52) {
      this.values = e52.slice()
    }
    static parse(t2) {
      if (t2 instanceof e5) return t2
      if (typeof t2 == `number`) return new e5([t2])
      if (Array.isArray(t2)) {
        for (let e52 of t2) if (typeof e52 != `number`) return
        return new e5(t2)
      }
    }
    toString() {
      return JSON.stringify(this.values)
    }
    static interpolate(t2, n2, r2) {
      return new e5(Ar(t2.values, n2.values, r2))
    }
  },
  Lr = class e6 {
    constructor(e52) {
      this.values = e52.slice()
    }
    static parse(t2) {
      if (t2 instanceof e6) return t2
      if (typeof t2 == `string`) {
        let n3 = z.parse(t2)
        return n3 ? new e6([n3]) : void 0
      }
      if (!Array.isArray(t2)) return
      let n2 = []
      for (let e52 of t2) {
        if (typeof e52 != `string`) return
        let t3 = z.parse(e52)
        if (!t3) return
        n2.push(t3)
      }
      return new e6(n2)
    }
    toString() {
      return JSON.stringify(this.values)
    }
    static interpolate(t2, n2, r2, i2 = `rgb`) {
      let a2 = []
      if (t2.values.length != n2.values.length)
        throw Error(
          `colorArray: Arrays have mismatched length (${t2.values.length} vs. ${n2.values.length}), cannot interpolate.`
        )
      for (let e52 = 0; e52 < t2.values.length; e52++)
        a2.push(z.interpolate(t2.values[e52], n2.values[e52], r2, i2))
      return new e6(a2)
    }
  },
  B = class extends Error {
    constructor(e52, t2) {
      ;(super(e52), (this.name = `RuntimeError`), (this.path = t2))
    }
    toJSON() {
      return this.message
    }
  }
const Rr = /* @__PURE__ */ new Set([
  `center`,
  `left`,
  `right`,
  `top`,
  `bottom`,
  `top-left`,
  `top-right`,
  `bottom-left`,
  `bottom-right`,
])
var zr = class e7 {
    constructor(e52) {
      this.values = e52.slice()
    }
    static parse(t2) {
      if (t2 instanceof e7) return t2
      if (!(!Array.isArray(t2) || t2.length < 1 || t2.length % 2 != 0)) {
        for (let e52 = 0; e52 < t2.length; e52 += 2) {
          let n2 = t2[e52],
            r2 = t2[e52 + 1]
          if (
            typeof n2 != `string` ||
            !Rr.has(n2) ||
            !Array.isArray(r2) ||
            r2.length !== 2 ||
            typeof r2[0] != `number` ||
            typeof r2[1] != `number`
          )
            return
        }
        return new e7(t2)
      }
    }
    toString() {
      return JSON.stringify(this.values)
    }
    static interpolate(t2, n2, r2, i2) {
      let a2 = t2.values,
        o2 = n2.values
      if (a2.length !== o2.length)
        throw new B(
          `Cannot interpolate values of different length. from: ${t2.toString()}, to: ${n2.toString()}`,
          i2
        )
      let s2 = []
      for (let e52 = 0; e52 < a2.length; e52 += 2) {
        if (a2[e52] !== o2[e52])
          throw new B(
            `Cannot interpolate values containing mismatched anchors. from[${e52}]: ${a2[e52]}, to[${e52}]: ${o2[e52]}`,
            i2
          )
        s2.push(a2[e52])
        let [t3, n3] = a2[e52 + 1],
          [c2, l2] = o2[e52 + 1]
        s2.push([kr(t3, c2, r2), kr(n3, l2, r2)])
      }
      return new e7(s2)
    }
  },
  Br = class e8 {
    constructor(e52) {
      ;((this.name = e52.name), (this.available = e52.available))
    }
    toString() {
      return this.name
    }
    static fromString(t2) {
      return t2 ? new e8({name: t2, available: false}) : null
    }
  },
  Vr = class e9 {
    constructor(e52, t2, n2) {
      ;((this.from = e52), (this.to = t2), (this.transition = n2))
    }
    toString() {
      return this.from === this.to && this.transition === 1
        ? this.from
        : JSON.stringify([this.from, this.to, this.transition])
    }
    static interpolate(t2, n2, r2) {
      return new e9(t2, n2, r2)
    }
    static parse(t2) {
      if (t2 instanceof e9) return t2
      if (
        Array.isArray(t2) &&
        t2.length === 3 &&
        typeof t2[0] == `string` &&
        typeof t2[1] == `string` &&
        typeof t2[2] == `number`
      )
        return new e9(t2[0], t2[1], t2[2])
      if (
        typeof t2 == `object` &&
        typeof t2.from == `string` &&
        typeof t2.to == `string` &&
        typeof t2.transition == `number`
      )
        return new e9(t2.from, t2.to, t2.transition)
      if (typeof t2 == `string`) return new e9(t2, t2, 1)
    }
  },
  Hr = class {
    constructor(e52, t2, n2) {
      ;((this.sensitivity = e52
        ? t2
          ? `variant`
          : `case`
        : t2
          ? `accent`
          : `base`),
        (this.locale = n2),
        (this.collator = new Intl.Collator(this.locale ? this.locale : [], {
          sensitivity: this.sensitivity,
          usage: `search`,
        })))
    }
    compare(e52, t2) {
      return this.collator.compare(e52, t2)
    }
    resolvedLocale() {
      return new Intl.Collator(this.locale ? this.locale : []).resolvedOptions()
        .locale
    }
  }
function Ur(e52, t2, n2, r2) {
  return typeof e52 == `number` &&
    e52 >= 0 &&
    e52 <= 255 &&
    typeof t2 == `number` &&
    t2 >= 0 &&
    t2 <= 255 &&
    typeof n2 == `number` &&
    n2 >= 0 &&
    n2 <= 255
    ? r2 === void 0 || (typeof r2 == `number` && r2 >= 0 && r2 <= 1)
      ? null
      : `Invalid rgba value [${[e52, t2, n2, r2].join(`, `)}]: 'a' must be between 0 and 1.`
    : `Invalid rgba value [${(typeof r2 == `number` ? [e52, t2, n2, r2] : [e52, t2, n2]).join(`, `)}]: 'r', 'g', and 'b' must be between 0 and 255.`
}
function Wr(e52) {
  if (
    e52 === null ||
    typeof e52 == `string` ||
    typeof e52 == `boolean` ||
    typeof e52 == `number` ||
    e52 instanceof Vr ||
    e52 instanceof z ||
    e52 instanceof Hr ||
    e52 instanceof Pr ||
    e52 instanceof Fr ||
    e52 instanceof Ir ||
    e52 instanceof Lr ||
    e52 instanceof zr ||
    e52 instanceof Br
  )
    return true
  if (Array.isArray(e52)) {
    for (let t2 of e52) if (!Wr(t2)) return false
    return true
  }
  if (typeof e52 == `object`) {
    for (let t2 in e52) if (!Wr(e52[t2])) return false
    return true
  }
  return false
}
function Gr(e52) {
  if (e52 === null) return Bn
  if (typeof e52 == `string`) return F
  if (typeof e52 == `boolean`) return I
  if (typeof e52 == `number`) return P
  if (e52 instanceof z) return Vn
  if (e52 instanceof Vr) return Hn
  if (e52 instanceof Hr) return Gn
  if (e52 instanceof Pr) return Kn
  if (e52 instanceof Fr) return qn
  if (e52 instanceof Ir) return Yn
  if (e52 instanceof Lr) return Jn
  if (e52 instanceof zr) return Zn
  if (e52 instanceof Br) return Xn
  if (Array.isArray(e52)) {
    let t2 = e52.length,
      n2
    for (let t3 of e52) {
      let e53 = Gr(t3)
      if (!n2) n2 = e53
      else if (n2 === e53) continue
      else {
        n2 = L
        break
      }
    }
    return Qn(n2 || L, t2)
  }
  return Un
}
function Kr(e52) {
  let t2 = typeof e52
  return e52 === null
    ? ``
    : t2 === `string` || t2 === `number` || t2 === `boolean`
      ? String(e52)
      : e52 instanceof z ||
          e52 instanceof Vr ||
          e52 instanceof Pr ||
          e52 instanceof Fr ||
          e52 instanceof Ir ||
          e52 instanceof Lr ||
          e52 instanceof zr ||
          e52 instanceof Br
        ? e52.toString()
        : JSON.stringify(e52)
}
var qr = class e10 {
  constructor(e52, t2) {
    ;((this.type = e52), (this.value = t2))
  }
  static parse(t2, n2) {
    if (t2.length !== 2)
      return n2.error(
        `'literal' expression requires exactly one argument, but found ${t2.length - 1} instead.`
      )
    if (!Wr(t2[1])) return n2.error(`invalid value of type "${typeof t2[1]}"`)
    let r2 = t2[1],
      i2 = Gr(r2),
      a2 = n2.expectedType
    return (
      i2.kind === `array` &&
        i2.N === 0 &&
        a2 &&
        a2.kind === `array` &&
        (typeof a2.N != `number` || a2.N === 0) &&
        (i2 = a2),
      new e10(i2, r2)
    )
  }
  evaluate() {
    return this.value
  }
  eachChild() {}
  outputDefined() {
    return true
  }
}
const Jr = [`Unknown`, `Point`, `LineString`, `Polygon`]
var Yr = class {
  constructor() {
    ;((this.globals = null),
      (this.feature = null),
      (this.featureState = null),
      (this.formattedSection = null),
      (this._parseColorCache = /* @__PURE__ */ new Map()),
      (this.availableImages = null),
      (this.canonical = null))
  }
  id() {
    return this.feature && `id` in this.feature ? this.feature.id : null
  }
  geometryType() {
    return this.feature
      ? typeof this.feature.type == `number`
        ? Jr[this.feature.type]
        : this.feature.type
      : null
  }
  geometry() {
    return this.feature && `geometry` in this.feature
      ? this.feature.geometry
      : null
  }
  canonicalID() {
    return this.canonical
  }
  properties() {
    return (this.feature && this.feature.properties) || {}
  }
  parseColor(e52) {
    let t2 = this._parseColorCache.get(e52)
    return (t2 || ((t2 = z.parse(e52)), this._parseColorCache.set(e52, t2)), t2)
  }
}
function Xr(e52, t2, n2) {
  let r2 = e52.length - 1,
    i2 = 0,
    a2 = r2,
    o2 = 0,
    s2,
    c2
  for (; i2 <= a2;)
    if (
      ((o2 = Math.floor((i2 + a2) / 2)),
      (s2 = e52[o2]),
      (c2 = e52[o2 + 1]),
      s2 <= t2)
    ) {
      if (o2 === r2 || t2 < c2) return o2
      i2 = o2 + 1
    } else if (s2 > t2) a2 = o2 - 1
    else throw new B(`Input is not a number.`, n2)
  return 0
}
var Zr = class e11 {
  constructor(e52, t2, n2, r2) {
    ;((this.type = e52),
      (this.input = t2),
      (this.key = r2),
      (this.labels = []),
      (this.outputs = []))
    for (let [e53, t3] of n2) (this.labels.push(e53), this.outputs.push(t3))
  }
  static parse(t2, n2) {
    if (t2.length - 1 < 4)
      return n2.error(
        `Expected at least 4 arguments, but found only ${t2.length - 1}.`
      )
    if ((t2.length - 1) % 2 != 0)
      return n2.error(`Expected an even number of arguments.`)
    let r2 = n2.parse(t2[1], 1, P)
    if (!r2) return null
    let i2 = [],
      a2 = null
    n2.expectedType &&
      n2.expectedType.kind !== `value` &&
      (a2 = n2.expectedType)
    for (let e52 = 1; e52 < t2.length; e52 += 2) {
      let r3 = e52 === 1 ? -1 / 0 : t2[e52],
        o2 = t2[e52 + 1],
        s2 = e52,
        c2 = e52 + 1
      if (typeof r3 != `number`)
        return n2.error(
          `Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.`,
          s2
        )
      if (i2.length && i2[i2.length - 1][0] >= r3)
        return n2.error(
          `Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.`,
          s2
        )
      let l2 = n2.parse(o2, c2, a2)
      if (!l2) return null
      ;((a2 ||= l2.type), i2.push([r3, l2]))
    }
    return new e11(a2, r2, i2, n2.key)
  }
  evaluate(e52) {
    let t2 = this.labels,
      n2 = this.outputs
    if (t2.length === 1) return n2[0].evaluate(e52)
    let r2 = this.input.evaluate(e52)
    if (r2 <= t2[0]) return n2[0].evaluate(e52)
    let i2 = t2.length
    return r2 >= t2[i2 - 1]
      ? n2[i2 - 1].evaluate(e52)
      : n2[Xr(t2, r2, this.key)].evaluate(e52)
  }
  eachChild(e52) {
    e52(this.input)
    for (let t2 of this.outputs) e52(t2)
  }
  outputDefined() {
    return this.outputs.every(e52 => e52.outputDefined())
  }
}
function Qr(e52, t2, n2, r2) {
  let i2 = 3 * e52,
    a2 = 3 * (n2 - e52) - i2,
    o2 = 1 - i2 - a2,
    s2 = 3 * t2,
    c2 = 3 * (r2 - t2) - s2,
    l2 = 1 - s2 - c2
  return function (e53, t3 = 1e-6) {
    if (e53 <= 0) return 0
    if (e53 >= 1) return 1
    let n3 = e53
    for (let r4 = 0; r4 < 8; r4++) {
      let r5 = ((o2 * n3 + a2) * n3 + i2) * n3 - e53
      if (Math.abs(r5) < t3) return ((l2 * n3 + c2) * n3 + s2) * n3
      let u3 = (3 * o2 * n3 + 2 * a2) * n3 + i2
      if (Math.abs(u3) < 1e-6) break
      n3 -= r5 / u3
    }
    let r3 = 0,
      u2 = 1
    n3 = e53
    for (let s3 = 0; s3 < 20; s3++) {
      let s4 = ((o2 * n3 + a2) * n3 + i2) * n3
      if (Math.abs(s4 - e53) < t3) break
      ;(e53 > s4 ? (r3 = n3) : (u2 = n3), (n3 = (r3 + u2) * 0.5))
    }
    return ((l2 * n3 + c2) * n3 + s2) * n3
  }
}
var $r = class e12 {
  constructor(e52, t2, n2, r2, i2, a2) {
    ;((this.type = e52),
      (this.operator = t2),
      (this.interpolation = n2),
      (this.input = r2),
      (this.key = a2),
      (this.labels = []),
      (this.outputs = []))
    for (let [e53, t3] of i2) (this.labels.push(e53), this.outputs.push(t3))
  }
  static interpolationFactor(e52, t2, n2, r2) {
    let i2 = 0
    if (e52.name === `exponential`) i2 = ei(t2, e52.base, n2, r2)
    else if (e52.name === `linear`) i2 = ei(t2, 1, n2, r2)
    else if (e52.name === `cubic-bezier`) {
      let a2 = e52.controlPoints
      i2 = Qr(a2[0], a2[1], a2[2], a2[3])(ei(t2, 1, n2, r2))
    }
    return i2
  }
  static parse(t2, n2) {
    let [r2, i2, a2, ...o2] = t2
    if (!Array.isArray(i2) || i2.length === 0)
      return n2.error(`Expected an interpolation type expression.`, 1)
    if (i2[0] === `linear`) i2 = {name: `linear`}
    else if (i2[0] === `exponential`) {
      let e52 = i2[1]
      if (typeof e52 != `number`)
        return n2.error(
          `Exponential interpolation requires a numeric base.`,
          1,
          1
        )
      i2 = {name: `exponential`, base: e52}
    } else if (i2[0] === `cubic-bezier`) {
      let e52 = i2.slice(1)
      if (
        e52.length !== 4 ||
        e52.some(e53 => typeof e53 != `number` || e53 < 0 || e53 > 1)
      )
        return n2.error(
          `Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.`,
          1
        )
      i2 = {name: `cubic-bezier`, controlPoints: e52}
    } else return n2.error(`Unknown interpolation type ${String(i2[0])}`, 1, 0)
    if (t2.length - 1 < 4)
      return n2.error(
        `Expected at least 4 arguments, but found only ${t2.length - 1}.`
      )
    if ((t2.length - 1) % 2 != 0)
      return n2.error(`Expected an even number of arguments.`)
    if (((a2 = n2.parse(a2, 2, P)), !a2)) return null
    let s2 = [],
      c2 = null
    ;(r2 === `interpolate-hcl` || r2 === `interpolate-lab`) &&
    n2.expectedType != Jn
      ? (c2 = Vn)
      : n2.expectedType &&
        n2.expectedType.kind !== `value` &&
        (c2 = n2.expectedType)
    for (let e52 = 0; e52 < o2.length; e52 += 2) {
      let t3 = o2[e52],
        r3 = o2[e52 + 1],
        i3 = e52 + 3,
        a3 = e52 + 4
      if (typeof t3 != `number`)
        return n2.error(
          `Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.`,
          i3
        )
      if (s2.length && s2[s2.length - 1][0] >= t3)
        return n2.error(
          `Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.`,
          i3
        )
      let l2 = n2.parse(r3, a3, c2)
      if (!l2) return null
      ;((c2 ||= l2.type), s2.push([t3, l2]))
    }
    return !rr(c2, P) &&
      !rr(c2, Hn) &&
      !rr(c2, Vn) &&
      !rr(c2, qn) &&
      !rr(c2, Yn) &&
      !rr(c2, Jn) &&
      !rr(c2, Zn) &&
      !rr(c2, Qn(P))
      ? n2.error(`Type ${R(c2)} is not interpolatable.`)
      : new e12(c2, r2, i2, a2, s2, n2.key)
  }
  evaluate(t2) {
    let n2 = this.labels,
      r2 = this.outputs
    if (n2.length === 1) return r2[0].evaluate(t2)
    let i2 = this.input.evaluate(t2)
    if (i2 <= n2[0]) return r2[0].evaluate(t2)
    let a2 = n2.length
    if (i2 >= n2[a2 - 1]) return r2[a2 - 1].evaluate(t2)
    let o2 = Xr(n2, i2, this.key),
      s2 = n2[o2],
      c2 = n2[o2 + 1],
      l2 = e12.interpolationFactor(this.interpolation, i2, s2, c2),
      u2 = r2[o2].evaluate(t2),
      d2 = r2[o2 + 1].evaluate(t2)
    switch (this.operator) {
      case `interpolate`:
        switch (this.type.kind) {
          case `number`:
            return kr(u2, d2, l2)
          case `color`:
            return z.interpolate(u2, d2, l2)
          case `padding`:
            return Fr.interpolate(u2, d2, l2)
          case `colorArray`:
            return Lr.interpolate(u2, d2, l2)
          case `numberArray`:
            return Ir.interpolate(u2, d2, l2)
          case `variableAnchorOffsetCollection`:
            return zr.interpolate(u2, d2, l2, this.key)
          case `array`:
            return Ar(u2, d2, l2)
          case `projectionDefinition`:
            return Vr.interpolate(u2, d2, l2)
        }
      case `interpolate-hcl`:
        switch (this.type.kind) {
          case `color`:
            return z.interpolate(u2, d2, l2, `hcl`)
          case `colorArray`:
            return Lr.interpolate(u2, d2, l2, `hcl`)
        }
      case `interpolate-lab`:
        switch (this.type.kind) {
          case `color`:
            return z.interpolate(u2, d2, l2, `lab`)
          case `colorArray`:
            return Lr.interpolate(u2, d2, l2, `lab`)
        }
    }
  }
  eachChild(e52) {
    e52(this.input)
    for (let t2 of this.outputs) e52(t2)
  }
  outputDefined() {
    return this.outputs.every(e52 => e52.outputDefined())
  }
}
function ei(e52, t2, n2, r2) {
  let i2 = r2 - n2,
    a2 = e52 - n2
  return i2 === 0 ? 0 : t2 === 1 ? a2 / i2 : (t2 ** +a2 - 1) / (t2 ** +i2 - 1)
}
const ti = {
  color: z.interpolate,
  number: kr,
  padding: Fr.interpolate,
  numberArray: Ir.interpolate,
  colorArray: Lr.interpolate,
  variableAnchorOffsetCollection: zr.interpolate,
  array: Ar,
}
var ni = class e13 {
  constructor(e52) {
    ;((this.type = Kn), (this.sections = e52))
  }
  static parse(t2, n2) {
    if (t2.length < 2) return n2.error(`Expected at least one argument.`)
    let r2 = t2[1]
    if (!Array.isArray(r2) && typeof r2 == `object`)
      return n2.error(`First argument must be an image or text section.`)
    let i2 = [],
      a2 = false
    for (let e52 = 1; e52 <= t2.length - 1; ++e52) {
      let r3 = t2[e52]
      if (a2 && typeof r3 == `object` && !Array.isArray(r3)) {
        a2 = false
        let e53 = null
        if (
          r3[`font-scale`] &&
          ((e53 = n2.parse(r3[`font-scale`], 1, P)), !e53)
        )
          return null
        let t3 = null
        if (
          r3[`text-font`] &&
          ((t3 = n2.parse(r3[`text-font`], 1, Qn(F))), !t3)
        )
          return null
        let o2 = null
        if (r3[`text-color`] && ((o2 = n2.parse(r3[`text-color`], 1, Vn)), !o2))
          return null
        let s2 = null
        if (r3[`vertical-align`]) {
          if (
            typeof r3[`vertical-align`] == `string` &&
            !Mr.includes(r3[`vertical-align`])
          )
            return n2.error(
              `'vertical-align' must be one of: 'bottom', 'center', 'top' but found '${r3[`vertical-align`]}' instead.`
            )
          if (((s2 = n2.parse(r3[`vertical-align`], 1, F)), !s2)) return null
        }
        let c2 = i2[i2.length - 1]
        ;((c2.scale = e53),
          (c2.font = t3),
          (c2.textColor = o2),
          (c2.verticalAlign = s2))
      } else {
        let r4 = n2.parse(t2[e52], 1, L)
        if (!r4) return null
        let o2 = r4.type.kind
        if (
          o2 !== `string` &&
          o2 !== `value` &&
          o2 !== `null` &&
          o2 !== `resolvedImage`
        )
          return n2.error(
            `Formatted text type must be 'string', 'value', 'image' or 'null'.`
          )
        ;((a2 = true),
          i2.push({
            content: r4,
            scale: null,
            font: null,
            textColor: null,
            verticalAlign: null,
          }))
      }
    }
    return new e13(i2)
  }
  evaluate(e52) {
    return new Pr(
      this.sections.map(t2 => {
        let n2 = t2.content.evaluate(e52)
        return Gr(n2) === Xn
          ? new Nr(
              ``,
              n2,
              null,
              null,
              null,
              t2.verticalAlign ? t2.verticalAlign.evaluate(e52) : null
            )
          : new Nr(
              Kr(n2),
              null,
              t2.scale ? t2.scale.evaluate(e52) : null,
              t2.font ? t2.font.evaluate(e52).join(`,`) : null,
              t2.textColor ? t2.textColor.evaluate(e52) : null,
              t2.verticalAlign ? t2.verticalAlign.evaluate(e52) : null
            )
      })
    )
  }
  eachChild(e52) {
    for (let t2 of this.sections)
      (e52(t2.content),
        t2.scale && e52(t2.scale),
        t2.font && e52(t2.font),
        t2.textColor && e52(t2.textColor),
        t2.verticalAlign && e52(t2.verticalAlign))
  }
  outputDefined() {
    return false
  }
}
function ri(e52, t2, n2 = 0, r2 = e52.length - 1, i2 = ai) {
  for (; r2 > n2;) {
    if (r2 - n2 > 600) {
      let a3 = r2 - n2 + 1,
        o3 = t2 - n2 + 1,
        s3 = Math.log(a3),
        c2 = 0.5 * Math.exp((2 * s3) / 3),
        l2 =
          0.5 *
          Math.sqrt((s3 * c2 * (a3 - c2)) / a3) *
          (o3 - a3 / 2 < 0 ? -1 : 1)
      ri(
        e52,
        t2,
        Math.max(n2, Math.floor(t2 - (o3 * c2) / a3 + l2)),
        Math.min(r2, Math.floor(t2 + ((a3 - o3) * c2) / a3 + l2)),
        i2
      )
    }
    let a2 = e52[t2],
      o2 = n2,
      s2 = r2
    for (ii(e52, n2, t2), i2(e52[r2], a2) > 0 && ii(e52, n2, r2); o2 < s2;) {
      for (ii(e52, o2, s2), o2++, s2--; i2(e52[o2], a2) < 0;) o2++
      for (; i2(e52[s2], a2) > 0;) s2--
    }
    ;(i2(e52[n2], a2) === 0 ? ii(e52, n2, s2) : (s2++, ii(e52, s2, r2)),
      s2 <= t2 && (n2 = s2 + 1),
      t2 <= s2 && (r2 = s2 - 1))
  }
}
function ii(e52, t2, n2) {
  let r2 = e52[t2]
  ;((e52[t2] = e52[n2]), (e52[n2] = r2))
}
function ai(e52, t2) {
  return e52 < t2 ? -1 : +(e52 > t2)
}
function oi(e52, t2) {
  if (e52.length <= 1) return [e52]
  let n2 = [],
    r2,
    i2
  for (let t3 of e52) {
    let e53 = ci(t3)
    e53 !== 0 &&
      ((t3.area = Math.abs(e53)),
      i2 === void 0 && (i2 = e53 < 0),
      i2 === e53 < 0 ? (r2 && n2.push(r2), (r2 = [t3])) : r2.push(t3))
  }
  if ((r2 && n2.push(r2), t2 > 1))
    for (let e53 = 0; e53 < n2.length; e53++)
      n2[e53].length <= t2 ||
        (ri(n2[e53], t2, 1, n2[e53].length - 1, si),
        (n2[e53] = n2[e53].slice(0, t2)))
  return n2
}
function si(e52, t2) {
  return t2.area - e52.area
}
function ci(e52) {
  let t2 = 0
  for (let n2 = 0, r2 = e52.length, i2 = r2 - 1, a2, o2; n2 < r2; i2 = n2++)
    ((a2 = e52[n2]), (o2 = e52[i2]), (t2 += (o2.x - a2.x) * (a2.y + o2.y)))
  return t2
}
const li = {string: F, number: P, boolean: I, object: Un}
var ui = class e14 {
  constructor(e52, t2, n2) {
    ;((this.type = e52), (this.args = t2), (this.key = n2))
  }
  static parse(t2, n2) {
    if (t2.length < 2) return n2.error(`Expected at least one argument.`)
    let r2 = 1,
      i2,
      a2 = t2[0]
    if (a2 === `array`) {
      let e52
      if (t2.length > 2) {
        let i3 = t2[1]
        if (typeof i3 != `string` || !(i3 in li) || i3 === `object`)
          return n2.error(
            `The item type argument of "array" must be one of string, number, boolean`,
            1
          )
        ;((e52 = li[i3]), r2++)
      } else e52 = L
      let a3
      if (t2.length > 3) {
        if (
          t2[2] !== null &&
          (typeof t2[2] != `number` || t2[2] < 0 || t2[2] !== Math.floor(t2[2]))
        )
          return n2.error(
            `The length argument to "array" must be a positive integer literal`,
            2
          )
        ;((a3 = t2[2]), r2++)
      }
      i2 = Qn(e52, a3)
    } else {
      if (!li[a2]) throw Error(`Types doesn't contain name = ${a2}`)
      i2 = li[a2]
    }
    let o2 = []
    for (; r2 < t2.length; r2++) {
      let e52 = n2.parse(t2[r2], r2, L)
      if (!e52) return null
      o2.push(e52)
    }
    return new e14(i2, o2, n2.key)
  }
  evaluate(e52) {
    for (let t2 = 0; t2 < this.args.length; t2++) {
      let n2 = this.args[t2].evaluate(e52)
      if (!er(this.type, Gr(n2))) return n2
      if (t2 === this.args.length - 1)
        throw new B(
          `Expected value to be of type ${R(this.type)}, but found ${R(Gr(n2))} instead.`,
          this.key
        )
    }
    throw Error()
  }
  eachChild(e52) {
    this.args.forEach(e52)
  }
  outputDefined() {
    return this.args.every(e52 => e52.outputDefined())
  }
}
const di = {"to-boolean": I, "to-color": Vn, "to-number": P, "to-string": F}
var fi = class e15 {
    constructor(e52, t2, n2) {
      ;((this.type = e52), (this.args = t2), (this.key = n2))
    }
    static parse(t2, n2) {
      if (t2.length < 2) return n2.error(`Expected at least one argument.`)
      let r2 = t2[0]
      if (!di[r2])
        throw Error(`Can't parse ${r2} as it is not part of the known types`)
      if ((r2 === `to-boolean` || r2 === `to-string`) && t2.length !== 2)
        return n2.error(`Expected one argument.`)
      let i2 = di[r2],
        a2 = []
      for (let e52 = 1; e52 < t2.length; e52++) {
        let r3 = n2.parse(t2[e52], e52, L)
        if (!r3) return null
        a2.push(r3)
      }
      return new e15(i2, a2, n2.key)
    }
    evaluate(e52) {
      switch (this.type.kind) {
        case `boolean`:
          return !!this.args[0].evaluate(e52)
        case `color`: {
          let t2, n2
          for (let r2 of this.args) {
            if (((t2 = r2.evaluate(e52)), (n2 = null), t2 instanceof z))
              return t2
            if (typeof t2 == `string`) {
              let n3 = e52.parseColor(t2)
              if (n3) return n3
            } else if (
              Array.isArray(t2) &&
              ((n2 =
                t2.length < 3 || t2.length > 4
                  ? `Invalid rgba value ${JSON.stringify(t2)}: expected an array containing either three or four numeric values.`
                  : Ur(t2[0], t2[1], t2[2], t2[3])),
              !n2)
            )
              return new z(t2[0] / 255, t2[1] / 255, t2[2] / 255, t2[3])
          }
          throw new B(
            n2 ||
              `Could not parse color from value '${typeof t2 == `string` ? t2 : JSON.stringify(t2)}'`,
            this.key
          )
        }
        case `padding`: {
          let t2
          for (let n2 of this.args) {
            t2 = n2.evaluate(e52)
            let r2 = Fr.parse(t2)
            if (r2) return r2
          }
          throw new B(
            `Could not parse padding from value '${typeof t2 == `string` ? t2 : JSON.stringify(t2)}'`,
            this.key
          )
        }
        case `numberArray`: {
          let t2
          for (let n2 of this.args) {
            t2 = n2.evaluate(e52)
            let r2 = Ir.parse(t2)
            if (r2) return r2
          }
          throw new B(
            `Could not parse numberArray from value '${typeof t2 == `string` ? t2 : JSON.stringify(t2)}'`,
            this.key
          )
        }
        case `colorArray`: {
          let t2
          for (let n2 of this.args) {
            t2 = n2.evaluate(e52)
            let r2 = Lr.parse(t2)
            if (r2) return r2
          }
          throw new B(
            `Could not parse colorArray from value '${typeof t2 == `string` ? t2 : JSON.stringify(t2)}'`,
            this.key
          )
        }
        case `variableAnchorOffsetCollection`: {
          let t2
          for (let n2 of this.args) {
            t2 = n2.evaluate(e52)
            let r2 = zr.parse(t2)
            if (r2) return r2
          }
          throw new B(
            `Could not parse variableAnchorOffsetCollection from value '${typeof t2 == `string` ? t2 : JSON.stringify(t2)}'`,
            this.key
          )
        }
        case `number`: {
          let t2 = null
          for (let n2 of this.args) {
            if (((t2 = n2.evaluate(e52)), t2 === null)) return 0
            let r2 = Number(t2)
            if (!isNaN(r2)) return r2
          }
          throw new B(
            `Could not convert ${JSON.stringify(t2)} to number.`,
            this.key
          )
        }
        case `formatted`:
          return Pr.fromString(Kr(this.args[0].evaluate(e52)))
        case `resolvedImage`:
          return Br.fromString(Kr(this.args[0].evaluate(e52)))
        case `projectionDefinition`: {
          let t2 = this.args[0].evaluate(e52)
          if (Vr.parse(t2)) return t2
          throw new B(
            `Could not parse projectionDefinition from value '${typeof t2 == `string` ? t2 : JSON.stringify(t2)}'`,
            this.key
          )
        }
        default:
          return Kr(this.args[0].evaluate(e52))
      }
    }
    eachChild(e52) {
      this.args.forEach(e52)
    }
    outputDefined() {
      return this.args.every(e52 => e52.outputDefined())
    }
  },
  pi = class e16 {
    constructor(e52, t2) {
      ;((this.type = t2.type),
        (this.bindings = [].concat(e52)),
        (this.result = t2))
    }
    evaluate(e52) {
      return this.result.evaluate(e52)
    }
    eachChild(e52) {
      for (let t2 of this.bindings) e52(t2[1])
      e52(this.result)
    }
    static parse(t2, n2) {
      if (t2.length < 4)
        return n2.error(
          `Expected at least 3 arguments, but found ${t2.length - 1} instead.`
        )
      let r2 = []
      for (let e52 = 1; e52 < t2.length - 1; e52 += 2) {
        let i3 = t2[e52]
        if (typeof i3 != `string`)
          return n2.error(
            `Expected string, but found ${typeof i3} instead.`,
            e52
          )
        if (/[^a-zA-Z0-9_]/.test(i3))
          return n2.error(
            `Variable names must contain only alphanumeric characters or '_'.`,
            e52
          )
        let a2 = n2.parse(t2[e52 + 1], e52 + 1)
        if (!a2) return null
        r2.push([i3, a2])
      }
      let i2 = n2.parse(t2[t2.length - 1], t2.length - 1, n2.expectedType, r2)
      return i2 ? new e16(r2, i2) : null
    }
    outputDefined() {
      return this.result.outputDefined()
    }
  },
  mi = class e17 {
    constructor(e52, t2) {
      ;((this.type = t2.type), (this.name = e52), (this.boundExpression = t2))
    }
    static parse(t2, n2) {
      if (t2.length !== 2 || typeof t2[1] != `string`)
        return n2.error(
          `'var' expression requires exactly one string literal argument.`
        )
      let r2 = t2[1]
      return n2.scope.has(r2)
        ? new e17(r2, n2.scope.get(r2))
        : n2.error(
            `Unknown variable "${r2}". Make sure "${r2}" has been bound in an enclosing "let" expression before using it.`,
            1
          )
    }
    evaluate(e52) {
      return this.boundExpression.evaluate(e52)
    }
    eachChild() {}
    outputDefined() {
      return false
    }
  },
  hi = class e18 {
    constructor(e52, t2, n2, r2) {
      ;((this.type = e52),
        (this.index = t2),
        (this.input = n2),
        (this.key = r2))
    }
    static parse(t2, n2) {
      if (t2.length !== 3)
        return n2.error(
          `Expected 2 arguments, but found ${t2.length - 1} instead.`
        )
      let r2 = n2.parse(t2[1], 1, P),
        i2 = n2.parse(t2[2], 2, Qn(n2.expectedType || L))
      if (!r2 || !i2) return null
      let a2 = i2.type
      return new e18(a2.itemType, r2, i2, n2.key)
    }
    evaluate(e52) {
      let t2 = this.index.evaluate(e52),
        n2 = this.input.evaluate(e52)
      if (t2 < 0) throw new B(`Array index out of bounds: ${t2} < 0.`, this.key)
      if (t2 >= n2.length)
        throw new B(
          `Array index out of bounds: ${t2} > ${n2.length - 1}.`,
          this.key
        )
      if (t2 !== Math.floor(t2))
        throw new B(
          `Array index must be an integer, but found ${t2} instead.`,
          this.key
        )
      return n2[t2]
    }
    eachChild(e52) {
      ;(e52(this.index), e52(this.input))
    }
    outputDefined() {
      return false
    }
  },
  gi = class e19 {
    constructor(e52, t2, n2) {
      ;((this.needle = e52),
        (this.haystack = t2),
        (this.key = n2),
        (this.type = I))
    }
    static parse(t2, n2) {
      if (t2.length !== 3)
        return n2.error(
          `Expected 2 arguments, but found ${t2.length - 1} instead.`
        )
      let r2 = n2.parse(t2[1], 1, L),
        i2 = n2.parse(t2[2], 2, L)
      return !r2 || !i2
        ? null
        : tr(r2.type, [I, F, P, Bn, L])
          ? new e19(r2, i2, n2.key)
          : n2.error(
              `Expected first argument to be of type boolean, string, number or null, but found ${R(r2.type)} instead`
            )
    }
    evaluate(e52) {
      let t2 = this.needle.evaluate(e52),
        n2 = this.haystack.evaluate(e52)
      if (!n2) return false
      if (!nr(t2, [`boolean`, `string`, `number`, `null`]))
        throw new B(
          `Expected first argument to be of type boolean, string, number or null, but found ${R(Gr(t2))} instead.`,
          this.key
        )
      if (!nr(n2, [`string`, `array`]))
        throw new B(
          `Expected second argument to be of type array or string, but found ${R(Gr(n2))} instead.`,
          this.key
        )
      return n2.indexOf(t2) >= 0
    }
    eachChild(e52) {
      ;(e52(this.needle), e52(this.haystack))
    }
    outputDefined() {
      return true
    }
  },
  _i = class e20 {
    constructor(e52, t2, n2, r2) {
      ;((this.needle = e52),
        (this.haystack = t2),
        (this.key = n2),
        (this.fromIndex = r2),
        (this.type = P))
    }
    static parse(t2, n2) {
      if (t2.length <= 2 || t2.length >= 5)
        return n2.error(
          `Expected 2 or 3 arguments, but found ${t2.length - 1} instead.`
        )
      let r2 = n2.parse(t2[1], 1, L),
        i2 = n2.parse(t2[2], 2, L)
      if (!r2 || !i2) return null
      if (!tr(r2.type, [I, F, P, Bn, L]))
        return n2.error(
          `Expected first argument to be of type boolean, string, number or null, but found ${R(r2.type)} instead`
        )
      if (t2.length === 4) {
        let a2 = n2.parse(t2[3], 3, P)
        return a2 ? new e20(r2, i2, n2.key, a2) : null
      }
      return new e20(r2, i2, n2.key)
    }
    evaluate(e52) {
      let t2 = this.needle.evaluate(e52),
        n2 = this.haystack.evaluate(e52)
      if (!nr(t2, [`boolean`, `string`, `number`, `null`]))
        throw new B(
          `Expected first argument to be of type boolean, string, number or null, but found ${R(Gr(t2))} instead.`,
          this.key
        )
      let r2
      if (
        (this.fromIndex && (r2 = this.fromIndex.evaluate(e52)),
        nr(n2, [`string`]))
      ) {
        let e53 = n2.indexOf(t2, r2)
        return e53 === -1 ? -1 : [...n2.slice(0, e53)].length
      }
      if (nr(n2, [`array`])) return n2.indexOf(t2, r2)
      throw new B(
        `Expected second argument to be of type array or string, but found ${R(Gr(n2))} instead.`,
        this.key
      )
    }
    eachChild(e52) {
      ;(e52(this.needle),
        e52(this.haystack),
        this.fromIndex && e52(this.fromIndex))
    }
    outputDefined() {
      return false
    }
  },
  vi = class e21 {
    constructor(e52, t2, n2, r2, i2, a2) {
      ;((this.inputType = e52),
        (this.type = t2),
        (this.input = n2),
        (this.cases = r2),
        (this.outputs = i2),
        (this.otherwise = a2))
    }
    static parse(t2, n2) {
      if (t2.length < 5)
        return n2.error(
          `Expected at least 4 arguments, but found only ${t2.length - 1}.`
        )
      if (t2.length % 2 != 1)
        return n2.error(`Expected an even number of arguments.`)
      let r2, i2
      n2.expectedType &&
        n2.expectedType.kind !== `value` &&
        (i2 = n2.expectedType)
      let a2 = {},
        o2 = []
      for (let e52 = 2; e52 < t2.length - 1; e52 += 2) {
        let s3 = t2[e52],
          c3 = t2[e52 + 1]
        Array.isArray(s3) || (s3 = [s3])
        let l2 = n2.concat(e52)
        if (s3.length === 0)
          return l2.error(`Expected at least one branch label.`)
        for (let e53 of s3) {
          if (typeof e53 != `number` && typeof e53 != `string`)
            return l2.error(`Branch labels must be numbers or strings.`)
          if (typeof e53 == `number` && Math.abs(e53) > 2 ** 53 - 1)
            return l2.error(
              `Branch labels must be integers no larger than ${2 ** 53 - 1}.`
            )
          if (typeof e53 == `number` && Math.floor(e53) !== e53)
            return l2.error(`Numeric branch labels must be integer values.`)
          if (!r2) r2 = Gr(e53)
          else if (l2.checkSubtype(r2, Gr(e53))) return null
          if (a2[String(e53)] !== void 0)
            return l2.error(`Branch labels must be unique.`)
          a2[String(e53)] = o2.length
        }
        let u2 = n2.parse(c3, e52, i2)
        if (!u2) return null
        ;((i2 ||= u2.type), o2.push(u2))
      }
      let s2 = n2.parse(t2[1], 1, L)
      if (!s2) return null
      let c2 = n2.parse(t2[t2.length - 1], t2.length - 1, i2)
      return !c2 ||
        (s2.type.kind !== `value` && n2.concat(1).checkSubtype(r2, s2.type))
        ? null
        : new e21(r2, i2, s2, a2, o2, c2)
    }
    evaluate(e52) {
      let t2 = this.input.evaluate(e52)
      return (
        (Gr(t2) === this.inputType && this.outputs[this.cases[t2]]) ||
        this.otherwise
      ).evaluate(e52)
    }
    eachChild(e52) {
      ;(e52(this.input), this.outputs.forEach(e52), e52(this.otherwise))
    }
    outputDefined() {
      return (
        this.outputs.every(e52 => e52.outputDefined()) &&
        this.otherwise.outputDefined()
      )
    }
  },
  yi = class e22 {
    constructor(e52, t2, n2) {
      ;((this.type = e52), (this.branches = t2), (this.otherwise = n2))
    }
    static parse(t2, n2) {
      if (t2.length < 4)
        return n2.error(
          `Expected at least 3 arguments, but found only ${t2.length - 1}.`
        )
      if (t2.length % 2 != 0)
        return n2.error(`Expected an odd number of arguments.`)
      let r2
      n2.expectedType &&
        n2.expectedType.kind !== `value` &&
        (r2 = n2.expectedType)
      let i2 = []
      for (let e52 = 1; e52 < t2.length - 1; e52 += 2) {
        let a3 = n2.parse(t2[e52], e52, I)
        if (!a3) return null
        let o2 = n2.parse(t2[e52 + 1], e52 + 1, r2)
        if (!o2) return null
        ;(i2.push([a3, o2]), (r2 ||= o2.type))
      }
      let a2 = n2.parse(t2[t2.length - 1], t2.length - 1, r2)
      if (!a2) return null
      if (!r2) throw Error(`Can't infer output type`)
      return new e22(r2, i2, a2)
    }
    evaluate(e52) {
      for (let [t2, n2] of this.branches)
        if (t2.evaluate(e52)) return n2.evaluate(e52)
      return this.otherwise.evaluate(e52)
    }
    eachChild(e52) {
      for (let [t2, n2] of this.branches) (e52(t2), e52(n2))
      e52(this.otherwise)
    }
    outputDefined() {
      return (
        this.branches.every(([e52, t2]) => t2.outputDefined()) &&
        this.otherwise.outputDefined()
      )
    }
  },
  bi = class e23 {
    constructor(e52, t2, n2, r2, i2) {
      ;((this.type = e52),
        (this.input = t2),
        (this.beginIndex = n2),
        (this.key = r2),
        (this.endIndex = i2))
    }
    static parse(t2, n2) {
      if (t2.length <= 2 || t2.length >= 5)
        return n2.error(
          `Expected 2 or 3 arguments, but found ${t2.length - 1} instead.`
        )
      let r2 = n2.parse(t2[1], 1, L),
        i2 = n2.parse(t2[2], 2, P)
      if (!r2 || !i2) return null
      if (!tr(r2.type, [Qn(L), F, L]))
        return n2.error(
          `Expected first argument to be of type array or string, but found ${R(r2.type)} instead`
        )
      if (t2.length === 4) {
        let a2 = n2.parse(t2[3], 3, P)
        return a2 ? new e23(r2.type, r2, i2, n2.key, a2) : null
      }
      return new e23(r2.type, r2, i2, n2.key)
    }
    evaluate(e52) {
      let t2 = this.input.evaluate(e52),
        n2 = this.beginIndex.evaluate(e52),
        r2
      if (
        (this.endIndex && (r2 = this.endIndex.evaluate(e52)),
        nr(t2, [`string`]))
      )
        return [...t2].slice(n2, r2).join(``)
      if (nr(t2, [`array`])) return t2.slice(n2, r2)
      throw new B(
        `Expected first argument to be of type array or string, but found ${R(Gr(t2))} instead.`,
        this.key
      )
    }
    eachChild(e52) {
      ;(e52(this.input),
        e52(this.beginIndex),
        this.endIndex && e52(this.endIndex))
    }
    outputDefined() {
      return false
    }
  },
  xi = class e24 {
    constructor(e52, t2) {
      ;((this.type = e52), (this.args = t2))
    }
    static parse(t2, n2) {
      if (t2.length < 2) return n2.error(`Expected at least one argument.`)
      let r2 = null,
        i2 = n2.expectedType
      i2 && i2.kind !== `value` && (r2 = i2)
      let a2 = []
      for (let e52 of t2.slice(1)) {
        let t3 = n2.parse(e52, 1 + a2.length, r2, void 0, {
          typeAnnotation: `omit`,
        })
        if (!t3) return null
        ;((r2 ||= t3.type), a2.push(t3))
      }
      if (!r2) throw Error(`No output type`)
      return i2 && a2.some(e52 => er(i2, e52.type))
        ? new e24(L, a2)
        : new e24(r2, a2)
    }
    evaluate(e52) {
      let t2 = null,
        n2 = 0,
        r2
      for (let i2 of this.args)
        if (
          (n2++,
          (t2 = i2.evaluate(e52)),
          t2 &&
            t2 instanceof Br &&
            !t2.available &&
            ((r2 ||= t2.name),
            (t2 = null),
            n2 === this.args.length && (t2 = r2)),
          t2 !== null)
        )
          break
      return t2
    }
    eachChild(e52) {
      this.args.forEach(e52)
    }
    outputDefined() {
      return this.args.every(e52 => e52.outputDefined())
    }
  }
function Si(e52, t2) {
  return e52 === `==` || e52 === `!=`
    ? t2.kind === `boolean` ||
        t2.kind === `string` ||
        t2.kind === `number` ||
        t2.kind === `null` ||
        t2.kind === `value`
    : t2.kind === `string` || t2.kind === `number` || t2.kind === `value`
}
function Ci(e52, t2, n2) {
  return t2 === n2
}
function wi(e52, t2, n2) {
  return t2 !== n2
}
function Ti(e52, t2, n2) {
  return t2 < n2
}
function Ei(e52, t2, n2) {
  return t2 > n2
}
function Di(e52, t2, n2) {
  return t2 <= n2
}
function Oi(e52, t2, n2) {
  return t2 >= n2
}
function ki(e52, t2, n2, r2) {
  return r2.compare(t2, n2) === 0
}
function Ai(e52, t2, n2, r2) {
  return !ki(e52, t2, n2, r2)
}
function ji(e52, t2, n2, r2) {
  return r2.compare(t2, n2) < 0
}
function Mi(e52, t2, n2, r2) {
  return r2.compare(t2, n2) > 0
}
function Ni(e52, t2, n2, r2) {
  return r2.compare(t2, n2) <= 0
}
function Pi(e52, t2, n2, r2) {
  return r2.compare(t2, n2) >= 0
}
function Fi(e52, t2, n2) {
  let r2 = e52 !== `==` && e52 !== `!=`
  return class i2 {
    constructor(e53, t3, n3, r3) {
      ;((this.lhs = e53),
        (this.rhs = t3),
        (this.key = n3),
        (this.collator = r3),
        (this.type = I),
        (this.hasUntypedArgument =
          e53.type.kind === `value` || t3.type.kind === `value`))
    }
    static parse(e53, t3) {
      if (e53.length !== 3 && e53.length !== 4)
        return t3.error(`Expected two or three arguments.`)
      let n3 = e53[0],
        a2 = t3.parse(e53[1], 1, L)
      if (!a2) return null
      if (!Si(n3, a2.type))
        return t3
          .concat(1)
          .error(
            `"${n3}" comparisons are not supported for type '${R(a2.type)}'.`
          )
      let o2 = t3.parse(e53[2], 2, L)
      if (!o2) return null
      if (!Si(n3, o2.type))
        return t3
          .concat(2)
          .error(
            `"${n3}" comparisons are not supported for type '${R(o2.type)}'.`
          )
      if (
        a2.type.kind !== o2.type.kind &&
        a2.type.kind !== `value` &&
        o2.type.kind !== `value`
      )
        return t3.error(
          `Cannot compare types '${R(a2.type)}' and '${R(o2.type)}'.`
        )
      r2 &&
        (a2.type.kind === `value` && o2.type.kind !== `value`
          ? (a2 = new ui(o2.type, [a2], t3.key))
          : a2.type.kind !== `value` &&
            o2.type.kind === `value` &&
            (o2 = new ui(a2.type, [o2], t3.key)))
      let s2 = null
      if (e53.length === 4) {
        if (
          a2.type.kind !== `string` &&
          o2.type.kind !== `string` &&
          a2.type.kind !== `value` &&
          o2.type.kind !== `value`
        )
          return t3.error(`Cannot use collator to compare non-string types.`)
        if (((s2 = t3.parse(e53[3], 3, Gn)), !s2)) return null
      }
      return new i2(a2, o2, t3.key, s2)
    }
    evaluate(i3) {
      let a2 = this.lhs.evaluate(i3),
        o2 = this.rhs.evaluate(i3)
      if (r2 && this.hasUntypedArgument) {
        let t3 = Gr(a2),
          n3 = Gr(o2)
        if (
          t3.kind !== n3.kind ||
          (t3.kind !== `string` && t3.kind !== `number`)
        )
          throw new B(
            `Expected arguments for "${e52}" to be (string, string) or (number, number), but found (${t3.kind}, ${n3.kind}) instead.`,
            this.key
          )
      }
      if (this.collator && !r2 && this.hasUntypedArgument) {
        let e53 = Gr(a2),
          n3 = Gr(o2)
        if (e53.kind !== `string` || n3.kind !== `string`) return t2(i3, a2, o2)
      }
      return this.collator
        ? n2(i3, a2, o2, this.collator.evaluate(i3))
        : t2(i3, a2, o2)
    }
    eachChild(e53) {
      ;(e53(this.lhs), e53(this.rhs), this.collator && e53(this.collator))
    }
    outputDefined() {
      return true
    }
  }
}
const Ii = Fi(`==`, Ci, ki),
  Li = Fi(`!=`, wi, Ai),
  Ri = Fi(`<`, Ti, ji),
  zi = Fi(`>`, Ei, Mi),
  Bi = Fi(`<=`, Di, Ni),
  Vi = Fi(`>=`, Oi, Pi)
var Hi = class e25 {
    constructor(e52, t2, n2) {
      ;((this.type = Gn),
        (this.locale = n2),
        (this.caseSensitive = e52),
        (this.diacriticSensitive = t2))
    }
    static parse(t2, n2) {
      if (t2.length !== 2) return n2.error(`Expected one argument.`)
      let r2 = t2[1]
      if (typeof r2 != `object` || Array.isArray(r2))
        return n2.error(`Collator options argument must be an object.`)
      let i2 = n2.parse(
        r2[`case-sensitive`] !== void 0 && r2[`case-sensitive`],
        1,
        I
      )
      if (!i2) return null
      let a2 = n2.parse(
        r2[`diacritic-sensitive`] !== void 0 && r2[`diacritic-sensitive`],
        1,
        I
      )
      if (!a2) return null
      let o2 = null
      return r2.locale && ((o2 = n2.parse(r2.locale, 1, F)), !o2)
        ? null
        : new e25(i2, a2, o2)
    }
    evaluate(e52) {
      return new Hr(
        this.caseSensitive.evaluate(e52),
        this.diacriticSensitive.evaluate(e52),
        this.locale ? this.locale.evaluate(e52) : null
      )
    }
    eachChild(e52) {
      ;(e52(this.caseSensitive),
        e52(this.diacriticSensitive),
        this.locale && e52(this.locale))
    }
    outputDefined() {
      return false
    }
  },
  Ui = class e26 {
    constructor(e52, t2, n2, r2, i2, a2) {
      ;((this.type = F),
        (this.number = e52),
        (this.locale = t2),
        (this.currency = n2),
        (this.unit = r2),
        (this.minFractionDigits = i2),
        (this.maxFractionDigits = a2))
    }
    static parse(t2, n2) {
      if (t2.length !== 3) return n2.error(`Expected two arguments.`)
      let r2 = n2.parse(t2[1], 1, P)
      if (!r2) return null
      let i2 = t2[2]
      if (typeof i2 != `object` || Array.isArray(i2))
        return n2.error(`NumberFormat options argument must be an object.`)
      let a2 = null
      if (i2.locale && ((a2 = n2.parse(i2.locale, 1, F)), !a2)) return null
      let o2 = null
      if (i2.currency && ((o2 = n2.parse(i2.currency, 1, F)), !o2)) return null
      let s2 = null
      if (i2.unit && ((s2 = n2.parse(i2.unit, 1, F)), !s2)) return null
      if (o2 && s2)
        return n2.error(
          "NumberFormat options `currency` and `unit` are mutually exclusive"
        )
      let c2 = null
      if (
        i2[`min-fraction-digits`] &&
        ((c2 = n2.parse(i2[`min-fraction-digits`], 1, P)), !c2)
      )
        return null
      let l2 = null
      return i2[`max-fraction-digits`] &&
        ((l2 = n2.parse(i2[`max-fraction-digits`], 1, P)), !l2)
        ? null
        : new e26(r2, a2, o2, s2, c2, l2)
    }
    evaluate(e52) {
      return new Intl.NumberFormat(
        this.locale ? this.locale.evaluate(e52) : [],
        {
          style: this.currency ? `currency` : this.unit ? `unit` : `decimal`,
          currency: this.currency ? this.currency.evaluate(e52) : void 0,
          unit: this.unit ? this.unit.evaluate(e52) : void 0,
          minimumFractionDigits: this.minFractionDigits
            ? this.minFractionDigits.evaluate(e52)
            : void 0,
          maximumFractionDigits: this.maxFractionDigits
            ? this.maxFractionDigits.evaluate(e52)
            : void 0,
        }
      ).format(this.number.evaluate(e52))
    }
    eachChild(e52) {
      ;(e52(this.number),
        this.locale && e52(this.locale),
        this.currency && e52(this.currency),
        this.unit && e52(this.unit),
        this.minFractionDigits && e52(this.minFractionDigits),
        this.maxFractionDigits && e52(this.maxFractionDigits))
    }
    outputDefined() {
      return false
    }
  },
  Wi = class e27 {
    constructor(e52) {
      ;((this.type = Xn), (this.input = e52))
    }
    static parse(t2, n2) {
      if (t2.length !== 2) return n2.error(`Expected two arguments.`)
      let r2 = n2.parse(t2[1], 1, F)
      return r2 ? new e27(r2) : n2.error(`No image name provided.`)
    }
    evaluate(e52) {
      let t2 = this.input.evaluate(e52),
        n2 = Br.fromString(t2)
      return (
        n2 &&
          e52.availableImages &&
          (n2.available = e52.availableImages.indexOf(t2) > -1),
        n2
      )
    }
    eachChild(e52) {
      e52(this.input)
    }
    outputDefined() {
      return false
    }
  },
  Gi = class e28 {
    constructor(e52, t2) {
      ;((this.input = e52), (this.key = t2), (this.type = P))
    }
    static parse(t2, n2) {
      if (t2.length !== 2)
        return n2.error(
          `Expected 1 argument, but found ${t2.length - 1} instead.`
        )
      let r2 = n2.parse(t2[1], 1)
      return r2
        ? r2.type.kind !== `array` &&
          r2.type.kind !== `string` &&
          r2.type.kind !== `value`
          ? n2.error(
              `Expected argument of type string or array, but found ${R(r2.type)} instead.`
            )
          : new e28(r2, n2.key)
        : null
    }
    evaluate(e52) {
      let t2 = this.input.evaluate(e52)
      if (typeof t2 == `string`) return [...t2].length
      if (Array.isArray(t2)) return t2.length
      throw new B(
        `Expected value to be of type string or array, but found ${R(Gr(t2))} instead.`,
        this.key
      )
    }
    eachChild(e52) {
      e52(this.input)
    }
    outputDefined() {
      return false
    }
  }
const Ki = 8192
function qi(e52, t2) {
  let n2 = Yi(e52[0]),
    r2 = Zi(e52[1]),
    i2 = 2 ** t2.z
  return [Math.round(n2 * i2 * Ki), Math.round(r2 * i2 * Ki)]
}
function Ji(e52, t2) {
  let n2 = 2 ** t2.z,
    r2 = (e52[0] / Ki + t2.x) / n2,
    i2 = (e52[1] / Ki + t2.y) / n2
  return [Xi(r2), Qi(i2)]
}
function Yi(e52) {
  return (180 + e52) / 360
}
function Xi(e52) {
  return e52 * 360 - 180
}
function Zi(e52) {
  return (
    (180 -
      (180 / Math.PI) *
        Math.log(Math.tan(Math.PI / 4 + (e52 * Math.PI) / 360))) /
    360
  )
}
function Qi(e52) {
  return (
    (360 / Math.PI) * Math.atan(Math.exp(((180 - e52 * 360) * Math.PI) / 180)) -
    90
  )
}
function $i(e52, t2) {
  ;((e52[0] = Math.min(e52[0], t2[0])),
    (e52[1] = Math.min(e52[1], t2[1])),
    (e52[2] = Math.max(e52[2], t2[0])),
    (e52[3] = Math.max(e52[3], t2[1])))
}
function ea(e52, t2) {
  return !(
    e52[0] <= t2[0] ||
    e52[2] >= t2[2] ||
    e52[1] <= t2[1] ||
    e52[3] >= t2[3]
  )
}
function ta(e52, t2, n2) {
  return (
    t2[1] > e52[1] != n2[1] > e52[1] &&
    e52[0] < ((n2[0] - t2[0]) * (e52[1] - t2[1])) / (n2[1] - t2[1]) + t2[0]
  )
}
function na(e52, t2, n2) {
  let r2 = e52[0] - t2[0],
    i2 = e52[1] - t2[1],
    a2 = e52[0] - n2[0],
    o2 = e52[1] - n2[1]
  return r2 * o2 - a2 * i2 === 0 && r2 * a2 <= 0 && i2 * o2 <= 0
}
function ra(e52, t2, n2, r2) {
  let i2 = [t2[0] - e52[0], t2[1] - e52[1]]
  return (
    la([r2[0] - n2[0], r2[1] - n2[1]], i2) !== 0 &&
    !!(ua(e52, t2, n2, r2) && ua(n2, r2, e52, t2))
  )
}
function ia(e52, t2, n2) {
  for (let r2 of n2)
    for (let n3 = 0; n3 < r2.length - 1; ++n3)
      if (ra(e52, t2, r2[n3], r2[n3 + 1])) return true
  return false
}
function aa(e52, t2, n2 = false) {
  let r2 = false
  for (let i2 of t2)
    for (let t3 = 0; t3 < i2.length - 1; t3++) {
      if (na(e52, i2[t3], i2[t3 + 1])) return n2
      ta(e52, i2[t3], i2[t3 + 1]) && (r2 = !r2)
    }
  return r2
}
function oa(e52, t2) {
  for (let n2 of t2) if (aa(e52, n2)) return true
  return false
}
function sa(e52, t2) {
  for (let n2 of e52) if (!aa(n2, t2)) return false
  for (let n2 = 0; n2 < e52.length - 1; ++n2)
    if (ia(e52[n2], e52[n2 + 1], t2)) return false
  return true
}
function ca(e52, t2) {
  for (let n2 of t2) if (sa(e52, n2)) return true
  return false
}
function la(e52, t2) {
  return e52[0] * t2[1] - e52[1] * t2[0]
}
function ua(e52, t2, n2, r2) {
  let i2 = e52[0] - n2[0],
    a2 = e52[1] - n2[1],
    o2 = t2[0] - n2[0],
    s2 = t2[1] - n2[1],
    c2 = r2[0] - n2[0],
    l2 = r2[1] - n2[1],
    u2 = i2 * l2 - c2 * a2,
    d2 = o2 * l2 - c2 * s2
  return (u2 > 0 && d2 < 0) || (u2 < 0 && d2 > 0)
}
function da(e52, t2, n2) {
  let r2 = []
  for (let i2 = 0; i2 < e52.length; i2++) {
    let a2 = []
    for (let r3 = 0; r3 < e52[i2].length; r3++) {
      let o2 = qi(e52[i2][r3], n2)
      ;($i(t2, o2), a2.push(o2))
    }
    r2.push(a2)
  }
  return r2
}
function fa(e52, t2, n2) {
  let r2 = []
  for (let i2 = 0; i2 < e52.length; i2++) {
    let a2 = da(e52[i2], t2, n2)
    r2.push(a2)
  }
  return r2
}
function pa(e52, t2, n2, r2) {
  if (e52[0] < n2[0] || e52[0] > n2[2]) {
    let t3 = r2 * 0.5,
      i2 = e52[0] - n2[0] > t3 ? -r2 : n2[0] - e52[0] > t3 ? r2 : 0
    ;(i2 === 0 &&
      (i2 = e52[0] - n2[2] > t3 ? -r2 : n2[2] - e52[0] > t3 ? r2 : 0),
      (e52[0] += i2))
  }
  $i(t2, e52)
}
function ma(e52) {
  ;((e52[0] = e52[1] = 1 / 0), (e52[2] = e52[3] = -1 / 0))
}
function ha(e52, t2, n2, r2) {
  let i2 = 2 ** r2.z * Ki,
    a2 = [r2.x * Ki, r2.y * Ki],
    o2 = []
  for (let r3 of e52)
    for (let e53 of r3) {
      let r4 = [e53.x + a2[0], e53.y + a2[1]]
      ;(pa(r4, t2, n2, i2), o2.push(r4))
    }
  return o2
}
function ga(e52, t2, n2, r2) {
  let i2 = 2 ** r2.z * Ki,
    a2 = [r2.x * Ki, r2.y * Ki],
    o2 = []
  for (let n3 of e52) {
    let e53 = []
    for (let r3 of n3) {
      let n4 = [r3.x + a2[0], r3.y + a2[1]]
      ;($i(t2, n4), e53.push(n4))
    }
    o2.push(e53)
  }
  if (t2[2] - t2[0] <= i2 / 2) {
    ma(t2)
    for (let e53 of o2) for (let r3 of e53) pa(r3, t2, n2, i2)
  }
  return o2
}
function _a(e52, t2) {
  let n2 = [1 / 0, 1 / 0, -1 / 0, -1 / 0],
    r2 = [1 / 0, 1 / 0, -1 / 0, -1 / 0],
    i2 = e52.canonicalID()
  if (t2.type === `Polygon`) {
    let a2 = da(t2.coordinates, r2, i2),
      o2 = ha(e52.geometry(), n2, r2, i2)
    if (!ea(n2, r2)) return false
    for (let e53 of o2) if (!aa(e53, a2)) return false
  }
  if (t2.type === `MultiPolygon`) {
    let a2 = fa(t2.coordinates, r2, i2),
      o2 = ha(e52.geometry(), n2, r2, i2)
    if (!ea(n2, r2)) return false
    for (let e53 of o2) if (!oa(e53, a2)) return false
  }
  return true
}
function va(e52, t2) {
  let n2 = [1 / 0, 1 / 0, -1 / 0, -1 / 0],
    r2 = [1 / 0, 1 / 0, -1 / 0, -1 / 0],
    i2 = e52.canonicalID()
  if (t2.type === `Polygon`) {
    let a2 = da(t2.coordinates, r2, i2),
      o2 = ga(e52.geometry(), n2, r2, i2)
    if (!ea(n2, r2)) return false
    for (let e53 of o2) if (!sa(e53, a2)) return false
  }
  if (t2.type === `MultiPolygon`) {
    let a2 = fa(t2.coordinates, r2, i2),
      o2 = ga(e52.geometry(), n2, r2, i2)
    if (!ea(n2, r2)) return false
    for (let e53 of o2) if (!ca(e53, a2)) return false
  }
  return true
}
var ya = class e29 {
    constructor(e52, t2) {
      ;((this.type = I), (this.geojson = e52), (this.geometries = t2))
    }
    static parse(t2, n2) {
      if (t2.length !== 2)
        return n2.error(
          `'within' expression requires exactly one argument, but found ${t2.length - 1} instead.`
        )
      if (Wr(t2[1])) {
        let n3 = t2[1]
        if (n3.type === `FeatureCollection`) {
          let t3 = []
          for (let e52 of n3.features) {
            let {type: n4, coordinates: r2} = e52.geometry
            ;(n4 === `Polygon` && t3.push(r2),
              n4 === `MultiPolygon` && t3.push(...r2))
          }
          if (t3.length)
            return new e29(n3, {type: `MultiPolygon`, coordinates: t3})
        } else if (n3.type === `Feature`) {
          let t3 = n3.geometry.type
          if (t3 === `Polygon` || t3 === `MultiPolygon`)
            return new e29(n3, n3.geometry)
        } else if (n3.type === `Polygon` || n3.type === `MultiPolygon`)
          return new e29(n3, n3)
      }
      return n2.error(
        `'within' expression requires valid geojson object that contains polygon geometry type.`
      )
    }
    evaluate(e52) {
      if (e52.geometry() != null && e52.canonicalID() != null) {
        if (e52.geometryType() === `Point`) return _a(e52, this.geometries)
        if (e52.geometryType() === `LineString`) return va(e52, this.geometries)
      }
      return false
    }
    eachChild() {}
    outputDefined() {
      return true
    }
  },
  ba = class {
    constructor(e52 = [], t2 = (e53, t3) => (e53 < t3 ? -1 : +(e53 > t3))) {
      if (
        ((this.data = e52),
        (this.length = this.data.length),
        (this.compare = t2),
        this.length > 0)
      )
        for (let e53 = (this.length >> 1) - 1; e53 >= 0; e53--) this._down(e53)
    }
    push(e52) {
      ;(this.data.push(e52), this._up(this.length++))
    }
    pop() {
      if (this.length === 0) return
      let e52 = this.data[0],
        t2 = this.data.pop()
      return (--this.length > 0 && ((this.data[0] = t2), this._down(0)), e52)
    }
    peek() {
      return this.data[0]
    }
    _up(e52) {
      let {data: t2, compare: n2} = this,
        r2 = t2[e52]
      for (; e52 > 0;) {
        let i2 = (e52 - 1) >> 1,
          a2 = t2[i2]
        if (n2(r2, a2) >= 0) break
        ;((t2[e52] = a2), (e52 = i2))
      }
      t2[e52] = r2
    }
    _down(e52) {
      let {data: t2, compare: n2} = this,
        r2 = this.length >> 1,
        i2 = t2[e52]
      for (; e52 < r2;) {
        let r3 = (e52 << 1) + 1,
          a2 = r3 + 1
        if (
          (a2 < this.length && n2(t2[a2], t2[r3]) < 0 && (r3 = a2),
          n2(t2[r3], i2) >= 0)
        )
          break
        ;((t2[e52] = t2[r3]), (e52 = r3))
      }
      t2[e52] = i2
    }
  }
const xa = Math.PI / 180
var Sa = class {
  constructor(e52) {
    let t2 = xa * 6378.137 * 1e3,
      n2 = Math.cos(e52 * xa),
      r2 = 1 / (1 - 0.0066943799901413165 * (1 - n2 * n2)),
      i2 = Math.sqrt(r2)
    ;((this.kx = t2 * i2 * n2), (this.ky = t2 * i2 * r2 * 0.9933056200098587))
  }
  distance(e52, t2) {
    let n2 = this.wrap(e52[0] - t2[0]) * this.kx,
      r2 = (e52[1] - t2[1]) * this.ky
    return Math.sqrt(n2 * n2 + r2 * r2)
  }
  pointOnLine(e52, t2) {
    let n2 = 1 / 0,
      r2,
      i2,
      a2,
      o2
    for (let s2 = 0; s2 < e52.length - 1; s2++) {
      let c2 = e52[s2][0],
        l2 = e52[s2][1],
        u2 = this.wrap(e52[s2 + 1][0] - c2) * this.kx,
        d2 = (e52[s2 + 1][1] - l2) * this.ky,
        f2 = 0
      ;((u2 !== 0 || d2 !== 0) &&
        ((f2 =
          (this.wrap(t2[0] - c2) * this.kx * u2 + (t2[1] - l2) * this.ky * d2) /
          (u2 * u2 + d2 * d2)),
        f2 > 1
          ? ((c2 = e52[s2 + 1][0]), (l2 = e52[s2 + 1][1]))
          : f2 > 0 &&
            ((c2 += (u2 / this.kx) * f2), (l2 += (d2 / this.ky) * f2))),
        (u2 = this.wrap(t2[0] - c2) * this.kx),
        (d2 = (t2[1] - l2) * this.ky))
      let p2 = u2 * u2 + d2 * d2
      p2 < n2 && ((n2 = p2), (r2 = c2), (i2 = l2), (a2 = s2), (o2 = f2))
    }
    return {point: [r2, i2], index: a2, t: Math.max(0, Math.min(1, o2))}
  }
  wrap(e52) {
    for (; e52 < -180;) e52 += 360
    for (; e52 > 180;) e52 -= 360
    return e52
  }
}
function Ca(e52, t2) {
  return t2[0] - e52[0]
}
function wa(e52) {
  return e52[1] - e52[0] + 1
}
function Ta(e52, t2) {
  return e52[1] >= e52[0] && e52[1] < t2
}
function Ea(e52, t2) {
  if (e52[0] > e52[1]) return [null, null]
  let n2 = wa(e52)
  if (t2) {
    if (n2 === 2) return [e52, null]
    let t3 = Math.floor(n2 / 2)
    return [
      [e52[0], e52[0] + t3],
      [e52[0] + t3, e52[1]],
    ]
  }
  if (n2 === 1) return [e52, null]
  let r2 = Math.floor(n2 / 2) - 1
  return [
    [e52[0], e52[0] + r2],
    [e52[0] + r2 + 1, e52[1]],
  ]
}
function Da(e52, t2) {
  if (!Ta(t2, e52.length)) return [1 / 0, 1 / 0, -1 / 0, -1 / 0]
  let n2 = [1 / 0, 1 / 0, -1 / 0, -1 / 0]
  for (let r2 = t2[0]; r2 <= t2[1]; ++r2) $i(n2, e52[r2])
  return n2
}
function Oa(e52) {
  let t2 = [1 / 0, 1 / 0, -1 / 0, -1 / 0]
  for (let n2 of e52) for (let e53 of n2) $i(t2, e53)
  return t2
}
function ka(e52) {
  return (
    e52[0] !== -1 / 0 &&
    e52[1] !== -1 / 0 &&
    e52[2] !== 1 / 0 &&
    e52[3] !== 1 / 0
  )
}
function Aa(e52, t2, n2) {
  if (!ka(e52) || !ka(t2)) return NaN
  let r2 = 0,
    i2 = 0
  return (
    e52[2] < t2[0] && (r2 = t2[0] - e52[2]),
    e52[0] > t2[2] && (r2 = e52[0] - t2[2]),
    e52[1] > t2[3] && (i2 = e52[1] - t2[3]),
    e52[3] < t2[1] && (i2 = t2[1] - e52[3]),
    n2.distance([0, 0], [r2, i2])
  )
}
function ja(e52, t2, n2) {
  let r2 = n2.pointOnLine(t2, e52)
  return n2.distance(e52, r2.point)
}
function Ma(e52, t2, n2, r2, i2) {
  let a2 = Math.min(ja(e52, [n2, r2], i2), ja(t2, [n2, r2], i2)),
    o2 = Math.min(ja(n2, [e52, t2], i2), ja(r2, [e52, t2], i2))
  return Math.min(a2, o2)
}
function Na(e52, t2, n2, r2, i2) {
  if (!(Ta(t2, e52.length) && Ta(r2, n2.length))) return 1 / 0
  let a2 = 1 / 0
  for (let o2 = t2[0]; o2 < t2[1]; ++o2) {
    let t3 = e52[o2],
      s2 = e52[o2 + 1]
    for (let e53 = r2[0]; e53 < r2[1]; ++e53) {
      let r3 = n2[e53],
        o3 = n2[e53 + 1]
      if (ra(t3, s2, r3, o3)) return 0
      a2 = Math.min(a2, Ma(t3, s2, r3, o3, i2))
    }
  }
  return a2
}
function Pa(e52, t2, n2, r2, i2) {
  if (!(Ta(t2, e52.length) && Ta(r2, n2.length))) return NaN
  let a2 = 1 / 0
  for (let o2 = t2[0]; o2 <= t2[1]; ++o2)
    for (let t3 = r2[0]; t3 <= r2[1]; ++t3)
      if (((a2 = Math.min(a2, i2.distance(e52[o2], n2[t3]))), a2 === 0))
        return a2
  return a2
}
function Fa(e52, t2, n2) {
  if (aa(e52, t2, true)) return 0
  let r2 = 1 / 0
  for (let i2 of t2) {
    let t3 = i2[0],
      a2 = i2[i2.length - 1]
    if (t3 !== a2 && ((r2 = Math.min(r2, ja(e52, [a2, t3], n2))), r2 === 0))
      return r2
    let o2 = n2.pointOnLine(i2, e52)
    if (((r2 = Math.min(r2, n2.distance(e52, o2.point))), r2 === 0)) return r2
  }
  return r2
}
function Ia(e52, t2, n2, r2) {
  if (!Ta(t2, e52.length)) return NaN
  for (let r3 = t2[0]; r3 <= t2[1]; ++r3) if (aa(e52[r3], n2, true)) return 0
  let i2 = 1 / 0
  for (let a2 = t2[0]; a2 < t2[1]; ++a2) {
    let t3 = e52[a2],
      o2 = e52[a2 + 1]
    for (let e53 of n2)
      for (let n3 = 0, a3 = e53.length, s2 = a3 - 1; n3 < a3; s2 = n3++) {
        let a4 = e53[s2],
          c2 = e53[n3]
        if (ra(t3, o2, a4, c2)) return 0
        i2 = Math.min(i2, Ma(t3, o2, a4, c2, r2))
      }
  }
  return i2
}
function La(e52, t2) {
  for (let n2 of e52) for (let e53 of n2) if (aa(e53, t2, true)) return true
  return false
}
function Ra(e52, t2, n2, r2 = 1 / 0) {
  let i2 = Oa(e52),
    a2 = Oa(t2)
  if (r2 !== 1 / 0 && Aa(i2, a2, n2) >= r2) return r2
  if (ea(i2, a2)) {
    if (La(e52, t2)) return 0
  } else if (La(t2, e52)) return 0
  let o2 = 1 / 0
  for (let r3 of e52)
    for (let e53 = 0, i3 = r3.length, a3 = i3 - 1; e53 < i3; a3 = e53++) {
      let i4 = r3[a3],
        s2 = r3[e53]
      for (let e54 of t2)
        for (let t3 = 0, r4 = e54.length, a4 = r4 - 1; t3 < r4; a4 = t3++) {
          let r5 = e54[a4],
            c2 = e54[t3]
          if (ra(i4, s2, r5, c2)) return 0
          o2 = Math.min(o2, Ma(i4, s2, r5, c2, n2))
        }
    }
  return o2
}
function za(e52, t2, n2, r2, i2, a2) {
  if (!a2) return
  let o2 = Aa(Da(r2, a2), i2, n2)
  o2 < t2 && e52.push([o2, a2, [0, 0]])
}
function Ba(e52, t2, n2, r2, i2, a2, o2) {
  if (!a2 || !o2) return
  let s2 = Aa(Da(r2, a2), Da(i2, o2), n2)
  s2 < t2 && e52.push([s2, a2, o2])
}
function Va(e52, t2, n2, r2, i2 = 1 / 0) {
  let a2 = Math.min(r2.distance(e52[0], n2[0][0]), i2)
  if (a2 === 0) return a2
  let o2 = new ba([[0, [0, e52.length - 1], [0, 0]]], Ca),
    s2 = Oa(n2)
  for (; o2.length > 0;) {
    let i3 = o2.pop()
    if (i3[0] >= a2) continue
    let c2 = i3[1],
      l2 = t2 ? 50 : 100
    if (wa(c2) <= l2) {
      if (!Ta(c2, e52.length)) return NaN
      if (t2) {
        let t3 = Ia(e52, c2, n2, r2)
        if (isNaN(t3) || t3 === 0) return t3
        a2 = Math.min(a2, t3)
      } else
        for (let t3 = c2[0]; t3 <= c2[1]; ++t3) {
          let i4 = Fa(e52[t3], n2, r2)
          if (((a2 = Math.min(a2, i4)), a2 === 0)) return 0
        }
    } else {
      let n3 = Ea(c2, t2)
      ;(za(o2, a2, r2, e52, s2, n3[0]), za(o2, a2, r2, e52, s2, n3[1]))
    }
  }
  return a2
}
function Ha(e52, t2, n2, r2, i2, a2 = 1 / 0) {
  let o2 = Math.min(a2, i2.distance(e52[0], n2[0]))
  if (o2 === 0) return o2
  let s2 = new ba([[0, [0, e52.length - 1], [0, n2.length - 1]]], Ca)
  for (; s2.length > 0;) {
    let a3 = s2.pop()
    if (a3[0] >= o2) continue
    let c2 = a3[1],
      l2 = a3[2],
      u2 = t2 ? 50 : 100,
      d2 = r2 ? 50 : 100
    if (wa(c2) <= u2 && wa(l2) <= d2) {
      if (!Ta(c2, e52.length) && Ta(l2, n2.length)) return NaN
      let a4
      if (t2 && r2) ((a4 = Na(e52, c2, n2, l2, i2)), (o2 = Math.min(o2, a4)))
      else if (t2 && !r2) {
        let t3 = e52.slice(c2[0], c2[1] + 1)
        for (let e53 = l2[0]; e53 <= l2[1]; ++e53)
          if (((a4 = ja(n2[e53], t3, i2)), (o2 = Math.min(o2, a4)), o2 === 0))
            return o2
      } else if (!t2 && r2) {
        let t3 = n2.slice(l2[0], l2[1] + 1)
        for (let n3 = c2[0]; n3 <= c2[1]; ++n3)
          if (((a4 = ja(e52[n3], t3, i2)), (o2 = Math.min(o2, a4)), o2 === 0))
            return o2
      } else ((a4 = Pa(e52, c2, n2, l2, i2)), (o2 = Math.min(o2, a4)))
    } else {
      let a4 = Ea(c2, t2),
        u3 = Ea(l2, r2)
      ;(Ba(s2, o2, i2, e52, n2, a4[0], u3[0]),
        Ba(s2, o2, i2, e52, n2, a4[0], u3[1]),
        Ba(s2, o2, i2, e52, n2, a4[1], u3[0]),
        Ba(s2, o2, i2, e52, n2, a4[1], u3[1]))
    }
  }
  return o2
}
function Ua(e52, t2) {
  let n2 = e52.geometry(),
    r2 = n2.flat().map(t3 => Ji([t3.x, t3.y], e52.canonical))
  if (n2.length === 0) return NaN
  let i2 = new Sa(r2[0][1]),
    a2 = 1 / 0
  for (let e53 of t2) {
    switch (e53.type) {
      case `Point`:
        a2 = Math.min(a2, Ha(r2, false, [e53.coordinates], false, i2, a2))
        break
      case `LineString`:
        a2 = Math.min(a2, Ha(r2, false, e53.coordinates, true, i2, a2))
        break
      case `Polygon`:
        a2 = Math.min(a2, Va(r2, false, e53.coordinates, i2, a2))
    }
    if (a2 === 0) return a2
  }
  return a2
}
function Wa(e52, t2) {
  let n2 = e52.geometry(),
    r2 = n2.flat().map(t3 => Ji([t3.x, t3.y], e52.canonical))
  if (n2.length === 0) return NaN
  let i2 = new Sa(r2[0][1]),
    a2 = 1 / 0
  for (let e53 of t2) {
    switch (e53.type) {
      case `Point`:
        a2 = Math.min(a2, Ha(r2, true, [e53.coordinates], false, i2, a2))
        break
      case `LineString`:
        a2 = Math.min(a2, Ha(r2, true, e53.coordinates, true, i2, a2))
        break
      case `Polygon`:
        a2 = Math.min(a2, Va(r2, true, e53.coordinates, i2, a2))
    }
    if (a2 === 0) return a2
  }
  return a2
}
function Ga(e52, t2) {
  let n2 = e52.geometry()
  if (n2.length === 0 || n2[0].length === 0) return NaN
  let r2 = oi(n2, 0).map(t3 =>
      t3.map(t4 => t4.map(t5 => Ji([t5.x, t5.y], e52.canonical)))
    ),
    i2 = new Sa(r2[0][0][0][1]),
    a2 = 1 / 0
  for (let e53 of t2)
    for (let t3 of r2) {
      switch (e53.type) {
        case `Point`:
          a2 = Math.min(a2, Va([e53.coordinates], false, t3, i2, a2))
          break
        case `LineString`:
          a2 = Math.min(a2, Va(e53.coordinates, true, t3, i2, a2))
          break
        case `Polygon`:
          a2 = Math.min(a2, Ra(t3, e53.coordinates, i2, a2))
      }
      if (a2 === 0) return a2
    }
  return a2
}
function Ka(e52) {
  return e52.type === `MultiPolygon`
    ? e52.coordinates.map(e53 => ({type: `Polygon`, coordinates: e53}))
    : e52.type === `MultiLineString`
      ? e52.coordinates.map(e53 => ({type: `LineString`, coordinates: e53}))
      : e52.type === `MultiPoint`
        ? e52.coordinates.map(e53 => ({type: `Point`, coordinates: e53}))
        : [e52]
}
var qa = class e30 {
    constructor(e52, t2) {
      ;((this.type = P), (this.geojson = e52), (this.geometries = t2))
    }
    static parse(t2, n2) {
      if (t2.length !== 2)
        return n2.error(
          `'distance' expression requires exactly one argument, but found ${t2.length - 1} instead.`
        )
      if (Wr(t2[1])) {
        let n3 = t2[1]
        if (n3.type === `FeatureCollection`)
          return new e30(n3, n3.features.map(e52 => Ka(e52.geometry)).flat())
        if (n3.type === `Feature`) return new e30(n3, Ka(n3.geometry))
        if (`type` in n3 && `coordinates` in n3) return new e30(n3, Ka(n3))
      }
      return n2.error(
        `'distance' expression requires valid geojson object that contains polygon geometry type.`
      )
    }
    evaluate(e52) {
      if (e52.geometry() != null && e52.canonicalID() != null) {
        if (e52.geometryType() === `Point`) return Ua(e52, this.geometries)
        if (e52.geometryType() === `LineString`) return Wa(e52, this.geometries)
        if (e52.geometryType() === `Polygon`) return Ga(e52, this.geometries)
      }
      return NaN
    }
    eachChild() {}
    outputDefined() {
      return true
    }
  },
  Ja = class e31 {
    constructor(e52) {
      let t2 = null
      for (let n2 of e52)
        if (!t2) t2 = n2.type
        else if (t2 === n2.type) continue
        else {
          t2 = L
          break
        }
      ;((this.type = Qn(t2 ?? L, e52.length)), (this.arr = e52))
    }
    static parse(t2, n2) {
      if (t2.length !== 2)
        return n2.error(
          `'semiliteral' expression requires exactly one argument, but found ${t2.length - 1} instead.`
        )
      if (!Wr(t2[1])) return n2.error(`invalid value of type "${typeof t2[1]}"`)
      let r2 = t2[1],
        i2 = Gr(r2)
      if (i2.kind === `array`) {
        let t3 = r2.map(e52 => n2.parse(e52, null, L))
        return new e31(t3)
      }
      return new qr(i2, r2)
    }
    evaluate(e52) {
      return this.arr.map(t2 => t2.evaluate(e52))
    }
    eachChild(e52) {
      this.arr.forEach(e52)
    }
    outputDefined() {
      return this.arr.every(e52 => e52.outputDefined())
    }
  },
  Ya = class e32 {
    constructor(e52) {
      ;((this.key = e52), (this.type = L))
    }
    static parse(t2, n2) {
      if (t2.length !== 2)
        return n2.error(
          `Expected 1 argument, but found ${t2.length - 1} instead.`
        )
      let r2 = t2[1]
      return r2 == null
        ? n2.error(`Global state property must be defined.`)
        : typeof r2 == `string`
          ? new e32(r2)
          : n2.error(
              `Global state property must be string, but found ${typeof t2[1]} instead.`
            )
    }
    evaluate(e52) {
      let t2 = e52.globals?.globalState
      return !t2 || Object.keys(t2).length === 0
        ? null
        : (Sr(t2, this.key) ?? null)
    }
    eachChild() {}
    outputDefined() {
      return false
    }
  }
const Xa = {
  "==": Ii,
  "!=": Li,
  ">": zi,
  "<": Ri,
  ">=": Vi,
  "<=": Bi,
  array: ui,
  at: hi,
  boolean: ui,
  case: yi,
  coalesce: xi,
  collator: Hi,
  format: ni,
  image: Wi,
  in: gi,
  "index-of": _i,
  interpolate: $r,
  "interpolate-hcl": $r,
  "interpolate-lab": $r,
  length: Gi,
  let: pi,
  literal: qr,
  match: vi,
  number: ui,
  "number-format": Ui,
  object: ui,
  semiliteral: Ja,
  slice: bi,
  step: Zr,
  string: ui,
  "to-boolean": fi,
  "to-color": fi,
  "to-number": fi,
  "to-string": fi,
  var: mi,
  within: ya,
  distance: qa,
  "global-state": Ya,
}
var Za = class extends Error {
    constructor(e52, t2) {
      ;(super(t2), (this.message = t2), (this.key = e52))
    }
  },
  Qa = class e33 {
    constructor(e52, t2 = []) {
      ;((this.parent = e52), (this.bindings = {}))
      for (let [e53, n2] of t2) this.bindings[e53] = n2
    }
    concat(t2) {
      return new e33(this, t2)
    }
    get(e52) {
      if (this.bindings[e52]) return this.bindings[e52]
      if (this.parent) return this.parent.get(e52)
      throw Error(`${e52} not found in scope.`)
    }
    has(e52) {
      return this.bindings[e52]
        ? true
        : this.parent
          ? this.parent.has(e52)
          : false
    }
  },
  $a = class e34 {
    constructor(e52, t2, n2 = [], r2, i2 = new Qa(), a2 = []) {
      ;((this.registry = e52),
        (this.path = n2),
        (this.key = n2.map(e53 => `[${e53}]`).join(``)),
        (this.scope = i2),
        (this.errors = a2),
        (this.expectedType = r2),
        (this._isConstant = t2))
    }
    parse(e52, t2, n2, r2, i2 = {}) {
      return t2 ? this.concat(t2, n2, r2)._parse(e52, i2) : this._parse(e52, i2)
    }
    _parse(e52, t2) {
      ;(e52 === null ||
        typeof e52 == `string` ||
        typeof e52 == `boolean` ||
        typeof e52 == `number`) &&
        (e52 = [`literal`, e52])
      let n2 = this.key
      function r2(e53, t3, r3) {
        return r3 === `assert`
          ? new ui(t3, [e53], n2)
          : r3 === `coerce`
            ? new fi(t3, [e53], n2)
            : e53
      }
      if (Array.isArray(e52)) {
        if (e52.length === 0)
          return this.error(
            `Expected an array with at least one element. If you wanted a literal array, use ["literal", []].`
          )
        let n3 = e52[0]
        if (typeof n3 != `string`)
          return (
            this.error(
              `Expression name must be a string, but found ${typeof n3} instead. If you wanted a literal array, use ["literal", [...]].`,
              0
            ),
            null
          )
        let i2 = this.registry[n3]
        if (i2) {
          let n4 = i2.parse(e52, this)
          if (!n4) return null
          if (this.expectedType) {
            let e53 = this.expectedType,
              i3 = n4.type
            if (
              (e53.kind === `string` ||
                e53.kind === `number` ||
                e53.kind === `boolean` ||
                e53.kind === `object` ||
                e53.kind === `array`) &&
              i3.kind === `value`
            )
              n4 = r2(n4, e53, t2.typeAnnotation || `assert`)
            else if (
              (e53.kind === `projectionDefinition` &&
                [`string`, `array`, `value`].includes(i3.kind)) ||
              ([`color`, `formatted`, `resolvedImage`].includes(e53.kind) &&
                [`value`, `string`].includes(i3.kind)) ||
              ([`padding`, `numberArray`].includes(e53.kind) &&
                [`value`, `number`, `array`].includes(i3.kind)) ||
              (e53.kind === `colorArray` &&
                [`value`, `string`, `array`].includes(i3.kind)) ||
              (e53.kind === `variableAnchorOffsetCollection` &&
                [`value`, `array`].includes(i3.kind))
            )
              n4 = r2(n4, e53, t2.typeAnnotation || `coerce`)
            else if (this.checkSubtype(e53, i3)) return null
          }
          if (
            !(n4 instanceof qr) &&
            n4.type.kind !== `resolvedImage` &&
            this._isConstant(n4)
          ) {
            let e53 = new Yr()
            try {
              n4 = new qr(n4.type, n4.evaluate(e53))
            } catch (e54) {
              return (this.error(e54.message), null)
            }
          }
          return n4
        }
        return this.error(
          `Unknown expression "${n3}". If you wanted a literal array, use ["literal", [...]].`,
          0
        )
      }
      return e52 === void 0
        ? this.error(`'undefined' value invalid. Use null instead.`)
        : typeof e52 == `object`
          ? this.error(`Bare objects invalid. Use ["literal", {...}] instead.`)
          : this.error(`Expected an array, but found ${typeof e52} instead.`)
    }
    concat(t2, n2, r2) {
      let i2 = typeof t2 == `number` ? this.path.concat(t2) : this.path,
        a2 = r2 ? this.scope.concat(r2) : this.scope
      return new e34(
        this.registry,
        this._isConstant,
        i2,
        n2 || null,
        a2,
        this.errors
      )
    }
    error(e52, ...t2) {
      let n2 = `${this.key}${t2.map(e53 => `[${e53}]`).join(``)}`
      this.errors.push(new Za(n2, e52))
    }
    checkSubtype(e52, t2) {
      let n2 = er(e52, t2)
      return (n2 && this.error(n2), n2)
    }
  },
  eo = class e35 {
    constructor(e52, t2, n2, r2, i2) {
      ;((this.name = e52),
        (this.type = t2),
        (this._evaluate = n2),
        (this.args = r2),
        (this.key = i2))
    }
    evaluate(e52) {
      return this._evaluate(e52, this.args, this.key)
    }
    eachChild(e52) {
      this.args.forEach(e52)
    }
    outputDefined() {
      return false
    }
    static parse(t2, n2) {
      let r2 = t2[0],
        i2 = e35.definitions[r2]
      if (!i2)
        return n2.error(
          `Unknown expression "${r2}". If you wanted a literal array, use ["literal", [...]].`,
          0
        )
      let a2 = Array.isArray(i2) ? i2[0] : i2.type,
        o2 = Array.isArray(i2) ? [[i2[1], i2[2]]] : i2.overloads,
        s2 = o2.filter(
          ([e52]) => !Array.isArray(e52) || e52.length === t2.length - 1
        ),
        c2 = null
      for (let [i3, o3] of s2) {
        c2 = new $a(n2.registry, so, n2.path, null, n2.scope)
        let s3 = [],
          l2 = false
        for (let e52 = 1; e52 < t2.length; e52++) {
          let n3 = t2[e52],
            r3 = Array.isArray(i3) ? i3[e52 - 1] : i3.type,
            a3 = c2.parse(n3, 1 + s3.length, r3)
          if (!a3) {
            l2 = true
            break
          }
          s3.push(a3)
        }
        if (!l2) {
          if (Array.isArray(i3) && i3.length !== s3.length) {
            c2.error(
              `Expected ${i3.length} arguments, but found ${s3.length} instead.`
            )
            continue
          }
          for (let e52 = 0; e52 < s3.length; e52++) {
            let t3 = Array.isArray(i3) ? i3[e52] : i3.type,
              n3 = s3[e52]
            c2.concat(e52 + 1).checkSubtype(t3, n3.type)
          }
          if (c2.errors.length === 0) return new e35(r2, a2, o3, s3, n2.key)
        }
      }
      if (s2.length === 1) n2.errors.push(...c2.errors)
      else {
        let e52 = (s2.length ? s2 : o2).map(([e53]) => oo(e53)).join(` | `),
          r3 = []
        for (let e53 = 1; e53 < t2.length; e53++) {
          let i3 = n2.parse(t2[e53], 1 + r3.length)
          if (!i3) return null
          r3.push(R(i3.type))
        }
        n2.error(
          `Expected arguments of type ${e52}, but found (${r3.join(`, `)}) instead.`
        )
      }
      return null
    }
    static register(t2, n2) {
      e35.definitions = n2
      for (let r2 in n2) t2[r2] = e35
    }
  }
function to(e52, [t2, n2, r2, i2], a2) {
  ;((t2 = t2.evaluate(e52)), (n2 = n2.evaluate(e52)), (r2 = r2.evaluate(e52)))
  let o2 = i2 ? i2.evaluate(e52) : 1,
    s2 = Ur(t2, n2, r2, o2)
  if (s2) throw new B(s2, a2)
  return new z(t2 / 255, n2 / 255, r2 / 255, o2, false)
}
function no(e52, t2) {
  return e52 in t2 && t2[e52] !== void 0
}
function ro(e52, t2) {
  let n2 = t2[e52]
  return n2 === void 0 ? null : n2
}
function io(e52, t2, n2, r2) {
  for (; n2 <= r2;) {
    let i2 = (n2 + r2) >> 1
    if (t2[i2] === e52) return true
    t2[i2] > e52 ? (r2 = i2 - 1) : (n2 = i2 + 1)
  }
  return false
}
function ao(e52) {
  return {type: e52}
}
eo.register(Xa, {
  error: [
    Wn,
    [F],
    (e52, [t2], n2) => {
      throw new B(t2.evaluate(e52), n2)
    },
  ],
  typeof: [F, [L], (e52, [t2]) => R(Gr(t2.evaluate(e52)))],
  "to-rgba": [
    Qn(P, 4),
    [Vn],
    (e52, [t2]) => {
      let [n2, r2, i2, a2] = t2.evaluate(e52).rgb
      return [n2 * 255, r2 * 255, i2 * 255, a2]
    },
  ],
  rgb: [Vn, [P, P, P], to],
  rgba: [Vn, [P, P, P, P], to],
  has: {
    type: I,
    overloads: [
      [[F], (e52, [t2]) => no(t2.evaluate(e52), e52.properties())],
      [[F, Un], (e52, [t2, n2]) => no(t2.evaluate(e52), n2.evaluate(e52))],
    ],
  },
  get: {
    type: L,
    overloads: [
      [[F], (e52, [t2]) => ro(t2.evaluate(e52), e52.properties())],
      [[F, Un], (e52, [t2, n2]) => ro(t2.evaluate(e52), n2.evaluate(e52))],
    ],
  },
  "feature-state": [
    L,
    [F],
    (e52, [t2]) => ro(t2.evaluate(e52), e52.featureState || {}),
  ],
  properties: [Un, [], e52 => e52.properties()],
  "geometry-type": [F, [], e52 => e52.geometryType()],
  id: [L, [], e52 => e52.id()],
  zoom: [P, [], e52 => e52.globals.zoom],
  "heatmap-density": [P, [], e52 => e52.globals.heatmapDensity || 0],
  elevation: [P, [], e52 => e52.globals.elevation || 0],
  "line-progress": [P, [], e52 => e52.globals.lineProgress || 0],
  accumulated: [
    L,
    [],
    e52 =>
      e52.globals.accumulated === void 0 ? null : e52.globals.accumulated,
  ],
  "+": [
    P,
    ao(P),
    (e52, t2) => {
      let n2 = 0
      for (let r2 of t2) n2 += r2.evaluate(e52)
      return n2
    },
  ],
  "*": [
    P,
    ao(P),
    (e52, t2) => {
      let n2 = 1
      for (let r2 of t2) n2 *= r2.evaluate(e52)
      return n2
    },
  ],
  "-": {
    type: P,
    overloads: [
      [[P, P], (e52, [t2, n2]) => t2.evaluate(e52) - n2.evaluate(e52)],
      [[P], (e52, [t2]) => -t2.evaluate(e52)],
    ],
  },
  "/": [P, [P, P], (e52, [t2, n2]) => t2.evaluate(e52) / n2.evaluate(e52)],
  "%": [P, [P, P], (e52, [t2, n2]) => t2.evaluate(e52) % n2.evaluate(e52)],
  ln2: [P, [], () => Math.LN2],
  pi: [P, [], () => Math.PI],
  e: [P, [], () => Math.E],
  "^": [P, [P, P], (e52, [t2, n2]) => t2.evaluate(e52) ** +n2.evaluate(e52)],
  sqrt: [P, [P], (e52, [t2]) => Math.sqrt(t2.evaluate(e52))],
  log10: [P, [P], (e52, [t2]) => Math.log(t2.evaluate(e52)) / Math.LN10],
  ln: [P, [P], (e52, [t2]) => Math.log(t2.evaluate(e52))],
  log2: [P, [P], (e52, [t2]) => Math.log(t2.evaluate(e52)) / Math.LN2],
  sin: [P, [P], (e52, [t2]) => Math.sin(t2.evaluate(e52))],
  cos: [P, [P], (e52, [t2]) => Math.cos(t2.evaluate(e52))],
  tan: [P, [P], (e52, [t2]) => Math.tan(t2.evaluate(e52))],
  asin: [P, [P], (e52, [t2]) => Math.asin(t2.evaluate(e52))],
  acos: [P, [P], (e52, [t2]) => Math.acos(t2.evaluate(e52))],
  atan: [P, [P], (e52, [t2]) => Math.atan(t2.evaluate(e52))],
  min: [P, ao(P), (e52, t2) => Math.min(...t2.map(t3 => t3.evaluate(e52)))],
  max: [P, ao(P), (e52, t2) => Math.max(...t2.map(t3 => t3.evaluate(e52)))],
  abs: [P, [P], (e52, [t2]) => Math.abs(t2.evaluate(e52))],
  round: [
    P,
    [P],
    (e52, [t2]) => {
      let n2 = t2.evaluate(e52)
      return n2 < 0 ? -Math.round(-n2) : Math.round(n2)
    },
  ],
  floor: [P, [P], (e52, [t2]) => Math.floor(t2.evaluate(e52))],
  ceil: [P, [P], (e52, [t2]) => Math.ceil(t2.evaluate(e52))],
  "filter-==": [
    I,
    [F, L],
    (e52, [t2, n2]) => e52.properties()[t2.value] === n2.value,
  ],
  "filter-id-==": [I, [L], (e52, [t2]) => e52.id() === t2.value],
  "filter-type-==": [I, [F], (e52, [t2]) => e52.geometryType() === t2.value],
  "filter-<": [
    I,
    [F, L],
    (e52, [t2, n2]) => {
      let r2 = e52.properties()[t2.value],
        i2 = n2.value
      return typeof r2 == typeof i2 && r2 < i2
    },
  ],
  "filter-id-<": [
    I,
    [L],
    (e52, [t2]) => {
      let n2 = e52.id(),
        r2 = t2.value
      return typeof n2 == typeof r2 && n2 < r2
    },
  ],
  "filter->": [
    I,
    [F, L],
    (e52, [t2, n2]) => {
      let r2 = e52.properties()[t2.value],
        i2 = n2.value
      return typeof r2 == typeof i2 && r2 > i2
    },
  ],
  "filter-id->": [
    I,
    [L],
    (e52, [t2]) => {
      let n2 = e52.id(),
        r2 = t2.value
      return typeof n2 == typeof r2 && n2 > r2
    },
  ],
  "filter-<=": [
    I,
    [F, L],
    (e52, [t2, n2]) => {
      let r2 = e52.properties()[t2.value],
        i2 = n2.value
      return typeof r2 == typeof i2 && r2 <= i2
    },
  ],
  "filter-id-<=": [
    I,
    [L],
    (e52, [t2]) => {
      let n2 = e52.id(),
        r2 = t2.value
      return typeof n2 == typeof r2 && n2 <= r2
    },
  ],
  "filter->=": [
    I,
    [F, L],
    (e52, [t2, n2]) => {
      let r2 = e52.properties()[t2.value],
        i2 = n2.value
      return typeof r2 == typeof i2 && r2 >= i2
    },
  ],
  "filter-id->=": [
    I,
    [L],
    (e52, [t2]) => {
      let n2 = e52.id(),
        r2 = t2.value
      return typeof n2 == typeof r2 && n2 >= r2
    },
  ],
  "filter-has": [
    I,
    [L],
    (e52, [t2]) => {
      let n2 = t2.value,
        r2 = e52.properties()
      return n2 in r2 && r2[n2] !== void 0
    },
  ],
  "filter-has-id": [I, [], e52 => e52.id() !== null && e52.id() !== void 0],
  "filter-type-in": [
    I,
    [Qn(F)],
    (e52, [t2]) => t2.value.indexOf(e52.geometryType()) >= 0,
  ],
  "filter-id-in": [I, [Qn(L)], (e52, [t2]) => t2.value.indexOf(e52.id()) >= 0],
  "filter-in-small": [
    I,
    [F, Qn(L)],
    (e52, [t2, n2]) => n2.value.indexOf(e52.properties()[t2.value]) >= 0,
  ],
  "filter-in-large": [
    I,
    [F, Qn(L)],
    (e52, [t2, n2]) =>
      io(e52.properties()[t2.value], n2.value, 0, n2.value.length - 1),
  ],
  all: {
    type: I,
    overloads: [
      [[I, I], (e52, [t2, n2]) => t2.evaluate(e52) && n2.evaluate(e52)],
      [
        ao(I),
        (e52, t2) => {
          for (let n2 of t2) if (!n2.evaluate(e52)) return false
          return true
        },
      ],
    ],
  },
  any: {
    type: I,
    overloads: [
      [[I, I], (e52, [t2, n2]) => t2.evaluate(e52) || n2.evaluate(e52)],
      [
        ao(I),
        (e52, t2) => {
          for (let n2 of t2) if (n2.evaluate(e52)) return true
          return false
        },
      ],
    ],
  },
  "!": [I, [I], (e52, [t2]) => !t2.evaluate(e52)],
  "is-supported-script": [
    I,
    [F],
    (e52, [t2]) => {
      let n2 = e52.globals && e52.globals.isSupportedScript
      return !n2 || n2(t2.evaluate(e52))
    },
  ],
  upcase: [F, [F], (e52, [t2]) => t2.evaluate(e52).toUpperCase()],
  downcase: [F, [F], (e52, [t2]) => t2.evaluate(e52).toLowerCase()],
  concat: [F, ao(L), (e52, t2) => t2.map(t3 => Kr(t3.evaluate(e52))).join(``)],
  split: [
    Qn(F),
    [F, F],
    (e52, [t2, n2]) => t2.evaluate(e52).split(n2.evaluate(e52)),
  ],
  join: [
    F,
    [Qn(F), F],
    (e52, [t2, n2]) => t2.evaluate(e52).join(n2.evaluate(e52)),
  ],
  "resolved-locale": [
    F,
    [Gn],
    (e52, [t2]) => t2.evaluate(e52).resolvedLocale(),
  ],
})
function oo(e52) {
  return Array.isArray(e52)
    ? `(${e52.map(R).join(`, `)})`
    : `(${R(e52.type)}...)`
}
function so(e52) {
  if (e52 instanceof mi) return so(e52.boundExpression)
  if (
    (e52 instanceof eo && e52.name === `error`) ||
    e52 instanceof Hi ||
    e52 instanceof ya ||
    e52 instanceof qa ||
    e52 instanceof Ya
  )
    return false
  let t2 = e52 instanceof fi || e52 instanceof ui,
    n2 = true
  return (
    e52.eachChild(e53 => {
      n2 &&= t2 ? so(e53) : e53 instanceof qr
    }),
    n2
      ? co(e52) &&
        uo(e52, [
          `zoom`,
          `heatmap-density`,
          `elevation`,
          `line-progress`,
          `accumulated`,
          `is-supported-script`,
        ])
      : false
  )
}
function co(e52) {
  if (
    (e52 instanceof eo &&
      ((e52.name === `get` && e52.args.length === 1) ||
        e52.name === `feature-state` ||
        (e52.name === `has` && e52.args.length === 1) ||
        e52.name === `properties` ||
        e52.name === `geometry-type` ||
        e52.name === `id` ||
        /^filter-/.test(e52.name))) ||
    e52 instanceof ya ||
    e52 instanceof qa
  )
    return false
  let t2 = true
  return (
    e52.eachChild(e53 => {
      t2 && !co(e53) && (t2 = false)
    }),
    t2
  )
}
function lo(e52) {
  if (e52 instanceof eo && e52.name === `feature-state`) return false
  let t2 = true
  return (
    e52.eachChild(e53 => {
      t2 && !lo(e53) && (t2 = false)
    }),
    t2
  )
}
function uo(e52, t2) {
  if (e52 instanceof eo && t2.indexOf(e52.name) >= 0) return false
  let n2 = true
  return (
    e52.eachChild(e53 => {
      n2 && !uo(e53, t2) && (n2 = false)
    }),
    n2
  )
}
function fo(e52) {
  return (
    e52[`property-type`] === `data-driven` ||
    e52[`property-type`] === `cross-faded-data-driven`
  )
}
function po(e52) {
  return !!e52.expression && e52.expression.parameters.indexOf(`zoom`) > -1
}
function mo(e52) {
  return !!e52.expression && e52.expression.interpolated
}
function ho(e52, ...t2) {
  for (let n2 of t2) for (let t3 in n2) e52[t3] = n2[t3]
  return e52
}
function V(e52) {
  return e52 instanceof Number
    ? `number`
    : e52 instanceof String
      ? `string`
      : e52 instanceof Boolean
        ? `boolean`
        : Array.isArray(e52)
          ? `array`
          : e52 === null
            ? `null`
            : typeof e52
}
function go(e52) {
  return (
    typeof e52 == `object` && !!e52 && !Array.isArray(e52) && Gr(e52) === Un
  )
}
function _o(e52) {
  return e52
}
function vo(e52) {
  switch (e52.type) {
    case `color`:
      return z.parse
    case `padding`:
      return Fr.parse
    case `numberArray`:
      return Ir.parse
    case `colorArray`:
      return Lr.parse
    default:
      return null
  }
}
function yo(e52) {
  switch (e52) {
    case `exponential`:
      return wo
    case `interval`:
      return Co
    case `categorical`:
      return So
    case `identity`:
      return To
    default:
      throw Error(`Unknown function type "${e52}"`)
  }
}
function bo(e52, t2) {
  let n2 = e52.stops && typeof e52.stops[0][0] == `object`,
    r2 = n2 || e52.property !== void 0,
    i2 = n2 || !r2,
    a2 = e52.type || (mo(t2) ? `exponential` : `interval`),
    o2 = vo(t2)
  if (
    (o2 &&
      ((e52 = ho({}, e52)),
      e52.stops && (e52.stops = e52.stops.map(e53 => [e53[0], o2(e53[1])])),
      e52.default
        ? (e52.default = o2(e52.default))
        : (e52.default = o2(t2.default))),
    e52.colorSpace && !jr(e52.colorSpace))
  )
    throw Error(`Unknown color space: "${e52.colorSpace}"`)
  let s2 = yo(a2),
    c2,
    l2
  if (a2 === `categorical`) {
    c2 = /* @__PURE__ */ Object.create(null)
    for (let t3 of e52.stops) c2[t3[0]] = t3[1]
    l2 = typeof e52.stops[0][0]
  }
  if (n2) {
    let n3 = {},
      r3 = []
    for (let t3 = 0; t3 < e52.stops.length; t3++) {
      let i4 = e52.stops[t3],
        a4 = i4[0].zoom
      ;(n3[a4] === void 0 &&
        ((n3[a4] = {
          zoom: a4,
          type: e52.type,
          property: e52.property,
          default: e52.default,
          stops: [],
        }),
        r3.push(a4)),
        n3[a4].stops.push([i4[0].value, i4[1]]))
    }
    let i3 = []
    for (let e53 of r3) i3.push([n3[e53].zoom, bo(n3[e53], t2)])
    let a3 = {name: `linear`}
    return {
      kind: `composite`,
      interpolationType: a3,
      interpolationFactor: $r.interpolationFactor.bind(void 0, a3),
      zoomStops: i3.map(e53 => e53[0]),
      evaluate({zoom: n4}, r4) {
        return wo({stops: i3, base: e52.base}, t2, n4).evaluate(n4, r4)
      },
    }
  }
  if (i2) {
    let n3 =
      a2 === `exponential`
        ? {name: `exponential`, base: e52.base === void 0 ? 1 : e52.base}
        : null
    return {
      kind: `camera`,
      interpolationType: n3,
      interpolationFactor: $r.interpolationFactor.bind(void 0, n3),
      zoomStops: e52.stops.map(e53 => e53[0]),
      evaluate: ({zoom: n4}) => s2(e52, t2, n4, c2, l2),
    }
  }
  return {
    kind: `source`,
    evaluate(n3, r3) {
      let i3 = r3 && r3.properties ? r3.properties[e52.property] : void 0
      return i3 === void 0
        ? xo(e52.default, t2.default)
        : s2(e52, t2, i3, c2, l2)
    },
  }
}
function xo(e52, t2, n2) {
  if (e52 !== void 0) return e52
  if (t2 !== void 0) return t2
  if (n2 !== void 0) return n2
}
function So(e52, t2, n2, r2, i2) {
  return xo(typeof n2 === i2 ? r2[n2] : void 0, e52.default, t2.default)
}
function Co(e52, t2, n2) {
  if (V(n2) !== `number`) return xo(e52.default, t2.default)
  let r2 = e52.stops.length
  if (r2 === 1 || n2 <= e52.stops[0][0]) return e52.stops[0][1]
  if (n2 >= e52.stops[r2 - 1][0]) return e52.stops[r2 - 1][1]
  let i2 = Xr(
    e52.stops.map(e53 => e53[0]),
    n2,
    ``
  )
  return e52.stops[i2][1]
}
function wo(e52, t2, n2) {
  let r2 = e52.base === void 0 ? 1 : e52.base
  if (V(n2) !== `number`) return xo(e52.default, t2.default)
  let i2 = e52.stops.length
  if (i2 === 1 || n2 <= e52.stops[0][0]) return e52.stops[0][1]
  if (n2 >= e52.stops[i2 - 1][0]) return e52.stops[i2 - 1][1]
  let a2 = Xr(
      e52.stops.map(e53 => e53[0]),
      n2,
      ``
    ),
    o2 = Eo(n2, r2, e52.stops[a2][0], e52.stops[a2 + 1][0]),
    s2 = e52.stops[a2][1],
    c2 = e52.stops[a2 + 1][1],
    l2 = ti[t2.type] || _o
  return typeof s2.evaluate == `function`
    ? {
        evaluate(...t3) {
          let n3 = s2.evaluate.apply(void 0, t3),
            r3 = c2.evaluate.apply(void 0, t3)
          if (n3 !== void 0 && r3 !== void 0)
            return l2(n3, r3, o2, e52.colorSpace)
        },
      }
    : l2(s2, c2, o2, e52.colorSpace)
}
function To(e52, t2, n2) {
  switch (t2.type) {
    case `color`:
      n2 = z.parse(n2)
      break
    case `formatted`:
      n2 = Pr.fromString(n2.toString())
      break
    case `resolvedImage`:
      n2 = Br.fromString(n2.toString())
      break
    case `padding`:
      n2 = Fr.parse(n2)
      break
    case `colorArray`:
      n2 = Lr.parse(n2)
      break
    case `numberArray`:
      n2 = Ir.parse(n2)
      break
    default:
      V(n2) !== t2.type &&
        (t2.type !== `enum` || !t2.values[n2]) &&
        (n2 = void 0)
  }
  return xo(n2, e52.default, t2.default)
}
function Eo(e52, t2, n2, r2) {
  let i2 = r2 - n2,
    a2 = e52 - n2
  return i2 === 0 ? 0 : t2 === 1 ? a2 / i2 : (t2 ** +a2 - 1) / (t2 ** +i2 - 1)
}
function Do(e52) {
  return {result: `success`, value: e52}
}
function Oo(e52) {
  return {result: `error`, value: e52}
}
var ko = class {
  constructor(e52, t2, n2, r2) {
    ;((this.expression = e52),
      (this._warningHistory = {}),
      (this._evaluator = new Yr()),
      (this._defaultValue = n2 ? Uo(n2) : null),
      (this._enumValues = n2 && n2.type === `enum` ? n2.values : null),
      (this._globalState = r2),
      (this._rootKey = t2))
  }
  evaluateWithoutErrorHandling(e52, t2, n2, r2, i2, a2) {
    return (
      this._globalState && (e52 = Wo(e52, this._globalState)),
      (this._evaluator.globals = e52),
      (this._evaluator.feature = t2),
      (this._evaluator.featureState = n2),
      (this._evaluator.canonical = r2),
      (this._evaluator.availableImages = i2 || null),
      (this._evaluator.formattedSection = a2),
      this.expression.evaluate(this._evaluator)
    )
  }
  evaluate(e52, t2, n2, r2, i2, a2) {
    ;(this._globalState && (e52 = Wo(e52, this._globalState)),
      (this._evaluator.globals = e52),
      (this._evaluator.feature = t2 || null),
      (this._evaluator.featureState = n2 || null),
      (this._evaluator.canonical = r2),
      (this._evaluator.availableImages = i2 || null),
      (this._evaluator.formattedSection = a2 || null))
    try {
      let e53 = this.expression.evaluate(this._evaluator)
      if (e53 == null || (typeof e53 == `number` && e53 !== e53))
        return this._defaultValue
      if (this._enumValues && !(e53 in this._enumValues))
        throw new B(
          `Expected value to be one of ${Object.keys(this._enumValues)
            .map(e54 => JSON.stringify(e54))
            .join(`, `)}, but found ${JSON.stringify(e53)} instead.`,
          ``
        )
      return e53
    } catch (e53) {
      let t3 = e53 instanceof B ? e53.path : ``,
        n3 = `${t3}|${e53.message}`
      return (
        this._warningHistory[n3] ||
          ((this._warningHistory[n3] = true),
          typeof console < `u` &&
            console.warn(
              Ao(this._rootKey, t3, e53.message, this._defaultValue)
            )),
        this._defaultValue
      )
    }
  }
}
function Ao(e52, t2, n2, r2) {
  return `${e52}${t2}: ${n2}${r2 == null ? `` : ` Falling back to ${String(r2)}.`}`
}
function jo(e52) {
  if (!e52)
    throw Error(
      `rootKey must identify the location of the expression in the style JSON, e.g. "layers[3].paint.line-width".`
    )
}
function Mo(e52) {
  return (
    Array.isArray(e52) &&
    e52.length > 0 &&
    typeof e52[0] == `string` &&
    e52[0] in Xa
  )
}
function No(e52, t2, n2, r2) {
  jo(t2)
  let i2 = new $a(Xa, so, [], n2 ? Ho(n2) : void 0),
    a2 = i2.parse(
      e52,
      void 0,
      void 0,
      void 0,
      n2 && n2.type === `string` ? {typeAnnotation: `coerce`} : void 0
    )
  return a2 ? Do(new ko(a2, t2, n2, r2)) : Oo(i2.errors)
}
var Po = class {
    constructor(e52, t2, n2) {
      ;((this.kind = e52),
        (this._styleExpression = t2),
        (this.isStateDependent = e52 !== `constant` && !lo(t2.expression)),
        (this.globalStateRefs = Vo(t2.expression)),
        (this._globalState = n2))
    }
    evaluateWithoutErrorHandling(e52, t2, n2, r2, i2, a2) {
      return (
        this._globalState && (e52 = Wo(e52, this._globalState)),
        this._styleExpression.evaluateWithoutErrorHandling(
          e52,
          t2,
          n2,
          r2,
          i2,
          a2
        )
      )
    }
    evaluate(e52, t2, n2, r2, i2, a2) {
      return (
        this._globalState && (e52 = Wo(e52, this._globalState)),
        this._styleExpression.evaluate(e52, t2, n2, r2, i2, a2)
      )
    }
  },
  Fo = class {
    constructor(e52, t2, n2, r2, i2) {
      ;((this.kind = e52),
        (this.zoomStops = n2),
        (this._styleExpression = t2),
        (this.isStateDependent = e52 !== `camera` && !lo(t2.expression)),
        (this.globalStateRefs = Vo(t2.expression)),
        (this.interpolationType = r2),
        (this._globalState = i2))
    }
    evaluateWithoutErrorHandling(e52, t2, n2, r2, i2, a2) {
      return (
        this._globalState && (e52 = Wo(e52, this._globalState)),
        this._styleExpression.evaluateWithoutErrorHandling(
          e52,
          t2,
          n2,
          r2,
          i2,
          a2
        )
      )
    }
    evaluate(e52, t2, n2, r2, i2, a2) {
      return (
        this._globalState && (e52 = Wo(e52, this._globalState)),
        this._styleExpression.evaluate(e52, t2, n2, r2, i2, a2)
      )
    }
    interpolationFactor(e52, t2, n2) {
      return this.interpolationType
        ? $r.interpolationFactor(this.interpolationType, e52, t2, n2)
        : 0
    }
  }
function Io(e52) {
  return e52._styleExpression !== void 0
}
function Lo(e52, t2, n2, r2) {
  let i2 = No(e52, t2, n2, r2)
  if (i2.result === `error`) return i2
  let a2 = i2.value.expression,
    o2 = co(a2)
  if (!o2 && !fo(n2)) return Oo([new Za(``, `data expressions not supported`)])
  let s2 = uo(a2, [`zoom`])
  if (!s2 && !po(n2)) return Oo([new Za(``, `zoom expressions not supported`)])
  let c2 = Bo(a2)
  if (!c2 && !s2)
    return Oo([
      new Za(
        ``,
        `"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.`
      ),
    ])
  if (c2 instanceof Za) return Oo([c2])
  if (c2 instanceof $r && !mo(n2))
    return Oo([
      new Za(``, `"interpolate" expressions cannot be used with this property`),
    ])
  if (!c2)
    return Do(
      o2 ? new Po(`constant`, i2.value, r2) : new Po(`source`, i2.value, r2)
    )
  let l2 = c2 instanceof $r ? c2.interpolation : void 0
  return Do(
    o2
      ? new Fo(`camera`, i2.value, c2.labels, l2, r2)
      : new Fo(`composite`, i2.value, c2.labels, l2, r2)
  )
}
var Ro = class e36 {
  constructor(e52, t2, n2) {
    ;((this.isStateDependent = false),
      (this.globalStateRefs = /* @__PURE__ */ new Set()),
      (this._globalState = null),
      jo(t2),
      (this._parameters = e52),
      (this._specification = n2),
      (this._rootKey = t2),
      (this._defaultValue = Uo(n2)),
      (this._warningHistory = {}))
    let r2 = bo(this._parameters, this._specification)
    ;((this.kind = r2.kind),
      (this.interpolationFactor = r2.interpolationFactor),
      (this.zoomStops = r2.zoomStops),
      (this.interpolationType = r2.interpolationType),
      (this._innerEvaluate = r2.evaluate))
  }
  evaluate(e52, t2) {
    try {
      return this._innerEvaluate(e52, t2)
    } catch (e53) {
      let t3 = e53 instanceof Error ? e53.message : String(e53),
        n2 = `|${t3}`
      return (
        this._warningHistory[n2] ||
          ((this._warningHistory[n2] = true),
          typeof console < `u` &&
            console.warn(Ao(this._rootKey, ``, t3, this._defaultValue))),
        this._defaultValue
      )
    }
  }
  static deserialize(t2) {
    return new e36(t2._parameters, t2._rootKey, t2._specification)
  }
  static serialize(e52) {
    return {
      _parameters: e52._parameters,
      _specification: e52._specification,
      _rootKey: e52._rootKey,
    }
  }
}
function zo(e52, t2, n2, r2) {
  if (go(e52)) return new Ro(e52, t2, n2)
  if (Mo(e52)) {
    let i2 = Lo(e52, t2, n2, r2)
    if (i2.result === `error`)
      throw Error(i2.value.map(e53 => `${e53.key}: ${e53.message}`).join(`, `))
    return i2.value
  }
  {
    let t3 = e52
    return (
      n2.type === `color` && typeof e52 == `string`
        ? (t3 = z.parse(e52))
        : n2.type === `padding` &&
            (typeof e52 == `number` || Array.isArray(e52))
          ? (t3 = Fr.parse(e52))
          : n2.type === `numberArray` &&
              (typeof e52 == `number` || Array.isArray(e52))
            ? (t3 = Ir.parse(e52))
            : n2.type === `colorArray` &&
                (typeof e52 == `string` || Array.isArray(e52))
              ? (t3 = Lr.parse(e52))
              : n2.type === `variableAnchorOffsetCollection` &&
                  Array.isArray(e52)
                ? (t3 = zr.parse(e52))
                : n2.type === `projectionDefinition` &&
                  typeof e52 == `string` &&
                  (t3 = Vr.parse(e52)),
      {
        globalStateRefs: /* @__PURE__ */ new Set(),
        _globalState: null,
        kind: `constant`,
        evaluate: () => t3,
      }
    )
  }
}
function Bo(e52) {
  let t2 = null
  if (e52 instanceof pi) t2 = Bo(e52.result)
  else if (e52 instanceof xi) {
    for (let n2 of e52.args) if (((t2 = Bo(n2)), t2)) break
  } else
    (e52 instanceof Zr || e52 instanceof $r) &&
      e52.input instanceof eo &&
      e52.input.name === `zoom` &&
      (t2 = e52)
  return (
    t2 instanceof Za ||
      e52.eachChild(e53 => {
        let n2 = Bo(e53)
        n2 instanceof Za
          ? (t2 = n2)
          : !t2 && n2
            ? (t2 = new Za(
                ``,
                `"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.`
              ))
            : t2 &&
              n2 &&
              t2 !== n2 &&
              (t2 = new Za(
                ``,
                `Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.`
              ))
      }),
    t2
  )
}
function Vo(e52, t2 = /* @__PURE__ */ new Set()) {
  return (
    e52 instanceof Ya && t2.add(e52.key),
    e52.eachChild(e53 => {
      Vo(e53, t2)
    }),
    t2
  )
}
function Ho(e52) {
  let t2 = {
    color: Vn,
    string: F,
    number: P,
    enum: F,
    boolean: I,
    formatted: Kn,
    padding: qn,
    numberArray: Yn,
    colorArray: Jn,
    projectionDefinition: Hn,
    resolvedImage: Xn,
    variableAnchorOffsetCollection: Zn,
  }
  return e52.type === `array`
    ? Qn(t2[e52.value] || L, e52.length)
    : t2[e52.type]
}
function Uo(e52) {
  if (e52.type === `color` && go(e52.default)) return new z(0, 0, 0, 0)
  switch (e52.type) {
    case `color`:
      return z.parse(e52.default) || null
    case `padding`:
      return Fr.parse(e52.default) || null
    case `numberArray`:
      return Ir.parse(e52.default) || null
    case `colorArray`:
      return Lr.parse(e52.default) || null
    case `variableAnchorOffsetCollection`:
      return zr.parse(e52.default) || null
    case `projectionDefinition`:
      return Vr.parse(e52.default) || null
    default:
      return e52.default === void 0 ? null : e52.default
  }
}
function Wo(e52, t2) {
  let {
    zoom: n2,
    heatmapDensity: r2,
    elevation: i2,
    lineProgress: a2,
    isSupportedScript: o2,
    accumulated: s2,
  } = e52 ?? {}
  return {
    zoom: n2,
    heatmapDensity: r2,
    elevation: i2,
    lineProgress: a2,
    isSupportedScript: o2,
    accumulated: s2,
    globalState: t2,
  }
}
function Go(e52) {
  let t2 = false
  for (let n2 of e52) {
    let e53 = Ko(n2)
    if (e53 === `expression`) return `expression`
    e53 === `legacy` && (t2 = true)
  }
  return t2 ? `legacy` : `neutral`
}
function Ko(e52) {
  if (typeof e52 == `boolean`) return `neutral`
  if (!Array.isArray(e52) || e52.length === 0) return `legacy`
  switch (e52[0]) {
    case `has`:
      return e52.length < 2 || e52[1] === `$id` || e52[1] === `$type`
        ? `legacy`
        : e52.length === 2
          ? `neutral`
          : `expression`
    case `in`:
      return e52.length >= 3 &&
        (typeof e52[1] != `string` || Array.isArray(e52[2]))
        ? `expression`
        : `legacy`
    case `!in`:
    case `!has`:
      return `legacy`
    case `==`:
    case `!=`:
    case `>`:
    case `>=`:
    case `<`:
    case `<=`:
      return e52.length !== 3 || Array.isArray(e52[1]) || Array.isArray(e52[2])
        ? `expression`
        : `legacy`
    case `none`:
      return `legacy`
    case `any`:
    case `all`:
      return Go(e52.slice(1))
    default:
      return `expression`
  }
}
function qo(e52) {
  return Ko(e52) !== `legacy`
}
function Jo(e52) {
  return e52 === `$type`
    ? [`geometry-type`]
    : e52 === `$id`
      ? [`id`]
      : [`get`, e52]
}
function Yo(e52) {
  switch (e52[0]) {
    case `==`:
    case `!=`:
    case `<`:
    case `<=`:
    case `>`:
    case `>=`:
      return e52.length !== 3 || typeof e52[1] != `string`
        ? null
        : [e52[0], Jo(e52[1]), e52[2]]
    case `in`:
    case `!in`: {
      if (e52.length < 2 || typeof e52[1] != `string`) return null
      let t2 = [`in`, Jo(e52[1]), [`literal`, e52.slice(2)]]
      return e52[0] === `!in` ? [`!`, t2] : t2
    }
    case `has`:
    case `!has`: {
      if (
        e52.length !== 2 ||
        typeof e52[1] != `string` ||
        e52[1] === `$type` ||
        e52[1] === `$id`
      )
        return null
      let t2 = [`has`, e52[1]]
      return e52[0] === `!has` ? [`!`, t2] : t2
    }
    default:
      return null
  }
}
function Xo(e52) {
  if (
    (e52[0] === `<` || e52[0] === `<=` || e52[0] === `>` || e52[0] === `>=`) &&
    e52[1] === `$type`
  )
    return `"$type" cannot be use with operator "${e52[0]}"`
  let t2 = Yo(e52)
  return t2
    ? `Mixing deprecated filter syntax with expression syntax is not supported. Replace ${JSON.stringify(e52)} with ${JSON.stringify(t2)}.`
    : `Mixing deprecated filter syntax with expression syntax is not supported. Convert ${JSON.stringify(e52)} to expression syntax.`
}
function Zo(e52, t2, n2) {
  let r2 = n2[e52]
  return Array.isArray(r2)
    ? qo(r2)
      ? Qo(r2, t2.concat(e52))
      : {path: t2.concat(e52), legacyFilter: r2}
    : null
}
function Qo(e52, t2 = []) {
  if (!Array.isArray(e52) || e52.length < 1) return null
  switch (e52[0]) {
    case `all`:
    case `any`:
    case `none`:
      for (let n2 = 1; n2 < e52.length; n2++) {
        let r2 = Zo(n2, t2, e52)
        if (r2) return r2
      }
      break
    case `!`: {
      let n2 = Zo(1, t2, e52)
      if (n2) return n2
      break
    }
    case `case`:
      for (let n2 = 1; n2 < e52.length - 1; n2 += 2) {
        let r2 = Zo(n2, t2, e52)
        if (r2) return r2
      }
  }
  return null
}
function $o(e52, t2) {
  let n2 = Qo(e52)
  if (!n2 || typeof console > `u`) return
  let r2 = n2.path.map(e53 => `[${e53}]`).join(``)
  console.warn(`${t2}${r2}: ${Xo(n2.legacyFilter)}`)
}
const es = {
  type: `boolean`,
  default: false,
  transition: false,
  "property-type": `data-driven`,
  expression: {interpolated: false, parameters: [`zoom`, `feature`]},
}
function ts(e52, t2, n2) {
  if (e52 == null)
    return {
      filter: () => true,
      needGeometry: false,
      getGlobalStateRefs: () => /* @__PURE__ */ new Set(),
    }
  qo(e52) ? $o(e52, t2) : (e52 = is(e52))
  let r2 = No(e52, t2, es, n2)
  if (r2.result === `error`)
    throw Error(r2.value.map(e53 => `${e53.key}: ${e53.message}`).join(`, `))
  return {
    filter: (e53, t3, n3) => r2.value.evaluate(e53, t3, {}, n3),
    needGeometry: rs(e52),
    getGlobalStateRefs: () => Vo(r2.value.expression),
  }
}
function ns(e52, t2) {
  return e52 < t2 ? -1 : +(e52 > t2)
}
function rs(e52) {
  if (!Array.isArray(e52)) return false
  if (e52[0] === `within` || e52[0] === `distance`) return true
  for (let t2 = 1; t2 < e52.length; t2++) if (rs(e52[t2])) return true
  return false
}
function is(e52) {
  if (!e52) return true
  let t2 = e52[0]
  return e52.length <= 1
    ? t2 !== `any`
    : t2 === `==`
      ? as(e52[1], e52[2], `==`)
      : t2 === `!=`
        ? ls(as(e52[1], e52[2], `==`))
        : t2 === `<` || t2 === `>` || t2 === `<=` || t2 === `>=`
          ? as(e52[1], e52[2], t2)
          : t2 === `any`
            ? os(e52.slice(1))
            : t2 === `all`
              ? [`all`].concat(e52.slice(1).map(is))
              : t2 === `none`
                ? [`all`].concat(e52.slice(1).map(is).map(ls))
                : t2 === `in`
                  ? ss(e52[1], e52.slice(2))
                  : t2 === `!in`
                    ? ls(ss(e52[1], e52.slice(2)))
                    : t2 === `has`
                      ? cs(e52[1])
                      : t2 !== `!has` || ls(cs(e52[1]))
}
function as(e52, t2, n2) {
  switch (e52) {
    case `$type`:
      return [`filter-type-${n2}`, t2]
    case `$id`:
      return [`filter-id-${n2}`, t2]
    default:
      return [`filter-${n2}`, e52, t2]
  }
}
function os(e52) {
  return [`any`].concat(e52.map(is))
}
function ss(e52, t2) {
  if (t2.length === 0) return false
  switch (e52) {
    case `$type`:
      return [`filter-type-in`, [`literal`, t2]]
    case `$id`:
      return [`filter-id-in`, [`literal`, t2]]
    default:
      return t2.length > 200 && !t2.some(e53 => typeof e53 != typeof t2[0])
        ? [`filter-in-large`, e52, [`literal`, t2.sort(ns)]]
        : [`filter-in-small`, e52, [`literal`, t2]]
  }
}
function cs(e52) {
  switch (e52) {
    case `$type`:
      return true
    case `$id`:
      return [`filter-has-id`]
    default:
      return [`filter-has`, e52]
  }
}
function ls(e52) {
  return [`!`, e52]
}
function us(e52) {
  let t2 = e52.key,
    n2 = e52.value
  return n2 ? [new N(t2, n2, `constants have been deprecated as of v8`)] : []
}
function ds(e52) {
  return e52 instanceof Number ||
    e52 instanceof String ||
    e52 instanceof Boolean
    ? e52.valueOf()
    : e52
}
function fs(e52) {
  if (Array.isArray(e52)) return e52.map(fs)
  if (
    e52 instanceof Object &&
    !(e52 instanceof Number || e52 instanceof String || e52 instanceof Boolean)
  ) {
    let t2 = {}
    for (let n2 in e52) t2[n2] = fs(e52[n2])
    return t2
  }
  return ds(e52)
}
function ps(e52) {
  let t2 = e52.key,
    n2 = e52.value,
    r2 = e52.valueSpec || {},
    i2 = e52.objectElementValidators || {},
    a2 = e52.style,
    o2 = e52.styleSpec,
    s2 = e52.validateSpec,
    c2 = [],
    l2 = V(n2)
  if (l2 !== `object`) return [new N(t2, n2, `object expected, ${l2} found`)]
  for (let e53 in n2) {
    let l3 = e53.split(`.`)[0],
      u2 = Sr(r2, l3) || r2[`*`],
      d2
    if (Sr(i2, l3)) d2 = i2[l3]
    else if (Sr(r2, l3)) {
      if (n2[e53] === void 0) continue
      d2 = s2
    } else if (i2[`*`]) d2 = i2[`*`]
    else if (r2[`*`]) d2 = s2
    else {
      c2.push(new N(t2, n2[e53], `unknown property "${e53}"`))
      continue
    }
    c2 = c2.concat(
      d2(
        {
          key: (t2 && `${t2}.`) + e53,
          value: n2[e53],
          valueSpec: u2,
          style: a2,
          styleSpec: o2,
          object: n2,
          objectKey: e53,
          validateSpec: s2,
        },
        n2
      )
    )
  }
  for (let e53 in r2)
    i2[e53] ||
      (r2[e53].required &&
        r2[e53].default === void 0 &&
        n2[e53] === void 0 &&
        c2.push(new N(t2, n2, `missing required property "${e53}"`)))
  return c2
}
function ms(e52) {
  let t2 = e52.value,
    n2 = e52.valueSpec,
    r2 = e52.validateSpec,
    i2 = e52.style,
    a2 = e52.styleSpec,
    o2 = e52.key,
    s2 = e52.arrayElementValidator || r2
  if (V(t2) !== `array`)
    return [new N(o2, t2, `array expected, ${V(t2)} found`)]
  if (n2.length && t2.length !== n2.length)
    return [
      new N(
        o2,
        t2,
        `array length ${n2.length} expected, length ${t2.length} found`
      ),
    ]
  let c2 = {type: n2.value, values: n2.values}
  ;(a2.$version < 7 && (c2.function = n2.function),
    V(n2.value) === `object` && (c2 = n2.value))
  let l2 = []
  for (let n3 = 0; n3 < t2.length; n3++)
    l2 = l2.concat(
      s2({
        array: t2,
        arrayIndex: n3,
        value: t2[n3],
        valueSpec: c2,
        validateSpec: e52.validateSpec,
        style: i2,
        styleSpec: a2,
        key: `${o2}[${n3}]`,
      })
    )
  return l2
}
function hs(e52) {
  let t2 = e52.key,
    n2 = e52.value,
    r2 = e52.valueSpec,
    i2 = V(n2)
  return (
    i2 === `number` && n2 !== n2 && (i2 = `NaN`),
    i2 === `number`
      ? `minimum` in r2 && n2 < r2.minimum
        ? [new N(t2, n2, `${n2} is less than the minimum value ${r2.minimum}`)]
        : `maximum` in r2 && n2 > r2.maximum
          ? [
              new N(
                t2,
                n2,
                `${n2} is greater than the maximum value ${r2.maximum}`
              ),
            ]
          : []
      : [new N(t2, n2, `number expected, ${i2} found`)]
  )
}
function gs(e52) {
  let t2 = e52.valueSpec,
    n2 = ds(e52.value.type),
    r2,
    i2 = {},
    a2,
    o2,
    s2 = n2 !== `categorical` && e52.value.property === void 0,
    c2 = !s2,
    l2 =
      V(e52.value.stops) === `array` &&
      V(e52.value.stops[0]) === `array` &&
      V(e52.value.stops[0][0]) === `object`,
    u2 = ps({
      key: e52.key,
      value: e52.value,
      valueSpec: e52.styleSpec.function,
      validateSpec: e52.validateSpec,
      style: e52.style,
      styleSpec: e52.styleSpec,
      objectElementValidators: {stops: d2, default: m2},
    })
  return (
    n2 === `identity` &&
      s2 &&
      u2.push(
        new N(e52.key, e52.value, `missing required property "property"`)
      ),
    n2 !== `identity` &&
      !e52.value.stops &&
      u2.push(new N(e52.key, e52.value, `missing required property "stops"`)),
    n2 === `exponential` &&
      e52.valueSpec.expression &&
      !mo(e52.valueSpec) &&
      u2.push(new N(e52.key, e52.value, `exponential functions not supported`)),
    e52.styleSpec.$version >= 8 &&
      (c2 && !fo(e52.valueSpec)
        ? u2.push(new N(e52.key, e52.value, `property functions not supported`))
        : s2 &&
          !po(e52.valueSpec) &&
          u2.push(new N(e52.key, e52.value, `zoom functions not supported`))),
    (n2 === `categorical` || l2) &&
      e52.value.property === void 0 &&
      u2.push(new N(e52.key, e52.value, `"property" property is required`)),
    u2
  )
  function d2(e53) {
    if (n2 === `identity`)
      return [
        new N(
          e53.key,
          e53.value,
          `identity function may not have a "stops" property`
        ),
      ]
    let t3 = [],
      r3 = e53.value
    return (
      (t3 = t3.concat(
        ms({
          key: e53.key,
          value: r3,
          valueSpec: e53.valueSpec,
          validateSpec: e53.validateSpec,
          style: e53.style,
          styleSpec: e53.styleSpec,
          arrayElementValidator: f2,
        })
      )),
      V(r3) === `array` &&
        r3.length === 0 &&
        t3.push(new N(e53.key, r3, `array must have at least one stop`)),
      t3
    )
  }
  function f2(e53) {
    let n3 = [],
      r3 = e53.value,
      s3 = e53.key
    if (V(r3) !== `array`)
      return [new N(s3, r3, `array expected, ${V(r3)} found`)]
    if (r3.length !== 2)
      return [
        new N(s3, r3, `array length 2 expected, length ${r3.length} found`),
      ]
    if (l2) {
      if (V(r3[0]) !== `object`)
        return [new N(s3, r3, `object expected, ${V(r3[0])} found`)]
      if (r3[0].zoom === void 0)
        return [new N(s3, r3, `object stop key must have zoom`)]
      if (r3[0].value === void 0)
        return [new N(s3, r3, `object stop key must have value`)]
      if (o2 && o2 > ds(r3[0].zoom))
        return [
          new N(
            s3,
            r3[0].zoom,
            `stop zoom values must appear in ascending order`
          ),
        ]
      ;(ds(r3[0].zoom) !== o2 &&
        ((o2 = ds(r3[0].zoom)), (a2 = void 0), (i2 = {})),
        (n3 = n3.concat(
          ps({
            key: `${s3}[0]`,
            value: r3[0],
            valueSpec: {zoom: {}},
            validateSpec: e53.validateSpec,
            style: e53.style,
            styleSpec: e53.styleSpec,
            objectElementValidators: {zoom: hs, value: p2},
          })
        )))
    } else
      n3 = n3.concat(
        p2(
          {
            key: `${s3}[0]`,
            value: r3[0],
            valueSpec: {},
            validateSpec: e53.validateSpec,
            style: e53.style,
            styleSpec: e53.styleSpec,
          },
          r3
        )
      )
    return Mo(fs(r3[1]))
      ? n3.concat([
          new N(
            `${s3}[1]`,
            r3[1],
            `expressions are not allowed in function stops.`
          ),
        ])
      : n3.concat(
          e53.validateSpec({
            key: `${s3}[1]`,
            value: r3[1],
            valueSpec: t2,
            validateSpec: e53.validateSpec,
            style: e53.style,
            styleSpec: e53.styleSpec,
          })
        )
  }
  function p2(e53, o3) {
    let s3 = V(e53.value),
      c3 = ds(e53.value),
      l3 = e53.value === null ? o3 : e53.value
    if (!r2) r2 = s3
    else if (s3 !== r2)
      return [
        new N(
          e53.key,
          l3,
          `${s3} stop domain type must match previous stop domain type ${r2}`
        ),
      ]
    if (s3 !== `number` && s3 !== `string` && s3 !== `boolean`)
      return [
        new N(
          e53.key,
          l3,
          `stop domain value must be a number, string, or boolean`
        ),
      ]
    if (s3 !== `number` && n2 !== `categorical`) {
      let r3 = `number expected, ${s3} found`
      return (
        fo(t2) &&
          n2 === void 0 &&
          (r3 +=
            '\nIf you intended to use a categorical function, specify `"type": "categorical"`.'),
        [new N(e53.key, l3, r3)]
      )
    }
    return n2 === `categorical` &&
      s3 === `number` &&
      (!isFinite(c3) || Math.floor(c3) !== c3)
      ? [new N(e53.key, l3, `integer expected, found ${c3}`)]
      : n2 !== `categorical` && s3 === `number` && a2 !== void 0 && c3 < a2
        ? [
            new N(
              e53.key,
              l3,
              `stop domain values must appear in ascending order`
            ),
          ]
        : ((a2 = c3),
          n2 === `categorical` && c3 in i2
            ? [new N(e53.key, l3, `stop domain values must be unique`)]
            : ((i2[c3] = true), []))
  }
  function m2(e53) {
    return e53.validateSpec({
      key: e53.key,
      value: e53.value,
      valueSpec: t2,
      validateSpec: e53.validateSpec,
      style: e53.style,
      styleSpec: e53.styleSpec,
    })
  }
}
function _s(e52) {
  let t2 = (e52.expressionContext === `property` ? Lo : No)(
    fs(e52.value),
    e52.key,
    e52.valueSpec
  )
  if (t2.result === `error`)
    return t2.value.map(
      t3 => new N(`${e52.key}${t3.key}`, e52.value, t3.message)
    )
  let n2 = t2.value.expression || t2.value._styleExpression.expression
  if (
    e52.expressionContext === `property` &&
    e52.propertyKey === `text-font` &&
    !n2.outputDefined()
  )
    return [
      new N(
        e52.key,
        e52.value,
        `Invalid data expression for "${e52.propertyKey}". Output values must be contained as literals within the expression.`
      ),
    ]
  if (
    e52.expressionContext === `property` &&
    e52.propertyType === `layout` &&
    !lo(n2)
  )
    return [
      new N(
        e52.key,
        e52.value,
        `"feature-state" data expressions are not supported with layout properties.`
      ),
    ]
  if (e52.expressionContext === `filter` && !lo(n2))
    return [
      new N(
        e52.key,
        e52.value,
        `"feature-state" data expressions are not supported with filters.`
      ),
    ]
  if (e52.expressionContext && e52.expressionContext.indexOf(`cluster`) === 0) {
    if (!uo(n2, [`zoom`, `feature-state`]))
      return [
        new N(
          e52.key,
          e52.value,
          `"zoom" and "feature-state" expressions are not supported with cluster properties.`
        ),
      ]
    if (e52.expressionContext === `cluster-initial` && !co(n2))
      return [
        new N(
          e52.key,
          e52.value,
          `Feature data expressions are not supported with initial expression part of cluster properties.`
        ),
      ]
  }
  return []
}
function vs(e52) {
  let t2 = e52.value,
    n2 = e52.key,
    r2 = V(t2)
  return r2 === `boolean`
    ? []
    : [new N(n2, t2, `boolean expected, ${r2} found`)]
}
function ys(e52) {
  let t2 = e52.key,
    n2 = e52.value,
    r2 = V(n2)
  return r2 === `string`
    ? z.parse(String(n2))
      ? []
      : [new N(t2, n2, `color expected, "${n2}" found`)]
    : [new N(t2, n2, `color expected, ${r2} found`)]
}
function bs(e52) {
  let t2 = e52.key,
    n2 = e52.value,
    r2 = e52.valueSpec,
    i2 = []
  return (
    Array.isArray(r2.values)
      ? r2.values.indexOf(ds(n2)) === -1 &&
        i2.push(
          new N(
            t2,
            n2,
            `expected one of [${r2.values.join(`, `)}], ${JSON.stringify(n2)} found`
          )
        )
      : Object.keys(r2.values).indexOf(ds(n2)) === -1 &&
        i2.push(
          new N(
            t2,
            n2,
            `expected one of [${Object.keys(r2.values).join(`, `)}], ${JSON.stringify(n2)} found`
          )
        ),
    i2
  )
}
function xs(e52, t2) {
  let n2 = e52
  for (let e53 of t2) n2 = n2[e53]
  return n2
}
function Ss(e52, t2) {
  let n2 = Qo(t2)
  return n2
    ? [
        new N(
          `${e52.key}${n2.path.map(e53 => `[${e53}]`).join(``)}`,
          xs(e52.value, n2.path),
          Xo(n2.legacyFilter),
          null,
          `warning`
        ),
      ]
    : []
}
function Cs(e52) {
  let t2 = fs(e52.value)
  return qo(t2)
    ? [
        ...Ss(e52, t2),
        ..._s(
          ho({}, e52, {
            expressionContext: `filter`,
            valueSpec: {value: `boolean`},
          })
        ),
      ]
    : ws(e52)
}
function ws(e52) {
  let t2 = e52.value,
    n2 = e52.key
  if (V(t2) !== `array`)
    return [new N(n2, t2, `array expected, ${V(t2)} found`)]
  let r2 = e52.styleSpec,
    i2,
    a2 = []
  if (t2.length < 1)
    return [new N(n2, t2, `filter array must have at least 1 element`)]
  switch (
    ((a2 = a2.concat(
      bs({
        key: `${n2}[0]`,
        value: t2[0],
        valueSpec: r2.filter_operator,
        style: e52.style,
        styleSpec: e52.styleSpec,
      })
    )),
    ds(t2[0]))
  ) {
    case `<`:
    case `<=`:
    case `>`:
    case `>=`:
      t2.length >= 2 &&
        ds(t2[1]) === `$type` &&
        a2.push(new N(n2, t2, `"$type" cannot be use with operator "${t2[0]}"`))
    case `==`:
    case `!=`:
      t2.length !== 3 &&
        a2.push(
          new N(
            n2,
            t2,
            `filter array for operator "${t2[0]}" must have 3 elements`
          )
        )
    case `in`:
    case `!in`:
      t2.length >= 2 &&
        ((i2 = V(t2[1])),
        i2 !== `string` &&
          a2.push(new N(`${n2}[1]`, t2[1], `string expected, ${i2} found`)))
      for (let o2 = 2; o2 < t2.length; o2++)
        ((i2 = V(t2[o2])),
          ds(t2[1]) === `$type`
            ? (a2 = a2.concat(
                bs({
                  key: `${n2}[${o2}]`,
                  value: t2[o2],
                  valueSpec: r2.geometry_type,
                  style: e52.style,
                  styleSpec: e52.styleSpec,
                })
              ))
            : i2 !== `string` &&
              i2 !== `number` &&
              i2 !== `boolean` &&
              a2.push(
                new N(
                  `${n2}[${o2}]`,
                  t2[o2],
                  `string, number, or boolean expected, ${i2} found`
                )
              ))
      break
    case `any`:
    case `all`:
    case `none`:
      for (let r3 = 1; r3 < t2.length; r3++)
        a2 = a2.concat(
          ws({
            key: `${n2}[${r3}]`,
            value: t2[r3],
            style: e52.style,
            styleSpec: e52.styleSpec,
          })
        )
      break
    case `has`:
    case `!has`:
      ;((i2 = V(t2[1])),
        t2.length === 2
          ? i2 !== `string` &&
            a2.push(new N(`${n2}[1]`, t2[1], `string expected, ${i2} found`))
          : a2.push(
              new N(
                n2,
                t2,
                `filter array for "${t2[0]}" operator must have 2 elements`
              )
            ))
  }
  return a2
}
function Ts(e52, t2) {
  let n2 = e52.key,
    r2 = e52.validateSpec,
    i2 = e52.style,
    a2 = e52.styleSpec,
    o2 = e52.value,
    s2 = e52.objectKey,
    c2 = a2[`${t2}_${e52.layerType}`]
  if (!c2) return []
  let l2 = s2.match(/^(.*)-transition$/)
  if (t2 === `paint` && l2 && c2[l2[1]] && c2[l2[1]].transition)
    return r2({
      key: n2,
      value: o2,
      valueSpec: a2.transition,
      style: i2,
      styleSpec: a2,
    })
  let u2 = e52.valueSpec || c2[s2]
  if (!u2) return [new N(n2, o2, `unknown property "${s2}"`)]
  let d2
  if (
    V(o2) === `string` &&
    fo(u2) &&
    !u2.tokens &&
    (d2 = /^{([^}]+)}$/.exec(o2))
  )
    return [
      new N(
        n2,
        o2,
        `"${s2}" does not support interpolation syntax
Use an identity property function instead: \`{ "type": "identity", "property": ${JSON.stringify(d2[1])} }\`.`
      ),
    ]
  let f2 = []
  return (
    e52.layerType === `symbol` &&
      s2 === `text-font` &&
      go(fs(o2)) &&
      ds(o2.type) === `identity` &&
      f2.push(new N(n2, o2, `"text-font" does not support identity functions`)),
    f2.concat(
      r2({
        key: e52.key,
        value: o2,
        valueSpec: u2,
        style: i2,
        styleSpec: a2,
        expressionContext: `property`,
        propertyType: t2,
        propertyKey: s2,
      })
    )
  )
}
function Es(e52) {
  return Ts(e52, `paint`)
}
function Ds(e52) {
  return Ts(e52, `layout`)
}
function Os(e52) {
  let t2 = [],
    n2 = e52.value,
    r2 = e52.key,
    i2 = e52.style,
    a2 = e52.styleSpec
  if (V(n2) !== `object`)
    return [new N(r2, n2, `object expected, ${V(n2)} found`)]
  !n2.type &&
    !n2.ref &&
    t2.push(new N(r2, n2, `either "type" or "ref" is required`))
  let o2 = ds(n2.type),
    s2 = ds(n2.ref)
  if (n2.id) {
    let a3 = ds(n2.id)
    for (let o3 = 0; o3 < e52.arrayIndex; o3++) {
      let e53 = i2.layers[o3]
      ds(e53.id) === a3 &&
        t2.push(
          new N(
            r2,
            n2.id,
            `duplicate layer id "${n2.id}", previously used at line ${e53.id.__line__}`
          )
        )
    }
  }
  if (`ref` in n2) {
    ;[`type`, `source`, `source-layer`, `filter`, `layout`].forEach(e54 => {
      e54 in n2 &&
        t2.push(new N(r2, n2[e54], `"${e54}" is prohibited for ref layers`))
    })
    let e53
    ;(i2.layers.forEach(t3 => {
      ds(t3.id) === s2 && (e53 = t3)
    }),
      e53
        ? e53.ref
          ? t2.push(new N(r2, n2.ref, `ref cannot reference another ref layer`))
          : (o2 = ds(e53.type))
        : t2.push(new N(r2, n2.ref, `ref layer "${s2}" not found`)))
  } else if (o2 !== `background`) {
    if (!n2.source) t2.push(new N(r2, n2, `missing required property "source"`))
    else {
      let e53 = i2.sources && i2.sources[n2.source],
        a3 = e53 && ds(e53.type)
      e53
        ? a3 === `vector` && o2 === `raster`
          ? t2.push(
              new N(r2, n2.source, `layer "${n2.id}" requires a raster source`)
            )
          : (a3 !== `raster-dem` && o2 === `hillshade`) ||
              (a3 !== `raster-dem` && o2 === `color-relief`)
            ? t2.push(
                new N(
                  r2,
                  n2.source,
                  `layer "${n2.id}" requires a raster-dem source`
                )
              )
            : a3 === `raster` && o2 !== `raster`
              ? t2.push(
                  new N(
                    r2,
                    n2.source,
                    `layer "${n2.id}" requires a vector source`
                  )
                )
              : a3 === `vector` && !n2[`source-layer`]
                ? t2.push(
                    new N(
                      r2,
                      n2,
                      `layer "${n2.id}" must specify a "source-layer"`
                    )
                  )
                : a3 === `raster-dem` &&
                    o2 !== `hillshade` &&
                    o2 !== `color-relief`
                  ? t2.push(
                      new N(
                        r2,
                        n2.source,
                        `raster-dem source can only be used with layer type 'hillshade' or 'color-relief'.`
                      )
                    )
                  : o2 === `line` &&
                    n2.paint &&
                    n2.paint[`line-gradient`] &&
                    (a3 !== `geojson` || !e53.lineMetrics) &&
                    t2.push(
                      new N(
                        r2,
                        n2,
                        `layer "${n2.id}" specifies a line-gradient, which requires a GeoJSON source with \`lineMetrics\` enabled.`
                      )
                    )
        : t2.push(new N(r2, n2.source, `source "${n2.source}" not found`))
    }
  }
  return (
    o2 === `raster` &&
      n2.paint?.resampling &&
      n2.paint?.[`raster-resampling`] &&
      t2.push(
        new N(
          r2,
          n2.paint,
          `layer "${n2.id}" redundantly specifies "resampling" and "raster-resampling" paint properties, but only one is allowed. It is advised to use "resampling".`
        )
      ),
    (t2 = t2.concat(
      ps({
        key: r2,
        value: n2,
        valueSpec: a2.layer,
        style: e52.style,
        styleSpec: e52.styleSpec,
        validateSpec: e52.validateSpec,
        objectElementValidators: {
          "*"() {
            return []
          },
          type() {
            return e52.validateSpec({
              key: `${r2}.type`,
              value: n2.type,
              valueSpec: a2.layer.type,
              style: e52.style,
              styleSpec: e52.styleSpec,
              validateSpec: e52.validateSpec,
              object: n2,
              objectKey: `type`,
            })
          },
          filter: Cs,
          layout(e53) {
            return ps({
              layer: n2,
              key: e53.key,
              value: e53.value,
              style: e53.style,
              styleSpec: e53.styleSpec,
              validateSpec: e53.validateSpec,
              objectElementValidators: {
                "*"(e54) {
                  return Ds(ho({layerType: o2}, e54))
                },
              },
            })
          },
          paint(e53) {
            return ps({
              layer: n2,
              key: e53.key,
              value: e53.value,
              style: e53.style,
              styleSpec: e53.styleSpec,
              validateSpec: e53.validateSpec,
              objectElementValidators: {
                "*"(e54) {
                  return Es(ho({layerType: o2}, e54))
                },
              },
            })
          },
        },
      })
    )),
    t2
  )
}
function ks(e52) {
  let t2 = e52.value,
    n2 = e52.key,
    r2 = V(t2)
  return r2 === `string` ? [] : [new N(n2, t2, `string expected, ${r2} found`)]
}
function As(e52) {
  let t2 = e52.sourceName ?? ``,
    n2 = e52.value,
    r2 = e52.styleSpec,
    i2 = r2.source_raster_dem,
    a2 = e52.style,
    o2 = [],
    s2 = V(n2)
  if (n2 === void 0) return o2
  if (s2 !== `object`)
    return (
      o2.push(new N(`source_raster_dem`, n2, `object expected, ${s2} found`)),
      o2
    )
  let c2 = ds(n2.encoding) === `custom`,
    l2 = [`redFactor`, `greenFactor`, `blueFactor`, `baseShift`],
    u2 = e52.value.encoding ? `"${e52.value.encoding}"` : `Default`
  for (let s3 in n2)
    !c2 && l2.includes(s3)
      ? o2.push(
          new N(
            s3,
            n2[s3],
            `In "${t2}": "${s3}" is only valid when "encoding" is set to "custom". ${u2} encoding found`
          )
        )
      : i2[s3]
        ? (o2 = o2.concat(
            e52.validateSpec({
              key: s3,
              value: n2[s3],
              valueSpec: i2[s3],
              validateSpec: e52.validateSpec,
              style: a2,
              styleSpec: r2,
            })
          ))
        : o2.push(new N(s3, n2[s3], `unknown property "${s3}"`))
  return o2
}
const js = {promoteId: Ns}
function Ms(e52) {
  let t2 = e52.value,
    n2 = e52.key,
    r2 = e52.styleSpec,
    i2 = e52.style,
    a2 = e52.validateSpec
  if (!t2.type) return [new N(n2, t2, `"type" is required`)]
  let o2 = ds(t2.type),
    s2
  switch (o2) {
    case `vector`:
    case `raster`:
      return (
        (s2 = ps({
          key: n2,
          value: t2,
          valueSpec: r2[`source_${o2.replace(`-`, `_`)}`],
          style: e52.style,
          styleSpec: r2,
          objectElementValidators: js,
          validateSpec: a2,
        })),
        s2
      )
    case `raster-dem`:
      return (
        (s2 = As({
          sourceName: n2,
          value: t2,
          style: e52.style,
          styleSpec: r2,
          validateSpec: a2,
        })),
        s2
      )
    case `geojson`:
      if (
        ((s2 = ps({
          key: n2,
          value: t2,
          valueSpec: r2.source_geojson,
          style: i2,
          styleSpec: r2,
          validateSpec: a2,
          objectElementValidators: js,
        })),
        t2.cluster)
      )
        for (let e53 in t2.clusterProperties) {
          let [r3, i3] = t2.clusterProperties[e53],
            o3 =
              typeof r3 == `string` ? [r3, [`accumulated`], [`get`, e53]] : r3
          ;(s2.push(
            ..._s({
              key: `${n2}.${e53}.map`,
              value: i3,
              validateSpec: a2,
              expressionContext: `cluster-map`,
            })
          ),
            s2.push(
              ..._s({
                key: `${n2}.${e53}.reduce`,
                value: o3,
                validateSpec: a2,
                expressionContext: `cluster-reduce`,
              })
            ))
        }
      return s2
    case `video`:
      return ps({
        key: n2,
        value: t2,
        valueSpec: r2.source_video,
        style: i2,
        validateSpec: a2,
        styleSpec: r2,
      })
    case `image`:
      return ps({
        key: n2,
        value: t2,
        valueSpec: r2.source_image,
        style: i2,
        validateSpec: a2,
        styleSpec: r2,
      })
    case `canvas`:
      return [
        new N(
          n2,
          null,
          `Please use runtime APIs to add canvas sources, rather than including them in stylesheets.`,
          `source.canvas`
        ),
      ]
    default:
      return bs({
        key: `${n2}.type`,
        value: t2.type,
        valueSpec: {
          values: [
            `vector`,
            `raster`,
            `raster-dem`,
            `geojson`,
            `video`,
            `image`,
          ],
        },
        style: i2,
        validateSpec: a2,
        styleSpec: r2,
      })
  }
}
function Ns({key: e52, value: t2}) {
  if (V(t2) === `string`) return ks({key: e52, value: t2})
  {
    let n2 = []
    for (let r2 in t2) n2.push(...ks({key: `${e52}.${r2}`, value: t2[r2]}))
    return n2
  }
}
function Ps(e52) {
  let t2 = e52.value,
    n2 = e52.styleSpec,
    r2 = n2.light,
    i2 = e52.style,
    a2 = [],
    o2 = V(t2)
  if (t2 === void 0) return a2
  if (o2 !== `object`)
    return (
      (a2 = a2.concat([new N(`light`, t2, `object expected, ${o2} found`)])), a2
    )
  for (let o3 in t2) {
    let s2 = o3.match(/^(.*)-transition$/)
    a2 =
      s2 && r2[s2[1]] && r2[s2[1]].transition
        ? a2.concat(
            e52.validateSpec({
              key: o3,
              value: t2[o3],
              valueSpec: n2.transition,
              validateSpec: e52.validateSpec,
              style: i2,
              styleSpec: n2,
            })
          )
        : r2[o3]
          ? a2.concat(
              e52.validateSpec({
                key: o3,
                value: t2[o3],
                valueSpec: r2[o3],
                validateSpec: e52.validateSpec,
                style: i2,
                styleSpec: n2,
              })
            )
          : a2.concat([new N(o3, t2[o3], `unknown property "${o3}"`)])
  }
  return a2
}
function Fs(e52) {
  let t2 = e52.value,
    n2 = e52.styleSpec,
    r2 = n2.sky,
    i2 = e52.style,
    a2 = V(t2)
  if (t2 === void 0) return []
  if (a2 !== `object`) return [new N(`sky`, t2, `object expected, ${a2} found`)]
  let o2 = []
  for (let a3 in t2)
    o2 = r2[a3]
      ? o2.concat(
          e52.validateSpec({
            key: a3,
            value: t2[a3],
            valueSpec: r2[a3],
            style: i2,
            styleSpec: n2,
          })
        )
      : o2.concat([new N(a3, t2[a3], `unknown property "${a3}"`)])
  return o2
}
function Is(e52) {
  let t2 = e52.value,
    n2 = e52.styleSpec,
    r2 = n2.terrain,
    i2 = e52.style,
    a2 = [],
    o2 = V(t2)
  if (t2 === void 0) return a2
  if (o2 !== `object`)
    return (
      (a2 = a2.concat([new N(`terrain`, t2, `object expected, ${o2} found`)])),
      a2
    )
  for (let o3 in t2)
    a2 = r2[o3]
      ? a2.concat(
          e52.validateSpec({
            key: o3,
            value: t2[o3],
            valueSpec: r2[o3],
            validateSpec: e52.validateSpec,
            style: i2,
            styleSpec: n2,
          })
        )
      : a2.concat([new N(o3, t2[o3], `unknown property "${o3}"`)])
  return a2
}
function Ls(e52) {
  return ks(e52).length === 0 ? [] : _s(e52)
}
function Rs(e52) {
  return ks(e52).length === 0 ? [] : _s(e52)
}
function zs(e52) {
  let t2 = e52.key,
    n2 = e52.value
  if (V(n2) === `array`) {
    if (n2.length < 1 || n2.length > 4)
      return [
        new N(
          t2,
          n2,
          `padding requires 1 to 4 values; ${n2.length} values found`
        ),
      ]
    let r2 = {type: `number`},
      i2 = []
    for (let a2 = 0; a2 < n2.length; a2++)
      i2 = i2.concat(
        e52.validateSpec({
          key: `${t2}[${a2}]`,
          value: n2[a2],
          validateSpec: e52.validateSpec,
          valueSpec: r2,
        })
      )
    return i2
  }
  return hs({key: t2, value: n2, valueSpec: {}})
}
function Bs(e52) {
  let t2 = e52.key,
    n2 = e52.value
  if (V(n2) === `array`) {
    let r2 = {type: `number`}
    if (n2.length < 1)
      return [new N(t2, n2, `array length at least 1 expected, length 0 found`)]
    let i2 = []
    for (let a2 = 0; a2 < n2.length; a2++)
      i2 = i2.concat(
        e52.validateSpec({
          key: `${t2}[${a2}]`,
          value: n2[a2],
          validateSpec: e52.validateSpec,
          valueSpec: r2,
        })
      )
    return i2
  }
  return hs({key: t2, value: n2, valueSpec: {}})
}
function Vs(e52) {
  let t2 = e52.key,
    n2 = e52.value
  if (V(n2) === `array`) {
    if (n2.length < 1)
      return [new N(t2, n2, `array length at least 1 expected, length 0 found`)]
    let e53 = []
    for (let r2 = 0; r2 < n2.length; r2++)
      e53 = e53.concat(ys({key: `${t2}[${r2}]`, value: n2[r2], valueSpec: {}}))
    return e53
  }
  return ys({key: t2, value: n2, valueSpec: {}})
}
function Hs(e52) {
  let t2 = e52.key,
    n2 = e52.value,
    r2 = V(n2),
    i2 = e52.styleSpec
  if (r2 !== `array` || n2.length < 1 || n2.length % 2 != 0)
    return [
      new N(
        t2,
        n2,
        `variableAnchorOffsetCollection requires a non-empty array of even length`
      ),
    ]
  let a2 = []
  for (let r3 = 0; r3 < n2.length; r3 += 2)
    ((a2 = a2.concat(
      bs({
        key: `${t2}[${r3}]`,
        value: n2[r3],
        valueSpec: i2.layout_symbol[`text-anchor`],
      })
    )),
      (a2 = a2.concat(
        ms({
          key: `${t2}[${r3 + 1}]`,
          value: n2[r3 + 1],
          valueSpec: {length: 2, value: `number`},
          validateSpec: e52.validateSpec,
          style: e52.style,
          styleSpec: i2,
        })
      )))
  return a2
}
function Us(e52) {
  let t2 = [],
    n2 = e52.value,
    r2 = e52.key
  if (Array.isArray(n2)) {
    let i2 = [],
      a2 = []
    for (let o2 in n2)
      (n2[o2].id &&
        i2.includes(n2[o2].id) &&
        t2.push(
          new N(
            r2,
            n2,
            `all the sprites' ids must be unique, but ${n2[o2].id} is duplicated`
          )
        ),
        i2.push(n2[o2].id),
        n2[o2].url &&
          a2.includes(n2[o2].url) &&
          t2.push(
            new N(
              r2,
              n2,
              `all the sprites' URLs must be unique, but ${n2[o2].url} is duplicated`
            )
          ),
        a2.push(n2[o2].url),
        (t2 = t2.concat(
          ps({
            key: `${r2}[${o2}]`,
            value: n2[o2],
            valueSpec: {
              id: {type: `string`, required: true},
              url: {type: `string`, required: true},
            },
            validateSpec: e52.validateSpec,
          })
        )))
    return t2
  }
  return ks({key: r2, value: n2})
}
function Ws(e52) {
  let t2 = e52.value,
    n2 = e52.styleSpec,
    r2 = n2.projection,
    i2 = e52.style,
    a2 = V(t2)
  if (t2 === void 0) return []
  if (a2 !== `object`)
    return [new N(`projection`, t2, `object expected, ${a2} found`)]
  let o2 = []
  for (let a3 in t2)
    o2 = r2[a3]
      ? o2.concat(
          e52.validateSpec({
            key: a3,
            value: t2[a3],
            valueSpec: r2[a3],
            style: i2,
            styleSpec: n2,
          })
        )
      : o2.concat([new N(a3, t2[a3], `unknown property "${a3}"`)])
  return o2
}
function Gs(e52) {
  let t2 = e52.key,
    n2 = e52.value
  n2 = n2 instanceof String ? n2.valueOf() : n2
  let r2 = V(n2)
  return r2 === `array` && !qs(n2) && !Ks(n2)
    ? [
        new N(
          t2,
          n2,
          `projection expected, invalid array ${JSON.stringify(n2)} found`
        ),
      ]
    : [`array`, `string`].includes(r2)
      ? []
      : [new N(t2, n2, `projection expected, invalid type "${r2}" found`)]
}
function Ks(e52) {
  return !![`interpolate`, `step`, `literal`].includes(e52[0])
}
function qs(e52) {
  return (
    Array.isArray(e52) &&
    e52.length === 3 &&
    typeof e52[0] == `string` &&
    typeof e52[1] == `string` &&
    typeof e52[2] == `number`
  )
}
function Js(e52) {
  return !!e52 && e52.constructor === Object
}
function Ys(e52) {
  return Js(e52.value)
    ? []
    : [new N(e52.key, e52.value, `object expected, ${V(e52.value)} found`)]
}
const Xs = 1114111,
  Zs = /^u\+(?:([0-9a-f]{1,6})(?:-([0-9a-f]{1,6}))?|([0-9a-f]{0,5}\?{1,6}))$/i
function Qs(e52, t2) {
  if (V(t2) !== `string`) return []
  let n2 = `${t2}`,
    r2 = () => [
      new N(
        e52,
        t2,
        `invalid unicode range, expected a value such as "U+26", "U+0-10FFFF" or "U+4??"`
      ),
    ],
    i2 = n2.match(Zs)
  if (!i2) return r2()
  let [, a2, o2, s2] = i2
  if (s2 !== void 0) return s2.length > 6 ? r2() : []
  let c2 = parseInt(a2, 16),
    l2 = o2 === void 0 ? c2 : parseInt(o2, 16)
  return c2 > Xs || l2 > Xs
    ? [
        new N(
          e52,
          t2,
          `unicode range is out of bounds, the maximum code point is U+10FFFF`
        ),
      ]
    : c2 > l2
      ? [
          new N(
            e52,
            t2,
            `unicode range start must not be greater than its end, but ${n2} is`
          ),
        ]
      : []
}
function $s(e52) {
  let t2 = e52.key ?? `font-faces`,
    n2 = e52.value,
    r2 = e52.validateSpec,
    i2 = e52.styleSpec ?? Rn,
    a2 = e52.style
  if (!Js(n2)) return [new N(t2, n2, `object expected, ${V(n2)} found`)]
  let o2 = []
  for (let e53 in n2) {
    let s2 = n2[e53],
      c2 = V(s2)
    if (c2 === `string`) o2.push(...ks({key: `${t2}.${e53}`, value: s2}))
    else if (c2 === `array`) {
      let n3 = {
        url: {type: `string`, required: true},
        "unicode-range": {type: `array`, value: `string`},
      }
      for (let [c3, l2] of s2.entries()) {
        let s3 = `${t2}.${e53}[${c3}]`
        o2.push(
          ...ps({
            key: s3,
            value: l2,
            valueSpec: n3,
            styleSpec: i2,
            style: a2,
            validateSpec: r2,
          })
        )
        let u2 = Js(l2) ? l2[`unicode-range`] : void 0
        if (V(u2) === `array`)
          for (let [e54, t3] of u2.entries())
            o2.push(...Qs(`${s3}.unicode-range[${e54}]`, t3))
      }
    } else
      o2.push(
        new N(`${t2}.${e53}`, s2, `string or array expected, ${c2} found`)
      )
  }
  return o2
}
const ec = {
  "*"() {
    return []
  },
  array: ms,
  boolean: vs,
  number: hs,
  color: ys,
  constants: us,
  enum: bs,
  filter: Cs,
  function: gs,
  layer: Os,
  object: ps,
  source: Ms,
  light: Ps,
  sky: Fs,
  terrain: Is,
  projection: Ws,
  projectionDefinition: Gs,
  string: ks,
  formatted: Ls,
  resolvedImage: Rs,
  padding: zs,
  numberArray: Bs,
  colorArray: Vs,
  variableAnchorOffsetCollection: Hs,
  sprite: Us,
  state: Ys,
  fontFaces: $s,
}
function tc(e52) {
  let t2 = e52.value,
    n2 = e52.valueSpec,
    r2 = e52.styleSpec
  return (
    (e52.validateSpec = tc),
    n2.expression && go(ds(t2))
      ? gs(e52)
      : n2.expression && Mo(fs(t2))
        ? _s(e52)
        : n2.type && ec[n2.type]
          ? ec[n2.type](e52)
          : ps(ho({}, e52, {valueSpec: n2.type ? r2[n2.type] : n2}))
  )
}
function nc(e52) {
  let t2 = e52.value,
    n2 = e52.key,
    r2 = ks(e52)
  return r2.length
    ? r2
    : (t2.indexOf(`{fontstack}`) === -1 &&
        r2.push(
          new N(n2, t2, `"glyphs" url must include a "{fontstack}" token`)
        ),
      t2.indexOf(`{range}`) === -1 &&
        r2.push(new N(n2, t2, `"glyphs" url must include a "{range}" token`)),
      r2)
}
function rc(e52, t2 = M) {
  let n2 = []
  return (
    (n2 = n2.concat(
      tc({
        key: ``,
        value: e52,
        valueSpec: t2.$root,
        styleSpec: t2,
        style: e52,
        validateSpec: tc,
        objectElementValidators: {
          glyphs: nc,
          "*"() {
            return []
          },
        },
      })
    )),
    e52.constants &&
      (n2 = n2.concat(
        us({
          key: `constants`,
          value: e52.constants,
          style: e52,
          styleSpec: t2,
          validateSpec: tc,
        })
      )),
    ac(n2)
  )
}
;((rc.source = oc(ic(Ms))),
  (rc.sprite = oc(ic(Us))),
  (rc.glyphs = oc(ic(nc))),
  (rc.fontFaces = oc(ic($s))),
  (rc.light = oc(ic(Ps))),
  (rc.sky = oc(ic(Fs))),
  (rc.terrain = oc(ic(Is))),
  (rc.state = oc(ic(Ys))),
  (rc.layer = oc(ic(Os))),
  (rc.filter = oc(ic(Cs))),
  (rc.paintProperty = oc(ic(Es))),
  (rc.layoutProperty = oc(ic(Ds))))
function ic(e52) {
  return function (t2) {
    return e52(Object.assign({}, t2, {validateSpec: tc}))
  }
}
function ac(e52) {
  return [].concat(e52).sort((e53, t2) => e53.line - t2.line)
}
function oc(e52) {
  return function (...t2) {
    return ac(e52.apply(this, t2))
  }
}
const sc = {
  type: `enum`,
  "property-type": `data-constant`,
  expression: {interpolated: false, parameters: [`global-state`]},
  values: {visible: {}, none: {}},
  transition: false,
  default: `visible`,
}
var cc = class {
  constructor(e52, t2, n2) {
    ;((this._rootKey = t2), (this._globalState = n2), this.setValue(e52))
  }
  evaluate() {
    return this._literalValue ?? this._compiledValue.evaluate({})
  }
  setValue(e52) {
    if (e52 == null || e52 === `visible` || e52 === `none`) {
      ;((this._literalValue = e52 === `none` ? `none` : `visible`),
        (this._compiledValue = void 0),
        (this._globalStateRefs = /* @__PURE__ */ new Set()))
      return
    }
    let t2 = No(e52, this._rootKey, sc, this._globalState)
    if (t2.result === `error`)
      throw (
        (this._literalValue = `visible`),
        (this._compiledValue = void 0),
        Error(t2.value.map(e53 => `${e53.key}: ${e53.message}`).join(`, `))
      )
    ;((this._literalValue = void 0),
      (this._compiledValue = t2.value),
      (this._globalStateRefs = Vo(t2.value.expression)))
  }
  getGlobalStateRefs() {
    return this._globalStateRefs
  }
}
function lc(e52, t2, n2) {
  return new cc(e52, t2, n2)
}
const uc = rc,
  dc = new Set(
    Object.keys(M)
      .filter(e52 => e52.startsWith(`source_`))
      .map(e52 => e52.slice(7).replaceAll(`_`, `-`))
  )
function fc(e52) {
  return Object.entries(e52.sources ?? {})
    .filter(([, e53]) => !dc.has(e53.type))
    .map(([e53]) => `sources.${e53}`)
}
function pc(e52, t2) {
  let n2 = fc(t2)
  return mc(
    e52,
    uc(t2).filter(
      ({message: e53}) =>
        !n2.some(t3 => e53.startsWith(`${t3}:`) || e53.startsWith(`${t3}.`))
    )
  )
}
function mc(e52, t2) {
  let n2 = false
  for (let r2 of t2) {
    if (r2.severity === `warning`) {
      It(r2.message)
      continue
    }
    ;(e52.fire(new In(Error(r2.message))), (n2 = true))
  }
  return n2
}
function hc(e52, t2, n2, r2) {
  return r2?.validate !== false && mc(e52, t2({styleSpec: M, ...n2}))
}
var gc = class e37 {
  constructor(e52, t2, n2) {
    let r2 = (this.cells = [])
    if (e52 instanceof ArrayBuffer) {
      this.arrayBuffer = e52
      let i3 = new Int32Array(this.arrayBuffer)
      ;((e52 = i3[0]), (t2 = i3[1]), (n2 = i3[2]), (this.d = t2 + 2 * n2))
      for (let e53 = 0; e53 < this.d * this.d; e53++) {
        let t3 = i3[3 + e53],
          n3 = i3[3 + e53 + 1]
        r2.push(t3 === n3 ? null : i3.subarray(t3, n3))
      }
      let a2 = i3[3 + r2.length],
        o2 = i3[3 + r2.length + 1]
      ;((this.keys = i3.subarray(a2, o2)),
        (this.bboxes = i3.subarray(o2)),
        (this.insert = this._insertReadonly))
    } else {
      this.d = t2 + 2 * n2
      for (let e53 = 0; e53 < this.d * this.d; e53++) r2.push([])
      ;((this.keys = []), (this.bboxes = []))
    }
    ;((this.n = t2),
      (this.extent = e52),
      (this.padding = n2),
      (this.scale = t2 / e52),
      (this.uid = 0))
    let i2 = (n2 / t2) * e52
    ;((this.min = -i2), (this.max = e52 + i2))
  }
  insert(e52, t2, n2, r2, i2) {
    ;(this._forEachCell(
      t2,
      n2,
      r2,
      i2,
      this._insertCell,
      this.uid++,
      void 0,
      void 0
    ),
      this.keys.push(e52),
      this.bboxes.push(t2),
      this.bboxes.push(n2),
      this.bboxes.push(r2),
      this.bboxes.push(i2))
  }
  _insertReadonly() {
    throw Error(`Cannot insert into a GridIndex created from an ArrayBuffer.`)
  }
  _insertCell(e52, t2, n2, r2, i2, a2) {
    this.cells[i2].push(a2)
  }
  query(e52, t2, n2, r2, i2) {
    let a2 = this.min,
      o2 = this.max
    if (e52 <= a2 && t2 <= a2 && o2 <= n2 && o2 <= r2 && !i2)
      return [...this.keys]
    {
      let a3 = []
      return (
        this._forEachCell(e52, t2, n2, r2, this._queryCell, a3, {}, i2), a3
      )
    }
  }
  _queryCell(e52, t2, n2, r2, i2, a2, o2, s2) {
    let c2 = this.cells[i2]
    if (c2 !== null) {
      let i3 = this.keys,
        l2 = this.bboxes
      for (let u2 of c2)
        if (o2[u2] === void 0) {
          let c3 = u2 * 4
          ;(
            s2
              ? s2(l2[c3 + 0], l2[c3 + 1], l2[c3 + 2], l2[c3 + 3])
              : e52 <= l2[c3 + 2] &&
                t2 <= l2[c3 + 3] &&
                n2 >= l2[c3 + 0] &&
                r2 >= l2[c3 + 1]
          )
            ? ((o2[u2] = true), a2.push(i3[u2]))
            : (o2[u2] = false)
        }
    }
  }
  _forEachCell(e52, t2, n2, r2, i2, a2, o2, s2) {
    let c2 = this._convertToCellCoord(e52),
      l2 = this._convertToCellCoord(t2),
      u2 = this._convertToCellCoord(n2),
      d2 = this._convertToCellCoord(r2)
    for (let f2 = c2; f2 <= u2; f2++)
      for (let c3 = l2; c3 <= d2; c3++) {
        let l3 = this.d * c3 + f2
        if (
          !(
            s2 &&
            !s2(
              this._convertFromCellCoord(f2),
              this._convertFromCellCoord(c3),
              this._convertFromCellCoord(f2 + 1),
              this._convertFromCellCoord(c3 + 1)
            )
          ) &&
          i2.call(this, e52, t2, n2, r2, l3, a2, o2, s2)
        )
          return
      }
  }
  _convertFromCellCoord(e52) {
    return (e52 - this.padding) / this.scale
  }
  _convertToCellCoord(e52) {
    return Math.max(
      0,
      Math.min(this.d - 1, Math.floor(e52 * this.scale) + this.padding)
    )
  }
  toArrayBuffer() {
    if (this.arrayBuffer) return this.arrayBuffer
    let e52 = this.cells,
      t2 = 3 + this.cells.length + 1 + 1,
      n2 = 0
    for (let e53 of this.cells) n2 += e53.length
    let r2 = new Int32Array(t2 + n2 + this.keys.length + this.bboxes.length)
    ;((r2[0] = this.extent), (r2[1] = this.n), (r2[2] = this.padding))
    let i2 = t2
    for (let t3 = 0; t3 < e52.length; t3++) {
      let n3 = e52[t3]
      ;((r2[3 + t3] = i2), r2.set(n3, i2), (i2 += n3.length))
    }
    return (
      (r2[3 + e52.length] = i2),
      r2.set(this.keys, i2),
      (i2 += this.keys.length),
      (r2[3 + e52.length + 1] = i2),
      r2.set(this.bboxes, i2),
      (i2 += this.bboxes.length),
      r2.buffer
    )
  }
  static serialize(e52, t2) {
    let n2 = e52.toArrayBuffer()
    return (t2 && t2.push(n2), {buffer: n2})
  }
  static deserialize(t2) {
    return new e37(t2.buffer)
  }
}
const _c = {}
function H(e52, t2, n2 = {}) {
  if (_c[e52]) throw Error(`${e52} is already registered.`)
  ;(Object.defineProperty(t2, "_classRegistryKey", {
    value: e52,
    writeable: false,
  }),
    (_c[e52] = {klass: t2, omit: n2.omit || [], shallow: n2.shallow || []}))
}
;(H(`Object`, Object),
  H(`Set`, Set),
  H(`TransferableGridIndex`, gc),
  H(`Color`, z),
  H(`Error`, Error),
  H(`AJAXError`, Cn),
  H(`ResolvedImage`, Br),
  H(`StylePropertyFunction`, Ro),
  H(`StyleExpression`, ko, {omit: [`_evaluator`]}),
  H(`ZoomDependentExpression`, Fo),
  H(`ZoomConstantExpression`, Po),
  H(`CompoundExpression`, eo, {omit: [`_evaluate`]}))
for (let e52 in Xa) Xa[e52]._classRegistryKey || H(`Expression_${e52}`, Xa[e52])
function vc(e52) {
  return (
    e52 &&
    typeof ArrayBuffer < `u` &&
    (e52 instanceof ArrayBuffer || e52.constructor?.name === `ArrayBuffer`)
  )
}
function yc(e52) {
  let t2 = e52.constructor
  return e52.$name || t2._classRegistryKey
}
function bc(e52) {
  if (typeof e52 != `object` || !e52) return false
  let t2 = yc(e52)
  return t2 && t2 !== `Object`
}
function xc(e52) {
  return (
    !bc(e52) &&
    (e52 == null ||
      typeof e52 == `boolean` ||
      typeof e52 == `number` ||
      typeof e52 == `string` ||
      e52 instanceof Boolean ||
      e52 instanceof Number ||
      e52 instanceof String ||
      e52 instanceof Date ||
      e52 instanceof RegExp ||
      e52 instanceof Blob ||
      e52 instanceof Error ||
      vc(e52) ||
      Wt(e52) ||
      ArrayBuffer.isView(e52) ||
      e52 instanceof ImageData)
  )
}
function Sc(e52, t2) {
  if (xc(e52))
    return (
      (vc(e52) || Wt(e52)) && t2 && t2.push(e52),
      ArrayBuffer.isView(e52) && t2 && t2.push(e52.buffer),
      e52 instanceof ImageData && t2 && t2.push(e52.data.buffer),
      e52
    )
  if (Array.isArray(e52)) {
    let n3 = []
    for (let r3 of e52) n3.push(Sc(r3, t2))
    return n3
  }
  if (typeof e52 != `object`)
    throw Error(`can't serialize object of type ${typeof e52}`)
  let n2 = yc(e52)
  if (!n2)
    throw Error(
      `can't serialize object of unregistered class ${e52.constructor.name}`
    )
  if (!_c[n2]) throw Error(`${n2} is not registered.`)
  let {klass: r2} = _c[n2],
    i2 = r2.serialize ? r2.serialize(e52, t2) : {}
  if (!r2.serialize) {
    for (let r3 in e52) {
      if (!e52.hasOwnProperty(r3) || _c[n2].omit.includes(r3)) continue
      let a2 = e52[r3]
      a2 !== void 0 && (i2[r3] = _c[n2].shallow.includes(r3) ? a2 : Sc(a2, t2))
    }
    e52 instanceof Error && (i2.message = e52.message)
  } else if (i2 === t2?.[t2.length - 1])
    throw Error(
      `statically serialized object won't survive transfer of $name property`
    )
  if (i2.$name)
    throw Error(`$name property is reserved for worker serialization logic.`)
  return (n2 !== `Object` && (i2.$name = n2), i2)
}
function Cc(e52) {
  if (xc(e52)) return e52
  if (Array.isArray(e52)) return e52.map(Cc)
  if (typeof e52 != `object`)
    throw Error(`can't deserialize object of type ${typeof e52}`)
  let t2 = yc(e52) || `Object`
  if (!_c[t2]) throw Error(`can't deserialize unregistered class ${t2}`)
  let {klass: n2} = _c[t2]
  if (!n2) throw Error(`can't deserialize unregistered class ${t2}`)
  if (n2.deserialize) return n2.deserialize(e52)
  let r2 = Object.create(n2.prototype)
  for (let n3 of Object.keys(e52)) {
    if (n3 === `$name`) continue
    let i2 = e52[n3]
    r2[n3] = _c[t2].shallow.includes(n3) ? i2 : Cc(i2)
  }
  return r2
}
var wc = class {
  constructor() {
    this.first = true
  }
  update(e52, t2) {
    let n2 = Math.floor(e52)
    return this.first
      ? ((this.first = false),
        (this.lastIntegerZoom = n2),
        (this.lastIntegerZoomTime = 0),
        (this.lastZoom = e52),
        (this.lastFloorZoom = n2),
        true)
      : (this.lastFloorZoom > n2
          ? ((this.lastIntegerZoom = n2 + 1), (this.lastIntegerZoomTime = t2))
          : this.lastFloorZoom < n2 &&
            ((this.lastIntegerZoom = n2), (this.lastIntegerZoomTime = t2)),
        e52 !== this.lastZoom &&
          ((this.lastZoom = e52), (this.lastFloorZoom = n2), true))
  }
}
function Tc(e52) {
  return /[\u02EA\u02EB\u1100-\u11FF\u2E80-\u2FDF\u3000-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFE10-\uFE1F\uFE30-\uFE4F\uFF00-\uFFEF]|\uD81B[\uDFE0-\uDFFF]|[\uD81C-\uD822\uD840-\uD868\uD86A-\uD86D\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD88C][\uDC00-\uDFFF]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD1E\uDD80-\uDDF2]|\uD82B[\uDFF0-\uDFFF]|\uD82C[\uDC00-\uDEFB]|\uD83C[\uDE00-\uDEFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEAD\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD88D[\uDC00-\uDC79]/gim.test(
    String.fromCodePoint(e52)
  )
}
function Ec(e52) {
  return /[\u02EA\u02EB\u2E80-\u2FDF\u2FF0-\u303F\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FD-\u30FF\u3105-\u312F\u31A0-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uF900-\uFA6D\uFA70-\uFAD9\uFE10-\uFE1F\uFE30-\uFE4F\uFF00-\uFFEF]|\uD81B[\uDFE0-\uDFFF]|[\uD81C-\uD822\uD840-\uD868\uD86A-\uD86D\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD88C][\uDC00-\uDFFF]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD1E\uDD80-\uDDF2]|\uD82B[\uDFF0-\uDFFF]|\uD82C[\uDC00-\uDEFB]|\uD83C[\uDE00-\uDEFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEAD\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD88D[\uDC00-\uDC79]/gim.test(
    String.fromCodePoint(e52)
  )
}
function Dc(e52) {
  return /[\u02EA\u02EB\u1100-\u11FF\u1400-\u167F\u18B0-\u18F5\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u3007\u3012\u3013\u3020-\u302F\u3031-\u303F\u3041-\u3096\u309D-\u30FB\u30FD-\u30FF\u3105-\u312F\u3131-\u318E\u3190-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFE10-\uFE1F\uFE30-\uFE48\uFE50-\uFE57\uFE5F-\uFE62\uFE67-\uFE6F\uFF00-\uFF07\uFF0A-\uFF0C\uFF0E-\uFF19\uFF1F-\uFF3A\uFF3C\uFF3E\uFF40-\uFF5A\uFFE0-\uFFE2\uFFE4-\uFFE7]|\uD802[\uDD80-\uDD9F]|\uD805[\uDD80-\uDDFF]|\uD806[\uDE00-\uDEBF]|\uD811[\uDC00-\uDE7F]|\uD81B[\uDFE0-\uDFE4\uDFF0-\uDFF6]|[\uD81C-\uD822\uD83D\uD840-\uD868\uD86A-\uD86D\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD88C][\uDC00-\uDFFF]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD1E\uDD80-\uDDF2]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD30-\uDEFB]|\uD833[\uDEC0-\uDFCF]|\uD834[\uDC00-\uDDFF\uDEE0-\uDF7F]|\uD836[\uDC00-\uDEAF]|\uD83C[\uDC00-\uDE00\uDF00-\uDFFF]|\uD83E[\uDD00-\uDEFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEAD\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD88D[\uDC00-\uDC79]/gim.test(
    String.fromCodePoint(e52)
  )
}
function Oc(e52) {
  return /[\xA7\xA9\xAE\xB1\xBC-\xBE\xD7\xF7\u2016\u2020\u2021\u2030\u2031\u203B\u203C\u2042\u2047-\u2049\u2051\u2100-\u218F\u221E\u2234\u2235\u2300-\u2307\u230C-\u231F\u2324-\u2328\u232B\u237D-\u239A\u23BE-\u23CD\u23CF\u23D1-\u23DB\u23E2-\u2422\u2424-\u24FF\u25A0-\u2619\u2620-\u2767\u2776-\u2793\u2B12-\u2B2F\u2B50-\u2B59\u2BB8-\u2BEB\u3000-\u303F\u30A0-\u30FF\uE000-\uF8FF\uFE30-\uFE6F\uFF00-\uFFEF\uFFFC\uFFFD]|[\uDB80-\uDBFF][\uDC00-\uDFFF]/gim.test(
    String.fromCodePoint(e52)
  )
}
function kc(e52) {
  return /[\u0900-\u0DFF\u0F00-\u109F\u1780-\u17FF]/gim.test(
    String.fromCodePoint(e52)
  )
}
function Ac(e52) {
  return /[\r\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0600-\u0605\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DD\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u070F\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0890\u0891\u0897-\u089F\u08CA-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D62\u0D63\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E33-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB3-\u0EBC\u0EC8-\u0ECE\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1037\u1039-\u103E\u1056-\u1059\u105E-\u1060\u1071-\u1074\u1082\u1084-\u1086\u108D\u109D\u1100-\u11FF\u135D-\u135F\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u180F\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60\u1A62\u1A65-\u1A7C\u1A7F\u1AB0-\u1ADD\u1AE0-\u1AEB\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA960-\uA97C\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFF9E\uFF9F]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD803[\uDD24-\uDD27\uDD69-\uDD6D\uDEAB\uDEAC\uDEFA-\uDEFF\uDF46-\uDF50\uDF82-\uDF85]|\uD804[\uDC00-\uDC02\uDC38-\uDC46\uDC70\uDC73\uDC74\uDC7F-\uDC82\uDCB0-\uDCBA\uDCBD\uDCC2\uDCCD\uDD00-\uDD02\uDD27-\uDD34\uDD45\uDD46\uDD73\uDD80-\uDD82\uDDB3-\uDDC0\uDDC2\uDDC3\uDDC9-\uDDCC\uDDCE\uDDCF\uDE2C-\uDE37\uDE3E\uDE41\uDEDF-\uDEEA\uDF00-\uDF03\uDF3B\uDF3C\uDF3E-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF62\uDF63\uDF66-\uDF6C\uDF70-\uDF74\uDFB8-\uDFC0\uDFC2\uDFC5\uDFC7-\uDFCA\uDFCC-\uDFD2\uDFE1\uDFE2]|\uD805[\uDC35-\uDC46\uDC5E\uDCB0-\uDCC3\uDDAF-\uDDB5\uDDB8-\uDDC0\uDDDC\uDDDD\uDE30-\uDE40\uDEAB-\uDEB7\uDF1D-\uDF1F\uDF22-\uDF2B]|\uD806[\uDC2C-\uDC3A\uDD30-\uDD35\uDD37\uDD38\uDD3B-\uDD43\uDDD1-\uDDD7\uDDDA-\uDDE0\uDDE4\uDE01-\uDE0A\uDE33-\uDE39\uDE3B-\uDE3E\uDE47\uDE51-\uDE5B\uDE84-\uDE99\uDF60-\uDF67]|\uD807[\uDC2F-\uDC36\uDC38-\uDC3F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD31-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD8A-\uDD8E\uDD90\uDD91\uDD93-\uDD97\uDEF3-\uDEF6\uDF00-\uDF03\uDF34-\uDF3A\uDF3E-\uDF42\uDF5A]|\uD80D[\uDC40\uDC47-\uDC55]|\uD818[\uDD1E-\uDD2F]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDD63\uDD67-\uDD6A\uDF4F\uDF51-\uDF87\uDF8F-\uDF92\uDFE4\uDFF0\uDFF1]|\uD82F[\uDC9D\uDC9E]|\uD833[\uDF00-\uDF2D\uDF30-\uDF46]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDC8F\uDD30-\uDD36\uDEAE\uDEEC-\uDEEF]|\uD839[\uDCEC-\uDCEF\uDDEE\uDDEF\uDEE3\uDEE6\uDEEE\uDEEF\uDEF5]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uD83C[\uDDE6-\uDDFF\uDFFB-\uDFFF]|\uDB40[\uDC20-\uDC7F\uDD00-\uDDEF]/.test(
    e52
  )
}
function jc(e52) {
  return /[\u0E01-\u0E3A\u0E40-\u0E5B\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECE\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00-\u0F47\u0F49-\u0F6C\u0F71-\u0F97\u0F99-\u0FBC\u0FBE-\u0FCC\u0FCE-\u0FD4\u0FD9\u0FDA\u1000-\u109F\u1780-\u17DD\u17E0-\u17E9\u17F0-\u17F9\u19E0-\u19FF\u1B00-\u1B4C\u1B4E-\u1B7F\uA980-\uA9CD\uA9D0-\uA9D9\uA9DE-\uA9FE\uAA60-\uAA7F]|\uD805[\uDED0-\uDEE3]/gim.test(
    String.fromCodePoint(e52)
  )
}
function Mc(e52, t2) {
  return (
    /(?:[\u1039\u17D2\u1A60\u1BAB\u200D\uAAF6]|\uD802\uDE3F|\uD804[\uDD33\uDFD0]|\uD806[\uDD3E\uDE47\uDE99]|\uD807[\uDD45\uDD97\uDF42])$/.test(
      e52
    ) || /^\p{gc=Mc}/u.test(t2)
  )
}
function Nc(e52) {
  return /\s/u.test(String.fromCodePoint(e52))
}
function Pc(e52) {
  for (let t2 of e52) if (Dc(t2.codePointAt(0))) return true
  return false
}
function Fc(e52) {
  for (let t2 of e52) if (!Rc(t2.codePointAt(0))) return false
  return true
}
function Ic(e52) {
  let t2 = e52
    .map(e53 => {
      try {
        return RegExp(`\\p{sc=${e53}}`, `u`).source
      } catch {
        return null
      }
    })
    .filter(e53 => e53)
  return new RegExp(t2.join(`|`), `u`)
}
const Lc = Ic([`Arab`, `Dupl`, `Mong`, `Ougr`, `Syrc`])
function Rc(e52) {
  return !Lc.test(String.fromCodePoint(e52))
}
function zc(e52) {
  return !(Dc(e52) || Oc(e52))
}
function Bc(e52) {
  return /\p{sc=Arab}/u.test(String.fromCodePoint(e52))
}
const Vc = Ic(
  `Adlm.Arab.Armi.Avst.Chrs.Cprt.Egyp.Elym.Gara.Hatr.Hebr.Hung.Khar.Lydi.Mand.Mani.Mend.Merc.Mero.Narb.Nbat.Nkoo.Orkh.Palm.Phli.Phlp.Phnx.Prti.Rohg.Samr.Sarb.Sogo.Syrc.Thaa.Todr.Yezi`.split(
    `.`
  )
)
function Hc(e52) {
  return Vc.test(String.fromCodePoint(e52))
}
function Uc(e52, t2) {
  return !t2 && Hc(e52) ? false : !kc(e52)
}
function Wc(e52) {
  for (let t2 of e52) if (Hc(t2.codePointAt(0))) return true
  return false
}
function Gc(e52, t2) {
  for (let n2 of e52) if (!Uc(n2.codePointAt(0), t2)) return false
  return true
}
const Kc = new (class {
  constructor() {
    ;((this.TIMEOUT = 5e3),
      (this.applyArabicShaping = null),
      (this.processBidirectionalText = null),
      (this.processStyledBidirectionalText = null),
      (this.pluginStatus = `unavailable`),
      (this.pluginURL = null),
      (this.loadScriptResolve = () => {}))
  }
  setState(e52) {
    ;((this.pluginStatus = e52.pluginStatus), (this.pluginURL = e52.pluginURL))
  }
  getState() {
    return {pluginStatus: this.pluginStatus, pluginURL: this.pluginURL}
  }
  setMethods(e52) {
    if (Kc.isParsed()) throw Error(`RTL text plugin already registered.`)
    ;((this.applyArabicShaping = e52.applyArabicShaping),
      (this.processBidirectionalText = e52.processBidirectionalText),
      (this.processStyledBidirectionalText =
        e52.processStyledBidirectionalText),
      this.loadScriptResolve())
  }
  isParsed() {
    return (
      this.applyArabicShaping != null &&
      this.processBidirectionalText != null &&
      this.processStyledBidirectionalText != null
    )
  }
  getRTLTextPluginStatus() {
    return this.pluginStatus
  }
  async syncState(e52, t2) {
    if (this.isParsed()) return this.getState()
    if (e52.pluginStatus !== `loading`) return (this.setState(e52), e52)
    let n2 = e52.pluginURL,
      r2 = new Promise(e53 => {
        this.loadScriptResolve = e53
      }),
      i2 = new Promise(e53 => setTimeout(() => e53(), this.TIMEOUT))
    if ((await t2(n2), await Promise.race([r2, i2]), this.isParsed())) {
      let e53 = {pluginStatus: `loaded`, pluginURL: n2}
      return (this.setState(e53), e53)
    }
    throw (
      this.setState({pluginStatus: `error`, pluginURL: ``}),
      Error(`RTL Text Plugin failed to import scripts from ${n2}`)
    )
  }
})()
var U = class {
  constructor(e52, t2) {
    ;((this.isSupportedScript = qc),
      (this.zoom = e52),
      t2
        ? ((this.now = t2.now || 0),
          (this.fadeDuration = t2.fadeDuration || 0),
          (this.zoomHistory = t2.zoomHistory || new wc()),
          (this.transition = t2.transition || {}))
        : ((this.now = 0),
          (this.fadeDuration = 0),
          (this.zoomHistory = new wc()),
          (this.transition = {})))
  }
  crossFadingFactor() {
    return this.fadeDuration === 0
      ? 1
      : Math.min(
          (this.now - this.zoomHistory.lastIntegerZoomTime) / this.fadeDuration,
          1
        )
  }
  getCrossfadeParameters() {
    let e52 = this.zoom,
      t2 = e52 - Math.floor(e52),
      n2 = this.crossFadingFactor()
    return e52 > this.zoomHistory.lastIntegerZoom
      ? {fromScale: 2, toScale: 1, t: t2 + (1 - t2) * n2}
      : {fromScale: 0.5, toScale: 1, t: 1 - (1 - n2) * t2}
  }
}
function qc(e52) {
  return Gc(e52, Kc.getRTLTextPluginStatus() === `loaded`)
}
const Jc = `-transition`
var Yc = class {
    constructor(e52, t2, n2, r2) {
      ;((this.property = e52),
        (this.value = t2),
        (this.expression = zo(
          t2 === void 0 ? e52.specification.default : t2,
          n2,
          e52.specification,
          r2
        )))
    }
    isDataDriven() {
      return (
        this.expression.kind === `source` ||
        this.expression.kind === `composite`
      )
    }
    getGlobalStateRefs() {
      return this.expression.globalStateRefs || /* @__PURE__ */ new Set()
    }
    possiblyEvaluate(e52, t2, n2) {
      return this.property.possiblyEvaluate(this, e52, t2, n2)
    }
  },
  Xc = class {
    constructor(e52, t2, n2) {
      ;((this.property = e52), (this.value = new Yc(e52, void 0, t2, n2)))
    }
    transitioned(e52, t2) {
      return new Qc(
        this.property,
        this.value,
        t2,
        St({}, e52.transition, this.transition),
        e52.now
      )
    }
    untransitioned() {
      return new Qc(this.property, this.value, null, {}, 0)
    }
  },
  Zc = class {
    constructor(e52, t2, n2) {
      ;((this._properties = e52),
        (this._values = Object.create(e52.defaultTransitionablePropertyValues)),
        (this._globalState = n2),
        (this._rootKey = t2))
    }
    _propertyRootKey(e52) {
      return `${this._rootKey}.${String(e52)}`
    }
    hasProperty(e52) {
      return e52 in this._properties.defaultTransitionablePropertyValues
    }
    getValue(e52) {
      return Pt(this._values[e52].value.value)
    }
    setValue(e52, t2) {
      ;(Object.hasOwn(this._values, e52) ||
        (this._values[e52] = new Xc(
          this._values[e52].property,
          this._propertyRootKey(e52),
          this._globalState
        )),
        (this._values[e52].value = new Yc(
          this._values[e52].property,
          t2 === null ? void 0 : Pt(t2),
          this._propertyRootKey(e52),
          this._globalState
        )))
    }
    getTransition(e52) {
      return Pt(this._values[e52].transition)
    }
    setTransition(e52, t2) {
      ;(Object.hasOwn(this._values, e52) ||
        (this._values[e52] = new Xc(
          this._values[e52].property,
          this._propertyRootKey(e52),
          this._globalState
        )),
        (this._values[e52].transition = Pt(t2) || void 0))
    }
    serialize() {
      let e52 = {}
      for (let t2 of Object.keys(this._values)) {
        let n2 = this.getValue(t2)
        n2 !== void 0 && (e52[t2] = n2)
        let r2 = this.getTransition(t2)
        r2 !== void 0 && (e52[`${t2}${Jc}`] = r2)
      }
      return e52
    }
    transitioned(e52, t2) {
      let n2 = new $c(this._properties)
      for (let r2 of Object.keys(this._values))
        n2._values[r2] = this._values[r2].transitioned(e52, t2._values[r2])
      return n2
    }
    untransitioned() {
      let e52 = new $c(this._properties)
      for (let t2 of Object.keys(this._values))
        e52._values[t2] = this._values[t2].untransitioned()
      return e52
    }
  },
  Qc = class {
    constructor(e52, t2, n2, r2, i2) {
      ;((this.property = e52),
        (this.value = t2),
        (this.begin = i2 + r2.delay || 0),
        (this.end = this.begin + r2.duration || 0),
        e52.specification.transition &&
          (r2.delay || r2.duration) &&
          (this.prior = n2))
    }
    possiblyEvaluate(e52, t2, n2) {
      let r2 = e52.now || 0,
        i2 = this.value.possiblyEvaluate(e52, t2, n2),
        a2 = this.prior
      if (!a2) return i2
      if (r2 > this.end || this.value.isDataDriven())
        return ((this.prior = null), i2)
      if (r2 < this.begin) return a2.possiblyEvaluate(e52, t2, n2)
      {
        let o2 = (r2 - this.begin) / (this.end - this.begin)
        return this.property.interpolate(
          a2.possiblyEvaluate(e52, t2, n2),
          i2,
          _t(o2)
        )
      }
    }
  },
  $c = class {
    constructor(e52) {
      ;((this._properties = e52),
        (this._values = Object.create(e52.defaultTransitioningPropertyValues)))
    }
    possiblyEvaluate(e52, t2, n2) {
      let r2 = new nl(this._properties)
      for (let i2 of Object.keys(this._values))
        r2._values[i2] = this._values[i2].possiblyEvaluate(e52, t2, n2)
      return r2
    }
    hasTransition() {
      for (let e52 of Object.keys(this._values))
        if (this._values[e52].prior) return true
      return false
    }
  },
  el = class {
    constructor(e52, t2, n2) {
      ;((this._properties = e52),
        (this._values = Object.create(e52.defaultPropertyValues)),
        (this._globalState = n2),
        (this._rootKey = t2))
    }
    _propertyRootKey(e52) {
      return `${this._rootKey}.${String(e52)}`
    }
    hasValue(e52) {
      return this._values[e52].value !== void 0
    }
    hasProperty(e52) {
      return e52 in this._properties.defaultPropertyValues
    }
    getValue(e52) {
      return Pt(this._values[e52].value)
    }
    setValue(e52, t2) {
      this._values[e52] = new Yc(
        this._values[e52].property,
        t2 === null ? void 0 : Pt(t2),
        this._propertyRootKey(e52),
        this._globalState
      )
    }
    serialize() {
      let e52 = {}
      for (let t2 of Object.keys(this._values)) {
        let n2 = this.getValue(t2)
        n2 !== void 0 && (e52[t2] = n2)
      }
      return e52
    }
    possiblyEvaluate(e52, t2, n2) {
      let r2 = new nl(this._properties)
      for (let i2 of Object.keys(this._values))
        r2._values[i2] = this._values[i2].possiblyEvaluate(e52, t2, n2)
      return r2
    }
  },
  tl = class {
    constructor(e52, t2, n2) {
      ;((this.property = e52), (this.value = t2), (this.parameters = n2))
    }
    isConstant() {
      return this.value.kind === `constant`
    }
    constantOr(e52) {
      return this.value.kind === `constant` ? this.value.value : e52
    }
    evaluate(e52, t2, n2, r2) {
      return this.property.evaluate(
        this.value,
        this.parameters,
        e52,
        t2,
        n2,
        r2
      )
    }
  },
  nl = class {
    constructor(e52) {
      ;((this._properties = e52),
        (this._values = Object.create(e52.defaultPossiblyEvaluatedValues)))
    }
    get(e52) {
      return this._values[e52]
    }
  }
function rl(e52) {
  if (Array.isArray(e52)) return e52.length
  let t2 = e52?.values
  return Array.isArray(t2) ? t2.length : void 0
}
function il(e52, t2) {
  let n2 = rl(e52),
    r2 = rl(t2)
  return n2 !== void 0 && r2 !== void 0 && n2 !== r2
}
var W = class {
    constructor(e52, t2) {
      ;((this.specification = e52), (this.name = t2))
    }
    possiblyEvaluate(e52, t2) {
      if (e52.isDataDriven()) throw Error(`Value should not be data driven`)
      return e52.expression.evaluate(t2)
    }
    interpolate(e52, t2, n2) {
      if (il(e52, t2))
        return (
          It(
            `Property "${this.name}" is trying to interpolate arrays of different lengths. Rendering may 'jump'.`
          ),
          t2
        )
      let r2 = this.specification.type,
        i2 = ti[r2]
      return i2 ? i2(e52, t2, n2) : e52
    }
  },
  G = class {
    constructor(e52, t2, n2) {
      ;((this.specification = e52), (this.name = t2), (this.overrides = n2))
    }
    possiblyEvaluate(e52, t2, n2, r2) {
      return e52.expression.kind === `constant` ||
        e52.expression.kind === `camera`
        ? new tl(
            this,
            {
              kind: `constant`,
              value: e52.expression.evaluate(t2, null, {}, n2, r2),
            },
            t2
          )
        : new tl(this, e52.expression, t2)
    }
    interpolate(e52, t2, n2) {
      if (e52.value.kind !== `constant` || t2.value.kind !== `constant`)
        return e52
      if (e52.value.value === void 0 || t2.value.value === void 0)
        return new tl(this, {kind: `constant`, value: void 0}, e52.parameters)
      if (il(e52.value.value, t2.value.value))
        return (
          It(
            `Property "${this.name}" is trying to interpolate arrays of different lengths. Rendering may 'jump'.`
          ),
          t2
        )
      let r2 = this.specification.type,
        i2 = ti[r2]
      if (i2) {
        let r3 = i2(e52.value.value, t2.value.value, n2)
        return new tl(this, {kind: `constant`, value: r3}, e52.parameters)
      }
      return e52
    }
    evaluate(e52, t2, n2, r2, i2, a2) {
      return e52.kind === `constant`
        ? e52.value
        : e52.evaluate(t2, n2, r2, i2, a2)
    }
  },
  al = class extends G {
    possiblyEvaluate(e52, t2, n2, r2) {
      if (e52.value === void 0)
        return new tl(this, {kind: `constant`, value: void 0}, t2)
      if (e52.expression.kind === `constant`) {
        let i2 = e52.expression.evaluate(t2, null, {}, n2, r2),
          a2 =
            e52.property.specification.type === `resolvedImage` &&
            typeof i2 != `string`
              ? i2.name
              : i2,
          o2 = this._calculate(a2, a2, a2, t2)
        return new tl(this, {kind: `constant`, value: o2}, t2)
      }
      if (e52.expression.kind === `camera`) {
        let n3 = this._calculate(
          e52.expression.evaluate({zoom: t2.zoom - 1}),
          e52.expression.evaluate({zoom: t2.zoom}),
          e52.expression.evaluate({zoom: t2.zoom + 1}),
          t2
        )
        return new tl(this, {kind: `constant`, value: n3}, t2)
      }
      return new tl(this, e52.expression, t2)
    }
    evaluate(e52, t2, n2, r2, i2, a2) {
      if (e52.kind === `source`) {
        let o2 = e52.evaluate(t2, n2, r2, i2, a2)
        return this._calculate(o2, o2, o2, t2)
      }
      return e52.kind === `composite`
        ? this._calculate(
            e52.evaluate({zoom: Math.floor(t2.zoom) - 1}, n2, r2),
            e52.evaluate({zoom: Math.floor(t2.zoom)}, n2, r2),
            e52.evaluate({zoom: Math.floor(t2.zoom) + 1}, n2, r2),
            t2
          )
        : e52.value
    }
    _calculate(e52, t2, n2, r2) {
      return r2.zoom > r2.zoomHistory.lastIntegerZoom
        ? {from: e52, to: t2}
        : {from: n2, to: t2}
    }
    interpolate(e52) {
      return e52
    }
  },
  ol = class {
    constructor(e52, t2) {
      ;((this.specification = e52), (this.name = t2))
    }
    possiblyEvaluate(e52, t2, n2, r2) {
      if (e52.value !== void 0) {
        if (e52.expression.kind === `constant`) {
          let i2 = e52.expression.evaluate(t2, null, {}, n2, r2)
          return this._calculate(i2, i2, i2, t2)
        }
        return this._calculate(
          e52.expression.evaluate(new U(Math.floor(t2.zoom - 1), t2)),
          e52.expression.evaluate(new U(Math.floor(t2.zoom), t2)),
          e52.expression.evaluate(new U(Math.floor(t2.zoom + 1), t2)),
          t2
        )
      }
    }
    _calculate(e52, t2, n2, r2) {
      return r2.zoom > r2.zoomHistory.lastIntegerZoom
        ? {from: e52, to: t2}
        : {from: n2, to: t2}
    }
    interpolate(e52) {
      return e52
    }
  },
  sl = class {
    constructor(e52, t2) {
      ;((this.specification = e52), (this.name = t2))
    }
    possiblyEvaluate(e52, t2, n2, r2) {
      return !!e52.expression.evaluate(t2, null, {}, n2, r2)
    }
    interpolate() {
      return false
    }
  },
  cl = class {
    constructor(e52) {
      ;((this.properties = e52),
        (this.defaultPropertyValues = {}),
        (this.defaultTransitionablePropertyValues = {}),
        (this.defaultTransitioningPropertyValues = {}),
        (this.defaultPossiblyEvaluatedValues = {}),
        (this.overridableProperties = []))
      for (let t2 in e52) {
        let n2 = e52[t2]
        n2.specification.overridable && this.overridableProperties.push(t2)
        let r2 = (this.defaultPropertyValues[t2] = new Yc(
            n2,
            void 0,
            n2.name,
            void 0
          )),
          i2 = (this.defaultTransitionablePropertyValues[t2] = new Xc(
            n2,
            n2.name,
            void 0
          ))
        ;((this.defaultTransitioningPropertyValues[t2] = i2.untransitioned()),
          (this.defaultPossiblyEvaluatedValues[t2] = r2.possiblyEvaluate({})))
      }
    }
  }
;(H(`DataDrivenProperty`, G),
  H(`DataConstantProperty`, W),
  H(`CrossFadedDataDrivenProperty`, al),
  H(`CrossFadedProperty`, ol),
  H(`ColorRampProperty`, sl))
const ll = ` is a PAINT property not a LAYOUT property. Use get/setPaintProperty instead?`,
  ul = ` is a LAYOUT property not a PAINT property. Use get/setLayoutProperty instead?`
var dl = class extends Ln {
  constructor(e52, t2, n2) {
    if (
      (super(),
      (this.id = e52.id),
      (this.type = e52.type),
      (this._globalState = n2),
      (this._featureFilter = {
        filter: () => true,
        needGeometry: false,
        getGlobalStateRefs: () => /* @__PURE__ */ new Set(),
      }),
      (this._visibilityExpression = lc(
        this.visibility,
        `layers[${this.id}].layout.visibility`,
        n2
      )),
      e52.type !== `custom` &&
        ((this.metadata = e52.metadata),
        (this.minzoom = e52.minzoom),
        (this.maxzoom = e52.maxzoom),
        e52.type !== `background` &&
          ((this.source = e52.source),
          (this.sourceLayer = e52[`source-layer`]),
          (this.filter = e52.filter),
          (this._featureFilter = ts(
            e52.filter,
            `layers[${this.id}].filter`,
            n2
          ))),
        t2.layout &&
          (this._unevaluatedLayout = new el(
            t2.layout,
            `layers[${this.id}].layout`,
            n2
          )),
        t2.paint))
    ) {
      this._transitionablePaint = new Zc(
        t2.paint,
        `layers[${this.id}].paint`,
        n2
      )
      for (let t3 in e52.paint)
        this.setPaintProperty(t3, e52.paint[t3], {validate: false})
      for (let t3 in e52.layout)
        this.setLayoutProperty(t3, e52.layout[t3], {validate: false})
      ;((this._transitioningPaint = this._transitionablePaint.untransitioned()),
        (this.paint = new nl(t2.paint)))
    }
  }
  setFilter(e52) {
    ;((this.filter = e52),
      (this._featureFilter = ts(
        e52,
        `layers[${this.id}].filter`,
        this._globalState
      )))
  }
  getCrossfadeParameters() {
    return this._crossfadeParameters
  }
  getLayoutProperty(e52) {
    if (e52 === `visibility`) return this.visibility
    if (this._transitionablePaint?.hasProperty(e52)) throw Error(e52 + ll)
    if (!this._unevaluatedLayout)
      throw Error(
        `Cannot get layout property "${e52}" on layer type "${this.type}" which has no layout properties.`
      )
    return this._unevaluatedLayout.getValue(e52)
  }
  getLayoutAffectingGlobalStateRefs() {
    let e52 = /* @__PURE__ */ new Set()
    for (let t2 of this._visibilityExpression.getGlobalStateRefs()) e52.add(t2)
    if (this._unevaluatedLayout)
      for (let t2 in this._unevaluatedLayout._values) {
        let n2 = this._unevaluatedLayout._values[t2]
        for (let t3 of n2.getGlobalStateRefs()) e52.add(t3)
      }
    for (let t2 of this._featureFilter.getGlobalStateRefs()) e52.add(t2)
    return e52
  }
  getPaintAffectingGlobalStateRefs() {
    let e52 = new globalThis.Map()
    if (this._transitionablePaint)
      for (let t2 in this._transitionablePaint._values) {
        let n2 = this._transitionablePaint._values[t2].value
        for (let r2 of n2.getGlobalStateRefs()) {
          let i2 = e52.get(r2) ?? []
          ;(i2.push({name: t2, value: n2.value}), e52.set(r2, i2))
        }
      }
    return e52
  }
  getVisibilityAffectingGlobalStateRefs() {
    return this._visibilityExpression.getGlobalStateRefs()
  }
  setLayoutProperty(e52, t2, n2 = {}) {
    if (e52 === `visibility`) {
      ;((this.visibility = t2),
        this._visibilityExpression.setValue(t2),
        this.recalculateVisibility())
      return
    }
    if (this._transitionablePaint?.hasProperty(e52)) {
      this.fire(new In(Error(e52 + ll)))
      return
    }
    ;(t2 != null &&
      this._validate(
        uc.layoutProperty,
        `layers.${this.id}.layout.${e52}`,
        e52,
        t2,
        n2
      )) ||
      this._unevaluatedLayout.setValue(e52, t2)
  }
  getPaintProperty(e52) {
    if (e52.endsWith(`-transition`)) {
      let t2 = e52.slice(0, -11)
      if (t2 === `visibility` || this._unevaluatedLayout?.hasProperty(t2))
        throw Error(e52 + ul)
      return this._transitionablePaint.getTransition(t2)
    }
    if (e52 === `visibility` || this._unevaluatedLayout?.hasProperty(e52))
      throw Error(e52 + ul)
    return this._transitionablePaint.getValue(e52)
  }
  setPaintProperty(e52, t2, n2 = {}) {
    if (e52 === `visibility` || this._unevaluatedLayout?.hasProperty(e52))
      return (this.fire(new In(Error(e52 + ul))), false)
    if (
      t2 != null &&
      this._validate(
        uc.paintProperty,
        `layers.${this.id}.paint.${e52}`,
        e52,
        t2,
        n2
      )
    )
      return false
    if (e52.endsWith(`-transition`))
      return (
        this._transitionablePaint.setTransition(
          e52.slice(0, -11),
          t2 || void 0
        ),
        false
      )
    {
      let n3 = this._transitionablePaint._values[e52],
        r2 =
          n3.property.specification[`property-type`] ===
          `cross-faded-data-driven`,
        i2 = n3.value.isDataDriven(),
        a2 = n3.value
      ;(this._transitionablePaint.setValue(e52, t2),
        this._handleSpecialPaintPropertyUpdate(e52))
      let o2 = this._transitionablePaint._values[e52].value
      return (
        o2.isDataDriven() ||
        i2 ||
        r2 ||
        this._handleOverridablePaintPropertyUpdate(e52, a2, o2)
      )
    }
  }
  _handleSpecialPaintPropertyUpdate(e52) {}
  _handleOverridablePaintPropertyUpdate(e52, t2, n2) {
    return false
  }
  isHidden(e52 = this.minzoom, t2 = false) {
    return (this.minzoom &&
      e52 < (t2 ? Math.floor(this.minzoom) : this.minzoom)) ||
      (this.maxzoom && e52 >= this.maxzoom)
      ? true
      : this._evaluatedVisibility === `none`
  }
  updateTransitions(e52) {
    this._transitioningPaint = this._transitionablePaint.transitioned(
      e52,
      this._transitioningPaint
    )
  }
  hasTransition() {
    return this._transitioningPaint.hasTransition()
  }
  recalculateVisibility() {
    this._evaluatedVisibility = this._visibilityExpression.evaluate()
  }
  recalculate(e52, t2) {
    ;(e52.getCrossfadeParameters &&
      (this._crossfadeParameters = e52.getCrossfadeParameters()),
      this._unevaluatedLayout &&
        (this.layout = this._unevaluatedLayout.possiblyEvaluate(
          e52,
          void 0,
          t2
        )),
      (this.paint = this._transitioningPaint.possiblyEvaluate(e52, void 0, t2)))
  }
  serialize() {
    let e52 = {
      id: this.id,
      type: this.type,
      source: this.source,
      "source-layer": this.sourceLayer,
      metadata: this.metadata,
      minzoom: this.minzoom,
      maxzoom: this.maxzoom,
      filter: this.filter,
      layout: this._unevaluatedLayout?.serialize(),
      paint: this._transitionablePaint?.serialize(),
    }
    return (
      this.visibility &&
        ((e52.layout ||= {}), (e52.layout.visibility = this.visibility)),
      Mt(
        e52,
        (e53, t2) =>
          e53 !== void 0 &&
          !(t2 === `layout` && !Object.keys(e53).length) &&
          !(t2 === `paint` && !Object.keys(e53).length)
      )
    )
  }
  _validate(e52, t2, n2, r2, i2 = {}) {
    return hc(
      this,
      e52,
      {key: t2, layerType: this.type, objectKey: n2, value: r2},
      i2
    )
  }
  is3D() {
    return false
  }
  isTileClipped() {
    return false
  }
  hasOffscreenPass() {
    return false
  }
  resize() {}
  isStateDependent() {
    for (let e52 in this.paint._values) {
      let t2 = this.paint.get(e52)
      if (
        !(!(t2 instanceof tl) || !fo(t2.property.specification)) &&
        (t2.value.kind === `source` || t2.value.kind === `composite`) &&
        t2.value.isStateDependent
      )
        return true
    }
    return false
  }
}
let fl
const pl = () =>
  (fl ||= new cl({
    "raster-opacity": new W(M.paint_raster[`raster-opacity`], `raster-opacity`),
    "raster-hue-rotate": new W(
      M.paint_raster[`raster-hue-rotate`],
      `raster-hue-rotate`
    ),
    "raster-brightness-min": new W(
      M.paint_raster[`raster-brightness-min`],
      `raster-brightness-min`
    ),
    "raster-brightness-max": new W(
      M.paint_raster[`raster-brightness-max`],
      `raster-brightness-max`
    ),
    "raster-saturation": new W(
      M.paint_raster[`raster-saturation`],
      `raster-saturation`
    ),
    "raster-contrast": new W(
      M.paint_raster[`raster-contrast`],
      `raster-contrast`
    ),
    resampling: new W(M.paint_raster.resampling, `resampling`),
    "raster-resampling": new W(
      M.paint_raster[`raster-resampling`],
      `raster-resampling`
    ),
    "raster-fade-duration": new W(
      M.paint_raster[`raster-fade-duration`],
      `raster-fade-duration`
    ),
  }))
var ml = {
  get paint() {
    return pl()
  },
}
const hl = e52 => e52.type === `raster`
var gl = class extends dl {
  constructor(e52, t2) {
    super(e52, ml, t2)
  }
}
const _l = {
  Int8: Int8Array,
  Uint8: Uint8Array,
  Int16: Int16Array,
  Uint16: Uint16Array,
  Int32: Int32Array,
  Uint32: Uint32Array,
  Float32: Float32Array,
}
var vl = class {
    constructor(e52, t2) {
      ;((this._structArray = e52),
        (this._pos1 = t2 * this.size),
        (this._pos2 = this._pos1 / 2),
        (this._pos4 = this._pos1 / 4),
        (this._pos8 = this._pos1 / 8))
    }
  },
  K = class {
    constructor() {
      ;((this.isTransferred = false), (this.capacity = -1), this.resize(0))
    }
    static serialize(e52, t2) {
      return (
        e52._trim(),
        t2 && ((e52.isTransferred = true), t2.push(e52.arrayBuffer)),
        {length: e52.length, arrayBuffer: e52.arrayBuffer}
      )
    }
    static deserialize(e52) {
      let t2 = Object.create(this.prototype)
      return (
        (t2.arrayBuffer = e52.arrayBuffer),
        (t2.length = e52.length),
        (t2.capacity = e52.arrayBuffer.byteLength / t2.bytesPerElement),
        t2._refreshViews(),
        t2
      )
    }
    _trim() {
      this.length !== this.capacity &&
        ((this.capacity = this.length),
        (this.arrayBuffer = this.arrayBuffer.slice(
          0,
          this.length * this.bytesPerElement
        )),
        this._refreshViews())
    }
    clear() {
      this.length = 0
    }
    resize(e52) {
      ;(this.reserve(e52), (this.length = e52))
    }
    reserve(e52) {
      if (e52 > this.capacity) {
        ;((this.capacity = Math.max(e52, Math.floor(this.capacity * 5), 128)),
          (this.arrayBuffer = new ArrayBuffer(
            this.capacity * this.bytesPerElement
          )))
        let t2 = this.uint8
        ;(this._refreshViews(), t2 && this.uint8.set(t2))
      }
    }
    _refreshViews() {
      throw Error(
        `_refreshViews() must be implemented by each concrete StructArray layout`
      )
    }
    freeBufferAfterUpload() {
      ;((this.arrayBuffer = new ArrayBuffer(0)), this._refreshViews())
    }
  }
function q(e52, t2 = 1) {
  let n2 = 0,
    r2 = 0
  return {
    members: e52.map(e53 => {
      let i2 = yl(e53.type),
        a2 = (n2 = bl(n2, Math.max(t2, i2))),
        o2 = e53.components || 1
      return (
        (r2 = Math.max(r2, i2)),
        (n2 += i2 * o2),
        {name: e53.name, type: e53.type, components: o2, offset: a2}
      )
    }),
    size: bl(n2, Math.max(r2, t2)),
    alignment: t2,
  }
}
function yl(e52) {
  return _l[e52].BYTES_PER_ELEMENT
}
function bl(e52, t2) {
  return Math.ceil(e52 / t2) * t2
}
var xl = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.int16 = new Int16Array(this.arrayBuffer)))
  }
  emplaceBack(e52, t2) {
    let n2 = this.length
    return (this.resize(n2 + 1), this.emplace(n2, e52, t2))
  }
  emplace(e52, t2, n2) {
    let r2 = e52 * 2
    return ((this.int16[r2 + 0] = t2), (this.int16[r2 + 1] = n2), e52)
  }
}
;((xl.prototype.bytesPerElement = 4), H(`StructArrayLayout2i4`, xl))
var Sl = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.int16 = new Int16Array(this.arrayBuffer)))
  }
  emplaceBack(e52, t2, n2) {
    let r2 = this.length
    return (this.resize(r2 + 1), this.emplace(r2, e52, t2, n2))
  }
  emplace(e52, t2, n2, r2) {
    let i2 = e52 * 3
    return (
      (this.int16[i2 + 0] = t2),
      (this.int16[i2 + 1] = n2),
      (this.int16[i2 + 2] = r2),
      e52
    )
  }
}
;((Sl.prototype.bytesPerElement = 6), H(`StructArrayLayout3i6`, Sl))
var Cl = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.int16 = new Int16Array(this.arrayBuffer)))
  }
  emplaceBack(e52, t2, n2, r2) {
    let i2 = this.length
    return (this.resize(i2 + 1), this.emplace(i2, e52, t2, n2, r2))
  }
  emplace(e52, t2, n2, r2, i2) {
    let a2 = e52 * 4
    return (
      (this.int16[a2 + 0] = t2),
      (this.int16[a2 + 1] = n2),
      (this.int16[a2 + 2] = r2),
      (this.int16[a2 + 3] = i2),
      e52
    )
  }
}
;((Cl.prototype.bytesPerElement = 8), H(`StructArrayLayout4i8`, Cl))
var wl = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.int16 = new Int16Array(this.arrayBuffer)))
  }
  emplaceBack(e52, t2, n2, r2, i2, a2) {
    let o2 = this.length
    return (this.resize(o2 + 1), this.emplace(o2, e52, t2, n2, r2, i2, a2))
  }
  emplace(e52, t2, n2, r2, i2, a2, o2) {
    let s2 = e52 * 6
    return (
      (this.int16[s2 + 0] = t2),
      (this.int16[s2 + 1] = n2),
      (this.int16[s2 + 2] = r2),
      (this.int16[s2 + 3] = i2),
      (this.int16[s2 + 4] = a2),
      (this.int16[s2 + 5] = o2),
      e52
    )
  }
}
;((wl.prototype.bytesPerElement = 12), H(`StructArrayLayout2i4i12`, wl))
var Tl = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.int16 = new Int16Array(this.arrayBuffer)))
  }
  emplaceBack(e52, t2, n2, r2, i2, a2) {
    let o2 = this.length
    return (this.resize(o2 + 1), this.emplace(o2, e52, t2, n2, r2, i2, a2))
  }
  emplace(e52, t2, n2, r2, i2, a2, o2) {
    let s2 = e52 * 4,
      c2 = e52 * 8
    return (
      (this.int16[s2 + 0] = t2),
      (this.int16[s2 + 1] = n2),
      (this.uint8[c2 + 4] = r2),
      (this.uint8[c2 + 5] = i2),
      (this.uint8[c2 + 6] = a2),
      (this.uint8[c2 + 7] = o2),
      e52
    )
  }
}
;((Tl.prototype.bytesPerElement = 8), H(`StructArrayLayout2i4ub8`, Tl))
var El = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.float32 = new Float32Array(this.arrayBuffer)))
  }
  emplaceBack(e52, t2) {
    let n2 = this.length
    return (this.resize(n2 + 1), this.emplace(n2, e52, t2))
  }
  emplace(e52, t2, n2) {
    let r2 = e52 * 2
    return ((this.float32[r2 + 0] = t2), (this.float32[r2 + 1] = n2), e52)
  }
}
;((El.prototype.bytesPerElement = 8), H(`StructArrayLayout2f8`, El))
var Dl = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.uint16 = new Uint16Array(this.arrayBuffer)))
  }
  emplaceBack(e52, t2, n2, r2, i2, a2, o2, s2, c2, l2) {
    let u2 = this.length
    return (
      this.resize(u2 + 1),
      this.emplace(u2, e52, t2, n2, r2, i2, a2, o2, s2, c2, l2)
    )
  }
  emplace(e52, t2, n2, r2, i2, a2, o2, s2, c2, l2, u2) {
    let d2 = e52 * 10
    return (
      (this.uint16[d2 + 0] = t2),
      (this.uint16[d2 + 1] = n2),
      (this.uint16[d2 + 2] = r2),
      (this.uint16[d2 + 3] = i2),
      (this.uint16[d2 + 4] = a2),
      (this.uint16[d2 + 5] = o2),
      (this.uint16[d2 + 6] = s2),
      (this.uint16[d2 + 7] = c2),
      (this.uint16[d2 + 8] = l2),
      (this.uint16[d2 + 9] = u2),
      e52
    )
  }
}
;((Dl.prototype.bytesPerElement = 20), H(`StructArrayLayout10ui20`, Dl))
var Ol = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.uint16 = new Uint16Array(this.arrayBuffer)))
  }
  emplaceBack(e52, t2, n2, r2, i2, a2, o2, s2) {
    let c2 = this.length
    return (
      this.resize(c2 + 1), this.emplace(c2, e52, t2, n2, r2, i2, a2, o2, s2)
    )
  }
  emplace(e52, t2, n2, r2, i2, a2, o2, s2, c2) {
    let l2 = e52 * 8
    return (
      (this.uint16[l2 + 0] = t2),
      (this.uint16[l2 + 1] = n2),
      (this.uint16[l2 + 2] = r2),
      (this.uint16[l2 + 3] = i2),
      (this.uint16[l2 + 4] = a2),
      (this.uint16[l2 + 5] = o2),
      (this.uint16[l2 + 6] = s2),
      (this.uint16[l2 + 7] = c2),
      e52
    )
  }
}
;((Ol.prototype.bytesPerElement = 16), H(`StructArrayLayout8ui16`, Ol))
var kl = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.int16 = new Int16Array(this.arrayBuffer)),
      (this.uint16 = new Uint16Array(this.arrayBuffer)),
      (this.float32 = new Float32Array(this.arrayBuffer)))
  }
  emplaceBack(e52, t2, n2, r2, i2, a2, o2, s2, c2, l2, u2, d2, f2) {
    let p2 = this.length
    return (
      this.resize(p2 + 1),
      this.emplace(p2, e52, t2, n2, r2, i2, a2, o2, s2, c2, l2, u2, d2, f2)
    )
  }
  emplace(e52, t2, n2, r2, i2, a2, o2, s2, c2, l2, u2, d2, f2, p2) {
    let m2 = e52 * 14,
      h2 = e52 * 7
    return (
      (this.int16[m2 + 0] = t2),
      (this.int16[m2 + 1] = n2),
      (this.int16[m2 + 2] = r2),
      (this.int16[m2 + 3] = i2),
      (this.uint16[m2 + 4] = a2),
      (this.uint16[m2 + 5] = o2),
      (this.uint16[m2 + 6] = s2),
      (this.uint16[m2 + 7] = c2),
      (this.int16[m2 + 8] = l2),
      (this.int16[m2 + 9] = u2),
      (this.int16[m2 + 10] = d2),
      (this.int16[m2 + 11] = f2),
      (this.float32[h2 + 6] = p2),
      e52
    )
  }
}
;((kl.prototype.bytesPerElement = 28), H(`StructArrayLayout4i4ui4i1f28`, kl))
var Al = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.float32 = new Float32Array(this.arrayBuffer)))
  }
  emplaceBack(e52, t2, n2) {
    let r2 = this.length
    return (this.resize(r2 + 1), this.emplace(r2, e52, t2, n2))
  }
  emplace(e52, t2, n2, r2) {
    let i2 = e52 * 3
    return (
      (this.float32[i2 + 0] = t2),
      (this.float32[i2 + 1] = n2),
      (this.float32[i2 + 2] = r2),
      e52
    )
  }
}
;((Al.prototype.bytesPerElement = 12), H(`StructArrayLayout3f12`, Al))
var jl = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.uint32 = new Uint32Array(this.arrayBuffer)))
  }
  emplaceBack(e52) {
    let t2 = this.length
    return (this.resize(t2 + 1), this.emplace(t2, e52))
  }
  emplace(e52, t2) {
    let n2 = e52 * 1
    return ((this.uint32[n2 + 0] = t2), e52)
  }
}
;((jl.prototype.bytesPerElement = 4), H(`StructArrayLayout1ul4`, jl))
var Ml = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.int16 = new Int16Array(this.arrayBuffer)),
      (this.uint32 = new Uint32Array(this.arrayBuffer)),
      (this.uint16 = new Uint16Array(this.arrayBuffer)))
  }
  emplaceBack(e52, t2, n2, r2, i2, a2, o2, s2, c2) {
    let l2 = this.length
    return (
      this.resize(l2 + 1), this.emplace(l2, e52, t2, n2, r2, i2, a2, o2, s2, c2)
    )
  }
  emplace(e52, t2, n2, r2, i2, a2, o2, s2, c2, l2) {
    let u2 = e52 * 10,
      d2 = e52 * 5
    return (
      (this.int16[u2 + 0] = t2),
      (this.int16[u2 + 1] = n2),
      (this.int16[u2 + 2] = r2),
      (this.int16[u2 + 3] = i2),
      (this.int16[u2 + 4] = a2),
      (this.int16[u2 + 5] = o2),
      (this.uint32[d2 + 3] = s2),
      (this.uint16[u2 + 8] = c2),
      (this.uint16[u2 + 9] = l2),
      e52
    )
  }
}
;((Ml.prototype.bytesPerElement = 20), H(`StructArrayLayout6i1ul2ui20`, Ml))
var Nl = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.int16 = new Int16Array(this.arrayBuffer)))
  }
  emplaceBack(e52, t2, n2, r2, i2, a2) {
    let o2 = this.length
    return (this.resize(o2 + 1), this.emplace(o2, e52, t2, n2, r2, i2, a2))
  }
  emplace(e52, t2, n2, r2, i2, a2, o2) {
    let s2 = e52 * 6
    return (
      (this.int16[s2 + 0] = t2),
      (this.int16[s2 + 1] = n2),
      (this.int16[s2 + 2] = r2),
      (this.int16[s2 + 3] = i2),
      (this.int16[s2 + 4] = a2),
      (this.int16[s2 + 5] = o2),
      e52
    )
  }
}
;((Nl.prototype.bytesPerElement = 12), H(`StructArrayLayout2i2i2i12`, Nl))
var Pl = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.float32 = new Float32Array(this.arrayBuffer)),
      (this.int16 = new Int16Array(this.arrayBuffer)))
  }
  emplaceBack(e52, t2, n2, r2, i2) {
    let a2 = this.length
    return (this.resize(a2 + 1), this.emplace(a2, e52, t2, n2, r2, i2))
  }
  emplace(e52, t2, n2, r2, i2, a2) {
    let o2 = e52 * 4,
      s2 = e52 * 8
    return (
      (this.float32[o2 + 0] = t2),
      (this.float32[o2 + 1] = n2),
      (this.float32[o2 + 2] = r2),
      (this.int16[s2 + 6] = i2),
      (this.int16[s2 + 7] = a2),
      e52
    )
  }
}
;((Pl.prototype.bytesPerElement = 16), H(`StructArrayLayout2f1f2i16`, Pl))
var Fl = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.float32 = new Float32Array(this.arrayBuffer)),
      (this.int16 = new Int16Array(this.arrayBuffer)))
  }
  emplaceBack(e52, t2, n2, r2, i2, a2) {
    let o2 = this.length
    return (this.resize(o2 + 1), this.emplace(o2, e52, t2, n2, r2, i2, a2))
  }
  emplace(e52, t2, n2, r2, i2, a2, o2) {
    let s2 = e52 * 16,
      c2 = e52 * 4,
      l2 = e52 * 8
    return (
      (this.uint8[s2 + 0] = t2),
      (this.uint8[s2 + 1] = n2),
      (this.float32[c2 + 1] = r2),
      (this.float32[c2 + 2] = i2),
      (this.int16[l2 + 6] = a2),
      (this.int16[l2 + 7] = o2),
      e52
    )
  }
}
;((Fl.prototype.bytesPerElement = 16), H(`StructArrayLayout2ub2f2i16`, Fl))
var Il = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.uint16 = new Uint16Array(this.arrayBuffer)))
  }
  emplaceBack(e52, t2, n2) {
    let r2 = this.length
    return (this.resize(r2 + 1), this.emplace(r2, e52, t2, n2))
  }
  emplace(e52, t2, n2, r2) {
    let i2 = e52 * 3
    return (
      (this.uint16[i2 + 0] = t2),
      (this.uint16[i2 + 1] = n2),
      (this.uint16[i2 + 2] = r2),
      e52
    )
  }
}
;((Il.prototype.bytesPerElement = 6), H(`StructArrayLayout3ui6`, Il))
var Ll = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.int16 = new Int16Array(this.arrayBuffer)),
      (this.uint16 = new Uint16Array(this.arrayBuffer)),
      (this.uint32 = new Uint32Array(this.arrayBuffer)),
      (this.float32 = new Float32Array(this.arrayBuffer)))
  }
  emplaceBack(
    e52,
    t2,
    n2,
    r2,
    i2,
    a2,
    o2,
    s2,
    c2,
    l2,
    u2,
    d2,
    f2,
    p2,
    m2,
    h2,
    g2,
    _2
  ) {
    let v2 = this.length
    return (
      this.resize(v2 + 1),
      this.emplace(
        v2,
        e52,
        t2,
        n2,
        r2,
        i2,
        a2,
        o2,
        s2,
        c2,
        l2,
        u2,
        d2,
        f2,
        p2,
        m2,
        h2,
        g2,
        _2
      )
    )
  }
  emplace(
    e52,
    t2,
    n2,
    r2,
    i2,
    a2,
    o2,
    s2,
    c2,
    l2,
    u2,
    d2,
    f2,
    p2,
    m2,
    h2,
    g2,
    _2,
    v2
  ) {
    let y2 = e52 * 26,
      b2 = e52 * 13,
      x2 = e52 * 52
    return (
      (this.int16[y2 + 0] = t2),
      (this.int16[y2 + 1] = n2),
      (this.uint16[y2 + 2] = r2),
      (this.uint16[y2 + 3] = i2),
      (this.uint32[b2 + 2] = a2),
      (this.uint32[b2 + 3] = o2),
      (this.uint32[b2 + 4] = s2),
      (this.uint16[y2 + 10] = c2),
      (this.uint16[y2 + 11] = l2),
      (this.uint16[y2 + 12] = u2),
      (this.float32[b2 + 7] = d2),
      (this.float32[b2 + 8] = f2),
      (this.uint8[x2 + 36] = p2),
      (this.uint8[x2 + 37] = m2),
      (this.uint8[x2 + 38] = h2),
      (this.uint32[b2 + 10] = g2),
      (this.int16[y2 + 22] = _2),
      (this.float32[b2 + 12] = v2),
      e52
    )
  }
}
;((Ll.prototype.bytesPerElement = 52),
  H(`StructArrayLayout2i2ui3ul3ui2f3ub1ul1i1f52`, Ll))
var Rl = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.int16 = new Int16Array(this.arrayBuffer)),
      (this.uint16 = new Uint16Array(this.arrayBuffer)),
      (this.uint32 = new Uint32Array(this.arrayBuffer)),
      (this.float32 = new Float32Array(this.arrayBuffer)))
  }
  emplaceBack(
    e52,
    t2,
    n2,
    r2,
    i2,
    a2,
    o2,
    s2,
    c2,
    l2,
    u2,
    d2,
    f2,
    p2,
    m2,
    h2,
    g2,
    _2,
    v2,
    y2,
    b2,
    x2,
    S2,
    C2,
    w2,
    T2,
    E2,
    D2,
    O2
  ) {
    let k2 = this.length
    return (
      this.resize(k2 + 1),
      this.emplace(
        k2,
        e52,
        t2,
        n2,
        r2,
        i2,
        a2,
        o2,
        s2,
        c2,
        l2,
        u2,
        d2,
        f2,
        p2,
        m2,
        h2,
        g2,
        _2,
        v2,
        y2,
        b2,
        x2,
        S2,
        C2,
        w2,
        T2,
        E2,
        D2,
        O2
      )
    )
  }
  emplace(
    e52,
    t2,
    n2,
    r2,
    i2,
    a2,
    o2,
    s2,
    c2,
    l2,
    u2,
    d2,
    f2,
    p2,
    m2,
    h2,
    g2,
    _2,
    v2,
    y2,
    b2,
    x2,
    S2,
    C2,
    w2,
    T2,
    E2,
    D2,
    O2,
    k2
  ) {
    let A2 = e52 * 34,
      ee2 = e52 * 17
    return (
      (this.int16[A2 + 0] = t2),
      (this.int16[A2 + 1] = n2),
      (this.int16[A2 + 2] = r2),
      (this.int16[A2 + 3] = i2),
      (this.int16[A2 + 4] = a2),
      (this.int16[A2 + 5] = o2),
      (this.int16[A2 + 6] = s2),
      (this.int16[A2 + 7] = c2),
      (this.uint16[A2 + 8] = l2),
      (this.uint16[A2 + 9] = u2),
      (this.uint16[A2 + 10] = d2),
      (this.uint16[A2 + 11] = f2),
      (this.uint16[A2 + 12] = p2),
      (this.uint16[A2 + 13] = m2),
      (this.uint16[A2 + 14] = h2),
      (this.uint16[A2 + 15] = g2),
      (this.uint16[A2 + 16] = _2),
      (this.uint16[A2 + 17] = v2),
      (this.uint16[A2 + 18] = y2),
      (this.uint16[A2 + 19] = b2),
      (this.uint16[A2 + 20] = x2),
      (this.uint16[A2 + 21] = S2),
      (this.uint16[A2 + 22] = C2),
      (this.uint32[ee2 + 12] = w2),
      (this.float32[ee2 + 13] = T2),
      (this.float32[ee2 + 14] = E2),
      (this.uint16[A2 + 30] = D2),
      (this.uint16[A2 + 31] = O2),
      (this.float32[ee2 + 16] = k2),
      e52
    )
  }
}
;((Rl.prototype.bytesPerElement = 68),
  H(`StructArrayLayout8i15ui1ul2f2ui1f68`, Rl))
var zl = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.float32 = new Float32Array(this.arrayBuffer)))
  }
  emplaceBack(e52) {
    let t2 = this.length
    return (this.resize(t2 + 1), this.emplace(t2, e52))
  }
  emplace(e52, t2) {
    let n2 = e52 * 1
    return ((this.float32[n2 + 0] = t2), e52)
  }
}
;((zl.prototype.bytesPerElement = 4), H(`StructArrayLayout1f4`, zl))
var Bl = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.uint16 = new Uint16Array(this.arrayBuffer)),
      (this.float32 = new Float32Array(this.arrayBuffer)))
  }
  emplaceBack(e52, t2, n2) {
    let r2 = this.length
    return (this.resize(r2 + 1), this.emplace(r2, e52, t2, n2))
  }
  emplace(e52, t2, n2, r2) {
    let i2 = e52 * 6,
      a2 = e52 * 3
    return (
      (this.uint16[i2 + 0] = t2),
      (this.float32[a2 + 1] = n2),
      (this.float32[a2 + 2] = r2),
      e52
    )
  }
}
;((Bl.prototype.bytesPerElement = 12), H(`StructArrayLayout1ui2f12`, Bl))
var Vl = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.uint32 = new Uint32Array(this.arrayBuffer)),
      (this.uint16 = new Uint16Array(this.arrayBuffer)))
  }
  emplaceBack(e52, t2, n2) {
    let r2 = this.length
    return (this.resize(r2 + 1), this.emplace(r2, e52, t2, n2))
  }
  emplace(e52, t2, n2, r2) {
    let i2 = e52 * 2,
      a2 = e52 * 4
    return (
      (this.uint32[i2 + 0] = t2),
      (this.uint16[a2 + 2] = n2),
      (this.uint16[a2 + 3] = r2),
      e52
    )
  }
}
;((Vl.prototype.bytesPerElement = 8), H(`StructArrayLayout1ul2ui8`, Vl))
var Hl = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.uint16 = new Uint16Array(this.arrayBuffer)))
  }
  emplaceBack(e52, t2) {
    let n2 = this.length
    return (this.resize(n2 + 1), this.emplace(n2, e52, t2))
  }
  emplace(e52, t2, n2) {
    let r2 = e52 * 2
    return ((this.uint16[r2 + 0] = t2), (this.uint16[r2 + 1] = n2), e52)
  }
}
;((Hl.prototype.bytesPerElement = 4), H(`StructArrayLayout2ui4`, Hl))
var Ul = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.uint16 = new Uint16Array(this.arrayBuffer)))
  }
  emplaceBack(e52) {
    let t2 = this.length
    return (this.resize(t2 + 1), this.emplace(t2, e52))
  }
  emplace(e52, t2) {
    let n2 = e52 * 1
    return ((this.uint16[n2 + 0] = t2), e52)
  }
}
;((Ul.prototype.bytesPerElement = 2), H(`StructArrayLayout1ui2`, Ul))
var Wl = class extends K {
  _refreshViews() {
    ;((this.uint8 = new Uint8Array(this.arrayBuffer)),
      (this.float32 = new Float32Array(this.arrayBuffer)))
  }
  emplaceBack(e52, t2, n2, r2) {
    let i2 = this.length
    return (this.resize(i2 + 1), this.emplace(i2, e52, t2, n2, r2))
  }
  emplace(e52, t2, n2, r2, i2) {
    let a2 = e52 * 4
    return (
      (this.float32[a2 + 0] = t2),
      (this.float32[a2 + 1] = n2),
      (this.float32[a2 + 2] = r2),
      (this.float32[a2 + 3] = i2),
      e52
    )
  }
}
;((Wl.prototype.bytesPerElement = 16), H(`StructArrayLayout4f16`, Wl))
var Gl = class extends vl {
  get anchorPointX() {
    return this._structArray.int16[this._pos2 + 0]
  }
  get anchorPointY() {
    return this._structArray.int16[this._pos2 + 1]
  }
  get x1() {
    return this._structArray.int16[this._pos2 + 2]
  }
  get y1() {
    return this._structArray.int16[this._pos2 + 3]
  }
  get x2() {
    return this._structArray.int16[this._pos2 + 4]
  }
  get y2() {
    return this._structArray.int16[this._pos2 + 5]
  }
  get featureIndex() {
    return this._structArray.uint32[this._pos4 + 3]
  }
  get sourceLayerIndex() {
    return this._structArray.uint16[this._pos2 + 8]
  }
  get bucketIndex() {
    return this._structArray.uint16[this._pos2 + 9]
  }
  get anchorPoint() {
    return new l(this.anchorPointX, this.anchorPointY)
  }
}
Gl.prototype.size = 20
var Kl = class extends Ml {
  get(e52) {
    return new Gl(this, e52)
  }
}
H(`CollisionBoxArray`, Kl)
var ql = class extends vl {
  get anchorX() {
    return this._structArray.int16[this._pos2 + 0]
  }
  get anchorY() {
    return this._structArray.int16[this._pos2 + 1]
  }
  get glyphStartIndex() {
    return this._structArray.uint16[this._pos2 + 2]
  }
  get numGlyphs() {
    return this._structArray.uint16[this._pos2 + 3]
  }
  get vertexStartIndex() {
    return this._structArray.uint32[this._pos4 + 2]
  }
  get lineStartIndex() {
    return this._structArray.uint32[this._pos4 + 3]
  }
  get lineLength() {
    return this._structArray.uint32[this._pos4 + 4]
  }
  get segment() {
    return this._structArray.uint16[this._pos2 + 10]
  }
  get lowerSize() {
    return this._structArray.uint16[this._pos2 + 11]
  }
  get upperSize() {
    return this._structArray.uint16[this._pos2 + 12]
  }
  get lineOffsetX() {
    return this._structArray.float32[this._pos4 + 7]
  }
  get lineOffsetY() {
    return this._structArray.float32[this._pos4 + 8]
  }
  get writingMode() {
    return this._structArray.uint8[this._pos1 + 36]
  }
  get placedOrientation() {
    return this._structArray.uint8[this._pos1 + 37]
  }
  set placedOrientation(e52) {
    this._structArray.uint8[this._pos1 + 37] = e52
  }
  get hidden() {
    return this._structArray.uint8[this._pos1 + 38]
  }
  set hidden(e52) {
    this._structArray.uint8[this._pos1 + 38] = e52
  }
  get crossTileID() {
    return this._structArray.uint32[this._pos4 + 10]
  }
  set crossTileID(e52) {
    this._structArray.uint32[this._pos4 + 10] = e52
  }
  get associatedIconIndex() {
    return this._structArray.int16[this._pos2 + 22]
  }
  get heightOffset() {
    return this._structArray.float32[this._pos4 + 12]
  }
}
ql.prototype.size = 52
var Jl = class extends Ll {
  get(e52) {
    return new ql(this, e52)
  }
}
H(`PlacedSymbolArray`, Jl)
var Yl = class extends vl {
  get anchorX() {
    return this._structArray.int16[this._pos2 + 0]
  }
  get anchorY() {
    return this._structArray.int16[this._pos2 + 1]
  }
  get rightJustifiedTextSymbolIndex() {
    return this._structArray.int16[this._pos2 + 2]
  }
  get centerJustifiedTextSymbolIndex() {
    return this._structArray.int16[this._pos2 + 3]
  }
  get leftJustifiedTextSymbolIndex() {
    return this._structArray.int16[this._pos2 + 4]
  }
  get verticalPlacedTextSymbolIndex() {
    return this._structArray.int16[this._pos2 + 5]
  }
  get placedIconSymbolIndex() {
    return this._structArray.int16[this._pos2 + 6]
  }
  get verticalPlacedIconSymbolIndex() {
    return this._structArray.int16[this._pos2 + 7]
  }
  get key() {
    return this._structArray.uint16[this._pos2 + 8]
  }
  get textBoxStartIndex() {
    return this._structArray.uint16[this._pos2 + 9]
  }
  get textBoxEndIndex() {
    return this._structArray.uint16[this._pos2 + 10]
  }
  get verticalTextBoxStartIndex() {
    return this._structArray.uint16[this._pos2 + 11]
  }
  get verticalTextBoxEndIndex() {
    return this._structArray.uint16[this._pos2 + 12]
  }
  get iconBoxStartIndex() {
    return this._structArray.uint16[this._pos2 + 13]
  }
  get iconBoxEndIndex() {
    return this._structArray.uint16[this._pos2 + 14]
  }
  get verticalIconBoxStartIndex() {
    return this._structArray.uint16[this._pos2 + 15]
  }
  get verticalIconBoxEndIndex() {
    return this._structArray.uint16[this._pos2 + 16]
  }
  get featureIndex() {
    return this._structArray.uint16[this._pos2 + 17]
  }
  get numHorizontalGlyphVertices() {
    return this._structArray.uint16[this._pos2 + 18]
  }
  get numVerticalGlyphVertices() {
    return this._structArray.uint16[this._pos2 + 19]
  }
  get numIconVertices() {
    return this._structArray.uint16[this._pos2 + 20]
  }
  get numVerticalIconVertices() {
    return this._structArray.uint16[this._pos2 + 21]
  }
  get useRuntimeCollisionCircles() {
    return this._structArray.uint16[this._pos2 + 22]
  }
  get crossTileID() {
    return this._structArray.uint32[this._pos4 + 12]
  }
  set crossTileID(e52) {
    this._structArray.uint32[this._pos4 + 12] = e52
  }
  get textBoxScale() {
    return this._structArray.float32[this._pos4 + 13]
  }
  get collisionCircleDiameter() {
    return this._structArray.float32[this._pos4 + 14]
  }
  get textAnchorOffsetStartIndex() {
    return this._structArray.uint16[this._pos2 + 30]
  }
  get textAnchorOffsetEndIndex() {
    return this._structArray.uint16[this._pos2 + 31]
  }
  get heightOffset() {
    return this._structArray.float32[this._pos4 + 16]
  }
}
Yl.prototype.size = 68
var Xl = class extends Rl {
  get(e52) {
    return new Yl(this, e52)
  }
}
H(`SymbolInstanceArray`, Xl)
var Zl = class extends zl {
  getoffsetX(e52) {
    return this.float32[e52 * 1 + 0]
  }
}
H(`GlyphOffsetArray`, Zl)
var Ql = class extends Sl {
  getx(e52) {
    return this.int16[e52 * 3 + 0]
  }
  gety(e52) {
    return this.int16[e52 * 3 + 1]
  }
  gettileUnitDistanceFromAnchor(e52) {
    return this.int16[e52 * 3 + 2]
  }
}
H(`SymbolLineVertexArray`, Ql)
var $l = class extends vl {
  get textAnchor() {
    return this._structArray.uint16[this._pos2 + 0]
  }
  get textOffset0() {
    return this._structArray.float32[this._pos4 + 1]
  }
  get textOffset1() {
    return this._structArray.float32[this._pos4 + 2]
  }
}
$l.prototype.size = 12
var eu = class extends Bl {
  get(e52) {
    return new $l(this, e52)
  }
}
H(`TextAnchorOffsetArray`, eu)
var tu = class extends vl {
  get featureIndex() {
    return this._structArray.uint32[this._pos4 + 0]
  }
  get sourceLayerIndex() {
    return this._structArray.uint16[this._pos2 + 2]
  }
  get bucketIndex() {
    return this._structArray.uint16[this._pos2 + 3]
  }
}
tu.prototype.size = 8
var nu = class extends Vl {
  get(e52) {
    return new tu(this, e52)
  }
}
H(`FeatureIndexArray`, nu)
var ru = class extends xl {},
  iu = class extends Sl {},
  au = class extends Cl {},
  ou = class extends xl {},
  su = class extends xl {},
  cu = class extends wl {},
  lu = class extends Tl {},
  uu = class extends El {},
  du = class extends Dl {},
  fu = class extends Ol {},
  pu = class extends kl {},
  mu = class extends Al {},
  hu = class extends jl {},
  gu = class extends Nl {},
  _u = class extends Pl {},
  vu = class extends Fl {},
  yu = class extends Il {},
  bu = class extends Il {},
  xu = class extends Hl {},
  Su = class extends Ul {}
const Cu = q([{name: `a_pos`, components: 2, type: `Int16`}], 4),
  wu = Cu.members
;(Cu.size, Cu.alignment)
var Tu = class e38 {
  constructor(e52 = []) {
    ;((this._forceNewSegmentOnNextPrepare = false), (this.segments = e52))
  }
  prepareSegment(t2, n2, r2, i2) {
    let a2 = this.segments[this.segments.length - 1]
    return (
      t2 > e38.MAX_VERTEX_ARRAY_LENGTH &&
        It(
          `Max vertices per segment is ${e38.MAX_VERTEX_ARRAY_LENGTH}: bucket requested ${t2}. Consider using the \`fillLargeMeshArrays\` function if you require meshes with more than ${e38.MAX_VERTEX_ARRAY_LENGTH} vertices.`
        ),
      this._forceNewSegmentOnNextPrepare ||
      !a2 ||
      a2.vertexLength + t2 > e38.MAX_VERTEX_ARRAY_LENGTH ||
      a2.sortKey !== i2
        ? this.createNewSegment(n2, r2, i2)
        : a2
    )
  }
  createNewSegment(e52, t2, n2) {
    let r2 = {
      vertexOffset: e52.length,
      primitiveOffset: t2.length,
      vertexLength: 0,
      primitiveLength: 0,
      vaos: {},
    }
    return (
      n2 !== void 0 && (r2.sortKey = n2),
      (this._forceNewSegmentOnNextPrepare = false),
      this.segments.push(r2),
      r2
    )
  }
  getOrCreateLatestSegment(e52, t2, n2) {
    return this.prepareSegment(0, e52, t2, n2)
  }
  forceNewSegmentOnNextPrepare() {
    this._forceNewSegmentOnNextPrepare = true
  }
  get() {
    return this.segments
  }
  destroy() {
    for (let e52 of this.segments)
      for (let t2 in e52.vaos) e52.vaos[t2].destroy()
  }
  static simpleSegment(t2, n2, r2, i2) {
    return new e38([
      {
        vertexOffset: t2,
        primitiveOffset: n2,
        vertexLength: r2,
        primitiveLength: i2,
        vaos: {},
        sortKey: 0,
      },
    ])
  }
}
;((Tu.MAX_VERTEX_ARRAY_LENGTH = 2 ** 16 - 1), H(`SegmentVector`, Tu))
function Eu(e52, t2) {
  return (
    (e52 = bt(Math.floor(e52), 0, 255)),
    (t2 = bt(Math.floor(t2), 0, 255)),
    256 * e52 + t2
  )
}
const Du = q([
    {name: `a_pattern_from`, components: 4, type: `Uint16`},
    {name: `a_pattern_to`, components: 4, type: `Uint16`},
    {name: `a_pixel_ratio_from`, components: 1, type: `Uint16`},
    {name: `a_pixel_ratio_to`, components: 1, type: `Uint16`},
  ]),
  Ou = q([
    {name: `a_dasharray_from`, components: 4, type: `Uint16`},
    {name: `a_dasharray_to`, components: 4, type: `Uint16`},
  ])
var ku = o((e52, t2) => {
    function n2(e53, t3) {
      for (
        var n3 = e53.length & 3,
          r2 = e53.length - n3,
          i2 = t3,
          a2,
          o2 = 3432918353,
          s2 = 461845907,
          c2,
          l2 = 0;
        l2 < r2;
      )
        ((c2 =
          (e53.charCodeAt(l2) & 255) |
          ((e53.charCodeAt(++l2) & 255) << 8) |
          ((e53.charCodeAt(++l2) & 255) << 16) |
          ((e53.charCodeAt(++l2) & 255) << 24)),
          ++l2,
          (c2 =
            ((c2 & 65535) * o2 + ((((c2 >>> 16) * o2) & 65535) << 16)) &
            4294967295),
          (c2 = (c2 << 15) | (c2 >>> 17)),
          (c2 =
            ((c2 & 65535) * s2 + ((((c2 >>> 16) * s2) & 65535) << 16)) &
            4294967295),
          (i2 ^= c2),
          (i2 = (i2 << 13) | (i2 >>> 19)),
          (a2 =
            ((i2 & 65535) * 5 + ((((i2 >>> 16) * 5) & 65535) << 16)) &
            4294967295),
          (i2 = (a2 & 65535) + 27492 + ((((a2 >>> 16) + 58964) & 65535) << 16)))
      switch (((c2 = 0), n3)) {
        case 3:
          c2 ^= (e53.charCodeAt(l2 + 2) & 255) << 16
        case 2:
          c2 ^= (e53.charCodeAt(l2 + 1) & 255) << 8
        case 1:
          ;((c2 ^= e53.charCodeAt(l2) & 255),
            (c2 =
              ((c2 & 65535) * o2 + ((((c2 >>> 16) * o2) & 65535) << 16)) &
              4294967295),
            (c2 = (c2 << 15) | (c2 >>> 17)),
            (c2 =
              ((c2 & 65535) * s2 + ((((c2 >>> 16) * s2) & 65535) << 16)) &
              4294967295),
            (i2 ^= c2))
      }
      return (
        (i2 ^= e53.length),
        (i2 ^= i2 >>> 16),
        (i2 =
          ((i2 & 65535) * 2246822507 +
            ((((i2 >>> 16) * 2246822507) & 65535) << 16)) &
          4294967295),
        (i2 ^= i2 >>> 13),
        (i2 =
          ((i2 & 65535) * 3266489909 +
            ((((i2 >>> 16) * 3266489909) & 65535) << 16)) &
          4294967295),
        (i2 ^= i2 >>> 16),
        i2 >>> 0
      )
    }
    t2 !== void 0 && (t2.exports = n2)
  }),
  Au = o((e52, t2) => {
    function n2(e53, t3) {
      for (var n3 = e53.length, r2 = t3 ^ n3, i2 = 0, a2; n3 >= 4;)
        ((a2 =
          (e53.charCodeAt(i2) & 255) |
          ((e53.charCodeAt(++i2) & 255) << 8) |
          ((e53.charCodeAt(++i2) & 255) << 16) |
          ((e53.charCodeAt(++i2) & 255) << 24)),
          (a2 =
            (a2 & 65535) * 1540483477 +
            ((((a2 >>> 16) * 1540483477) & 65535) << 16)),
          (a2 ^= a2 >>> 24),
          (a2 =
            (a2 & 65535) * 1540483477 +
            ((((a2 >>> 16) * 1540483477) & 65535) << 16)),
          (r2 =
            ((r2 & 65535) * 1540483477 +
              ((((r2 >>> 16) * 1540483477) & 65535) << 16)) ^
            a2),
          (n3 -= 4),
          ++i2)
      switch (n3) {
        case 3:
          r2 ^= (e53.charCodeAt(i2 + 2) & 255) << 16
        case 2:
          r2 ^= (e53.charCodeAt(i2 + 1) & 255) << 8
        case 1:
          ;((r2 ^= e53.charCodeAt(i2) & 255),
            (r2 =
              (r2 & 65535) * 1540483477 +
              ((((r2 >>> 16) * 1540483477) & 65535) << 16)))
      }
      return (
        (r2 ^= r2 >>> 13),
        (r2 =
          (r2 & 65535) * 1540483477 +
          ((((r2 >>> 16) * 1540483477) & 65535) << 16)),
        (r2 ^= r2 >>> 15),
        r2 >>> 0
      )
    }
    t2.exports = n2
  }),
  ju = c(
    o((e52, t2) => {
      var n2 = ku(),
        r2 = Au()
      ;((t2.exports = n2), (t2.exports.murmur3 = n2), (t2.exports.murmur2 = r2))
    })(),
    1
  ),
  Mu = class e39 {
    constructor() {
      ;((this.ids = []), (this.positions = []), (this.indexed = false))
    }
    add(e52, t2, n2, r2) {
      ;(this.ids.push(Nu(e52)), this.positions.push(t2, n2, r2))
    }
    getPositions(e52) {
      if (!this.indexed)
        throw Error(
          `Trying to get index, but feature positions are not indexed`
        )
      let t2 = Nu(e52),
        n2 = 0,
        r2 = this.ids.length - 1
      for (; n2 < r2;) {
        let e53 = (n2 + r2) >> 1
        this.ids[e53] >= t2 ? (r2 = e53) : (n2 = e53 + 1)
      }
      let i2 = []
      for (; this.ids[n2] === t2;) {
        let e53 = this.positions[3 * n2],
          t3 = this.positions[3 * n2 + 1],
          r3 = this.positions[3 * n2 + 2]
        ;(i2.push({index: e53, start: t3, end: r3}), n2++)
      }
      return i2
    }
    static serialize(e52, t2) {
      let n2 = new Float64Array(e52.ids),
        r2 = new Uint32Array(e52.positions)
      return (
        Pu(n2, r2, 0, n2.length - 1),
        t2 && t2.push(n2.buffer, r2.buffer),
        {ids: n2, positions: r2}
      )
    }
    static deserialize(t2) {
      let n2 = new e39()
      return (
        (n2.ids = t2.ids),
        (n2.positions = t2.positions),
        (n2.indexed = true),
        n2
      )
    }
  }
function Nu(e52) {
  let t2 = +e52
  return !isNaN(t2) && t2 <= 2 ** 53 - 1 ? t2 : (0, ju.default)(String(e52))
}
function Pu(e52, t2, n2, r2) {
  for (; n2 < r2;) {
    let i2 = e52[(n2 + r2) >> 1],
      a2 = n2 - 1,
      o2 = r2 + 1
    for (;;) {
      do a2++
      while (e52[a2] < i2)
      do o2--
      while (e52[o2] > i2)
      if (a2 >= o2) break
      ;(Fu(e52, a2, o2),
        Fu(t2, 3 * a2, 3 * o2),
        Fu(t2, 3 * a2 + 1, 3 * o2 + 1),
        Fu(t2, 3 * a2 + 2, 3 * o2 + 2))
    }
    o2 - n2 < r2 - o2
      ? (Pu(e52, t2, n2, o2), (n2 = o2 + 1))
      : (Pu(e52, t2, o2 + 1, r2), (r2 = o2))
  }
}
function Fu(e52, t2, n2) {
  let r2 = e52[t2]
  ;((e52[t2] = e52[n2]), (e52[n2] = r2))
}
H(`FeaturePositionMap`, Mu)
var Iu = class {
    constructor(e52, t2) {
      ;((this.gl = e52.gl), (this.location = t2))
    }
  },
  Lu = class extends Iu {
    constructor(e52, t2) {
      ;(super(e52, t2), (this.current = 0))
    }
    set(e52) {
      this.current !== e52 &&
        ((this.current = e52), this.gl.uniform1i(this.location, e52))
    }
  },
  Ru = class extends Iu {
    constructor(e52, t2) {
      ;(super(e52, t2), (this.current = 0))
    }
    set(e52) {
      this.current !== e52 &&
        ((this.current = e52), this.gl.uniform1f(this.location, e52))
    }
  },
  zu = class extends Iu {
    constructor(e52, t2) {
      ;(super(e52, t2), (this.current = [0, 0]))
    }
    set(e52) {
      ;(e52[0] !== this.current[0] || e52[1] !== this.current[1]) &&
        ((this.current = e52), this.gl.uniform2f(this.location, e52[0], e52[1]))
    }
  },
  Bu = class extends Iu {
    constructor(e52, t2) {
      ;(super(e52, t2), (this.current = [0, 0, 0]))
    }
    set(e52) {
      ;(e52[0] !== this.current[0] ||
        e52[1] !== this.current[1] ||
        e52[2] !== this.current[2]) &&
        ((this.current = e52),
        this.gl.uniform3f(this.location, e52[0], e52[1], e52[2]))
    }
  },
  Vu = class extends Iu {
    constructor(e52, t2) {
      ;(super(e52, t2), (this.current = [0, 0, 0, 0]))
    }
    set(e52) {
      ;(e52[0] !== this.current[0] ||
        e52[1] !== this.current[1] ||
        e52[2] !== this.current[2] ||
        e52[3] !== this.current[3]) &&
        ((this.current = e52),
        this.gl.uniform4f(this.location, e52[0], e52[1], e52[2], e52[3]))
    }
  },
  Hu = class extends Iu {
    constructor(e52, t2) {
      ;(super(e52, t2), (this.current = z.transparent))
    }
    set(e52) {
      ;(e52.r !== this.current.r ||
        e52.g !== this.current.g ||
        e52.b !== this.current.b ||
        e52.a !== this.current.a) &&
        ((this.current = e52),
        this.gl.uniform4f(this.location, e52.r, e52.g, e52.b, e52.a))
    }
  },
  Uu = class extends Iu {
    constructor(e52, t2) {
      ;(super(e52, t2), (this.current = []))
    }
    set(e52) {
      if (e52 != this.current) {
        this.current = e52
        let t2 = new Float32Array(e52.length * 4)
        for (let n2 = 0; n2 < e52.length; n2++)
          ((t2[4 * n2] = e52[n2].r),
            (t2[4 * n2 + 1] = e52[n2].g),
            (t2[4 * n2 + 2] = e52[n2].b),
            (t2[4 * n2 + 3] = e52[n2].a))
        this.gl.uniform4fv(this.location, t2)
      }
    }
  },
  Wu = class extends Iu {
    constructor(e52, t2) {
      ;(super(e52, t2), (this.current = []))
    }
    set(e52) {
      if (e52 != this.current) {
        this.current = e52
        let t2 = new Float32Array(e52)
        this.gl.uniform1fv(this.location, t2)
      }
    }
  }
const Gu = new Float32Array(16)
var Ku = class extends Iu {
  constructor(e52, t2) {
    ;(super(e52, t2), (this.current = Gu))
  }
  set(e52) {
    if (e52[12] !== this.current[12] || e52[0] !== this.current[0]) {
      ;((this.current = e52),
        this.gl.uniformMatrix4fv(this.location, false, e52))
      return
    }
    for (let t2 = 1; t2 < 16; t2++)
      if (e52[t2] !== this.current[t2]) {
        ;((this.current = e52),
          this.gl.uniformMatrix4fv(this.location, false, e52))
        break
      }
  }
}
function qu(e52) {
  return [Eu(255 * e52.r, 255 * e52.g), Eu(255 * e52.b, 255 * e52.a)]
}
var Ju = class {
    constructor(e52, t2, n2) {
      ;((this.value = e52),
        (this.uniformNames = t2.map(e53 => `u_${e53}`)),
        (this.type = n2))
    }
    setUniform(e52, t2, n2) {
      e52.set(n2.constantOr(this.value))
    }
    getBinding(e52, t2, n2) {
      return this.type === `color` ? new Hu(e52, t2) : new Ru(e52, t2)
    }
  },
  Yu = class {
    constructor(e52, t2) {
      ;((this.uniformNames = t2.map(e53 => `u_${e53}`)),
        (this.patternFrom = null),
        (this.patternTo = null),
        (this.pixelRatioFrom = 1),
        (this.pixelRatioTo = 1))
    }
    setConstantPatternPositions(e52, t2) {
      ;((this.pixelRatioFrom = t2.pixelRatio),
        (this.pixelRatioTo = e52.pixelRatio),
        (this.patternFrom = t2.tlbr),
        (this.patternTo = e52.tlbr))
    }
    setConstantDashPositions(e52, t2) {
      ;((this.dashTo = [0, e52.y, e52.height, e52.width]),
        (this.dashFrom = [0, t2.y, t2.height, t2.width]))
    }
    setUniform(e52, t2, n2, r2) {
      let i2 = null
      ;(r2 === `u_pattern_to`
        ? (i2 = this.patternTo)
        : r2 === `u_pattern_from`
          ? (i2 = this.patternFrom)
          : r2 === `u_dasharray_to`
            ? (i2 = this.dashTo)
            : r2 === `u_dasharray_from`
              ? (i2 = this.dashFrom)
              : r2 === `u_pixel_ratio_to`
                ? (i2 = this.pixelRatioTo)
                : r2 === `u_pixel_ratio_from` && (i2 = this.pixelRatioFrom),
        i2 !== null && e52.set(i2))
    }
    getBinding(e52, t2, n2) {
      return n2.startsWith(`u_pattern`) || n2.startsWith(`u_dasharray_`)
        ? new Vu(e52, t2)
        : new Ru(e52, t2)
    }
  },
  Xu = class {
    constructor(e52, t2, n2, r2) {
      ;((this.expression = e52),
        (this.type = n2),
        (this.maxValue = 0),
        (this.paintVertexAttributes = t2.map(e53 => ({
          name: `a_${e53}`,
          type: `Float32`,
          components: n2 === `color` ? 2 : 1,
          offset: 0,
        }))),
        (this.paintVertexArray = new r2()))
    }
    populatePaintArray(e52, t2, n2) {
      let r2 = this.paintVertexArray.length,
        i2 = this.expression.evaluate(
          new U(0, n2),
          t2,
          {},
          n2.canonical,
          [],
          n2.formattedSection
        )
      ;(this.paintVertexArray.resize(e52), this._setPaintValue(r2, e52, i2))
    }
    updatePaintArray(e52, t2, n2, r2, i2) {
      let a2 = this.expression.evaluate(new U(0, i2), n2, r2)
      this._setPaintValue(e52, t2, a2)
    }
    _setPaintValue(e52, t2, n2) {
      if (this.type === `color`) {
        let r2 = qu(n2)
        for (let n3 = e52; n3 < t2; n3++)
          this.paintVertexArray.emplace(n3, r2[0], r2[1])
      } else {
        for (let r2 = e52; r2 < t2; r2++) this.paintVertexArray.emplace(r2, n2)
        this.maxValue = Math.max(this.maxValue, Math.abs(n2))
      }
    }
    upload(e52) {
      this.paintVertexArray?.arrayBuffer.byteLength &&
        (this.paintVertexBuffer?.buffer
          ? this.paintVertexBuffer.updateData(this.paintVertexArray)
          : (this.paintVertexBuffer = e52.createVertexBuffer(
              this.paintVertexArray,
              this.paintVertexAttributes,
              this.expression.isStateDependent
            )))
    }
    destroy() {
      this.paintVertexBuffer && this.paintVertexBuffer.destroy()
    }
  },
  Zu = class {
    constructor(e52, t2, n2, r2, i2, a2) {
      ;((this.expression = e52),
        (this.uniformNames = t2.map(e53 => `u_${e53}_t`)),
        (this.type = n2),
        (this.useIntegerZoom = r2),
        (this.zoom = i2),
        (this.maxValue = 0),
        (this.paintVertexAttributes = t2.map(e53 => ({
          name: `a_${e53}`,
          type: `Float32`,
          components: n2 === `color` ? 4 : 2,
          offset: 0,
        }))),
        (this.paintVertexArray = new a2()))
    }
    populatePaintArray(e52, t2, n2) {
      let r2 = this.expression.evaluate(
          new U(this.zoom, n2),
          t2,
          {},
          n2.canonical,
          [],
          n2.formattedSection
        ),
        i2 = this.expression.evaluate(
          new U(this.zoom + 1, n2),
          t2,
          {},
          n2.canonical,
          [],
          n2.formattedSection
        ),
        a2 = this.paintVertexArray.length
      ;(this.paintVertexArray.resize(e52), this._setPaintValue(a2, e52, r2, i2))
    }
    updatePaintArray(e52, t2, n2, r2, i2) {
      let a2 = this.expression.evaluate(new U(this.zoom, i2), n2, r2),
        o2 = this.expression.evaluate(new U(this.zoom + 1, i2), n2, r2)
      this._setPaintValue(e52, t2, a2, o2)
    }
    _setPaintValue(e52, t2, n2, r2) {
      if (this.type === `color`) {
        let i2 = qu(n2),
          a2 = qu(r2)
        for (let n3 = e52; n3 < t2; n3++)
          this.paintVertexArray.emplace(n3, i2[0], i2[1], a2[0], a2[1])
      } else {
        for (let i2 = e52; i2 < t2; i2++)
          this.paintVertexArray.emplace(i2, n2, r2)
        this.maxValue = Math.max(this.maxValue, Math.abs(n2), Math.abs(r2))
      }
    }
    upload(e52) {
      this.paintVertexArray?.arrayBuffer.byteLength &&
        (this.paintVertexBuffer?.buffer
          ? this.paintVertexBuffer.updateData(this.paintVertexArray)
          : (this.paintVertexBuffer = e52.createVertexBuffer(
              this.paintVertexArray,
              this.paintVertexAttributes,
              this.expression.isStateDependent
            )))
    }
    destroy() {
      this.paintVertexBuffer && this.paintVertexBuffer.destroy()
    }
    setUniform(e52, t2) {
      let n2 = this.useIntegerZoom ? Math.floor(t2.zoom) : t2.zoom,
        r2 = bt(
          this.expression.interpolationFactor(n2, this.zoom, this.zoom + 1),
          0,
          1
        )
      e52.set(r2)
    }
    getBinding(e52, t2, n2) {
      return new Ru(e52, t2)
    }
  },
  Qu = class {
    constructor(e52, t2, n2, r2, i2, a2) {
      ;((this.expression = e52),
        (this.type = t2),
        (this.useIntegerZoom = n2),
        (this.zoom = r2),
        (this.layerId = a2),
        (this.zoomInPaintVertexArray = new i2()),
        (this.zoomOutPaintVertexArray = new i2()))
    }
    populatePaintArray(e52, t2, n2) {
      let r2 = this.zoomInPaintVertexArray.length
      ;(this.zoomInPaintVertexArray.resize(e52),
        this.zoomOutPaintVertexArray.resize(e52),
        this._setPaintValues(r2, e52, this.getPositionIds(t2), n2))
    }
    updatePaintArray(e52, t2, n2, r2, i2) {
      this._setPaintValues(e52, t2, this.getPositionIds(n2), i2)
    }
    _setPaintValues(e52, t2, n2, r2) {
      let i2 = this.getPositions(r2)
      if (!i2 || !n2) return
      let a2 = i2[n2.min],
        o2 = i2[n2.mid],
        s2 = i2[n2.max]
      if (!(!a2 || !o2 || !s2))
        for (let n3 = e52; n3 < t2; n3++)
          (this.emplace(this.zoomInPaintVertexArray, n3, a2, o2),
            this.emplace(this.zoomOutPaintVertexArray, n3, s2, o2))
    }
    upload(e52) {
      if (
        this.zoomInPaintVertexArray?.arrayBuffer.byteLength &&
        this.zoomOutPaintVertexArray?.arrayBuffer.byteLength
      ) {
        let t2 = this.getVertexAttributes()
        ;((this.zoomInPaintVertexBuffer = e52.createVertexBuffer(
          this.zoomInPaintVertexArray,
          t2,
          this.expression.isStateDependent
        )),
          (this.zoomOutPaintVertexBuffer = e52.createVertexBuffer(
            this.zoomOutPaintVertexArray,
            t2,
            this.expression.isStateDependent
          )))
      }
    }
    destroy() {
      ;(this.zoomOutPaintVertexBuffer &&
        this.zoomOutPaintVertexBuffer.destroy(),
        this.zoomInPaintVertexBuffer && this.zoomInPaintVertexBuffer.destroy())
    }
  },
  $u = class extends Qu {
    getPositions(e52) {
      return e52.imagePositions
    }
    getPositionIds(e52) {
      return e52.patterns?.[this.layerId]
    }
    getVertexAttributes() {
      return Du.members
    }
    emplace(e52, t2, n2, r2) {
      e52.emplace(
        t2,
        n2.tlbr[0],
        n2.tlbr[1],
        n2.tlbr[2],
        n2.tlbr[3],
        r2.tlbr[0],
        r2.tlbr[1],
        r2.tlbr[2],
        r2.tlbr[3],
        n2.pixelRatio,
        r2.pixelRatio
      )
    }
  },
  ed = class extends Qu {
    getPositions(e52) {
      return e52.dashPositions
    }
    getPositionIds(e52) {
      return e52.dashes?.[this.layerId]
    }
    getVertexAttributes() {
      return Ou.members
    }
    emplace(e52, t2, n2, r2) {
      e52.emplace(
        t2,
        0,
        n2.y,
        n2.height,
        n2.width,
        0,
        r2.y,
        r2.height,
        r2.width
      )
    }
  },
  td = class {
    constructor(e52, t2, n2) {
      ;((this.binders = {}), (this._buffers = []))
      let r2 = []
      for (let i2 in e52.paint._values) {
        if (!n2(i2)) continue
        let a2 = e52.paint.get(i2)
        if (!(a2 instanceof tl) || !fo(a2.property.specification)) continue
        let o2 = rd(i2, e52.type),
          s2 = a2.value,
          c2 = a2.property.specification.type,
          l2 = a2.property.useIntegerZoom,
          u2 = a2.property.specification[`property-type`],
          d2 = u2 === `cross-faded` || u2 === `cross-faded-data-driven`
        if (s2.kind === `constant`)
          ((this.binders[i2] = d2
            ? new Yu(s2.value, o2)
            : new Ju(s2.value, o2, c2)),
            r2.push(`/u_${i2}`))
        else if (s2.kind === `source` || d2) {
          let n3 = ad(i2, c2, `source`)
          ;((this.binders[i2] = d2
            ? i2 === `line-dasharray`
              ? new ed(s2, c2, l2, t2, n3, e52.id)
              : new $u(s2, c2, l2, t2, n3, e52.id)
            : new Xu(s2, o2, c2, n3)),
            r2.push(`/a_${i2}`))
        } else {
          let e53 = ad(i2, c2, `composite`)
          ;((this.binders[i2] = new Zu(s2, o2, c2, l2, t2, e53)),
            r2.push(`/z_${i2}`))
        }
      }
      this.cacheKey = r2.sort().join(``)
    }
    getMaxValue(e52) {
      let t2 = this.binders[e52]
      return t2 instanceof Xu || t2 instanceof Zu ? t2.maxValue : 0
    }
    populatePaintArrays(e52, t2, n2) {
      for (let r2 in this.binders) {
        let i2 = this.binders[r2]
        ;(i2 instanceof Xu || i2 instanceof Zu || i2 instanceof Qu) &&
          i2.populatePaintArray(e52, t2, n2)
      }
    }
    setConstantPatternPositions(e52, t2) {
      for (let n2 in this.binders) {
        let r2 = this.binders[n2]
        r2 instanceof Yu && r2.setConstantPatternPositions(e52, t2)
      }
    }
    setConstantDashPositions(e52, t2) {
      for (let n2 in this.binders) {
        let r2 = this.binders[n2]
        r2 instanceof Yu && r2.setConstantDashPositions(e52, t2)
      }
    }
    updatePaintArrays(e52, t2, n2, r2, i2) {
      let a2 = false
      for (let o2 of e52) {
        let e53 = t2.getPositions(o2.id)
        for (let t3 of e53) {
          let e54 = n2.feature(t3.index)
          for (let n3 in this.binders) {
            let s2 = this.binders[n3]
            ;(s2 instanceof Xu || s2 instanceof Zu || s2 instanceof Qu) &&
              s2.expression.isStateDependent === true &&
              ((s2.expression = r2.paint.get(n3).value),
              s2.updatePaintArray(t3.start, t3.end, e54, o2.state, i2),
              (a2 = true))
          }
        }
      }
      return a2
    }
    defines() {
      let e52 = []
      for (let t2 in this.binders) {
        let n2 = this.binders[t2]
        ;(n2 instanceof Ju || n2 instanceof Yu) &&
          e52.push(...n2.uniformNames.map(e53 => `#define HAS_UNIFORM_${e53}`))
      }
      return e52
    }
    getBinderAttributes() {
      let e52 = []
      for (let t2 in this.binders) {
        let n2 = this.binders[t2]
        if (n2 instanceof Xu || n2 instanceof Zu)
          for (let t3 of n2.paintVertexAttributes) e52.push(t3.name)
        else if (n2 instanceof Qu) {
          let t3 = n2.getVertexAttributes()
          for (let n3 of t3) e52.push(n3.name)
        }
      }
      return e52
    }
    getBinderUniforms() {
      let e52 = []
      for (let t2 in this.binders) {
        let n2 = this.binders[t2]
        if (n2 instanceof Ju || n2 instanceof Yu || n2 instanceof Zu)
          for (let t3 of n2.uniformNames) e52.push(t3)
      }
      return e52
    }
    getPaintVertexBuffers() {
      return this._buffers
    }
    getUniforms(e52, t2) {
      let n2 = []
      for (let r2 in this.binders) {
        let i2 = this.binders[r2]
        if (i2 instanceof Ju || i2 instanceof Yu || i2 instanceof Zu) {
          for (let a2 of i2.uniformNames)
            if (t2[a2]) {
              let o2 = i2.getBinding(e52, t2[a2], a2)
              n2.push({name: a2, property: r2, binding: o2})
            }
        }
      }
      return n2
    }
    setUniforms(e52, t2, n2, r2) {
      for (let {name: e53, property: i2, binding: a2} of t2)
        this.binders[i2].setUniform(a2, r2, n2.get(i2), e53)
    }
    updatePaintBuffers(e52) {
      this._buffers = []
      for (let t2 in this.binders) {
        let n2 = this.binders[t2]
        if (e52 && n2 instanceof Qu) {
          let t3 =
            e52.fromScale === 2
              ? n2.zoomInPaintVertexBuffer
              : n2.zoomOutPaintVertexBuffer
          t3 && this._buffers.push(t3)
        } else
          (n2 instanceof Xu || n2 instanceof Zu) &&
            n2.paintVertexBuffer &&
            this._buffers.push(n2.paintVertexBuffer)
      }
    }
    upload(e52) {
      for (let t2 in this.binders) {
        let n2 = this.binders[t2]
        ;(n2 instanceof Xu || n2 instanceof Zu || n2 instanceof Qu) &&
          n2.upload(e52)
      }
      this.updatePaintBuffers()
    }
    destroy() {
      for (let e52 in this.binders) {
        let t2 = this.binders[e52]
        ;(t2 instanceof Xu || t2 instanceof Zu || t2 instanceof Qu) &&
          t2.destroy()
      }
    }
  },
  nd = class {
    constructor(e52, t2, n2 = () => true) {
      this.programConfigurations = {}
      for (let r2 of e52) this.programConfigurations[r2.id] = new td(r2, t2, n2)
      ;((this.needsUpload = false),
        (this._featureMap = new Mu()),
        (this._bufferOffset = 0))
    }
    populatePaintArrays(e52, t2, n2, r2) {
      for (let n3 in this.programConfigurations)
        this.programConfigurations[n3].populatePaintArrays(e52, t2, r2)
      ;(t2.id !== void 0 &&
        this._featureMap.add(t2.id, n2, this._bufferOffset, e52),
        (this._bufferOffset = e52),
        (this.needsUpload = true))
    }
    updatePaintArrays(e52, t2, n2, r2) {
      for (let i2 of n2)
        this.needsUpload =
          this.programConfigurations[i2.id].updatePaintArrays(
            e52,
            this._featureMap,
            t2,
            i2,
            r2
          ) || this.needsUpload
    }
    get(e52) {
      return this.programConfigurations[e52]
    }
    upload(e52) {
      if (this.needsUpload) {
        for (let t2 in this.programConfigurations)
          this.programConfigurations[t2].upload(e52)
        this.needsUpload = false
      }
    }
    destroy() {
      for (let e52 in this.programConfigurations)
        this.programConfigurations[e52].destroy()
    }
  }
function rd(e52, t2) {
  return (
    {
      "text-opacity": [`opacity`],
      "icon-opacity": [`opacity`],
      "text-color": [`fill_color`],
      "icon-color": [`fill_color`],
      "text-halo-color": [`halo_color`],
      "icon-halo-color": [`halo_color`],
      "text-halo-blur": [`halo_blur`],
      "icon-halo-blur": [`halo_blur`],
      "text-halo-width": [`halo_width`],
      "icon-halo-width": [`halo_width`],
      "line-gap-width": [`gapwidth`],
      "line-dasharray": [`dasharray_to`, `dasharray_from`],
      "line-pattern": [
        `pattern_to`,
        `pattern_from`,
        `pixel_ratio_to`,
        `pixel_ratio_from`,
      ],
      "fill-pattern": [
        `pattern_to`,
        `pattern_from`,
        `pixel_ratio_to`,
        `pixel_ratio_from`,
      ],
      "fill-extrusion-pattern": [
        `pattern_to`,
        `pattern_from`,
        `pixel_ratio_to`,
        `pixel_ratio_from`,
      ],
    }[e52] || [e52.replace(`${t2}-`, ``).replace(/-/g, `_`)]
  )
}
function id(e52) {
  return {
    "line-pattern": {source: du, composite: du},
    "fill-pattern": {source: du, composite: du},
    "fill-extrusion-pattern": {source: du, composite: du},
    "line-dasharray": {source: fu, composite: fu},
  }[e52]
}
function ad(e52, t2, n2) {
  let r2 = {
    color: {source: El, composite: Wl},
    number: {source: zl, composite: El},
  }
  return id(e52)?.[n2] || r2[t2][n2]
}
;(H(`ConstantBinder`, Ju),
  H(`CrossFadedConstantBinder`, Yu),
  H(`SourceExpressionBinder`, Xu),
  H(`CrossFadedPatternBinder`, $u),
  H(`CrossFadedDasharrayBinder`, ed),
  H(`CompositeExpressionBinder`, Zu),
  H(`ProgramConfiguration`, td, {omit: [`_buffers`]}),
  H(`ProgramConfigurationSet`, nd))
const od = 2 ** 14 - 1,
  sd = -od - 1
function cd(e52) {
  let t2 = j / e52.extent,
    n2 = e52.loadGeometry()
  for (let e53 of n2)
    for (let n3 of e53) {
      let e54 = Math.round(n3.x * t2),
        r2 = Math.round(n3.y * t2)
      ;((n3.x = bt(e54, sd, od)),
        (n3.y = bt(r2, sd, od)),
        (e54 < n3.x || e54 > n3.x + 1 || r2 < n3.y || r2 > n3.y + 1) &&
          It(
            `Geometry exceeds allowed extent, reduce your vector tile buffer size`
          ))
    }
  return n2
}
function ld(e52, t2) {
  return {
    type: e52.type,
    id: e52.id,
    properties: e52.properties,
    geometry: t2 ? cd(e52) : [],
  }
}
const ud = -32768
function dd(e52, t2, n2, r2, i2) {
  e52.emplaceBack(ud + t2 * 8 + r2, ud + n2 * 8 + i2)
}
var fd = class {
  constructor(e52) {
    ;((this.zoom = e52.zoom),
      (this.overscaling = e52.overscaling),
      (this.layers = e52.layers),
      (this.layerIds = this.layers.map(e53 => e53.id)),
      (this.index = e52.index),
      (this.hasDependencies = false),
      (this.layoutVertexArray = new ou()),
      (this.indexArray = new bu()),
      (this.segments = new Tu()),
      (this.programConfigurations = new nd(e52.layers, e52.zoom)),
      (this.stateDependentLayerIds = this.layers
        .filter(e53 => e53.isStateDependent())
        .map(e53 => e53.id)))
  }
  populate(e52, t2, n2) {
    let r2 = this.layers[0],
      i2 = [],
      a2 = null,
      o2 = false,
      s2 = r2.type === `heatmap`
    if (r2.type === `circle`) {
      let e53 = r2
      ;((a2 = e53.layout.get(`circle-sort-key`)),
        (o2 = !a2.isConstant()),
        (s2 ||= e53.paint.get(`circle-pitch-alignment`) === `map`))
    }
    let c2 = s2 ? t2.subdivisionGranularity.circle : 1,
      l2 = new U(this.zoom),
      u2 = this.layers[0]._featureFilter.needGeometry
    for (let {feature: t3, id: r3, index: s3, sourceLayerIndex: c3} of e52) {
      let e53 = ld(t3, u2)
      if (!this.layers[0]._featureFilter.filter(l2, e53, n2)) continue
      let d2 = o2 ? a2.evaluate(e53, {}, n2) : void 0,
        f2 = {
          id: r3,
          properties: t3.properties,
          type: t3.type,
          sourceLayerIndex: c3,
          index: s3,
          geometry: u2 ? e53.geometry : cd(t3),
          patterns: {},
          sortKey: d2,
        }
      i2.push(f2)
    }
    o2 && i2.sort((e53, t3) => e53.sortKey - t3.sortKey)
    for (let r3 of i2) {
      let {geometry: i3, index: a3, sourceLayerIndex: o3} = r3,
        s3 = e52[a3].feature
      ;(this.addFeature(r3, i3, a3, n2, c2),
        t2.featureIndex.insert(s3, i3, a3, o3, this.index))
    }
  }
  update(e52, t2, n2) {
    this.stateDependentLayers.length &&
      this.programConfigurations.updatePaintArrays(
        e52,
        t2,
        this.stateDependentLayers,
        {imagePositions: n2}
      )
  }
  isEmpty() {
    return this.layoutVertexArray.length === 0
  }
  uploadPending() {
    return !this.uploaded || this.programConfigurations.needsUpload
  }
  upload(e52) {
    ;(this.uploaded ||
      ((this.layoutVertexBuffer = e52.createVertexBuffer(
        this.layoutVertexArray,
        wu
      )),
      (this.indexBuffer = e52.createIndexBuffer(this.indexArray))),
      this.programConfigurations.upload(e52),
      (this.uploaded = true))
  }
  destroy() {
    this.layoutVertexBuffer &&
      (this.layoutVertexBuffer.destroy(),
      this.indexBuffer.destroy(),
      this.programConfigurations.destroy(),
      this.segments.destroy())
  }
  addFeature(e52, t2, n2, r2, i2 = 1) {
    let a2
    switch (i2) {
      case 1:
        a2 = [0, 7]
        break
      case 3:
        a2 = [0, 2, 5, 7]
        break
      case 5:
        a2 = [0, 1, 3, 4, 6, 7]
        break
      case 7:
        a2 = [0, 1, 2, 3, 4, 5, 6, 7]
        break
      default:
        throw Error(
          `Invalid circle bucket granularity: ${i2}; valid values are 1, 3, 5, 7.`
        )
    }
    let o2 = a2.length
    for (let n3 of t2)
      for (let t3 of n3) {
        let n4 = t3.x,
          r3 = t3.y
        if (n4 < 0 || n4 >= 8192 || r3 < 0 || r3 >= 8192) continue
        let i3 = this.segments.prepareSegment(
            o2 * o2,
            this.layoutVertexArray,
            this.indexArray,
            e52.sortKey
          ),
          s2 = i3.vertexLength
        for (let e53 = 0; e53 < o2; e53++)
          for (let t4 = 0; t4 < o2; t4++)
            dd(this.layoutVertexArray, n4, r3, a2[t4], a2[e53])
        for (let e53 = 0; e53 < o2 - 1; e53++)
          for (let t4 = 0; t4 < o2 - 1; t4++) {
            let n5 = s2 + e53 * o2 + t4,
              r4 = s2 + (e53 + 1) * o2 + t4
            ;(this.indexArray.emplaceBack(n5, r4 + 1, n5 + 1),
              this.indexArray.emplaceBack(n5, r4, r4 + 1))
          }
        ;((i3.vertexLength += o2 * o2),
          (i3.primitiveLength += (o2 - 1) * (o2 - 1) * 2))
      }
    this.programConfigurations.populatePaintArrays(
      this.layoutVertexArray.length,
      e52,
      n2,
      {imagePositions: {}, canonical: r2}
    )
  }
}
H(`CircleBucket`, fd, {omit: [`layers`]})
function pd(e52, t2) {
  for (let n2 of e52) if (Cd(t2, n2)) return true
  for (let n2 of t2) if (Cd(e52, n2)) return true
  return vd(e52, t2)
}
function md(e52, t2, n2) {
  return Cd(e52, t2) ? true : bd(t2, e52, n2)
}
function hd(e52, t2) {
  if (e52.length === 1) return Sd(t2, e52[0])
  for (let n2 of t2) for (let t3 of n2) if (Cd(e52, t3)) return true
  for (let n2 of e52) if (Sd(t2, n2)) return true
  for (let n2 of t2) if (vd(e52, n2)) return true
  return false
}
function gd(e52, t2, n2) {
  for (let r2 of t2) {
    if (e52.length >= 3) {
      for (let t3 of r2) if (Cd(e52, t3)) return true
    }
    if (_d(e52, r2, n2)) return true
  }
  return false
}
function _d(e52, t2, n2) {
  if (e52.length > 1) {
    if (vd(e52, t2)) return true
    for (let r2 of t2) if (bd(r2, e52, n2)) return true
  }
  for (let r2 of e52) if (bd(r2, t2, n2)) return true
  return false
}
function vd(e52, t2) {
  if (e52.length === 0 || t2.length === 0) return false
  for (let n2 = 0; n2 < e52.length - 1; n2++) {
    let r2 = e52[n2],
      i2 = e52[n2 + 1]
    for (let e53 = 0; e53 < t2.length - 1; e53++) {
      let n3 = t2[e53],
        a2 = t2[e53 + 1]
      if (yd(r2, i2, n3, a2)) return true
    }
  }
  return false
}
function yd(e52, t2, n2, r2) {
  return (
    Lt(e52, n2, r2) !== Lt(t2, n2, r2) && Lt(e52, t2, n2) !== Lt(e52, t2, r2)
  )
}
function bd(e52, t2, n2) {
  let r2 = n2 * n2
  if (t2.length === 1) return e52.distSqr(t2[0]) < r2
  for (let n3 = 1; n3 < t2.length; n3++) {
    let i2 = t2[n3 - 1],
      a2 = t2[n3]
    if (xd(e52, i2, a2) < r2) return true
  }
  return false
}
function xd(e52, t2, n2) {
  let r2 = t2.distSqr(n2)
  if (r2 === 0) return e52.distSqr(t2)
  let i2 =
    ((e52.x - t2.x) * (n2.x - t2.x) + (e52.y - t2.y) * (n2.y - t2.y)) / r2
  return i2 < 0
    ? e52.distSqr(t2)
    : i2 > 1
      ? e52.distSqr(n2)
      : e52.distSqr(n2.sub(t2)._mult(i2)._add(t2))
}
function Sd(e52, t2) {
  let n2 = false,
    r2,
    i2,
    a2
  for (let o2 of e52) {
    r2 = o2
    for (let e53 = 0, o3 = r2.length - 1; e53 < r2.length; o3 = e53++)
      ((i2 = r2[e53]),
        (a2 = r2[o3]),
        i2.y > t2.y != a2.y > t2.y &&
          t2.x < ((a2.x - i2.x) * (t2.y - i2.y)) / (a2.y - i2.y) + i2.x &&
          (n2 = !n2))
  }
  return n2
}
function Cd(e52, t2) {
  let n2 = false
  for (let r2 = 0, i2 = e52.length - 1; r2 < e52.length; i2 = r2++) {
    let a2 = e52[r2],
      o2 = e52[i2]
    a2.y > t2.y != o2.y > t2.y &&
      t2.x < ((o2.x - a2.x) * (t2.y - a2.y)) / (o2.y - a2.y) + a2.x &&
      (n2 = !n2)
  }
  return n2
}
function wd(e52, t2, n2, r2, i2) {
  for (let a3 of e52)
    if (t2 <= a3.x && n2 <= a3.y && r2 >= a3.x && i2 >= a3.y) return true
  let a2 = [new l(t2, n2), new l(t2, i2), new l(r2, i2), new l(r2, n2)]
  if (e52.length > 2) {
    for (let t3 of a2) if (Cd(e52, t3)) return true
  }
  for (let t3 = 0; t3 < e52.length - 1; t3++) {
    let n3 = e52[t3],
      r3 = e52[t3 + 1]
    if (Td(n3, r3, a2)) return true
  }
  return false
}
function Td(e52, t2, n2) {
  let r2 = n2[0],
    i2 = n2[2]
  if (
    (e52.x < r2.x && t2.x < r2.x) ||
    (e52.x > i2.x && t2.x > i2.x) ||
    (e52.y < r2.y && t2.y < r2.y) ||
    (e52.y > i2.y && t2.y > i2.y)
  )
    return false
  let a2 = Lt(e52, t2, n2[0])
  return (
    a2 !== Lt(e52, t2, n2[1]) ||
    a2 !== Lt(e52, t2, n2[2]) ||
    a2 !== Lt(e52, t2, n2[3])
  )
}
function Ed(e52, t2, n2) {
  let r2 = t2.paint.get(e52).value
  return r2.kind === `constant`
    ? r2.value
    : n2.programConfigurations.get(t2.id).getMaxValue(e52)
}
function Dd(e52) {
  return Math.sqrt(e52[0] * e52[0] + e52[1] * e52[1])
}
function Od(e52, t2, n2, r2, i2) {
  if (!t2[0] && !t2[1]) return e52
  let a2 = l.convert(t2)._mult(i2)
  n2 === `viewport` && a2._rotate(-r2)
  let o2 = []
  for (let t3 of e52) o2.push(t3.sub(a2))
  return o2
}
function kd(e52) {
  let t2 = []
  for (let n2 = 0; n2 < e52.length; n2++) {
    let r2 = e52[n2],
      i2 = t2.at(-1)
    ;(n2 === 0 || (i2 && !r2.equals(i2))) && t2.push(r2)
  }
  return t2
}
function Ad(e52, t2) {
  let n2 = []
  for (let r2 of e52) {
    let e53 = kd(r2),
      i2 = []
    for (let n3 = 0; n3 < e53.length; n3++) {
      let r3 = e53[n3],
        a2 = e53[n3 - 1],
        o2 = e53[n3 + 1],
        s2 = n3 === 0 ? new l(0, 0) : r3.sub(a2)._unit()._perp(),
        c2 = n3 === e53.length - 1 ? new l(0, 0) : o2.sub(r3)._unit()._perp(),
        u2 = s2._add(c2)._unit(),
        d2 = u2.x * c2.x + u2.y * c2.y
      ;(d2 !== 0 && u2._mult(1 / d2), i2.push(u2._mult(t2)._add(r3)))
    }
    n2.push(i2)
  }
  return n2
}
function jd({queryGeometry: e52, size: t2}, n2) {
  return md(e52, n2, t2)
}
function Md(
  {
    queryGeometry: e52,
    size: t2,
    transform: n2,
    unwrappedTileID: r2,
    getElevation: i2,
  },
  a2
) {
  return md(
    e52,
    a2,
    t2 *
      (n2.projectTileCoordinates(a2.x, a2.y, r2, i2?.(a2.x, a2.y))
        .signedDistanceFromCamera /
        n2.cameraToCenterDistance)
  )
}
function Nd(
  {
    queryGeometry: e52,
    size: t2,
    transform: n2,
    unwrappedTileID: r2,
    getElevation: i2,
  },
  a2
) {
  let o2 = n2.projectTileCoordinates(
      a2.x,
      a2.y,
      r2,
      i2?.(a2.x, a2.y)
    ).signedDistanceFromCamera,
    s2 = t2 * (n2.cameraToCenterDistance / o2)
  return md(e52, Id(a2, n2, r2, i2), s2)
}
function Pd(
  {
    queryGeometry: e52,
    size: t2,
    transform: n2,
    unwrappedTileID: r2,
    getElevation: i2,
  },
  a2
) {
  return md(e52, Id(a2, n2, r2, i2), t2)
}
function Fd(
  {
    queryGeometry: e52,
    size: t2,
    transform: n2,
    unwrappedTileID: r2,
    getElevation: i2,
    pitchAlignment: a2 = `map`,
    pitchScale: o2 = `map`,
  },
  s2
) {
  let c2 = a2 === `map` ? (o2 === `map` ? jd : Md) : o2 === `map` ? Nd : Pd,
    l2 = {
      queryGeometry: e52,
      size: t2,
      transform: n2,
      unwrappedTileID: r2,
      getElevation: i2,
    }
  for (let e53 of s2) for (let t3 of e53) if (c2(l2, t3)) return true
  return false
}
function Id(e52, t2, n2, r2) {
  let i2 = t2.projectTileCoordinates(e52.x, e52.y, n2, r2?.(e52.x, e52.y)).point
  return new l((i2.x * 0.5 + 0.5) * t2.width, (-i2.y * 0.5 + 0.5) * t2.height)
}
function Ld(e52, t2, n2, r2) {
  return e52.map(e53 => Id(e53, t2, n2, r2))
}
let Rd
const zd = () =>
  (Rd ||= new cl({
    "circle-sort-key": new G(
      M.layout_circle[`circle-sort-key`],
      `circle-sort-key`
    ),
  }))
let Bd
const Vd = () =>
  (Bd ||= new cl({
    "circle-radius": new G(M.paint_circle[`circle-radius`], `circle-radius`),
    "circle-color": new G(M.paint_circle[`circle-color`], `circle-color`),
    "circle-blur": new G(M.paint_circle[`circle-blur`], `circle-blur`),
    "circle-opacity": new G(M.paint_circle[`circle-opacity`], `circle-opacity`),
    "circle-translate": new W(
      M.paint_circle[`circle-translate`],
      `circle-translate`
    ),
    "circle-translate-anchor": new W(
      M.paint_circle[`circle-translate-anchor`],
      `circle-translate-anchor`
    ),
    "circle-pitch-scale": new W(
      M.paint_circle[`circle-pitch-scale`],
      `circle-pitch-scale`
    ),
    "circle-pitch-alignment": new W(
      M.paint_circle[`circle-pitch-alignment`],
      `circle-pitch-alignment`
    ),
    "circle-stroke-width": new G(
      M.paint_circle[`circle-stroke-width`],
      `circle-stroke-width`
    ),
    "circle-stroke-color": new G(
      M.paint_circle[`circle-stroke-color`],
      `circle-stroke-color`
    ),
    "circle-stroke-opacity": new G(
      M.paint_circle[`circle-stroke-opacity`],
      `circle-stroke-opacity`
    ),
  }))
var Hd = {
  get paint() {
    return Vd()
  },
  get layout() {
    return zd()
  },
}
const Ud = e52 => e52.type === `circle`
var Wd = class extends dl {
    constructor(e52, t2) {
      super(e52, Hd, t2)
    }
    createBucket(e52) {
      return new fd(e52)
    }
    queryRadius(e52) {
      let t2 = e52
      return (
        Ed(`circle-radius`, this, t2) +
        Ed(`circle-stroke-width`, this, t2) +
        Dd(this.paint.get(`circle-translate`))
      )
    }
    queryIntersectsFeature({
      queryGeometry: e52,
      feature: t2,
      featureState: n2,
      geometry: r2,
      transform: i2,
      pixelsToTileUnits: a2,
      unwrappedTileID: o2,
      getElevation: s2,
    }) {
      let c2 = Od(
          e52,
          this.paint.get(`circle-translate`),
          this.paint.get(`circle-translate-anchor`),
          -i2.bearingInRadians,
          a2
        ),
        l2 =
          this.paint.get(`circle-radius`).evaluate(t2, n2) +
          this.paint.get(`circle-stroke-width`).evaluate(t2, n2),
        u2 = this.paint.get(`circle-pitch-scale`),
        d2 = this.paint.get(`circle-pitch-alignment`),
        f2,
        p2
      return (
        d2 === `map`
          ? ((f2 = c2), (p2 = l2 * a2))
          : ((f2 = Ld(c2, i2, o2, s2)), (p2 = l2)),
        Fd(
          {
            queryGeometry: f2,
            size: p2,
            transform: i2,
            unwrappedTileID: o2,
            getElevation: s2,
            pitchAlignment: d2,
            pitchScale: u2,
          },
          r2
        )
      )
    }
  },
  Gd = class extends fd {}
H(`HeatmapBucket`, Gd, {omit: [`layers`]})
let Kd
const qd = () =>
  (Kd ||= new cl({
    "heatmap-radius": new G(
      M.paint_heatmap[`heatmap-radius`],
      `heatmap-radius`
    ),
    "heatmap-weight": new G(
      M.paint_heatmap[`heatmap-weight`],
      `heatmap-weight`
    ),
    "heatmap-intensity": new W(
      M.paint_heatmap[`heatmap-intensity`],
      `heatmap-intensity`
    ),
    "heatmap-color": new sl(M.paint_heatmap[`heatmap-color`], `heatmap-color`),
    "heatmap-opacity": new W(
      M.paint_heatmap[`heatmap-opacity`],
      `heatmap-opacity`
    ),
  }))
var Jd = {
  get paint() {
    return qd()
  },
}
function Yd(e52, {width: t2, height: n2}, r2, i2) {
  if (!i2) i2 = new Uint8Array(t2 * n2 * r2)
  else if (i2 instanceof Uint8ClampedArray) i2 = new Uint8Array(i2.buffer)
  else if (i2.length !== t2 * n2 * r2)
    throw RangeError(
      `mismatched image size. expected: ${i2.length} but got: ${t2 * n2 * r2}`
    )
  return ((e52.width = t2), (e52.height = n2), (e52.data = i2), e52)
}
function Xd(e52, {width: t2, height: n2}, r2) {
  if (t2 === e52.width && n2 === e52.height) return
  let i2 = Yd({}, {width: t2, height: n2}, r2)
  ;(Zd(
    e52,
    i2,
    {x: 0, y: 0},
    {x: 0, y: 0},
    {width: Math.min(e52.width, t2), height: Math.min(e52.height, n2)},
    r2
  ),
    (e52.width = t2),
    (e52.height = n2),
    (e52.data = i2.data))
}
function Zd(e52, t2, n2, r2, i2, a2) {
  if (i2.width === 0 || i2.height === 0) return t2
  if (
    i2.width > e52.width ||
    i2.height > e52.height ||
    n2.x > e52.width - i2.width ||
    n2.y > e52.height - i2.height
  )
    throw RangeError(`out of range source coordinates for image copy`)
  if (
    i2.width > t2.width ||
    i2.height > t2.height ||
    r2.x > t2.width - i2.width ||
    r2.y > t2.height - i2.height
  )
    throw RangeError(`out of range destination coordinates for image copy`)
  let o2 = e52.data,
    s2 = t2.data
  if (o2 === s2)
    throw Error(`srcData equals dstData, so image is already copied`)
  for (let c2 = 0; c2 < i2.height; c2++) {
    let l2 = ((n2.y + c2) * e52.width + n2.x) * a2,
      u2 = ((r2.y + c2) * t2.width + r2.x) * a2
    for (let e53 = 0; e53 < i2.width * a2; e53++) s2[u2 + e53] = o2[l2 + e53]
  }
  return t2
}
var Qd = class e40 {
    constructor(e52, t2) {
      Yd(this, e52, 1, t2)
    }
    resize(e52) {
      Xd(this, e52, 1)
    }
    clone() {
      return new e40(
        {width: this.width, height: this.height},
        new Uint8Array(this.data)
      )
    }
    static copy(e52, t2, n2, r2, i2) {
      Zd(e52, t2, n2, r2, i2, 1)
    }
  },
  $d = class e41 {
    constructor(e52, t2) {
      Yd(this, e52, 4, t2)
    }
    resize(e52) {
      Xd(this, e52, 4)
    }
    replace(e52, t2) {
      t2
        ? this.data.set(e52)
        : (this.data =
            e52 instanceof Uint8ClampedArray ? new Uint8Array(e52.buffer) : e52)
    }
    clone() {
      return new e41(
        {width: this.width, height: this.height},
        new Uint8Array(this.data)
      )
    }
    static copy(e52, t2, n2, r2, i2) {
      Zd(e52, t2, n2, r2, i2, 4)
    }
    setPixel(e52, t2, n2) {
      let r2 = (e52 * this.width + t2) * 4
      ;((this.data[r2 + 0] = Math.round((n2.r * 255) / n2.a)),
        (this.data[r2 + 1] = Math.round((n2.g * 255) / n2.a)),
        (this.data[r2 + 2] = Math.round((n2.b * 255) / n2.a)),
        (this.data[r2 + 3] = Math.round(n2.a * 255)))
    }
  }
function ef(e52) {
  let t2 = new Uint8Array(e52.length)
  for (let n2 = 0; n2 < e52.length; n2 += 4) {
    let r2 = e52[n2 + 3]
    ;((t2[n2 + 0] = Math.round((e52[n2 + 0] * r2) / 255)),
      (t2[n2 + 1] = Math.round((e52[n2 + 1] * r2) / 255)),
      (t2[n2 + 2] = Math.round((e52[n2 + 2] * r2) / 255)),
      (t2[n2 + 3] = r2))
  }
  return t2
}
;(H(`AlphaImage`, Qd), H(`RGBAImage`, $d))
function tf(e52) {
  let t2 = {},
    n2 = e52.resolution || 256,
    r2 = e52.clips ? e52.clips.length : 1,
    i2 = e52.image || new $d({width: n2, height: r2})
  if (!Et(n2)) throw Error(`width is not a power of 2 - ${n2}`)
  let a2 = (r3, a3, o2) => {
    t2[e52.evaluationKey] = o2
    let s2 = e52.expression.evaluate(t2)
    i2.setPixel(r3 / 4 / n2, a3 / 4, s2)
  }
  if (e52.clips)
    for (let t3 = 0, i3 = 0; t3 < r2; ++t3, i3 += n2 * 4)
      for (let r3 = 0, o2 = 0; r3 < n2; r3++, o2 += 4) {
        let s2 = r3 / (n2 - 1),
          {start: c2, end: l2} = e52.clips[t3],
          u2 = c2 * (1 - s2) + l2 * s2
        a2(i3, o2, u2)
      }
  else
    for (let e53 = 0, t3 = 0; e53 < n2; e53++, t3 += 4) {
      let r3 = e53 / (n2 - 1)
      a2(0, t3, r3)
    }
  return i2
}
const nf = `big-fb`,
  rf = e52 => e52.type === `heatmap`
var af = class extends dl {
  createBucket(e52) {
    return new Gd(e52)
  }
  constructor(e52, t2) {
    ;(super(e52, Jd, t2),
      (this.heatmapFbos = /* @__PURE__ */ new Map()),
      this._updateColorRamp())
  }
  _handleSpecialPaintPropertyUpdate(e52) {
    e52 === `heatmap-color` && this._updateColorRamp()
  }
  _updateColorRamp() {
    let e52 =
      this._transitionablePaint._values[`heatmap-color`].value.expression
    ;((this.colorRamp = tf({
      expression: e52,
      evaluationKey: `heatmapDensity`,
      image: this.colorRamp,
    })),
      (this.colorRampTexture = null))
  }
  resize() {
    this.heatmapFbos.has(`big-fb`) && this.heatmapFbos.delete(nf)
  }
  queryRadius(e52) {
    return Ed(`heatmap-radius`, this, e52)
  }
  queryIntersectsFeature({
    queryGeometry: e52,
    feature: t2,
    featureState: n2,
    geometry: r2,
    transform: i2,
    pixelsToTileUnits: a2,
    unwrappedTileID: o2,
    getElevation: s2,
  }) {
    return Fd(
      {
        queryGeometry: e52,
        size: this.paint.get(`heatmap-radius`).evaluate(t2, n2) * a2,
        transform: i2,
        unwrappedTileID: o2,
        getElevation: s2,
      },
      r2
    )
  }
  hasOffscreenPass() {
    return this.paint.get(`heatmap-opacity`) !== 0 && !this.isHidden()
  }
}
let of
const sf = () =>
  (of ||= new cl({
    "hillshade-illumination-direction": new W(
      M.paint_hillshade[`hillshade-illumination-direction`],
      `hillshade-illumination-direction`
    ),
    "hillshade-illumination-altitude": new W(
      M.paint_hillshade[`hillshade-illumination-altitude`],
      `hillshade-illumination-altitude`
    ),
    "hillshade-illumination-anchor": new W(
      M.paint_hillshade[`hillshade-illumination-anchor`],
      `hillshade-illumination-anchor`
    ),
    "hillshade-exaggeration": new W(
      M.paint_hillshade[`hillshade-exaggeration`],
      `hillshade-exaggeration`
    ),
    "hillshade-shadow-color": new W(
      M.paint_hillshade[`hillshade-shadow-color`],
      `hillshade-shadow-color`
    ),
    "hillshade-highlight-color": new W(
      M.paint_hillshade[`hillshade-highlight-color`],
      `hillshade-highlight-color`
    ),
    "hillshade-accent-color": new W(
      M.paint_hillshade[`hillshade-accent-color`],
      `hillshade-accent-color`
    ),
    "hillshade-method": new W(
      M.paint_hillshade[`hillshade-method`],
      `hillshade-method`
    ),
    resampling: new W(M.paint_hillshade.resampling, `resampling`),
  }))
var cf = {
  get paint() {
    return sf()
  },
}
const lf = e52 => e52.type === `hillshade`
var uf = class extends dl {
  constructor(e52, t2) {
    ;(super(e52, cf, t2), this.recalculate({zoom: 0, zoomHistory: {}}, void 0))
  }
  getIlluminationProperties() {
    let e52 = this.paint.get(`hillshade-illumination-direction`).values,
      t2 = this.paint.get(`hillshade-illumination-altitude`).values,
      n2 = this.paint.get(`hillshade-highlight-color`).values,
      r2 = this.paint.get(`hillshade-shadow-color`).values,
      i2 = Math.max(e52.length, t2.length, n2.length, r2.length)
    ;((e52 = e52.concat(Array(i2 - e52.length).fill(e52.at(-1)))),
      (t2 = t2.concat(Array(i2 - t2.length).fill(t2.at(-1)))),
      (n2 = n2.concat(Array(i2 - n2.length).fill(n2.at(-1)))),
      (r2 = r2.concat(Array(i2 - r2.length).fill(r2.at(-1)))))
    let a2 = t2.map(tn)
    return {
      directionRadians: e52.map(tn),
      altitudeRadians: a2,
      shadowColor: r2,
      highlightColor: n2,
    }
  }
  hasOffscreenPass() {
    return this.paint.get(`hillshade-exaggeration`) !== 0 && !this.isHidden()
  }
}
let df
const ff = () =>
  (df ||= new cl({
    "color-relief-opacity": new W(
      M[`paint_color-relief`][`color-relief-opacity`],
      `color-relief-opacity`
    ),
    "color-relief-color": new sl(
      M[`paint_color-relief`][`color-relief-color`],
      `color-relief-color`
    ),
    resampling: new W(M[`paint_color-relief`].resampling, `resampling`),
  }))
var pf = {
  get paint() {
    return ff()
  },
}
function mf(e52) {
  return `data` in e52
}
var hf = class {
    constructor(e52, t2, n2, r2) {
      ;((this.context = e52),
        (this.format = n2),
        (this.texture = e52.gl.createTexture()),
        (this._ownedHandle = this.texture),
        this.update(t2, r2))
    }
    update(e52, t2, n2) {
      let {width: r2, height: i2} = e52,
        a2 = (this.size?.[0] !== r2 || this.size[1] !== i2) && !n2,
        {context: o2} = this,
        {gl: s2} = o2
      ;((this.useMipmap = !!t2?.useMipmap),
        a2 &&
          this.size &&
          this.format === s2.RGBA &&
          (s2.deleteTexture(this.texture),
          (this.texture = s2.createTexture()),
          (this._ownedHandle = this.texture),
          (this.filter = void 0),
          (this.wrap = void 0)),
        s2.bindTexture(s2.TEXTURE_2D, this.texture),
        o2.pixelStoreUnpackFlipY.set(false),
        o2.pixelStoreUnpack.set(1))
      let c2 = this.format === s2.RGBA && t2?.premultiply !== false
      if (a2) {
        if (
          ((this.size = [r2, i2]), this.format === s2.RGBA && r2 > 0 && i2 > 0)
        ) {
          let t3 = this.useMipmap
            ? Math.floor(Math.log2(Math.max(r2, i2))) + 1
            : 1
          if ((s2.texStorage2D(s2.TEXTURE_2D, t3, s2.RGBA8, r2, i2), mf(e52))) {
            o2.pixelStoreUnpackPremultiplyAlpha.set(false)
            let {data: t4} = e52
            ;(c2 && t4 && (t4 = ef(t4)),
              t4 &&
                s2.texSubImage2D(
                  s2.TEXTURE_2D,
                  0,
                  0,
                  0,
                  r2,
                  i2,
                  s2.RGBA,
                  s2.UNSIGNED_BYTE,
                  t4
                ))
          } else
            (o2.pixelStoreUnpackPremultiplyAlpha.set(c2),
              s2.texSubImage2D(
                s2.TEXTURE_2D,
                0,
                0,
                0,
                s2.RGBA,
                s2.UNSIGNED_BYTE,
                e52
              ))
        } else
          mf(e52)
            ? (o2.pixelStoreUnpackPremultiplyAlpha.set(false),
              this._uploadRawData(e52, c2, r2, i2, s2))
            : (o2.pixelStoreUnpackPremultiplyAlpha.set(c2),
              this._uploadDomImage(e52, s2))
      } else {
        let {x: t3, y: a3} = n2 || {x: 0, y: 0}
        mf(e52)
          ? (o2.pixelStoreUnpackPremultiplyAlpha.set(false),
            this._updateRawData(e52, c2, t3, a3, r2, i2, s2))
          : (o2.pixelStoreUnpackPremultiplyAlpha.set(c2),
            this._updateDomImage(e52, t3, a3, s2))
      }
      ;(this.useMipmap && s2.generateMipmap(s2.TEXTURE_2D),
        o2.pixelStoreUnpackFlipY.setDefault(),
        o2.pixelStoreUnpack.setDefault(),
        o2.pixelStoreUnpackPremultiplyAlpha.setDefault())
    }
    _uploadDomImage(e52, t2) {
      t2.texImage2D(
        t2.TEXTURE_2D,
        0,
        this.format,
        this.format,
        t2.UNSIGNED_BYTE,
        e52
      )
    }
    _uploadRawData(e52, t2, n2, r2, i2) {
      let {data: a2} = e52
      ;(t2 && a2 && (a2 = ef(a2)),
        i2.texImage2D(
          i2.TEXTURE_2D,
          0,
          this.format,
          n2,
          r2,
          0,
          this.format,
          i2.UNSIGNED_BYTE,
          a2
        ))
    }
    _updateDomImage(e52, t2, n2, r2) {
      r2.texSubImage2D(r2.TEXTURE_2D, 0, t2, n2, r2.RGBA, r2.UNSIGNED_BYTE, e52)
    }
    _updateRawData(e52, t2, n2, r2, i2, a2, o2) {
      let {data: s2} = e52
      ;(t2 && s2 && (s2 = ef(s2)),
        o2.texSubImage2D(
          o2.TEXTURE_2D,
          0,
          n2,
          r2,
          i2,
          a2,
          o2.RGBA,
          o2.UNSIGNED_BYTE,
          s2
        ))
    }
    bind(e52, t2, n2) {
      let {context: r2} = this,
        {gl: i2} = r2
      ;(this.texture !== this._ownedHandle &&
        (this.texture = this._ownedHandle),
        i2.bindTexture(i2.TEXTURE_2D, this.texture),
        n2 === i2.LINEAR_MIPMAP_NEAREST && !this.useMipmap && (n2 = i2.LINEAR),
        e52 !== this.filter &&
          (i2.texParameteri(i2.TEXTURE_2D, i2.TEXTURE_MAG_FILTER, e52),
          i2.texParameteri(i2.TEXTURE_2D, i2.TEXTURE_MIN_FILTER, n2 || e52),
          (this.filter = e52)),
        t2 !== this.wrap &&
          (i2.texParameteri(i2.TEXTURE_2D, i2.TEXTURE_WRAP_S, t2),
          i2.texParameteri(i2.TEXTURE_2D, i2.TEXTURE_WRAP_T, t2),
          (this.wrap = t2)))
    }
    destroy() {
      let {gl: e52} = this.context
      ;(e52.deleteTexture(this.texture),
        (this.texture = null),
        (this._ownedHandle = null))
    }
  },
  gf = class e42 {
    static {
      this.byteViewCache = /* @__PURE__ */ new WeakMap()
    }
    constructor(t2, n2, r2, i2 = 1, a2 = 1, o2 = 1, s2 = 0) {
      if (((this.uid = t2), n2.height !== n2.width))
        throw RangeError(`DEM tiles must be square`)
      if (r2 && ![`mapbox`, `terrarium`, `custom`].includes(r2)) {
        It(
          `"${r2}" is not a valid encoding type. Valid types include "mapbox", "terrarium" and "custom".`
        )
        return
      }
      this.stride = n2.height
      let c2 = (this.dim = n2.height - 2)
      switch (
        ((this.data = new Uint32Array(n2.data.buffer)),
        e42.byteViewCache.set(this, new Uint8Array(this.data.buffer)),
        r2)
      ) {
        case `terrarium`:
          ;((this.redFactor = 256),
            (this.greenFactor = 1),
            (this.blueFactor = 1 / 256),
            (this.baseShift = 32768))
          break
        case `custom`:
          ;((this.redFactor = i2),
            (this.greenFactor = a2),
            (this.blueFactor = o2),
            (this.baseShift = s2))
          break
        default:
          ;((this.redFactor = 6553.6),
            (this.greenFactor = 25.6),
            (this.blueFactor = 0.1),
            (this.baseShift = 1e4))
      }
      for (let e52 = 0; e52 < c2; e52++)
        ((this.data[this._idx(-1, e52)] = this.data[this._idx(0, e52)]),
          (this.data[this._idx(c2, e52)] = this.data[this._idx(c2 - 1, e52)]),
          (this.data[this._idx(e52, -1)] = this.data[this._idx(e52, 0)]),
          (this.data[this._idx(e52, c2)] = this.data[this._idx(e52, c2 - 1)]))
      ;((this.data[this._idx(-1, -1)] = this.data[this._idx(0, 0)]),
        (this.data[this._idx(c2, -1)] = this.data[this._idx(c2 - 1, 0)]),
        (this.data[this._idx(-1, c2)] = this.data[this._idx(0, c2 - 1)]),
        (this.data[this._idx(c2, c2)] = this.data[this._idx(c2 - 1, c2 - 1)]))
      let l2 = this._getByteView()
      ;((this.min = 2 ** 53 - 1), (this.max = -(2 ** 53 - 1)))
      for (let e52 = 0; e52 < c2; e52++)
        for (let t3 = 0; t3 < c2; t3++) {
          let n3 = this._idx(e52, t3) * 4,
            r3 = this._unpackAtIndex(l2, n3)
          ;(r3 > this.max && (this.max = r3), r3 < this.min && (this.min = r3))
        }
    }
    get(e52, t2) {
      let n2 = this._getByteView(),
        r2 = this._idx(e52, t2) * 4
      return this._unpackAtIndex(n2, r2)
    }
    sampleBilinear(e52, t2) {
      let n2 = Math.floor(e52),
        r2 = Math.floor(t2)
      if (n2 < -1 || n2 >= this.dim || r2 < -1 || r2 >= this.dim)
        throw RangeError(
          `Out of range source coordinates for DEM data. x: ${e52}, y: ${t2}, dim: ${this.dim}`
        )
      let i2 = this._getByteView(),
        a2 = ((r2 + 1) * this.stride + n2 + 1) * 4,
        o2 = this.stride * 4,
        s2 = e52 - n2,
        c2 = t2 - r2,
        l2 = this._unpackAtIndex(i2, a2),
        u2 = this._unpackAtIndex(i2, a2 + 4),
        d2 = this._unpackAtIndex(i2, a2 + o2),
        f2 = this._unpackAtIndex(i2, a2 + o2 + 4)
      return (
        l2 * (1 - s2) * (1 - c2) +
        u2 * s2 * (1 - c2) +
        d2 * (1 - s2) * c2 +
        f2 * s2 * c2
      )
    }
    getUnpackVector() {
      return [this.redFactor, this.greenFactor, this.blueFactor, this.baseShift]
    }
    _idx(e52, t2) {
      if (e52 < -1 || e52 >= this.dim + 1 || t2 < -1 || t2 >= this.dim + 1)
        throw RangeError(
          `Out of range source coordinates for DEM data. x: ${e52}, y: ${t2}, dim: ${this.dim}`
        )
      return (t2 + 1) * this.stride + (e52 + 1)
    }
    unpack(e52, t2, n2) {
      return (
        e52 * this.redFactor +
        t2 * this.greenFactor +
        n2 * this.blueFactor -
        this.baseShift
      )
    }
    pack(e52) {
      return _f(e52, this.getUnpackVector())
    }
    getPixels() {
      return new $d(
        {width: this.stride, height: this.stride},
        this._getByteView()
      )
    }
    backfillBorder(e52, t2, n2) {
      if (this.dim !== e52.dim) throw Error(`dem dimension mismatch`)
      let r2 = t2 * this.dim,
        i2 = t2 * this.dim + this.dim,
        a2 = n2 * this.dim,
        o2 = n2 * this.dim + this.dim
      switch (t2) {
        case -1:
          r2 = i2 - 1
          break
        case 1:
          i2 = r2 + 1
      }
      switch (n2) {
        case -1:
          a2 = o2 - 1
          break
        case 1:
          o2 = a2 + 1
      }
      let s2 = -t2 * this.dim,
        c2 = -n2 * this.dim
      for (let t3 = a2; t3 < o2; t3++)
        for (let n3 = r2; n3 < i2; n3++)
          this.data[this._idx(n3, t3)] = e52.data[this._idx(n3 + s2, t3 + c2)]
    }
    _getByteView() {
      let t2 = e42.byteViewCache.get(this)
      return (
        t2?.buffer !== this.data.buffer &&
          ((t2 = new Uint8Array(this.data.buffer)),
          e42.byteViewCache.set(this, t2)),
        t2
      )
    }
    _unpackAtIndex(e52, t2) {
      return this.unpack(e52[t2], e52[t2 + 1], e52[t2 + 2])
    }
  }
function _f(e52, t2) {
  let n2 = t2[0],
    r2 = t2[1],
    i2 = t2[2],
    a2 = t2[3],
    o2 = Math.min(n2, r2, i2),
    s2 = Math.round((e52 + a2) / o2)
  return {
    r: Math.floor((s2 * o2) / n2) % 256,
    g: Math.floor((s2 * o2) / r2) % 256,
    b: Math.floor((s2 * o2) / i2) % 256,
  }
}
H(`DEMData`, gf)
const vf = e52 => e52.type === `color-relief`
var yf = class extends dl {
  constructor(e52, t2) {
    super(e52, pf, t2)
  }
  _createColorRamp(e52) {
    let t2 = {elevationStops: [], colorStops: []},
      n2 =
        this._transitionablePaint._values[`color-relief-color`].value.expression
    if (n2 instanceof Po && n2._styleExpression.expression instanceof $r) {
      this.colorRampExpression = n2
      let e53 = n2._styleExpression.expression
      ;((t2.elevationStops = e53.labels), (t2.colorStops = []))
      for (let n3 of t2.elevationStops)
        t2.colorStops.push(e53.evaluate({globals: {elevation: n3}}))
    }
    if (
      (t2.elevationStops.length < 1 &&
        ((t2.elevationStops = [0]), (t2.colorStops = [z.transparent])),
      t2.elevationStops.length < 2 &&
        (t2.elevationStops.push(t2.elevationStops[0] + 1),
        t2.colorStops.push(t2.colorStops[0])),
      t2.elevationStops.length <= e52)
    )
      return t2
    let r2 = {elevationStops: [], colorStops: []},
      i2 = (t2.elevationStops.length - 1) / (e52 - 1)
    for (let e53 = 0; e53 < t2.elevationStops.length - 0.5; e53 += i2)
      (r2.elevationStops.push(t2.elevationStops[Math.round(e53)]),
        r2.colorStops.push(t2.colorStops[Math.round(e53)]))
    return (
      It(
        `Too many colors in specification of ${this.id} color-relief layer, may not render properly. Max possible colors: ${e52}, provided: ${t2.elevationStops.length}`
      ),
      r2
    )
  }
  _colorRampChanged() {
    return (
      this.colorRampExpression !=
      this._transitionablePaint._values[`color-relief-color`].value.expression
    )
  }
  getColorRampTextures(e52, t2, n2) {
    if (this.colorRampTextures && !this._colorRampChanged())
      return this.colorRampTextures
    let r2 = this._createColorRamp(t2),
      i2 = new $d({width: r2.colorStops.length, height: 1}),
      a2 = new $d({width: r2.colorStops.length, height: 1})
    for (let e53 = 0; e53 < r2.elevationStops.length; e53++) {
      let t3 = _f(r2.elevationStops[e53], n2)
      ;(a2.setPixel(0, e53, new z(t3.r / 255, t3.g / 255, t3.b / 255, 1)),
        i2.setPixel(0, e53, r2.colorStops[e53]))
    }
    return (
      (this.colorRampTextures = {
        elevationTexture: new hf(e52, a2, e52.gl.RGBA),
        colorTexture: new hf(e52, i2, e52.gl.RGBA),
      }),
      this.colorRampTextures
    )
  }
  hasOffscreenPass() {
    return !this.isHidden() && !!this.colorRampTextures
  }
}
const bf = q([{name: `a_pos`, components: 2, type: `Int16`}], 4),
  xf = bf.members
;(bf.size, bf.alignment)
function Sf(e52, t2, n2) {
  let r2 = n2.patternDependencies,
    i2 = false
  for (let n3 of t2) {
    let t3 = n3.paint.get(`${e52}-pattern`)
    t3.isConstant() || (i2 = true)
    let a2 = t3.constantOr(null)
    a2 && ((i2 = true), (r2[a2.to] = true), (r2[a2.from] = true))
  }
  return i2
}
function Cf(e52, t2, n2, r2, i2) {
  let {zoom: a2} = r2,
    o2 = i2.patternDependencies
  for (let r3 of t2) {
    let t3 = r3.paint.get(`${e52}-pattern`).value
    if (t3.kind !== `constant`) {
      let e53 = t3.evaluate({zoom: a2 - 1}, n2, {}, i2.availableImages),
        s2 = t3.evaluate({zoom: a2}, n2, {}, i2.availableImages),
        c2 = t3.evaluate({zoom: a2 + 1}, n2, {}, i2.availableImages)
      ;((e53 = e53?.name ? e53.name : e53),
        (s2 = s2?.name ? s2.name : s2),
        (c2 = c2?.name ? c2.name : c2),
        (o2[e53] = true),
        (o2[s2] = true),
        (o2[c2] = true),
        (n2.patterns[r3.id] = {min: e53, mid: s2, max: c2}))
    }
  }
  return n2
}
const wf = /* @__PURE__ */ new Set()
let Tf = false
function Ef(e52, t2, n2 = 2) {
  let r2 = t2 && t2.length,
    i2 = r2 ? t2[0] * n2 : e52.length
  wf.size && wf.clear()
  let a2 = Df(e52, 0, i2, n2, true),
    o2 = []
  if (!a2 || a2.next === a2.prev) return o2
  let s2 = 0,
    c2 = 0,
    l2 = 0
  if ((r2 && (a2 = Ff(e52, t2, a2, n2)), e52.length > 80 * n2)) {
    ;((s2 = e52[0]), (c2 = e52[1]))
    let t3 = s2,
      r3 = c2
    for (let a3 = n2; a3 < i2; a3 += n2) {
      let n3 = e52[a3],
        i3 = e52[a3 + 1]
      ;(n3 < s2 && (s2 = n3),
        i3 < c2 && (c2 = i3),
        n3 > t3 && (t3 = n3),
        i3 > r3 && (r3 = i3))
    }
    ;((l2 = Math.max(t3 - s2, r3 - c2)), (l2 = l2 === 0 ? 0 : 32767 / l2))
  }
  return (kf(a2, o2, s2, c2, l2), o2)
}
function Df(e52, t2, n2, r2, i2) {
  let a2 = null
  if (i2 === vp(e52, t2, n2, r2) > 0)
    for (let i3 = t2; i3 < n2; i3 += r2)
      a2 = hp((i3 / r2) | 0, e52[i3], e52[i3 + 1], a2)
  else
    for (let i3 = n2 - r2; i3 >= t2; i3 -= r2)
      a2 = hp((i3 / r2) | 0, e52[i3], e52[i3 + 1], a2)
  return (a2 && cp(a2, a2.next) && (gp(a2), (a2 = a2.next)), a2)
}
function Of(e52, t2 = e52) {
  let n2 = t2 === e52,
    r2 = e52,
    i2
  do
    ((i2 = false),
      r2 !== r2.next &&
      (wf.size === 0 || !wf.has(r2)) &&
      (cp(r2, r2.next) || sp(r2.prev, r2, r2.next) === 0)
        ? ((n2 || r2 === t2) && (t2 = r2.prev),
          (Tf = true),
          gp(r2),
          (r2 = r2.prev),
          (i2 = true))
        : (n2 || r2 !== t2) && ((r2 = r2.next), (i2 = !n2)))
  while (i2 || r2 !== t2)
  return t2
}
function kf(e52, t2, n2, r2, i2) {
  i2 && ep(e52, n2, r2, i2)
  let a2 = e52,
    o2 = false
  for (; e52.prev !== e52.next;) {
    let s2 = e52.prev,
      c2 = e52.next
    if (sp(s2, e52, c2) < 0 && (i2 ? jf(e52, n2, r2, i2) : Af(e52))) {
      ;(t2.push(s2.i, e52.i, c2.i), gp(e52), (e52 = c2), (a2 = c2))
      continue
    }
    if (((e52 = c2), e52 === a2)) {
      if (((Tf = false), (e52 = Of(e52)), Tf)) {
        a2 = e52
        continue
      }
      if (!o2) {
        ;((e52 = Mf(e52, t2)), (a2 = e52), (o2 = true))
        continue
      }
      Nf(e52, t2, n2, r2, i2)
      break
    }
  }
}
function Af(e52) {
  let t2 = e52.prev,
    n2 = e52,
    r2 = e52.next,
    i2 = t2.x,
    a2 = n2.x,
    o2 = r2.x,
    s2 = t2.y,
    c2 = n2.y,
    l2 = r2.y,
    u2 = Math.min(i2, a2, o2),
    d2 = Math.min(s2, c2, l2),
    f2 = Math.max(i2, a2, o2),
    p2 = Math.max(s2, c2, l2),
    m2 = r2.next
  for (; m2 !== t2;) {
    if (
      m2.x >= u2 &&
      m2.x <= f2 &&
      m2.y >= d2 &&
      m2.y <= p2 &&
      (i2 !== m2.x || s2 !== m2.y) &&
      ap(i2, s2, a2, c2, o2, l2, m2.x, m2.y) &&
      sp(m2.prev, m2, m2.next) >= 0
    )
      return false
    m2 = m2.next
  }
  return true
}
function jf(e52, t2, n2, r2) {
  let i2 = e52.prev,
    a2 = e52,
    o2 = e52.next,
    s2 = i2.x,
    c2 = a2.x,
    l2 = o2.x,
    u2 = i2.y,
    d2 = a2.y,
    f2 = o2.y,
    p2 = Math.min(s2, c2, l2),
    m2 = Math.min(u2, d2, f2),
    h2 = Math.max(s2, c2, l2),
    g2 = Math.max(u2, d2, f2),
    _2 = rp(p2, m2, t2, n2, r2),
    v2 = rp(h2, g2, t2, n2, r2),
    y2 = e52.prevZ
  for (; y2 && y2.z >= _2;) {
    if (
      y2.x >= p2 &&
      y2.x <= h2 &&
      y2.y >= m2 &&
      y2.y <= g2 &&
      y2 !== o2 &&
      (s2 !== y2.x || u2 !== y2.y) &&
      ap(s2, u2, c2, d2, l2, f2, y2.x, y2.y) &&
      sp(y2.prev, y2, y2.next) >= 0
    )
      return false
    y2 = y2.prevZ
  }
  let b2 = e52.nextZ
  for (; b2 && b2.z <= v2;) {
    if (
      b2.x >= p2 &&
      b2.x <= h2 &&
      b2.y >= m2 &&
      b2.y <= g2 &&
      b2 !== o2 &&
      (s2 !== b2.x || u2 !== b2.y) &&
      ap(s2, u2, c2, d2, l2, f2, b2.x, b2.y) &&
      sp(b2.prev, b2, b2.next) >= 0
    )
      return false
    b2 = b2.nextZ
  }
  return true
}
function Mf(e52, t2) {
  let n2 = e52,
    r2 = false
  do {
    let i2 = n2.prev,
      a2 = n2.next.next
    ;(lp(i2, n2, n2.next, a2, false) &&
      fp(i2, a2) &&
      fp(a2, i2) &&
      (t2.push(i2.i, n2.i, a2.i),
      gp(n2),
      gp(n2.next),
      (n2 = e52 = a2),
      (r2 = true)),
      (n2 = n2.next))
  } while (n2 !== e52)
  return r2 ? Of(n2) : n2
}
function Nf(e52, t2, n2, r2, i2) {
  let a2 = e52
  do {
    let e53 = a2.next.next
    for (; e53 !== a2.prev;) {
      if (a2.i !== e53.i && op(a2, e53)) {
        let o2 = mp(a2, e53)
        ;((a2 = Of(a2, a2.next)),
          (o2 = Of(o2, o2.next)),
          kf(a2, t2, n2, r2, i2),
          kf(o2, t2, n2, r2, i2))
        return
      }
      e53 = e53.next
    }
    a2 = a2.next
  } while (a2 !== e52)
}
let Pf = false
function Ff(e52, t2, n2, r2) {
  let i2 = []
  for (let n3 = 0, a2 = t2.length; n3 < a2; n3++) {
    let o2 = Df(
      e52,
      t2[n3] * r2,
      n3 < a2 - 1 ? t2[n3 + 1] * r2 : e52.length,
      r2,
      false
    )
    ;(o2 === o2.next && wf.add(o2), i2.push(ip(o2)))
  }
  ;(i2.sort(If), Hf(e52.length / r2, t2.length), Uf(n2, n2), (Pf = true))
  for (let e53 = 0; e53 < i2.length; e53++) n2 = Lf(i2[e53], n2)
  return ((Pf = false), Of(n2))
}
function If(e52, t2) {
  return (
    e52.x - t2.x ||
    e52.y - t2.y ||
    (e52.next.y - e52.y) / (e52.next.x - e52.x) -
      (t2.next.y - t2.y) / (t2.next.x - t2.x)
  )
}
function Lf(e52, t2) {
  let n2 = qf(e52, t2)
  if (!n2) return t2
  let r2 = mp(n2, e52),
    i2 = r2.next
  return (Uf(n2, i2.next), Of(r2, r2.next), Of(n2, n2.next))
}
let Rf = new Float64Array(),
  zf = 0
const Bf = [],
  Vf = []
function Hf(e52, t2) {
  let n2 = Math.ceil((e52 + 2 * t2) / 16) + t2 + 2
  ;(Rf.length < n2 * 4 && (Rf = new Float64Array(n2 * 4)), (zf = 0))
}
function Uf(e52, t2) {
  let n2 = e52
  do {
    let e53 = zf++
    Bf[e53] = n2
    let r2 = 1 / 0,
      i2 = 1 / 0,
      a2 = -1 / 0,
      o2 = -1 / 0,
      s2 = 0
    do {
      let t3 = n2.next
      ;((n2.z = e53),
        n2.x < r2 && (r2 = n2.x),
        n2.x > a2 && (a2 = n2.x),
        n2.y < i2 && (i2 = n2.y),
        n2.y > o2 && (o2 = n2.y),
        t3.x < r2 && (r2 = t3.x),
        t3.x > a2 && (a2 = t3.x),
        t3.y < i2 && (i2 = t3.y),
        t3.y > o2 && (o2 = t3.y),
        (n2 = t3))
    } while (++s2 < 16 && n2 !== t2)
    Vf[e53] = n2
    let c2 = e53 * 4
    ;((Rf[c2] = r2), (Rf[c2 + 1] = i2), (Rf[c2 + 2] = a2), (Rf[c2 + 3] = o2))
  } while (n2 !== t2)
}
function Wf(e52, t2) {
  let n2 = e52.z * 4
  ;(t2.x < Rf[n2] && (Rf[n2] = t2.x),
    t2.y < Rf[n2 + 1] && (Rf[n2 + 1] = t2.y),
    t2.x > Rf[n2 + 2] && (Rf[n2 + 2] = t2.x),
    t2.y > Rf[n2 + 3] && (Rf[n2 + 3] = t2.y))
}
function Gf(e52) {
  let t2 = Vf[e52]
  for (; t2.prev.next !== t2;) t2 = t2.next
  return ((Vf[e52] = t2), t2)
}
function Kf(e52) {
  let t2 = Bf[e52]
  for (; t2.prev.next !== t2;) t2 = t2.next
  return ((Bf[e52] = t2), t2)
}
function qf(e52, t2) {
  let n2 = t2,
    r2 = e52.x,
    i2 = e52.y,
    a2 = -1 / 0,
    o2
  if (cp(e52, n2)) return n2
  for (let t3 = 0, s3 = 0; t3 < zf; t3++, s3 += 4) {
    if (i2 < Rf[s3 + 1] || i2 > Rf[s3 + 3] || Rf[s3] > r2 || Rf[s3 + 2] <= a2)
      continue
    let c3 = Gf(t3)
    n2 = Kf(t3)
    do {
      if (n2.prev.next === n2) {
        if (cp(e52, n2.next)) return n2.next
        if (i2 <= n2.y && i2 >= n2.next.y && n2.next.y !== n2.y) {
          let e53 =
            n2.x + ((i2 - n2.y) * (n2.next.x - n2.x)) / (n2.next.y - n2.y)
          if (
            e53 <= r2 &&
            e53 > a2 &&
            ((a2 = e53), (o2 = n2.x < n2.next.x ? n2 : n2.next), e53 === r2)
          )
            return o2
        }
      }
      n2 = n2.next
    } while (n2 !== c3)
  }
  if (!o2) return null
  let s2 = o2.x,
    c2 = o2.y,
    l2 = Math.min(i2, c2),
    u2 = Math.max(i2, c2),
    d2 = 1 / 0
  for (let t3 = 0, f2 = 0; t3 < zf; t3++, f2 += 4) {
    if (Rf[f2 + 2] < s2 || Rf[f2] > r2 || Rf[f2 + 3] < l2 || Rf[f2 + 1] > u2)
      continue
    let p2 = Gf(t3)
    n2 = Kf(t3)
    do {
      if (
        n2.prev.next === n2 &&
        r2 >= n2.x &&
        n2.x >= s2 &&
        r2 !== n2.x &&
        ap(i2 < c2 ? r2 : a2, i2, s2, c2, i2 < c2 ? a2 : r2, i2, n2.x, n2.y)
      ) {
        let t4 = Math.abs(i2 - n2.y) / (r2 - n2.x)
        ;(fp(n2, e52) || (n2.y === i2 && n2.next.y === i2 && n2.next.x > r2)) &&
          (t4 < d2 ||
            (t4 === d2 && (n2.x > o2.x || (n2.x === o2.x && Jf(o2, n2))))) &&
          ((o2 = n2), (d2 = t4))
      }
      n2 = n2.next
    } while (n2 !== p2)
  }
  return o2
}
function Jf(e52, t2) {
  return sp(e52.prev, e52, t2.prev) < 0 && sp(t2.next, e52, e52.next) < 0
}
const Yf = []
let Xf = [],
  Zf = new Uint32Array(),
  Qf = new Uint32Array()
const $f = new Uint32Array(256)
function ep(e52, t2, n2, r2) {
  let i2 = e52,
    a2 = 0
  do ((i2.z = rp(i2.x, i2.y, t2, n2, r2)), (Yf[a2++] = i2), (i2 = i2.next))
  while (i2 !== e52)
  tp(a2)
  let o2 = null
  for (let e53 = 0; e53 < a2; e53++) {
    let t3 = Yf[e53]
    ;((t3.prevZ = o2), o2 && (o2.nextZ = t3), (o2 = t3))
  }
  o2.nextZ = null
}
function tp(e52) {
  if (e52 <= 32) {
    for (let t2 = 1; t2 < e52; t2++) {
      let e53 = Yf[t2],
        n2 = e53.z,
        r2 = t2 - 1
      for (; r2 >= 0 && Yf[r2].z > n2;) ((Yf[r2 + 1] = Yf[r2]), r2--)
      Yf[r2 + 1] = e53
    }
    return
  }
  Zf.length < e52 &&
    ((Zf = new Uint32Array(e52)),
    (Qf = new Uint32Array(e52)),
    (Xf = Array(e52)))
  for (let t2 = 0; t2 < e52; t2++) Zf[t2] = Yf[t2].z
  ;(np(e52, Yf, Zf, Xf, Qf, 0),
    np(e52, Xf, Qf, Yf, Zf, 8),
    np(e52, Yf, Zf, Xf, Qf, 16),
    np(e52, Xf, Qf, Yf, Zf, 24))
}
function np(e52, t2, n2, r2, i2, a2) {
  $f.fill(0)
  for (let t3 = 0; t3 < e52; t3++) $f[(n2[t3] >>> a2) & 255]++
  let o2 = 0
  for (let e53 = 0; e53 < 256; e53++) {
    let t3 = $f[e53]
    ;(($f[e53] = o2), (o2 += t3))
  }
  for (let o3 = 0; o3 < e52; o3++) {
    let e53 = n2[o3],
      s2 = $f[(e53 >>> a2) & 255]++
    ;((r2[s2] = t2[o3]), (i2[s2] = e53))
  }
}
function rp(e52, t2, n2, r2, i2) {
  return (
    (e52 = ((e52 - n2) * i2) | 0),
    (t2 = ((t2 - r2) * i2) | 0),
    (e52 = (e52 | (e52 << 8)) & 16711935),
    (e52 = (e52 | (e52 << 4)) & 252645135),
    (e52 = (e52 | (e52 << 2)) & 858993459),
    (e52 = (e52 | (e52 << 1)) & 1431655765),
    (t2 = (t2 | (t2 << 8)) & 16711935),
    (t2 = (t2 | (t2 << 4)) & 252645135),
    (t2 = (t2 | (t2 << 2)) & 858993459),
    (t2 = (t2 | (t2 << 1)) & 1431655765),
    e52 | (t2 << 1)
  )
}
function ip(e52) {
  let t2 = e52,
    n2 = e52
  do
    ((t2.x < n2.x || (t2.x === n2.x && t2.y < n2.y)) && (n2 = t2),
      (t2 = t2.next))
  while (t2 !== e52)
  return n2
}
function ap(e52, t2, n2, r2, i2, a2, o2, s2) {
  return (
    (i2 - o2) * (t2 - s2) >= (e52 - o2) * (a2 - s2) &&
    (e52 - o2) * (r2 - s2) >= (n2 - o2) * (t2 - s2) &&
    (n2 - o2) * (a2 - s2) >= (i2 - o2) * (r2 - s2)
  )
}
function op(e52, t2) {
  let n2 =
    cp(e52, t2) &&
    sp(e52.prev, e52, e52.next) > 0 &&
    sp(t2.prev, t2, t2.next) > 0
  return (
    e52.next.i !== t2.i &&
    (n2 ||
      (fp(e52, t2) &&
        fp(t2, e52) &&
        (sp(e52.prev, e52, t2.prev) !== 0 || sp(e52, t2.prev, t2) !== 0))) &&
    !dp(e52, t2) &&
    (n2 || pp(e52, t2))
  )
}
function sp(e52, t2, n2) {
  return (t2.y - e52.y) * (n2.x - t2.x) - (t2.x - e52.x) * (n2.y - t2.y)
}
function cp(e52, t2) {
  return e52.x === t2.x && e52.y === t2.y
}
function lp(e52, t2, n2, r2, i2 = true) {
  let a2 = sp(e52, t2, n2),
    o2 = sp(e52, t2, r2),
    s2 = sp(n2, r2, e52),
    c2 = sp(n2, r2, t2)
  return ((a2 > 0 && o2 < 0) || (a2 < 0 && o2 > 0)) &&
    ((s2 > 0 && c2 < 0) || (s2 < 0 && c2 > 0))
    ? true
    : i2
      ? !!(
          (a2 === 0 && up(e52, n2, t2)) ||
          (o2 === 0 && up(e52, r2, t2)) ||
          (s2 === 0 && up(n2, e52, r2)) ||
          (c2 === 0 && up(n2, t2, r2))
        )
      : false
}
function up(e52, t2, n2) {
  return (
    t2.x <= Math.max(e52.x, n2.x) &&
    t2.x >= Math.min(e52.x, n2.x) &&
    t2.y <= Math.max(e52.y, n2.y) &&
    t2.y >= Math.min(e52.y, n2.y)
  )
}
function dp(e52, t2) {
  let n2 = Math.min(e52.x, t2.x),
    r2 = Math.max(e52.x, t2.x),
    i2 = Math.min(e52.y, t2.y),
    a2 = Math.max(e52.y, t2.y),
    o2 = e52
  do {
    let s2 = o2.next
    if (
      (o2.x > r2 && s2.x > r2) ||
      (o2.x < n2 && s2.x < n2) ||
      (o2.y > a2 && s2.y > a2) ||
      (o2.y < i2 && s2.y < i2)
    ) {
      o2 = s2
      continue
    }
    if (
      o2.i !== e52.i &&
      s2.i !== e52.i &&
      o2.i !== t2.i &&
      s2.i !== t2.i &&
      lp(o2, s2, e52, t2)
    )
      return true
    o2 = s2
  } while (o2 !== e52)
  return false
}
function fp(e52, t2) {
  return sp(e52.prev, e52, e52.next) < 0
    ? sp(e52, t2, e52.next) >= 0 && sp(e52, e52.prev, t2) >= 0
    : sp(e52, t2, e52.prev) < 0 || sp(e52, e52.next, t2) < 0
}
function pp(e52, t2) {
  let n2 = e52,
    r2 = false,
    i2 = (e52.x + t2.x) / 2,
    a2 = (e52.y + t2.y) / 2
  do {
    let e53 = n2.next
    ;(n2.y > a2 != e53.y > a2 &&
      i2 < ((e53.x - n2.x) * (a2 - n2.y)) / (e53.y - n2.y) + n2.x &&
      (r2 = !r2),
      (n2 = e53))
  } while (n2 !== e52)
  return r2
}
function mp(e52, t2) {
  let n2 = _p(e52.i, e52.x, e52.y),
    r2 = _p(t2.i, t2.x, t2.y),
    i2 = e52.next,
    a2 = t2.prev
  return (
    (e52.next = t2),
    (t2.prev = e52),
    (n2.next = i2),
    (i2.prev = n2),
    (r2.next = n2),
    (n2.prev = r2),
    (a2.next = r2),
    (r2.prev = a2),
    r2
  )
}
function hp(e52, t2, n2, r2) {
  let i2 = _p(e52, t2, n2)
  return (
    r2
      ? ((i2.next = r2.next),
        (i2.prev = r2),
        (r2.next.prev = i2),
        (r2.next = i2))
      : ((i2.prev = i2), (i2.next = i2)),
    i2
  )
}
function gp(e52) {
  ;((e52.next.prev = e52.prev),
    (e52.prev.next = e52.next),
    e52.prevZ && (e52.prevZ.nextZ = e52.nextZ),
    e52.nextZ && (e52.nextZ.prevZ = e52.prevZ),
    Pf && Wf(e52.prev, e52.next))
}
function _p(e52, t2, n2) {
  return {
    i: e52,
    x: t2,
    y: n2,
    prev: null,
    next: null,
    z: 0,
    prevZ: null,
    nextZ: null,
  }
}
function vp(e52, t2, n2, r2) {
  let i2 = 0
  for (let a2 = t2, o2 = n2 - r2; a2 < n2; a2 += r2)
    ((i2 += (e52[o2] - e52[a2]) * (e52[a2 + 1] + e52[o2 + 1])), (o2 = a2))
  return i2
}
var yp = class {
    constructor(e52, t2) {
      if (t2 > e52)
        throw Error(
          `Min granularity must not be greater than base granularity.`
        )
      ;((this._baseZoomGranularity = e52), (this._minGranularity = t2))
    }
    getGranularityForZoomLevel(e52) {
      let t2 = 1 << e52
      return Math.max(
        Math.floor(this._baseZoomGranularity / t2),
        this._minGranularity,
        1
      )
    }
  },
  bp = class e43 {
    constructor(e52) {
      ;((this.fill = e52.fill),
        (this.line = e52.line),
        (this.tile = e52.tile),
        (this.stencil = e52.stencil),
        (this.circle = e52.circle))
    }
    static {
      this.noSubdivision = new e43({
        fill: new yp(0, 0),
        line: new yp(0, 0),
        tile: new yp(0, 0),
        stencil: new yp(0, 0),
        circle: 1,
      })
    }
  }
;(H(`SubdivisionGranularityExpression`, yp),
  H(`SubdivisionGranularitySetting`, bp))
const xp = -32768,
  Sp = 32767
var Cp = class {
  constructor(e52, t2) {
    ;((this._vertexBuffer = []),
      (this._vertexDictionary = /* @__PURE__ */ new Map()),
      (this._used = false),
      (this._granularity = e52),
      (this._granularityCellSize = j / e52),
      (this._canonical = t2))
  }
  _getKey(e52, t2) {
    return ((e52 += 32768), (t2 += 32768), (e52 << 16) | (t2 << 0))
  }
  _vertexToIndex(e52, t2) {
    if (e52 < -32768 || t2 < -32768 || e52 > 32767 || t2 > 32767)
      throw Error(`Vertex coordinates are out of signed 16 bit integer range.`)
    let n2 = Math.round(e52) | 0,
      r2 = Math.round(t2) | 0,
      i2 = this._getKey(n2, r2)
    if (this._vertexDictionary.has(i2)) return this._vertexDictionary.get(i2)
    let a2 = this._vertexBuffer.length / 2
    return (
      this._vertexDictionary.set(i2, a2), this._vertexBuffer.push(n2, r2), a2
    )
  }
  _subdivideTrianglesScanline(e52) {
    if (this._granularity < 2) return Dp(this._vertexBuffer, e52)
    let t2 = [],
      n2 = e52.length
    for (let r2 = 0; r2 < n2; r2 += 3) {
      let n3 = [e52[r2 + 0], e52[r2 + 1], e52[r2 + 2]],
        i2 = [
          this._vertexBuffer[e52[r2 + 0] * 2 + 0],
          this._vertexBuffer[e52[r2 + 0] * 2 + 1],
          this._vertexBuffer[e52[r2 + 1] * 2 + 0],
          this._vertexBuffer[e52[r2 + 1] * 2 + 1],
          this._vertexBuffer[e52[r2 + 2] * 2 + 0],
          this._vertexBuffer[e52[r2 + 2] * 2 + 1],
        ],
        a2 = 1 / 0,
        o2 = 1 / 0,
        s2 = -1 / 0,
        c2 = -1 / 0
      for (let e53 = 0; e53 < 3; e53++) {
        let t3 = i2[e53 * 2],
          n4 = i2[e53 * 2 + 1]
        ;((a2 = Math.min(a2, t3)),
          (s2 = Math.max(s2, t3)),
          (o2 = Math.min(o2, n4)),
          (c2 = Math.max(c2, n4)))
      }
      if (a2 === s2 || o2 === c2) continue
      let l2 = Math.floor(a2 / this._granularityCellSize),
        u2 = Math.ceil(s2 / this._granularityCellSize),
        d2 = Math.floor(o2 / this._granularityCellSize),
        f2 = Math.ceil(c2 / this._granularityCellSize)
      if (l2 === u2 && d2 === f2) {
        t2.push(...n3)
        continue
      }
      for (let e53 = d2; e53 < f2; e53++) {
        let r3 = this._scanlineGenerateVertexRingForCellRow(e53, i2, n3)
        Op(this._vertexBuffer, r3, t2)
      }
    }
    return t2
  }
  _scanlineGenerateVertexRingForCellRow(e52, t2, n2) {
    let r2 = e52 * this._granularityCellSize,
      i2 = r2 + this._granularityCellSize,
      a2 = []
    for (let e53 = 0; e53 < 3; e53++) {
      let o2 = t2[e53 * 2],
        s2 = t2[e53 * 2 + 1],
        c2 = t2[((e53 + 1) * 2) % 6],
        l2 = t2[((e53 + 1) * 2 + 1) % 6],
        u2 = t2[((e53 + 2) * 2) % 6],
        d2 = t2[((e53 + 2) * 2 + 1) % 6],
        f2 = c2 - o2,
        p2 = l2 - s2,
        m2 = f2 === 0,
        h2 = p2 === 0,
        g2 = (r2 - s2) / p2,
        _2 = (i2 - s2) / p2,
        v2 = Math.min(g2, _2),
        y2 = Math.max(g2, _2)
      if ((!h2 && (v2 >= 1 || y2 <= 0)) || (h2 && (s2 < r2 || s2 > i2))) {
        l2 >= r2 && l2 <= i2 && a2.push(n2[(e53 + 1) % 3])
        continue
      }
      if (!h2 && v2 > 0) {
        let e54 = o2 + f2 * v2,
          t3 = s2 + p2 * v2
        a2.push(this._vertexToIndex(e54, t3))
      }
      let b2 = o2 + f2 * Math.max(v2, 0),
        x2 = o2 + f2 * Math.min(y2, 1)
      if (
        (m2 || this._generateIntraEdgeVertices(a2, o2, s2, c2, l2, b2, x2),
        !h2 && y2 < 1)
      ) {
        let e54 = o2 + f2 * y2,
          t3 = s2 + p2 * y2
        a2.push(this._vertexToIndex(e54, t3))
      }
      ;((h2 || (l2 >= r2 && l2 <= i2)) && a2.push(n2[(e53 + 1) % 3]),
        !h2 &&
          (l2 <= r2 || l2 >= i2) &&
          this._generateInterEdgeVertices(
            a2,
            o2,
            s2,
            c2,
            l2,
            u2,
            d2,
            x2,
            r2,
            i2
          ))
    }
    return a2
  }
  _generateIntraEdgeVertices(e52, t2, n2, r2, i2, a2, o2) {
    let s2 = r2 - t2,
      c2 = i2 - n2,
      l2 = c2 === 0,
      u2 = l2 ? Math.min(t2, r2) : Math.min(a2, o2),
      d2 = l2 ? Math.max(t2, r2) : Math.max(a2, o2),
      f2 = Math.floor(u2 / this._granularityCellSize) + 1,
      p2 = Math.ceil(d2 / this._granularityCellSize) - 1
    if (l2 ? t2 < r2 : a2 < o2)
      for (let r3 = f2; r3 <= p2; r3++) {
        let i3 = r3 * this._granularityCellSize,
          a3 = n2 + (c2 * (i3 - t2)) / s2
        e52.push(this._vertexToIndex(i3, a3))
      }
    else
      for (let r3 = p2; r3 >= f2; r3--) {
        let i3 = r3 * this._granularityCellSize,
          a3 = n2 + (c2 * (i3 - t2)) / s2
        e52.push(this._vertexToIndex(i3, a3))
      }
  }
  _generateInterEdgeVertices(e52, t2, n2, r2, i2, a2, o2, s2, c2, l2) {
    let u2 = i2 - n2,
      d2 = a2 - r2,
      f2 = o2 - i2,
      p2 = (c2 - i2) / f2,
      m2 = (l2 - i2) / f2,
      h2 = Math.min(p2, m2),
      g2 = Math.max(p2, m2),
      _2 = r2 + d2 * h2,
      v2 = Math.floor(Math.min(_2, s2) / this._granularityCellSize) + 1,
      y2 = Math.ceil(Math.max(_2, s2) / this._granularityCellSize) - 1,
      b2 = s2 < _2,
      x2 = f2 === 0
    if (x2 && (o2 === c2 || o2 === l2)) return
    if (x2 || h2 >= 1 || g2 <= 0) {
      let e53 = t2 - a2,
        r3 = n2 - o2,
        i3 = (c2 - o2) / r3,
        u3 = (l2 - o2) / r3,
        d3 = a2 + e53 * Math.min(i3, u3)
      ;((v2 = Math.floor(Math.min(d3, s2) / this._granularityCellSize) + 1),
        (y2 = Math.ceil(Math.max(d3, s2) / this._granularityCellSize) - 1),
        (b2 = s2 < d3))
    }
    let S2 = u2 > 0 ? l2 : c2
    if (b2)
      for (let t3 = v2; t3 <= y2; t3++) {
        let n3 = t3 * this._granularityCellSize
        e52.push(this._vertexToIndex(n3, S2))
      }
    else
      for (let t3 = y2; t3 >= v2; t3--) {
        let n3 = t3 * this._granularityCellSize
        e52.push(this._vertexToIndex(n3, S2))
      }
  }
  _generateOutline(e52) {
    let t2 = []
    for (let n2 of e52) {
      let e53 = Tp(n2, this._granularity, true),
        r2 = this._pointArrayToIndices(e53),
        i2 = []
      for (let e54 = 1; e54 < r2.length; e54++)
        (i2.push(r2[e54 - 1]), i2.push(r2[e54]))
      t2.push(i2)
    }
    return t2
  }
  _handlePoles(e52) {
    let t2 = false,
      n2 = false
    ;(this._canonical &&
      (this._canonical.y === 0 && (t2 = true),
      this._canonical.y === (1 << this._canonical.z) - 1 && (n2 = true)),
      (t2 || n2) && this._fillPoles(e52, t2, n2))
  }
  _ensureNoPoleVertices() {
    let e52 = this._vertexBuffer
    for (let t2 = 0; t2 < e52.length; t2 += 2) {
      let n2 = e52[t2 + 1]
      ;(n2 === -32768 && (e52[t2 + 1] = -32767),
        n2 === 32767 && (e52[t2 + 1] = 32766))
    }
  }
  _generatePoleQuad(e52, t2, n2, r2, i2, a2) {
    r2 > i2 == (a2 === -32768)
      ? (e52.push(n2),
        e52.push(t2),
        e52.push(this._vertexToIndex(r2, a2)),
        e52.push(this._vertexToIndex(i2, a2)),
        e52.push(n2),
        e52.push(this._vertexToIndex(r2, a2)))
      : (e52.push(t2),
        e52.push(n2),
        e52.push(this._vertexToIndex(r2, a2)),
        e52.push(n2),
        e52.push(this._vertexToIndex(i2, a2)),
        e52.push(this._vertexToIndex(r2, a2)))
  }
  _fillPoles(e52, t2, n2) {
    let r2 = this._vertexBuffer,
      i2 = j,
      a2 = e52.length
    for (let o2 = 2; o2 < a2; o2 += 3) {
      let a3 = e52[o2 - 2],
        s2 = e52[o2 - 1],
        c2 = e52[o2],
        l2 = r2[a3 * 2],
        u2 = r2[a3 * 2 + 1],
        d2 = r2[s2 * 2],
        f2 = r2[s2 * 2 + 1],
        p2 = r2[c2 * 2],
        m2 = r2[c2 * 2 + 1]
      ;(t2 &&
        (u2 === 0 &&
          f2 === 0 &&
          this._generatePoleQuad(e52, a3, s2, l2, d2, xp),
        f2 === 0 && m2 === 0 && this._generatePoleQuad(e52, s2, c2, d2, p2, xp),
        m2 === 0 &&
          u2 === 0 &&
          this._generatePoleQuad(e52, c2, a3, p2, l2, xp)),
        n2 &&
          (u2 === i2 &&
            f2 === i2 &&
            this._generatePoleQuad(e52, a3, s2, l2, d2, Sp),
          f2 === i2 &&
            m2 === i2 &&
            this._generatePoleQuad(e52, s2, c2, d2, p2, Sp),
          m2 === i2 &&
            u2 === i2 &&
            this._generatePoleQuad(e52, c2, a3, p2, l2, Sp)))
    }
  }
  _initializeVertices(e52) {
    for (let t2 = 0; t2 < e52.length; t2 += 2)
      this._vertexToIndex(e52[t2], e52[t2 + 1])
  }
  subdividePolygonInternal(e52, t2) {
    if (this._used) throw Error(`Subdivision: multiple use not allowed.`)
    this._used = true
    let {flattened: n2, holeIndices: r2} = Ep(e52)
    this._initializeVertices(n2)
    let i2
    try {
      let e53 = Ef(n2, r2),
        t3 = this._convertIndices(n2, e53)
      i2 = this._subdivideTrianglesScanline(t3)
    } catch (e53) {
      console.error(e53)
    }
    let a2 = []
    return (
      t2 && (a2 = this._generateOutline(e52)),
      this._ensureNoPoleVertices(),
      this._handlePoles(i2),
      this._granularity >= 2 &&
        this._canonical?.z === 0 &&
        ((i2 = this._removeTrianglesOutsideTileX(i2)),
        (a2 = a2.map(e53 => this._removeLinesOutsideTileX(e53)))),
      {
        verticesFlattened: this._vertexBuffer,
        indicesTriangles: i2,
        indicesLineList: a2,
      }
    )
  }
  _vertexOutsideTileX(e52) {
    let t2 = this._vertexBuffer[e52 * 2]
    return t2 < 0 || t2 > 8192
  }
  _removeTrianglesOutsideTileX(e52) {
    let t2 = []
    for (let n2 = 0; n2 < e52.length; n2 += 3)
      this._vertexOutsideTileX(e52[n2]) ||
        this._vertexOutsideTileX(e52[n2 + 1]) ||
        this._vertexOutsideTileX(e52[n2 + 2]) ||
        t2.push(e52[n2], e52[n2 + 1], e52[n2 + 2])
    return t2
  }
  _removeLinesOutsideTileX(e52) {
    let t2 = []
    for (let n2 = 0; n2 < e52.length; n2 += 2)
      this._vertexOutsideTileX(e52[n2]) ||
        this._vertexOutsideTileX(e52[n2 + 1]) ||
        t2.push(e52[n2], e52[n2 + 1])
    return t2
  }
  _convertIndices(e52, t2) {
    let n2 = []
    for (let r2 of t2) {
      let t3 = e52[r2 * 2],
        i2 = e52[r2 * 2 + 1]
      n2.push(this._vertexToIndex(t3, i2))
    }
    return n2
  }
  _pointArrayToIndices(e52) {
    let t2 = []
    for (let n2 of e52) t2.push(this._vertexToIndex(n2.x, n2.y))
    return t2
  }
}
function wp(e52, t2, n2, r2 = true) {
  return new Cp(n2, t2).subdividePolygonInternal(e52, r2)
}
function Tp(e52, t2, n2 = false) {
  if (!e52 || e52.length < 1 || e52.length < 2) return []
  let r2 = e52[0],
    i2 = e52[e52.length - 1],
    a2 = n2 && (r2.x !== i2.x || r2.y !== i2.y)
  if (t2 < 2) return a2 ? [...e52, e52[0]] : [...e52]
  let o2 = Math.floor(j / t2),
    s2 = []
  s2.push(new l(e52[0].x, e52[0].y))
  let c2 = e52.length,
    u2 = a2 ? c2 : c2 - 1
  for (let t3 = 0; t3 < u2; t3++) {
    let n3 = e52[t3],
      r3 = t3 < c2 - 1 ? e52[t3 + 1] : e52[0],
      i3 = n3.x,
      a3 = n3.y,
      u3 = r3.x,
      d2 = r3.y,
      f2 = i3 !== u3,
      p2 = a3 !== d2
    if (!f2 && !p2) continue
    let m2 = u3 - i3,
      h2 = d2 - a3,
      g2 = Math.abs(m2),
      _2 = Math.abs(h2),
      v2 = i3,
      y2 = a3
    for (;;) {
      let e53 =
          m2 > 0
            ? (Math.floor(v2 / o2) + 1) * o2
            : (Math.ceil(v2 / o2) - 1) * o2,
        t4 =
          h2 > 0
            ? (Math.floor(y2 / o2) + 1) * o2
            : (Math.ceil(y2 / o2) - 1) * o2,
        n4 = Math.abs(v2 - e53),
        r4 = Math.abs(y2 - t4),
        i4 = Math.abs(v2 - u3),
        a4 = Math.abs(y2 - d2),
        c3 = f2 ? n4 / g2 : 1 / 0,
        b3 = p2 ? r4 / _2 : 1 / 0
      if ((i4 <= n4 || !f2) && (a4 <= r4 || !p2)) break
      if ((c3 < b3 && f2) || !p2) {
        ;((v2 = e53), (y2 += h2 * c3))
        let t5 = new l(v2, Math.round(y2))
        ;(s2[s2.length - 1].x !== t5.x || s2[s2.length - 1].y !== t5.y) &&
          s2.push(t5)
      } else {
        ;((v2 += m2 * b3), (y2 = t4))
        let e54 = new l(Math.round(v2), y2)
        ;(s2[s2.length - 1].x !== e54.x || s2[s2.length - 1].y !== e54.y) &&
          s2.push(e54)
      }
    }
    let b2 = new l(u3, d2)
    ;(s2[s2.length - 1].x !== b2.x || s2[s2.length - 1].y !== b2.y) &&
      s2.push(b2)
  }
  return s2
}
function Ep(e52) {
  let t2 = [],
    n2 = []
  for (let r2 of e52)
    if (r2.length !== 0) {
      r2 !== e52[0] && t2.push(n2.length / 2)
      for (let e53 of r2) (n2.push(e53.x), n2.push(e53.y))
    }
  return {flattened: n2, holeIndices: t2}
}
function Dp(e52, t2) {
  let n2 = []
  for (let r2 = 0; r2 < t2.length; r2 += 3) {
    let i2 = t2[r2],
      a2 = t2[r2 + 1],
      o2 = t2[r2 + 2],
      s2 = e52[i2 * 2],
      c2 = e52[i2 * 2 + 1],
      l2 = e52[a2 * 2],
      u2 = e52[a2 * 2 + 1],
      d2 = e52[o2 * 2],
      f2 = e52[o2 * 2 + 1],
      p2 = l2 - s2,
      m2 = u2 - c2,
      h2 = d2 - s2
    p2 * (f2 - c2) - m2 * h2 > 0
      ? (n2.push(i2), n2.push(o2), n2.push(a2))
      : (n2.push(i2), n2.push(a2), n2.push(o2))
  }
  return n2
}
function Op(e52, t2, n2) {
  if (t2.length === 0) throw Error(`Subdivision vertex ring is empty.`)
  let r2 = 0,
    i2 = e52[t2[0] * 2]
  for (let n3 = 1; n3 < t2.length; n3++) {
    let a3 = e52[t2[n3] * 2]
    a3 < i2 && ((i2 = a3), (r2 = n3))
  }
  let a2 = t2.length,
    o2 = r2,
    s2 = (o2 + 1) % a2
  for (;;) {
    let r3 = o2 - 1 >= 0 ? o2 - 1 : a2 - 1,
      i3 = (s2 + 1) % a2,
      c2 = e52[t2[r3] * 2],
      l2 = e52[t2[r3] * 2 + 1],
      u2 = e52[t2[i3] * 2],
      d2 = e52[t2[i3] * 2 + 1],
      f2 = e52[t2[o2] * 2],
      p2 = e52[t2[o2] * 2 + 1],
      m2 = e52[t2[s2] * 2],
      h2 = e52[t2[s2] * 2 + 1],
      g2 = false
    if (c2 < u2) g2 = true
    else if (c2 > u2) g2 = false
    else {
      let e53 = h2 - p2,
        t3 = -(m2 - f2),
        n3 = p2 < h2 ? 1 : -1
      ;((c2 - f2) * e53 + (l2 - p2) * t3) * n3 >
        ((u2 - f2) * e53 + (d2 - p2) * t3) * n3 && (g2 = true)
    }
    if (g2) {
      let e53 = t2[r3],
        i4 = t2[o2],
        c3 = t2[s2]
      ;(e53 !== i4 && e53 !== c3 && i4 !== c3 && n2.push(c3, i4, e53),
        o2--,
        o2 < 0 && (o2 = a2 - 1))
    } else {
      let e53 = t2[i3],
        r4 = t2[o2],
        c3 = t2[s2]
      ;(e53 !== r4 && e53 !== c3 && r4 !== c3 && n2.push(c3, r4, e53),
        s2++,
        s2 >= a2 && (s2 = 0))
    }
    if (r3 === i3) break
  }
}
function kp(e52, t2, n2, r2, i2, a2, o2, s2, c2) {
  let l2 = i2.length / 2,
    u2 = o2 && s2 && c2
  if (l2 < Tu.MAX_VERTEX_ARRAY_LENGTH) {
    let d2 = t2.prepareSegment(l2, n2, r2),
      f2 = d2.vertexLength
    for (let e53 = 0; e53 < a2.length; e53 += 3)
      r2.emplaceBack(f2 + a2[e53], f2 + a2[e53 + 1], f2 + a2[e53 + 2])
    ;((d2.vertexLength += l2), (d2.primitiveLength += a2.length / 3))
    let p2, m2
    u2 &&
      ((m2 = o2.prepareSegment(l2, n2, s2)),
      (p2 = m2.vertexLength),
      (m2.vertexLength += l2))
    for (let t3 = 0; t3 < i2.length; t3 += 2) e52(i2[t3], i2[t3 + 1])
    if (u2)
      for (let e53 of c2) {
        for (let t3 = 1; t3 < e53.length; t3 += 2)
          s2.emplaceBack(p2 + e53[t3 - 1], p2 + e53[t3])
        m2.primitiveLength += e53.length / 2
      }
  } else
    (jp(t2, n2, r2, i2, a2, e52),
      u2 && Mp(o2, n2, s2, i2, c2, e52),
      t2.forceNewSegmentOnNextPrepare(),
      o2?.forceNewSegmentOnNextPrepare())
}
function Ap(e52, t2, n2, r2, i2, a2, o2) {
  if (a2) {
    let a3 = r2.count
    return (
      n2(t2[i2 * 2], t2[i2 * 2 + 1]),
      (e52[i2] = r2.count),
      r2.count++,
      o2.vertexLength++,
      a3
    )
  }
  return e52[i2]
}
function jp(e52, t2, n2, r2, i2, a2) {
  let o2 = []
  for (let e53 = 0; e53 < r2.length / 2; e53++) o2.push(-1)
  let s2 = {count: 0},
    c2 = 0,
    l2 = e52.getOrCreateLatestSegment(t2, n2),
    u2 = l2.vertexLength
  for (let d2 = 2; d2 < i2.length; d2 += 3) {
    let f2 = i2[d2 - 2],
      p2 = i2[d2 - 1],
      m2 = i2[d2],
      h2 = o2[f2] < c2,
      g2 = o2[p2] < c2,
      _2 = o2[m2] < c2,
      v2 = +!!h2 + +!!g2 + +!!_2
    l2.vertexLength + v2 > Tu.MAX_VERTEX_ARRAY_LENGTH &&
      ((l2 = e52.createNewSegment(t2, n2)),
      (c2 = s2.count),
      (h2 = true),
      (g2 = true),
      (_2 = true),
      (u2 = 0))
    let y2 = Ap(o2, r2, a2, s2, f2, h2, l2),
      b2 = Ap(o2, r2, a2, s2, p2, g2, l2),
      x2 = Ap(o2, r2, a2, s2, m2, _2, l2)
    ;(n2.emplaceBack(u2 + y2 - c2, u2 + b2 - c2, u2 + x2 - c2),
      l2.primitiveLength++)
  }
}
function Mp(e52, t2, n2, r2, i2, a2) {
  let o2 = []
  for (let e53 = 0; e53 < r2.length / 2; e53++) o2.push(-1)
  let s2 = {count: 0},
    c2 = 0,
    l2 = e52.getOrCreateLatestSegment(t2, n2),
    u2 = l2.vertexLength
  for (let d2 of i2)
    for (let i3 = 1; i3 < d2.length; i3 += 2) {
      let f2 = d2[i3 - 1],
        p2 = d2[i3],
        m2 = o2[f2] < c2,
        h2 = o2[p2] < c2,
        g2 = +!!m2 + +!!h2
      l2.vertexLength + g2 > Tu.MAX_VERTEX_ARRAY_LENGTH &&
        ((l2 = e52.createNewSegment(t2, n2)),
        (c2 = s2.count),
        (m2 = true),
        (h2 = true),
        (u2 = 0))
      let _2 = Ap(o2, r2, a2, s2, f2, m2, l2),
        v2 = Ap(o2, r2, a2, s2, p2, h2, l2)
      ;(n2.emplaceBack(u2 + _2 - c2, u2 + v2 - c2), l2.primitiveLength++)
    }
}
var Np = class {
  constructor(e52) {
    ;((this.zoom = e52.zoom),
      (this.overscaling = e52.overscaling),
      (this.layers = e52.layers),
      (this.layerIds = this.layers.map(e53 => e53.id)),
      (this.index = e52.index),
      (this.hasDependencies = false),
      (this.patternFeatures = []),
      (this.layoutVertexArray = new su()),
      (this.indexArray = new bu()),
      (this.indexArray2 = new xu()),
      (this.programConfigurations = new nd(e52.layers, e52.zoom)),
      (this.segments = new Tu()),
      (this.segments2 = new Tu()),
      (this.stateDependentLayerIds = this.layers
        .filter(e53 => e53.isStateDependent())
        .map(e53 => e53.id)))
  }
  populate(e52, t2, n2) {
    this.hasDependencies = Sf(`fill`, this.layers, t2)
    let r2 = this.layers[0].layout.get(`fill-sort-key`),
      i2 = !r2.isConstant(),
      a2 = [],
      o2 = new U(this.zoom),
      s2 = this.layers[0]._featureFilter.needGeometry
    for (let {feature: c2, id: l2, index: u2, sourceLayerIndex: d2} of e52) {
      let e53 = ld(c2, s2)
      if (!this.layers[0]._featureFilter.filter(o2, e53, n2)) continue
      let f2 = i2 ? r2.evaluate(e53, {}, n2, t2.availableImages) : void 0,
        p2 = {
          id: l2,
          properties: c2.properties,
          type: c2.type,
          sourceLayerIndex: d2,
          index: u2,
          geometry: s2 ? e53.geometry : cd(c2),
          patterns: {},
          sortKey: f2,
        }
      a2.push(p2)
    }
    i2 && a2.sort((e53, t3) => e53.sortKey - t3.sortKey)
    for (let r3 of a2) {
      let {geometry: i3, index: a3, sourceLayerIndex: o3} = r3
      if (this.hasDependencies) {
        let e53 = Cf(`fill`, this.layers, r3, {zoom: this.zoom}, t2)
        this.patternFeatures.push(e53)
      } else this.addFeature(r3, i3, a3, n2, {}, t2.subdivisionGranularity)
      let s3 = e52[a3].feature
      t2.featureIndex.insert(s3, i3, a3, o3, this.index)
    }
  }
  update(e52, t2, n2) {
    this.stateDependentLayers.length &&
      this.programConfigurations.updatePaintArrays(
        e52,
        t2,
        this.stateDependentLayers,
        {imagePositions: n2}
      )
  }
  addFeatures(e52, t2, n2) {
    for (let r2 of this.patternFeatures)
      this.addFeature(
        r2,
        r2.geometry,
        r2.index,
        t2,
        n2,
        e52.subdivisionGranularity
      )
  }
  isEmpty() {
    return this.layoutVertexArray.length === 0
  }
  uploadPending() {
    return !this.uploaded || this.programConfigurations.needsUpload
  }
  upload(e52) {
    ;(this.uploaded ||
      ((this.layoutVertexBuffer = e52.createVertexBuffer(
        this.layoutVertexArray,
        xf
      )),
      (this.indexBuffer = e52.createIndexBuffer(this.indexArray)),
      (this.indexBuffer2 = e52.createIndexBuffer(this.indexArray2))),
      this.programConfigurations.upload(e52),
      (this.uploaded = true))
  }
  destroy() {
    this.layoutVertexBuffer &&
      (this.layoutVertexBuffer.destroy(),
      this.indexBuffer.destroy(),
      this.indexBuffer2.destroy(),
      this.programConfigurations.destroy(),
      this.segments.destroy(),
      this.segments2.destroy())
  }
  addFeature(e52, t2, n2, r2, i2, a2) {
    for (let e53 of oi(t2, 500)) {
      let t3 = wp(e53, r2, a2.fill.getGranularityForZoomLevel(r2.z)),
        n3 = this.layoutVertexArray
      kp(
        (e54, t4) => {
          n3.emplaceBack(e54, t4)
        },
        this.segments,
        this.layoutVertexArray,
        this.indexArray,
        t3.verticesFlattened,
        t3.indicesTriangles,
        this.segments2,
        this.indexArray2,
        t3.indicesLineList
      )
    }
    this.programConfigurations.populatePaintArrays(
      this.layoutVertexArray.length,
      e52,
      n2,
      {imagePositions: i2, canonical: r2}
    )
  }
}
H(`FillBucket`, Np, {omit: [`layers`, `patternFeatures`]})
let Pp
const Fp = () =>
  (Pp ||= new cl({
    "fill-sort-key": new G(M.layout_fill[`fill-sort-key`], `fill-sort-key`),
  }))
let Ip
const Lp = () =>
  (Ip ||= new cl({
    "fill-antialias": new W(M.paint_fill[`fill-antialias`], `fill-antialias`),
    "fill-opacity": new G(M.paint_fill[`fill-opacity`], `fill-opacity`),
    "fill-layer-opacity": new W(
      M.paint_fill[`fill-layer-opacity`],
      `fill-layer-opacity`
    ),
    "fill-color": new G(M.paint_fill[`fill-color`], `fill-color`),
    "fill-outline-color": new G(
      M.paint_fill[`fill-outline-color`],
      `fill-outline-color`
    ),
    "fill-translate": new W(M.paint_fill[`fill-translate`], `fill-translate`),
    "fill-translate-anchor": new W(
      M.paint_fill[`fill-translate-anchor`],
      `fill-translate-anchor`
    ),
    "fill-pattern": new al(M.paint_fill[`fill-pattern`], `fill-pattern`),
  }))
var Rp = {
  get paint() {
    return Lp()
  },
  get layout() {
    return Fp()
  },
}
const zp = e52 => e52.type === `fill`
var Bp = class extends dl {
  constructor(e52, t2) {
    super(e52, Rp, t2)
  }
  recalculate(e52, t2) {
    super.recalculate(e52, t2)
    let n2 = this.paint._values[`fill-outline-color`]
    n2.value.kind === `constant` &&
      n2.value.value === void 0 &&
      (this.paint._values[`fill-outline-color`] =
        this.paint._values[`fill-color`])
  }
  createBucket(e52) {
    return new Np(e52)
  }
  queryRadius() {
    return Dd(this.paint.get(`fill-translate`))
  }
  queryIntersectsFeature({
    queryGeometry: e52,
    geometry: t2,
    transform: n2,
    pixelsToTileUnits: r2,
  }) {
    return hd(
      Od(
        e52,
        this.paint.get(`fill-translate`),
        this.paint.get(`fill-translate-anchor`),
        -n2.bearingInRadians,
        r2
      ),
      t2
    )
  }
  isTileClipped() {
    return true
  }
}
const Vp = q(
    [
      {name: `a_pos`, components: 2, type: `Int16`},
      {name: `a_normal_ed`, components: 4, type: `Int16`},
    ],
    4
  ),
  Hp = q([{name: `a_centroid`, components: 2, type: `Int16`}], 4),
  Up = Vp.members
;(Vp.size, Vp.alignment)
var Wp = class e44 {
  constructor() {
    ;((this.minX = 1 / 0),
      (this.maxX = -1 / 0),
      (this.minY = 1 / 0),
      (this.maxY = -1 / 0))
  }
  extend(e52) {
    return (
      (this.minX = Math.min(this.minX, e52.x)),
      (this.minY = Math.min(this.minY, e52.y)),
      (this.maxX = Math.max(this.maxX, e52.x)),
      (this.maxY = Math.max(this.maxY, e52.y)),
      this
    )
  }
  expandBy(e52) {
    return (
      (this.minX -= e52),
      (this.minY -= e52),
      (this.maxX += e52),
      (this.maxY += e52),
      (this.minX > this.maxX || this.minY > this.maxY) &&
        ((this.minX = 1 / 0),
        (this.maxX = -1 / 0),
        (this.minY = 1 / 0),
        (this.maxY = -1 / 0)),
      this
    )
  }
  shrinkBy(e52) {
    return this.expandBy(-e52)
  }
  map(t2) {
    let n2 = new e44()
    return (
      n2.extend(t2(new l(this.minX, this.minY))),
      n2.extend(t2(new l(this.maxX, this.minY))),
      n2.extend(t2(new l(this.minX, this.maxY))),
      n2.extend(t2(new l(this.maxX, this.maxY))),
      n2
    )
  }
  static fromPoints(t2) {
    let n2 = new e44()
    for (let e52 of t2) n2.extend(e52)
    return n2
  }
  contains(e52) {
    return (
      e52.x >= this.minX &&
      e52.x <= this.maxX &&
      e52.y >= this.minY &&
      e52.y <= this.maxY
    )
  }
  empty() {
    return this.minX > this.maxX
  }
  width() {
    return this.maxX - this.minX
  }
  height() {
    return this.maxY - this.minY
  }
  covers(e52) {
    return (
      !this.empty() &&
      !e52.empty() &&
      e52.minX >= this.minX &&
      e52.maxX <= this.maxX &&
      e52.minY >= this.minY &&
      e52.maxY <= this.maxY
    )
  }
  intersects(e52) {
    return (
      !this.empty() &&
      !e52.empty() &&
      e52.minX <= this.maxX &&
      e52.maxX >= this.minX &&
      e52.minY <= this.maxY &&
      e52.maxY >= this.minY
    )
  }
}
const Gp = Wp.fromPoints([new l(0, 0), new l(j, j)])
function Kp(e52, t2) {
  return (
    (e52.x === t2.x && (e52.x < 0 || e52.x > 8192)) ||
    (e52.y === t2.y && (e52.y < 0 || e52.y > 8192))
  )
}
function qp(e52) {
  return (
    e52.every(e53 => e53.x < 0) ||
    e52.every(e53 => e53.x > 8192) ||
    e52.every(e53 => e53.y < 0) ||
    e52.every(e53 => e53.y > 8192)
  )
}
var Jp = class {
  constructor(e52, t2, n2, r2, i2) {
    for (
      this.properties = /* @__PURE__ */ Object.create(null),
        this.extent = n2,
        this.type = 0,
        this.id = void 0,
        this._pbf = e52,
        this._geometry = -1,
        this._keys = r2,
        this._values = i2;
      e52.pos < t2;
    ) {
      let t3 = e52.readVarint()
      if (t3 === 8) this.id = e52.readVarint()
      else if (t3 === 18) {
        let t4 = e52.readVarint() + e52.pos
        for (; e52.pos < t4;) {
          let t5 = r2[e52.readVarint()],
            n3 = i2[e52.readVarint()]
          this.properties[t5] = n3
        }
      } else
        t3 === 24
          ? (this.type = e52.readVarint())
          : (t3 === 34 && (this._geometry = e52.pos), e52.skip(t3))
    }
  }
  loadGeometry() {
    if (this._geometry < 0) throw Error(`feature has no geometry`)
    let e52 = this._pbf
    e52.pos = this._geometry
    let t2 = e52.readVarint() + e52.pos,
      n2 = [],
      r2,
      i2 = 1,
      a2 = 0,
      o2 = 0,
      s2 = 0
    for (; e52.pos < t2;) {
      if (a2 <= 0) {
        let t3 = e52.readVarint()
        if (((i2 = t3 & 7), (a2 = t3 >> 3), a2 === 0)) continue
      }
      if ((a2--, i2 === 1))
        ((o2 += e52.readSVarint()),
          (s2 += e52.readSVarint()),
          r2 && n2.push(r2),
          (r2 = [new l(o2, s2)]))
      else if (i2 === 2)
        ((o2 += e52.readSVarint()),
          (s2 += e52.readSVarint()),
          r2 && r2.push(new l(o2, s2)))
      else if (i2 === 7) r2 && r2.push(r2[0].clone())
      else throw Error(`unknown command ${i2}`)
    }
    return (r2 && n2.push(r2), n2)
  }
  bbox() {
    if (this._geometry < 0) throw Error(`feature has no geometry`)
    let e52 = this._pbf
    e52.pos = this._geometry
    let t2 = e52.readVarint() + e52.pos,
      n2 = 1,
      r2 = 0,
      i2 = 0,
      a2 = 0,
      o2 = 1 / 0,
      s2 = -1 / 0,
      c2 = 1 / 0,
      l2 = -1 / 0
    for (; e52.pos < t2;) {
      if (r2 <= 0) {
        let t3 = e52.readVarint()
        if (((n2 = t3 & 7), (r2 = t3 >> 3), r2 === 0)) continue
      }
      if ((r2--, n2 === 1 || n2 === 2))
        ((i2 += e52.readSVarint()),
          (a2 += e52.readSVarint()),
          i2 < o2 && (o2 = i2),
          i2 > s2 && (s2 = i2),
          a2 < c2 && (c2 = a2),
          a2 > l2 && (l2 = a2))
      else if (n2 !== 7) throw Error(`unknown command ${n2}`)
    }
    return [o2, c2, s2, l2]
  }
  toGeoJSON(e52, t2, n2) {
    let r2 = this.extent * 2 ** n2,
      i2 = this.extent * e52,
      a2 = this.extent * t2,
      o2 = this.loadGeometry()
    function s2(e53) {
      return [
        ((e53.x + i2) * 360) / r2 - 180,
        (360 / Math.PI) *
          Math.atan(Math.exp((1 - ((e53.y + a2) * 2) / r2) * Math.PI)) -
          90,
      ]
    }
    function c2(e53) {
      return e53.map(s2)
    }
    let l2
    if (this.type === 1) {
      let e53 = []
      for (let t4 of o2) e53.push(t4[0])
      let t3 = c2(e53)
      l2 =
        e53.length === 1
          ? {type: `Point`, coordinates: t3[0]}
          : {type: `MultiPoint`, coordinates: t3}
    } else if (this.type === 2) {
      let e53 = o2.map(c2)
      l2 =
        e53.length === 1
          ? {type: `LineString`, coordinates: e53[0]}
          : {type: `MultiLineString`, coordinates: e53}
    } else if (this.type === 3) {
      let e53 = Yp(o2),
        t3 = []
      for (let n3 of e53) t3.push(n3.map(c2))
      l2 =
        t3.length === 1
          ? {type: `Polygon`, coordinates: t3[0]}
          : {type: `MultiPolygon`, coordinates: t3}
    } else throw Error(`unknown feature type`)
    let u2 = {type: `Feature`, geometry: l2, properties: this.properties}
    return (this.id != null && (u2.id = this.id), u2)
  }
}
Jp.types = [`Unknown`, `Point`, `LineString`, `Polygon`]
function Yp(e52) {
  let t2 = e52.length
  if (t2 <= 1) return [e52]
  let n2 = [],
    r2,
    i2
  for (let a2 = 0; a2 < t2; a2++) {
    let t3 = Xp(e52[a2])
    t3 !== 0 &&
      (i2 === void 0 && (i2 = t3 < 0),
      i2 === t3 < 0
        ? (r2 && n2.push(r2), (r2 = [e52[a2]]))
        : r2 && r2.push(e52[a2]))
  }
  return (r2 && n2.push(r2), n2)
}
function Xp(e52) {
  let t2 = 0
  for (let n2 = 0, r2 = e52.length, i2 = r2 - 1, a2, o2; n2 < r2; i2 = n2++)
    ((a2 = e52[n2]), (o2 = e52[i2]), (t2 += (o2.x - a2.x) * (a2.y + o2.y)))
  return t2
}
var Zp = class {
  constructor(e52, t2) {
    for (
      this.version = 1,
        this.name = ``,
        this.extent = 4096,
        this.length = 0,
        this._pbf = e52,
        this._keys = [],
        this._values = [],
        this._features = [],
        t2 === void 0 && (t2 = e52.length);
      e52.pos < t2;
    ) {
      let t3 = e52.readVarint()
      t3 === 10
        ? (this.name = e52.readString())
        : t3 === 18
          ? (this._features.push(e52.pos), e52.skip(t3))
          : t3 === 26
            ? this._keys.push(e52.readString())
            : t3 === 34
              ? this._values.push(Qp(e52))
              : t3 === 40
                ? (this.extent = e52.readVarint())
                : t3 === 120
                  ? (this.version = e52.readVarint())
                  : e52.skip(t3)
    }
    this.length = this._features.length
  }
  feature(e52) {
    if (e52 < 0 || e52 >= this._features.length)
      throw Error(`feature index out of bounds`)
    this._pbf.pos = this._features[e52]
    let t2 = this._pbf.readVarint() + this._pbf.pos
    return new Jp(this._pbf, t2, this.extent, this._keys, this._values)
  }
}
function Qp(e52) {
  let t2 = null,
    n2 = e52.readVarint() + e52.pos
  for (; e52.pos < n2;) {
    let n3 = e52.readVarint()
    t2 =
      n3 === 10
        ? e52.readString()
        : n3 === 21
          ? e52.readFloat()
          : n3 === 25
            ? e52.readDouble()
            : n3 === 32
              ? e52.readVarint(true)
              : n3 === 40
                ? e52.readVarint()
                : n3 === 48
                  ? e52.readSVarint()
                  : n3 === 56
                    ? e52.readBoolean()
                    : (e52.skip(n3), null)
  }
  if (t2 == null) throw Error(`unknown feature value`)
  return t2
}
var $p = class {
  constructor(e52, t2 = e52.length) {
    let n2 = /* @__PURE__ */ Object.create(null)
    for (; e52.pos < t2;) {
      let t3 = e52.readVarint()
      if (t3 === 26) {
        let t4 = new Zp(e52, e52.readVarint() + e52.pos)
        t4.length && (n2[t4.name] = t4)
      } else e52.skip(t3)
    }
    this.layers = n2
  }
}
const em = 63710088e-1
var tm = class e45 {
  constructor(e52, t2) {
    if (isNaN(e52) || isNaN(t2))
      throw Error(`Invalid LngLat object: (${e52}, ${t2})`)
    if (((this.lng = +e52), (this.lat = +t2), this.lat > 90 || this.lat < -90))
      throw Error(`Invalid LngLat latitude value: must be between -90 and 90`)
  }
  wrap() {
    return new e45(xt(this.lng, -180, 180), this.lat)
  }
  toArray() {
    return [this.lng, this.lat]
  }
  toString() {
    return `LngLat(${this.lng}, ${this.lat})`
  }
  distanceTo(e52) {
    let t2 = Math.PI / 180,
      n2 = this.lat * t2,
      r2 = e52.lat * t2,
      i2 =
        Math.sin(n2) * Math.sin(r2) +
        Math.cos(n2) * Math.cos(r2) * Math.cos((e52.lng - this.lng) * t2)
    return em * Math.acos(Math.min(i2, 1))
  }
  static convert(t2) {
    if (t2 instanceof e45) return t2
    if (Array.isArray(t2) && (t2.length === 2 || t2.length === 3))
      return new e45(Number(t2[0]), Number(t2[1]))
    if (!Array.isArray(t2) && typeof t2 == `object` && t2)
      return new e45(Number(`lng` in t2 ? t2.lng : t2.lon), Number(t2.lat))
    throw Error(
      "`LngLatLike` argument must be specified as a LngLat instance, an object {lng: <lng>, lat: <lat>}, an object {lon: <lng>, lat: <lat>}, or an array of [<lng>, <lat>]"
    )
  }
}
const nm = 2 * Math.PI * em
function rm(e52) {
  return nm * Math.cos((e52 * Math.PI) / 180)
}
function im(e52) {
  return (180 + e52) / 360
}
function am(e52) {
  return (
    (180 -
      (180 / Math.PI) *
        Math.log(Math.tan(Math.PI / 4 + (e52 * Math.PI) / 360))) /
    360
  )
}
function om(e52, t2) {
  return e52 / rm(t2)
}
function sm(e52) {
  return e52 * 360 - 180
}
function cm(e52) {
  let t2 = 180 - e52 * 360
  return (360 / Math.PI) * Math.atan(Math.exp((t2 * Math.PI) / 180)) - 90
}
function lm(e52, t2) {
  return e52 * rm(cm(t2))
}
function um(e52) {
  return 1 / Math.cos((e52 * Math.PI) / 180)
}
var dm = class e46 {
  constructor(e52, t2, n2 = 0) {
    ;((this.x = +e52), (this.y = +t2), (this.z = +n2))
  }
  static fromLngLat(t2, n2 = 0) {
    let r2 = tm.convert(t2)
    return new e46(im(r2.lng), am(r2.lat), om(n2, r2.lat))
  }
  toLngLat() {
    return new tm(sm(this.x), cm(this.y))
  }
  toAltitude() {
    return lm(this.z, this.y)
  }
  meterInMercatorCoordinateUnits() {
    return (1 / nm) * um(cm(this.y))
  }
}
const fm = 89.25
function pm(e52, t2, n2) {
  let r2 = 1 / (1 << n2.z)
  return new dm((e52 / j) * r2 + n2.x * r2, (t2 / j) * r2 + n2.y * r2)
}
function mm(e52, t2, n2) {
  return pm(e52, t2, n2).toLngLat()
}
function hm(e52, t2) {
  let n2 = bt(t2.lat, -85.051129, cn)
  return new l(im(t2.lng) * e52, am(n2) * e52)
}
function gm(e52, t2) {
  return new dm(t2.x / e52, t2.y / e52).toLngLat()
}
function _m(e52) {
  return (
    e52.cameraToCenterDistance *
    Math.min(Math.tan(tn(90 - e52.pitch)) * 0.85, Math.tan(tn(fm - e52.pitch)))
  )
}
function vm(e52, t2) {
  let n2 = e52.canonical,
    r2 = t2 / Ot(n2.z),
    i2 = n2.x + 2 ** n2.z * e52.wrap,
    a2 = new Float64Array(16)
  return (
    C(a2),
    E(a2, a2, [i2 * r2, n2.y * r2, 0]),
    D(a2, a2, [r2 / j, r2 / j, 1]),
    a2
  )
}
function ym(e52, t2, n2, r2, i2) {
  let a2 = dm.fromLngLat(e52, t2),
    o2 = i2 * om(1, e52.lat),
    {x: s2, y: c2, z: l2} = xm(n2, r2),
    u2 = o2 * -s2,
    d2 = o2 * -c2,
    f2 = o2 * l2
  return new dm(a2.x + u2, a2.y + d2, a2.z + f2)
}
function bm(e52) {
  let t2 = om(1, e52.center.lat) * e52.worldSize
  return ym(
    e52.center,
    e52.elevation,
    e52.pitch,
    e52.bearing,
    e52.cameraToCenterDistance / t2
  )
}
function xm(e52, t2) {
  let n2 = tn(e52),
    r2 = tn(t2),
    i2 = Math.cos(-n2),
    a2 = Math.sin(n2)
  return {x: a2 * Math.sin(r2), y: -a2 * Math.cos(r2), z: i2}
}
function Sm(e52, t2, n2) {
  if (t2 <= 0 || !e52 || e52.length === 0) return e52
  let r2 = Cm(t2, n2)
  return e52.map(e53 => wm(e53, r2))
}
function Cm(e52, t2) {
  let n2 = mm(j / 2, j / 2, t2),
    r2 = dm.fromLngLat(n2).meterInMercatorCoordinateUnits(),
    i2 = (1 << t2.z) * j
  return e52 * r2 * i2
}
function wm(e52, t2) {
  if (!e52 || e52.length < 3) return e52
  let n2 =
      e52[0].x === e52[e52.length - 1].x && e52[0].y === e52[e52.length - 1].y,
    r2 = n2 ? e52.length - 1 : e52.length
  if (r2 < 3) return e52
  let i2 = []
  for (let n3 = 0; n3 < r2; n3++) {
    let a3 = e52[(n3 - 1 + r2) % r2],
      o2 = e52[n3],
      s2 = e52[(n3 + 1) % r2]
    if (Kp(a3, o2) || Kp(o2, s2)) {
      i2.push(o2.clone())
      continue
    }
    Em(i2, a3, o2, s2, t2)
  }
  let a2 = Tm(i2)
  return a2.length < 3 ? e52 : (n2 && a2.push(a2[0].clone()), a2)
}
function Tm(e52) {
  let t2 = []
  for (let n2 of e52) {
    let e53 = n2.round(),
      r2 = t2[t2.length - 1]
    ;(r2?.x !== e53.x || r2?.y !== e53.y) && t2.push(e53)
  }
  for (
    ;
    t2.length > 1 &&
    t2[0].x === t2[t2.length - 1].x &&
    t2[0].y === t2[t2.length - 1].y;
  )
    t2.pop()
  return t2
}
function Em(e52, t2, n2, r2, i2) {
  let a2 = t2.sub(n2),
    o2 = r2.sub(n2),
    s2 = a2.mag(),
    c2 = o2.mag()
  if (s2 < 1e-6 || c2 < 1e-6) {
    e52.push(n2.clone())
    return
  }
  ;(a2._div(s2), o2._div(c2))
  let l2 = a2.x * o2.x + a2.y * o2.y
  if (Math.abs(l2) > Math.cos((5 * Math.PI) / 180)) {
    e52.push(n2.clone())
    return
  }
  let u2 = 0.2,
    d2 = Math.min(i2, s2 * u2, c2 * u2),
    f2 = n2.add(a2.mult(d2)),
    p2 = n2.add(o2.mult(d2)),
    m2 = Math.sqrt((1 + l2) / 2),
    h2 = n2.add(
      a2
        .add(o2)
        ._unit()
        ._mult(d2 / m2)
    ),
    g2 = f2.sub(h2).angleWith(p2.sub(h2)),
    _2 = Math.max(2, Math.ceil(Math.abs(g2) / (Math.PI / 6) - 1e-6))
  for (let t3 = 0; t3 <= _2; t3++) e52.push(f2.rotateAround((t3 / _2) * g2, h2))
}
const Dm = 8192
function Om(e52, t2, n2, r2, i2, a2, o2, s2) {
  e52.emplaceBack(
    t2,
    n2,
    Math.floor(r2 * Dm) * 2 + o2,
    i2 * Dm * 2,
    a2 * Dm * 2,
    Math.round(s2)
  )
}
var km = class {
  constructor(e52) {
    ;((this.zoom = e52.zoom),
      (this.overscaling = e52.overscaling),
      (this.layers = e52.layers),
      (this.layerIds = this.layers.map(e53 => e53.id)),
      (this.index = e52.index),
      (this.hasDependencies = false),
      (this.layoutVertexArray = new cu()),
      (this.centroidVertexArray = new ru()),
      (this.indexArray = new bu()),
      (this.programConfigurations = new nd(e52.layers, e52.zoom)),
      (this.segments = new Tu()),
      (this.stateDependentLayerIds = this.layers
        .filter(e53 => e53.isStateDependent())
        .map(e53 => e53.id)))
  }
  populate(e52, t2, n2) {
    ;((this.features = []),
      (this.hasDependencies = Sf(`fill-extrusion`, this.layers, t2)))
    let r2 = new U(this.zoom),
      i2 = this.layers[0],
      a2 = i2.layout.get(`fill-extrusion-rounded-corner-distance`),
      o2 = i2._featureFilter.needGeometry
    for (let {feature: s2, id: c2, index: l2, sourceLayerIndex: u2} of e52) {
      let e53 = ld(s2, o2)
      if (!i2._featureFilter.filter(r2, e53, n2)) continue
      let d2 = o2 ? e53.geometry : cd(s2),
        f2 = {
          id: c2,
          sourceLayerIndex: u2,
          index: l2,
          geometry: a2 > 0 ? Sm(d2, a2, n2) : d2,
          properties: s2.properties,
          type: s2.type,
          patterns: {},
        }
      ;(this.hasDependencies
        ? this.features.push(
            Cf(`fill-extrusion`, this.layers, f2, {zoom: this.zoom}, t2)
          )
        : this.addFeature(
            f2,
            f2.geometry,
            l2,
            n2,
            {},
            t2.subdivisionGranularity
          ),
        t2.featureIndex.insert(s2, f2.geometry, l2, u2, this.index, true))
    }
  }
  addFeatures(e52, t2, n2) {
    for (let r2 of this.features) {
      let {geometry: i2} = r2
      this.addFeature(r2, i2, r2.index, t2, n2, e52.subdivisionGranularity)
    }
  }
  update(e52, t2, n2) {
    this.stateDependentLayers.length &&
      this.programConfigurations.updatePaintArrays(
        e52,
        t2,
        this.stateDependentLayers,
        {imagePositions: n2}
      )
  }
  isEmpty() {
    return (
      this.layoutVertexArray.length === 0 &&
      this.centroidVertexArray.length === 0
    )
  }
  uploadPending() {
    return !this.uploaded || this.programConfigurations.needsUpload
  }
  upload(e52) {
    ;(this.uploaded ||
      ((this.layoutVertexBuffer = e52.createVertexBuffer(
        this.layoutVertexArray,
        Up
      )),
      (this.centroidVertexBuffer = e52.createVertexBuffer(
        this.centroidVertexArray,
        Hp.members,
        true
      )),
      (this.indexBuffer = e52.createIndexBuffer(this.indexArray))),
      this.programConfigurations.upload(e52),
      (this.uploaded = true))
  }
  destroy() {
    this.layoutVertexBuffer &&
      (this.layoutVertexBuffer.destroy(),
      this.indexBuffer.destroy(),
      this.programConfigurations.destroy(),
      this.segments.destroy(),
      this.centroidVertexBuffer.destroy())
  }
  addFeature(e52, t2, n2, r2, i2, a2) {
    let o2 = this.layers[0],
      s2 = o2.layout
        ? o2.layout.get(`fill-extrusion-rounded-corner-distance`)
        : 0,
      c2 = s2 > 0 ? Sm(t2, s2, r2) : t2
    for (let t3 of oi(c2, 500)) {
      let n3 = {x: 0, y: 0, sampleCount: 0},
        i3 = this.layoutVertexArray.length
      this.processPolygon(n3, r2, e52, t3, a2)
      let o3 = this.layoutVertexArray.length - i3,
        s3 = Math.floor(n3.x / n3.sampleCount),
        c3 = Math.floor(n3.y / n3.sampleCount)
      for (let e53 = 0; e53 < o3; e53++)
        this.centroidVertexArray.emplaceBack(s3, c3)
    }
    this.programConfigurations.populatePaintArrays(
      this.layoutVertexArray.length,
      e52,
      n2,
      {imagePositions: i2, canonical: r2}
    )
  }
  processPolygon(e52, t2, n2, r2, i2) {
    if (r2.length < 1 || qp(r2[0])) return
    for (let t3 of r2) t3.length !== 0 && Am(e52, t3)
    let a2 = {
        segment: this.segments.prepareSegment(
          4,
          this.layoutVertexArray,
          this.indexArray
        ),
      },
      o2 = i2.fill.getGranularityForZoomLevel(t2.z),
      s2 = Jp.types[n2.type] === `Polygon`
    for (let e53 of r2) {
      if (e53.length === 0 || qp(e53)) continue
      let t3 = Tp(e53, o2, s2)
      this._generateSideFaces(t3, a2)
    }
    if (!s2) return
    let c2 = wp(r2, t2, o2, false),
      l2 = this.layoutVertexArray
    kp(
      (e53, t3) => {
        Om(l2, e53, t3, 0, 0, 1, 1, 0)
      },
      this.segments,
      this.layoutVertexArray,
      this.indexArray,
      c2.verticesFlattened,
      c2.indicesTriangles
    )
  }
  _generateSideFaces(e52, t2) {
    let n2 = 0
    for (let r2 = 1; r2 < e52.length; r2++) {
      let i2 = e52[r2],
        a2 = e52[r2 - 1]
      if (Kp(i2, a2)) continue
      t2.segment.vertexLength + 4 > Tu.MAX_VERTEX_ARRAY_LENGTH &&
        (t2.segment = this.segments.prepareSegment(
          4,
          this.layoutVertexArray,
          this.indexArray
        ))
      let o2 = i2.sub(a2)._perp()._unit(),
        s2 = a2.dist(i2)
      ;(n2 + s2 > 32768 && (n2 = 0),
        Om(this.layoutVertexArray, i2.x, i2.y, o2.x, o2.y, 0, 0, n2),
        Om(this.layoutVertexArray, i2.x, i2.y, o2.x, o2.y, 0, 1, n2),
        (n2 += s2),
        Om(this.layoutVertexArray, a2.x, a2.y, o2.x, o2.y, 0, 0, n2),
        Om(this.layoutVertexArray, a2.x, a2.y, o2.x, o2.y, 0, 1, n2))
      let c2 = t2.segment.vertexLength
      ;(this.indexArray.emplaceBack(c2, c2 + 2, c2 + 1),
        this.indexArray.emplaceBack(c2 + 1, c2 + 2, c2 + 3),
        (t2.segment.vertexLength += 4),
        (t2.segment.primitiveLength += 2))
    }
  }
}
function Am(e52, t2) {
  for (let n2 = 0; n2 < t2.length; n2++) {
    let r2 = t2[n2]
    ;(n2 !== t2.length - 1 || t2[0].x !== r2.x || t2[0].y !== r2.y) &&
      ((e52.x += r2.x), (e52.y += r2.y), e52.sampleCount++)
  }
}
H(`FillExtrusionBucket`, km, {omit: [`layers`, `features`]})
let jm
const Mm = () =>
  (jm ||= new cl({
    "fill-extrusion-rounded-corner-distance": new W(
      M[`layout_fill-extrusion`][`fill-extrusion-rounded-corner-distance`],
      `fill-extrusion-rounded-corner-distance`
    ),
  }))
let Nm
const Pm = () =>
  (Nm ||= new cl({
    "fill-extrusion-opacity": new W(
      M[`paint_fill-extrusion`][`fill-extrusion-opacity`],
      `fill-extrusion-opacity`
    ),
    "fill-extrusion-color": new G(
      M[`paint_fill-extrusion`][`fill-extrusion-color`],
      `fill-extrusion-color`
    ),
    "fill-extrusion-translate": new W(
      M[`paint_fill-extrusion`][`fill-extrusion-translate`],
      `fill-extrusion-translate`
    ),
    "fill-extrusion-translate-anchor": new W(
      M[`paint_fill-extrusion`][`fill-extrusion-translate-anchor`],
      `fill-extrusion-translate-anchor`
    ),
    "fill-extrusion-pattern": new al(
      M[`paint_fill-extrusion`][`fill-extrusion-pattern`],
      `fill-extrusion-pattern`
    ),
    "fill-extrusion-height": new G(
      M[`paint_fill-extrusion`][`fill-extrusion-height`],
      `fill-extrusion-height`
    ),
    "fill-extrusion-base": new G(
      M[`paint_fill-extrusion`][`fill-extrusion-base`],
      `fill-extrusion-base`
    ),
    "fill-extrusion-vertical-gradient": new W(
      M[`paint_fill-extrusion`][`fill-extrusion-vertical-gradient`],
      `fill-extrusion-vertical-gradient`
    ),
  }))
var Fm = {
  get paint() {
    return Pm()
  },
  get layout() {
    return Mm()
  },
}
const Im = e52 => e52.type === `fill-extrusion`
var Lm = class extends dl {
  constructor(e52, t2) {
    super(e52, Fm, t2)
  }
  createBucket(e52) {
    return new km(e52)
  }
  queryRadius() {
    return Dd(this.paint.get(`fill-extrusion-translate`))
  }
  is3D() {
    return true
  }
  queryIntersectsFeature({
    queryGeometry: e52,
    feature: t2,
    featureState: n2,
    geometry: r2,
    transform: i2,
    pixelsToTileUnits: a2,
    pixelPosMatrix: o2,
  }) {
    let s2 = Od(
        e52,
        this.paint.get(`fill-extrusion-translate`),
        this.paint.get(`fill-extrusion-translate-anchor`),
        -i2.bearingInRadians,
        a2
      ),
      c2 = this.paint.get(`fill-extrusion-height`).evaluate(t2, n2),
      l2 = this.paint.get(`fill-extrusion-base`).evaluate(t2, n2),
      u2 = Hm(s2, o2, 0),
      d2 = Vm(r2, l2, c2, o2),
      f2 = d2[0],
      p2 = d2[1]
    return Bm(f2, p2, u2)
  }
}
function Rm(e52, t2) {
  return e52.x * t2.x + e52.y * t2.y
}
function zm(e52, t2) {
  if (e52.length === 1) {
    let n2 = 0,
      r2 = t2[n2++],
      i2
    for (; !i2 || r2.equals(i2);) if (((i2 = t2[n2++]), !i2)) return 1 / 0
    for (; n2 < t2.length; n2++) {
      let a2 = t2[n2],
        o2 = e52[0],
        s2 = i2.sub(r2),
        c2 = a2.sub(r2),
        l2 = o2.sub(r2),
        u2 = Rm(s2, s2),
        d2 = Rm(s2, c2),
        f2 = Rm(c2, c2),
        p2 = Rm(l2, s2),
        m2 = Rm(l2, c2),
        h2 = u2 * f2 - d2 * d2,
        g2 = (f2 * p2 - d2 * m2) / h2,
        _2 = (u2 * m2 - d2 * p2) / h2,
        v2 = 1 - g2 - _2,
        y2 = r2.z * v2 + i2.z * g2 + a2.z * _2
      if (isFinite(y2)) return y2
    }
    return 1 / 0
  }
  {
    let e53 = 1 / 0
    for (let n2 of t2) e53 = Math.min(e53, n2.z)
    return e53
  }
}
function Bm(e52, t2, n2) {
  let r2 = 1 / 0
  hd(n2, t2) && (r2 = zm(n2, t2[0]))
  for (let i2 = 0; i2 < t2.length; i2++) {
    let a2 = t2[i2],
      o2 = e52[i2]
    for (let e53 = 0; e53 < a2.length - 1; e53++) {
      let t3 = a2[e53],
        i3 = a2[e53 + 1],
        s2 = o2[e53],
        c2 = [t3, i3, o2[e53 + 1], s2, t3]
      pd(n2, c2) && (r2 = Math.min(r2, zm(n2, c2)))
    }
  }
  return r2 !== 1 / 0 && r2
}
function Vm(e52, t2, n2, r2) {
  let i2 = [],
    a2 = [],
    o2 = r2[8] * t2,
    s2 = r2[9] * t2,
    c2 = r2[10] * t2,
    u2 = r2[11] * t2,
    d2 = r2[8] * n2,
    f2 = r2[9] * n2,
    p2 = r2[10] * n2,
    m2 = r2[11] * n2
  for (let t3 of e52) {
    let e53 = [],
      n3 = []
    for (let i3 of t3) {
      let t4 = i3.x,
        a3 = i3.y,
        h2 = r2[0] * t4 + r2[4] * a3 + r2[12],
        g2 = r2[1] * t4 + r2[5] * a3 + r2[13],
        _2 = r2[2] * t4 + r2[6] * a3 + r2[14],
        v2 = r2[3] * t4 + r2[7] * a3 + r2[15],
        y2 = h2 + o2,
        b2 = g2 + s2,
        x2 = _2 + c2,
        S2 = v2 + u2,
        C2 = h2 + d2,
        w2 = g2 + f2,
        T2 = _2 + p2,
        E2 = v2 + m2,
        D2 = new l(y2 / S2, b2 / S2)
      ;((D2.z = x2 / S2), e53.push(D2))
      let O2 = new l(C2 / E2, w2 / E2)
      ;((O2.z = T2 / E2), n3.push(O2))
    }
    ;(i2.push(e53), a2.push(n3))
  }
  return [i2, a2]
}
function Hm(e52, t2, n2) {
  let r2 = []
  for (let i2 of e52) {
    let e53 = [i2.x, i2.y, n2, 1]
    ;(Ne(e53, e53, t2), r2.push(new l(e53[0] / e53[3], e53[1] / e53[3])))
  }
  return r2
}
function Um(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = t2 + ((n2 - t2) >> 1),
    o2 = n2 - t2,
    s2,
    c2 = e52[t2],
    l2 = e52[t2 + 1],
    u2 = e52[n2],
    d2 = e52[n2 + 1]
  for (let r3 = t2 + 3; r3 < n2; r3 += 3) {
    let t3 = Wm(e52[r3], e52[r3 + 1], c2, l2, u2, d2)
    if (t3 > i2) {
      ;((s2 = r3), (i2 = t3))
      continue
    }
    if (t3 === i2) {
      let e53 = Math.abs(r3 - a2)
      e53 < o2 && ((s2 = r3), (o2 = e53))
    }
  }
  i2 > r2 &&
    (s2 - t2 > 3 && Um(e52, t2, s2, r2),
    (e52[s2 + 2] = i2),
    n2 - s2 > 3 && Um(e52, s2, n2, r2))
}
function Wm(e52, t2, n2, r2, i2, a2) {
  let o2 = i2 - n2,
    s2 = a2 - r2
  if (o2 !== 0 || s2 !== 0) {
    let c2 = ((e52 - n2) * o2 + (t2 - r2) * s2) / (o2 * o2 + s2 * s2)
    c2 > 1
      ? ((n2 = i2), (r2 = a2))
      : c2 > 0 && ((n2 += o2 * c2), (r2 += s2 * c2))
  }
  return ((o2 = e52 - n2), (s2 = t2 - r2), o2 * o2 + s2 * s2)
}
function Gm(e52, t2, n2, r2) {
  let i2 = {type: t2, geom: n2},
    a2 = {
      id: e52 ?? null,
      type: i2.type,
      geometry: i2.geom,
      tags: r2,
      minX: 1 / 0,
      minY: 1 / 0,
      maxX: -1 / 0,
      maxY: -1 / 0,
    }
  switch (i2.type) {
    case `Point`:
    case `MultiPoint`:
      qm(a2, i2.geom)
      break
    case `LineString`:
      qm(a2, i2.geom.points)
      break
    case `Polygon`:
      qm(a2, i2.geom[0].points)
      break
    case `MultiLineString`:
      for (let e53 of i2.geom) qm(a2, e53.points)
      break
    case `MultiPolygon`:
      for (let e53 of i2.geom) qm(a2, e53[0].points)
  }
  return a2
}
function Km(e52) {
  let t2 = e52
  e52.points.length > 64 && (t2.points = new Float64Array(e52.points))
}
function qm(e52, t2) {
  for (let n2 = 0; n2 < t2.length; n2 += 3)
    ((e52.minX = Math.min(e52.minX, t2[n2])),
      (e52.minY = Math.min(e52.minY, t2[n2 + 1])),
      (e52.maxX = Math.max(e52.maxX, t2[n2])),
      (e52.maxY = Math.max(e52.maxY, t2[n2 + 1])))
}
function Jm(e52, t2) {
  let n2 = []
  switch (e52.type) {
    case `FeatureCollection`:
      for (let r2 = 0; r2 < e52.features.length; r2++)
        Ym(n2, e52.features[r2], t2, r2)
      break
    case `Feature`:
      Ym(n2, e52, t2)
      break
    default:
      Ym(n2, {type: `Feature`, geometry: e52, properties: void 0}, t2)
  }
  return n2
}
function Ym(e52, t2, n2, r2, i2 = 0) {
  if (!t2.geometry) return
  if (i2 > 1024)
    throw Error(`GeometryCollection nesting exceeds supported depth: 1024`)
  if (t2.geometry.type === `GeometryCollection`) {
    Zm(e52, t2, t2.geometry, n2, r2, i2 + 1)
    return
  }
  if (!t2.geometry.coordinates?.length) return
  let a2 = Xm(t2, n2, r2),
    o2 = (n2.tolerance / ((1 << n2.maxZoom) * n2.extent)) ** 2
  switch (t2.geometry.type) {
    case `Point`:
      Qm(e52, a2, t2.geometry, t2.properties)
      return
    case `MultiPoint`:
      $m(e52, a2, t2.geometry, t2.properties)
      return
    case `LineString`:
      eh(e52, a2, t2.geometry, o2, t2.properties)
      return
    case `MultiLineString`:
      th(e52, a2, t2.geometry, o2, n2, t2.properties)
      return
    case `Polygon`:
      nh(e52, a2, t2.geometry, o2, t2.properties)
      return
    case `MultiPolygon`:
      rh(e52, a2, t2.geometry, o2, t2.properties)
      return
    default:
      throw Error(`Input data is not a valid GeoJSON object.`)
  }
}
function Xm(e52, t2, n2) {
  return t2.promoteId
    ? e52.properties?.[t2.promoteId]
    : t2.generateId
      ? n2 || 0
      : e52.id
}
function Zm(e52, t2, n2, r2, i2, a2 = 0) {
  for (let o2 of n2.geometries)
    Ym(
      e52,
      {id: t2.id, type: `Feature`, geometry: o2, properties: t2.properties},
      r2,
      i2,
      a2
    )
}
function Qm(e52, t2, n2, r2) {
  let i2 = []
  ;(i2.push(oh(n2.coordinates[0]), sh(n2.coordinates[1]), 0),
    e52.push(Gm(t2, `Point`, i2, r2)))
}
function $m(e52, t2, n2, r2) {
  let i2 = []
  for (let e53 of n2.coordinates) i2.push(oh(e53[0]), sh(e53[1]), 0)
  e52.push(Gm(t2, `MultiPoint`, i2, r2))
}
function eh(e52, t2, n2, r2, i2) {
  let a2 = {points: []}
  ;(ih(n2.coordinates, a2, r2, false), e52.push(Gm(t2, `LineString`, a2, i2)))
}
function th(e52, t2, n2, r2, i2, a2) {
  if (i2.lineMetrics)
    for (let i3 of n2.coordinates) {
      let n3 = {points: []}
      ;(ih(i3, n3, r2, false), e52.push(Gm(t2, `LineString`, n3, a2)))
    }
  else {
    let i3 = []
    ;(ah(n2.coordinates, i3, r2, false),
      e52.push(Gm(t2, `MultiLineString`, i3, a2)))
  }
}
function nh(e52, t2, n2, r2, i2) {
  let a2 = []
  ;(ah(n2.coordinates, a2, r2, true), e52.push(Gm(t2, `Polygon`, a2, i2)))
}
function rh(e52, t2, n2, r2, i2) {
  let a2 = []
  for (let e53 of n2.coordinates) {
    let t3 = []
    ;(ah(e53, t3, r2, true), a2.push(t3))
  }
  e52.push(Gm(t2, `MultiPolygon`, a2, i2))
}
function ih(e52, t2, n2, r2) {
  let i2,
    a2,
    o2 = 0
  for (let n3 = 0; n3 < e52.length; n3++) {
    let s3 = oh(e52[n3][0]),
      c2 = sh(e52[n3][1])
    ;(t2.points.push(s3, c2, 0),
      n3 > 0 &&
        (o2 += r2
          ? (i2 * c2 - s3 * a2) / 2
          : Math.sqrt((s3 - i2) ** 2 + (c2 - a2) ** 2)),
      (i2 = s3),
      (a2 = c2))
  }
  let s2 = t2.points.length - 3
  ;((t2.points[2] = 1),
    n2 > 0 && Um(t2.points, 0, s2, n2),
    (t2.points[s2 + 2] = 1),
    Km(t2),
    (t2.size = Math.abs(o2)),
    (t2.start = 0),
    (t2.end = t2.size))
}
function ah(e52, t2, n2, r2) {
  for (let i2 = 0; i2 < e52.length; i2++) {
    let a2 = {points: []}
    ;(ih(e52[i2], a2, n2, r2), t2.push(a2))
  }
}
function oh(e52) {
  return e52 / 360 + 0.5
}
function sh(e52) {
  let t2 = Math.sin((e52 * Math.PI) / 180),
    n2 = 0.5 - (0.25 * Math.log((1 + t2) / (1 - t2))) / Math.PI
  return n2 < 0 ? 0 : n2 > 1 ? 1 : n2
}
function ch(e52) {
  return {type: `FeatureCollection`, features: e52.map(e53 => lh(e53))}
}
function lh(e52) {
  let t2 = {type: `Feature`, geometry: uh(e52), properties: e52.tags}
  return (e52.id != null && (t2.id = e52.id), t2)
}
function uh(e52) {
  let {type: t2, geometry: n2} = e52
  switch (t2) {
    case `Point`:
      return {type: t2, coordinates: fh(n2[0], n2[1])}
    case `MultiPoint`:
      return {type: t2, coordinates: dh(n2)}
    case `LineString`:
      return {type: t2, coordinates: dh(n2.points)}
    case `MultiLineString`:
    case `Polygon`:
      return {type: t2, coordinates: n2.map(e53 => dh(e53.points))}
    case `MultiPolygon`:
      return {
        type: t2,
        coordinates: n2.map(e53 => e53.map(e54 => dh(e54.points))),
      }
  }
}
function dh(e52) {
  let t2 = []
  for (let n2 = 0; n2 < e52.length; n2 += 3) t2.push(fh(e52[n2], e52[n2 + 1]))
  return t2
}
function fh(e52, t2) {
  return [ph(e52), mh(t2)]
}
function ph(e52) {
  return (e52 - 0.5) * 360
}
function mh(e52) {
  let t2 = ((180 - e52 * 360) * Math.PI) / 180
  return (360 * Math.atan(Math.exp(t2))) / Math.PI - 90
}
function hh(e52, t2, n2, r2, i2, a2, o2, s2) {
  if (((n2 /= t2), (r2 /= t2), a2 >= n2 && o2 < r2)) return e52
  if (o2 < n2 || a2 >= r2) return null
  let c2 = []
  for (let t3 of e52) {
    let e53 = i2 === 0 ? t3.minX : t3.minY,
      a3 = i2 === 0 ? t3.maxX : t3.maxY
    if (e53 >= n2 && a3 < r2) {
      c2.push(t3)
      continue
    }
    if (!(a3 < n2 || e53 >= r2))
      switch (t3.type) {
        case `Point`:
        case `MultiPoint`:
          gh(t3, c2, n2, r2, i2)
          continue
        case `LineString`:
          _h(t3, c2, n2, r2, i2, s2)
          continue
        case `MultiLineString`:
          vh(t3, c2, n2, r2, i2)
          continue
        case `Polygon`:
          yh(t3, c2, n2, r2, i2)
          continue
        case `MultiPolygon`:
          bh(t3, c2, n2, r2, i2)
          continue
      }
  }
  return c2.length ? c2 : null
}
function gh(e52, t2, n2, r2, i2) {
  let a2 = []
  if ((xh(e52.geometry, a2, n2, r2, i2), !a2.length)) return
  let o2 = a2.length === 3 ? `Point` : `MultiPoint`
  t2.push(Gm(e52.id, o2, a2, e52.tags))
}
function _h(e52, t2, n2, r2, i2, a2) {
  let o2 = []
  if ((Sh(e52.geometry, o2, n2, r2, i2, false, a2.lineMetrics), o2.length)) {
    if (a2.lineMetrics) {
      for (let n3 of o2) t2.push(Gm(e52.id, `LineString`, n3, e52.tags))
      return
    }
    if (o2.length > 1) {
      t2.push(Gm(e52.id, `MultiLineString`, o2, e52.tags))
      return
    }
    t2.push(Gm(e52.id, `LineString`, o2[0], e52.tags))
  }
}
function vh(e52, t2, n2, r2, i2) {
  let a2 = []
  if ((wh(e52.geometry, a2, n2, r2, i2, false), a2.length)) {
    if (a2.length === 1) {
      t2.push(Gm(e52.id, `LineString`, a2[0], e52.tags))
      return
    }
    t2.push(Gm(e52.id, `MultiLineString`, a2, e52.tags))
  }
}
function yh(e52, t2, n2, r2, i2) {
  let a2 = []
  ;(wh(e52.geometry, a2, n2, r2, i2, true),
    a2.length && t2.push(Gm(e52.id, `Polygon`, a2, e52.tags)))
}
function bh(e52, t2, n2, r2, i2) {
  let a2 = []
  for (let t3 of e52.geometry) {
    let e53 = []
    ;(wh(t3, e53, n2, r2, i2, true), e53.length && a2.push(e53))
  }
  a2.length && t2.push(Gm(e52.id, `MultiPolygon`, a2, e52.tags))
}
function xh(e52, t2, n2, r2, i2) {
  for (let a2 = 0; a2 < e52.length; a2 += 3) {
    let o2 = e52[a2 + i2]
    o2 >= n2 && o2 <= r2 && Th(t2, e52[a2], e52[a2 + 1], e52[a2 + 2])
  }
}
function Sh(e52, t2, n2, r2, i2, a2, o2) {
  let s2 = Ch(e52),
    c2 = i2 === 0 ? Eh : Dh,
    l2 = e52.start,
    u2,
    d2
  for (let f3 = 0; f3 < e52.points.length - 3; f3 += 3) {
    let p3 = e52.points[f3],
      m3 = e52.points[f3 + 1],
      h3 = e52.points[f3 + 2],
      g3 = e52.points[f3 + 3],
      _2 = e52.points[f3 + 4],
      v2 = i2 === 0 ? p3 : m3,
      y2 = i2 === 0 ? g3 : _2,
      b2 = false
    ;(o2 && (u2 = Math.sqrt((p3 - g3) ** 2 + (m3 - _2) ** 2)),
      v2 < n2
        ? y2 > n2 &&
          ((d2 = c2(s2, p3, m3, g3, _2, n2)), o2 && (s2.start = l2 + u2 * d2))
        : v2 > r2
          ? y2 < r2 &&
            ((d2 = c2(s2, p3, m3, g3, _2, r2)), o2 && (s2.start = l2 + u2 * d2))
          : Th(s2.points, p3, m3, h3),
      y2 < n2 && v2 >= n2 && ((d2 = c2(s2, p3, m3, g3, _2, n2)), (b2 = true)),
      y2 > r2 && v2 <= r2 && ((d2 = c2(s2, p3, m3, g3, _2, r2)), (b2 = true)),
      !a2 && b2 && (o2 && (s2.end = l2 + u2 * d2), t2.push(s2), (s2 = Ch(e52))),
      o2 && (l2 += u2))
  }
  let f2 = e52.points.length - 3,
    p2 = e52.points[f2],
    m2 = e52.points[f2 + 1],
    h2 = e52.points[f2 + 2],
    g2 = i2 === 0 ? p2 : m2
  ;(g2 >= n2 && g2 <= r2 && Th(s2.points, p2, m2, h2),
    (f2 = s2.points.length - 3),
    a2 &&
      f2 >= 3 &&
      (s2.points[f2] !== s2.points[0] || s2.points[f2 + 1] !== s2.points[1]) &&
      Th(s2.points, s2.points[0], s2.points[1], s2.points[2]),
    s2.points.length && (Km(s2), t2.push(s2)))
}
function Ch(e52) {
  return {points: [], size: e52.size, start: e52.start, end: e52.end}
}
function wh(e52, t2, n2, r2, i2, a2) {
  for (let o2 of e52) Sh(o2, t2, n2, r2, i2, a2, false)
}
function Th(e52, t2, n2, r2) {
  e52.push(t2, n2, r2)
}
function Eh(e52, t2, n2, r2, i2, a2) {
  let o2 = (a2 - t2) / (r2 - t2)
  return (Th(e52.points, a2, n2 + (i2 - n2) * o2, 1), o2)
}
function Dh(e52, t2, n2, r2, i2, a2) {
  let o2 = (a2 - n2) / (i2 - n2)
  return (Th(e52.points, t2 + (r2 - t2) * o2, a2, 1), o2)
}
function Oh(e52, t2) {
  let n2 = t2.buffer / t2.extent,
    r2 = e52,
    i2 = hh(e52, 1, -1 - n2, n2, 0, -1, 2, t2),
    a2 = hh(e52, 1, 1 - n2, 2 + n2, 0, -1, 2, t2)
  return !i2 && !a2
    ? r2
    : ((r2 = hh(e52, 1, -n2, 1 + n2, 0, -1, 2, t2) || []),
      i2 && (r2 = kh(i2, 1).concat(r2)),
      a2 && (r2 = r2.concat(kh(a2, -1))),
      r2)
}
function kh(e52, t2) {
  let n2 = []
  for (let r2 of e52)
    switch (r2.type) {
      case `Point`:
      case `MultiPoint`: {
        let e53 = Ah(r2.geometry, t2)
        n2.push(Gm(r2.id, r2.type, e53, r2.tags))
        continue
      }
      case `LineString`: {
        let e53 = jh(r2.geometry, t2)
        n2.push(Gm(r2.id, r2.type, e53, r2.tags))
        continue
      }
      case `MultiLineString`:
      case `Polygon`: {
        let e53 = []
        for (let n3 of r2.geometry) e53.push(jh(n3, t2))
        n2.push(Gm(r2.id, r2.type, e53, r2.tags))
        continue
      }
      case `MultiPolygon`: {
        let e53 = []
        for (let n3 of r2.geometry) {
          let r3 = []
          for (let e54 of n3) r3.push(jh(e54, t2))
          e53.push(r3)
        }
        n2.push(Gm(r2.id, r2.type, e53, r2.tags))
        continue
      }
    }
  return n2
}
function Ah(e52, t2) {
  let n2 = []
  for (let r2 = 0; r2 < e52.length; r2 += 3)
    n2.push(e52[r2] + t2, e52[r2 + 1], e52[r2 + 2])
  return n2
}
function jh(e52, t2) {
  let n2 = {points: [], size: e52.size}
  e52.start !== void 0 && ((n2.start = e52.start), (n2.end = e52.end))
  for (let r2 = 0; r2 < e52.points.length; r2 += 3)
    n2.points.push(e52.points[r2] + t2, e52.points[r2 + 1], e52.points[r2 + 2])
  return (Km(n2), n2)
}
function Mh(e52, t2, n2) {
  let r2 = Fh(t2, n2),
    i2 = []
  if (
    (r2.removeAll && ((i2 = e52), (e52 = [])), r2.remove.size || r2.add.size)
  ) {
    let t3 = []
    for (let n3 of e52)
      (r2.remove.has(n3.id) || r2.add.has(n3.id)) && t3.push(n3)
    if (t3.length) {
      i2 = i2.concat(t3)
      let n3 = new Set(t3.map(e53 => e53.id))
      e52 = e52.filter(e53 => !n3.has(e53.id))
    }
    if (r2.add.size) {
      let t4 = Jm(
        {type: `FeatureCollection`, features: Array.from(r2.add.values())},
        n2
      )
      ;((t4 = Oh(t4, n2)), (i2 = i2.concat(t4)), (e52 = e52.concat(t4)))
    }
  }
  if (r2.update.size) {
    let t3 = /* @__PURE__ */ new Map(),
      a2 = []
    for (let n3 of e52)
      r2.update.has(n3.id)
        ? t3.set(n3.id, [...(t3.get(n3.id) || []), n3])
        : a2.push(n3)
    for (let [e53, o2] of r2.update) {
      let r3 = t3.get(e53)
      if (!r3 || r3.length === 0) continue
      let s2 = Nh(r3, o2, n2)
      ;((i2 = i2.concat(r3, s2)), (a2 = a2.concat(s2)))
    }
    e52 = a2
  }
  return {affected: i2, source: e52}
}
function Nh(e52, t2, n2) {
  let r2 = !!t2.newGeometry,
    i2 =
      t2.removeAllProperties ||
      t2.removeProperties?.length > 0 ||
      t2.addOrUpdateProperties?.length > 0
  if (r2) {
    let r3 = e52[0],
      a2 = Jm(
        {
          type: `FeatureCollection`,
          features: [
            {
              type: `Feature`,
              id: r3.id,
              geometry: t2.newGeometry,
              properties: i2 ? Ph(r3.tags, t2) : r3.tags,
            },
          ],
        },
        n2
      )
    return ((a2 = Oh(a2, n2)), a2)
  }
  if (i2) {
    let n3 = []
    for (let r3 of e52) {
      let e53 = {...r3}
      ;((e53.tags = Ph(e53.tags, t2)), n3.push(e53))
    }
    return n3
  }
  return e52
}
function Ph(e52, t2) {
  if (t2.removeAllProperties) return {}
  let n2 = {...(e52 || {})}
  if (t2.removeProperties) for (let e53 of t2.removeProperties) delete n2[e53]
  if (t2.addOrUpdateProperties)
    for (let {key: e53, value: r2} of t2.addOrUpdateProperties) n2[e53] = r2
  return n2
}
function Fh(e52, t2) {
  return e52
    ? {
        removeAll: e52.removeAll,
        remove: new Set(e52.remove || []),
        add: new Map(
          e52.add?.map(e53 => [
            t2.promoteId ? e53.properties[t2.promoteId] : e53.id,
            e53,
          ])
        ),
        update: new Map(e52.update?.map(e53 => [e53.id, e53])),
      }
    : {
        remove: /* @__PURE__ */ new Set(),
        add: /* @__PURE__ */ new Map(),
        update: /* @__PURE__ */ new Map(),
      }
}
const Ih = [
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
  ],
  J = new Uint32Array(96)
var Lh = class e47 {
  static from(t2) {
    if (!t2 || t2.byteLength === void 0 || t2.buffer)
      throw Error(
        `Data must be an instance of ArrayBuffer or SharedArrayBuffer.`
      )
    let [n2, r2] = new Uint8Array(t2, 0, 2)
    if (n2 !== 219)
      throw Error(`Data does not appear to be in a KDBush format.`)
    let i2 = r2 >> 4
    if (i2 !== 1) throw Error(`Got v${i2} data when expected v1.`)
    let a2 = Ih[r2 & 15]
    if (!a2) throw Error(`Unrecognized array type.`)
    let [o2] = new Uint16Array(t2, 2, 1),
      [s2] = new Uint32Array(t2, 4, 1)
    return new e47(s2, o2, a2, void 0, t2)
  }
  constructor(e52, t2 = 64, n2 = Float64Array, r2 = ArrayBuffer, i2) {
    if (isNaN(e52) || e52 < 0) throw Error(`Unexpected numItems value: ${e52}.`)
    ;((this.numItems = +e52),
      (this.nodeSize = Math.min(Math.max(+t2, 2), 65535)),
      (this.ArrayType = n2),
      (this.IndexArrayType = e52 < 65536 ? Uint16Array : Uint32Array))
    let a2 = Ih.indexOf(this.ArrayType),
      o2 = e52 * 2 * this.ArrayType.BYTES_PER_ELEMENT,
      s2 = e52 * this.IndexArrayType.BYTES_PER_ELEMENT,
      c2 = (8 - (s2 % 8)) % 8
    if (a2 < 0) throw Error(`Unexpected typed array class: ${n2}.`)
    if (i2)
      ((this.data = i2),
        (this.ids = new this.IndexArrayType(i2, 8, e52)),
        (this.coords = new n2(i2, 8 + s2 + c2, e52 * 2)),
        (this._pos = e52 * 2),
        (this._finished = true))
    else {
      let i3 = (this.data = new r2(8 + o2 + s2 + c2))
      ;((this.ids = new this.IndexArrayType(i3, 8, e52)),
        (this.coords = new n2(i3, 8 + s2 + c2, e52 * 2)),
        (this._pos = 0),
        (this._finished = false),
        new Uint8Array(i3, 0, 2).set([219, 16 + a2]),
        (new Uint16Array(i3, 2, 1)[0] = t2),
        (new Uint32Array(i3, 4, 1)[0] = e52))
    }
  }
  add(e52, t2) {
    let n2 = this._pos >> 1
    return (
      (this.ids[n2] = n2),
      (this.coords[this._pos++] = e52),
      (this.coords[this._pos++] = t2),
      n2
    )
  }
  finish() {
    let e52 = this._pos >> 1
    if (e52 !== this.numItems)
      throw Error(`Added ${e52} items when expected ${this.numItems}.`)
    return (
      Rh(this.ids, this.coords, this.nodeSize, 0, this.numItems - 1, 0),
      (this._finished = true),
      this
    )
  }
  range(e52, t2, n2, r2) {
    if (!this._finished)
      throw Error(`Data not yet indexed - call index.finish().`)
    let {ids: i2, coords: a2, nodeSize: o2} = this
    ;((J[0] = 0), (J[1] = i2.length - 1), (J[2] = 0))
    let s2 = 3,
      c2 = []
    for (; s2 > 0;) {
      let l2 = J[--s2],
        u2 = J[--s2],
        d2 = J[--s2]
      if (u2 - d2 <= o2) {
        for (let o3 = d2; o3 <= u2; o3++) {
          let s3 = a2[2 * o3],
            l3 = a2[2 * o3 + 1]
          s3 >= e52 && s3 <= n2 && l3 >= t2 && l3 <= r2 && c2.push(i2[o3])
        }
        continue
      }
      let f2 = (d2 + u2) >> 1,
        p2 = a2[2 * f2],
        m2 = a2[2 * f2 + 1]
      ;(p2 >= e52 && p2 <= n2 && m2 >= t2 && m2 <= r2 && c2.push(i2[f2]),
        (l2 === 0 ? e52 <= p2 : t2 <= m2) &&
          ((J[s2++] = d2), (J[s2++] = f2 - 1), (J[s2++] = 1 - l2)),
        (l2 === 0 ? n2 >= p2 : r2 >= m2) &&
          ((J[s2++] = f2 + 1), (J[s2++] = u2), (J[s2++] = 1 - l2)))
    }
    return c2
  }
  within(e52, t2, n2) {
    let r2 = []
    return (this.withinInto(e52, t2, n2, r2), r2)
  }
  withinInto(e52, t2, n2, r2) {
    if (!this._finished)
      throw Error(`Data not yet indexed - call index.finish().`)
    let {ids: i2, coords: a2, nodeSize: o2} = this
    ;((J[0] = 0), (J[1] = i2.length - 1), (J[2] = 0))
    let s2 = 3,
      c2 = 0,
      l2 = n2 * n2
    for (; s2 > 0;) {
      let u2 = J[--s2],
        d2 = J[--s2],
        f2 = J[--s2]
      if (d2 - f2 <= o2) {
        for (let n3 = f2; n3 <= d2; n3++)
          Hh(a2[2 * n3], a2[2 * n3 + 1], e52, t2) <= l2 && (r2[c2++] = i2[n3])
        continue
      }
      let p2 = (f2 + d2) >> 1,
        m2 = a2[2 * p2],
        h2 = a2[2 * p2 + 1]
      ;(Hh(m2, h2, e52, t2) <= l2 && (r2[c2++] = i2[p2]),
        (u2 === 0 ? e52 - n2 <= m2 : t2 - n2 <= h2) &&
          ((J[s2++] = f2), (J[s2++] = p2 - 1), (J[s2++] = 1 - u2)),
        (u2 === 0 ? e52 + n2 >= m2 : t2 + n2 >= h2) &&
          ((J[s2++] = p2 + 1), (J[s2++] = d2), (J[s2++] = 1 - u2)))
    }
    return c2
  }
}
function Rh(e52, t2, n2, r2, i2, a2) {
  if (i2 - r2 <= n2) return
  let o2 = (r2 + i2) >> 1
  ;(zh(e52, t2, o2, r2, i2, a2),
    Rh(e52, t2, n2, r2, o2 - 1, 1 - a2),
    Rh(e52, t2, n2, o2 + 1, i2, 1 - a2))
}
function zh(e52, t2, n2, r2, i2, a2) {
  for (; i2 > r2;) {
    if (i2 - r2 > 600) {
      let o3 = i2 - r2 + 1,
        s3 = n2 - r2 + 1,
        c3 = Math.log(o3),
        l2 = 0.5 * Math.exp((2 * c3) / 3),
        u2 =
          0.5 *
          Math.sqrt((c3 * l2 * (o3 - l2)) / o3) *
          (s3 - o3 / 2 < 0 ? -1 : 1)
      zh(
        e52,
        t2,
        n2,
        Math.max(r2, Math.floor(n2 - (s3 * l2) / o3 + u2)),
        Math.min(i2, Math.floor(n2 + ((o3 - s3) * l2) / o3 + u2)),
        a2
      )
    }
    let o2 = t2[2 * n2 + a2],
      s2 = r2,
      c2 = i2
    for (
      Bh(e52, t2, r2, n2), t2[2 * i2 + a2] > o2 && Bh(e52, t2, r2, i2);
      s2 < c2;
    ) {
      for (Bh(e52, t2, s2, c2), s2++, c2--; t2[2 * s2 + a2] < o2;) s2++
      for (; t2[2 * c2 + a2] > o2;) c2--
    }
    ;(t2[2 * r2 + a2] === o2
      ? Bh(e52, t2, r2, c2)
      : (c2++, Bh(e52, t2, c2, i2)),
      c2 <= n2 && (r2 = c2 + 1),
      n2 <= c2 && (i2 = c2 - 1))
  }
}
function Bh(e52, t2, n2, r2) {
  ;(Vh(e52, n2, r2), Vh(t2, 2 * n2, 2 * r2), Vh(t2, 2 * n2 + 1, 2 * r2 + 1))
}
function Vh(e52, t2, n2) {
  let r2 = e52[t2]
  ;((e52[t2] = e52[n2]), (e52[n2] = r2))
}
function Hh(e52, t2, n2, r2) {
  let i2 = e52 - n2,
    a2 = t2 - r2
  return i2 * i2 + a2 * a2
}
const Uh = {
  minZoom: 0,
  maxZoom: 16,
  minPoints: 2,
  radius: 40,
  extent: 512,
  nodeSize: 64,
  log: false,
  generateId: false,
  reduce: null,
  map: e52 => e52,
}
var Wh = class {
  constructor(e52) {
    ;((this.options = Object.assign(Object.create(Uh), e52)),
      (this.trees = Array(this.options.maxZoom + 1)),
      (this.stride = this.options.reduce ? 7 : 6),
      (this.clusterProps = []),
      (this.points = []))
  }
  load(e52) {
    let t2 = []
    for (let n2 of e52) {
      if (!n2.geometry) continue
      let [e53, r2] = n2.geometry.coordinates,
        [i2, a2] = [oh(e53), sh(r2)],
        o2 = {id: n2.id, type: `Point`, geometry: [i2, a2], tags: n2.properties}
      t2.push(o2)
    }
    this.createIndex(t2)
  }
  initialize(e52) {
    let t2 = []
    for (let n2 of e52) n2.type === `Point` && t2.push(n2)
    this.createIndex(t2)
  }
  updateIndex(e52, t2, n2) {
    ;((this.options = Object.assign(Object.create(Uh), n2.clusterOptions)),
      this.initialize(e52))
  }
  createIndex(e52) {
    let {log: t2, minZoom: n2, maxZoom: r2} = this.options
    t2 && console.time(`total time`)
    let i2 = `prepare ${e52.length} points`
    ;(t2 && console.time(i2), (this.points = e52))
    let a2 = []
    for (let t3 = 0; t3 < e52.length; t3++) {
      let n3 = e52[t3]
      if (!n3?.geometry) continue
      let [r3, i3] = n3.geometry
      ;((r3 = Math.fround(r3)),
        (i3 = Math.fround(i3)),
        a2.push(r3, i3, 1 / 0, t3, -1, 1),
        this.options.reduce && a2.push(0))
    }
    let o2 = (this.trees[r2 + 1] = this.createTree(a2))
    t2 && console.timeEnd(i2)
    for (let e53 = r2; e53 >= n2; e53--) {
      let n3 = Date.now()
      ;((o2 = this.trees[e53] = this.createTree(this.cluster(o2, e53))),
        t2 &&
          console.log(
            `z%d: %d clusters in %dms`,
            e53,
            o2.numItems,
            Date.now() - n3
          ))
    }
    t2 && console.timeEnd(`total time`)
  }
  getClusters(e52, t2) {
    return this.getClustersInternal(e52, t2).map(e53 => lh(e53))
  }
  getClustersInternal(e52, t2) {
    let n2 = ((((e52[0] + 180) % 360) + 360) % 360) - 180,
      r2 = Math.max(-90, Math.min(90, e52[1])),
      i2 = e52[2] === 180 ? 180 : ((((e52[2] + 180) % 360) + 360) % 360) - 180,
      a2 = Math.max(-90, Math.min(90, e52[3]))
    if (e52[2] - e52[0] >= 360) ((n2 = -180), (i2 = 180))
    else if (n2 > i2) {
      let e53 = this.getClustersInternal([n2, r2, 180, a2], t2),
        o3 = this.getClustersInternal([-180, r2, i2, a2], t2)
      return e53.concat(o3)
    }
    let o2 = this.trees[this.limitZoom(t2)],
      s2 = o2.range(oh(n2), sh(a2), oh(i2), sh(r2)),
      c2 = o2.flatData,
      l2 = []
    for (let e53 of s2) {
      let t3 = this.stride * e53
      l2.push(
        c2[t3 + 5] > 1 ? Gh(c2, t3, this.clusterProps) : this.points[c2[t3 + 3]]
      )
    }
    return l2
  }
  getChildren(e52) {
    let t2 = this.getOriginId(e52),
      n2 = this.getOriginZoom(e52),
      r2 = Error(`No cluster with the specified id: ` + e52),
      i2 = this.trees[n2]
    if (!i2) throw r2
    let a2 = i2.flatData
    if (t2 * this.stride >= a2.length) throw r2
    let o2 = this.options.radius / (this.options.extent * 2 ** (n2 - 1)),
      s2 = a2[t2 * this.stride],
      c2 = a2[t2 * this.stride + 1],
      l2 = i2.within(s2, c2, o2),
      u2 = []
    for (let t3 of l2) {
      let n3 = t3 * this.stride
      a2[n3 + 4] === e52 &&
        u2.push(
          a2[n3 + 5] > 1
            ? Kh(a2, n3, this.clusterProps)
            : lh(this.points[a2[n3 + 3]])
        )
    }
    if (u2.length === 0) throw r2
    return u2
  }
  getLeaves(e52, t2, n2) {
    ;((t2 ||= 10), (n2 ||= 0))
    let r2 = []
    return (this.appendLeaves(r2, e52, t2, n2, 0), r2)
  }
  getTile(e52, t2, n2) {
    let r2 = this.trees[this.limitZoom(e52)]
    if (!r2) return null
    let i2 = 2 ** e52,
      {extent: a2, radius: o2} = this.options,
      s2 = o2 / a2,
      c2 = (n2 - s2) / i2,
      l2 = (n2 + 1 + s2) / i2,
      u2 = {transformed: true, features: [], source: null, x: t2, y: n2, z: e52}
    return (
      this.addTileFeatures(
        r2.range((t2 - s2) / i2, c2, (t2 + 1 + s2) / i2, l2),
        r2.flatData,
        t2,
        n2,
        i2,
        u2
      ),
      t2 === 0 &&
        this.addTileFeatures(
          r2.range(1 - s2 / i2, c2, 1, l2),
          r2.flatData,
          i2,
          n2,
          i2,
          u2
        ),
      t2 === i2 - 1 &&
        this.addTileFeatures(
          r2.range(0, c2, s2 / i2, l2),
          r2.flatData,
          -1,
          n2,
          i2,
          u2
        ),
      u2
    )
  }
  getClusterExpansionZoom(e52) {
    return this.getOriginZoom(e52)
  }
  appendLeaves(e52, t2, n2, r2, i2) {
    let a2 = this.getChildren(t2)
    for (let t3 of a2) {
      let a3 = t3.properties
      if (
        (a3?.cluster
          ? i2 + a3.point_count <= r2
            ? (i2 += a3.point_count)
            : (i2 = this.appendLeaves(e52, a3.cluster_id, n2, r2, i2))
          : i2 < r2
            ? i2++
            : e52.push(t3),
        e52.length === n2)
      )
        break
    }
    return i2
  }
  createTree(e52) {
    let t2 = new Lh(
      (e52.length / this.stride) | 0,
      this.options.nodeSize,
      Float32Array
    )
    for (let n2 = 0; n2 < e52.length; n2 += this.stride)
      t2.add(e52[n2], e52[n2 + 1])
    return (t2.finish(), (t2.flatData = e52), (t2.data = null), t2)
  }
  addTileFeatures(e52, t2, n2, r2, i2, a2) {
    for (let o2 of e52) {
      let e53 = o2 * this.stride,
        s2 = t2[e53 + 5] > 1,
        c2,
        l2,
        u2
      if (s2)
        ((c2 = qh(t2, e53, this.clusterProps)),
          (l2 = t2[e53]),
          (u2 = t2[e53 + 1]))
      else {
        let n3 = this.points[t2[e53 + 3]]
        ;((c2 = n3.tags), ([l2, u2] = n3.geometry))
      }
      let d2 = {
          type: 1,
          geometry: [
            [
              Math.round(this.options.extent * (l2 * i2 - n2)),
              Math.round(this.options.extent * (u2 * i2 - r2)),
            ],
          ],
          tags: c2,
        },
        f2
      ;((f2 =
        s2 || this.options.generateId
          ? t2[e53 + 3]
          : this.points[t2[e53 + 3]].id),
        f2 !== void 0 && (d2.id = f2),
        a2.features.push(d2))
    }
  }
  limitZoom(e52) {
    return Math.max(
      this.options.minZoom,
      Math.min(Math.floor(+e52), this.options.maxZoom + 1)
    )
  }
  cluster(e52, t2) {
    let {radius: n2, extent: r2, reduce: i2, minPoints: a2} = this.options,
      o2 = n2 / (r2 * 2 ** t2),
      s2 = e52.flatData,
      c2 = [],
      l2 = this.stride
    for (let n3 = 0; n3 < s2.length; n3 += l2) {
      if (s2[n3 + 2] <= t2) continue
      s2[n3 + 2] = t2
      let r3 = s2[n3],
        u2 = s2[n3 + 1],
        d2 = e52.within(s2[n3], s2[n3 + 1], o2),
        f2 = s2[n3 + 5],
        p2 = f2
      for (let e53 of d2) {
        let n4 = e53 * l2
        s2[n4 + 2] > t2 && (p2 += s2[n4 + 5])
      }
      if (p2 > f2 && p2 >= a2) {
        let e53 = r3 * f2,
          a3 = u2 * f2,
          o3,
          m2 = -1,
          h2 = (((n3 / l2) | 0) << 5) + (t2 + 1) + this.points.length
        for (let r4 of d2) {
          let c3 = r4 * l2
          if (s2[c3 + 2] <= t2) continue
          s2[c3 + 2] = t2
          let u3 = s2[c3 + 5]
          ;((e53 += s2[c3] * u3),
            (a3 += s2[c3 + 1] * u3),
            (s2[c3 + 4] = h2),
            i2 &&
              (o3 ||
                ((o3 = this.map(s2, n3, true)),
                (m2 = this.clusterProps.length),
                this.clusterProps.push(o3)),
              i2(o3, this.map(s2, c3))))
        }
        ;((s2[n3 + 4] = h2),
          c2.push(e53 / p2, a3 / p2, 1 / 0, h2, -1, p2),
          i2 && c2.push(m2))
      } else {
        for (let e53 = 0; e53 < l2; e53++) c2.push(s2[n3 + e53])
        if (p2 > 1)
          for (let e53 of d2) {
            let n4 = e53 * l2
            if (!(s2[n4 + 2] <= t2)) {
              s2[n4 + 2] = t2
              for (let e54 = 0; e54 < l2; e54++) c2.push(s2[n4 + e54])
            }
          }
      }
    }
    return c2
  }
  getOriginId(e52) {
    return (e52 - this.points.length) >> 5
  }
  getOriginZoom(e52) {
    return (e52 - this.points.length) % 32
  }
  map(e52, t2, n2) {
    if (e52[t2 + 5] > 1) {
      let r3 = this.clusterProps[e52[t2 + 6]]
      return n2 ? Object.assign({}, r3) : r3
    }
    let r2 = this.points[e52[t2 + 3]].tags,
      i2 = this.options.map(r2)
    return n2 && i2 === r2 ? Object.assign({}, i2) : i2
  }
}
function Gh(e52, t2, n2) {
  return {
    id: e52[t2 + 3],
    type: `Point`,
    tags: qh(e52, t2, n2),
    geometry: [e52[t2], e52[t2 + 1]],
  }
}
function Kh(e52, t2, n2) {
  return {
    type: `Feature`,
    id: e52[t2 + 3],
    properties: qh(e52, t2, n2),
    geometry: {type: `Point`, coordinates: [ph(e52[t2]), mh(e52[t2 + 1])]},
  }
}
function qh(e52, t2, n2) {
  let r2 = e52[t2 + 5],
    i2 =
      r2 >= 1e4
        ? `${Math.round(r2 / 1e3)}k`
        : r2 >= 1e3
          ? `${Math.round(r2 / 100) / 10}k`
          : r2,
    a2 = e52[t2 + 6],
    o2 = a2 === -1 ? {} : Object.assign({}, n2[a2])
  return Object.assign(o2, {
    cluster: true,
    cluster_id: e52[t2 + 3],
    point_count: r2,
    point_count_abbreviated: i2,
  })
}
const Jh = `geojsonvt_clip_start`,
  Yh = `geojsonvt_clip_end`
function Xh(e52, t2, n2, r2, i2) {
  let a2 = t2 === i2.maxZoom ? 0 : i2.tolerance / ((1 << t2) * i2.extent),
    o2 = {
      transformed: false,
      features: [],
      source: null,
      x: n2,
      y: r2,
      z: t2,
      minX: 2,
      minY: 1,
      maxX: -1,
      maxY: 0,
      numPoints: 0,
      numSimplified: 0,
      numFeatures: e52.length,
    }
  for (let t3 of e52) Zh(o2, t3, a2, i2)
  return o2
}
function Zh(e52, t2, n2, r2) {
  switch (
    ((e52.minX = Math.min(e52.minX, t2.minX)),
    (e52.minY = Math.min(e52.minY, t2.minY)),
    (e52.maxX = Math.max(e52.maxX, t2.maxX)),
    (e52.maxY = Math.max(e52.maxY, t2.maxY)),
    t2.type)
  ) {
    case `Point`:
    case `MultiPoint`:
      Qh(e52, t2)
      return
    case `LineString`:
      $h(e52, t2, n2, r2)
      return
    case `MultiLineString`:
    case `Polygon`:
      eg(e52, t2, n2)
      return
    case `MultiPolygon`:
      tg(e52, t2, n2)
      return
  }
}
function Qh(e52, t2) {
  let n2 = []
  for (let r3 = 0; r3 < t2.geometry.length; r3 += 3)
    (n2.push(t2.geometry[r3], t2.geometry[r3 + 1]),
      e52.numPoints++,
      e52.numSimplified++)
  if (!n2.length) return
  let r2 = {type: 1, tags: t2.tags || null, geometry: n2}
  ;(t2.id !== null && (r2.id = t2.id), e52.features.push(r2))
}
function $h(e52, t2, n2, r2) {
  let i2 = []
  if ((ng(i2, t2.geometry, e52, n2, false, false), !i2.length)) return
  let a2 = t2.tags || null
  if (r2.lineMetrics) {
    a2 = {}
    for (let e53 in t2.tags) a2[e53] = t2.tags[e53]
    ;((a2[Jh] = t2.geometry.start / t2.geometry.size),
      (a2[Yh] = t2.geometry.end / t2.geometry.size))
  }
  let o2 = {type: 2, tags: a2, geometry: i2}
  ;(t2.id !== null && (o2.id = t2.id), e52.features.push(o2))
}
function eg(e52, t2, n2) {
  let r2 = []
  for (let i3 = 0; i3 < t2.geometry.length; i3++)
    ng(r2, t2.geometry[i3], e52, n2, t2.type === `Polygon`, i3 === 0)
  if (!r2.length) return
  let i2 = {
    type: t2.type === `Polygon` ? 3 : 2,
    tags: t2.tags || null,
    geometry: r2,
  }
  ;(t2.id !== null && (i2.id = t2.id), e52.features.push(i2))
}
function tg(e52, t2, n2) {
  let r2 = []
  for (let i3 = 0; i3 < t2.geometry.length; i3++) {
    let a2 = t2.geometry[i3]
    for (let t3 = 0; t3 < a2.length; t3++)
      ng(r2, a2[t3], e52, n2, true, t3 === 0)
  }
  if (!r2.length) return
  let i2 = {type: 3, tags: t2.tags || null, geometry: r2}
  ;(t2.id !== null && (i2.id = t2.id), e52.features.push(i2))
}
function ng(e52, t2, n2, r2, i2, a2) {
  let o2 = r2 * r2
  if (r2 > 0 && t2.size < (i2 ? o2 : r2)) {
    n2.numPoints += t2.points.length / 3
    return
  }
  let s2 = []
  for (let e53 = 0; e53 < t2.points.length; e53 += 3)
    ((r2 === 0 || t2.points[e53 + 2] > o2) &&
      (n2.numSimplified++, s2.push(t2.points[e53], t2.points[e53 + 1])),
      n2.numPoints++)
  ;(i2 && rg(s2, a2), e52.push(s2))
}
function rg(e52, t2) {
  let n2 = 0
  for (let t3 = 0, r2 = e52.length, i2 = r2 - 2; t3 < r2; i2 = t3, t3 += 2)
    n2 += (e52[t3] - e52[i2]) * (e52[t3 + 1] + e52[i2 + 1])
  if (n2 > 0 === t2)
    for (let t3 = 0, n3 = e52.length; t3 < n3 / 2; t3 += 2) {
      let r2 = e52[t3],
        i2 = e52[t3 + 1]
      ;((e52[t3] = e52[n3 - 2 - t3]),
        (e52[t3 + 1] = e52[n3 - 1 - t3]),
        (e52[n3 - 2 - t3] = r2),
        (e52[n3 - 1 - t3] = i2))
    }
}
function ig(e52, t2) {
  if (e52.transformed) return e52
  let n2 = 1 << e52.z,
    r2 = e52.x,
    i2 = e52.y
  for (let a2 of e52.features)
    a2.type === 1 ? ag(a2, t2, n2, r2, i2) : og(a2, t2, n2, r2, i2)
  return ((e52.transformed = true), e52)
}
function ag(e52, t2, n2, r2, i2) {
  let a2 = e52,
    o2 = e52.geometry,
    s2 = []
  for (let e53 = 0; e53 < o2.length; e53 += 2)
    s2.push(sg(o2[e53], o2[e53 + 1], t2, n2, r2, i2))
  return ((a2.geometry = s2), a2)
}
function og(e52, t2, n2, r2, i2) {
  let a2 = e52,
    o2 = e52.geometry,
    s2 = []
  for (let e53 of o2) {
    let a3 = []
    for (let o3 = 0; o3 < e53.length; o3 += 2)
      a3.push(sg(e53[o3], e53[o3 + 1], t2, n2, r2, i2))
    s2.push(a3)
  }
  return ((a2.geometry = s2), a2)
}
function sg(e52, t2, n2, r2, i2, a2) {
  return [Math.round(n2 * (e52 * r2 - i2)), Math.round(n2 * (t2 * r2 - a2))]
}
var cg = class {
  constructor(e52) {
    ;((this.options = e52),
      (this.total = 0),
      (this.stats = {}),
      (this.tiles = {}),
      (this.tileCoords = []),
      (this.stats = {}),
      (this.total = 0))
  }
  initialize(e52) {
    ;(this.splitTile(e52, 0, 0, 0),
      this.options.debug &&
        (e52.length &&
          console.log(
            `features: %d, points: %d`,
            this.tiles[0].numFeatures,
            this.tiles[0].numPoints
          ),
        console.timeEnd(`generate tiles`),
        console.log(
          `tiles generated:`,
          this.total,
          JSON.stringify(this.stats)
        )))
  }
  updateIndex(e52, t2, n2) {
    ;(n2.debug > 1 &&
      (console.log(`invalidating tiles`), console.time(`invalidating`)),
      this.invalidateTiles(t2),
      n2.debug > 1 && console.timeEnd(`invalidating`))
    let [r2, i2, a2] = [0, 0, 0],
      o2 = Xh(e52, r2, i2, a2, n2)
    o2.source = e52
    let s2 = lg(r2, i2, a2)
    if (
      ((this.tiles[s2] = o2),
      this.tileCoords.push({z: r2, x: i2, y: a2, id: s2}),
      n2.debug)
    ) {
      let e53 = `z${r2}`
      ;((this.stats[e53] = (this.stats[e53] || 0) + 1), this.total++)
    }
  }
  getClusterExpansionZoom(e52) {
    return null
  }
  getChildren(e52) {
    return null
  }
  getLeaves(e52, t2, n2) {
    return null
  }
  getTile(e52, t2, n2) {
    let {extent: r2, debug: i2} = this.options,
      a2 = 1 << e52
    t2 = (t2 + a2) & (a2 - 1)
    let o2 = lg(e52, t2, n2)
    if (this.tiles[o2]) return ig(this.tiles[o2], r2)
    i2 > 1 && console.log(`drilling down to z%d-%d-%d`, e52, t2, n2)
    let s2 = e52,
      c2 = t2,
      l2 = n2,
      u2
    for (; !u2 && s2 > 0;)
      (s2--, (c2 >>= 1), (l2 >>= 1), (u2 = this.tiles[lg(s2, c2, l2)]))
    return !u2?.source ||
      (i2 > 1 &&
        (console.log(`found parent tile z%d-%d-%d`, s2, c2, l2),
        console.time(`drilling down`)),
      this.splitTile(u2.source, s2, c2, l2, e52, t2, n2),
      i2 > 1 && console.timeEnd(`drilling down`),
      !this.tiles[o2])
      ? null
      : ig(this.tiles[o2], r2)
  }
  splitTile(e52, t2, n2, r2, i2, a2, o2) {
    let s2 = [e52, t2, n2, r2],
      c2 = this.options,
      l2 = c2.debug
    for (; s2.length;) {
      ;((r2 = s2.pop()), (n2 = s2.pop()), (t2 = s2.pop()), (e52 = s2.pop()))
      let u2 = 1 << t2,
        d2 = lg(t2, n2, r2),
        f2 = this.tiles[d2]
      if (
        !f2 &&
        (l2 > 1 && console.time(`creation`),
        (f2 = this.tiles[d2] = Xh(e52, t2, n2, r2, c2)),
        this.tileCoords.push({z: t2, x: n2, y: r2, id: d2}),
        l2)
      ) {
        l2 > 1 &&
          (console.log(
            `tile z%d-%d-%d (features: %d, points: %d, simplified: %d)`,
            t2,
            n2,
            r2,
            f2.numFeatures,
            f2.numPoints,
            f2.numSimplified
          ),
          console.timeEnd(`creation`))
        let e53 = `z${t2}`
        ;((this.stats[e53] = (this.stats[e53] || 0) + 1), this.total++)
      }
      if (((f2.source = e52), i2 == null)) {
        if (t2 === c2.indexMaxZoom || f2.numPoints <= c2.indexMaxPoints)
          continue
      } else if (t2 === c2.maxZoom || t2 === i2) continue
      else if (i2 != null) {
        let e53 = i2 - t2
        if (n2 !== a2 >> e53 || r2 !== o2 >> e53) continue
      }
      if (((f2.source = null), !e52.length)) continue
      l2 > 1 && console.time(`clipping`)
      let p2 = (0.5 * c2.buffer) / c2.extent,
        m2 = 0.5 - p2,
        h2 = 0.5 + p2,
        g2 = 1 + p2,
        _2 = null,
        v2 = null,
        y2 = null,
        b2 = null,
        x2 = hh(e52, u2, n2 - p2, n2 + h2, 0, f2.minX, f2.maxX, c2),
        S2 = hh(e52, u2, n2 + m2, n2 + g2, 0, f2.minX, f2.maxX, c2)
      ;(x2 &&
        ((_2 = hh(x2, u2, r2 - p2, r2 + h2, 1, f2.minY, f2.maxY, c2)),
        (v2 = hh(x2, u2, r2 + m2, r2 + g2, 1, f2.minY, f2.maxY, c2))),
        S2 &&
          ((y2 = hh(S2, u2, r2 - p2, r2 + h2, 1, f2.minY, f2.maxY, c2)),
          (b2 = hh(S2, u2, r2 + m2, r2 + g2, 1, f2.minY, f2.maxY, c2))),
        l2 > 1 && console.timeEnd(`clipping`),
        s2.push(_2 || [], t2 + 1, n2 * 2, r2 * 2),
        s2.push(v2 || [], t2 + 1, n2 * 2, r2 * 2 + 1),
        s2.push(y2 || [], t2 + 1, n2 * 2 + 1, r2 * 2),
        s2.push(b2 || [], t2 + 1, n2 * 2 + 1, r2 * 2 + 1))
    }
  }
  invalidateTiles(e52) {
    if (!e52.length) return
    let t2 = this.options,
      {debug: n2} = t2,
      r2 = 1 / 0,
      i2 = -1 / 0,
      a2 = 1 / 0,
      o2 = -1 / 0
    for (let t3 of e52)
      ((r2 = Math.min(r2, t3.minX)),
        (i2 = Math.max(i2, t3.maxX)),
        (a2 = Math.min(a2, t3.minY)),
        (o2 = Math.max(o2, t3.maxY)))
    let s2 = t2.buffer / t2.extent,
      c2 = /* @__PURE__ */ new Set()
    for (let t3 in this.tiles) {
      let l2 = this.tiles[t3],
        u2 = 1 << l2.z,
        d2 = (l2.x - s2) / u2,
        f2 = (l2.x + 1 + s2) / u2,
        p2 = (l2.y - s2) / u2,
        m2 = (l2.y + 1 + s2) / u2
      if (i2 < d2 || r2 >= f2 || o2 < p2 || a2 >= m2) continue
      let h2 = false
      for (let t4 of e52)
        if (t4.maxX >= d2 && t4.minX < f2 && t4.maxY >= p2 && t4.minY < m2) {
          h2 = true
          break
        }
      if (h2) {
        if (n2) {
          n2 > 1 &&
            console.log(
              `invalidate tile z%d-%d-%d (features: %d, points: %d, simplified: %d)`,
              l2.z,
              l2.x,
              l2.y,
              l2.numFeatures,
              l2.numPoints,
              l2.numSimplified
            )
          let e53 = `z${l2.z}`
          ;((this.stats[e53] = (this.stats[e53] || 0) - 1), this.total--)
        }
        ;(delete this.tiles[t3], c2.add(t3))
      }
    }
    c2.size &&
      (this.tileCoords = this.tileCoords.filter(e53 => !c2.has(e53.id)))
  }
}
function lg(e52, t2, n2) {
  return ((1 << e52) * n2 + t2) * 32 + e52
}
const ug = {
  maxZoom: 14,
  indexMaxZoom: 5,
  indexMaxPoints: 1e5,
  tolerance: 3,
  extent: 4096,
  buffer: 64,
  lineMetrics: false,
  promoteId: null,
  generateId: false,
  updateable: false,
  cluster: false,
  clusterOptions: Uh,
  debug: 0,
}
var dg = class {
  constructor(e52, t2) {
    t2 = this.options = Object.assign({}, ug, t2)
    let n2 = t2.debug
    if (
      (n2 && console.time(`preprocess data`), t2.maxZoom < 0 || t2.maxZoom > 24)
    )
      throw Error(`maxZoom should be in the 0-24 range`)
    if (t2.promoteId && t2.generateId)
      throw Error(`promoteId and generateId cannot be used together.`)
    let r2 = Jm(e52, t2)
    ;(n2 &&
      (console.timeEnd(`preprocess data`),
      console.log(
        `index: maxZoom: %d, maxPoints: %d`,
        t2.indexMaxZoom,
        t2.indexMaxPoints
      ),
      console.time(`generate tiles`)),
      (r2 = Oh(r2, t2)),
      t2.updateable && (this.source = r2),
      this.initializeIndex(r2, t2))
  }
  initializeIndex(e52, t2) {
    ;((this.tileIndex = t2.cluster ? new Wh(t2.clusterOptions) : new cg(t2)),
      e52.length && this.tileIndex.initialize(e52))
  }
  getTile(e52, t2, n2) {
    return (
      (e52 = +e52),
      (t2 = +t2),
      (n2 = +n2),
      e52 < 0 || e52 > 24 ? null : this.tileIndex.getTile(e52, t2, n2)
    )
  }
  updateData(e52, t2) {
    let n2 = this.options
    if (!n2.updateable)
      throw Error(
        "to update tile geojson `updateable` option must be set to true"
      )
    let {affected: r2, source: i2} = Mh(this.source, e52, n2)
    ;(t2 && ({affected: r2, source: i2} = this.filterUpdate(i2, r2, t2)),
      r2.length && ((this.source = i2), this.tileIndex.updateIndex(i2, r2, n2)))
  }
  filterUpdate(e52, t2, n2) {
    let r2 = /* @__PURE__ */ new Set()
    for (let i2 of e52)
      i2.id != null && (n2(lh(i2)) || (t2.push(i2), r2.add(i2.id)))
    return (
      (e52 = e52.filter(e53 => !r2.has(e53.id))), {affected: t2, source: e52}
    )
  }
  getData() {
    if (!this.options.updateable)
      throw Error(
        "to retrieve data the `updateable` option must be set to true"
      )
    return ch(this.source)
  }
  updateClusterOptions(e52, t2) {
    let n2 = this.options.cluster
    if (
      ((this.options.cluster = e52),
      (this.options.clusterOptions = t2),
      n2 == e52)
    ) {
      this.tileIndex.updateIndex(this.source, [], this.options)
      return
    }
    this.initializeIndex(this.source, this.options)
  }
  getClusterExpansionZoom(e52) {
    return this.tileIndex.getClusterExpansionZoom(e52)
  }
  getClusterChildren(e52) {
    return this.tileIndex.getChildren(e52)
  }
  getClusterLeaves(e52, t2, n2) {
    return this.tileIndex.getLeaves(e52, t2, n2)
  }
}
const fg = q(
    [
      {name: `a_pos_normal`, components: 2, type: `Int16`},
      {name: `a_data`, components: 4, type: `Uint8`},
    ],
    4
  ),
  pg = fg.members
;(fg.size, fg.alignment)
const mg = q([
    {name: `a_uv_x`, components: 1, type: `Float32`},
    {name: `a_split_index`, components: 1, type: `Float32`},
  ]),
  hg = mg.members
;(mg.size, mg.alignment)
const gg = Math.cos((75 / 2) * (Math.PI / 180)),
  _g = 1 / 2,
  vg = 2 ** 14 / _g
var yg = class {
  constructor(e52) {
    ;((this.zoom = e52.zoom),
      (this.overscaling = e52.overscaling),
      (this.layers = e52.layers),
      (this.layerIds = this.layers.map(e53 => e53.id)),
      (this.index = e52.index),
      (this.hasDependencies = false),
      (this.patternFeatures = []),
      (this.lineClipsArray = []),
      (this.gradients = {}))
    for (let e53 of this.layers) this.gradients[e53.id] = {}
    ;((this.layoutVertexArray = new lu()),
      (this.layoutVertexArray2 = new uu()),
      (this.indexArray = new bu()),
      (this.programConfigurations = new nd(e52.layers, e52.zoom)),
      (this.segments = new Tu()),
      (this.maxLineLength = 0),
      (this.stateDependentLayerIds = this.layers
        .filter(e53 => e53.isStateDependent())
        .map(e53 => e53.id)))
  }
  populate(e52, t2, n2) {
    this.hasDependencies =
      Sf(`line`, this.layers, t2) || this.hasLineDasharray(this.layers)
    let r2 = this.layers[0].layout.get(`line-sort-key`),
      i2 = !r2.isConstant(),
      a2 = [],
      o2 = new U(this.zoom),
      s2 = this.layers[0]._featureFilter.needGeometry
    for (let {feature: t3, id: c2, index: l2, sourceLayerIndex: u2} of e52) {
      let e53 = ld(t3, s2)
      if (!this.layers[0]._featureFilter.filter(o2, e53, n2)) continue
      let d2 = i2 ? r2.evaluate(e53, {}, n2) : void 0,
        f2 = {
          id: c2,
          properties: t3.properties,
          type: t3.type,
          sourceLayerIndex: u2,
          index: l2,
          geometry: s2 ? e53.geometry : cd(t3),
          patterns: {},
          dashes: {},
          sortKey: d2,
        }
      a2.push(f2)
    }
    i2 && a2.sort((e53, t3) => e53.sortKey - t3.sortKey)
    for (let r3 of a2) {
      let {geometry: i3, index: a3, sourceLayerIndex: o3} = r3
      this.hasDependencies
        ? (Sf(`line`, this.layers, t2)
            ? Cf(`line`, this.layers, r3, {zoom: this.zoom}, t2)
            : this.hasLineDasharray(this.layers) &&
              this.addLineDashDependencies(this.layers, r3, this.zoom, t2),
          this.patternFeatures.push(r3))
        : this.addFeature(r3, i3, a3, n2, {}, {}, t2.subdivisionGranularity)
      let s3 = e52[a3].feature
      t2.featureIndex.insert(s3, i3, a3, o3, this.index)
    }
  }
  update(e52, t2, n2, r2) {
    this.stateDependentLayers.length &&
      this.programConfigurations.updatePaintArrays(
        e52,
        t2,
        this.stateDependentLayers,
        {imagePositions: n2, dashPositions: r2}
      )
  }
  addFeatures(e52, t2, n2, r2) {
    for (let i2 of this.patternFeatures)
      this.addFeature(
        i2,
        i2.geometry,
        i2.index,
        t2,
        n2,
        r2,
        e52.subdivisionGranularity
      )
  }
  isEmpty() {
    return this.layoutVertexArray.length === 0
  }
  uploadPending() {
    return !this.uploaded || this.programConfigurations.needsUpload
  }
  upload(e52) {
    ;(this.uploaded ||
      (this.layoutVertexArray2.length !== 0 &&
        (this.layoutVertexBuffer2 = e52.createVertexBuffer(
          this.layoutVertexArray2,
          hg
        )),
      (this.layoutVertexBuffer = e52.createVertexBuffer(
        this.layoutVertexArray,
        pg
      )),
      (this.indexBuffer = e52.createIndexBuffer(this.indexArray))),
      this.programConfigurations.upload(e52),
      (this.uploaded = true))
  }
  destroy() {
    this.layoutVertexBuffer &&
      (this.layoutVertexBuffer.destroy(),
      this.indexBuffer.destroy(),
      this.programConfigurations.destroy(),
      this.segments.destroy())
  }
  lineFeatureClips(e52) {
    if (
      e52.properties &&
      Object.hasOwn(e52.properties, `geojsonvt_clip_start`) &&
      Object.hasOwn(e52.properties, `geojsonvt_clip_end`)
    )
      return {start: +e52.properties[Jh], end: +e52.properties[Yh]}
  }
  addFeature(e52, t2, n2, r2, i2, a2, o2) {
    let s2 = this.layers[0].layout,
      c2 = s2.get(`line-join`).evaluate(e52, {}),
      l2 = s2.get(`line-cap`).evaluate(e52, {}),
      u2 = s2.get(`line-miter-limit`).evaluate(e52, {}),
      d2 = s2.get(`line-round-limit`).evaluate(e52, {})
    this.lineClips = this.lineFeatureClips(e52)
    for (let n3 of t2) this.addLine(n3, e52, c2, l2, u2, d2, r2, o2)
    this.programConfigurations.populatePaintArrays(
      this.layoutVertexArray.length,
      e52,
      n2,
      {imagePositions: i2, dashPositions: a2, canonical: r2}
    )
  }
  addLine(e52, t2, n2, r2, i2, a2, o2, s2) {
    ;((this.distance = 0), (this.scaledDistance = 0), (this.totalDistance = 0))
    let c2 = o2 ? s2.line.getGranularityForZoomLevel(o2.z) : 1
    if (((e52 = Tp(e52, c2)), this.lineClips)) {
      this.lineClipsArray.push(this.lineClips)
      for (let t3 = 0; t3 < e52.length - 1; t3++)
        this.totalDistance += e52[t3].dist(e52[t3 + 1])
      ;(this.updateScaledDistance(),
        (this.maxLineLength = Math.max(this.maxLineLength, this.totalDistance)))
    }
    let l2 = Jp.types[t2.type] === `Polygon`,
      u2 = e52.length
    for (; u2 >= 2 && e52[u2 - 1].equals(e52[u2 - 2]);) u2--
    let d2 = 0
    for (; d2 < u2 - 1 && e52[d2].equals(e52[d2 + 1]);) d2++
    if (u2 - d2 < (l2 ? 3 : 2)) return
    n2 === `bevel` && (i2 = 1.05)
    let f2 = this.overscaling <= 16 ? (15 * j) / (512 * this.overscaling) : 0,
      p2 = this.segments.prepareSegment(
        u2 * 10,
        this.layoutVertexArray,
        this.indexArray
      ),
      m2,
      h2,
      g2,
      _2,
      v2
    ;((this.e1 = this.e2 = -1),
      l2 && ((m2 = e52[u2 - 2]), (v2 = e52[d2].sub(m2)._unit()._perp())))
    for (let t3 = d2; t3 < u2; t3++) {
      if (
        ((g2 = t3 === u2 - 1 ? (l2 ? e52[d2 + 1] : void 0) : e52[t3 + 1]),
        g2 && e52[t3].equals(g2))
      )
        continue
      ;(v2 && (_2 = v2),
        m2 && (h2 = m2),
        (m2 = e52[t3]),
        (v2 = g2 ? g2.sub(m2)._unit()._perp() : _2),
        (_2 ||= v2))
      let o3 = _2.add(v2)
      ;(o3.x !== 0 || o3.y !== 0) && o3._unit()
      let s3 = _2.x * v2.x + _2.y * v2.y,
        c3 = o3.x * v2.x + o3.y * v2.y,
        y2 = c3 === 0 ? 1 / 0 : 1 / c3,
        b2 = 2 * Math.sqrt(2 - 2 * c3),
        x2 = c3 < gg && h2 && g2,
        S2 = _2.x * v2.y - _2.y * v2.x > 0
      if (x2 && t3 > d2) {
        let e53 = m2.dist(h2)
        if (e53 > 2 * f2) {
          let t4 = m2.sub(
            m2
              .sub(h2)
              ._mult(f2 / e53)
              ._round()
          )
          ;(this.updateDistance(h2, t4),
            this.addCurrentVertex(t4, _2, 0, 0, p2),
            (h2 = t4))
        }
      }
      let C2 = h2 && g2,
        w2 = C2 ? n2 : l2 ? `butt` : r2
      if (
        (C2 &&
          w2 === `round` &&
          (y2 < a2 ? (w2 = `miter`) : y2 <= 2 && (w2 = `fakeround`)),
        w2 === `miter` && y2 > i2 && (w2 = `bevel`),
        w2 === `bevel` &&
          (y2 > 2 && (w2 = `flipbevel`), y2 < i2 && (w2 = `miter`)),
        h2 && this.updateDistance(h2, m2),
        w2 === `miter`)
      )
        (o3._mult(y2), this.addCurrentVertex(m2, o3, 0, 0, p2))
      else if (w2 === `flipbevel`) {
        if (y2 > 100) o3 = v2.mult(-1)
        else {
          let e53 = (y2 * _2.add(v2).mag()) / _2.sub(v2).mag()
          o3._perp()._mult(e53 * (S2 ? -1 : 1))
        }
        ;(this.addCurrentVertex(m2, o3, 0, 0, p2),
          this.addCurrentVertex(m2, o3.mult(-1), 0, 0, p2))
      } else if (w2 === `bevel` || w2 === `fakeround`) {
        let e53 = -Math.sqrt(y2 * y2 - 1),
          t4 = S2 ? e53 : 0,
          n3 = S2 ? 0 : e53
        if (
          (h2 && this.addCurrentVertex(m2, _2, t4, n3, p2), w2 === `fakeround`)
        ) {
          let e54 = Math.round((b2 * 180) / Math.PI / 20)
          for (let t5 = 1; t5 < e54; t5++) {
            let n4 = t5 / e54
            if (n4 !== 0.5) {
              let e55 = n4 - 0.5,
                t6 = 1.0904 + s3 * (-3.2452 + s3 * (3.55645 - s3 * 1.43519)),
                r4 = 0.848013 + s3 * (-1.06021 + s3 * 0.215638)
              n4 += n4 * e55 * (n4 - 1) * (t6 * e55 * e55 + r4)
            }
            let r3 = v2
              .sub(_2)
              ._mult(n4)
              ._add(_2)
              ._unit()
              ._mult(S2 ? -1 : 1)
            this.addHalfVertex(m2, r3.x, r3.y, false, S2, 0, p2)
          }
        }
        g2 && this.addCurrentVertex(m2, v2, -t4, -n3, p2)
      } else if (w2 === `butt`) this.addCurrentVertex(m2, o3, 0, 0, p2)
      else if (w2 === `square`) {
        let e53 = h2 ? 1 : -1
        this.addCurrentVertex(m2, o3, e53, e53, p2)
      } else
        w2 === `round` &&
          (h2 &&
            (this.addCurrentVertex(m2, _2, 0, 0, p2),
            this.addCurrentVertex(m2, _2, 1, 1, p2, true)),
          g2 &&
            (this.addCurrentVertex(m2, v2, -1, -1, p2, true),
            this.addCurrentVertex(m2, v2, 0, 0, p2)))
      if (x2 && t3 < u2 - 1) {
        let e53 = m2.dist(g2)
        if (e53 > 2 * f2) {
          let t4 = m2.add(
            g2
              .sub(m2)
              ._mult(f2 / e53)
              ._round()
          )
          ;(this.updateDistance(m2, t4),
            this.addCurrentVertex(t4, v2, 0, 0, p2),
            (m2 = t4))
        }
      }
    }
  }
  addCurrentVertex(e52, t2, n2, r2, i2, a2 = false) {
    let o2 = t2.x + t2.y * n2,
      s2 = t2.y - t2.x * n2,
      c2 = -t2.x + t2.y * r2,
      l2 = -t2.y - t2.x * r2
    ;(this.addHalfVertex(e52, o2, s2, a2, false, n2, i2),
      this.addHalfVertex(e52, c2, l2, a2, true, -r2, i2),
      this.distance > vg / 2 &&
        this.totalDistance === 0 &&
        ((this.distance = 0),
        this.updateScaledDistance(),
        this.addCurrentVertex(e52, t2, n2, r2, i2, a2)))
  }
  addHalfVertex({x: e52, y: t2}, n2, r2, i2, a2, o2, s2) {
    let c2 =
      (this.lineClips ? this.scaledDistance * (vg - 1) : this.scaledDistance) *
      _g
    if (
      (this.layoutVertexArray.emplaceBack(
        (e52 << 1) + +!!i2,
        (t2 << 1) + +!!a2,
        Math.round(63 * n2) + 128,
        Math.round(63 * r2) + 128,
        ((o2 === 0 ? 0 : o2 < 0 ? -1 : 1) + 1) | ((c2 & 63) << 2),
        c2 >> 6
      ),
      this.lineClips)
    ) {
      let e53 =
        (this.scaledDistance - this.lineClips.start) /
        (this.lineClips.end - this.lineClips.start)
      this.layoutVertexArray2.emplaceBack(e53, this.lineClipsArray.length)
    }
    let l2 = s2.vertexLength++
    ;(this.e1 >= 0 &&
      this.e2 >= 0 &&
      (this.indexArray.emplaceBack(this.e1, l2, this.e2), s2.primitiveLength++),
      a2 ? (this.e2 = l2) : (this.e1 = l2))
  }
  updateScaledDistance() {
    this.scaledDistance = this.lineClips
      ? this.lineClips.start +
        ((this.lineClips.end - this.lineClips.start) * this.distance) /
          this.totalDistance
      : this.distance
  }
  updateDistance(e52, t2) {
    ;((this.distance += e52.dist(t2)), this.updateScaledDistance())
  }
  hasLineDasharray(e52) {
    for (let t2 of e52) {
      let e53 = t2.paint.get(`line-dasharray`)
      if (e53 && !e53.isConstant()) return true
    }
    return false
  }
  addLineDashDependencies(e52, t2, n2, r2) {
    for (let i2 of e52) {
      let e53 = i2.paint.get(`line-dasharray`)
      if (!e53 || e53.value.kind === `constant`) continue
      let a2 = i2.layout.get(`line-cap`).evaluate(t2, {}) === `round`,
        o2 = {dasharray: e53.value.evaluate({zoom: n2 - 1}, t2, {}), round: a2},
        s2 = {dasharray: e53.value.evaluate({zoom: n2}, t2, {}), round: a2},
        c2 = {dasharray: e53.value.evaluate({zoom: n2 + 1}, t2, {}), round: a2},
        l2 = `${o2.dasharray.join(`,`)},${o2.round}`,
        u2 = `${s2.dasharray.join(`,`)},${s2.round}`,
        d2 = `${c2.dasharray.join(`,`)},${c2.round}`
      ;((r2.dashDependencies[l2] = o2),
        (r2.dashDependencies[u2] = s2),
        (r2.dashDependencies[d2] = c2),
        (t2.dashes[i2.id] = {min: l2, mid: u2, max: d2}))
    }
  }
}
H(`LineBucket`, yg, {omit: [`layers`, `patternFeatures`]})
let bg
const xg = () =>
  (bg ||= new cl({
    "line-cap": new G(M.layout_line[`line-cap`], `line-cap`),
    "line-join": new G(M.layout_line[`line-join`], `line-join`),
    "line-miter-limit": new G(
      M.layout_line[`line-miter-limit`],
      `line-miter-limit`
    ),
    "line-round-limit": new G(
      M.layout_line[`line-round-limit`],
      `line-round-limit`
    ),
    "line-sort-key": new G(M.layout_line[`line-sort-key`], `line-sort-key`),
  }))
let Sg
const Cg = () =>
  (Sg ||= new cl({
    "line-opacity": new G(M.paint_line[`line-opacity`], `line-opacity`),
    "line-layer-opacity": new W(
      M.paint_line[`line-layer-opacity`],
      `line-layer-opacity`
    ),
    "line-color": new G(M.paint_line[`line-color`], `line-color`),
    "line-translate": new W(M.paint_line[`line-translate`], `line-translate`),
    "line-translate-anchor": new W(
      M.paint_line[`line-translate-anchor`],
      `line-translate-anchor`
    ),
    "line-width": new G(M.paint_line[`line-width`], `line-width`),
    "line-gap-width": new G(M.paint_line[`line-gap-width`], `line-gap-width`),
    "line-offset": new G(M.paint_line[`line-offset`], `line-offset`),
    "line-blur": new G(M.paint_line[`line-blur`], `line-blur`),
    "line-dasharray": new al(M.paint_line[`line-dasharray`], `line-dasharray`),
    "line-pattern": new al(M.paint_line[`line-pattern`], `line-pattern`),
    "line-gradient": new sl(M.paint_line[`line-gradient`], `line-gradient`),
  }))
var wg = {
    get paint() {
      return Cg()
    },
    get layout() {
      return xg()
    },
  },
  Tg = class extends G {
    possiblyEvaluate(e52, t2) {
      return (
        (t2 = new U(Math.floor(t2.zoom), {
          now: t2.now,
          fadeDuration: t2.fadeDuration,
          zoomHistory: t2.zoomHistory,
          transition: t2.transition,
        })),
        super.possiblyEvaluate(e52, t2)
      )
    }
    evaluate(e52, t2, n2, r2) {
      return (
        (t2 = St({}, t2, {zoom: Math.floor(t2.zoom)})),
        super.evaluate(e52, t2, n2, r2)
      )
    }
  }
let Eg
const Dg = e52 => e52.type === `line`
var Og = class extends dl {
  constructor(e52, t2) {
    ;(super(e52, wg, t2),
      (this.gradientVersion = 0),
      Eg ||
        ((Eg = new Tg(
          wg.paint.properties[`line-width`].specification,
          `line-floorwidth`
        )),
        (Eg.useIntegerZoom = true)))
  }
  _handleSpecialPaintPropertyUpdate(e52) {
    if (e52 === `line-gradient`) {
      let e53 = this.gradientExpression()
      ;((this.stepInterpolant = Io(e53)
        ? e53._styleExpression.expression instanceof Zr
        : false),
        (this.gradientVersion = (this.gradientVersion + 1) % (2 ** 53 - 1)))
    }
  }
  gradientExpression() {
    return this._transitionablePaint._values[`line-gradient`].value.expression
  }
  recalculate(e52, t2) {
    ;(super.recalculate(e52, t2),
      (this.paint._values[`line-floorwidth`] = Eg.possiblyEvaluate(
        this._transitioningPaint._values[`line-width`].value,
        e52
      )))
  }
  createBucket(e52) {
    return new yg(e52)
  }
  queryRadius(e52) {
    let t2 = e52,
      n2 = kg(Ed(`line-width`, this, t2), Ed(`line-gap-width`, this, t2)),
      r2 = Ed(`line-offset`, this, t2)
    return n2 / 2 + Math.abs(r2) + Dd(this.paint.get(`line-translate`))
  }
  queryIntersectsFeature({
    queryGeometry: e52,
    feature: t2,
    featureState: n2,
    geometry: r2,
    transform: i2,
    pixelsToTileUnits: a2,
  }) {
    let o2 = Od(
        e52,
        this.paint.get(`line-translate`),
        this.paint.get(`line-translate-anchor`),
        -i2.bearingInRadians,
        a2
      ),
      s2 =
        (a2 / 2) *
        kg(
          this.paint.get(`line-width`).evaluate(t2, n2),
          this.paint.get(`line-gap-width`).evaluate(t2, n2)
        ),
      c2 = this.paint.get(`line-offset`).evaluate(t2, n2)
    return (c2 && (r2 = Ad(r2, c2 * a2)), gd(o2, r2, s2))
  }
  isTileClipped() {
    return true
  }
}
function kg(e52, t2) {
  return t2 > 0 ? t2 + 2 * e52 : e52
}
const Ag = q(
    [
      {name: `a_pos_offset`, components: 4, type: `Int16`},
      {name: `a_data`, components: 4, type: `Uint16`},
      {name: `a_pixeloffset`, components: 4, type: `Int16`},
      {name: `a_height_offset`, components: 1, type: `Float32`},
    ],
    4
  ),
  jg = q([{name: `a_projected_pos`, components: 3, type: `Float32`}], 4)
q([{name: `a_fade_opacity`, components: 1, type: `Uint32`}], 4)
const Mg = q([
  {name: `a_placed`, components: 2, type: `Uint8`},
  {name: `a_shift`, components: 2, type: `Float32`},
  {name: `a_box_real`, components: 2, type: `Int16`},
])
q([
  {type: `Int16`, name: `anchorPointX`},
  {type: `Int16`, name: `anchorPointY`},
  {type: `Int16`, name: `x1`},
  {type: `Int16`, name: `y1`},
  {type: `Int16`, name: `x2`},
  {type: `Int16`, name: `y2`},
  {type: `Uint32`, name: `featureIndex`},
  {type: `Uint16`, name: `sourceLayerIndex`},
  {type: `Uint16`, name: `bucketIndex`},
])
const Ng = q(
    [
      {name: `a_pos`, components: 2, type: `Int16`},
      {name: `a_anchor_pos`, components: 2, type: `Int16`},
      {name: `a_extrude`, components: 2, type: `Int16`},
    ],
    4
  ),
  Pg = q(
    [
      {name: `a_pos`, components: 2, type: `Float32`},
      {name: `a_radius`, components: 1, type: `Float32`},
      {name: `a_flags`, components: 2, type: `Int16`},
    ],
    4
  )
;(q([{name: `triangle`, components: 3, type: `Uint16`}]),
  q([
    {type: `Int16`, name: `anchorX`},
    {type: `Int16`, name: `anchorY`},
    {type: `Uint16`, name: `glyphStartIndex`},
    {type: `Uint16`, name: `numGlyphs`},
    {type: `Uint32`, name: `vertexStartIndex`},
    {type: `Uint32`, name: `lineStartIndex`},
    {type: `Uint32`, name: `lineLength`},
    {type: `Uint16`, name: `segment`},
    {type: `Uint16`, name: `lowerSize`},
    {type: `Uint16`, name: `upperSize`},
    {type: `Float32`, name: `lineOffsetX`},
    {type: `Float32`, name: `lineOffsetY`},
    {type: `Uint8`, name: `writingMode`},
    {type: `Uint8`, name: `placedOrientation`},
    {type: `Uint8`, name: `hidden`},
    {type: `Uint32`, name: `crossTileID`},
    {type: `Int16`, name: `associatedIconIndex`},
    {type: `Float32`, name: `heightOffset`},
  ]),
  q([
    {type: `Int16`, name: `anchorX`},
    {type: `Int16`, name: `anchorY`},
    {type: `Int16`, name: `rightJustifiedTextSymbolIndex`},
    {type: `Int16`, name: `centerJustifiedTextSymbolIndex`},
    {type: `Int16`, name: `leftJustifiedTextSymbolIndex`},
    {type: `Int16`, name: `verticalPlacedTextSymbolIndex`},
    {type: `Int16`, name: `placedIconSymbolIndex`},
    {type: `Int16`, name: `verticalPlacedIconSymbolIndex`},
    {type: `Uint16`, name: `key`},
    {type: `Uint16`, name: `textBoxStartIndex`},
    {type: `Uint16`, name: `textBoxEndIndex`},
    {type: `Uint16`, name: `verticalTextBoxStartIndex`},
    {type: `Uint16`, name: `verticalTextBoxEndIndex`},
    {type: `Uint16`, name: `iconBoxStartIndex`},
    {type: `Uint16`, name: `iconBoxEndIndex`},
    {type: `Uint16`, name: `verticalIconBoxStartIndex`},
    {type: `Uint16`, name: `verticalIconBoxEndIndex`},
    {type: `Uint16`, name: `featureIndex`},
    {type: `Uint16`, name: `numHorizontalGlyphVertices`},
    {type: `Uint16`, name: `numVerticalGlyphVertices`},
    {type: `Uint16`, name: `numIconVertices`},
    {type: `Uint16`, name: `numVerticalIconVertices`},
    {type: `Uint16`, name: `useRuntimeCollisionCircles`},
    {type: `Uint32`, name: `crossTileID`},
    {type: `Float32`, name: `textBoxScale`},
    {type: `Float32`, name: `collisionCircleDiameter`},
    {type: `Uint16`, name: `textAnchorOffsetStartIndex`},
    {type: `Uint16`, name: `textAnchorOffsetEndIndex`},
    {type: `Float32`, name: `heightOffset`},
  ]),
  q([{type: `Float32`, name: `offsetX`}]),
  q([
    {type: `Int16`, name: `x`},
    {type: `Int16`, name: `y`},
    {type: `Int16`, name: `tileUnitDistanceFromAnchor`},
  ]),
  q([
    {type: `Uint16`, name: `textAnchor`},
    {type: `Float32`, components: 2, name: `textOffset`},
  ]))
function Fg(e52, t2, n2) {
  let r2 = t2.layout.get(`text-transform`).evaluate(n2, {})
  return (
    r2 === `uppercase`
      ? (e52 = e52.toLocaleUpperCase())
      : r2 === `lowercase` && (e52 = e52.toLocaleLowerCase()),
    Kc.applyArabicShaping && (e52 = Kc.applyArabicShaping(e52)),
    e52
  )
}
function Ig(e52, t2, n2) {
  for (let r2 of e52.sections) r2.text = Fg(r2.text, t2, n2)
  return e52
}
function Lg(e52) {
  let t2 = {},
    n2 = {},
    r2 = [],
    i2 = 0
  function a2(t3) {
    ;(r2.push(e52[t3]), i2++)
  }
  function o2(e53, t3, i3) {
    let a3 = n2[e53]
    return (
      delete n2[e53],
      (n2[t3] = a3),
      r2[a3].geometry[0].pop(),
      (r2[a3].geometry[0] = r2[a3].geometry[0].concat(i3[0])),
      a3
    )
  }
  function s2(e53, n3, i3) {
    let a3 = t2[n3]
    return (
      delete t2[n3],
      (t2[e53] = a3),
      r2[a3].geometry[0].shift(),
      (r2[a3].geometry[0] = i3[0].concat(r2[a3].geometry[0])),
      a3
    )
  }
  function c2(e53, t3, n3) {
    let r3 = n3 ? t3[0][t3[0].length - 1] : t3[0][0]
    return `${e53}:${r3.x}:${r3.y}`
  }
  for (let l2 = 0; l2 < e52.length; l2++) {
    let u2 = e52[l2],
      d2 = u2.geometry,
      f2 = u2.text ? u2.text.toString() : null
    if (!f2) {
      a2(l2)
      continue
    }
    let p2 = c2(f2, d2),
      m2 = c2(f2, d2, true)
    if (p2 in n2 && m2 in t2 && n2[p2] !== t2[m2]) {
      let e53 = s2(p2, m2, d2),
        i3 = o2(p2, m2, r2[e53].geometry)
      ;(delete t2[p2],
        delete n2[m2],
        (n2[c2(f2, r2[i3].geometry, true)] = i3),
        (r2[e53].geometry = null))
    } else
      p2 in n2
        ? o2(p2, m2, d2)
        : m2 in t2
          ? s2(p2, m2, d2)
          : (a2(l2), (t2[p2] = i2 - 1), (n2[m2] = i2 - 1))
  }
  return r2.filter(e53 => e53.geometry)
}
const Rg = typeof Intl < `u` && `Segmenter` in Intl,
  zg = Rg ? new Intl.Segmenter(void 0, {granularity: `grapheme`}) : null,
  Bg = Rg ? new Intl.Segmenter(void 0, {granularity: `word`}) : null
function Vg(e52) {
  if (!zg || !Ac(e52)) return [...e52]
  let t2 = []
  for (let {segment: n2} of zg.segment(e52)) {
    let e53 = t2.length - 1
    e53 >= 0 && Mc(t2[e53], n2) ? (t2[e53] += n2) : t2.push(n2)
  }
  return t2
}
function Hg(e52) {
  let t2 = /* @__PURE__ */ new Set()
  if (Bg) {
    for (let {index: n3} of Bg.segment(e52)) t2.add(n3)
    return t2
  }
  let n2 = 0
  for (let r2 of e52.split(/\b|(?=\p{Ideo})/u)) (t2.add(n2), (n2 += r2.length))
  return t2
}
function Ug(e52) {
  let t2 = e52.codePointAt(0)
  return e52.length > (t2 > 65535 ? 2 : 1)
}
const Wg = {
  "!": `\uFE15`,
  "#": `\uFF03`,
  $: `\uFF04`,
  "%": `\uFF05`,
  "&": `\uFF06`,
  "(": `\uFE35`,
  ")": `\uFE36`,
  "*": `\uFF0A`,
  "+": `\uFF0B`,
  ",": `\uFE10`,
  "-": `\uFE32`,
  ".": `\u30FB`,
  "/": `\uFF0F`,
  ":": `\uFE13`,
  ";": `\uFE14`,
  "<": `\uFE3F`,
  "=": `\uFF1D`,
  ">": `\uFE40`,
  "?": `\uFE16`,
  "@": `\uFF20`,
  "[": `\uFE47`,
  "\\": `\uFF3C`,
  "]": `\uFE48`,
  "^": `\uFF3E`,
  _: `\uFE33`,
  "`": `\uFF40`,
  "{": `\uFE37`,
  "|": `\u2015`,
  "}": `\uFE38`,
  "~": `\uFF5E`,
  "\xA2": `\uFFE0`,
  "\xA3": `\uFFE1`,
  "\xA5": `\uFFE5`,
  "\xA6": `\uFFE4`,
  "\xAC": `\uFFE2`,
  "\xAF": `\uFFE3`,
  "\u2013": `\uFE32`,
  "\u2014": `\uFE31`,
  "\u2018": `\uFE43`,
  "\u2019": `\uFE44`,
  "\u201C": `\uFE41`,
  "\u201D": `\uFE42`,
  "\u2026": `\uFE19`,
  "\u22EF": `\uFE19`,
  "\u2027": `\u30FB`,
  "\u20A9": `\uFFE6`,
  "\u3001": `\uFE11`,
  "\u3002": `\uFE12`,
  "\u3008": `\uFE3F`,
  "\u3009": `\uFE40`,
  "\u300A": `\uFE3D`,
  "\u300B": `\uFE3E`,
  "\u300C": `\uFE41`,
  "\u300D": `\uFE42`,
  "\u300E": `\uFE43`,
  "\u300F": `\uFE44`,
  "\u3010": `\uFE3B`,
  "\u3011": `\uFE3C`,
  "\u3014": `\uFE39`,
  "\u3015": `\uFE3A`,
  "\u3016": `\uFE17`,
  "\u3017": `\uFE18`,
  "\uFF01": `\uFE15`,
  "\uFF08": `\uFE35`,
  "\uFF09": `\uFE36`,
  "\uFF0C": `\uFE10`,
  "\uFF0D": `\uFE32`,
  "\uFF0E": `\u30FB`,
  "\uFF1A": `\uFE13`,
  "\uFF1B": `\uFE14`,
  "\uFF1C": `\uFE3F`,
  "\uFF1E": `\uFE40`,
  "\uFF1F": `\uFE16`,
  "\uFF3B": `\uFE47`,
  "\uFF3D": `\uFE48`,
  "\uFF3F": `\uFE33`,
  "\uFF5B": `\uFE37`,
  "\uFF5C": `\u2015`,
  "\uFF5D": `\uFE38`,
  "\uFF5F": `\uFE35`,
  "\uFF60": `\uFE36`,
  "\uFF61": `\uFE12`,
  "\uFF62": `\uFE41`,
  "\uFF63": `\uFE42`,
}
function Gg(e52) {
  let t2 = ``,
    n2 = {premature: true, value: void 0},
    r2 = e52[Symbol.iterator](),
    i2 = r2.next(),
    a2 = e52[Symbol.iterator]()
  a2.next()
  let o2 = a2.next()
  for (; !i2.done;)
    ((o2.done || !zc(o2.value.codePointAt(0)) || Wg[o2.value]) &&
    (n2.premature || !zc(n2.value.codePointAt(0)) || Wg[n2.value]) &&
    Wg[i2.value]
      ? (t2 += Wg[i2.value])
      : (t2 += i2.value),
      (n2 = {value: i2.value, premature: false}),
      (i2 = r2.next()),
      (o2 = a2.next()))
  return t2
}
const Kg = {
    10: true,
    13: true,
    32: true,
    38: true,
    41: true,
    43: true,
    45: true,
    47: true,
    173: true,
    183: true,
    8203: true,
    8208: true,
    8211: true,
    8231: true,
  },
  qg = {40: true}
function Jg(e52, t2, n2, r2, i2, a2) {
  if (`fontStack` in t2) {
    let r3 = n2[t2.fontStack],
      a3 = r3?.[e52]
    if (a3) return a3.metrics.advance * t2.scale + i2
    let o2 = 0
    for (let n3 of e52) {
      let e53 = r3?.[n3]
      e53 && (o2 += e53.metrics.advance * t2.scale + i2)
    }
    return o2
  }
  {
    let e53 = r2[t2.imageName]
    return e53 ? (e53.displaySize[0] * t2.scale * 24) / a2 + i2 : 0
  }
}
function Yg(e52, t2, n2, r2) {
  let i2 = (e52 - t2) ** 2
  return r2 ? (e52 < t2 ? i2 / 2 : i2 * 2) : i2 + Math.abs(n2) * n2
}
function Xg(e52) {
  return /^\s+$/u.test(e52)
}
function Zg(e52, t2, n2) {
  let r2 = 0
  return (
    (e52 === 10 || e52 === 13) && (r2 -= 1e4),
    n2 && (r2 += 150),
    (e52 === 40 || e52 === 65288) && (r2 += 50),
    (t2 === 41 || t2 === 65289) && (r2 += 50),
    r2
  )
}
function Qg(e52, t2, n2, r2, i2, a2) {
  let o2 = null,
    s2 = Yg(t2, n2, i2, a2)
  for (let e53 of r2) {
    let r3 = Yg(t2 - e53.x, n2, i2, a2) + e53.badness
    r3 <= s2 && ((o2 = e53), (s2 = r3))
  }
  return {index: e52, x: t2, priorBreak: o2, badness: s2}
}
function $g(e52) {
  return e52 ? $g(e52.priorBreak).concat(e52.index) : []
}
var e_ = class e48 {
  constructor(e52 = ``, t2 = [], n2 = []) {
    ;((this.text = e52),
      (this.sections = t2),
      (this.sectionIndex = n2),
      (this.imageSectionID = null),
      (this._graphemes = null))
  }
  graphemes() {
    return ((this._graphemes ??= Vg(this.text)), this._graphemes)
  }
  static fromFeature(t2, n2) {
    let r2 = new e48()
    for (let e52 of t2.sections)
      e52.image ? r2.addImageSection(e52) : r2.addTextSection(e52, n2)
    return r2
  }
  length() {
    return this.graphemes().length
  }
  getSection(e52) {
    return this.sections[this.sectionIndex[e52]]
  }
  getSectionIndex(e52) {
    return this.sectionIndex[e52]
  }
  verticalizePunctuation() {
    ;((this.text = Gg(this.text)), (this._graphemes = null))
  }
  hasZeroWidthSpaces() {
    return this.text.includes(`\u200B`)
  }
  trim() {
    let e52 = this.graphemes(),
      t2 = 0
    for (; t2 < e52.length && Xg(e52[t2]);) t2++
    let n2 = e52.length
    for (; n2 > t2 && Xg(e52[n2 - 1]);) n2--
    ;((this.text = e52.slice(t2, n2).join(``)),
      (this.sectionIndex = this.sectionIndex.slice(t2, n2)),
      (this._graphemes = null))
  }
  substring(t2, n2) {
    let r2 = this.graphemes().slice(t2, n2).join(``),
      i2 = this.sectionIndex.slice(t2, n2)
    return new e48(r2, this.sections, i2)
  }
  toCodeUnitIndex(e52) {
    return this.graphemes().slice(0, e52).join(``).length
  }
  toString() {
    return this.text
  }
  getMaxScale() {
    return this.sectionIndex.reduce(
      (e52, t2) => Math.max(e52, this.sections[t2].scale),
      0
    )
  }
  getMaxImageSize(e52) {
    let t2 = 0,
      n2 = 0
    for (let r2 = 0; r2 < this.length(); r2++) {
      let i2 = this.getSection(r2)
      if (`imageName` in i2) {
        let r3 = e52[i2.imageName]
        if (!r3) continue
        let a2 = r3.displaySize
        ;((t2 = Math.max(t2, a2[0])), (n2 = Math.max(n2, a2[1])))
      }
    }
    return {maxImageWidth: t2, maxImageHeight: n2}
  }
  _appendSection(e52, t2) {
    let n2 = this.graphemes(),
      r2 = n2.length > 0 ? n2[n2.length - 1] : ``,
      i2 = Vg(r2 + e52)
    ;((this.text += e52),
      (this._graphemes = n2.slice(0, r2 ? -1 : void 0).concat(i2)))
    let a2 = i2.length - +!!r2
    for (let e53 = 0; e53 < a2; e53++) this.sectionIndex.push(t2)
  }
  addTextSection(e52, t2) {
    ;(this.sections.push({
      scale: e52.scale || 1,
      verticalAlign: e52.verticalAlign || `bottom`,
      fontStack: e52.fontStack || t2,
    }),
      this._appendSection(e52.text, this.sections.length - 1))
  }
  addImageSection(e52) {
    let t2 = e52.image ? e52.image.name : ``
    if (t2.length === 0) {
      It(`Can't add FormattedSection with an empty image.`)
      return
    }
    let n2 = this.getNextImageSectionCharCode()
    if (!n2) {
      It(`Reached maximum number of images 6401`)
      return
    }
    ;(this.sections.push({
      scale: 1,
      verticalAlign: e52.verticalAlign || `bottom`,
      imageName: t2,
    }),
      this._appendSection(String.fromCharCode(n2), this.sections.length - 1))
  }
  getNextImageSectionCharCode() {
    return this.imageSectionID
      ? this.imageSectionID >= 63743
        ? null
        : ++this.imageSectionID
      : ((this.imageSectionID = 57344), this.imageSectionID)
  }
  determineLineBreaks(e52, t2, n2, r2, i2) {
    let a2 = [],
      o2 = this.determineAverageLineWidth(e52, t2, n2, r2, i2),
      s2 = this.hasZeroWidthSpaces(),
      c2 = this.graphemes(),
      l2 = null,
      u2 = 0,
      d2 = 0
    for (let t3 = 0; t3 < c2.length; t3++) {
      let f2 = c2[t3]
      if (t3 > 0) {
        let e53 = c2[t3 - 1].codePointAt(0),
          n3 = f2.codePointAt(0),
          r3 = Ec(e53),
          i3 = jc(e53) && jc(n3)
        ;(Kg[e53] ||
          r3 ||
          `imageName` in this.getSection(t3 - 1) ||
          (c2[t3 + 1] !== void 0 && qg[n3]) ||
          (i3 && (l2 ??= Hg(this.text)).has(d2))) &&
          a2.push(Qg(t3, u2, o2, a2, Zg(e53, n3, r3 && s2), false))
      }
      ;(Nc(f2.codePointAt(0)) ||
        (u2 += Jg(f2, this.getSection(t3), n2, r2, e52, i2)),
        (d2 += f2.length))
    }
    return $g(Qg(this.length(), u2, o2, a2, 0, true))
  }
  determineAverageLineWidth(e52, t2, n2, r2, i2) {
    let a2 = 0,
      o2 = 0
    for (let t3 of this.graphemes()) {
      let s3 = this.getSection(o2)
      ;((a2 += Jg(t3, s3, n2, r2, e52, i2)), o2++)
    }
    let s2 = Math.max(1, Math.ceil(a2 / t2))
    return a2 / s2
  }
}
const t_ = 4294967296,
  n_ = 1 / t_,
  r_ = typeof TextDecoder > `u` ? null : new TextDecoder(`utf-8`)
var i_ = class {
    constructor(e52) {
      ;((this.buf = ArrayBuffer.isView(e52) ? e52 : new Uint8Array(e52)),
        (this.dataView = new DataView(
          this.buf.buffer,
          this.buf.byteOffset,
          this.buf.byteLength
        )),
        (this.pos = 0),
        (this.type = 0),
        (this._valueStart = -1),
        (this.length = this.buf.length))
    }
    readFields(e52, t2, n2 = this.length) {
      let r2
      for (; (r2 = this.nextField(n2));) e52(r2, t2, this)
      return t2
    }
    readMessage(e52, t2) {
      return this.readFields(e52, t2, this.readVarint() + this.pos)
    }
    readFixed32() {
      let e52 = this.dataView.getUint32(this.pos, true)
      return ((this.pos += 4), e52)
    }
    readSFixed32() {
      let e52 = this.dataView.getInt32(this.pos, true)
      return ((this.pos += 4), e52)
    }
    readFixed64() {
      let e52 =
        this.dataView.getUint32(this.pos, true) +
        this.dataView.getUint32(this.pos + 4, true) * t_
      return ((this.pos += 8), e52)
    }
    readSFixed64() {
      let e52 =
        this.dataView.getUint32(this.pos, true) +
        this.dataView.getInt32(this.pos + 4, true) * t_
      return ((this.pos += 8), e52)
    }
    readFloat() {
      let e52 = this.dataView.getFloat32(this.pos, true)
      return ((this.pos += 4), e52)
    }
    readDouble() {
      let e52 = this.dataView.getFloat64(this.pos, true)
      return ((this.pos += 8), e52)
    }
    readVarint(e52) {
      let t2 = this.buf,
        n2 = t2[this.pos++]
      if (n2 < 128) return n2
      let r2 = n2 & 127,
        i2
      return (
        (i2 = t2[this.pos++]),
        (r2 |= (i2 & 127) << 7),
        i2 < 128 ||
        ((i2 = t2[this.pos++]), (r2 |= (i2 & 127) << 14), i2 < 128) ||
        ((i2 = t2[this.pos++]), (r2 |= (i2 & 127) << 21), i2 < 128)
          ? r2
          : ((i2 = t2[this.pos]), (r2 |= (i2 & 15) << 28), o_(r2, e52, this))
      )
    }
    readSVarint() {
      let e52 = this.readVarint()
      return e52 % 2 == 1 ? (e52 + 1) / -2 : e52 / 2
    }
    readBoolean() {
      return !!this.readVarint()
    }
    readString() {
      let e52 = this.readVarint() + this.pos,
        t2 = this.pos
      return (
        (this.pos = e52),
        e52 - t2 >= 12 && r_
          ? r_.decode(this.buf.subarray(t2, e52))
          : x_(this.buf, t2, e52)
      )
    }
    readBytes() {
      let e52 = this.readVarint() + this.pos,
        t2 = this.buf.subarray(this.pos, e52)
      return ((this.pos = e52), t2)
    }
    readPackedVarint(e52 = [], t2) {
      let n2 = this.readPackedEnd()
      for (; this.pos < n2;) e52.push(this.readVarint(t2))
      return e52
    }
    readPackedSVarint(e52 = []) {
      let t2 = this.readPackedEnd()
      for (; this.pos < t2;) e52.push(this.readSVarint())
      return e52
    }
    readPackedBoolean(e52 = []) {
      let t2 = this.readPackedEnd()
      for (; this.pos < t2;) e52.push(this.readBoolean())
      return e52
    }
    readPackedFloat(e52 = []) {
      let t2 = this.readPackedEnd()
      for (; this.pos < t2;) e52.push(this.readFloat())
      return e52
    }
    readPackedDouble(e52 = []) {
      let t2 = this.readPackedEnd()
      for (; this.pos < t2;) e52.push(this.readDouble())
      return e52
    }
    readPackedFixed32(e52 = []) {
      let t2 = this.readPackedEnd()
      for (; this.pos < t2;) e52.push(this.readFixed32())
      return e52
    }
    readPackedSFixed32(e52 = []) {
      let t2 = this.readPackedEnd()
      for (; this.pos < t2;) e52.push(this.readSFixed32())
      return e52
    }
    readPackedFixed64(e52 = []) {
      let t2 = this.readPackedEnd()
      for (; this.pos < t2;) e52.push(this.readFixed64())
      return e52
    }
    readPackedSFixed64(e52 = []) {
      let t2 = this.readPackedEnd()
      for (; this.pos < t2;) e52.push(this.readSFixed64())
      return e52
    }
    readPackedEnd() {
      return this.type === 2 ? this.readVarint() + this.pos : this.pos + 1
    }
    nextField(e52 = this.length) {
      if (
        (this.pos === this._valueStart && this.skip(this.type), this.pos >= e52)
      )
        return 0
      let t2 = this.readVarint()
      return ((this.type = t2 & 7), (this._valueStart = this.pos), t2 >>> 3)
    }
    skip(e52) {
      let t2 = e52 & 7
      if (t2 === 0) for (; this.buf[this.pos++] > 127;);
      else if (t2 === 2) this.pos = this.readVarint() + this.pos
      else if (t2 === 5) this.pos += 4
      else if (t2 === 1) this.pos += 8
      else throw Error(`Unimplemented type: ${t2}`)
    }
  },
  a_ = class {
    constructor(e52 = new Uint8Array(16)) {
      ;((this.buf = ArrayBuffer.isView(e52) ? e52 : new Uint8Array(e52)),
        (this.dataView = new DataView(
          this.buf.buffer,
          this.buf.byteOffset,
          this.buf.byteLength
        )),
        (this.pos = 0),
        (this.length = this.buf.length))
    }
    writeTag(e52, t2) {
      this.writeVarint((e52 << 3) | t2)
    }
    realloc(e52) {
      let t2 = this.length || 16
      for (; t2 < this.pos + e52;) t2 *= 2
      if (t2 !== this.length) {
        let e53 = new Uint8Array(t2)
        ;(e53.set(this.buf),
          (this.buf = e53),
          (this.dataView = new DataView(e53.buffer)),
          (this.length = t2))
      }
    }
    finish() {
      return (
        (this.length = this.pos),
        (this.pos = 0),
        this.buf.subarray(0, this.length)
      )
    }
    writeFixed32(e52) {
      ;(this.realloc(4),
        this.dataView.setInt32(this.pos, e52, true),
        (this.pos += 4))
    }
    writeSFixed32(e52) {
      ;(this.realloc(4),
        this.dataView.setInt32(this.pos, e52, true),
        (this.pos += 4))
    }
    writeFixed64(e52) {
      ;(this.realloc(8),
        this.dataView.setInt32(this.pos, e52 & -1, true),
        this.dataView.setInt32(this.pos + 4, Math.floor(e52 * n_), true),
        (this.pos += 8))
    }
    writeSFixed64(e52) {
      ;(this.realloc(8),
        this.dataView.setInt32(this.pos, e52 & -1, true),
        this.dataView.setInt32(this.pos + 4, Math.floor(e52 * n_), true),
        (this.pos += 8))
    }
    writeVarint(e52) {
      if (((e52 = +e52 || 0), e52 >= 0 && e52 < 128)) {
        ;(this.pos >= this.length && this.realloc(1),
          (this.buf[this.pos++] = e52))
        return
      }
      if (e52 > 268435455 || e52 < 0) {
        c_(e52, this)
        return
      }
      ;(this.realloc(4),
        (this.buf[this.pos++] = (e52 & 127) | (e52 > 127 ? 128 : 0)),
        !(e52 <= 127) &&
          ((this.buf[this.pos++] =
            ((e52 >>>= 7) & 127) | (e52 > 127 ? 128 : 0)),
          !(e52 <= 127) &&
            ((this.buf[this.pos++] =
              ((e52 >>>= 7) & 127) | (e52 > 127 ? 128 : 0)),
            !(e52 <= 127) && (this.buf[this.pos++] = (e52 >>> 7) & 127))))
    }
    writeSVarint(e52) {
      this.writeVarint(e52 < 0 ? -e52 * 2 - 1 : e52 * 2)
    }
    writeBoolean(e52) {
      this.writeVarint(+e52)
    }
    writeString(e52) {
      ;((e52 = String(e52)), this.realloc(e52.length * 4), this.pos++)
      let t2 = this.pos
      this.pos = S_(this.buf, e52, this.pos)
      let n2 = this.pos - t2
      ;(n2 >= 128 && d_(t2, n2, this),
        (this.pos = t2 - 1),
        this.writeVarint(n2),
        (this.pos += n2))
    }
    writeFloat(e52) {
      ;(this.realloc(4),
        this.dataView.setFloat32(this.pos, e52, true),
        (this.pos += 4))
    }
    writeDouble(e52) {
      ;(this.realloc(8),
        this.dataView.setFloat64(this.pos, e52, true),
        (this.pos += 8))
    }
    writeBytes(e52) {
      let t2 = e52.length
      ;(this.writeVarint(t2),
        this.realloc(t2),
        this.buf.set(e52, this.pos),
        (this.pos += t2))
    }
    writeRawMessage(e52, t2) {
      this.pos++
      let n2 = this.pos
      e52(t2, this)
      let r2 = this.pos - n2
      ;(r2 >= 128 && d_(n2, r2, this),
        (this.pos = n2 - 1),
        this.writeVarint(r2),
        (this.pos += r2))
    }
    writeMessage(e52, t2, n2) {
      ;(this.writeTag(e52, 2), this.writeRawMessage(t2, n2))
    }
    writePackedVarint(e52, t2) {
      t2.length && this.writeMessage(e52, f_, t2)
    }
    writePackedSVarint(e52, t2) {
      t2.length && this.writeMessage(e52, p_, t2)
    }
    writePackedBoolean(e52, t2) {
      t2.length && this.writeMessage(e52, g_, t2)
    }
    writePackedFloat(e52, t2) {
      t2.length && this.writeMessage(e52, m_, t2)
    }
    writePackedDouble(e52, t2) {
      t2.length && this.writeMessage(e52, h_, t2)
    }
    writePackedFixed32(e52, t2) {
      t2.length && this.writeMessage(e52, __, t2)
    }
    writePackedSFixed32(e52, t2) {
      t2.length && this.writeMessage(e52, v_, t2)
    }
    writePackedFixed64(e52, t2) {
      t2.length && this.writeMessage(e52, y_, t2)
    }
    writePackedSFixed64(e52, t2) {
      t2.length && this.writeMessage(e52, b_, t2)
    }
    writeBytesField(e52, t2) {
      ;(this.writeTag(e52, 2), this.writeBytes(t2))
    }
    writeFixed32Field(e52, t2) {
      ;(this.writeTag(e52, 5), this.writeFixed32(t2))
    }
    writeSFixed32Field(e52, t2) {
      ;(this.writeTag(e52, 5), this.writeSFixed32(t2))
    }
    writeFixed64Field(e52, t2) {
      ;(this.writeTag(e52, 1), this.writeFixed64(t2))
    }
    writeSFixed64Field(e52, t2) {
      ;(this.writeTag(e52, 1), this.writeSFixed64(t2))
    }
    writeVarintField(e52, t2) {
      ;(this.writeTag(e52, 0), this.writeVarint(t2))
    }
    writeSVarintField(e52, t2) {
      ;(this.writeTag(e52, 0), this.writeSVarint(t2))
    }
    writeStringField(e52, t2) {
      ;(this.writeTag(e52, 2), this.writeString(t2))
    }
    writeFloatField(e52, t2) {
      ;(this.writeTag(e52, 5), this.writeFloat(t2))
    }
    writeDoubleField(e52, t2) {
      ;(this.writeTag(e52, 1), this.writeDouble(t2))
    }
    writeBooleanField(e52, t2) {
      this.writeVarintField(e52, +t2)
    }
  }
function o_(e52, t2, n2) {
  let r2 = n2.buf,
    i2,
    a2
  if (
    ((a2 = r2[n2.pos++]),
    (i2 = (a2 & 112) >> 4),
    a2 < 128 ||
      ((a2 = r2[n2.pos++]), (i2 |= (a2 & 127) << 3), a2 < 128) ||
      ((a2 = r2[n2.pos++]), (i2 |= (a2 & 127) << 10), a2 < 128) ||
      ((a2 = r2[n2.pos++]), (i2 |= (a2 & 127) << 17), a2 < 128) ||
      ((a2 = r2[n2.pos++]), (i2 |= (a2 & 127) << 24), a2 < 128) ||
      ((a2 = r2[n2.pos++]), (i2 |= (a2 & 1) << 31), a2 < 128))
  )
    return s_(e52, i2, t2)
  throw Error(`Expected varint not more than 10 bytes`)
}
function s_(e52, t2, n2) {
  return n2
    ? t2 * 4294967296 + (e52 >>> 0)
    : (t2 >>> 0) * 4294967296 + (e52 >>> 0)
}
function c_(e52, t2) {
  let n2, r2
  if (
    (e52 >= 0
      ? ((n2 = (e52 % 4294967296) | 0), (r2 = (e52 / 4294967296) | 0))
      : ((n2 = ~(-e52 % 4294967296)),
        (r2 = ~(-e52 / 4294967296)),
        n2 ^ 4294967295
          ? (n2 = (n2 + 1) | 0)
          : ((n2 = 0), (r2 = (r2 + 1) | 0))),
    e52 >= 18446744073709552e3 || e52 < -18446744073709552e3)
  )
    throw Error(`Given varint doesn't fit into 10 bytes`)
  ;(t2.realloc(10), l_(n2, r2, t2), u_(r2, t2))
}
function l_(e52, t2, n2) {
  ;((n2.buf[n2.pos++] = (e52 & 127) | 128),
    (e52 >>>= 7),
    (n2.buf[n2.pos++] = (e52 & 127) | 128),
    (e52 >>>= 7),
    (n2.buf[n2.pos++] = (e52 & 127) | 128),
    (e52 >>>= 7),
    (n2.buf[n2.pos++] = (e52 & 127) | 128),
    (e52 >>>= 7),
    (n2.buf[n2.pos] = e52 & 127))
}
function u_(e52, t2) {
  let n2 = (e52 & 7) << 4
  ;((t2.buf[t2.pos++] |= n2 | ((e52 >>>= 3) ? 128 : 0)),
    e52 &&
      ((t2.buf[t2.pos++] = (e52 & 127) | ((e52 >>>= 7) ? 128 : 0)),
      e52 &&
        ((t2.buf[t2.pos++] = (e52 & 127) | ((e52 >>>= 7) ? 128 : 0)),
        e52 &&
          ((t2.buf[t2.pos++] = (e52 & 127) | ((e52 >>>= 7) ? 128 : 0)),
          e52 &&
            ((t2.buf[t2.pos++] = (e52 & 127) | ((e52 >>>= 7) ? 128 : 0)),
            e52 && (t2.buf[t2.pos++] = e52 & 127))))))
}
function d_(e52, t2, n2) {
  let r2 =
    t2 <= 16383
      ? 1
      : t2 <= 2097151
        ? 2
        : t2 <= 268435455
          ? 3
          : Math.floor(Math.log(t2) / (Math.LN2 * 7))
  ;(n2.realloc(r2), n2.buf.copyWithin(e52 + r2, e52, n2.pos))
}
function f_(e52, t2) {
  let n2 = e52.length,
    r2 = t2.buf,
    i2 = t2.pos,
    a2 = t2.length
  for (let o2 = 0; o2 < n2; o2++) {
    let n3 = e52[o2]
    if (n3 < 0 || i2 + 10 > a2) {
      ;((t2.pos = i2),
        t2.writeVarint(n3),
        (r2 = t2.buf),
        (i2 = t2.pos),
        (a2 = t2.length))
      continue
    }
    for (; n3 > 127;)
      ((r2[i2++] = (n3 % 128) | 128), (n3 = Math.floor(n3 / 128)))
    r2[i2++] = n3
  }
  t2.pos = i2
}
function p_(e52, t2) {
  for (let n2 = 0; n2 < e52.length; n2++) t2.writeSVarint(e52[n2])
}
function m_(e52, t2) {
  for (let n2 = 0; n2 < e52.length; n2++) t2.writeFloat(e52[n2])
}
function h_(e52, t2) {
  for (let n2 = 0; n2 < e52.length; n2++) t2.writeDouble(e52[n2])
}
function g_(e52, t2) {
  for (let n2 = 0; n2 < e52.length; n2++) t2.writeBoolean(e52[n2])
}
function __(e52, t2) {
  for (let n2 = 0; n2 < e52.length; n2++) t2.writeFixed32(e52[n2])
}
function v_(e52, t2) {
  for (let n2 = 0; n2 < e52.length; n2++) t2.writeSFixed32(e52[n2])
}
function y_(e52, t2) {
  for (let n2 = 0; n2 < e52.length; n2++) t2.writeFixed64(e52[n2])
}
function b_(e52, t2) {
  for (let n2 = 0; n2 < e52.length; n2++) t2.writeSFixed64(e52[n2])
}
function x_(e52, t2, n2) {
  let r2 = ``,
    i2 = t2
  for (; i2 < n2;) {
    let t3 = e52[i2],
      a2 = null,
      o2 = t3 > 239 ? 4 : t3 > 223 ? 3 : t3 > 191 ? 2 : 1
    if (i2 + o2 > n2) break
    let s2, c2, l2
    ;(o2 === 1
      ? t3 < 128 && (a2 = t3)
      : o2 === 2
        ? ((s2 = e52[i2 + 1]),
          (s2 & 192) == 128 &&
            ((a2 = ((t3 & 31) << 6) | (s2 & 63)), a2 <= 127 && (a2 = null)))
        : o2 === 3
          ? ((s2 = e52[i2 + 1]),
            (c2 = e52[i2 + 2]),
            (s2 & 192) == 128 &&
              (c2 & 192) == 128 &&
              ((a2 = ((t3 & 15) << 12) | ((s2 & 63) << 6) | (c2 & 63)),
              (a2 <= 2047 || (a2 >= 55296 && a2 <= 57343)) && (a2 = null)))
          : o2 === 4 &&
            ((s2 = e52[i2 + 1]),
            (c2 = e52[i2 + 2]),
            (l2 = e52[i2 + 3]),
            (s2 & 192) == 128 &&
              (c2 & 192) == 128 &&
              (l2 & 192) == 128 &&
              ((a2 =
                ((t3 & 15) << 18) |
                ((s2 & 63) << 12) |
                ((c2 & 63) << 6) |
                (l2 & 63)),
              (a2 <= 65535 || a2 >= 1114112) && (a2 = null))),
      a2 === null
        ? ((a2 = 65533), (o2 = 1))
        : a2 > 65535 &&
          ((a2 -= 65536),
          (r2 += String.fromCharCode(((a2 >>> 10) & 1023) | 55296)),
          (a2 = 56320 | (a2 & 1023))),
      (r2 += String.fromCharCode(a2)),
      (i2 += o2))
  }
  return r2
}
function S_(e52, t2, n2) {
  for (let r2 = 0, i2, a2; r2 < t2.length; r2++) {
    if (((i2 = t2.charCodeAt(r2)), i2 > 55295 && i2 < 57344)) {
      if (a2) {
        if (i2 < 56320) {
          ;((e52[n2++] = 239), (e52[n2++] = 191), (e52[n2++] = 189), (a2 = i2))
          continue
        }
        ;((i2 = ((a2 - 55296) << 10) | (i2 - 56320) | 65536), (a2 = null))
      } else {
        i2 > 56319 || r2 + 1 === t2.length
          ? ((e52[n2++] = 239), (e52[n2++] = 191), (e52[n2++] = 189))
          : (a2 = i2)
        continue
      }
    } else
      a2 &&= ((e52[n2++] = 239), (e52[n2++] = 191), (e52[n2++] = 189), null)
    i2 < 128
      ? (e52[n2++] = i2)
      : (i2 < 2048
          ? (e52[n2++] = (i2 >> 6) | 192)
          : (i2 < 65536
              ? (e52[n2++] = (i2 >> 12) | 224)
              : ((e52[n2++] = (i2 >> 18) | 240),
                (e52[n2++] = ((i2 >> 12) & 63) | 128)),
            (e52[n2++] = ((i2 >> 6) & 63) | 128)),
        (e52[n2++] = (i2 & 63) | 128))
  }
  return n2
}
function C_(e52, t2, n2) {
  e52 === 1 && n2.readMessage(w_, t2)
}
function w_(e52, t2, n2) {
  if (e52 === 3) {
    let {
      id: e53,
      bitmap: r2,
      width: i2,
      height: a2,
      left: o2,
      top: s2,
      advance: c2,
    } = n2.readMessage(T_, {})
    t2.push({
      id: e53,
      bitmap: new Qd({width: i2 + 6, height: a2 + 6}, r2),
      metrics: {width: i2, height: a2, left: o2, top: s2, advance: c2},
    })
  }
}
function T_(e52, t2, n2) {
  e52 === 1
    ? (t2.id = n2.readVarint())
    : e52 === 2
      ? (t2.bitmap = n2.readBytes())
      : e52 === 3
        ? (t2.width = n2.readVarint())
        : e52 === 4
          ? (t2.height = n2.readVarint())
          : e52 === 5
            ? (t2.left = n2.readSVarint())
            : e52 === 6
              ? (t2.top = n2.readSVarint())
              : e52 === 7 && (t2.advance = n2.readVarint())
}
function E_(e52) {
  return new i_(e52).readFields(C_, [])
}
function D_(e52) {
  return typeof e52?.renderWithWebGL == `function`
}
function O_(e52) {
  let {userImage: t2} = e52
  return !t2?.render || !t2.render()
    ? false
    : (D_(t2.data) || e52.data.replace(new Uint8Array(t2.data.buffer)), true)
}
function k_(e52) {
  let t2 = 0,
    n2 = 0
  for (let r3 of e52) ((t2 += r3.w * r3.h), (n2 = Math.max(n2, r3.w)))
  e52.sort((e53, t3) => t3.h - e53.h)
  let r2 = [
      {x: 0, y: 0, w: Math.max(Math.ceil(Math.sqrt(t2 / 0.95)), n2), h: 1 / 0},
    ],
    i2 = 0,
    a2 = 0
  for (let t3 of e52)
    for (let e53 = r2.length - 1; e53 >= 0; e53--) {
      let n3 = r2[e53]
      if (!(t3.w > n3.w || t3.h > n3.h)) {
        if (
          ((t3.x = n3.x),
          (t3.y = n3.y),
          (a2 = Math.max(a2, t3.y + t3.h)),
          (i2 = Math.max(i2, t3.x + t3.w)),
          t3.w === n3.w && t3.h === n3.h)
        ) {
          let t4 = r2.pop()
          t4 && e53 < r2.length && (r2[e53] = t4)
        } else
          t3.h === n3.h
            ? ((n3.x += t3.w), (n3.w -= t3.w))
            : t3.w === n3.w
              ? ((n3.y += t3.h), (n3.h -= t3.h))
              : (r2.push({x: n3.x + t3.w, y: n3.y, w: n3.w - t3.w, h: t3.h}),
                (n3.y += t3.h),
                (n3.h -= t3.h))
        break
      }
    }
  return {w: i2, h: a2, fill: t2 / (i2 * a2) || 0}
}
var A_ = class {
    constructor(
      e52,
      {
        pixelRatio: t2,
        version: n2,
        isWebGLImage: r2 = false,
        stretchX: i2,
        stretchY: a2,
        content: o2,
        textFitWidth: s2,
        textFitHeight: c2,
      }
    ) {
      ;((this.paddedRect = e52),
        (this.pixelRatio = t2),
        (this.stretchX = i2),
        (this.stretchY = a2),
        (this.content = o2),
        (this.version = n2),
        (this.needsFirstWebGLRender = r2),
        (this.textFitWidth = s2),
        (this.textFitHeight = c2))
    }
    get tl() {
      return [this.paddedRect.x + 1, this.paddedRect.y + 1]
    }
    get br() {
      return [
        this.paddedRect.x + this.paddedRect.w - 1,
        this.paddedRect.y + this.paddedRect.h - 1,
      ]
    }
    get tlbr() {
      return this.tl.concat(this.br)
    }
    get displaySize() {
      return [
        (this.paddedRect.w - 2) / this.pixelRatio,
        (this.paddedRect.h - 2) / this.pixelRatio,
      ]
    }
  },
  j_ = class {
    constructor(e52, t2) {
      let n2 = {},
        r2 = {}
      ;((this.haveRenderCallbacks = []), (this.patchedUpdateVersion = -1))
      let i2 = []
      ;(this.addImages(e52, n2, i2), this.addImages(t2, r2, i2))
      let {w: a2, h: o2} = k_(i2),
        s2 = new $d({width: a2 || 1, height: o2 || 1})
      for (let t3 in e52) {
        let r3 = e52[t3]
        if (r3.isWebGLImage) continue
        let i3 = n2[t3].paddedRect
        $d.copy(r3.data, s2, {x: 0, y: 0}, {x: i3.x + 1, y: i3.y + 1}, r3.data)
      }
      for (let e53 in t2) {
        let n3 = t2[e53],
          i3 = r2[e53].paddedRect,
          a3 = i3.x + 1,
          o3 = i3.y + 1,
          c2 = n3.data.width,
          l2 = n3.data.height
        ;($d.copy(n3.data, s2, {x: 0, y: 0}, {x: a3, y: o3}, n3.data),
          $d.copy(
            n3.data,
            s2,
            {x: 0, y: l2 - 1},
            {x: a3, y: o3 - 1},
            {width: c2, height: 1}
          ),
          $d.copy(
            n3.data,
            s2,
            {x: 0, y: 0},
            {x: a3, y: o3 + l2},
            {width: c2, height: 1}
          ),
          $d.copy(
            n3.data,
            s2,
            {x: c2 - 1, y: 0},
            {x: a3 - 1, y: o3},
            {width: 1, height: l2}
          ),
          $d.copy(
            n3.data,
            s2,
            {x: 0, y: 0},
            {x: a3 + c2, y: o3},
            {width: 1, height: l2}
          ))
      }
      ;((this.image = s2),
        (this.iconPositions = n2),
        (this.patternPositions = r2))
    }
    addImages(e52, t2, n2) {
      for (let r2 in e52) {
        let i2 = e52[r2],
          a2 = {x: 0, y: 0, w: i2.data.width + 2, h: i2.data.height + 2}
        ;(n2.push(a2),
          (t2[r2] = new A_(a2, i2)),
          i2.hasRenderCallback && this.haveRenderCallbacks.push(r2))
      }
    }
    patchUpdatedImages(e52, t2) {
      if (
        (e52.dispatchRenderCallbacks(this.haveRenderCallbacks),
        this.patchedUpdateVersion !== e52.updateVersion)
      ) {
        this.patchedUpdateVersion = e52.updateVersion
        for (let n2 in this.iconPositions)
          this.patchUpdatedImage(this.iconPositions[n2], e52.getImage(n2), t2)
        for (let n2 in this.patternPositions)
          this.patchUpdatedImage(
            this.patternPositions[n2],
            e52.getImage(n2),
            t2
          )
      }
    }
    patchUpdatedImage(e52, t2, n2) {
      if (
        !e52 ||
        !t2 ||
        (!e52.needsFirstWebGLRender && e52.version === t2.version)
      )
        return
      ;((e52.needsFirstWebGLRender = false), (e52.version = t2.version))
      let [r2, i2] = e52.tl,
        a2 = t2.userImage?.data
      if (!D_(a2)) {
        n2.update(t2.data, void 0, {x: r2, y: i2})
        return
      }
      let {width: o2, height: s2} = t2.data
      ;(n2.context.setCustomLayerDefaults(),
        a2.renderWithWebGL({
          gl: n2.context.gl,
          texture: n2.texture,
          x: r2,
          y: i2,
          width: o2,
          height: s2,
        }),
        n2.context.setDirty())
    }
  }
;(H(`ImagePosition`, A_), H(`ImageAtlas`, j_))
var M_ = (function (e52) {
  return (
    (e52[(e52.none = 0)] = `none`),
    (e52[(e52.horizontal = 1)] = `horizontal`),
    (e52[(e52.vertical = 2)] = `vertical`),
    (e52[(e52.horizontalOnly = 3)] = `horizontalOnly`),
    e52
  )
})(M_ || {})
function N_(e52) {
  for (let t2 of e52) if (t2.positionedGlyphs.length !== 0) return false
  return true
}
function P_(e52, t2) {
  let n2 = [],
    r2 = 0
  for (let i2 of t2) (n2.push(e52.substring(r2, i2)), (r2 = i2))
  return (r2 < e52.length() && n2.push(e52.substring(r2, e52.length())), n2)
}
const F_ = /^\p{gc=M}$/u
function I_(e52) {
  let t2 = [],
    n2 = 0
  for (; n2 < e52.length;) {
    if (!F_.test(e52[n2])) {
      ;(t2.push(n2), n2++)
      continue
    }
    let r2 = n2
    for (; r2 < e52.length && F_.test(e52[r2]);) r2++
    let i2 = e52[r2]
    if (i2 !== void 0 && Hc(i2.codePointAt(0))) {
      t2.push(r2)
      for (let e53 = r2 - 1; e53 >= n2; e53--) t2.push(e53)
      n2 = r2 + 1
    } else {
      for (let e53 = n2; e53 < r2; e53++) t2.push(e53)
      n2 = r2
    }
  }
  return t2
}
function L_(e52) {
  let t2 = [],
    n2 = 0
  for (let r2 of e52.graphemes())
    (t2.push(...Array(r2.length).fill(e52.sectionIndex[n2])), n2++)
  return t2
}
function R_(e52, t2, n2) {
  let r2 = [...e52],
    i2 = [],
    a2 = 0
  for (let e53 of r2) (i2.push(a2), (a2 += e53.length))
  let o2 = I_(r2),
    s2 = new e_(o2.map(e53 => r2[e53]).join(``), t2, []),
    c2 = o2.map(e53 => n2[i2[e53]] ?? 0),
    l2 = 0
  for (let e53 of s2.graphemes())
    (s2.sectionIndex.push(c2[l2] ?? 0), (l2 += [...e53].length))
  return s2
}
function z_(e52, t2, n2, r2, i2, a2, o2, s2, c2, l2, u2, d2, f2, p2, m2) {
  let h2 = e_.fromFeature(e52, i2)
  d2 === 2 && h2.verticalizePunctuation()
  let g2,
    _2 = h2.determineLineBreaks(l2, a2, t2, r2, p2),
    {processBidirectionalText: v2, processStyledBidirectionalText: y2} = Kc
  if (v2 && h2.sections.length === 1) {
    ;((g2 = []), (_2 = _2.map(e54 => h2.toCodeUnitIndex(e54))))
    let e53 = v2(h2.toString(), _2)
    for (let t3 of e53)
      g2.push(
        R_(
          t3,
          h2.sections,
          [...t3].map(() => 0)
        )
      )
  } else if (y2) {
    ;((g2 = []), (_2 = _2.map(e54 => h2.toCodeUnitIndex(e54))))
    let e53 = L_(h2),
      t3 = y2(h2.text, e53, _2)
    for (let e54 of t3) g2.push(R_(e54[0], h2.sections, e54[1]))
  } else g2 = P_(h2, _2)
  let b2 = [],
    x2 = {
      positionedLines: b2,
      text: h2.toString(),
      top: u2[1],
      bottom: u2[1],
      left: u2[0],
      right: u2[0],
      writingMode: d2,
      iconsInText: false,
      verticalizable: false,
    }
  return (Q_(x2, t2, n2, r2, g2, o2, s2, c2, d2, l2, f2, m2), !N_(b2) && x2)
}
function B_(e52) {
  let t2 = 0.5,
    n2 = 0.5
  switch (e52) {
    case `right`:
    case `top-right`:
    case `bottom-right`:
      t2 = 1
      break
    case `left`:
    case `top-left`:
    case `bottom-left`:
      t2 = 0
  }
  switch (e52) {
    case `bottom`:
    case `bottom-right`:
    case `bottom-left`:
      n2 = 1
      break
    case `top`:
    case `top-right`:
    case `top-left`:
      n2 = 0
  }
  return {horizontalAlign: t2, verticalAlign: n2}
}
function V_(e52, t2, n2) {
  let r2 = t2.getMaxScale() * 24,
    {maxImageWidth: i2, maxImageHeight: a2} = t2.getMaxImageSize(e52),
    o2 = Math.max(r2, a2 * n2)
  return {
    verticalLineContentWidth: Math.max(r2, i2 * n2),
    horizontalLineContentHeight: o2,
  }
}
function H_(e52) {
  switch (e52) {
    case `top`:
      return 0
    case `center`:
      return 0.5
    default:
      return 1
  }
}
function U_(e52, t2, n2, r2) {
  if (e52?.rect) return e52
  let i2 = t2[n2.fontStack]?.[r2]
  return i2 ? {rect: null, metrics: i2.metrics} : null
}
function W_(e52, t2, n2) {
  return !(e52 === 1 || (!t2 && !Dc(n2)) || (t2 && (Nc(n2) || Bc(n2))))
}
function G_(e52) {
  return /\p{Nd}/u.test(String.fromCodePoint(e52))
}
function K_(e52) {
  return /\p{Lu}/u.test(String.fromCodePoint(e52))
}
function q_(e52) {
  return /[\p{P}\p{S}]/u.test(String.fromCodePoint(e52))
}
function J_(e52) {
  let t2 = e52.some(G_) && e52.every(e53 => G_(e53) || q_(e53)),
    n2 = e52.length <= 3 && e52.every(e53 => K_(e53) || G_(e53))
  return t2 || n2
}
function Y_(e52) {
  return (G_(e52) || K_(e52)) && !Bc(e52)
}
function X_(e52, t2) {
  let n2 = false
  for (let r2 = 0; r2 < e52.length; r2++) {
    if (t2[r2]) continue
    let i2 = Wg[e52[r2]]
    i2 &&
      (r2 === 0 || t2[r2 - 1]) &&
      (r2 === e52.length - 1 || t2[r2 + 1]) &&
      ((e52[r2] = i2), (t2[r2] = true), (n2 = true))
  }
  return n2
}
function Z_(e52) {
  let t2 = e52.graphemes().slice(),
    n2 = t2.map(e53 => e53.codePointAt(0)),
    r2 = n2.map(Dc),
    i2 = t3 => !r2[t3] && !Nc(n2[t3]) && !(`imageName` in e52.getSection(t3))
  for (let e53 = 0; e53 < n2.length; e53++) {
    if (!i2(e53)) continue
    let t3 = e53
    for (; t3 + 1 < n2.length && i2(t3 + 1);) t3++
    if (J_(n2.slice(e53, t3 + 1)))
      for (let i3 = e53; i3 <= t3; i3++) r2[i3] = Y_(n2[i3])
    e53 = t3
  }
  return (X_(t2, r2) && ((e52.text = t2.join(``)), (e52._graphemes = null)), r2)
}
function Q_(e52, t2, n2, r2, i2, a2, o2, s2, c2, l2, u2, d2) {
  let f2 = 0,
    p2 = 0,
    m2 = 0,
    h2 = 0,
    g2 = s2 === `right` ? 1 : s2 === `left` ? 0 : 0.5,
    _2 = 24 / d2,
    v2 = 0
  for (let o3 of i2) {
    o3.trim()
    let i3 = o3.getMaxScale(),
      s3 = {positionedGlyphs: [], lineOffset: 0}
    e52.positionedLines[v2] = s3
    let d3 = s3.positionedGlyphs,
      y3 = 0
    if (!o3.length()) {
      ;((p2 += a2), ++v2)
      continue
    }
    let b3 = V_(r2, o3, _2),
      x2 = c2 === 2 && !u2 ? Z_(o3) : null,
      S2 = o3.graphemes()
    for (let a3 = 0; a3 < S2.length; a3++) {
      let s4 = o3.getSection(a3),
        m3 = S2[a3],
        h3 = m3.codePointAt(0),
        g3 = x2 ? x2[a3] : W_(c2, u2, h3),
        v3 =
          `fontStack` in s4 && Ug(m3) && !t2[s4.fontStack]?.[m3]
            ? [...m3]
            : [m3]
      for (let c3 of v3) {
        let u3 = {
            glyph: c3.codePointAt(0),
            grapheme: c3,
            imageName: null,
            x: f2,
            y: p2 + -17,
            vertical: g3,
            scale: 1,
            fontStack: ``,
            sectionIndex: o3.getSectionIndex(a3),
            metrics: null,
            rect: null,
          },
          m4
        if (`fontStack` in s4) {
          if (((m4 = $_(s4, c3, g3, b3, t2, n2)), !m4)) continue
          u3.fontStack = s4.fontStack
        } else {
          if (
            ((e52.iconsInText = true),
            (s4.scale *= _2),
            (m4 = ev(s4, g3, i3, b3, r2)),
            !m4)
          )
            continue
          ;((y3 = Math.max(y3, m4.imageOffset)), (u3.imageName = s4.imageName))
        }
        let {rect: h4, metrics: v4, baselineOffset: x3} = m4
        if (
          ((u3.y += x3),
          (u3.scale = s4.scale),
          (u3.metrics = v4),
          (u3.rect = h4),
          d3.push(u3),
          !g3)
        )
          f2 += v4.advance * s4.scale + l2
        else {
          e52.verticalizable = true
          let t3 = `imageName` in s4 ? v4.advance : 24
          f2 += t3 * s4.scale + l2
        }
      }
    }
    if (d3.length !== 0) {
      let e53 = f2 - l2
      ;((m2 = Math.max(e53, m2)), tv(d3, 0, d3.length - 1, g2))
    }
    f2 = 0
    let C2 = (i3 - 1) * 24
    s3.lineOffset = Math.max(y3, C2)
    let w2 = a2 * i3 + y3
    ;((p2 += w2), (h2 = Math.max(w2, h2)), ++v2)
  }
  let {horizontalAlign: y2, verticalAlign: b2} = B_(o2)
  ;(nv(e52.positionedLines, g2, y2, b2, m2, h2, a2, p2, i2.length),
    (e52.top += -b2 * p2),
    (e52.bottom = e52.top + p2),
    (e52.left += -y2 * m2),
    (e52.right = e52.left + m2))
}
function $_(e52, t2, n2, r2, i2, a2) {
  let o2 = a2[e52.fontStack]?.[t2],
    s2 = U_(o2, i2, e52, t2)
  if (s2 === null) return null
  let c2
  if (n2) c2 = r2.verticalLineContentWidth - e52.scale * 24
  else {
    let t3 = H_(e52.verticalAlign)
    c2 = (r2.horizontalLineContentHeight - e52.scale * 24) * t3
  }
  return {rect: s2.rect, metrics: s2.metrics, baselineOffset: c2}
}
function ev(e52, t2, n2, r2, i2) {
  let a2 = i2[e52.imageName]
  if (!a2) return null
  let o2 = a2.paddedRect,
    s2 = a2.displaySize,
    c2 = {
      width: s2[0],
      height: s2[1],
      left: 1,
      top: -3,
      advance: t2 ? s2[1] : s2[0],
    },
    l2
  if (t2) l2 = r2.verticalLineContentWidth - s2[1] * e52.scale
  else {
    let t3 = H_(e52.verticalAlign)
    l2 = (r2.horizontalLineContentHeight - s2[1] * e52.scale) * t3
  }
  let u2 = (t2 ? s2[0] : s2[1]) * e52.scale - 24 * n2
  return {rect: o2, metrics: c2, baselineOffset: l2, imageOffset: u2}
}
function tv(e52, t2, n2, r2) {
  if (r2 === 0) return
  let i2 = e52[n2],
    a2 = i2.metrics.advance * i2.scale,
    o2 = (e52[n2].x + a2) * r2
  for (let r3 = t2; r3 <= n2; r3++) e52[r3].x -= o2
}
function nv(e52, t2, n2, r2, i2, a2, o2, s2, c2) {
  let l2 = (t2 - n2) * i2,
    u2 = 0
  u2 = a2 === o2 ? -r2 * c2 * o2 + 0.5 * o2 : -s2 * r2 - -17
  for (let t3 of e52)
    for (let e53 of t3.positionedGlyphs) ((e53.x += l2), (e53.y += u2))
}
function rv(e52, t2, n2) {
  let {horizontalAlign: r2, verticalAlign: i2} = B_(n2),
    a2 = t2[0],
    o2 = t2[1],
    s2 = a2 - e52.displaySize[0] * r2,
    c2 = s2 + e52.displaySize[0],
    l2 = o2 - e52.displaySize[1] * i2
  return {
    image: e52,
    top: l2,
    bottom: l2 + e52.displaySize[1],
    left: s2,
    right: c2,
  }
}
function iv(e52) {
  let t2 = e52.left,
    n2 = e52.top,
    r2 = e52.right - t2,
    i2 = e52.bottom - n2,
    a2 = e52.image.content[2] - e52.image.content[0],
    o2 = e52.image.content[3] - e52.image.content[1],
    s2 = e52.image.textFitWidth ?? `stretchOrShrink`,
    c2 = e52.image.textFitHeight ?? `stretchOrShrink`,
    l2 = a2 / o2
  if (c2 === `proportional`) {
    if ((s2 === `stretchOnly` && r2 / i2 < l2) || s2 === `proportional`) {
      let e53 = Math.ceil(i2 * l2)
      ;((t2 *= e53 / r2), (r2 = e53))
    }
  } else if (
    s2 === `proportional` &&
    c2 === `stretchOnly` &&
    l2 !== 0 &&
    r2 / i2 > l2
  ) {
    let e53 = Math.ceil(r2 / l2)
    ;((n2 *= e53 / i2), (i2 = e53))
  }
  return {x1: t2, y1: n2, x2: t2 + r2, y2: n2 + i2}
}
function av(e52, t2, n2, r2, i2, a2) {
  let o2 = e52.image,
    s2
  if (o2.content) {
    let e53 = o2.content,
      t3 = o2.pixelRatio || 1
    s2 = [
      e53[0] / t3,
      e53[1] / t3,
      o2.displaySize[0] - e53[2] / t3,
      o2.displaySize[1] - e53[3] / t3,
    ]
  }
  let c2 = t2.left * a2,
    l2 = t2.right * a2,
    u2,
    d2,
    f2,
    p2
  n2 === `width` || n2 === `both`
    ? ((p2 = i2[0] + c2 - r2[3]), (d2 = i2[0] + l2 + r2[1]))
    : ((p2 = i2[0] + (c2 + l2 - o2.displaySize[0]) / 2),
      (d2 = p2 + o2.displaySize[0]))
  let m2 = t2.top * a2,
    h2 = t2.bottom * a2
  return (
    n2 === `height` || n2 === `both`
      ? ((u2 = i2[1] + m2 - r2[0]), (f2 = i2[1] + h2 + r2[2]))
      : ((u2 = i2[1] + (m2 + h2 - o2.displaySize[1]) / 2),
        (f2 = u2 + o2.displaySize[1])),
    {image: o2, top: u2, right: d2, bottom: f2, left: p2, collisionPadding: s2}
  )
}
const ov = 32640
function sv(e52, t2) {
  let {expression: n2} = t2
  if (n2.kind === `constant`)
    return {kind: `constant`, layoutSize: n2.evaluate(new U(e52 + 1))}
  if (n2.kind === `source`) return {kind: `source`}
  if (n2.kind === `composite`) {
    let {minZoom: t3, maxZoom: r2} = cv(n2.zoomStops, e52)
    return {
      kind: `composite`,
      minZoom: t3,
      maxZoom: r2,
      interpolationType: n2.interpolationType,
    }
  }
  {
    let t3 = lv(n2),
      r2 = n2.evaluate(new U(e52 + 1))
    return {
      kind: `camera`,
      zoomStops: n2.zoomStops,
      sizes: t3,
      layoutSize: r2,
      interpolationType: n2.interpolationType,
    }
  }
}
function cv(e52, t2) {
  let n2 = 0
  for (; n2 < e52.length && e52[n2] <= t2;) n2++
  n2 = Math.max(0, n2 - 1)
  let r2 = n2
  for (; r2 < e52.length && e52[r2] < t2 + 1;) r2++
  return (
    (r2 = Math.min(e52.length - 1, r2)), {minZoom: e52[n2], maxZoom: e52[r2]}
  )
}
function lv(e52) {
  return e52.zoomStops.map(t2 =>
    e52.evaluate(new U(t2 === -1 / 0 ? e52.zoomStops[1] - 1 : t2))
  )
}
function uv(e52, {uSize: t2, uSizeT: n2}, {lowerSize: r2, upperSize: i2}) {
  return e52.kind === `source`
    ? r2 / 128
    : e52.kind === `composite`
      ? ti.number(r2 / 128, i2 / 128, n2)
      : t2
}
function dv(e52, t2) {
  let n2 = 0,
    r2 = 0
  return (
    e52.kind === `constant`
      ? (r2 = e52.layoutSize)
      : e52.kind === `camera`
        ? (r2 = fv(e52, t2))
        : e52.kind === `composite` && (n2 = pv(e52, t2)),
    {uSizeT: n2, uSize: r2}
  )
}
function fv(
  {zoomStops: e52, sizes: t2, layoutSize: n2, interpolationType: r2},
  i2
) {
  let a2 = e52.length - 1
  for (; a2 > 0 && e52[a2] > i2;) a2--
  let o2 = Math.min(a2 + 1, e52.length - 1),
    s2 = r2 ? bt($r.interpolationFactor(r2, i2, e52[a2], e52[o2]), 0, 1) : 0
  return Math.min(ti.number(t2[a2], t2[o2], s2), n2)
}
function pv({interpolationType: e52, minZoom: t2, maxZoom: n2}, r2) {
  return e52 ? bt($r.interpolationFactor(e52, r2, t2, n2), 0, 1) : 0
}
function mv(e52, t2, n2) {
  let r2 = `never`,
    i2 = e52.get(t2)
  return (i2 ? (r2 = i2) : e52.get(n2) && (r2 = `always`), r2)
}
const hv = [{name: `a_fade_opacity`, components: 1, type: `Uint8`, offset: 0}]
function gv(e52, t2, n2, r2, i2, a2, o2, s2, c2, l2, u2, d2, f2, p2) {
  let m2 = s2 ? Math.min(ov, Math.round(s2[0])) : 0,
    h2 = s2 ? Math.min(ov, Math.round(s2[1])) : 0
  e52.emplaceBack(
    t2,
    n2,
    Math.round(r2 * 32),
    Math.round(i2 * 32),
    a2,
    o2,
    (m2 << 1) + +!!c2,
    h2,
    l2 * 16,
    u2 * 16,
    d2 * 256,
    f2 * 256,
    p2
  )
}
function _v(e52, t2, n2) {
  ;(e52.emplaceBack(t2.x, t2.y, n2),
    e52.emplaceBack(t2.x, t2.y, n2),
    e52.emplaceBack(t2.x, t2.y, n2),
    e52.emplaceBack(t2.x, t2.y, n2))
}
function vv(e52) {
  for (let t2 of e52.sections) if (Wc(t2.text)) return true
  return false
}
var yv = class {
  constructor(e52) {
    ;((this.layoutVertexArray = new pu()),
      (this.indexArray = new bu()),
      (this.programConfigurations = e52),
      (this.segments = new Tu()),
      (this.dynamicLayoutVertexArray = new mu()),
      (this.opacityVertexArray = new hu()),
      (this.hasVisibleVertices = false),
      (this.placedSymbolArray = new Jl()))
  }
  isEmpty() {
    return (
      this.layoutVertexArray.length === 0 &&
      this.indexArray.length === 0 &&
      this.dynamicLayoutVertexArray.length === 0 &&
      this.opacityVertexArray.length === 0
    )
  }
  upload(e52, t2, n2, r2) {
    this.isEmpty() ||
      (n2 &&
        ((this.layoutVertexBuffer = e52.createVertexBuffer(
          this.layoutVertexArray,
          Ag.members
        )),
        (this.indexBuffer = e52.createIndexBuffer(this.indexArray, t2)),
        (this.dynamicLayoutVertexBuffer = e52.createVertexBuffer(
          this.dynamicLayoutVertexArray,
          jg.members,
          true
        )),
        (this.opacityVertexBuffer = e52.createVertexBuffer(
          this.opacityVertexArray,
          hv,
          true
        )),
        (this.opacityVertexBuffer.itemSize = 1)),
      (n2 || r2) && this.programConfigurations.upload(e52))
  }
  destroy() {
    this.layoutVertexBuffer &&
      (this.layoutVertexBuffer.destroy(),
      this.indexBuffer.destroy(),
      this.programConfigurations.destroy(),
      this.segments.destroy(),
      this.dynamicLayoutVertexBuffer.destroy(),
      this.opacityVertexBuffer.destroy())
  }
}
H(`SymbolBuffers`, yv)
var bv = class {
  constructor(e52, t2, n2) {
    ;((this.layoutVertexArray = new e52()),
      (this.layoutAttributes = t2),
      (this.indexArray = new n2()),
      (this.segments = new Tu()),
      (this.collisionVertexArray = new vu()))
  }
  upload(e52) {
    ;((this.layoutVertexBuffer = e52.createVertexBuffer(
      this.layoutVertexArray,
      this.layoutAttributes
    )),
      (this.indexBuffer = e52.createIndexBuffer(this.indexArray)),
      (this.collisionVertexBuffer = e52.createVertexBuffer(
        this.collisionVertexArray,
        Mg.members,
        true
      )))
  }
  destroy() {
    this.layoutVertexBuffer &&
      (this.layoutVertexBuffer.destroy(),
      this.indexBuffer.destroy(),
      this.segments.destroy(),
      this.collisionVertexBuffer.destroy())
  }
}
H(`CollisionBuffers`, bv)
var xv = class {
  constructor(e52) {
    ;((this.collisionBoxArray = e52.collisionBoxArray),
      (this.zoom = e52.zoom),
      (this.overscaling = e52.overscaling),
      (this.layers = e52.layers),
      (this.layerIds = this.layers.map(e53 => e53.id)),
      (this.index = e52.index),
      (this.pixelRatio = e52.pixelRatio),
      (this.sourceLayerIndex = e52.sourceLayerIndex),
      (this.hasDependencies = false),
      (this.hasRTLText = false),
      (this.sortKeyRanges = []),
      (this.collisionCircleArray = []))
    let t2 = this.layers[0]._unevaluatedLayout._values
    ;((this.textSizeData = sv(this.zoom, t2[`text-size`])),
      (this.iconSizeData = sv(this.zoom, t2[`icon-size`])))
    let n2 = this.layers[0].layout,
      r2 = n2.get(`symbol-sort-key`),
      i2 = n2.get(`symbol-z-order`)
    ;((this.canOverlap =
      mv(n2, `text-overlap`, `text-allow-overlap`) !== `never` ||
      mv(n2, `icon-overlap`, `icon-allow-overlap`) !== `never` ||
      n2.get(`text-ignore-placement`) ||
      n2.get(`icon-ignore-placement`)),
      (this.sortFeaturesByKey = i2 !== `viewport-y` && !r2.isConstant()))
    let a2 = i2 === `viewport-y` || (i2 === `auto` && !this.sortFeaturesByKey)
    ;((this.sortFeaturesByY = a2 && this.canOverlap),
      n2.get(`symbol-placement`) === `point` &&
        (this.writingModes = n2.get(`text-writing-mode`).map(e53 => M_[e53])),
      (this.stateDependentLayerIds = this.layers
        .filter(e53 => e53.isStateDependent())
        .map(e53 => e53.id)),
      (this.sourceID = e52.sourceID))
  }
  createArrays() {
    ;((this.text = new yv(
      new nd(this.layers, this.zoom, e52 => e52.startsWith(`text`))
    )),
      (this.icon = new yv(
        new nd(this.layers, this.zoom, e52 => e52.startsWith(`icon`))
      )),
      (this.glyphOffsetArray = new Zl()),
      (this.lineVertexArray = new Ql()),
      (this.symbolInstances = new Xl()),
      (this.textAnchorOffsets = new eu()))
  }
  calculateGlyphDependencies(e52, t2, n2, r2, i2) {
    let a2 = (r2 || this.allowVerticalPlacement) && i2,
      o2 = e_.fromFeature(e52, n2),
      s2 = o2.graphemes()
    for (let e53 = 0; e53 < s2.length; e53++) {
      let n3 = o2.getSection(e53)
      if (`imageName` in n3) continue
      let r3 = (t2[n3.fontStack] ||= {}),
        i3 = s2[e53]
      Ug(i3) && (r3[i3] = true)
      for (let e54 of i3) {
        if (((r3[e54] = true), !a2)) continue
        let t3 = Wg[e54]
        t3 && (r3[t3] = true)
      }
    }
  }
  populate(e52, t2, n2) {
    let r2 = this.layers[0],
      i2 = r2.layout,
      a2 = i2.get(`text-font`),
      o2 = i2.get(`text-field`),
      s2 = i2.get(`icon-image`),
      c2 =
        (o2.value.kind !== `constant` ||
          (o2.value.value instanceof Pr && !o2.value.value.isEmpty()) ||
          o2.value.value.toString().length > 0) &&
        (a2.value.kind !== `constant` || a2.value.value.length > 0),
      l2 =
        s2.value.kind !== `constant` ||
        !!s2.value.value ||
        Object.keys(s2.parameters).length > 0,
      u2 = i2.get(`symbol-sort-key`)
    if (((this.features = []), !c2 && !l2)) return
    let d2 = t2.iconDependencies,
      f2 = t2.glyphDependencies,
      p2 = t2.availableImages,
      m2 = new U(this.zoom)
    for (let {feature: t3, id: o3, index: s3, sourceLayerIndex: h2} of e52) {
      let e53 = r2._featureFilter.needGeometry,
        g2 = ld(t3, e53)
      if (!r2._featureFilter.filter(m2, g2, n2)) continue
      e53 || (g2.geometry = cd(t3))
      let _2
      if (c2) {
        let e54 = r2.getValueAndResolveTokens(`text-field`, g2, n2, p2),
          t4 = Pr.factory(e54)
        ;((this.hasRTLText ||= vv(t4)),
          (!this.hasRTLText ||
            Kc.getRTLTextPluginStatus() === `unavailable` ||
            (this.hasRTLText && Kc.isParsed())) &&
            (_2 = Ig(t4, r2, g2)))
      }
      let v2
      if (l2) {
        let e54 = r2.getValueAndResolveTokens(`icon-image`, g2, n2, p2)
        v2 = e54 instanceof Br ? e54 : Br.fromString(e54)
      }
      if (!_2 && !v2) continue
      let y2 = this.sortFeaturesByKey ? u2.evaluate(g2, {}, n2) : void 0,
        b2 = {
          id: o3,
          text: _2,
          icon: v2,
          index: s3,
          sourceLayerIndex: h2,
          geometry: g2.geometry,
          properties: t3.properties,
          type: Jp.types[t3.type],
          sortKey: y2,
        }
      if ((this.features.push(b2), v2 && (d2[v2.name] = true), _2)) {
        let e54 = a2.evaluate(g2, {}, n2).join(`,`),
          t4 =
            i2.get(`text-rotation-alignment`) !== `viewport` &&
            i2.get(`symbol-placement`) !== `point`
        this.allowVerticalPlacement = this.writingModes?.includes(2)
        let r3 = Pc(_2.toString())
        this.calculateGlyphDependencies(_2, f2, e54, t4, r3)
        for (let e55 of _2.sections) e55.image && (d2[e55.image.name] = true)
      }
    }
    ;(i2.get(`symbol-placement`) === `line` &&
      (this.features = Lg(this.features)),
      this.sortFeaturesByKey &&
        this.features.sort((e53, t3) => e53.sortKey - t3.sortKey))
  }
  update(e52, t2, n2) {
    this.stateDependentLayers.length &&
      (this.text.programConfigurations.updatePaintArrays(e52, t2, this.layers, {
        imagePositions: n2,
      }),
      this.icon.programConfigurations.updatePaintArrays(e52, t2, this.layers, {
        imagePositions: n2,
      }))
  }
  isEmpty() {
    return this.symbolInstances.length === 0 && !this.hasRTLText
  }
  uploadPending() {
    return (
      !this.uploaded ||
      this.text.programConfigurations.needsUpload ||
      this.icon.programConfigurations.needsUpload
    )
  }
  upload(e52) {
    ;(!this.uploaded &&
      this.hasDebugData() &&
      (this.textCollisionBox.upload(e52), this.iconCollisionBox.upload(e52)),
      this.text.upload(
        e52,
        this.sortFeaturesByY,
        !this.uploaded,
        this.text.programConfigurations.needsUpload
      ),
      this.icon.upload(
        e52,
        this.sortFeaturesByY,
        !this.uploaded,
        this.icon.programConfigurations.needsUpload
      ),
      (this.uploaded = true))
  }
  destroyDebugData() {
    ;(this.textCollisionBox.destroy(), this.iconCollisionBox.destroy())
  }
  destroy() {
    ;(this.text.destroy(),
      this.icon.destroy(),
      this.hasDebugData() && this.destroyDebugData())
  }
  addToLineVertexArray(e52, t2) {
    let n2 = this.lineVertexArray.length
    if (e52.segment !== void 0) {
      let n3 = e52.dist(t2[e52.segment + 1]),
        r2 = e52.dist(t2[e52.segment]),
        i2 = {}
      for (let r3 = e52.segment + 1; r3 < t2.length; r3++)
        ((i2[r3] = {x: t2[r3].x, y: t2[r3].y, tileUnitDistanceFromAnchor: n3}),
          r3 < t2.length - 1 && (n3 += t2[r3 + 1].dist(t2[r3])))
      for (let n4 = e52.segment || 0; n4 >= 0; n4--)
        ((i2[n4] = {x: t2[n4].x, y: t2[n4].y, tileUnitDistanceFromAnchor: r2}),
          n4 > 0 && (r2 += t2[n4 - 1].dist(t2[n4])))
      for (let e53 = 0; e53 < t2.length; e53++) {
        let t3 = i2[e53]
        this.lineVertexArray.emplaceBack(
          t3.x,
          t3.y,
          t3.tileUnitDistanceFromAnchor
        )
      }
    }
    return {lineStartIndex: n2, lineLength: this.lineVertexArray.length - n2}
  }
  addSymbols(e52, t2, n2, r2, i2, a2, o2, s2, c2, l2, u2, d2, f2) {
    let p2 = e52.indexArray,
      m2 = e52.layoutVertexArray,
      h2 = e52.segments.prepareSegment(
        4 * t2.length,
        m2,
        p2,
        this.canOverlap ? a2.sortKey : void 0
      ),
      g2 = this.glyphOffsetArray.length,
      _2 = h2.vertexLength,
      v2 = this.allowVerticalPlacement && o2 === 2 ? Math.PI / 2 : 0,
      y2 = a2.text && a2.text.sections
    for (let r3 = 0; r3 < t2.length; r3++) {
      let {
          tl: i3,
          tr: o3,
          bl: c3,
          br: l3,
          tex: u3,
          pixelOffsetTL: g3,
          pixelOffsetBR: _3,
          minFontScaleX: b2,
          minFontScaleY: x2,
          glyphOffset: S2,
          isSDF: C2,
          sectionIndex: w2,
        } = t2[r3],
        T2 = h2.vertexLength,
        E2 = S2[1]
      ;(gv(
        m2,
        s2.x,
        s2.y,
        i3.x,
        E2 + i3.y,
        u3.x,
        u3.y,
        n2,
        C2,
        g3.x,
        g3.y,
        b2,
        x2,
        f2
      ),
        gv(
          m2,
          s2.x,
          s2.y,
          o3.x,
          E2 + o3.y,
          u3.x + u3.w,
          u3.y,
          n2,
          C2,
          _3.x,
          g3.y,
          b2,
          x2,
          f2
        ),
        gv(
          m2,
          s2.x,
          s2.y,
          c3.x,
          E2 + c3.y,
          u3.x,
          u3.y + u3.h,
          n2,
          C2,
          g3.x,
          _3.y,
          b2,
          x2,
          f2
        ),
        gv(
          m2,
          s2.x,
          s2.y,
          l3.x,
          E2 + l3.y,
          u3.x + u3.w,
          u3.y + u3.h,
          n2,
          C2,
          _3.x,
          _3.y,
          b2,
          x2,
          f2
        ),
        _v(e52.dynamicLayoutVertexArray, s2, v2),
        p2.emplaceBack(T2, T2 + 2, T2 + 1),
        p2.emplaceBack(T2 + 1, T2 + 2, T2 + 3),
        (h2.vertexLength += 4),
        (h2.primitiveLength += 2),
        this.glyphOffsetArray.emplaceBack(S2[0]),
        (r3 === t2.length - 1 || w2 !== t2[r3 + 1].sectionIndex) &&
          e52.programConfigurations.populatePaintArrays(
            m2.length,
            a2,
            a2.index,
            {imagePositions: {}, canonical: d2, formattedSection: y2?.[w2]}
          ))
    }
    e52.placedSymbolArray.emplaceBack(
      s2.x,
      s2.y,
      g2,
      this.glyphOffsetArray.length - g2,
      _2,
      c2,
      l2,
      s2.segment,
      n2 ? n2[0] : 0,
      n2 ? n2[1] : 0,
      r2[0],
      r2[1],
      o2,
      0,
      false,
      0,
      u2,
      f2
    )
  }
  _addCollisionDebugVertex(e52, t2, n2, r2, i2, a2) {
    return (
      t2.emplaceBack(0, 0),
      e52.emplaceBack(n2.x, n2.y, r2, i2, Math.round(a2.x), Math.round(a2.y))
    )
  }
  addCollisionDebugVertices(e52, t2, n2, r2, i2, a2, o2) {
    let s2 = i2.segments.prepareSegment(4, i2.layoutVertexArray, i2.indexArray),
      c2 = s2.vertexLength,
      u2 = i2.layoutVertexArray,
      d2 = i2.collisionVertexArray,
      f2 = o2.anchorX,
      p2 = o2.anchorY
    ;(this._addCollisionDebugVertex(u2, d2, a2, f2, p2, new l(e52, t2)),
      this._addCollisionDebugVertex(u2, d2, a2, f2, p2, new l(n2, t2)),
      this._addCollisionDebugVertex(u2, d2, a2, f2, p2, new l(n2, r2)),
      this._addCollisionDebugVertex(u2, d2, a2, f2, p2, new l(e52, r2)),
      (s2.vertexLength += 4))
    let m2 = i2.indexArray
    ;(m2.emplaceBack(c2, c2 + 1),
      m2.emplaceBack(c2 + 1, c2 + 2),
      m2.emplaceBack(c2 + 2, c2 + 3),
      m2.emplaceBack(c2 + 3, c2),
      (s2.primitiveLength += 4))
  }
  addDebugCollisionBoxes(e52, t2, n2, r2) {
    for (let i2 = e52; i2 < t2; i2++) {
      let e53 = this.collisionBoxArray.get(i2),
        t3 = e53.x1,
        a2 = e53.y1,
        o2 = e53.x2,
        s2 = e53.y2
      this.addCollisionDebugVertices(
        t3,
        a2,
        o2,
        s2,
        r2 ? this.textCollisionBox : this.iconCollisionBox,
        e53.anchorPoint,
        n2
      )
    }
  }
  generateCollisionDebugBuffers() {
    ;(this.hasDebugData() && this.destroyDebugData(),
      (this.textCollisionBox = new bv(gu, Ng.members, xu)),
      (this.iconCollisionBox = new bv(gu, Ng.members, xu)))
    for (let e52 = 0; e52 < this.symbolInstances.length; e52++) {
      let t2 = this.symbolInstances.get(e52)
      ;(this.addDebugCollisionBoxes(
        t2.textBoxStartIndex,
        t2.textBoxEndIndex,
        t2,
        true
      ),
        this.addDebugCollisionBoxes(
          t2.verticalTextBoxStartIndex,
          t2.verticalTextBoxEndIndex,
          t2,
          true
        ),
        this.addDebugCollisionBoxes(
          t2.iconBoxStartIndex,
          t2.iconBoxEndIndex,
          t2,
          false
        ),
        this.addDebugCollisionBoxes(
          t2.verticalIconBoxStartIndex,
          t2.verticalIconBoxEndIndex,
          t2,
          false
        ))
    }
  }
  _deserializeCollisionBoxesForSymbol(e52, t2, n2, r2, i2, a2, o2, s2, c2) {
    let l2 = {}
    for (let r3 = t2; r3 < n2; r3++) {
      let t3 = e52.get(r3)
      ;((l2.textBox = {
        x1: t3.x1,
        y1: t3.y1,
        x2: t3.x2,
        y2: t3.y2,
        anchorPointX: t3.anchorPointX,
        anchorPointY: t3.anchorPointY,
      }),
        (l2.textFeatureIndex = t3.featureIndex))
      break
    }
    for (let t3 = r2; t3 < i2; t3++) {
      let n3 = e52.get(t3)
      ;((l2.verticalTextBox = {
        x1: n3.x1,
        y1: n3.y1,
        x2: n3.x2,
        y2: n3.y2,
        anchorPointX: n3.anchorPointX,
        anchorPointY: n3.anchorPointY,
      }),
        (l2.verticalTextFeatureIndex = n3.featureIndex))
      break
    }
    for (let t3 = a2; t3 < o2; t3++) {
      let n3 = e52.get(t3)
      ;((l2.iconBox = {
        x1: n3.x1,
        y1: n3.y1,
        x2: n3.x2,
        y2: n3.y2,
        anchorPointX: n3.anchorPointX,
        anchorPointY: n3.anchorPointY,
      }),
        (l2.iconFeatureIndex = n3.featureIndex))
      break
    }
    for (let t3 = s2; t3 < c2; t3++) {
      let n3 = e52.get(t3)
      ;((l2.verticalIconBox = {
        x1: n3.x1,
        y1: n3.y1,
        x2: n3.x2,
        y2: n3.y2,
        anchorPointX: n3.anchorPointX,
        anchorPointY: n3.anchorPointY,
      }),
        (l2.verticalIconFeatureIndex = n3.featureIndex))
      break
    }
    return l2
  }
  deserializeCollisionBoxes(e52) {
    this.collisionArrays = []
    for (let t2 = 0; t2 < this.symbolInstances.length; t2++) {
      let n2 = this.symbolInstances.get(t2)
      this.collisionArrays.push(
        this._deserializeCollisionBoxesForSymbol(
          e52,
          n2.textBoxStartIndex,
          n2.textBoxEndIndex,
          n2.verticalTextBoxStartIndex,
          n2.verticalTextBoxEndIndex,
          n2.iconBoxStartIndex,
          n2.iconBoxEndIndex,
          n2.verticalIconBoxStartIndex,
          n2.verticalIconBoxEndIndex
        )
      )
    }
  }
  hasTextData() {
    return this.text.segments.get().length > 0
  }
  hasIconData() {
    return this.icon.segments.get().length > 0
  }
  hasDebugData() {
    return this.textCollisionBox && this.iconCollisionBox
  }
  hasTextCollisionBoxData() {
    return (
      this.hasDebugData() && this.textCollisionBox.segments.get().length > 0
    )
  }
  hasIconCollisionBoxData() {
    return (
      this.hasDebugData() && this.iconCollisionBox.segments.get().length > 0
    )
  }
  addIndicesForPlacedSymbol(e52, t2) {
    let n2 = e52.placedSymbolArray.get(t2),
      r2 = n2.vertexStartIndex + n2.numGlyphs * 4
    for (let t3 = n2.vertexStartIndex; t3 < r2; t3 += 4)
      (e52.indexArray.emplaceBack(t3, t3 + 2, t3 + 1),
        e52.indexArray.emplaceBack(t3 + 1, t3 + 2, t3 + 3))
  }
  getSortedSymbolIndexes(e52) {
    if (this.sortedAngle === e52 && this.symbolInstanceIndexes !== void 0)
      return this.symbolInstanceIndexes
    let t2 = Math.sin(e52),
      n2 = Math.cos(e52),
      r2 = [],
      i2 = [],
      a2 = []
    for (let e53 = 0; e53 < this.symbolInstances.length; ++e53) {
      a2.push(e53)
      let o2 = this.symbolInstances.get(e53)
      ;(r2.push(Math.round(t2 * o2.anchorX + n2 * o2.anchorY) | 0),
        i2.push(o2.featureIndex))
    }
    return (a2.sort((e53, t3) => r2[e53] - r2[t3] || i2[t3] - i2[e53]), a2)
  }
  addToSortKeyRanges(e52, t2) {
    let n2 = this.sortKeyRanges[this.sortKeyRanges.length - 1]
    n2?.sortKey === t2
      ? (n2.symbolInstanceEnd = e52 + 1)
      : this.sortKeyRanges.push({
          sortKey: t2,
          symbolInstanceStart: e52,
          symbolInstanceEnd: e52 + 1,
        })
  }
  sortFeatures(e52) {
    if (
      this.sortFeaturesByY &&
      this.sortedAngle !== e52 &&
      !(
        this.text.segments.get().length > 1 ||
        this.icon.segments.get().length > 1
      )
    ) {
      ;((this.symbolInstanceIndexes = this.getSortedSymbolIndexes(e52)),
        (this.sortedAngle = e52),
        this.text.indexArray.clear(),
        this.icon.indexArray.clear(),
        (this.featureSortOrder = []))
      for (let e53 of this.symbolInstanceIndexes) {
        let t2 = this.symbolInstances.get(e53)
        this.featureSortOrder.push(t2.featureIndex)
        let n2 = [
          t2.rightJustifiedTextSymbolIndex,
          t2.centerJustifiedTextSymbolIndex,
          t2.leftJustifiedTextSymbolIndex,
        ]
        for (let e54 = 0; e54 < n2.length; e54++) {
          let t3 = n2[e54]
          t3 >= 0 &&
            n2.indexOf(t3) === e54 &&
            this.addIndicesForPlacedSymbol(this.text, t3)
        }
        ;(t2.verticalPlacedTextSymbolIndex >= 0 &&
          this.addIndicesForPlacedSymbol(
            this.text,
            t2.verticalPlacedTextSymbolIndex
          ),
          t2.placedIconSymbolIndex >= 0 &&
            this.addIndicesForPlacedSymbol(this.icon, t2.placedIconSymbolIndex),
          t2.verticalPlacedIconSymbolIndex >= 0 &&
            this.addIndicesForPlacedSymbol(
              this.icon,
              t2.verticalPlacedIconSymbolIndex
            ))
      }
      ;(this.text.indexBuffer &&
        this.text.indexBuffer.updateData(this.text.indexArray),
        this.icon.indexBuffer &&
          this.icon.indexBuffer.updateData(this.icon.indexArray))
    }
  }
}
;(H(`SymbolBucket`, xv, {
  omit: [`layers`, `collisionBoxArray`, `features`, `compareText`],
}),
  (xv.MAX_GLYPHS = 65535),
  (xv.addDynamicAttributes = _v))
function Sv(e52, t2) {
  return t2.replace(/{([^{}]+)}/g, (t3, n2) =>
    e52 && n2 in e52 ? String(e52[n2]) : ``
  )
}
let Cv
const wv = () =>
  (Cv ||= new cl({
    "symbol-placement": new W(
      M.layout_symbol[`symbol-placement`],
      `symbol-placement`
    ),
    "symbol-spacing": new W(
      M.layout_symbol[`symbol-spacing`],
      `symbol-spacing`
    ),
    "symbol-avoid-edges": new W(
      M.layout_symbol[`symbol-avoid-edges`],
      `symbol-avoid-edges`
    ),
    "symbol-sort-key": new G(
      M.layout_symbol[`symbol-sort-key`],
      `symbol-sort-key`
    ),
    "symbol-z-order": new W(
      M.layout_symbol[`symbol-z-order`],
      `symbol-z-order`
    ),
    "icon-allow-overlap": new W(
      M.layout_symbol[`icon-allow-overlap`],
      `icon-allow-overlap`
    ),
    "icon-overlap": new W(M.layout_symbol[`icon-overlap`], `icon-overlap`),
    "icon-ignore-placement": new W(
      M.layout_symbol[`icon-ignore-placement`],
      `icon-ignore-placement`
    ),
    "icon-optional": new W(M.layout_symbol[`icon-optional`], `icon-optional`),
    "icon-rotation-alignment": new G(
      M.layout_symbol[`icon-rotation-alignment`],
      `icon-rotation-alignment`
    ),
    "icon-size": new G(M.layout_symbol[`icon-size`], `icon-size`),
    "icon-text-fit": new W(M.layout_symbol[`icon-text-fit`], `icon-text-fit`),
    "icon-text-fit-padding": new W(
      M.layout_symbol[`icon-text-fit-padding`],
      `icon-text-fit-padding`
    ),
    "icon-image": new G(M.layout_symbol[`icon-image`], `icon-image`),
    "icon-rotate": new G(M.layout_symbol[`icon-rotate`], `icon-rotate`),
    "icon-padding": new G(M.layout_symbol[`icon-padding`], `icon-padding`),
    "icon-keep-upright": new W(
      M.layout_symbol[`icon-keep-upright`],
      `icon-keep-upright`
    ),
    "icon-offset": new G(M.layout_symbol[`icon-offset`], `icon-offset`),
    "icon-anchor": new G(M.layout_symbol[`icon-anchor`], `icon-anchor`),
    "icon-pitch-alignment": new W(
      M.layout_symbol[`icon-pitch-alignment`],
      `icon-pitch-alignment`
    ),
    "text-pitch-alignment": new W(
      M.layout_symbol[`text-pitch-alignment`],
      `text-pitch-alignment`
    ),
    "text-rotation-alignment": new W(
      M.layout_symbol[`text-rotation-alignment`],
      `text-rotation-alignment`
    ),
    "text-field": new G(M.layout_symbol[`text-field`], `text-field`),
    "text-font": new G(M.layout_symbol[`text-font`], `text-font`),
    "text-size": new G(M.layout_symbol[`text-size`], `text-size`),
    "text-max-width": new G(
      M.layout_symbol[`text-max-width`],
      `text-max-width`
    ),
    "text-line-height": new W(
      M.layout_symbol[`text-line-height`],
      `text-line-height`
    ),
    "text-letter-spacing": new G(
      M.layout_symbol[`text-letter-spacing`],
      `text-letter-spacing`
    ),
    "text-justify": new G(M.layout_symbol[`text-justify`], `text-justify`),
    "text-radial-offset": new G(
      M.layout_symbol[`text-radial-offset`],
      `text-radial-offset`
    ),
    "text-variable-anchor": new W(
      M.layout_symbol[`text-variable-anchor`],
      `text-variable-anchor`
    ),
    "text-variable-anchor-offset": new G(
      M.layout_symbol[`text-variable-anchor-offset`],
      `text-variable-anchor-offset`
    ),
    "text-anchor": new G(M.layout_symbol[`text-anchor`], `text-anchor`),
    "text-max-angle": new W(
      M.layout_symbol[`text-max-angle`],
      `text-max-angle`
    ),
    "text-writing-mode": new W(
      M.layout_symbol[`text-writing-mode`],
      `text-writing-mode`
    ),
    "text-rotate": new G(M.layout_symbol[`text-rotate`], `text-rotate`),
    "text-padding": new W(M.layout_symbol[`text-padding`], `text-padding`),
    "text-keep-upright": new W(
      M.layout_symbol[`text-keep-upright`],
      `text-keep-upright`
    ),
    "text-transform": new G(
      M.layout_symbol[`text-transform`],
      `text-transform`
    ),
    "text-offset": new G(M.layout_symbol[`text-offset`], `text-offset`),
    "text-allow-overlap": new W(
      M.layout_symbol[`text-allow-overlap`],
      `text-allow-overlap`
    ),
    "text-overlap": new W(M.layout_symbol[`text-overlap`], `text-overlap`),
    "text-ignore-placement": new W(
      M.layout_symbol[`text-ignore-placement`],
      `text-ignore-placement`
    ),
    "text-optional": new W(M.layout_symbol[`text-optional`], `text-optional`),
    "symbol-height-offset": new G(
      M.layout_symbol[`symbol-height-offset`],
      `symbol-height-offset`
    ),
    "symbol-height-anchor": new W(
      M.layout_symbol[`symbol-height-anchor`],
      `symbol-height-anchor`
    ),
  }))
let Tv
const Ev = () =>
  (Tv ||= new cl({
    "icon-opacity": new G(M.paint_symbol[`icon-opacity`], `icon-opacity`),
    "icon-color": new G(M.paint_symbol[`icon-color`], `icon-color`),
    "icon-halo-color": new G(
      M.paint_symbol[`icon-halo-color`],
      `icon-halo-color`
    ),
    "icon-halo-width": new G(
      M.paint_symbol[`icon-halo-width`],
      `icon-halo-width`
    ),
    "icon-halo-blur": new G(M.paint_symbol[`icon-halo-blur`], `icon-halo-blur`),
    "icon-translate": new W(M.paint_symbol[`icon-translate`], `icon-translate`),
    "icon-translate-anchor": new W(
      M.paint_symbol[`icon-translate-anchor`],
      `icon-translate-anchor`
    ),
    "text-opacity": new G(M.paint_symbol[`text-opacity`], `text-opacity`),
    "text-color": new G(M.paint_symbol[`text-color`], `text-color`, {
      runtimeType: Vn,
      getOverride: e52 => e52.textColor,
      hasOverride: e52 => !!e52.textColor,
    }),
    "text-halo-color": new G(
      M.paint_symbol[`text-halo-color`],
      `text-halo-color`
    ),
    "text-halo-width": new G(
      M.paint_symbol[`text-halo-width`],
      `text-halo-width`
    ),
    "text-halo-blur": new G(M.paint_symbol[`text-halo-blur`], `text-halo-blur`),
    "text-translate": new W(M.paint_symbol[`text-translate`], `text-translate`),
    "text-translate-anchor": new W(
      M.paint_symbol[`text-translate-anchor`],
      `text-translate-anchor`
    ),
  }))
var Dv = {
    get paint() {
      return Ev()
    },
    get layout() {
      return wv()
    },
  },
  Ov = class {
    constructor(e52) {
      if (e52.property.overrides === void 0)
        throw Error(
          `overrides must be provided to instantiate FormatSectionOverride class`
        )
      ;((this.type = e52.property.overrides
        ? e52.property.overrides.runtimeType
        : Bn),
        (this.defaultValue = e52))
    }
    evaluate(e52) {
      if (e52.formattedSection) {
        let t2 = this.defaultValue.property.overrides
        if (t2?.hasOverride(e52.formattedSection))
          return t2.getOverride(e52.formattedSection)
      }
      return e52.feature && e52.featureState
        ? this.defaultValue.evaluate(e52.feature, e52.featureState)
        : this.defaultValue.property.specification.default
    }
    eachChild(e52) {
      if (!this.defaultValue.isConstant()) {
        let t2 = this.defaultValue.value
        e52(t2._styleExpression.expression)
      }
    }
    outputDefined() {
      return false
    }
    serialize() {
      return null
    }
  }
H(`FormatSectionOverride`, Ov, {omit: [`defaultValue`]})
const kv = e52 => e52.type === `symbol`
var Av = class e49 extends dl {
  constructor(e52, t2) {
    super(e52, Dv, t2)
  }
  recalculate(e52, t2) {
    super.recalculate(e52, t2)
    let n2 = this.layout.get(`icon-rotation-alignment`)
    if (
      ((n2.value.kind !== `constant` || n2.value.value === `auto`) &&
        (this.layout._values[`icon-rotation-alignment`] = new tl(
          n2.property,
          {
            kind: `constant`,
            value:
              this.layout.get(`symbol-placement`) === `point`
                ? `viewport`
                : `map`,
          },
          n2.parameters
        )),
      this.layout.get(`text-rotation-alignment`) === `auto` &&
        (this.layout.get(`symbol-placement`) === `point`
          ? (this.layout._values[`text-rotation-alignment`] = `viewport`)
          : (this.layout._values[`text-rotation-alignment`] = `map`)),
      this.layout.get(`text-pitch-alignment`) === `auto` &&
        (this.layout._values[`text-pitch-alignment`] =
          this.layout.get(`text-rotation-alignment`) === `map`
            ? `map`
            : `viewport`),
      this.layout.get(`icon-pitch-alignment`) === `auto` &&
        (this.layout._values[`icon-pitch-alignment`] = this.layout
          .get(`icon-rotation-alignment`)
          .constantOr(`viewport`)),
      this.layout.get(`symbol-placement`) === `point`)
    ) {
      let e53 = this.layout.get(`text-writing-mode`)
      if (e53) {
        let t3 = []
        for (let n3 of e53) t3.includes(n3) || t3.push(n3)
        this.layout._values[`text-writing-mode`] = t3
      } else this.layout._values[`text-writing-mode`] = [`horizontal`]
    }
    this._setPaintOverrides()
  }
  getValueAndResolveTokens(e52, t2, n2, r2) {
    let i2 = this.layout.get(e52).evaluate(t2, {}, n2, r2),
      a2 = this._unevaluatedLayout._values[e52]
    return !a2.isDataDriven() && !Mo(a2.value) && i2
      ? Sv(t2.properties, i2)
      : i2
  }
  createBucket(e52) {
    return new xv(e52)
  }
  queryRadius() {
    return 0
  }
  queryIntersectsFeature() {
    throw Error(`Should take a different path in FeatureIndex`)
  }
  _setPaintOverrides() {
    for (let t2 of Dv.paint.overridableProperties) {
      if (!e49.hasPaintOverride(this.layout, t2)) continue
      let n2 = this.paint.get(t2),
        r2 = new ko(
          new Ov(n2),
          `layers[${this.id}].paint.${n2.property.name}`,
          n2.property.specification
        ),
        i2 = null
      ;((i2 =
        n2.value.kind === `constant` || n2.value.kind === `source`
          ? new Po(`source`, r2)
          : new Fo(`composite`, r2, n2.value.zoomStops)),
        (this.paint._values[t2] = new tl(n2.property, i2, n2.parameters)))
    }
  }
  _handleOverridablePaintPropertyUpdate(t2, n2, r2) {
    return !this.layout || n2.isDataDriven() || r2.isDataDriven()
      ? false
      : e49.hasPaintOverride(this.layout, t2)
  }
  static hasPaintOverride(e52, t2) {
    let n2 = e52.get(`text-field`),
      r2 = Dv.paint.properties[t2],
      i2 = false,
      a2 = e53 => {
        for (let t3 of e53)
          if (r2.overrides?.hasOverride(t3)) {
            i2 = true
            return
          }
      }
    if (n2.value.kind === `constant` && n2.value.value instanceof Pr)
      a2(n2.value.value.sections)
    else if (n2.value.kind === `source` || n2.value.kind === `composite`) {
      let e53 = t4 => {
          if (!i2) {
            if (t4 instanceof qr && Gr(t4.value) === Kn) {
              let e54 = t4.value
              a2(e54.sections)
            } else t4 instanceof ni ? a2(t4.sections) : t4.eachChild(e53)
          }
        },
        t3 = n2.value
      t3._styleExpression && e53(t3._styleExpression.expression)
    }
    return i2
  }
}
function jv(e52, t2, n2, r2 = 1) {
  let i2 = e52.get(`icon-padding`).evaluate(t2, {}, n2)?.values
  return [i2[0] * r2, i2[1] * r2, i2[2] * r2, i2[3] * r2]
}
let Mv
const Nv = () =>
  (Mv ||= new cl({
    "background-color": new W(
      M.paint_background[`background-color`],
      `background-color`
    ),
    "background-pattern": new ol(
      M.paint_background[`background-pattern`],
      `background-pattern`
    ),
    "background-opacity": new W(
      M.paint_background[`background-opacity`],
      `background-opacity`
    ),
  }))
var Pv = {
  get paint() {
    return Nv()
  },
}
const Fv = e52 => e52.type === `background`
var Iv = class extends dl {
  constructor(e52, t2) {
    super(e52, Pv, t2)
  }
}
function Lv(e52) {
  let t2 = [],
    n2 = e52.id
  return (
    n2 === void 0 &&
      t2.push(new N(`layers.${n2}`, null, `missing required property "id"`)),
    e52.render === void 0 &&
      t2.push(new N(`layers.${n2}`, null, `missing required method "render"`)),
    e52.renderingMode &&
      e52.renderingMode !== `2d` &&
      e52.renderingMode !== `3d` &&
      t2.push(
        new N(
          `layers.${n2}`,
          null,
          `property "renderingMode" must be either "2d" or "3d"`
        )
      ),
    t2
  )
}
const Rv = e52 => e52.type === `custom`
var zv = class extends dl {
  constructor(e52, t2) {
    ;(super(e52, {}, t2),
      (this.onAdd = e53 => {
        this.implementation.onAdd &&
          this.implementation.onAdd(e53, e53.painter.context.gl)
      }),
      (this.onRemove = e53 => {
        this.implementation.onRemove &&
          this.implementation.onRemove(e53, e53.painter.context.gl)
      }),
      (this.implementation = e52))
  }
  is3D() {
    return this.implementation.renderingMode === `3d`
  }
  hasOffscreenPass() {
    return this.implementation.prerender !== void 0
  }
  recalculate() {}
  updateTransitions() {}
  hasTransition() {
    return false
  }
  serialize() {
    throw Error(`Custom layers cannot be serialized`)
  }
}
function Bv(e52, t2) {
  if (e52.type === `custom`) return new zv(e52, t2)
  switch (e52.type) {
    case `background`:
      return new Iv(e52, t2)
    case `circle`:
      return new Wd(e52, t2)
    case `color-relief`:
      return new yf(e52, t2)
    case `fill`:
      return new Bp(e52, t2)
    case `fill-extrusion`:
      return new Lm(e52, t2)
    case `heatmap`:
      return new af(e52, t2)
    case `hillshade`:
      return new uf(e52, t2)
    case `line`:
      return new Og(e52, t2)
    case `raster`:
      return new gl(e52, t2)
    case `symbol`:
      return new Av(e52, t2)
  }
}
var Vv = class {
  constructor(e52) {
    ;((this._methodToThrottle = e52),
      (this._triggered = false),
      (this._channel = new MessageChannel()),
      (this._channel.port2.onmessage = () => {
        ;((this._triggered = false), this._methodToThrottle())
      }))
  }
  trigger() {
    this._triggered ||
      ((this._triggered = true), this._channel?.port1.postMessage(true))
  }
  remove() {
    ;(delete this._channel, (this._methodToThrottle = () => {}))
  }
}
const Hv = {once: true}
var Uv = class {
  constructor(e52, t2) {
    ;((this.target = e52),
      (this.mapId = t2),
      (this.resolveRejects = {}),
      (this.tasks = {}),
      (this.taskQueue = []),
      (this.abortControllers = {}),
      (this.messageHandlers = {}),
      (this.invoker = new Vv(() => this.process())),
      (this.subscription = en(
        this.target,
        `message`,
        e53 => this.receive(e53),
        false
      )),
      (this.globalScope = Bt(self) ? e52 : window))
  }
  registerMessageHandler(e52, t2) {
    this.messageHandlers[e52] = t2
  }
  unregisterMessageHandler(e52) {
    delete this.messageHandlers[e52]
  }
  sendAsync(e52, t2) {
    return new Promise((n2, r2) => {
      let i2 = Math.round(Math.random() * 1e18)
          .toString(36)
          .substring(0, 10),
        a2 = t2
          ? en(
              t2.signal,
              `abort`,
              () => {
                ;(a2?.unsubscribe(), delete this.resolveRejects[i2])
                let n3 = {
                  id: i2,
                  type: `<cancel>`,
                  origin: location.origin,
                  targetMapId: e52.targetMapId,
                  sourceMapId: this.mapId,
                }
                ;(this.target.postMessage(n3), r2(new hn(t2.signal.reason)))
              },
              Hv
            )
          : null
      this.resolveRejects[i2] = {
        resolve: e53 => {
          ;(a2?.unsubscribe(), n2(e53))
        },
        reject: e53 => {
          ;(a2?.unsubscribe(), r2(e53))
        },
      }
      let o2 = [],
        s2 = {
          ...e52,
          id: i2,
          sourceMapId: this.mapId,
          origin: location.origin,
          data: Sc(e52.data, o2),
        }
      this.target.postMessage(s2, {transfer: o2})
    })
  }
  receive(e52) {
    let t2 = e52.data,
      n2 = t2.id,
      r2 = [`file://`, `resource://android`, `null`],
      i2 = [t2.origin, location.origin],
      a2 = t2.origin === location.origin,
      o2 = i2.some(e53 => r2.includes(e53))
    if (!(!a2 && !o2) && !(t2.targetMapId && this.mapId !== t2.targetMapId)) {
      if (t2.type === `<cancel>`) {
        delete this.tasks[n2]
        let e53 = this.abortControllers[n2]
        ;(delete this.abortControllers[n2], e53 && e53.abort())
        return
      }
      if (Bt(self) || t2.mustQueue) {
        ;((this.tasks[n2] = t2),
          this.taskQueue.push(n2),
          this.invoker.trigger())
        return
      }
      this.processTask(n2, t2)
    }
  }
  process() {
    if (this.taskQueue.length === 0) return
    let e52 = this.taskQueue.shift(),
      t2 = this.tasks[e52]
    ;(delete this.tasks[e52],
      this.taskQueue.length > 0 && this.invoker.trigger(),
      t2 && this.processTask(e52, t2))
  }
  async processTask(e52, t2) {
    if (t2.type === `<response>`) {
      let n3 = this.resolveRejects[e52]
      if ((delete this.resolveRejects[e52], !n3)) return
      t2.error ? n3.reject($e(Cc(t2.error))) : n3.resolve(Cc(t2.data))
      return
    }
    if (!this.messageHandlers[t2.type]) {
      this.completeTask(e52, null, null)
      return
    }
    let n2 = Cc(t2.data),
      r2 = new AbortController()
    this.abortControllers[e52] = r2
    try {
      let i2 = await this.messageHandlers[t2.type](t2.sourceMapId, n2, r2)
      this.completeTask(e52, null, i2)
    } catch (t3) {
      this.completeTask(e52, $e(t3))
    }
  }
  completeTask(e52, t2, n2) {
    let r2 = []
    delete this.abortControllers[e52]
    let i2 = {
      id: e52,
      type: `<response>`,
      sourceMapId: this.mapId,
      origin: location.origin,
      error: t2 ? Sc(t2) : null,
      data: Sc(n2, r2),
    }
    this.target.postMessage(i2, {transfer: r2})
  }
  remove() {
    ;(this.invoker.remove(), this.subscription.unsubscribe())
  }
}
function Wv(e52, t2, n2) {
  return !(
    e52 < 0 ||
    e52 > 25 ||
    n2 < 0 ||
    n2 >= 2 ** e52 ||
    t2 < 0 ||
    t2 >= 2 ** e52
  )
}
function Gv(e52, t2) {
  let {x: n2, y: r2} = dm.fromLngLat(t2)
  return !(e52 < 0 || e52 > 25 || r2 < 0 || r2 >= 1 || n2 < 0 || n2 >= 1)
}
var Kv = class {
    constructor(e52, t2, n2) {
      if (!Wv(e52, t2, n2))
        throw Error(
          `x=${t2}, y=${n2}, z=${e52} outside of bounds. 0<=x<${2 ** e52}, 0<=y<${2 ** e52} 0<=z<=25 `
        )
      ;((this.z = e52),
        (this.x = t2),
        (this.y = n2),
        (this.key = Yv(0, e52, e52, t2, n2)))
    }
    equals(e52) {
      return this.z === e52.z && this.x === e52.x && this.y === e52.y
    }
    url(e52, t2, n2) {
      let r2 = Zv(this.x, this.y, this.z),
        i2 = $v(this.z, this.x, this.y)
      return e52[(this.x + this.y) % e52.length]
        .replace(
          /{prefix}/g,
          (this.x % 16).toString(16) + (this.y % 16).toString(16)
        )
        .replace(/{z}/g, String(this.z))
        .replace(/{x}/g, String(this.x))
        .replace(
          /{y}/g,
          String(n2 === `tms` ? 2 ** this.z - this.y - 1 : this.y)
        )
        .replace(/{ratio}/g, t2 > 1 ? `@2x` : ``)
        .replace(/{quadkey}/g, i2)
        .replace(/{bbox-epsg-3857}/g, r2)
    }
    isChildOf(e52) {
      let t2 = this.z - e52.z
      return t2 > 0 && e52.x === this.x >> t2 && e52.y === this.y >> t2
    }
    getTilePoint(e52) {
      let t2 = 2 ** this.z
      return new l((e52.x * t2 - this.x) * j, (e52.y * t2 - this.y) * j)
    }
    toString() {
      return `${this.z}/${this.x}/${this.y}`
    }
  },
  qv = class {
    constructor(e52, t2) {
      ;((this.wrap = e52),
        (this.canonical = t2),
        (this.key = Yv(e52, t2.z, t2.z, t2.x, t2.y)))
    }
  },
  Jv = class e50 {
    constructor(e52, t2, n2, r2, i2) {
      if (((this.terrainRttPosMatrix32f = null), e52 < n2))
        throw Error(
          `overscaledZ should be >= z; overscaledZ = ${e52}; z = ${n2}`
        )
      ;((this.overscaledZ = e52),
        (this.wrap = t2),
        (this.canonical = new Kv(n2, +r2, +i2)),
        (this.key = Yv(t2, e52, n2, r2, i2)))
    }
    clone() {
      return new e50(
        this.overscaledZ,
        this.wrap,
        this.canonical.z,
        this.canonical.x,
        this.canonical.y
      )
    }
    equals(e52) {
      return (
        this.overscaledZ === e52.overscaledZ &&
        this.wrap === e52.wrap &&
        this.canonical.equals(e52.canonical)
      )
    }
    scaledTo(t2) {
      if (t2 > this.overscaledZ)
        throw Error(
          `targetZ > this.overscaledZ; targetZ = ${t2}; overscaledZ = ${this.overscaledZ}`
        )
      let n2 = this.canonical.z - t2
      return t2 > this.canonical.z
        ? new e50(
            t2,
            this.wrap,
            this.canonical.z,
            this.canonical.x,
            this.canonical.y
          )
        : new e50(
            t2,
            this.wrap,
            t2,
            this.canonical.x >> n2,
            this.canonical.y >> n2
          )
    }
    isOverscaled() {
      return this.overscaledZ > this.canonical.z
    }
    calculateScaledKey(e52, t2) {
      if (e52 > this.overscaledZ)
        throw Error(
          `targetZ > this.overscaledZ; targetZ = ${e52}; overscaledZ = ${this.overscaledZ}`
        )
      let n2 = this.canonical.z - e52
      return e52 > this.canonical.z
        ? Yv(
            this.wrap * +t2,
            e52,
            this.canonical.z,
            this.canonical.x,
            this.canonical.y
          )
        : Yv(
            this.wrap * +t2,
            e52,
            e52,
            this.canonical.x >> n2,
            this.canonical.y >> n2
          )
    }
    isChildOf(e52) {
      if (e52.wrap !== this.wrap || this.overscaledZ - e52.overscaledZ <= 0)
        return false
      if (e52.overscaledZ === 0) return this.overscaledZ > 0
      let t2 = this.canonical.z - e52.canonical.z
      return t2 < 0
        ? false
        : e52.canonical.x === this.canonical.x >> t2 &&
            e52.canonical.y === this.canonical.y >> t2
    }
    children(t2) {
      if (this.overscaledZ >= t2)
        return [
          new e50(
            this.overscaledZ + 1,
            this.wrap,
            this.canonical.z,
            this.canonical.x,
            this.canonical.y
          ),
        ]
      let n2 = this.canonical.z + 1,
        r2 = this.canonical.x * 2,
        i2 = this.canonical.y * 2
      return [
        new e50(n2, this.wrap, n2, r2, i2),
        new e50(n2, this.wrap, n2, r2 + 1, i2),
        new e50(n2, this.wrap, n2, r2, i2 + 1),
        new e50(n2, this.wrap, n2, r2 + 1, i2 + 1),
      ]
    }
    isLessThan(e52) {
      return this.wrap < e52.wrap
        ? true
        : this.wrap > e52.wrap
          ? false
          : this.overscaledZ < e52.overscaledZ
            ? true
            : this.overscaledZ > e52.overscaledZ
              ? false
              : this.canonical.x < e52.canonical.x
                ? true
                : this.canonical.x > e52.canonical.x
                  ? false
                  : this.canonical.y < e52.canonical.y
    }
    wrapped() {
      return new e50(
        this.overscaledZ,
        0,
        this.canonical.z,
        this.canonical.x,
        this.canonical.y
      )
    }
    unwrapTo(t2) {
      return new e50(
        this.overscaledZ,
        t2,
        this.canonical.z,
        this.canonical.x,
        this.canonical.y
      )
    }
    overscaleFactor() {
      return 2 ** (this.overscaledZ - this.canonical.z)
    }
    toUnwrapped() {
      return new qv(this.wrap, this.canonical)
    }
    toString() {
      return `${this.overscaledZ}/${this.canonical.x}/${this.canonical.y}`
    }
    getTilePoint(e52) {
      return this.canonical.getTilePoint(new dm(e52.x - this.wrap, e52.y))
    }
    normalizeCoordinates(t2, n2, r2 = j) {
      if (t2 >= 0 && t2 < r2 && n2 >= 0 && n2 < r2)
        return {tileID: this, x: t2, y: n2}
      let i2 = Math.floor(t2 / r2),
        a2 = Math.floor(n2 / r2),
        o2 = t2 - i2 * r2,
        s2 = n2 - a2 * r2,
        c2 = this.canonical.z,
        l2 = 1 << c2,
        u2 = this.canonical.y + a2
      if (u2 < 0 || u2 >= l2) return null
      let d2 = this.canonical.x + i2,
        f2 = this.wrap
      return (
        d2 < 0
          ? ((f2 -= Math.ceil(-d2 / l2)), (d2 = ((d2 % l2) + l2) % l2))
          : d2 >= l2 && ((f2 += Math.floor(d2 / l2)), (d2 %= l2)),
        {tileID: new e50(this.overscaledZ, f2, c2, d2, u2), x: o2, y: s2}
      )
    }
  }
function Yv(e52, t2, n2, r2, i2) {
  ;((e52 *= 2), e52 < 0 && (e52 = e52 * -1 - 1))
  let a2 = 1 << n2
  return (
    (a2 * a2 * e52 + a2 * i2 + r2).toString(36) +
    n2.toString(36) +
    t2.toString(36)
  )
}
const Xv = Math.PI * 6378137
function Zv(e52, t2, n2) {
  t2 = 2 ** n2 - t2 - 1
  let r2 = Qv(e52 * 256, t2 * 256, n2),
    i2 = Qv((e52 + 1) * 256, (t2 + 1) * 256, n2)
  return `${r2[0]},${r2[1]},${i2[0]},${i2[1]}`
}
function Qv(e52, t2, n2) {
  let r2 = (2 * Xv) / 256 / 2 ** n2
  return [e52 * r2 - Xv, t2 * r2 - Xv]
}
function $v(e52, t2, n2) {
  let r2 = ``
  for (let i2 = e52; i2 > 0; i2--) {
    let e53 = 1 << (i2 - 1)
    r2 += (t2 & e53 ? 1 : 0) + (n2 & e53 ? 2 : 0)
  }
  return r2
}
function ey(e52, t2) {
  let n2 = Math.abs(e52.wrap * 2) - +(e52.wrap < 0),
    r2 = Math.abs(t2.wrap * 2) - +(t2.wrap < 0)
  return (
    e52.overscaledZ - t2.overscaledZ ||
    r2 - n2 ||
    t2.canonical.y - e52.canonical.y ||
    t2.canonical.x - e52.canonical.x
  )
}
;(H(`CanonicalTileID`, Kv),
  H(`OverscaledTileID`, Jv, {omit: [`terrainRttPosMatrix32f`]}))
var ty = class {
  constructor(e52, t2) {
    ;((this.feature = e52),
      (this.type = e52.type),
      (this.properties = e52.tags ? e52.tags : {}),
      (this.extent = t2),
      `id` in e52 &&
        (typeof e52.id == `string`
          ? (this.id = parseInt(e52.id, 10))
          : typeof e52.id == `number` && !isNaN(e52.id) && (this.id = e52.id)))
  }
  loadGeometry() {
    let e52 = [],
      t2 =
        this.feature.type === 1
          ? [this.feature.geometry]
          : this.feature.geometry
    for (let n2 of t2) {
      let t3 = []
      for (let e53 of n2) t3.push(new l(e53[0], e53[1]))
      e52.push(t3)
    }
    return e52
  }
}
const ny = `_geojsonTileLayer`
var ry = class {
  constructor(e52, t2) {
    ;((this.layers = {[ny]: this}),
      (this.name = ny),
      (this.version = t2 ? t2.version : 1),
      (this.extent = t2 ? t2.extent : 4096),
      (this.length = e52.length),
      (this.features = e52))
  }
  feature(e52) {
    return new ty(this.features[e52], this.extent)
  }
}
function iy(e52, t2 = ``) {
  let n2 = new a_()
  return (ay(e52, n2, t2), n2.finish())
}
function ay(e52, t2, n2 = ``) {
  for (let r2 in e52.layers)
    t2.writeMessage(3, (e53, t3) => oy(e53, t3, n2), e52.layers[r2])
}
function oy(e52, t2, n2 = ``) {
  ;(t2.writeVarintField(15, e52.version || 1),
    t2.writeStringField(1, e52.name || ``),
    t2.writeVarintField(5, e52.extent || 4096))
  let r2 = {jsonPrefix: n2, keys: [], values: [], keycache: {}, valuecache: {}}
  for (let n3 = 0; n3 < e52.length; n3++)
    ((r2.feature = e52.feature(n3)), t2.writeMessage(2, sy, r2))
  let i2 = r2.keys
  for (let e53 of i2) t2.writeStringField(3, e53)
  let a2 = r2.values
  for (let e53 of a2) t2.writeMessage(4, fy, e53)
}
function sy(e52, t2) {
  if (!e52.feature) return
  let n2 = e52.feature
  ;(n2.id !== void 0 && t2.writeVarintField(1, n2.id),
    t2.writeMessage(2, cy, e52),
    t2.writeVarintField(3, n2.type),
    t2.writeMessage(4, dy, n2))
}
function cy(e52, t2) {
  for (let n2 in e52.feature?.properties) {
    let r2 = e52.feature.properties[n2],
      i2 = e52.keycache[n2]
    if (r2 == null) continue
    ;(i2 === void 0 &&
      (e52.keys.push(n2), (i2 = e52.keys.length - 1), (e52.keycache[n2] = i2)),
      t2.writeVarint(i2),
      typeof r2 != `string` &&
        typeof r2 != `boolean` &&
        typeof r2 != `number` &&
        (r2 = e52.jsonPrefix + JSON.stringify(r2)))
    let a2 = typeof r2 + `:` + r2,
      o2 = e52.valuecache[a2]
    ;(o2 === void 0 &&
      (e52.values.push(r2),
      (o2 = e52.values.length - 1),
      (e52.valuecache[a2] = o2)),
      t2.writeVarint(o2))
  }
}
function ly(e52, t2) {
  return (t2 << 3) + (e52 & 7)
}
function uy(e52) {
  return (e52 << 1) ^ (e52 >> 31)
}
function dy(e52, t2) {
  let n2 = e52.loadGeometry(),
    r2 = e52.type,
    i2 = 0,
    a2 = 0
  for (let o2 of n2) {
    let n3 = 1
    ;(r2 === 1 && (n3 = o2.length), t2.writeVarint(ly(1, n3)))
    let s2 = r2 === 3 ? o2.length - 1 : o2.length
    for (let e53 = 0; e53 < s2; e53++) {
      e53 === 1 && r2 !== 1 && t2.writeVarint(ly(2, s2 - 1))
      let n4 = o2[e53].x - i2,
        c2 = o2[e53].y - a2
      ;(t2.writeVarint(uy(n4)), t2.writeVarint(uy(c2)), (i2 += n4), (a2 += c2))
    }
    e52.type === 3 && t2.writeVarint(ly(7, 1))
  }
}
function fy(e52, t2) {
  let n2 = typeof e52
  n2 === `string`
    ? t2.writeStringField(1, e52)
    : n2 === `boolean`
      ? t2.writeBooleanField(7, e52)
      : n2 === `number` &&
        (e52 % 1 == 0
          ? e52 < 0
            ? t2.writeSVarintField(6, e52)
            : t2.writeVarintField(5, e52)
          : t2.writeDoubleField(3, e52))
}
var py = class {
    constructor(e52) {
      ;((this._stringToNumber = {}), (this._numberToString = []))
      for (let t2 = 0; t2 < e52.length; t2++) {
        let n2 = e52[t2]
        ;((this._stringToNumber[n2] = t2), (this._numberToString[t2] = n2))
      }
    }
    encode(e52) {
      return this._stringToNumber[e52]
    }
    decode(e52) {
      if (e52 >= this._numberToString.length)
        throw Error(
          `Out of bounds. Index requested n=${e52} can't be >= this._numberToString.length ${this._numberToString.length}`
        )
      return this._numberToString[e52]
    }
  },
  my = class {
    constructor(e52, t2, n2, r2, i2) {
      ;((this.type = `Feature`),
        (this._vectorTileFeature = e52),
        (this._x = n2),
        (this._y = r2),
        (this._z = t2))
      for (let t3 in e52.properties)
        typeof e52.properties[t3] != `string` ||
          !e52.properties[t3].startsWith(`__$json__:`) ||
          (e52.properties[t3] = JSON.parse(e52.properties[t3].slice(10)))
      ;((this.properties = e52.properties), (this.id = i2))
    }
    projectPoint(e52, t2, n2, r2) {
      return [
        ((e52.x + t2) * 360) / r2 - 180,
        (360 / Math.PI) *
          Math.atan(Math.exp((1 - ((e52.y + n2) * 2) / r2) * Math.PI)) -
          90,
      ]
    }
    projectLine(e52, t2, n2, r2) {
      return e52.map(e53 => this.projectPoint(e53, t2, n2, r2))
    }
    get geometry() {
      if (this._geometry) return this._geometry
      let e52 = this._vectorTileFeature,
        t2 = e52.extent * 2 ** this._z,
        n2 = e52.extent * this._x,
        r2 = e52.extent * this._y,
        i2 = e52.loadGeometry()
      switch (e52.type) {
        case 1: {
          let e53 = []
          for (let t3 of i2) e53.push(t3[0])
          let a2 = this.projectLine(e53, n2, r2, t2)
          this._geometry =
            e53.length === 1
              ? {type: `Point`, coordinates: a2[0]}
              : {type: `MultiPoint`, coordinates: a2}
          break
        }
        case 2: {
          let e53 = i2.map(e54 => this.projectLine(e54, n2, r2, t2))
          this._geometry =
            e53.length === 1
              ? {type: `LineString`, coordinates: e53[0]}
              : {type: `MultiLineString`, coordinates: e53}
          break
        }
        case 3: {
          let e53 = Yp(i2),
            a2 = []
          for (let i3 of e53)
            a2.push(i3.map(e54 => this.projectLine(e54, n2, r2, t2)))
          this._geometry =
            a2.length === 1
              ? {type: `Polygon`, coordinates: a2[0]}
              : {type: `MultiPolygon`, coordinates: a2}
          break
        }
        default:
          throw Error(`unknown feature type: ${e52.type}`)
      }
      return this._geometry
    }
    set geometry(e52) {
      this._geometry = e52
    }
    toJSON() {
      let e52 = {geometry: this.geometry}
      for (let t2 in this)
        t2 !== `_geometry` &&
          t2 !== `_vectorTileFeature` &&
          t2 !== `_x` &&
          t2 !== `_y` &&
          t2 !== `_z` &&
          (e52[t2] = this[t2])
      return e52
    }
  },
  hy = class {
    constructor(e52, t2, n2) {
      ;((this._name = e52),
        (this.dataBuffer = t2),
        typeof n2 == `number`
          ? (this._size = n2)
          : ((this.nullabilityBuffer = n2), (this._size = n2.size())))
    }
    getValue(e52) {
      return this.nullabilityBuffer && !this.nullabilityBuffer.get(e52)
        ? null
        : this.getValueFromBuffer(e52)
    }
    has(e52) {
      return this.nullabilityBuffer?.get(e52) || !this.nullabilityBuffer
    }
    get name() {
      return this._name
    }
    get size() {
      return this._size
    }
  },
  gy = class extends hy {},
  _y = class extends gy {
    getValueFromBuffer(e52) {
      return this.dataBuffer[e52]
    }
  },
  vy = class extends gy {
    getValueFromBuffer(e52) {
      return this.dataBuffer[e52]
    }
  },
  yy = class extends hy {
    constructor(e52, t2, n2, r2) {
      ;(super(e52, t2, r2), (this.delta = n2))
    }
  },
  by = class extends yy {
    constructor(e52, t2, n2, r2, i2) {
      super(e52, i2 ? Int32Array.of(t2) : Uint32Array.of(t2), n2, r2)
    }
    getValueFromBuffer(e52) {
      return this.dataBuffer[0] + e52 * this.delta
    }
  },
  xy = class extends hy {
    constructor(e52, t2, n2, r2) {
      super(e52, r2 ? Int32Array.of(t2) : Uint32Array.of(t2), n2)
    }
    getValueFromBuffer(e52) {
      return this.dataBuffer[0]
    }
  },
  Sy = class {
    constructor(e52, t2, n2, r2, i2 = 4096) {
      if (
        ((this._name = e52),
        (this._geometryVector = t2),
        (this._idVector = n2),
        (this._propertyVectors = r2),
        (this._extent = i2),
        e52.length === 0)
      )
        throw Error(`Missing layer name`)
    }
    get name() {
      return this._name
    }
    get idVector() {
      return this._idVector
    }
    get geometryVector() {
      return this._geometryVector
    }
    get propertyVectors() {
      return this._propertyVectors ?? []
    }
    getPropertyVector(e52) {
      return (
        (this.propertyVectorsMap ||= new Map(
          this.propertyVectors.map(e53 => [e53.name, e53])
        )),
        this.propertyVectorsMap.get(e52)
      )
    }
    get numFeatures() {
      return this.geometryVector.numGeometries
    }
    get extent() {
      return this._extent
    }
    getFeatures() {
      let e52 = [],
        t2 = this.geometryVector.getGeometries()
      for (let n2 = 0; n2 < this.numFeatures; n2++) {
        let r2
        if (this.idVector) {
          let e53 = this.idVector.getValue(n2)
          e53 !== null &&
            (r2 = this.containsMaxSafeIntegerValues(this.idVector)
              ? Number(e53)
              : e53)
        }
        let i2 = {
            coordinates: t2[n2],
            type: this.geometryVector.geometryType(n2),
          },
          a2 = {}
        for (let e53 of this.propertyVectors) {
          if (!e53) continue
          let t3 = e53.name,
            r3 = e53.getValue(n2)
          r3 !== null && (a2[t3] = r3)
        }
        e52.push({id: r2, geometry: i2, properties: a2})
      }
      return e52
    }
    containsMaxSafeIntegerValues(e52) {
      return (
        e52 instanceof _y ||
        e52 instanceof xy ||
        e52 instanceof by ||
        e52 instanceof vy
      )
    }
  }
const Cy = {FEATURE: 0, VERTEX: 1},
  Y = {
    BOOLEAN: 0,
    INT_8: 1,
    UINT_8: 2,
    INT_32: 3,
    UINT_32: 4,
    INT_64: 5,
    UINT_64: 6,
    FLOAT: 7,
    DOUBLE: 8,
    STRING: 9,
  },
  wy = {GEOMETRY: 0, STRUCT: 1, MAP: 2},
  Ty = {ID: 0}
var Ey = class {
    constructor(e52) {
      this.value = e52
    }
    get() {
      return this.value
    }
    set(e52) {
      this.value = e52
    }
    increment() {
      return this.value++
    }
    add(e52) {
      this.value += e52
    }
  },
  X
;(function (e52) {
  ;((e52.NONE = `NONE`),
    (e52.DELTA = `DELTA`),
    (e52.COMPONENTWISE_DELTA = `COMPONENTWISE_DELTA`),
    (e52.RLE = `RLE`),
    (e52.MORTON = `MORTON`),
    (e52.PDE = `PDE`))
})((X ||= {}))
var Dy
;(function (e52) {
  ;((e52.NONE = `NONE`), (e52.FAST_PFOR = `FAST_PFOR`), (e52.VARINT = `VARINT`))
})((Dy ||= {}))
const Oy = new Uint32Array(33)
Oy[0] = 0
for (let e52 = 1; e52 <= 32; e52++)
  Oy[e52] = e52 === 32 ? 4294967295 : 4294967295 >>> (32 - e52)
const ky = Oy,
  Ay = 65536
function jy(e52, t2) {
  return e52 - (e52 % t2)
}
function My(e52) {
  return jy(e52 + 31, 32)
}
function Ny(e52) {
  if (!Number.isFinite(e52) || e52 <= 0) return Ay
  let t2 = jy(Math.floor(e52), 256)
  return t2 === 0 ? 256 : t2
}
function Py(e52) {
  let t2 = e52 >>> 0
  return (
    (((t2 & 255) << 24) |
      ((t2 & 65280) << 8) |
      ((t2 >>> 8) & 65280) |
      ((t2 >>> 24) & 255)) >>>
    0
  )
}
function Fy(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = e52[t2] >>> 0,
    o2 = e52[t2 + 1] >>> 0
  ;((n2[i2++] = (a2 >>> 0) & 3),
    (n2[i2++] = (a2 >>> 2) & 3),
    (n2[i2++] = (a2 >>> 4) & 3),
    (n2[i2++] = (a2 >>> 6) & 3),
    (n2[i2++] = (a2 >>> 8) & 3),
    (n2[i2++] = (a2 >>> 10) & 3),
    (n2[i2++] = (a2 >>> 12) & 3),
    (n2[i2++] = (a2 >>> 14) & 3),
    (n2[i2++] = (a2 >>> 16) & 3),
    (n2[i2++] = (a2 >>> 18) & 3),
    (n2[i2++] = (a2 >>> 20) & 3),
    (n2[i2++] = (a2 >>> 22) & 3),
    (n2[i2++] = (a2 >>> 24) & 3),
    (n2[i2++] = (a2 >>> 26) & 3),
    (n2[i2++] = (a2 >>> 28) & 3),
    (n2[i2++] = (a2 >>> 30) & 3),
    (n2[i2++] = (o2 >>> 0) & 3),
    (n2[i2++] = (o2 >>> 2) & 3),
    (n2[i2++] = (o2 >>> 4) & 3),
    (n2[i2++] = (o2 >>> 6) & 3),
    (n2[i2++] = (o2 >>> 8) & 3),
    (n2[i2++] = (o2 >>> 10) & 3),
    (n2[i2++] = (o2 >>> 12) & 3),
    (n2[i2++] = (o2 >>> 14) & 3),
    (n2[i2++] = (o2 >>> 16) & 3),
    (n2[i2++] = (o2 >>> 18) & 3),
    (n2[i2++] = (o2 >>> 20) & 3),
    (n2[i2++] = (o2 >>> 22) & 3),
    (n2[i2++] = (o2 >>> 24) & 3),
    (n2[i2++] = (o2 >>> 26) & 3),
    (n2[i2++] = (o2 >>> 28) & 3),
    (n2[i2] = (o2 >>> 30) & 3))
}
function Iy(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = e52[t2] >>> 0,
    o2 = e52[t2 + 1] >>> 0,
    s2 = e52[t2 + 2] >>> 0
  ;((n2[i2++] = (a2 >>> 0) & 7),
    (n2[i2++] = (a2 >>> 3) & 7),
    (n2[i2++] = (a2 >>> 6) & 7),
    (n2[i2++] = (a2 >>> 9) & 7),
    (n2[i2++] = (a2 >>> 12) & 7),
    (n2[i2++] = (a2 >>> 15) & 7),
    (n2[i2++] = (a2 >>> 18) & 7),
    (n2[i2++] = (a2 >>> 21) & 7),
    (n2[i2++] = (a2 >>> 24) & 7),
    (n2[i2++] = (a2 >>> 27) & 7),
    (n2[i2++] = ((a2 >>> 30) | ((o2 & 1) << 2)) & 7),
    (n2[i2++] = (o2 >>> 1) & 7),
    (n2[i2++] = (o2 >>> 4) & 7),
    (n2[i2++] = (o2 >>> 7) & 7),
    (n2[i2++] = (o2 >>> 10) & 7),
    (n2[i2++] = (o2 >>> 13) & 7),
    (n2[i2++] = (o2 >>> 16) & 7),
    (n2[i2++] = (o2 >>> 19) & 7),
    (n2[i2++] = (o2 >>> 22) & 7),
    (n2[i2++] = (o2 >>> 25) & 7),
    (n2[i2++] = (o2 >>> 28) & 7),
    (n2[i2++] = ((o2 >>> 31) | ((s2 & 3) << 1)) & 7),
    (n2[i2++] = (s2 >>> 2) & 7),
    (n2[i2++] = (s2 >>> 5) & 7),
    (n2[i2++] = (s2 >>> 8) & 7),
    (n2[i2++] = (s2 >>> 11) & 7),
    (n2[i2++] = (s2 >>> 14) & 7),
    (n2[i2++] = (s2 >>> 17) & 7),
    (n2[i2++] = (s2 >>> 20) & 7),
    (n2[i2++] = (s2 >>> 23) & 7),
    (n2[i2++] = (s2 >>> 26) & 7),
    (n2[i2] = (s2 >>> 29) & 7))
}
function Ly(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = e52[t2] >>> 0,
    o2 = e52[t2 + 1] >>> 0,
    s2 = e52[t2 + 2] >>> 0,
    c2 = e52[t2 + 3] >>> 0
  ;((n2[i2++] = (a2 >>> 0) & 15),
    (n2[i2++] = (a2 >>> 4) & 15),
    (n2[i2++] = (a2 >>> 8) & 15),
    (n2[i2++] = (a2 >>> 12) & 15),
    (n2[i2++] = (a2 >>> 16) & 15),
    (n2[i2++] = (a2 >>> 20) & 15),
    (n2[i2++] = (a2 >>> 24) & 15),
    (n2[i2++] = (a2 >>> 28) & 15),
    (n2[i2++] = (o2 >>> 0) & 15),
    (n2[i2++] = (o2 >>> 4) & 15),
    (n2[i2++] = (o2 >>> 8) & 15),
    (n2[i2++] = (o2 >>> 12) & 15),
    (n2[i2++] = (o2 >>> 16) & 15),
    (n2[i2++] = (o2 >>> 20) & 15),
    (n2[i2++] = (o2 >>> 24) & 15),
    (n2[i2++] = (o2 >>> 28) & 15),
    (n2[i2++] = (s2 >>> 0) & 15),
    (n2[i2++] = (s2 >>> 4) & 15),
    (n2[i2++] = (s2 >>> 8) & 15),
    (n2[i2++] = (s2 >>> 12) & 15),
    (n2[i2++] = (s2 >>> 16) & 15),
    (n2[i2++] = (s2 >>> 20) & 15),
    (n2[i2++] = (s2 >>> 24) & 15),
    (n2[i2++] = (s2 >>> 28) & 15),
    (n2[i2++] = (c2 >>> 0) & 15),
    (n2[i2++] = (c2 >>> 4) & 15),
    (n2[i2++] = (c2 >>> 8) & 15),
    (n2[i2++] = (c2 >>> 12) & 15),
    (n2[i2++] = (c2 >>> 16) & 15),
    (n2[i2++] = (c2 >>> 20) & 15),
    (n2[i2++] = (c2 >>> 24) & 15),
    (n2[i2] = (c2 >>> 28) & 15))
}
function Ry(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = e52[t2] >>> 0,
    o2 = e52[t2 + 1] >>> 0,
    s2 = e52[t2 + 2] >>> 0,
    c2 = e52[t2 + 3] >>> 0,
    l2 = e52[t2 + 4] >>> 0
  ;((n2[i2++] = (a2 >>> 0) & 31),
    (n2[i2++] = (a2 >>> 5) & 31),
    (n2[i2++] = (a2 >>> 10) & 31),
    (n2[i2++] = (a2 >>> 15) & 31),
    (n2[i2++] = (a2 >>> 20) & 31),
    (n2[i2++] = (a2 >>> 25) & 31),
    (n2[i2++] = ((a2 >>> 30) | ((o2 & 7) << 2)) & 31),
    (n2[i2++] = (o2 >>> 3) & 31),
    (n2[i2++] = (o2 >>> 8) & 31),
    (n2[i2++] = (o2 >>> 13) & 31),
    (n2[i2++] = (o2 >>> 18) & 31),
    (n2[i2++] = (o2 >>> 23) & 31),
    (n2[i2++] = ((o2 >>> 28) | ((s2 & 1) << 4)) & 31),
    (n2[i2++] = (s2 >>> 1) & 31),
    (n2[i2++] = (s2 >>> 6) & 31),
    (n2[i2++] = (s2 >>> 11) & 31),
    (n2[i2++] = (s2 >>> 16) & 31),
    (n2[i2++] = (s2 >>> 21) & 31),
    (n2[i2++] = (s2 >>> 26) & 31),
    (n2[i2++] = ((s2 >>> 31) | ((c2 & 15) << 1)) & 31),
    (n2[i2++] = (c2 >>> 4) & 31),
    (n2[i2++] = (c2 >>> 9) & 31),
    (n2[i2++] = (c2 >>> 14) & 31),
    (n2[i2++] = (c2 >>> 19) & 31),
    (n2[i2++] = (c2 >>> 24) & 31),
    (n2[i2++] = ((c2 >>> 29) | ((l2 & 3) << 3)) & 31),
    (n2[i2++] = (l2 >>> 2) & 31),
    (n2[i2++] = (l2 >>> 7) & 31),
    (n2[i2++] = (l2 >>> 12) & 31),
    (n2[i2++] = (l2 >>> 17) & 31),
    (n2[i2++] = (l2 >>> 22) & 31),
    (n2[i2] = (l2 >>> 27) & 31))
}
function zy(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = e52[t2] >>> 0,
    o2 = e52[t2 + 1] >>> 0,
    s2 = e52[t2 + 2] >>> 0,
    c2 = e52[t2 + 3] >>> 0,
    l2 = e52[t2 + 4] >>> 0,
    u2 = e52[t2 + 5] >>> 0
  ;((n2[i2++] = (a2 >>> 0) & 63),
    (n2[i2++] = (a2 >>> 6) & 63),
    (n2[i2++] = (a2 >>> 12) & 63),
    (n2[i2++] = (a2 >>> 18) & 63),
    (n2[i2++] = (a2 >>> 24) & 63),
    (n2[i2++] = ((a2 >>> 30) | ((o2 & 15) << 2)) & 63),
    (n2[i2++] = (o2 >>> 4) & 63),
    (n2[i2++] = (o2 >>> 10) & 63),
    (n2[i2++] = (o2 >>> 16) & 63),
    (n2[i2++] = (o2 >>> 22) & 63),
    (n2[i2++] = ((o2 >>> 28) | ((s2 & 3) << 4)) & 63),
    (n2[i2++] = (s2 >>> 2) & 63),
    (n2[i2++] = (s2 >>> 8) & 63),
    (n2[i2++] = (s2 >>> 14) & 63),
    (n2[i2++] = (s2 >>> 20) & 63),
    (n2[i2++] = (s2 >>> 26) & 63),
    (n2[i2++] = (c2 >>> 0) & 63),
    (n2[i2++] = (c2 >>> 6) & 63),
    (n2[i2++] = (c2 >>> 12) & 63),
    (n2[i2++] = (c2 >>> 18) & 63),
    (n2[i2++] = (c2 >>> 24) & 63),
    (n2[i2++] = ((c2 >>> 30) | ((l2 & 15) << 2)) & 63),
    (n2[i2++] = (l2 >>> 4) & 63),
    (n2[i2++] = (l2 >>> 10) & 63),
    (n2[i2++] = (l2 >>> 16) & 63),
    (n2[i2++] = (l2 >>> 22) & 63),
    (n2[i2++] = ((l2 >>> 28) | ((u2 & 3) << 4)) & 63),
    (n2[i2++] = (u2 >>> 2) & 63),
    (n2[i2++] = (u2 >>> 8) & 63),
    (n2[i2++] = (u2 >>> 14) & 63),
    (n2[i2++] = (u2 >>> 20) & 63),
    (n2[i2] = (u2 >>> 26) & 63))
}
function By(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = e52[t2] >>> 0,
    o2 = e52[t2 + 1] >>> 0,
    s2 = e52[t2 + 2] >>> 0,
    c2 = e52[t2 + 3] >>> 0,
    l2 = e52[t2 + 4] >>> 0,
    u2 = e52[t2 + 5] >>> 0,
    d2 = e52[t2 + 6] >>> 0
  ;((n2[i2++] = (a2 >>> 0) & 127),
    (n2[i2++] = (a2 >>> 7) & 127),
    (n2[i2++] = (a2 >>> 14) & 127),
    (n2[i2++] = (a2 >>> 21) & 127),
    (n2[i2++] = ((a2 >>> 28) | ((o2 & 7) << 4)) & 127),
    (n2[i2++] = (o2 >>> 3) & 127),
    (n2[i2++] = (o2 >>> 10) & 127),
    (n2[i2++] = (o2 >>> 17) & 127),
    (n2[i2++] = (o2 >>> 24) & 127),
    (n2[i2++] = ((o2 >>> 31) | ((s2 & 63) << 1)) & 127),
    (n2[i2++] = (s2 >>> 6) & 127),
    (n2[i2++] = (s2 >>> 13) & 127),
    (n2[i2++] = (s2 >>> 20) & 127),
    (n2[i2++] = ((s2 >>> 27) | ((c2 & 3) << 5)) & 127),
    (n2[i2++] = (c2 >>> 2) & 127),
    (n2[i2++] = (c2 >>> 9) & 127),
    (n2[i2++] = (c2 >>> 16) & 127),
    (n2[i2++] = (c2 >>> 23) & 127),
    (n2[i2++] = ((c2 >>> 30) | ((l2 & 31) << 2)) & 127),
    (n2[i2++] = (l2 >>> 5) & 127),
    (n2[i2++] = (l2 >>> 12) & 127),
    (n2[i2++] = (l2 >>> 19) & 127),
    (n2[i2++] = ((l2 >>> 26) | ((u2 & 1) << 6)) & 127),
    (n2[i2++] = (u2 >>> 1) & 127),
    (n2[i2++] = (u2 >>> 8) & 127),
    (n2[i2++] = (u2 >>> 15) & 127),
    (n2[i2++] = (u2 >>> 22) & 127),
    (n2[i2++] = ((u2 >>> 29) | ((d2 & 15) << 3)) & 127),
    (n2[i2++] = (d2 >>> 4) & 127),
    (n2[i2++] = (d2 >>> 11) & 127),
    (n2[i2++] = (d2 >>> 18) & 127),
    (n2[i2] = (d2 >>> 25) & 127))
}
function Vy(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = e52[t2] >>> 0,
    o2 = e52[t2 + 1] >>> 0,
    s2 = e52[t2 + 2] >>> 0,
    c2 = e52[t2 + 3] >>> 0,
    l2 = e52[t2 + 4] >>> 0,
    u2 = e52[t2 + 5] >>> 0,
    d2 = e52[t2 + 6] >>> 0,
    f2 = e52[t2 + 7] >>> 0
  ;((n2[i2++] = (a2 >>> 0) & 255),
    (n2[i2++] = (a2 >>> 8) & 255),
    (n2[i2++] = (a2 >>> 16) & 255),
    (n2[i2++] = (a2 >>> 24) & 255),
    (n2[i2++] = (o2 >>> 0) & 255),
    (n2[i2++] = (o2 >>> 8) & 255),
    (n2[i2++] = (o2 >>> 16) & 255),
    (n2[i2++] = (o2 >>> 24) & 255),
    (n2[i2++] = (s2 >>> 0) & 255),
    (n2[i2++] = (s2 >>> 8) & 255),
    (n2[i2++] = (s2 >>> 16) & 255),
    (n2[i2++] = (s2 >>> 24) & 255),
    (n2[i2++] = (c2 >>> 0) & 255),
    (n2[i2++] = (c2 >>> 8) & 255),
    (n2[i2++] = (c2 >>> 16) & 255),
    (n2[i2++] = (c2 >>> 24) & 255),
    (n2[i2++] = (l2 >>> 0) & 255),
    (n2[i2++] = (l2 >>> 8) & 255),
    (n2[i2++] = (l2 >>> 16) & 255),
    (n2[i2++] = (l2 >>> 24) & 255),
    (n2[i2++] = (u2 >>> 0) & 255),
    (n2[i2++] = (u2 >>> 8) & 255),
    (n2[i2++] = (u2 >>> 16) & 255),
    (n2[i2++] = (u2 >>> 24) & 255),
    (n2[i2++] = (d2 >>> 0) & 255),
    (n2[i2++] = (d2 >>> 8) & 255),
    (n2[i2++] = (d2 >>> 16) & 255),
    (n2[i2++] = (d2 >>> 24) & 255),
    (n2[i2++] = (f2 >>> 0) & 255),
    (n2[i2++] = (f2 >>> 8) & 255),
    (n2[i2++] = (f2 >>> 16) & 255),
    (n2[i2] = (f2 >>> 24) & 255))
}
function Hy(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = e52[t2] >>> 0,
    o2 = e52[t2 + 1] >>> 0,
    s2 = e52[t2 + 2] >>> 0,
    c2 = e52[t2 + 3] >>> 0,
    l2 = e52[t2 + 4] >>> 0,
    u2 = e52[t2 + 5] >>> 0,
    d2 = e52[t2 + 6] >>> 0,
    f2 = e52[t2 + 7] >>> 0,
    p2 = e52[t2 + 8] >>> 0
  ;((n2[i2++] = (a2 >>> 0) & 511),
    (n2[i2++] = (a2 >>> 9) & 511),
    (n2[i2++] = (a2 >>> 18) & 511),
    (n2[i2++] = ((a2 >>> 27) | ((o2 & 15) << 5)) & 511),
    (n2[i2++] = (o2 >>> 4) & 511),
    (n2[i2++] = (o2 >>> 13) & 511),
    (n2[i2++] = (o2 >>> 22) & 511),
    (n2[i2++] = ((o2 >>> 31) | ((s2 & 255) << 1)) & 511),
    (n2[i2++] = (s2 >>> 8) & 511),
    (n2[i2++] = (s2 >>> 17) & 511),
    (n2[i2++] = ((s2 >>> 26) | ((c2 & 7) << 6)) & 511),
    (n2[i2++] = (c2 >>> 3) & 511),
    (n2[i2++] = (c2 >>> 12) & 511),
    (n2[i2++] = (c2 >>> 21) & 511),
    (n2[i2++] = ((c2 >>> 30) | ((l2 & 127) << 2)) & 511),
    (n2[i2++] = (l2 >>> 7) & 511),
    (n2[i2++] = (l2 >>> 16) & 511),
    (n2[i2++] = ((l2 >>> 25) | ((u2 & 3) << 7)) & 511),
    (n2[i2++] = (u2 >>> 2) & 511),
    (n2[i2++] = (u2 >>> 11) & 511),
    (n2[i2++] = (u2 >>> 20) & 511),
    (n2[i2++] = ((u2 >>> 29) | ((d2 & 63) << 3)) & 511),
    (n2[i2++] = (d2 >>> 6) & 511),
    (n2[i2++] = (d2 >>> 15) & 511),
    (n2[i2++] = ((d2 >>> 24) | ((f2 & 1) << 8)) & 511),
    (n2[i2++] = (f2 >>> 1) & 511),
    (n2[i2++] = (f2 >>> 10) & 511),
    (n2[i2++] = (f2 >>> 19) & 511),
    (n2[i2++] = ((f2 >>> 28) | ((p2 & 31) << 4)) & 511),
    (n2[i2++] = (p2 >>> 5) & 511),
    (n2[i2++] = (p2 >>> 14) & 511),
    (n2[i2] = (p2 >>> 23) & 511))
}
function Uy(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = e52[t2] >>> 0,
    o2 = e52[t2 + 1] >>> 0,
    s2 = e52[t2 + 2] >>> 0,
    c2 = e52[t2 + 3] >>> 0,
    l2 = e52[t2 + 4] >>> 0,
    u2 = e52[t2 + 5] >>> 0,
    d2 = e52[t2 + 6] >>> 0,
    f2 = e52[t2 + 7] >>> 0,
    p2 = e52[t2 + 8] >>> 0,
    m2 = e52[t2 + 9] >>> 0
  ;((n2[i2++] = (a2 >>> 0) & 1023),
    (n2[i2++] = (a2 >>> 10) & 1023),
    (n2[i2++] = (a2 >>> 20) & 1023),
    (n2[i2++] = ((a2 >>> 30) | ((o2 & 255) << 2)) & 1023),
    (n2[i2++] = (o2 >>> 8) & 1023),
    (n2[i2++] = (o2 >>> 18) & 1023),
    (n2[i2++] = ((o2 >>> 28) | ((s2 & 63) << 4)) & 1023),
    (n2[i2++] = (s2 >>> 6) & 1023),
    (n2[i2++] = (s2 >>> 16) & 1023),
    (n2[i2++] = ((s2 >>> 26) | ((c2 & 15) << 6)) & 1023),
    (n2[i2++] = (c2 >>> 4) & 1023),
    (n2[i2++] = (c2 >>> 14) & 1023),
    (n2[i2++] = ((c2 >>> 24) | ((l2 & 3) << 8)) & 1023),
    (n2[i2++] = (l2 >>> 2) & 1023),
    (n2[i2++] = (l2 >>> 12) & 1023),
    (n2[i2++] = (l2 >>> 22) & 1023),
    (n2[i2++] = (u2 >>> 0) & 1023),
    (n2[i2++] = (u2 >>> 10) & 1023),
    (n2[i2++] = (u2 >>> 20) & 1023),
    (n2[i2++] = ((u2 >>> 30) | ((d2 & 255) << 2)) & 1023),
    (n2[i2++] = (d2 >>> 8) & 1023),
    (n2[i2++] = (d2 >>> 18) & 1023),
    (n2[i2++] = ((d2 >>> 28) | ((f2 & 63) << 4)) & 1023),
    (n2[i2++] = (f2 >>> 6) & 1023),
    (n2[i2++] = (f2 >>> 16) & 1023),
    (n2[i2++] = ((f2 >>> 26) | ((p2 & 15) << 6)) & 1023),
    (n2[i2++] = (p2 >>> 4) & 1023),
    (n2[i2++] = (p2 >>> 14) & 1023),
    (n2[i2++] = ((p2 >>> 24) | ((m2 & 3) << 8)) & 1023),
    (n2[i2++] = (m2 >>> 2) & 1023),
    (n2[i2++] = (m2 >>> 12) & 1023),
    (n2[i2] = (m2 >>> 22) & 1023))
}
function Wy(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = e52[t2] >>> 0,
    o2 = e52[t2 + 1] >>> 0,
    s2 = e52[t2 + 2] >>> 0,
    c2 = e52[t2 + 3] >>> 0,
    l2 = e52[t2 + 4] >>> 0,
    u2 = e52[t2 + 5] >>> 0,
    d2 = e52[t2 + 6] >>> 0,
    f2 = e52[t2 + 7] >>> 0,
    p2 = e52[t2 + 8] >>> 0,
    m2 = e52[t2 + 9] >>> 0,
    h2 = e52[t2 + 10] >>> 0
  ;((n2[i2++] = (a2 >>> 0) & 2047),
    (n2[i2++] = (a2 >>> 11) & 2047),
    (n2[i2++] = ((a2 >>> 22) | ((o2 & 1) << 10)) & 2047),
    (n2[i2++] = (o2 >>> 1) & 2047),
    (n2[i2++] = (o2 >>> 12) & 2047),
    (n2[i2++] = ((o2 >>> 23) | ((s2 & 3) << 9)) & 2047),
    (n2[i2++] = (s2 >>> 2) & 2047),
    (n2[i2++] = (s2 >>> 13) & 2047),
    (n2[i2++] = ((s2 >>> 24) | ((c2 & 7) << 8)) & 2047),
    (n2[i2++] = (c2 >>> 3) & 2047),
    (n2[i2++] = (c2 >>> 14) & 2047),
    (n2[i2++] = ((c2 >>> 25) | ((l2 & 15) << 7)) & 2047),
    (n2[i2++] = (l2 >>> 4) & 2047),
    (n2[i2++] = (l2 >>> 15) & 2047),
    (n2[i2++] = ((l2 >>> 26) | ((u2 & 31) << 6)) & 2047),
    (n2[i2++] = (u2 >>> 5) & 2047),
    (n2[i2++] = (u2 >>> 16) & 2047),
    (n2[i2++] = ((u2 >>> 27) | ((d2 & 63) << 5)) & 2047),
    (n2[i2++] = (d2 >>> 6) & 2047),
    (n2[i2++] = (d2 >>> 17) & 2047),
    (n2[i2++] = ((d2 >>> 28) | ((f2 & 127) << 4)) & 2047),
    (n2[i2++] = (f2 >>> 7) & 2047),
    (n2[i2++] = (f2 >>> 18) & 2047),
    (n2[i2++] = ((f2 >>> 29) | ((p2 & 255) << 3)) & 2047),
    (n2[i2++] = (p2 >>> 8) & 2047),
    (n2[i2++] = (p2 >>> 19) & 2047),
    (n2[i2++] = ((p2 >>> 30) | ((m2 & 511) << 2)) & 2047),
    (n2[i2++] = (m2 >>> 9) & 2047),
    (n2[i2++] = (m2 >>> 20) & 2047),
    (n2[i2++] = ((m2 >>> 31) | ((h2 & 1023) << 1)) & 2047),
    (n2[i2++] = (h2 >>> 10) & 2047),
    (n2[i2] = (h2 >>> 21) & 2047))
}
function Gy(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = e52[t2] >>> 0,
    o2 = e52[t2 + 1] >>> 0,
    s2 = e52[t2 + 2] >>> 0,
    c2 = e52[t2 + 3] >>> 0,
    l2 = e52[t2 + 4] >>> 0,
    u2 = e52[t2 + 5] >>> 0,
    d2 = e52[t2 + 6] >>> 0,
    f2 = e52[t2 + 7] >>> 0,
    p2 = e52[t2 + 8] >>> 0,
    m2 = e52[t2 + 9] >>> 0,
    h2 = e52[t2 + 10] >>> 0,
    g2 = e52[t2 + 11] >>> 0
  ;((n2[i2++] = (a2 >>> 0) & 4095),
    (n2[i2++] = (a2 >>> 12) & 4095),
    (n2[i2++] = ((a2 >>> 24) | ((o2 & 15) << 8)) & 4095),
    (n2[i2++] = (o2 >>> 4) & 4095),
    (n2[i2++] = (o2 >>> 16) & 4095),
    (n2[i2++] = ((o2 >>> 28) | ((s2 & 255) << 4)) & 4095),
    (n2[i2++] = (s2 >>> 8) & 4095),
    (n2[i2++] = (s2 >>> 20) & 4095),
    (n2[i2++] = (c2 >>> 0) & 4095),
    (n2[i2++] = (c2 >>> 12) & 4095),
    (n2[i2++] = ((c2 >>> 24) | ((l2 & 15) << 8)) & 4095),
    (n2[i2++] = (l2 >>> 4) & 4095),
    (n2[i2++] = (l2 >>> 16) & 4095),
    (n2[i2++] = ((l2 >>> 28) | ((u2 & 255) << 4)) & 4095),
    (n2[i2++] = (u2 >>> 8) & 4095),
    (n2[i2++] = (u2 >>> 20) & 4095),
    (n2[i2++] = (d2 >>> 0) & 4095),
    (n2[i2++] = (d2 >>> 12) & 4095),
    (n2[i2++] = ((d2 >>> 24) | ((f2 & 15) << 8)) & 4095),
    (n2[i2++] = (f2 >>> 4) & 4095),
    (n2[i2++] = (f2 >>> 16) & 4095),
    (n2[i2++] = ((f2 >>> 28) | ((p2 & 255) << 4)) & 4095),
    (n2[i2++] = (p2 >>> 8) & 4095),
    (n2[i2++] = (p2 >>> 20) & 4095),
    (n2[i2++] = (m2 >>> 0) & 4095),
    (n2[i2++] = (m2 >>> 12) & 4095),
    (n2[i2++] = ((m2 >>> 24) | ((h2 & 15) << 8)) & 4095),
    (n2[i2++] = (h2 >>> 4) & 4095),
    (n2[i2++] = (h2 >>> 16) & 4095),
    (n2[i2++] = ((h2 >>> 28) | ((g2 & 255) << 4)) & 4095),
    (n2[i2++] = (g2 >>> 8) & 4095),
    (n2[i2] = (g2 >>> 20) & 4095))
}
function Ky(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = e52[t2] >>> 0,
    o2 = e52[t2 + 1] >>> 0,
    s2 = e52[t2 + 2] >>> 0,
    c2 = e52[t2 + 3] >>> 0,
    l2 = e52[t2 + 4] >>> 0,
    u2 = e52[t2 + 5] >>> 0,
    d2 = e52[t2 + 6] >>> 0,
    f2 = e52[t2 + 7] >>> 0,
    p2 = e52[t2 + 8] >>> 0,
    m2 = e52[t2 + 9] >>> 0,
    h2 = e52[t2 + 10] >>> 0,
    g2 = e52[t2 + 11] >>> 0,
    _2 = e52[t2 + 12] >>> 0,
    v2 = e52[t2 + 13] >>> 0,
    y2 = e52[t2 + 14] >>> 0,
    b2 = e52[t2 + 15] >>> 0
  ;((n2[i2++] = (a2 >>> 0) & 65535),
    (n2[i2++] = (a2 >>> 16) & 65535),
    (n2[i2++] = (o2 >>> 0) & 65535),
    (n2[i2++] = (o2 >>> 16) & 65535),
    (n2[i2++] = (s2 >>> 0) & 65535),
    (n2[i2++] = (s2 >>> 16) & 65535),
    (n2[i2++] = (c2 >>> 0) & 65535),
    (n2[i2++] = (c2 >>> 16) & 65535),
    (n2[i2++] = (l2 >>> 0) & 65535),
    (n2[i2++] = (l2 >>> 16) & 65535),
    (n2[i2++] = (u2 >>> 0) & 65535),
    (n2[i2++] = (u2 >>> 16) & 65535),
    (n2[i2++] = (d2 >>> 0) & 65535),
    (n2[i2++] = (d2 >>> 16) & 65535),
    (n2[i2++] = (f2 >>> 0) & 65535),
    (n2[i2++] = (f2 >>> 16) & 65535),
    (n2[i2++] = (p2 >>> 0) & 65535),
    (n2[i2++] = (p2 >>> 16) & 65535),
    (n2[i2++] = (m2 >>> 0) & 65535),
    (n2[i2++] = (m2 >>> 16) & 65535),
    (n2[i2++] = (h2 >>> 0) & 65535),
    (n2[i2++] = (h2 >>> 16) & 65535),
    (n2[i2++] = (g2 >>> 0) & 65535),
    (n2[i2++] = (g2 >>> 16) & 65535),
    (n2[i2++] = (_2 >>> 0) & 65535),
    (n2[i2++] = (_2 >>> 16) & 65535),
    (n2[i2++] = (v2 >>> 0) & 65535),
    (n2[i2++] = (v2 >>> 16) & 65535),
    (n2[i2++] = (y2 >>> 0) & 65535),
    (n2[i2++] = (y2 >>> 16) & 65535),
    (n2[i2++] = (b2 >>> 0) & 65535),
    (n2[i2] = (b2 >>> 16) & 65535))
}
function qy(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = t2
  for (let t3 = 0; t3 < 8; t3++) {
    let t4 = e52[a2++] >>> 0
    ;((n2[i2++] = (t4 >>> 0) & 1),
      (n2[i2++] = (t4 >>> 1) & 1),
      (n2[i2++] = (t4 >>> 2) & 1),
      (n2[i2++] = (t4 >>> 3) & 1),
      (n2[i2++] = (t4 >>> 4) & 1),
      (n2[i2++] = (t4 >>> 5) & 1),
      (n2[i2++] = (t4 >>> 6) & 1),
      (n2[i2++] = (t4 >>> 7) & 1),
      (n2[i2++] = (t4 >>> 8) & 1),
      (n2[i2++] = (t4 >>> 9) & 1),
      (n2[i2++] = (t4 >>> 10) & 1),
      (n2[i2++] = (t4 >>> 11) & 1),
      (n2[i2++] = (t4 >>> 12) & 1),
      (n2[i2++] = (t4 >>> 13) & 1),
      (n2[i2++] = (t4 >>> 14) & 1),
      (n2[i2++] = (t4 >>> 15) & 1),
      (n2[i2++] = (t4 >>> 16) & 1),
      (n2[i2++] = (t4 >>> 17) & 1),
      (n2[i2++] = (t4 >>> 18) & 1),
      (n2[i2++] = (t4 >>> 19) & 1),
      (n2[i2++] = (t4 >>> 20) & 1),
      (n2[i2++] = (t4 >>> 21) & 1),
      (n2[i2++] = (t4 >>> 22) & 1),
      (n2[i2++] = (t4 >>> 23) & 1),
      (n2[i2++] = (t4 >>> 24) & 1),
      (n2[i2++] = (t4 >>> 25) & 1),
      (n2[i2++] = (t4 >>> 26) & 1),
      (n2[i2++] = (t4 >>> 27) & 1),
      (n2[i2++] = (t4 >>> 28) & 1),
      (n2[i2++] = (t4 >>> 29) & 1),
      (n2[i2++] = (t4 >>> 30) & 1),
      (n2[i2++] = (t4 >>> 31) & 1))
  }
}
function Jy(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = t2
  for (let t3 = 0; t3 < 8; t3++) {
    let t4 = e52[a2++] >>> 0,
      r3 = e52[a2++] >>> 0
    ;((n2[i2++] = (t4 >>> 0) & 3),
      (n2[i2++] = (t4 >>> 2) & 3),
      (n2[i2++] = (t4 >>> 4) & 3),
      (n2[i2++] = (t4 >>> 6) & 3),
      (n2[i2++] = (t4 >>> 8) & 3),
      (n2[i2++] = (t4 >>> 10) & 3),
      (n2[i2++] = (t4 >>> 12) & 3),
      (n2[i2++] = (t4 >>> 14) & 3),
      (n2[i2++] = (t4 >>> 16) & 3),
      (n2[i2++] = (t4 >>> 18) & 3),
      (n2[i2++] = (t4 >>> 20) & 3),
      (n2[i2++] = (t4 >>> 22) & 3),
      (n2[i2++] = (t4 >>> 24) & 3),
      (n2[i2++] = (t4 >>> 26) & 3),
      (n2[i2++] = (t4 >>> 28) & 3),
      (n2[i2++] = (t4 >>> 30) & 3),
      (n2[i2++] = (r3 >>> 0) & 3),
      (n2[i2++] = (r3 >>> 2) & 3),
      (n2[i2++] = (r3 >>> 4) & 3),
      (n2[i2++] = (r3 >>> 6) & 3),
      (n2[i2++] = (r3 >>> 8) & 3),
      (n2[i2++] = (r3 >>> 10) & 3),
      (n2[i2++] = (r3 >>> 12) & 3),
      (n2[i2++] = (r3 >>> 14) & 3),
      (n2[i2++] = (r3 >>> 16) & 3),
      (n2[i2++] = (r3 >>> 18) & 3),
      (n2[i2++] = (r3 >>> 20) & 3),
      (n2[i2++] = (r3 >>> 22) & 3),
      (n2[i2++] = (r3 >>> 24) & 3),
      (n2[i2++] = (r3 >>> 26) & 3),
      (n2[i2++] = (r3 >>> 28) & 3),
      (n2[i2++] = (r3 >>> 30) & 3))
  }
}
function Yy(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = t2
  for (let t3 = 0; t3 < 8; t3++) {
    let t4 = e52[a2++] >>> 0,
      r3 = e52[a2++] >>> 0,
      o2 = e52[a2++] >>> 0
    ;((n2[i2++] = (t4 >>> 0) & 7),
      (n2[i2++] = (t4 >>> 3) & 7),
      (n2[i2++] = (t4 >>> 6) & 7),
      (n2[i2++] = (t4 >>> 9) & 7),
      (n2[i2++] = (t4 >>> 12) & 7),
      (n2[i2++] = (t4 >>> 15) & 7),
      (n2[i2++] = (t4 >>> 18) & 7),
      (n2[i2++] = (t4 >>> 21) & 7),
      (n2[i2++] = (t4 >>> 24) & 7),
      (n2[i2++] = (t4 >>> 27) & 7),
      (n2[i2++] = ((t4 >>> 30) | ((r3 & 1) << 2)) & 7),
      (n2[i2++] = (r3 >>> 1) & 7),
      (n2[i2++] = (r3 >>> 4) & 7),
      (n2[i2++] = (r3 >>> 7) & 7),
      (n2[i2++] = (r3 >>> 10) & 7),
      (n2[i2++] = (r3 >>> 13) & 7),
      (n2[i2++] = (r3 >>> 16) & 7),
      (n2[i2++] = (r3 >>> 19) & 7),
      (n2[i2++] = (r3 >>> 22) & 7),
      (n2[i2++] = (r3 >>> 25) & 7),
      (n2[i2++] = (r3 >>> 28) & 7),
      (n2[i2++] = ((r3 >>> 31) | ((o2 & 3) << 1)) & 7),
      (n2[i2++] = (o2 >>> 2) & 7),
      (n2[i2++] = (o2 >>> 5) & 7),
      (n2[i2++] = (o2 >>> 8) & 7),
      (n2[i2++] = (o2 >>> 11) & 7),
      (n2[i2++] = (o2 >>> 14) & 7),
      (n2[i2++] = (o2 >>> 17) & 7),
      (n2[i2++] = (o2 >>> 20) & 7),
      (n2[i2++] = (o2 >>> 23) & 7),
      (n2[i2++] = (o2 >>> 26) & 7),
      (n2[i2++] = (o2 >>> 29) & 7))
  }
}
function Xy(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = t2
  for (let t3 = 0; t3 < 8; t3++) {
    let t4 = e52[a2++] >>> 0,
      r3 = e52[a2++] >>> 0,
      o2 = e52[a2++] >>> 0,
      s2 = e52[a2++] >>> 0
    ;((n2[i2++] = (t4 >>> 0) & 15),
      (n2[i2++] = (t4 >>> 4) & 15),
      (n2[i2++] = (t4 >>> 8) & 15),
      (n2[i2++] = (t4 >>> 12) & 15),
      (n2[i2++] = (t4 >>> 16) & 15),
      (n2[i2++] = (t4 >>> 20) & 15),
      (n2[i2++] = (t4 >>> 24) & 15),
      (n2[i2++] = (t4 >>> 28) & 15),
      (n2[i2++] = (r3 >>> 0) & 15),
      (n2[i2++] = (r3 >>> 4) & 15),
      (n2[i2++] = (r3 >>> 8) & 15),
      (n2[i2++] = (r3 >>> 12) & 15),
      (n2[i2++] = (r3 >>> 16) & 15),
      (n2[i2++] = (r3 >>> 20) & 15),
      (n2[i2++] = (r3 >>> 24) & 15),
      (n2[i2++] = (r3 >>> 28) & 15),
      (n2[i2++] = (o2 >>> 0) & 15),
      (n2[i2++] = (o2 >>> 4) & 15),
      (n2[i2++] = (o2 >>> 8) & 15),
      (n2[i2++] = (o2 >>> 12) & 15),
      (n2[i2++] = (o2 >>> 16) & 15),
      (n2[i2++] = (o2 >>> 20) & 15),
      (n2[i2++] = (o2 >>> 24) & 15),
      (n2[i2++] = (o2 >>> 28) & 15),
      (n2[i2++] = (s2 >>> 0) & 15),
      (n2[i2++] = (s2 >>> 4) & 15),
      (n2[i2++] = (s2 >>> 8) & 15),
      (n2[i2++] = (s2 >>> 12) & 15),
      (n2[i2++] = (s2 >>> 16) & 15),
      (n2[i2++] = (s2 >>> 20) & 15),
      (n2[i2++] = (s2 >>> 24) & 15),
      (n2[i2++] = (s2 >>> 28) & 15))
  }
}
function Zy(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = t2
  for (let t3 = 0; t3 < 8; t3++) {
    let t4 = e52[a2++] >>> 0,
      r3 = e52[a2++] >>> 0,
      o2 = e52[a2++] >>> 0,
      s2 = e52[a2++] >>> 0,
      c2 = e52[a2++] >>> 0
    ;((n2[i2++] = (t4 >>> 0) & 31),
      (n2[i2++] = (t4 >>> 5) & 31),
      (n2[i2++] = (t4 >>> 10) & 31),
      (n2[i2++] = (t4 >>> 15) & 31),
      (n2[i2++] = (t4 >>> 20) & 31),
      (n2[i2++] = (t4 >>> 25) & 31),
      (n2[i2++] = ((t4 >>> 30) | ((r3 & 7) << 2)) & 31),
      (n2[i2++] = (r3 >>> 3) & 31),
      (n2[i2++] = (r3 >>> 8) & 31),
      (n2[i2++] = (r3 >>> 13) & 31),
      (n2[i2++] = (r3 >>> 18) & 31),
      (n2[i2++] = (r3 >>> 23) & 31),
      (n2[i2++] = ((r3 >>> 28) | ((o2 & 1) << 4)) & 31),
      (n2[i2++] = (o2 >>> 1) & 31),
      (n2[i2++] = (o2 >>> 6) & 31),
      (n2[i2++] = (o2 >>> 11) & 31),
      (n2[i2++] = (o2 >>> 16) & 31),
      (n2[i2++] = (o2 >>> 21) & 31),
      (n2[i2++] = (o2 >>> 26) & 31),
      (n2[i2++] = ((o2 >>> 31) | ((s2 & 15) << 1)) & 31),
      (n2[i2++] = (s2 >>> 4) & 31),
      (n2[i2++] = (s2 >>> 9) & 31),
      (n2[i2++] = (s2 >>> 14) & 31),
      (n2[i2++] = (s2 >>> 19) & 31),
      (n2[i2++] = (s2 >>> 24) & 31),
      (n2[i2++] = ((s2 >>> 29) | ((c2 & 3) << 3)) & 31),
      (n2[i2++] = (c2 >>> 2) & 31),
      (n2[i2++] = (c2 >>> 7) & 31),
      (n2[i2++] = (c2 >>> 12) & 31),
      (n2[i2++] = (c2 >>> 17) & 31),
      (n2[i2++] = (c2 >>> 22) & 31),
      (n2[i2++] = (c2 >>> 27) & 31))
  }
}
function Qy(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = t2
  for (let t3 = 0; t3 < 8; t3++) {
    let t4 = e52[a2++] >>> 0,
      r3 = e52[a2++] >>> 0,
      o2 = e52[a2++] >>> 0,
      s2 = e52[a2++] >>> 0,
      c2 = e52[a2++] >>> 0,
      l2 = e52[a2++] >>> 0
    ;((n2[i2++] = (t4 >>> 0) & 63),
      (n2[i2++] = (t4 >>> 6) & 63),
      (n2[i2++] = (t4 >>> 12) & 63),
      (n2[i2++] = (t4 >>> 18) & 63),
      (n2[i2++] = (t4 >>> 24) & 63),
      (n2[i2++] = ((t4 >>> 30) | ((r3 & 15) << 2)) & 63),
      (n2[i2++] = (r3 >>> 4) & 63),
      (n2[i2++] = (r3 >>> 10) & 63),
      (n2[i2++] = (r3 >>> 16) & 63),
      (n2[i2++] = (r3 >>> 22) & 63),
      (n2[i2++] = ((r3 >>> 28) | ((o2 & 3) << 4)) & 63),
      (n2[i2++] = (o2 >>> 2) & 63),
      (n2[i2++] = (o2 >>> 8) & 63),
      (n2[i2++] = (o2 >>> 14) & 63),
      (n2[i2++] = (o2 >>> 20) & 63),
      (n2[i2++] = (o2 >>> 26) & 63),
      (n2[i2++] = (s2 >>> 0) & 63),
      (n2[i2++] = (s2 >>> 6) & 63),
      (n2[i2++] = (s2 >>> 12) & 63),
      (n2[i2++] = (s2 >>> 18) & 63),
      (n2[i2++] = (s2 >>> 24) & 63),
      (n2[i2++] = ((s2 >>> 30) | ((c2 & 15) << 2)) & 63),
      (n2[i2++] = (c2 >>> 4) & 63),
      (n2[i2++] = (c2 >>> 10) & 63),
      (n2[i2++] = (c2 >>> 16) & 63),
      (n2[i2++] = (c2 >>> 22) & 63),
      (n2[i2++] = ((c2 >>> 28) | ((l2 & 3) << 4)) & 63),
      (n2[i2++] = (l2 >>> 2) & 63),
      (n2[i2++] = (l2 >>> 8) & 63),
      (n2[i2++] = (l2 >>> 14) & 63),
      (n2[i2++] = (l2 >>> 20) & 63),
      (n2[i2++] = (l2 >>> 26) & 63))
  }
}
function $y(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = t2
  for (let t3 = 0; t3 < 8; t3++) {
    let t4 = e52[a2++] >>> 0,
      r3 = e52[a2++] >>> 0,
      o2 = e52[a2++] >>> 0,
      s2 = e52[a2++] >>> 0,
      c2 = e52[a2++] >>> 0,
      l2 = e52[a2++] >>> 0,
      u2 = e52[a2++] >>> 0
    ;((n2[i2++] = (t4 >>> 0) & 127),
      (n2[i2++] = (t4 >>> 7) & 127),
      (n2[i2++] = (t4 >>> 14) & 127),
      (n2[i2++] = (t4 >>> 21) & 127),
      (n2[i2++] = ((t4 >>> 28) | ((r3 & 7) << 4)) & 127),
      (n2[i2++] = (r3 >>> 3) & 127),
      (n2[i2++] = (r3 >>> 10) & 127),
      (n2[i2++] = (r3 >>> 17) & 127),
      (n2[i2++] = (r3 >>> 24) & 127),
      (n2[i2++] = ((r3 >>> 31) | ((o2 & 63) << 1)) & 127),
      (n2[i2++] = (o2 >>> 6) & 127),
      (n2[i2++] = (o2 >>> 13) & 127),
      (n2[i2++] = (o2 >>> 20) & 127),
      (n2[i2++] = ((o2 >>> 27) | ((s2 & 3) << 5)) & 127),
      (n2[i2++] = (s2 >>> 2) & 127),
      (n2[i2++] = (s2 >>> 9) & 127),
      (n2[i2++] = (s2 >>> 16) & 127),
      (n2[i2++] = (s2 >>> 23) & 127),
      (n2[i2++] = ((s2 >>> 30) | ((c2 & 31) << 2)) & 127),
      (n2[i2++] = (c2 >>> 5) & 127),
      (n2[i2++] = (c2 >>> 12) & 127),
      (n2[i2++] = (c2 >>> 19) & 127),
      (n2[i2++] = ((c2 >>> 26) | ((l2 & 1) << 6)) & 127),
      (n2[i2++] = (l2 >>> 1) & 127),
      (n2[i2++] = (l2 >>> 8) & 127),
      (n2[i2++] = (l2 >>> 15) & 127),
      (n2[i2++] = (l2 >>> 22) & 127),
      (n2[i2++] = ((l2 >>> 29) | ((u2 & 15) << 3)) & 127),
      (n2[i2++] = (u2 >>> 4) & 127),
      (n2[i2++] = (u2 >>> 11) & 127),
      (n2[i2++] = (u2 >>> 18) & 127),
      (n2[i2++] = (u2 >>> 25) & 127))
  }
}
function eb(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = t2
  for (let t3 = 0; t3 < 8; t3++) {
    let t4 = e52[a2++] >>> 0,
      r3 = e52[a2++] >>> 0,
      o2 = e52[a2++] >>> 0,
      s2 = e52[a2++] >>> 0,
      c2 = e52[a2++] >>> 0,
      l2 = e52[a2++] >>> 0,
      u2 = e52[a2++] >>> 0,
      d2 = e52[a2++] >>> 0
    ;((n2[i2++] = (t4 >>> 0) & 255),
      (n2[i2++] = (t4 >>> 8) & 255),
      (n2[i2++] = (t4 >>> 16) & 255),
      (n2[i2++] = (t4 >>> 24) & 255),
      (n2[i2++] = (r3 >>> 0) & 255),
      (n2[i2++] = (r3 >>> 8) & 255),
      (n2[i2++] = (r3 >>> 16) & 255),
      (n2[i2++] = (r3 >>> 24) & 255),
      (n2[i2++] = (o2 >>> 0) & 255),
      (n2[i2++] = (o2 >>> 8) & 255),
      (n2[i2++] = (o2 >>> 16) & 255),
      (n2[i2++] = (o2 >>> 24) & 255),
      (n2[i2++] = (s2 >>> 0) & 255),
      (n2[i2++] = (s2 >>> 8) & 255),
      (n2[i2++] = (s2 >>> 16) & 255),
      (n2[i2++] = (s2 >>> 24) & 255),
      (n2[i2++] = (c2 >>> 0) & 255),
      (n2[i2++] = (c2 >>> 8) & 255),
      (n2[i2++] = (c2 >>> 16) & 255),
      (n2[i2++] = (c2 >>> 24) & 255),
      (n2[i2++] = (l2 >>> 0) & 255),
      (n2[i2++] = (l2 >>> 8) & 255),
      (n2[i2++] = (l2 >>> 16) & 255),
      (n2[i2++] = (l2 >>> 24) & 255),
      (n2[i2++] = (u2 >>> 0) & 255),
      (n2[i2++] = (u2 >>> 8) & 255),
      (n2[i2++] = (u2 >>> 16) & 255),
      (n2[i2++] = (u2 >>> 24) & 255),
      (n2[i2++] = (d2 >>> 0) & 255),
      (n2[i2++] = (d2 >>> 8) & 255),
      (n2[i2++] = (d2 >>> 16) & 255),
      (n2[i2++] = (d2 >>> 24) & 255))
  }
}
function tb(e52, t2, n2, r2) {
  let i2 = r2,
    a2 = t2
  for (let t3 = 0; t3 < 128; t3++) {
    let t4 = e52[a2++] >>> 0
    ;((n2[i2++] = t4 & 65535), (n2[i2++] = (t4 >>> 16) & 65535))
  }
}
function nb(e52, t2, n2, r2, i2) {
  let a2 = ky[i2] >>> 0,
    o2 = t2,
    s2 = 0,
    c2 = e52[o2] >>> 0,
    l2 = r2
  for (let t3 = 0; t3 < 8; t3++) {
    for (let t4 = 0; t4 < 32; t4++)
      if (s2 + i2 <= 32) {
        let r3 = (c2 >>> s2) & a2
        ;((n2[l2 + t4] = r3 | 0),
          (s2 += i2),
          s2 === 32 && ((s2 = 0), o2++, t4 !== 31 && (c2 = e52[o2] >>> 0)))
      } else {
        let r3 = 32 - s2,
          u2 = c2 >>> s2
        ;(o2++, (c2 = e52[o2] >>> 0))
        let d2 = i2 - r3,
          f2 = (-1 >>> (32 - d2)) >>> 0,
          p2 = (u2 | ((c2 & f2) << r3)) & a2
        ;((n2[l2 + t4] = p2 | 0), (s2 = d2))
      }
    ;((l2 += 32), (s2 = 0), t3 < 7 && (c2 = e52[o2] >>> 0))
  }
}
const rb = Ny(Ay),
  ib = ((3 * rb) / 256 + rb) | 0
function ab() {
  let e52 = new Uint8Array(ib)
  return {
    dataToBePacked: Array(33),
    dataPointers: new Int32Array(33),
    byteContainer: e52,
    byteContainerI32: new Int32Array(
      e52.buffer,
      e52.byteOffset,
      e52.byteLength >>> 2
    ),
    exceptionSizes: new Int32Array(33),
  }
}
function ob(e52 = 16) {
  if (e52 < 0)
    throw RangeError(`initialEncodedWordCapacity must be >= 0, got ${e52}`)
  let t2 = Math.max(16, e52 | 0)
  return {encodedWords: new Uint32Array(t2), decoderWorkspace: ab()}
}
function sb(e52, t2) {
  if (t2 <= e52.encodedWords.length) return e52.encodedWords
  let n2 = new Uint32Array(Math.max(16, t2 * 2))
  return ((e52.encodedWords = n2), n2)
}
function cb(e52, t2, n2, r2) {
  r2.byteContainer.length < n2 &&
    ((r2.byteContainer = new Uint8Array(n2 * 2)),
    (r2.byteContainerI32 = void 0))
  let i2 = r2.byteContainer,
    a2 = n2 >>> 2
  if (i2.byteOffset & 3)
    for (let n3 = 0; n3 < a2; n3 = (n3 + 1) | 0) {
      let r3 = e52[(t2 + n3) | 0] | 0,
        a3 = n3 << 2
      ;((i2[a3] = r3 & 255),
        (i2[(a3 + 1) | 0] = (r3 >>> 8) & 255),
        (i2[(a3 + 2) | 0] = (r3 >>> 16) & 255),
        (i2[(a3 + 3) | 0] = (r3 >>> 24) & 255))
    }
  else {
    let n3 = r2.byteContainerI32
    ;((!n3 ||
      n3.buffer !== i2.buffer ||
      n3.byteOffset !== i2.byteOffset ||
      n3.length < a2) &&
      (n3 = r2.byteContainerI32 =
        new Int32Array(i2.buffer, i2.byteOffset, i2.byteLength >>> 2)),
      n3.set(e52.subarray(t2, t2 + a2)))
  }
  let o2 = n2 & 3
  if (o2 > 0) {
    let n3 = e52[(t2 + a2) | 0] | 0,
      r3 = a2 << 2
    for (let e53 = 0; e53 < o2; e53 = (e53 + 1) | 0)
      i2[(r3 + e53) | 0] = (n3 >>> (e53 << 3)) & 255
  }
  return i2
}
function lb(e52, t2, n2) {
  let r2 = e52[t2++] | 0,
    i2 = n2.dataToBePacked
  for (let a2 = 2; a2 <= 32; a2 = (a2 + 1) | 0) {
    if (!((r2 >>> (a2 - 1)) & 1)) continue
    if (t2 >= e52.length)
      throw Error(
        `FastPFOR decode: truncated exception stream header (bitWidth=${a2}, streamWordIndex=${t2}, needWords=1, availableWords=${e52.length - t2}, encodedWords=${e52.length})`
      )
    let o2 = e52[t2++] >>> 0,
      s2 = My(o2),
      c2 = (o2 * a2 + 31) >>> 5
    if (t2 + c2 > e52.length)
      throw Error(
        `FastPFOR decode: truncated exception stream (bitWidth=${a2}, size=${o2}, streamWordIndex=${t2}, needWords=${c2}, availableWords=${e52.length - t2}, encodedWords=${e52.length})`
      )
    let l2 = i2[a2]
    ;(!l2 || l2.length < s2) && (l2 = i2[a2] = new Uint32Array(s2))
    let u2 = 0
    for (; u2 < o2; u2 = (u2 + 32) | 0)
      (yb(e52, t2, l2, u2, a2), (t2 = (t2 + a2) | 0))
    let d2 = (u2 - o2) | 0
    ;((t2 = (t2 - ((d2 * a2) >>> 5)) | 0), (n2.exceptionSizes[a2] = o2))
  }
  return t2
}
function ub(e52, t2, n2, r2, i2) {
  switch (i2) {
    case 1:
      qy(e52, t2, n2, r2)
      break
    case 2:
      Jy(e52, t2, n2, r2)
      break
    case 3:
      Yy(e52, t2, n2, r2)
      break
    case 4:
      Xy(e52, t2, n2, r2)
      break
    case 5:
      Zy(e52, t2, n2, r2)
      break
    case 6:
      Qy(e52, t2, n2, r2)
      break
    case 7:
      $y(e52, t2, n2, r2)
      break
    case 8:
      eb(e52, t2, n2, r2)
      break
    case 16:
      tb(e52, t2, n2, r2)
      break
    default:
      nb(e52, t2, n2, r2, i2)
  }
  return (t2 + (i2 << 3)) | 0
}
function db(e52, t2, n2, r2) {
  if (n2 + 2 > t2)
    throw Error(
      `FastPFOR decode: byteContainer underflow at block=${r2} (need 2 bytes for [bitWidth, exceptionCount], bytePos=${n2}, byteSize=${t2})`
    )
  let i2 = e52[n2++],
    a2 = e52[n2++]
  if (i2 > 32)
    throw Error(
      `FastPFOR decode: invalid bitWidth=${i2} at block=${r2} (expected 0..32). This likely indicates corrupted or truncated input.`
    )
  return {bitWidth: i2, exceptionCount: a2, bytePosIn: n2}
}
function fb(e52, t2, n2, r2, i2, a2) {
  if (n2 + 1 > t2)
    throw Error(
      `FastPFOR decode: exception header underflow at block=${a2} (need 1 byte for maxBits, bytePos=${n2}, byteSize=${t2})`
    )
  let o2 = e52[n2++]
  if (o2 < r2 || o2 > 32)
    throw Error(
      `FastPFOR decode: invalid maxBits=${o2} at block=${a2} (bitWidth=${r2}, expected ${r2}..32)`
    )
  let s2 = (o2 - r2) | 0
  if (s2 < 1 || s2 > 32)
    throw Error(
      `FastPFOR decode: invalid exceptionBitWidth=${s2} at block=${a2} (bitWidth=${r2}, maxBits=${o2})`
    )
  if (n2 + i2 > t2)
    throw Error(
      `FastPFOR decode: exception positions underflow at block=${a2} (need=${i2}, have=${t2 - n2})`
    )
  return {maxBits: o2, exceptionBitWidth: s2, bytePosIn: n2}
}
function pb(e52, t2, n2, r2, i2, a2, o2, s2, c2) {
  let {
    maxBits: l2,
    exceptionBitWidth: u2,
    bytePosIn: d2,
  } = fb(i2, a2, o2, n2, r2, c2)
  if (((o2 = d2), u2 === 1)) {
    let a3 = 1 << n2
    for (let n3 = 0; n3 < r2; n3 = (n3 + 1) | 0) {
      let n4 = i2[o2++]
      e52[(n4 + t2) | 0] |= a3
    }
    return o2
  }
  let f2 = s2.dataToBePacked[u2]
  if (!f2)
    throw Error(
      `FastPFOR decode: missing exception stream for exceptionBitWidth=${u2} (bitWidth=${n2}, maxBits=${l2}) at block ${c2}`
    )
  let p2 = s2.dataPointers,
    m2 = p2[u2] | 0,
    h2 = s2.exceptionSizes[u2] | 0
  if (m2 + r2 > h2)
    throw Error(
      `FastPFOR decode: exception stream overflow for exceptionBitWidth=${u2} (ptr=${m2}, need ${r2}, size=${h2}) at block ${c2}`
    )
  for (let a3 = 0; a3 < r2; a3 = (a3 + 1) | 0) {
    let r3 = i2[o2++],
      a4 = f2[m2++] | 0
    e52[(r3 + t2) | 0] |= a4 << n2
  }
  return ((p2[u2] = m2), o2)
}
function mb(e52, t2, n2, r2, i2, a2, o2, s2, c2, l2) {
  let u2 = n2 | 0,
    d2 = 0
  for (let t3 = 0; t3 < o2; t3 = (t3 + 1) | 0) {
    let n3 = db(s2, c2, d2, t3)
    d2 = n3.bytePosIn
    let r3 = n3.bitWidth,
      o3 = n3.exceptionCount,
      f2 = (a2 + t3 * 256) | 0
    switch (r3) {
      case 0:
        i2.fill(0, f2, f2 + 256)
        break
      case 32:
        for (let t4 = 0; t4 < 256; t4 = (t4 + 1) | 0)
          i2[(f2 + t4) | 0] = e52[(u2 + t4) | 0] | 0
        u2 = (u2 + 256) | 0
        break
      default:
        u2 = ub(e52, u2, i2, f2, r3)
    }
    o3 > 0 && (d2 = pb(i2, f2, r3, o3, s2, c2, d2, l2, t3))
  }
  if (u2 !== r2)
    throw Error(
      `FastPFOR decode: packed region mismatch (pageStart=${t2}, packedStart=${n2}, consumedPackedEnd=${u2}, expectedPackedEnd=${r2}, packedWords=${r2 - n2}, encoded.length=${e52.length})`
    )
}
function hb(e52, t2, n2, r2, i2, a2) {
  let o2 = n2 | 0,
    s2 = e52[o2] | 0
  if (s2 <= 0 || o2 + s2 > e52.length - 1)
    throw Error(
      `FastPFOR decode: invalid whereMeta=${s2} at pageStart=${o2} (expected > 0 and pageStart+whereMeta < encoded.length=${e52.length})`
    )
  let c2 = (o2 + 1) | 0,
    l2 = (o2 + s2) | 0,
    u2 = e52[l2] >>> 0,
    d2 = (u2 + 3) >>> 2,
    f2 = l2 + 1,
    p2 = f2 + d2
  if (p2 >= e52.length)
    throw Error(
      `FastPFOR decode: invalid byteSize=${u2} (metaInts=${d2}, pageStart=${o2}, packedEnd=${l2}, byteContainerStart=${f2}) causes bitmapPos=${p2} out of bounds (encoded.length=${e52.length})`
    )
  let m2 = cb(e52, f2, u2, a2),
    h2 = u2,
    g2 = lb(e52, p2, a2)
  return (
    a2.dataPointers.fill(0),
    mb(e52, o2, c2, l2, t2, r2 | 0, (i2 / 256) | 0, m2, h2, a2),
    g2
  )
}
function gb(e52, t2, n2, r2, i2, a2) {
  let o2 = r2 + jy(i2, 256),
    s2 = r2,
    c2 = n2
  for (; s2 !== o2;) {
    let n3 = Math.min(rb, o2 - s2)
    ;((c2 = hb(e52, t2, c2, s2, n3, a2)), (s2 = (s2 + n3) | 0))
  }
  return c2
}
function _b(e52, t2, n2, r2, i2, a2) {
  if (a2 === 0) return t2
  let o2 = 0,
    s2 = t2,
    c2 = t2 + n2,
    l2 = i2,
    u2 = i2,
    d2 = i2 + a2,
    f2 = 0,
    p2 = 0
  for (; s2 < c2 && u2 < d2;) {
    let t3 = (e52[s2] >>> o2) & 255
    if (
      ((o2 += 8),
      (s2 += o2 >>> 5),
      (o2 &= 31),
      (f2 |= (t3 & 127) << p2),
      t3 & 128)
    )
      ((r2[u2++] = f2 | 0), (f2 = 0), (p2 = 0))
    else if (((p2 += 7), p2 > 28))
      throw Error(
        `FastPFOR VByte: unterminated value (expected MSB=1 terminator within 5 bytes; shift=${p2}, partial=${f2}, decoded=${u2 - l2}/${a2}, inPos=${s2}, inEnd=${c2})`
      )
  }
  if (u2 !== d2)
    throw Error(
      `FastPFOR VByte: truncated stream (decoded=${u2 - l2}, expected=${a2}, consumedWords=${s2 - t2}/${n2}, vbyteStart=${t2}, vbyteEnd=${c2})`
    )
  return s2
}
function vb(e52, t2, n2) {
  let r2 = 0,
    i2 = 0,
    a2 = new Uint32Array(t2),
    o2 = n2 ?? ab()
  if (e52.length > 0) {
    let t3 = e52[r2] | 0
    if (((r2 = (r2 + 1) | 0), t3 & 255))
      throw Error(
        `FastPFOR decode: invalid alignedLength=${t3} (expected multiple of 256)`
      )
    if (i2 + t3 > a2.length)
      throw Error(
        `FastPFOR decode: output buffer too small (outPos=${i2}, alignedLength=${t3}, out.length=${a2.length})`
      )
    ;((r2 = gb(e52, a2, r2, i2, t3, o2)), (i2 = (i2 + t3) | 0))
  }
  let s2 = (e52.length - r2) | 0,
    c2 = (t2 - i2) | 0
  return (_b(e52, r2, s2, a2, i2, c2), a2)
}
function yb(e52, t2, n2, r2, i2) {
  switch (i2) {
    case 2:
      Fy(e52, t2, n2, r2)
      return
    case 3:
      Iy(e52, t2, n2, r2)
      return
    case 4:
      Ly(e52, t2, n2, r2)
      return
    case 5:
      Ry(e52, t2, n2, r2)
      return
    case 6:
      zy(e52, t2, n2, r2)
      return
    case 7:
      By(e52, t2, n2, r2)
      return
    case 8:
      Vy(e52, t2, n2, r2)
      return
    case 9:
      Hy(e52, t2, n2, r2)
      return
    case 10:
      Uy(e52, t2, n2, r2)
      return
    case 11:
      Wy(e52, t2, n2, r2)
      return
    case 12:
      Gy(e52, t2, n2, r2)
      return
    case 16:
      Ky(e52, t2, n2, r2)
      return
    case 32:
      for (let i3 = 0; i3 < 32; i3 = (i3 + 1) | 0)
        n2[(r2 + i3) | 0] = e52[(t2 + i3) | 0] | 0
      return
  }
  let a2 = ky[i2] >>> 0,
    o2 = t2,
    s2 = 0,
    c2 = e52[o2] >>> 0
  for (let t3 = 0; t3 < 32; t3++)
    if (s2 + i2 <= 32) {
      let l2 = (c2 >>> s2) & a2
      ;((n2[r2 + t3] = l2 | 0),
        (s2 += i2),
        s2 === 32 && ((s2 = 0), o2++, t3 !== 31 && (c2 = e52[o2] >>> 0)))
    } else {
      let l2 = 32 - s2,
        u2 = c2 >>> s2
      ;(o2++, (c2 = e52[o2] >>> 0))
      let d2 = ky[i2 - l2] >>> 0,
        f2 = (u2 | ((c2 & d2) << l2)) & a2
      ;((n2[r2 + t3] = f2 | 0), (s2 = i2 - l2))
    }
}
function bb(e52, t2, n2, r2) {
  if (t2 < 0 || n2 < 0 || t2 + n2 > e52.length)
    throw RangeError(
      `decodeBigEndianInt32sInto: out of bounds (offset=${t2}, byteLength=${n2}, bytes.length=${e52.length})`
    )
  let i2 = Math.floor(n2 / 4),
    a2 = n2 % 4 != 0,
    o2 = a2 ? i2 + 1 : i2
  if (r2.length < o2)
    throw RangeError(
      `decodeBigEndianInt32sInto: out.length=${r2.length} < ${o2}`
    )
  if (i2 > 0) {
    let n3 = e52.byteOffset + t2
    if (n3 & 3)
      for (let n4 = 0; n4 < i2; n4++) {
        let i3 = t2 + n4 * 4
        r2[n4] =
          (e52[i3] << 24) |
          (e52[i3 + 1] << 16) |
          (e52[i3 + 2] << 8) |
          e52[i3 + 3] |
          0
      }
    else {
      let t3 = new Uint32Array(e52.buffer, n3, i2)
      for (let e53 = 0; e53 < i2; e53++) r2[e53] = Py(t3[e53]) | 0
    }
  }
  if (a2) {
    let a3 = t2 + i2 * 4,
      o3 = n2 - i2 * 4,
      s2 = 0
    for (let t3 = 0; t3 < o3; t3++) s2 |= e52[a3 + t3] << (24 - t3 * 8)
    r2[i2] = s2 | 0
  }
  return o2
}
function xb(e52, t2, n2) {
  let r2 = new Uint32Array(n2),
    i2 = 0,
    a2 = t2.get()
  for (let t3 = 0; t3 < r2.length; t3++) {
    let t4 = e52[a2++],
      n3 = t4 & 127
    if (t4 < 128) {
      r2[i2++] = n3
      continue
    }
    if (((t4 = e52[a2++]), (n3 |= (t4 & 127) << 7), t4 < 128)) {
      r2[i2++] = n3
      continue
    }
    if (((t4 = e52[a2++]), (n3 |= (t4 & 127) << 14), t4 < 128)) {
      r2[i2++] = n3
      continue
    }
    if (((t4 = e52[a2++]), (n3 |= (t4 & 127) << 21), t4 < 128)) {
      r2[i2++] = n3
      continue
    }
    ;((t4 = e52[a2++]), (n3 |= (t4 & 15) << 28), (r2[i2++] = n3))
  }
  return (t2.set(a2), r2)
}
function Sb(e52, t2, n2) {
  let r2 = new BigUint64Array(n2)
  for (let n3 = 0; n3 < r2.length; n3++) r2[n3] = Cb(e52, t2)
  return r2
}
function Cb(e52, t2) {
  let n2 = 0n,
    r2 = 0,
    i2 = t2.get()
  for (; i2 < e52.length;) {
    let t3 = e52[i2++]
    if (((n2 |= BigInt(t3 & 127) << BigInt(r2)), !(t3 & 128))) break
    if (((r2 += 7), r2 >= 64)) throw Error(`Varint too long`)
  }
  return (t2.set(i2), n2)
}
function wb(e52, t2, n2) {
  let r2 = new Float64Array(n2)
  for (let i2 = 0; i2 < n2; i2++) r2[i2] = Tb(e52, t2)
  return r2
}
function Tb(e52, t2) {
  let n2, r2
  return (
    (r2 = e52[t2.get()]),
    t2.increment(),
    (n2 = r2 & 127),
    r2 < 128 ||
    ((r2 = e52[t2.get()]), t2.increment(), (n2 |= (r2 & 127) << 7), r2 < 128) ||
    ((r2 = e52[t2.get()]),
    t2.increment(),
    (n2 |= (r2 & 127) << 14),
    r2 < 128) ||
    ((r2 = e52[t2.get()]), t2.increment(), (n2 |= (r2 & 127) << 21), r2 < 128)
      ? n2
      : ((r2 = e52[t2.get()]), (n2 |= (r2 & 15) << 28), Eb(n2, e52, t2))
  )
}
function Eb(e52, t2, n2) {
  let r2, i2
  if (
    ((i2 = t2[n2.get()]),
    n2.increment(),
    (r2 = (i2 & 112) >> 4),
    i2 < 128 ||
      ((i2 = t2[n2.get()]),
      n2.increment(),
      (r2 |= (i2 & 127) << 3),
      i2 < 128) ||
      ((i2 = t2[n2.get()]),
      n2.increment(),
      (r2 |= (i2 & 127) << 10),
      i2 < 128) ||
      ((i2 = t2[n2.get()]),
      n2.increment(),
      (r2 |= (i2 & 127) << 17),
      i2 < 128) ||
      ((i2 = t2[n2.get()]),
      n2.increment(),
      (r2 |= (i2 & 127) << 24),
      i2 < 128) ||
      ((i2 = t2[n2.get()]), n2.increment(), (r2 |= (i2 & 1) << 31), i2 < 128))
  )
    return r2 * 4294967296 + (e52 >>> 0)
  throw Error(`Expected varint not more than 10 bytes`)
}
function Db(e52, t2, n2, r2) {
  return Ob(e52, t2, n2, r2, ob(n2 >>> 2))
}
function Ob(e52, t2, n2, r2, i2) {
  let a2 = r2.get()
  if (n2 & 3)
    throw Error(
      `FastPFOR: invalid encodedByteLength=${n2} at offset=${a2} (encodedBytes.length=${e52.length}; expected a multiple of 4 bytes for an int32 big-endian word stream)`
    )
  let o2 = n2 >>> 2,
    s2 = sb(i2, o2)
  bb(e52, a2, n2, s2)
  let c2 = vb(s2.subarray(0, o2), t2, i2.decoderWorkspace)
  return (r2.add(n2), c2)
}
function Z(e52) {
  return (e52 >>> 1) ^ -(e52 & 1)
}
function kb(e52) {
  return (e52 >> 1n) ^ -(e52 & 1n)
}
function Ab(e52) {
  return e52 % 2 == 1 ? (e52 + 1) / -2 : e52 / 2
}
function jb(e52) {
  let t2 = new Int32Array(e52.length)
  for (let n2 = 0; n2 < e52.length; n2++) t2[n2] = Z(e52[n2])
  return t2
}
function Mb(e52) {
  let t2 = new BigInt64Array(e52.length)
  for (let n2 = 0; n2 < e52.length; n2++) t2[n2] = kb(e52[n2])
  return t2
}
function Nb(e52) {
  for (let t2 = 0; t2 < e52.length; t2++) e52[t2] = Ab(e52[t2])
}
function Pb(e52, t2, n2) {
  if (n2 === void 0) {
    n2 = 0
    for (let r3 = 0; r3 < t2; r3++) n2 += e52[r3]
  }
  let r2 = new Uint32Array(n2),
    i2 = 0
  for (let n3 = 0; n3 < t2; n3++) {
    let a2 = e52[n3],
      o2 = e52[n3 + t2]
    ;(r2.fill(o2, i2, i2 + a2), (i2 += a2))
  }
  return r2
}
function Fb(e52, t2, n2) {
  if (n2 === void 0) {
    n2 = 0
    for (let r3 = 0; r3 < t2; r3++) n2 += Number(e52[r3])
  }
  let r2 = new BigUint64Array(n2),
    i2 = 0
  for (let n3 = 0; n3 < t2; n3++) {
    let a2 = Number(e52[n3]),
      o2 = e52[n3 + t2]
    ;(r2.fill(o2, i2, i2 + a2), (i2 += a2))
  }
  return r2
}
function Ib(e52, t2, n2) {
  let r2 = new Float64Array(n2),
    i2 = 0
  for (let n3 = 0; n3 < t2; n3++) {
    let a2 = e52[n3],
      o2 = e52[n3 + t2]
    ;(r2.fill(o2, i2, i2 + a2), (i2 += a2))
  }
  return r2
}
function Lb(e52) {
  let t2 = new Int32Array(e52.length)
  t2[0] = Z(e52[0])
  let n2 = (e52.length / 4) * 4,
    r2 = 1
  if (n2 >= 4)
    for (; r2 < n2 - 4; r2 += 4) {
      let n3 = e52[r2],
        i2 = e52[r2 + 1],
        a2 = e52[r2 + 2],
        o2 = e52[r2 + 3]
      ;((t2[r2] = Z(n3) + t2[r2 - 1]),
        (t2[r2 + 1] = Z(i2) + t2[r2]),
        (t2[r2 + 2] = Z(a2) + t2[r2 + 1]),
        (t2[r2 + 3] = Z(o2) + t2[r2 + 2]))
    }
  for (; r2 !== e52.length; ++r2) t2[r2] = Z(e52[r2]) + t2[r2 - 1]
  return t2
}
function Rb(e52) {
  let t2 = new BigInt64Array(e52.length)
  t2[0] = kb(e52[0])
  let n2 = (e52.length / 4) * 4,
    r2 = 1
  if (n2 >= 4)
    for (; r2 < n2 - 4; r2 += 4) {
      let n3 = e52[r2],
        i2 = e52[r2 + 1],
        a2 = e52[r2 + 2],
        o2 = e52[r2 + 3]
      ;((t2[r2] = kb(n3) + t2[r2 - 1]),
        (t2[r2 + 1] = kb(i2) + t2[r2]),
        (t2[r2 + 2] = kb(a2) + t2[r2 + 1]),
        (t2[r2 + 3] = kb(o2) + t2[r2 + 2]))
    }
  for (; r2 !== t2.length; ++r2) t2[r2] = kb(e52[r2]) + t2[r2 - 1]
  return t2
}
function zb(e52) {
  e52[0] = Ab(e52[0])
  let t2 = (e52.length / 4) * 4,
    n2 = 1
  if (t2 >= 4)
    for (; n2 < t2 - 4; n2 += 4) {
      let t3 = e52[n2],
        r2 = e52[n2 + 1],
        i2 = e52[n2 + 2],
        a2 = e52[n2 + 3]
      ;((e52[n2] = Ab(t3) + e52[n2 - 1]),
        (e52[n2 + 1] = Ab(r2) + e52[n2]),
        (e52[n2 + 2] = Ab(i2) + e52[n2 + 1]),
        (e52[n2 + 3] = Ab(a2) + e52[n2 + 2]))
    }
  for (; n2 !== e52.length; ++n2) e52[n2] = Ab(e52[n2]) + e52[n2 - 1]
}
function Bb(e52, t2, n2) {
  if (n2 === void 0) {
    n2 = 0
    for (let r3 = 0; r3 < t2; r3++) n2 += e52[r3]
  }
  let r2 = new Int32Array(n2),
    i2 = 0
  for (let n3 = 0; n3 < t2; n3++) {
    let a2 = e52[n3],
      o2 = e52[n3 + t2]
    ;((o2 = Z(o2)), r2.fill(o2, i2, i2 + a2), (i2 += a2))
  }
  return r2
}
function Vb(e52, t2, n2) {
  if (n2 === void 0) {
    n2 = 0
    for (let r3 = 0; r3 < t2; r3++) n2 += Number(e52[r3])
  }
  let r2 = new BigInt64Array(n2),
    i2 = 0
  for (let n3 = 0; n3 < t2; n3++) {
    let a2 = Number(e52[n3]),
      o2 = e52[n3 + t2]
    ;((o2 = kb(o2)), r2.fill(o2, i2, i2 + a2), (i2 += a2))
  }
  return r2
}
function Hb(e52, t2, n2) {
  let r2 = new Float64Array(n2),
    i2 = 0
  for (let n3 = 0; n3 < t2; n3++) {
    let a2 = e52[n3],
      o2 = e52[n3 + t2]
    ;((o2 = Ab(o2)), r2.fill(o2, i2, i2 + a2), (i2 += a2))
  }
  return r2
}
function Ub(e52) {
  let t2 = (e52.length / 4) * 4,
    n2 = 1
  if (t2 >= 4)
    for (let r2 = e52[0]; n2 < t2 - 4; n2 += 4)
      ((r2 = e52[n2] += r2),
        (r2 = e52[n2 + 1] += r2),
        (r2 = e52[n2 + 2] += r2),
        (r2 = e52[n2 + 3] += r2))
  for (; n2 !== e52.length;) ((e52[n2] += e52[n2 - 1]), ++n2)
}
function Wb(e52) {
  let t2 = 0
  for (let n2 = 0; n2 < e52.length; n2++) ((e52[n2] += t2), (t2 = e52[n2]))
}
function Gb(e52) {
  if (e52.length < 2) return new Int32Array(e52)
  let t2 = new Int32Array(e52.length)
  ;((t2[0] = Z(e52[0])), (t2[1] = Z(e52[1])))
  let n2 = (e52.length / 4) * 4,
    r2 = 2
  if (n2 >= 4)
    for (; r2 < n2 - 4; r2 += 4) {
      let n3 = e52[r2],
        i2 = e52[r2 + 1],
        a2 = e52[r2 + 2],
        o2 = e52[r2 + 3]
      ;((t2[r2] = Z(n3) + t2[r2 - 2]),
        (t2[r2 + 1] = Z(i2) + t2[r2 - 1]),
        (t2[r2 + 2] = Z(a2) + t2[r2]),
        (t2[r2 + 3] = Z(o2) + t2[r2 + 1]))
    }
  for (; r2 !== e52.length; r2 += 2)
    ((t2[r2] = Z(e52[r2]) + t2[r2 - 2]),
      (t2[r2 + 1] = Z(e52[r2 + 1]) + t2[r2 - 1]))
  return t2
}
function Kb(e52, t2, n2, r2) {
  if (e52.length < 2) return new Int32Array(e52)
  let i2 = new Int32Array(e52.length),
    a2 = Z(e52[0]),
    o2 = Z(e52[1])
  ;((i2[0] = qb(Math.round(a2 * t2), n2, r2)),
    (i2[1] = qb(Math.round(o2 * t2), n2, r2)))
  let s2 = e52.length / 16,
    c2 = 2
  if (s2 >= 4)
    for (; c2 < s2 - 4; c2 += 4) {
      let s3 = e52[c2],
        l2 = e52[c2 + 1],
        u2 = Z(s3) + a2,
        d2 = Z(l2) + o2
      ;((i2[c2] = qb(Math.round(u2 * t2), n2, r2)),
        (i2[c2 + 1] = qb(Math.round(d2 * t2), n2, r2)))
      let f2 = e52[c2 + 2],
        p2 = e52[c2 + 3]
      ;((a2 = Z(f2) + u2),
        (o2 = Z(p2) + d2),
        (i2[c2 + 2] = qb(Math.round(a2 * t2), n2, r2)),
        (i2[c2 + 3] = qb(Math.round(o2 * t2), n2, r2)))
    }
  for (; c2 !== e52.length; c2 += 2)
    ((a2 += Z(e52[c2])),
      (o2 += Z(e52[c2 + 1])),
      (i2[c2] = qb(Math.round(a2 * t2), n2, r2)),
      (i2[c2 + 1] = qb(Math.round(o2 * t2), n2, r2)))
  return i2
}
function qb(e52, t2, n2) {
  return Math.min(n2, Math.max(t2, e52))
}
function Jb(e52) {
  let t2 = new Int32Array(e52.length + 1)
  ;((t2[0] = 0), (t2[1] = Z(e52[0])))
  let n2 = t2[1]
  for (let r2 = 2; r2 !== t2.length; ++r2) {
    let i2 = e52[r2 - 1],
      a2 = Z(i2)
    ;((n2 += a2), (t2[r2] = t2[r2 - 1] + n2))
  }
  return new Uint32Array(t2)
}
function Yb(e52, t2, n2) {
  let r2 = new Int32Array(n2 + 1)
  r2[0] = 0
  let i2 = 1,
    a2 = r2[0]
  for (let n3 = 0; n3 < t2; n3++) {
    let o2 = e52[n3],
      s2 = e52[n3 + t2]
    s2 = Z(s2)
    for (let e53 = i2; e53 < i2 + o2; e53++)
      ((r2[e53] = s2 + a2), (a2 = r2[e53]))
    i2 += o2
  }
  return r2
}
function Xb(e52, t2, n2) {
  let r2 = new Uint32Array(n2 + 1)
  r2[0] = 0
  let i2 = 1,
    a2 = r2[0]
  for (let n3 = 0; n3 < t2; n3++) {
    let o2 = e52[n3],
      s2 = e52[n3 + t2]
    for (let e53 = i2; e53 < i2 + o2; e53++)
      ((r2[e53] = s2 + a2), (a2 = r2[e53]))
    i2 += o2
  }
  return r2
}
function Zb(e52, t2, n2) {
  let r2 = new Int32Array(n2),
    i2 = 0,
    a2 = 0
  for (let n3 = 0; n3 < t2; n3++) {
    let o2 = e52[n3],
      s2 = e52[n3 + t2],
      c2 = Z(s2)
    for (let e53 = 0; e53 < o2; e53++) ((a2 += c2), (r2[i2++] = a2))
  }
  return r2
}
function Qb(e52, t2, n2) {
  let r2 = new BigInt64Array(n2),
    i2 = 0,
    a2 = 0n
  for (let n3 = 0; n3 < t2; n3++) {
    let o2 = Number(e52[n3]),
      s2 = e52[n3 + t2],
      c2 = kb(s2)
    for (let e53 = 0; e53 < o2; e53++) ((a2 += c2), (r2[i2++] = a2))
  }
  return r2
}
function $b(e52) {
  let t2 = new Uint32Array(e52.length)
  t2[0] = Z(e52[0]) >>> 0
  for (let n2 = 1; n2 < e52.length; n2++)
    t2[n2] = (t2[n2 - 1] + Z(e52[n2])) >>> 0
  return t2
}
function ex(e52) {
  let t2 = new BigUint64Array(e52.length)
  t2[0] = BigInt.asUintN(64, kb(e52[0]))
  for (let n2 = 1; n2 < e52.length; n2++)
    t2[n2] = BigInt.asUintN(64, t2[n2 - 1] + kb(e52[n2]))
  return t2
}
function tx(e52) {
  if (e52.length < 2) return new Uint32Array(e52)
  let t2 = new Uint32Array(e52.length)
  ;((t2[0] = Z(e52[0]) >>> 0), (t2[1] = Z(e52[1]) >>> 0))
  for (let n2 = 2; n2 < e52.length; n2 += 2)
    ((t2[n2] = (t2[n2 - 2] + Z(e52[n2])) >>> 0),
      (t2[n2 + 1] = (t2[n2 - 1] + Z(e52[n2 + 1])) >>> 0))
  return t2
}
function nx(e52, t2, n2, r2) {
  let i2 = Kb(e52, t2, n2, r2)
  return new Uint32Array(i2)
}
function rx(e52) {
  return e52[1]
}
function ix(e52) {
  return Z(e52[1])
}
function ax(e52) {
  if (e52.length === 2) {
    let t2 = Z(e52[1])
    return [t2, t2]
  }
  return [Z(e52[2]), Z(e52[3])]
}
function ox(e52) {
  return e52[1]
}
function sx(e52) {
  return kb(e52[1])
}
function cx(e52) {
  if (e52.length === 2) {
    let t2 = kb(e52[1])
    return [t2, t2]
  }
  return [kb(e52[2]), kb(e52[3])]
}
var lx
;(function (e52) {
  ;((e52.PRESENT = `PRESENT`),
    (e52.DATA = `DATA`),
    (e52.OFFSET = `OFFSET`),
    (e52.LENGTH = `LENGTH`))
})((lx ||= {}))
var ux
;(function (e52) {
  ;((e52.NONE = `NONE`),
    (e52.SINGLE = `SINGLE`),
    (e52.SHARED = `SHARED`),
    (e52.VERTEX = `VERTEX`),
    (e52.MORTON = `MORTON`),
    (e52.FSST = `FSST`))
})((ux ||= {}))
var dx
;(function (e52) {
  ;((e52.VERTEX = `VERTEX`),
    (e52.INDEX = `INDEX`),
    (e52.STRING = `STRING`),
    (e52.KEY = `KEY`))
})((dx ||= {}))
var fx
;(function (e52) {
  ;((e52.VAR_BINARY = `VAR_BINARY`),
    (e52.GEOMETRIES = `GEOMETRIES`),
    (e52.PARTS = `PARTS`),
    (e52.RINGS = `RINGS`),
    (e52.TRIANGLES = `TRIANGLES`),
    (e52.SYMBOL = `SYMBOL`),
    (e52.DICTIONARY = `DICTIONARY`))
})((fx ||= {}))
const px = [lx.PRESENT, lx.DATA, lx.OFFSET, lx.LENGTH],
  mx = [X.NONE, X.DELTA, X.COMPONENTWISE_DELTA, X.RLE, X.MORTON, X.PDE],
  hx = [Dy.NONE, Dy.FAST_PFOR, Dy.VARINT],
  gx = [ux.NONE, ux.SINGLE, ux.SHARED, ux.VERTEX, ux.MORTON, ux.FSST],
  _x = [dx.VERTEX, dx.INDEX, dx.STRING, dx.KEY],
  vx = [
    fx.VAR_BINARY,
    fx.GEOMETRIES,
    fx.PARTS,
    fx.RINGS,
    fx.TRIANGLES,
    fx.SYMBOL,
    fx.DICTIONARY,
  ]
function Q(e52, t2) {
  let n2 = xx(e52, t2)
  return n2.logicalLevelTechnique1 === X.MORTON
    ? yx(n2, e52, t2)
    : (X.RLE === n2.logicalLevelTechnique1 ||
          X.RLE === n2.logicalLevelTechnique2) &&
        Dy.NONE !== n2.physicalLevelTechnique
      ? bx(n2, e52, t2)
      : n2
}
function yx(e52, t2, n2) {
  let r2 = xb(t2, n2, 2)
  return {
    physicalStreamType: e52.physicalStreamType,
    logicalStreamType: e52.logicalStreamType,
    logicalLevelTechnique1: e52.logicalLevelTechnique1,
    logicalLevelTechnique2: e52.logicalLevelTechnique2,
    physicalLevelTechnique: e52.physicalLevelTechnique,
    numValues: e52.numValues,
    byteLength: e52.byteLength,
    decompressedCount: e52.decompressedCount,
    numBits: r2[0],
    coordinateShift: r2[1],
  }
}
function bx(e52, t2, n2) {
  let r2 = xb(t2, n2, 2)
  return {
    physicalStreamType: e52.physicalStreamType,
    logicalStreamType: e52.logicalStreamType,
    logicalLevelTechnique1: e52.logicalLevelTechnique1,
    logicalLevelTechnique2: e52.logicalLevelTechnique2,
    physicalLevelTechnique: e52.physicalLevelTechnique,
    numValues: e52.numValues,
    byteLength: e52.byteLength,
    decompressedCount: r2[1],
    runs: r2[0],
    numRleValues: r2[1],
  }
}
function xx(e52, t2) {
  let n2 = e52[t2.get()],
    r2 = px[n2 >> 4],
    i2 = {}
  switch (r2) {
    case lx.DATA:
      i2 = {dictionaryType: gx[n2 & 15]}
      break
    case lx.OFFSET:
      i2 = {offsetType: _x[n2 & 15]}
      break
    case lx.LENGTH:
      i2 = {lengthType: vx[n2 & 15]}
  }
  t2.increment()
  let a2 = e52[t2.get()],
    o2 = mx[a2 >> 5],
    s2 = mx[(a2 >> 2) & 7],
    c2 = hx[a2 & 3]
  t2.increment()
  let l2 = xb(e52, t2, 2),
    u2 = l2[0],
    d2 = l2[1]
  return {
    physicalStreamType: r2,
    logicalStreamType: i2,
    logicalLevelTechnique1: o2,
    logicalLevelTechnique2: s2,
    physicalLevelTechnique: c2,
    numValues: u2,
    byteLength: d2,
    decompressedCount: u2,
  }
}
var $
;(function (e52) {
  ;((e52[(e52.FLAT = 0)] = `FLAT`),
    (e52[(e52.CONST = 1)] = `CONST`),
    (e52[(e52.SEQUENCE = 2)] = `SEQUENCE`),
    (e52[(e52.DICTIONARY = 3)] = `DICTIONARY`),
    (e52[(e52.FSST_DICTIONARY = 4)] = `FSST_DICTIONARY`))
})(($ ||= {}))
var Sx = class {
  constructor(e52, t2) {
    ;((this.values = e52), (this._size = t2))
  }
  get(e52) {
    let t2 = Math.floor(e52 / 8),
      n2 = e52 % 8
    return ((this.values[t2] >> n2) & 1) == 1
  }
  set(e52, t2) {
    let n2 = Math.floor(e52 / 8),
      r2 = e52 % 8
    this.values[n2] = this.values[n2] | (+!!t2 << r2)
  }
  getInt(e52) {
    let t2 = Math.floor(e52 / 8),
      n2 = e52 % 8
    return (this.values[t2] >> n2) & 1
  }
  size() {
    return this._size
  }
  getBuffer() {
    return this.values
  }
}
function Cx(e52, t2, n2) {
  if (!t2) return e52
  let r2 = t2.size(),
    i2 = e52.constructor,
    a2 = new i2(r2),
    o2 = 0
  for (let i3 = 0; i3 < r2; i3++) a2[i3] = t2.get(i3) ? e52[o2++] : n2
  return a2
}
function wx(e52, t2, n2) {
  if (!n2) return e52
  let r2 = n2.size(),
    i2 = new Sx(e52, t2),
    a2 = new Sx(new Uint8Array(Math.ceil(r2 / 8)), r2),
    o2 = 0
  for (let e53 = 0; e53 < r2; e53++) {
    let t3 = n2.get(e53) ? i2.get(o2++) : false
    a2.set(e53, t3)
  }
  return a2.getBuffer()
}
function Tx(e52, t2, n2) {
  for (let r2 = 0; r2 < e52; r2++) {
    let e53 = Q(t2, n2)
    n2.add(e53.byteLength)
  }
}
function Ex(e52, t2, n2, r2, i2) {
  let a2 = Dx(e52, Math.ceil(t2 / 8), n2, r2)
  return i2 ? wx(a2, t2, i2) : a2
}
function Dx(e52, t2, n2, r2) {
  let i2 = new Uint8Array(t2),
    a2 = 0,
    o2 = r2.get() + n2
  for (; a2 < t2 && !(r2.get() >= o2);) {
    let n3 = e52[r2.increment()]
    if (n3 <= 127) {
      let o3 = n3 + 3,
        s2 = e52[r2.increment()],
        c2 = Math.min(a2 + o3, t2)
      ;(i2.fill(s2, a2, c2), (a2 = c2))
    } else {
      let o3 = 256 - n3
      for (let n4 = 0; n4 < o3 && a2 < t2; n4++) i2[a2++] = e52[r2.increment()]
    }
  }
  return (r2.set(o2), i2)
}
function Ox(e52, t2, n2, r2) {
  let i2 = t2.get(),
    a2 = i2 + n2 * Float32Array.BYTES_PER_ELEMENT,
    o2 = new Uint8Array(e52.subarray(i2, a2)).buffer,
    s2 = new Float32Array(o2)
  return (t2.set(a2), r2 ? Cx(s2, r2, 0) : s2)
}
function kx(e52, t2, n2, r2) {
  let i2 = t2.get(),
    a2 = i2 + n2 * Float64Array.BYTES_PER_ELEMENT,
    o2 = new Uint8Array(e52.subarray(i2, a2)).buffer,
    s2 = new Float64Array(o2)
  return (t2.set(a2), r2 ? Cx(s2, r2, 0) : s2)
}
function Ax(e52, t2, n2) {
  let r2 = t2.get(),
    i2 = n2 * Uint32Array.BYTES_PER_ELEMENT,
    a2 = new DataView(e52.buffer, e52.byteOffset, e52.byteLength),
    o2 = new Uint32Array(n2)
  for (let e53 = 0; e53 < n2; e53++)
    o2[e53] = a2.getUint32(r2 + e53 * Uint32Array.BYTES_PER_ELEMENT, true)
  return (t2.add(i2), o2)
}
function jx(e52, t2, n2) {
  let r2 = t2.get(),
    i2 = n2 * BigUint64Array.BYTES_PER_ELEMENT,
    a2 = new DataView(e52.buffer, e52.byteOffset, e52.byteLength),
    o2 = new BigUint64Array(n2)
  for (let e53 = 0; e53 < n2; e53++)
    o2[e53] = a2.getBigUint64(r2 + e53 * BigUint64Array.BYTES_PER_ELEMENT, true)
  return (t2.add(i2), o2)
}
const Mx = new TextDecoder()
function Nx(e52, t2, n2) {
  return n2 - t2 >= 12 ? Mx.decode(e52.subarray(t2, n2)) : Px(e52, t2, n2)
}
function Px(e52, t2, n2) {
  let r2 = ``,
    i2 = t2
  for (; i2 < n2;) {
    let t3 = e52[i2],
      a2 = null,
      o2 = t3 > 239 ? 4 : t3 > 223 ? 3 : t3 > 191 ? 2 : 1
    if (i2 + o2 > n2) break
    let s2, c2, l2
    ;(o2 === 1
      ? t3 < 128 && (a2 = t3)
      : o2 === 2
        ? ((s2 = e52[i2 + 1]),
          (s2 & 192) == 128 &&
            ((a2 = ((t3 & 31) << 6) | (s2 & 63)), a2 <= 127 && (a2 = null)))
        : o2 === 3
          ? ((s2 = e52[i2 + 1]),
            (c2 = e52[i2 + 2]),
            (s2 & 192) == 128 &&
              (c2 & 192) == 128 &&
              ((a2 = ((t3 & 15) << 12) | ((s2 & 63) << 6) | (c2 & 63)),
              (a2 <= 2047 || (a2 >= 55296 && a2 <= 57343)) && (a2 = null)))
          : o2 === 4 &&
            ((s2 = e52[i2 + 1]),
            (c2 = e52[i2 + 2]),
            (l2 = e52[i2 + 3]),
            (s2 & 192) == 128 &&
              (c2 & 192) == 128 &&
              (l2 & 192) == 128 &&
              ((a2 =
                ((t3 & 15) << 18) |
                ((s2 & 63) << 12) |
                ((c2 & 63) << 6) |
                (l2 & 63)),
              (a2 <= 65535 || a2 >= 1114112) && (a2 = null))),
      a2 === null
        ? ((a2 = 65533), (o2 = 1))
        : a2 > 65535 &&
          ((a2 -= 65536),
          (r2 += String.fromCharCode(((a2 >>> 10) & 1023) | 55296)),
          (a2 = 56320 | (a2 & 1023))),
      (r2 += String.fromCharCode(a2)),
      (i2 += o2))
  }
  return r2
}
function Fx(e52, t2, n2, r2, i2) {
  return Xx(Rx(e52, t2, n2), n2, r2, i2)
}
function Ix(e52, t2, n2, r2, i2) {
  return Zx(Rx(e52, t2, n2), n2, r2, i2)
}
function Lx(e52, t2, n2) {
  return tS(Rx(e52, t2, n2), n2)
}
function Rx(e52, t2, n2) {
  let r2 = n2.physicalLevelTechnique
  switch (r2) {
    case Dy.FAST_PFOR:
      return Db(e52, n2.numValues, n2.byteLength, t2)
    case Dy.VARINT:
      return xb(e52, t2, n2.numValues)
    case Dy.NONE:
      return Ax(e52, t2, n2.numValues)
    default:
      throw Error(
        `Specified physicalLevelTechnique ${r2} is not supported (yet).`
      )
  }
}
function zx(e52, t2, n2) {
  let r2 = n2.physicalLevelTechnique
  switch (r2) {
    case Dy.VARINT:
      return Sb(e52, t2, n2.numValues)
    case Dy.NONE:
      return jx(e52, t2, n2.numValues)
    default:
      throw Error(
        `Specified physicalLevelTechnique ${r2} is not supported (yet).`
      )
  }
}
function Bx(e52, t2, n2) {
  let r2 = Rx(e52, t2, n2)
  return r2.length === 1 ? Z(r2[0]) : ix(r2)
}
function Vx(e52, t2, n2) {
  let r2 = Rx(e52, t2, n2)
  return r2.length === 1
    ? n2.logicalLevelTechnique1 === X.DELTA
      ? Z(r2[0])
      : r2[0]
    : rx(r2)
}
function Hx(e52, t2, n2) {
  return ax(Rx(e52, t2, n2))
}
function Ux(e52, t2, n2) {
  return cx(Sb(e52, t2, n2.numValues))
}
function Wx(e52, t2, n2, r2) {
  return Qx(zx(e52, t2, n2), n2, r2)
}
function Gx(e52, t2, n2, r2) {
  return $x(zx(e52, t2, n2), n2, r2)
}
function Kx(e52, t2, n2, r2) {
  let i2 = qx(e52, t2, n2, false)
  return r2 ? Cx(i2, r2, 0) : i2
}
function qx(e52, t2, n2, r2) {
  if (n2.physicalLevelTechnique === Dy.VARINT)
    return eS(wb(e52, t2, n2.numValues), n2, r2)
  let i2 = zx(e52, t2, n2),
    a2 = r2 ? Qx(i2, n2) : $x(i2, n2)
  return Float64Array.from(a2, Number)
}
function Jx(e52, t2, n2) {
  let r2 = zx(e52, t2, n2)
  return r2.length === 1 ? kb(r2[0]) : sx(r2)
}
function Yx(e52, t2, n2) {
  let r2 = zx(e52, t2, n2)
  return r2.length === 1
    ? n2.logicalLevelTechnique1 === X.DELTA
      ? kb(r2[0])
      : r2[0]
    : ox(r2)
}
function Xx(e52, t2, n2, r2) {
  let i2
  switch (t2.logicalLevelTechnique1) {
    case X.DELTA:
      if (t2.logicalLevelTechnique2 === X.RLE) {
        let n3 = t2
        if (!r2) return Zb(e52, n3.runs, n3.numRleValues)
        ;((e52 = Pb(e52, n3.runs, n3.numRleValues)), (i2 = Lb(e52)))
      } else i2 = Lb(e52)
      break
    case X.RLE:
      i2 = Bb(e52, t2.runs, t2.numRleValues)
      break
    case X.MORTON:
      ;(Ub(e52), (i2 = new Int32Array(e52)))
      break
    case X.COMPONENTWISE_DELTA:
      if (n2 && !r2) return Kb(e52, n2.scale, n2.min, n2.max)
      i2 = Gb(e52)
      break
    case X.NONE:
      i2 = jb(e52)
      break
    default:
      throw Error(
        `The specified Logical level technique is not supported: ${t2.logicalLevelTechnique1}`
      )
  }
  return r2 ? Cx(i2, r2, 0) : i2
}
function Zx(e52, t2, n2, r2) {
  let i2
  switch (t2.logicalLevelTechnique1) {
    case X.DELTA:
      if (t2.logicalLevelTechnique2 === X.RLE) {
        let n3 = t2
        i2 = $b(Pb(e52, n3.runs, n3.numRleValues))
      } else i2 = $b(e52)
      break
    case X.RLE:
      i2 = Pb(e52, t2.runs, t2.numRleValues)
      break
    case X.MORTON:
      ;(Ub(e52), (i2 = e52))
      break
    case X.COMPONENTWISE_DELTA:
      i2 = n2 && !r2 ? nx(e52, n2.scale, n2.min, n2.max) : tx(e52)
      break
    case X.NONE:
      i2 = e52
      break
    default:
      throw Error(
        `The specified Logical level technique is not supported: ${t2.logicalLevelTechnique1}`
      )
  }
  return r2 ? Cx(i2, r2, 0) : i2
}
function Qx(e52, t2, n2) {
  let r2
  switch (t2.logicalLevelTechnique1) {
    case X.DELTA:
      if (t2.logicalLevelTechnique2 === X.RLE) {
        let i2 = t2
        if (!n2) return Qb(e52, i2.runs, i2.numRleValues)
        ;((e52 = Fb(e52, i2.runs, i2.numRleValues)), (r2 = Rb(e52)))
      } else r2 = Rb(e52)
      break
    case X.RLE:
      r2 = Vb(e52, t2.runs, t2.numRleValues)
      break
    case X.NONE:
      r2 = Mb(e52)
      break
    default:
      throw Error(
        `The specified Logical level technique is not supported: ${t2.logicalLevelTechnique1}`
      )
  }
  return n2 ? Cx(r2, n2, 0n) : r2
}
function $x(e52, t2, n2) {
  let r2
  switch (t2.logicalLevelTechnique1) {
    case X.DELTA:
      if (t2.logicalLevelTechnique2 === X.RLE) {
        let n3 = t2
        r2 = ex(Fb(e52, n3.runs, n3.numRleValues))
      } else r2 = ex(e52)
      break
    case X.RLE:
      r2 = Fb(e52, t2.runs, t2.numRleValues)
      break
    case X.NONE:
      r2 = e52
      break
    default:
      throw Error(
        `The specified Logical level technique is not supported: ${t2.logicalLevelTechnique1}`
      )
  }
  return n2 ? Cx(r2, n2, 0n) : r2
}
function eS(e52, t2, n2) {
  switch (t2.logicalLevelTechnique1) {
    case X.DELTA:
      if (t2.logicalLevelTechnique2 === X.RLE) {
        let n3 = t2
        e52 = Ib(e52, n3.runs, n3.numRleValues)
      }
      return (zb(e52), e52)
    case X.RLE:
      return iS(e52, t2, n2)
    case X.NONE:
      return (n2 && Nb(e52), e52)
    default:
      throw Error(
        `The specified Logical level technique is not supported: ${t2.logicalLevelTechnique1}`
      )
  }
}
function tS(e52, t2) {
  if (
    t2.logicalLevelTechnique1 === X.DELTA &&
    t2.logicalLevelTechnique2 === X.NONE
  )
    return Jb(e52)
  if (
    t2.logicalLevelTechnique1 === X.RLE &&
    t2.logicalLevelTechnique2 === X.NONE
  ) {
    let n2 = t2
    return Xb(e52, n2.runs, n2.numRleValues)
  }
  if (
    t2.logicalLevelTechnique1 === X.NONE &&
    t2.logicalLevelTechnique2 === X.NONE
  ) {
    Wb(e52)
    let n2 = new Uint32Array(t2.numValues + 1)
    return ((n2[0] = 0), n2.set(e52, 1), n2)
  }
  if (
    t2.logicalLevelTechnique1 === X.DELTA &&
    t2.logicalLevelTechnique2 === X.RLE
  ) {
    let n2 = t2,
      r2 = Yb(e52, n2.runs, n2.numRleValues)
    return (Ub(r2), new Uint32Array(r2))
  }
  throw Error(
    `Only delta encoding is supported for transforming length to offset streams yet.`
  )
}
function nS(e52, t2, n2, r2, i2 = `int32`) {
  let a2 = e52.logicalLevelTechnique1
  if (a2 === X.RLE) return e52.runs === 1 ? $.CONST : $.FLAT
  if (a2 !== X.DELTA || e52.logicalLevelTechnique2 !== X.RLE)
    return e52.numValues === 1 ? $.CONST : $.FLAT
  let o2 = t2 instanceof Sx ? t2.size() : t2,
    s2 = e52
  if (s2.numRleValues !== o2) return $.FLAT
  if (s2.runs === 1) return $.SEQUENCE
  if (s2.runs !== 2) return e52.numValues === 1 ? $.CONST : $.FLAT
  let c2 = r2.get()
  if (e52.physicalLevelTechnique === Dy.VARINT)
    return rS(n2, r2, i2) ? $.SEQUENCE : e52.numValues === 1 ? $.CONST : $.FLAT
  let l2 = r2.get(),
    u2 = new Int32Array(n2.buffer, n2.byteOffset + l2, 4)
  return (
    r2.set(c2),
    u2[2] === 2 && u2[3] === 2
      ? $.SEQUENCE
      : e52.numValues === 1
        ? $.CONST
        : $.FLAT
  )
}
function rS(e52, t2, n2) {
  let r2 = new Ey(t2.get())
  if (n2 === `int64`) {
    let t3 = Sb(e52, r2, 4)
    return t3[2] === 2n && t3[3] === 2n
  }
  let i2 = xb(e52, r2, 4)
  return i2[2] === 2 && i2[3] === 2
}
function iS(e52, t2, n2) {
  return n2
    ? Hb(e52, t2.runs, t2.numRleValues)
    : Ib(e52, t2.runs, t2.numRleValues)
}
var aS = class extends gy {
    getValueFromBuffer(e52) {
      return this.dataBuffer[e52]
    }
  },
  oS = class extends yy {
    constructor(e52, t2, n2, r2, i2) {
      super(e52, i2 ? BigInt64Array.of(t2) : BigUint64Array.of(t2), n2, r2)
    }
    getValueFromBuffer(e52) {
      return this.dataBuffer[0] + BigInt(e52) * this.delta
    }
  }
function sS(e52, t2, n2) {
  return {x: cS(e52, t2) - n2, y: cS(e52 >> 1, t2) - n2}
}
function cS(e52, t2) {
  let n2 = 0
  for (let r2 = 0; r2 < t2; r2++) n2 |= (e52 & (1 << (2 * r2))) >> r2
  return n2
}
var lS
;(function (e52) {
  ;((e52[(e52.POINT = 0)] = `POINT`),
    (e52[(e52.LINESTRING = 1)] = `LINESTRING`),
    (e52[(e52.POLYGON = 2)] = `POLYGON`),
    (e52[(e52.MULTIPOINT = 3)] = `MULTIPOINT`),
    (e52[(e52.MULTILINESTRING = 4)] = `MULTILINESTRING`),
    (e52[(e52.MULTIPOLYGON = 5)] = `MULTIPOLYGON`))
})((lS ||= {}))
var uS
;(function (e52) {
  ;((e52[(e52.POINT = 0)] = `POINT`),
    (e52[(e52.LINESTRING = 1)] = `LINESTRING`),
    (e52[(e52.POLYGON = 2)] = `POLYGON`))
})((uS ||= {}))
var dS
;(function (e52) {
  ;((e52[(e52.MORTON = 0)] = `MORTON`),
    (e52[(e52.VEC_2 = 1)] = `VEC_2`),
    (e52[(e52.VEC_3 = 2)] = `VEC_3`))
})((dS ||= {}))
function fS(e52) {
  let t2 = Array(e52.numGeometries),
    n2 = 1,
    r2 = 1,
    i2 = 1,
    a2 = 0,
    o2 = 0,
    s2 = 0,
    c2 = e52.mortonSettings,
    u2 = e52.topologyVector,
    d2 = u2.geometryOffsets,
    f2 = u2.partOffsets,
    p2 = u2.ringOffsets,
    m2 = e52.vertexOffsets,
    h2 = !m2 || m2.length === 0,
    g2 = e52.containsPolygonGeometry(),
    _2 = e52.vertexBuffer
  for (let u3 = 0; u3 < e52.numGeometries; u3++) {
    let v2 = e52.geometryType(u3)
    switch (v2) {
      case lS.POINT:
        {
          let u4, g3
          if (h2) ((u4 = _2[o2++]), (g3 = _2[o2++]))
          else if (e52.vertexBufferType === dS.MORTON) {
            let e53 = _2[m2[s2++]],
              t3 = sS(e53, c2.numBits, c2.coordinateShift)
            ;((u4 = t3.x), (g3 = t3.y))
          } else {
            let e53 = m2[s2++] * 2
            ;((u4 = _2[e53]), (g3 = _2[e53 + 1]))
          }
          ;((t2[a2++] = [[new l(u4, g3)]]), d2 && i2++, f2 && n2++, p2 && r2++)
        }
        break
      case lS.MULTIPOINT:
        {
          let u4 = d2[i2] - d2[i2 - 1]
          i2++
          let f3
          if (h2) {
            f3 = Array(u4)
            for (let e53 = 0; e53 < u4; e53++) {
              let t3 = _2[o2++],
                n3 = _2[o2++]
              f3[e53] = new l(t3, n3)
            }
          } else
            ((f3 = pS(e52.vertexBufferType, _2, m2, s2, u4, false, c2)),
              (s2 += u4))
          ;((t2[a2++] = f3.map(e53 => [e53])), (n2 += u4), (r2 += u4))
        }
        break
      case lS.LINESTRING:
        {
          let l2
          ;(g2
            ? ((l2 = p2[r2] - p2[r2 - 1]), r2++)
            : (l2 = f2[n2] - f2[n2 - 1]),
            n2++)
          let u4
          ;(h2
            ? ((u4 = mS(_2, o2, l2, false)), (o2 += l2 * 2))
            : ((u4 = pS(e52.vertexBufferType, _2, m2, s2, l2, false, c2)),
              (s2 += l2)),
            (t2[a2++] = [u4]),
            d2 && i2++)
        }
        break
      case lS.POLYGON:
        {
          let l2 = f2[n2] - f2[n2 - 1]
          n2++
          let u4 = Array(l2 - 1),
            g3,
            v3 = p2[r2] - p2[r2 - 1]
          if ((r2++, h2)) {
            ;((g3 = mS(_2, o2, v3, true)), (o2 += v3 * 2))
            for (let e53 = 0; e53 < u4.length; e53++)
              ((v3 = p2[r2] - p2[r2 - 1]),
                r2++,
                (u4[e53] = mS(_2, o2, v3, true)),
                (o2 += v3 * 2))
          } else {
            ;((g3 = pS(e52.vertexBufferType, _2, m2, s2, v3, true, c2)),
              (s2 += v3))
            for (let t3 = 0; t3 < u4.length; t3++)
              ((v3 = p2[r2] - p2[r2 - 1]),
                r2++,
                (u4[t3] = pS(e52.vertexBufferType, _2, m2, s2, v3, true, c2)),
                (s2 += v3))
          }
          ;((t2[a2++] = [g3].concat(u4)), d2 && i2++)
        }
        break
      case lS.MULTILINESTRING:
        {
          let l2 = d2[i2] - d2[i2 - 1]
          i2++
          let u4 = Array(l2)
          for (let t3 = 0; t3 < l2; t3++) {
            let i3
            if (
              (g2
                ? ((i3 = p2[r2] - p2[r2 - 1]), r2++)
                : (i3 = f2[n2] - f2[n2 - 1]),
              n2++,
              h2)
            )
              ((u4[t3] = mS(_2, o2, i3, false)), (o2 += i3 * 2))
            else {
              let n3 = pS(e52.vertexBufferType, _2, m2, s2, i3, false, c2)
              ;((u4[t3] = n3), (s2 += i3))
            }
          }
          t2[a2++] = u4
        }
        break
      case lS.MULTIPOLYGON:
        {
          let l2 = d2[i2] - d2[i2 - 1]
          i2++
          let u4 = Array(l2)
          for (let t3 = 0; t3 < l2; t3++) {
            let i3 = f2[n2] - f2[n2 - 1]
            n2++
            let a3,
              l3 = Array(i3 - 1),
              d3 = p2[r2] - p2[r2 - 1]
            ;(r2++,
              h2
                ? ((a3 = mS(_2, o2, d3, true)), (o2 += d3 * 2))
                : ((a3 = pS(e52.vertexBufferType, _2, m2, s2, d3, true, c2)),
                  (s2 += d3)))
            for (let t4 = 0; t4 < l3.length; t4++) {
              let n3 = p2[r2] - p2[r2 - 1]
              ;(r2++,
                h2
                  ? ((l3[t4] = mS(_2, o2, n3, true)), (o2 += n3 * 2))
                  : ((l3[t4] = pS(
                      e52.vertexBufferType,
                      _2,
                      m2,
                      s2,
                      n3,
                      true,
                      c2
                    )),
                    (s2 += n3)))
            }
            u4[t3] = [a3].concat(l3)
          }
          t2[a2++] = u4.flat()
        }
        break
      default:
        throw Error(
          `The specified geometry type (${v2}) is currently not supported.`
        )
    }
  }
  return t2
}
function pS(e52, t2, n2, r2, i2, a2, o2) {
  return e52 === dS.MORTON ? gS(t2, n2, r2, i2, a2, o2) : hS(t2, n2, r2, i2, a2)
}
function mS(e52, t2, n2, r2) {
  let i2 = Array(r2 ? n2 + 1 : n2)
  for (let r3 = 0; r3 < n2 * 2; r3 += 2) {
    let n3 = e52[t2 + r3],
      a2 = e52[t2 + r3 + 1]
    i2[r3 / 2] = new l(n3, a2)
  }
  return (r2 && (i2[i2.length - 1] = i2[0]), i2)
}
function hS(e52, t2, n2, r2, i2) {
  let a2 = Array(i2 ? r2 + 1 : r2)
  for (let i3 = 0; i3 < r2 * 2; i3 += 2) {
    let r3 = t2[n2 + i3 / 2] * 2,
      o2 = e52[r3],
      s2 = e52[r3 + 1]
    a2[i3 / 2] = new l(o2, s2)
  }
  return (i2 && (a2[a2.length - 1] = a2[0]), a2)
}
function gS(e52, t2, n2, r2, i2, a2) {
  let o2 = Array(i2 ? r2 + 1 : r2)
  for (let i3 = 0; i3 < r2; i3++) {
    let r3 = e52[t2[n2 + i3]],
      s2 = sS(r3, a2.numBits, a2.coordinateShift)
    o2[i3] = new l(s2.x, s2.y)
  }
  return (i2 && (o2[o2.length - 1] = o2[0]), o2)
}
var _S = class {
  constructor(e52, t2, n2, r2, i2) {
    ;((this._vertexBufferType = e52),
      (this._topologyVector = t2),
      (this._vertexOffsets = n2),
      (this._vertexBuffer = r2),
      (this._mortonSettings = i2))
  }
  get vertexBufferType() {
    return this._vertexBufferType
  }
  get topologyVector() {
    return this._topologyVector
  }
  get vertexOffsets() {
    return this._vertexOffsets
  }
  get vertexBuffer() {
    return this._vertexBuffer
  }
  getSimpleEncodedVertex(e52) {
    let t2 = this.vertexOffsets ? this.vertexOffsets[e52] * 2 : e52 * 2
    return [this.vertexBuffer[t2], this.vertexBuffer[t2 + 1]]
  }
  getVertex(e52) {
    if (this.vertexOffsets && this.mortonSettings) {
      let t3 = this.vertexOffsets[e52],
        n2 = this.vertexBuffer[t3],
        r2 = sS(
          n2,
          this.mortonSettings.numBits,
          this.mortonSettings.coordinateShift
        )
      return [r2.x, r2.y]
    }
    let t2 = this.vertexOffsets ? this.vertexOffsets[e52] * 2 : e52 * 2
    return [this.vertexBuffer[t2], this.vertexBuffer[t2 + 1]]
  }
  getGeometries() {
    return fS(this)
  }
  get mortonSettings() {
    return this._mortonSettings
  }
}
function vS(e52, t2, n2, r2, i2) {
  return new bS(e52, t2, dS.VEC_2, n2, r2, i2)
}
function yS(e52, t2, n2, r2, i2, a2) {
  return new bS(e52, t2, dS.MORTON, n2, r2, i2, a2)
}
var bS = class extends _S {
  constructor(e52, t2, n2, r2, i2, a2, o2) {
    ;(super(n2, r2, i2, a2, o2),
      (this._numGeometries = e52),
      (this._geometryType = t2))
  }
  geometryType(e52) {
    return this._geometryType
  }
  get numGeometries() {
    return this._numGeometries
  }
  containsPolygonGeometry() {
    return (
      this._geometryType === lS.POLYGON ||
      this._geometryType === lS.MULTIPOLYGON
    )
  }
  containsSingleGeometryType() {
    return true
  }
}
function xS(e52, t2, n2, r2) {
  return new CS(dS.VEC_2, e52, t2, n2, r2)
}
function SS(e52, t2, n2, r2, i2) {
  return new CS(dS.MORTON, e52, t2, n2, r2, i2)
}
var CS = class extends _S {
    constructor(e52, t2, n2, r2, i2, a2) {
      ;(super(e52, n2, r2, i2, a2), (this._geometryTypes = t2))
    }
    geometryType(e52) {
      return this._geometryTypes[e52]
    }
    get numGeometries() {
      return this._geometryTypes.length
    }
    containsPolygonGeometry() {
      for (let e52 = 0; e52 < this.numGeometries; e52++)
        if (
          this.geometryType(e52) === lS.POLYGON ||
          this.geometryType(e52) === lS.MULTIPOLYGON
        )
          return true
      return false
    }
    containsSingleGeometryType() {
      return false
    }
  },
  wS = class {
    constructor(e52, t2, n2, r2) {
      ;((this._triangleOffsets = e52),
        (this._indexBuffer = t2),
        (this._vertexBuffer = n2),
        (this._topologyVector = r2))
    }
    get triangleOffsets() {
      return this._triangleOffsets
    }
    get indexBuffer() {
      return this._indexBuffer
    }
    get vertexBuffer() {
      return this._vertexBuffer
    }
    get topologyVector() {
      return this._topologyVector
    }
    getGeometries() {
      if (!this._topologyVector)
        throw Error(
          `Cannot convert GpuVector to coordinates without topology information`
        )
      let e52 = new Uint32Array(this.numGeometries)
      for (let t2 = 0; t2 < this.numGeometries; t2++)
        e52[t2] = this.geometryType(t2)
      return xS(
        e52,
        this._topologyVector,
        void 0,
        this._vertexBuffer
      ).getGeometries()
    }
    [Symbol.iterator]() {
      return null
    }
  }
function TS(e52, t2, n2, r2, i2, a2) {
  return new ES(e52, t2, n2, r2, i2, a2)
}
var ES = class extends wS {
  constructor(e52, t2, n2, r2, i2, a2) {
    ;(super(n2, r2, i2, a2),
      (this._numGeometries = e52),
      (this._geometryType = t2))
  }
  geometryType(e52) {
    return this._geometryType
  }
  get numGeometries() {
    return this._numGeometries
  }
  containsSingleGeometryType() {
    return true
  }
}
function DS(e52, t2, n2, r2, i2) {
  return new OS(e52, t2, n2, r2, i2)
}
var OS = class extends wS {
  constructor(e52, t2, n2, r2, i2) {
    ;(super(t2, n2, r2, i2), (this._geometryTypes = e52))
  }
  geometryType(e52) {
    return this._geometryTypes[e52]
  }
  get numGeometries() {
    return this._geometryTypes.length
  }
  containsSingleGeometryType() {
    return false
  }
}
function kS(e52, t2, n2, r2, i2) {
  let a2 = Q(e52, n2),
    o2 = nS(a2, r2, e52, n2),
    s2,
    c2,
    l2,
    u2
  if (o2 === $.CONST) {
    let o3 = Vx(e52, n2, a2),
      d3,
      f3,
      p3,
      m3
    for (let r3 = 0; r3 < t2 - 1; r3++) {
      let t3 = Q(e52, n2)
      switch (t3.physicalStreamType) {
        case lx.LENGTH:
          switch (t3.logicalStreamType.lengthType) {
            case fx.GEOMETRIES:
              d3 = Lx(e52, n2, t3)
              break
            case fx.PARTS:
              f3 = Lx(e52, n2, t3)
              break
            case fx.RINGS:
              p3 = Lx(e52, n2, t3)
              break
            case fx.TRIANGLES:
              m3 = Lx(e52, n2, t3)
          }
          break
        case lx.OFFSET:
          switch (t3.logicalStreamType.offsetType) {
            case dx.VERTEX:
              s2 = Ix(e52, n2, t3)
              break
            case dx.INDEX:
              u2 = Ix(e52, n2, t3)
          }
          break
        case lx.DATA:
          if (ux.VERTEX === t3.logicalStreamType.dictionaryType)
            c2 = Fx(e52, n2, t3, i2)
          else {
            let r4 = t3
            ;((l2 = {numBits: r4.numBits, coordinateShift: r4.coordinateShift}),
              (c2 = Ix(e52, n2, t3, i2)))
          }
      }
    }
    return u2
      ? d3 !== void 0 || f3 !== void 0
        ? TS(r2, o3, m3, u2, c2, {
            geometryOffsets: d3,
            partOffsets: f3,
            ringOffsets: p3,
          })
        : TS(r2, o3, m3, u2, c2)
      : l2 === void 0
        ? vS(
            r2,
            o3,
            {geometryOffsets: d3, partOffsets: f3, ringOffsets: p3},
            s2,
            c2
          )
        : yS(
            r2,
            o3,
            {geometryOffsets: d3, partOffsets: f3, ringOffsets: p3},
            s2,
            c2,
            l2
          )
  }
  let d2 = Ix(e52, n2, a2),
    f2,
    p2,
    m2,
    h2
  for (let r3 = 0; r3 < t2 - 1; r3++) {
    let t3 = Q(e52, n2)
    switch (t3.physicalStreamType) {
      case lx.LENGTH:
        switch (t3.logicalStreamType.lengthType) {
          case fx.GEOMETRIES:
            f2 = Ix(e52, n2, t3)
            break
          case fx.PARTS:
            p2 = Ix(e52, n2, t3)
            break
          case fx.RINGS:
            m2 = Ix(e52, n2, t3)
            break
          case fx.TRIANGLES:
            h2 = Lx(e52, n2, t3)
        }
        break
      case lx.OFFSET:
        switch (t3.logicalStreamType.offsetType) {
          case dx.VERTEX:
            s2 = Ix(e52, n2, t3)
            break
          case dx.INDEX:
            u2 = Ix(e52, n2, t3)
        }
        break
      case lx.DATA:
        if (ux.VERTEX === t3.logicalStreamType.dictionaryType)
          c2 = Fx(e52, n2, t3, i2)
        else {
          let r4 = t3
          ;((l2 = {numBits: r4.numBits, coordinateShift: r4.coordinateShift}),
            (c2 = Ix(e52, n2, t3, i2)))
        }
    }
  }
  let g2, _2, v2
  return (
    f2
      ? ((g2 = AS(d2, f2, 2)),
        p2 && m2
          ? ((_2 = jS(d2, g2, p2, false)), (v2 = NS(d2, g2, _2, m2)))
          : p2 && (_2 = MS(d2, g2, p2)))
      : p2 && m2
        ? ((_2 = AS(d2, p2, 1)), (v2 = jS(d2, _2, m2, true)))
        : p2 && (_2 = AS(d2, p2, 0)),
    u2 && !_2
      ? DS(d2, h2, u2, c2)
      : u2
        ? DS(d2, h2, u2, c2, {
            geometryOffsets: g2,
            partOffsets: _2,
            ringOffsets: v2,
          })
        : l2 === void 0
          ? xS(
              d2,
              {geometryOffsets: g2, partOffsets: _2, ringOffsets: v2},
              s2,
              c2
            )
          : SS(
              d2,
              {geometryOffsets: g2, partOffsets: _2, ringOffsets: v2},
              s2,
              c2,
              l2
            )
  )
}
function AS(e52, t2, n2) {
  let r2 = new Uint32Array(e52.length + 1),
    i2 = 0
  r2[0] = i2
  let a2 = 0
  for (let o2 = 0; o2 < e52.length; o2++)
    i2 = r2[o2 + 1] = i2 + (e52[o2] > n2 ? t2[a2++] : 1)
  return r2
}
function jS(e52, t2, n2, r2) {
  let i2 = new Uint32Array(t2[t2.length - 1] + 1),
    a2 = 0
  i2[0] = a2
  let o2 = 1,
    s2 = 0
  for (let c2 = 0; c2 < e52.length; c2++) {
    let l2 = e52[c2],
      u2 = t2[c2 + 1] - t2[c2]
    if (l2 === 5 || l2 === 2 || (r2 && (l2 === 4 || l2 === 1)))
      for (let e53 = 0; e53 < u2; e53++) a2 = i2[o2++] = a2 + n2[s2++]
    else for (let e53 = 0; e53 < u2; e53++) i2[o2++] = ++a2
  }
  return i2
}
function MS(e52, t2, n2) {
  let r2 = new Uint32Array(t2[t2.length - 1] + 1),
    i2 = 0
  r2[0] = i2
  let a2 = 1,
    o2 = 0
  for (let s2 = 0; s2 < e52.length; s2++) {
    let c2 = e52[s2],
      l2 = t2[s2 + 1] - t2[s2]
    if (c2 === 4 || c2 === 1)
      for (let e53 = 0; e53 < l2; e53++) i2 = r2[a2++] = i2 + n2[o2++]
    else for (let e53 = 0; e53 < l2; e53++) r2[a2++] = ++i2
  }
  return r2
}
function NS(e52, t2, n2, r2) {
  let i2 = new Uint32Array(n2[n2.length - 1] + 1),
    a2 = 0
  i2[0] = a2
  let o2 = 1,
    s2 = 1,
    c2 = 0
  for (let l2 = 0; l2 < e52.length; l2++) {
    let u2 = e52[l2],
      d2 = t2[l2 + 1] - t2[l2]
    if (u2 !== 0 && u2 !== 3)
      for (let e53 = 0; e53 < d2; e53++) {
        let e54 = n2[o2] - n2[o2 - 1]
        o2++
        for (let t3 = 0; t3 < e54; t3++) a2 = i2[s2++] = a2 + r2[c2++]
      }
    else for (let e53 = 0; e53 < d2; e53++) ((i2[s2++] = ++a2), o2++)
  }
  return i2
}
var PS = class extends hy {
    constructor(e52, t2, n2) {
      ;(super(e52, t2.getBuffer(), n2), (this.dataVector = t2))
    }
    getValueFromBuffer(e52) {
      return this.dataVector.get(e52)
    }
  },
  FS = class extends gy {
    getValueFromBuffer(e52) {
      return this.dataBuffer[e52]
    }
  },
  IS = class extends hy {
    constructor(e52, t2, n2, r2) {
      super(e52, r2 ? BigInt64Array.of(t2) : BigUint64Array.of(t2), n2)
    }
    getValueFromBuffer(e52) {
      return this.dataBuffer[0]
    }
  },
  LS = class extends hy {
    constructor(e52, t2, n2, r2) {
      ;(super(e52, n2, r2), (this.offsetBuffer = t2))
    }
  },
  RS = class extends LS {
    constructor(e52, t2, n2, r2) {
      super(e52, t2, n2, r2 ?? t2.length - 1)
    }
    getValueFromBuffer(e52) {
      let t2 = this.offsetBuffer[e52],
        n2 = this.offsetBuffer[e52 + 1]
      return Nx(this.dataBuffer, t2, n2)
    }
  },
  zS = class extends LS {
    constructor(e52, t2, n2, r2, i2) {
      ;(super(e52, n2, r2, i2 ?? t2.length),
        (this.indexBuffer = t2),
        (this.indexBuffer = t2))
    }
    getValueFromBuffer(e52) {
      let t2 = this.indexBuffer[e52],
        n2 = this.offsetBuffer[t2],
        r2 = this.offsetBuffer[t2 + 1]
      return Nx(this.dataBuffer, n2, r2)
    }
  }
function BS(e52, t2) {
  let n2 = 0
  for (let r2 = 0; r2 < t2.length; r2++) {
    let i2 = t2[r2]
    i2 === 255 ? (n2++, r2++) : (n2 += e52[i2])
  }
  return n2
}
function VS(e52, t2, n2) {
  let r2 = new Uint32Array(t2.length)
  for (let e53 = 1; e53 < t2.length; e53++) r2[e53] = r2[e53 - 1] + t2[e53 - 1]
  let i2 = new Uint8Array(BS(t2, n2)),
    a2 = 0
  for (let o2 = 0; o2 < n2.length; o2++) {
    let s2 = n2[o2]
    if (s2 === 255) (o2++, (i2[a2++] = n2[o2]))
    else {
      let n3 = t2[s2],
        o3 = r2[s2]
      for (; n3-- > 0;) i2[a2++] = e52[o3++]
    }
  }
  return i2
}
var HS = class extends LS {
  constructor(e52, t2, n2, r2, i2, a2, o2, s2) {
    ;(super(e52, n2, r2, o2 ?? t2.length),
      (this.indexBuffer = t2),
      (this.symbolOffsetBuffer = i2),
      (this.symbolTableBuffer = a2),
      (this.sharedDictionaryCache = s2))
  }
  getValueFromBuffer(e52) {
    this.decodedDictionary ??
      ((this.decodedDictionary = this.sharedDictionaryCache?.decodedDictionary),
      this.decodedDictionary ??
        ((this.decodedDictionary = this.decodeDictionary()),
        this.sharedDictionaryCache &&
          (this.sharedDictionaryCache.decodedDictionary =
            this.decodedDictionary)))
    let t2 = this.indexBuffer[e52],
      n2 = this.offsetBuffer[t2],
      r2 = this.offsetBuffer[t2 + 1]
    return Nx(this.decodedDictionary, n2, r2)
  }
  decodeDictionary() {
    return (
      (this.symbolLengthBuffer ??= this.offsetToLengthBuffer(
        this.symbolOffsetBuffer
      )),
      VS(this.symbolTableBuffer, this.symbolLengthBuffer, this.dataBuffer)
    )
  }
  offsetToLengthBuffer(e52) {
    let t2 = new Uint32Array(e52.length - 1),
      n2 = e52[0]
    for (let r2 = 1; r2 < e52.length; r2++) {
      let i2 = e52[r2]
      ;((t2[r2 - 1] = i2 - n2), (n2 = i2))
    }
    return t2
  }
}
function US(e52, t2, n2, r2, i2) {
  let a2,
    o2,
    s2,
    c2,
    l2,
    u2 = i2,
    d2,
    f2
  for (let e53 = 0; e53 < r2; e53++) {
    let e54 = Q(t2, n2)
    switch (e54.physicalStreamType) {
      case lx.PRESENT: {
        let r3 = new Sx(
          Ex(t2, e54.numValues, e54.byteLength, n2),
          e54.numValues
        )
        u2 = i2 ?? r3
        break
      }
      case lx.OFFSET:
        o2 = Ix(t2, n2, e54, void 0, u2)
        break
      case lx.LENGTH: {
        let r3 = Lx(t2, n2, e54)
        fx.DICTIONARY === e54.logicalStreamType.lengthType
          ? (a2 = r3)
          : fx.SYMBOL === e54.logicalStreamType.lengthType
            ? (c2 = r3)
            : (d2 = r3)
        break
      }
      case lx.DATA: {
        let r3 = t2.subarray(n2.get(), n2.get() + e54.byteLength)
        n2.add(e54.byteLength)
        let i3 = e54.logicalStreamType.dictionaryType
        ux.FSST === i3
          ? (l2 = r3)
          : ux.SINGLE === i3 || ux.SHARED === i3
            ? (s2 = r3)
            : ux.NONE === i3 && (f2 = r3)
        break
      }
    }
  }
  return (
    WS(e52, l2, o2, a2, s2, c2, u2) ??
    GS(e52, s2, o2, a2, u2) ??
    KS(e52, d2, f2, o2, u2)
  )
}
function WS(e52, t2, n2, r2, i2, a2, o2) {
  if (t2) {
    if (!n2 || !r2 || !i2 || !a2)
      throw Error(`Incomplete FSST dictionary string column "${e52}"`)
    return new HS(e52, n2, r2, i2, a2, t2, o2)
  }
}
function GS(e52, t2, n2, r2, i2) {
  if (t2) {
    if (!n2 || !r2) throw Error(`Incomplete dictionary string column "${e52}"`)
    return i2 ? new zS(e52, n2, r2, t2, i2) : new zS(e52, n2, r2, t2)
  }
}
function KS(e52, t2, n2, r2, i2) {
  if (!(!t2 || !n2)) {
    if (r2) return i2 ? new zS(e52, r2, t2, n2, i2) : new zS(e52, r2, t2, n2)
    if (i2 && i2.size() !== t2.length - 1) {
      let r3 = new Uint32Array(i2.size()),
        a2 = 0
      for (let e53 = 0; e53 < i2.size(); e53++)
        i2.get(e53) ? (r3[e53] = a2++) : (r3[e53] = 0)
      return new zS(e52, r3, t2, n2, i2)
    }
    return i2 ? new RS(e52, t2, n2, i2) : new RS(e52, t2, n2)
  }
}
function qS(e52, t2, n2, r2) {
  let i2,
    a2,
    o2,
    s2,
    c2 = false
  for (; !c2;) {
    let n3 = Q(e52, t2)
    switch (n3.physicalStreamType) {
      case lx.LENGTH:
        fx.DICTIONARY === n3.logicalStreamType.lengthType
          ? (i2 = Lx(e52, t2, n3))
          : (o2 = Lx(e52, t2, n3))
        break
      case lx.DATA:
        ;(ux.SINGLE === n3.logicalStreamType.dictionaryType ||
        ux.SHARED === n3.logicalStreamType.dictionaryType
          ? ((a2 = e52.subarray(t2.get(), t2.get() + n3.byteLength)),
            (c2 = true))
          : (s2 = e52.subarray(t2.get(), t2.get() + n3.byteLength)),
          t2.add(n3.byteLength))
    }
  }
  if (n2.type !== `complexType`)
    throw Error(
      `Shared dictionary column ${n2.name} must be a complex (struct) column.`
    )
  if (!i2 || !a2)
    throw Error(`Incomplete shared dictionary for column "${n2.name}"`)
  let l2 = n2.complexType.children,
    u2 = [],
    d2 = s2 ? {} : void 0,
    f2 = 0
  for (let c3 of l2) {
    let l3 = xb(e52, t2, 1)[0]
    if (l3 === 0) continue
    let p2 = c3.name ? `${n2.name}${c3.name}` : n2.name
    if (r2 && !r2.has(p2)) {
      Tx(l3, e52, t2)
      continue
    }
    if (c3.type !== `scalarField` || c3.scalarField.physicalType !== Y.STRING)
      throw Error(
        `Currently only scalar string fields are implemented for a struct.`
      )
    if ((l3 > 1 && !c3.nullable) || (l3 === 1 && c3.nullable))
      throw Error(
        `The number of streams for the child field ${c3.name} does not match its nullability. nullibilty: ${c3.nullable}, numStreams: ${l3}`
      )
    let m2
    if (c3.nullable) {
      let n3 = Q(e52, t2)
      m2 = new Sx(Ex(e52, n3.numValues, n3.byteLength, t2), n3.numValues)
    }
    let h2 = Ix(e52, t2, Q(e52, t2), void 0, m2)
    if (s2) {
      if (!o2)
        throw Error(`Incomplete shared FSST dictionary for column "${p2}"`)
      u2[f2++] = new HS(p2, h2, i2, a2, o2, s2, m2, d2)
    } else u2[f2++] = new zS(p2, h2, i2, a2, m2)
  }
  return u2
}
var JS = class extends hy {
    constructor(e52, t2, n2) {
      ;(super(e52, new Uint8Array(), n2 ?? t2.length), (this.values = t2))
    }
    getValueFromBuffer(e52) {
      return this.values[e52]
    }
  },
  YS
;(function (e52) {
  ;((e52[(e52.STRING = 1)] = `STRING`),
    (e52[(e52.INT32 = 2)] = `INT32`),
    (e52[(e52.UINT32 = 4)] = `UINT32`),
    (e52[(e52.INT64 = 8)] = `INT64`),
    (e52[(e52.UINT64 = 16)] = `UINT64`),
    (e52[(e52.FLOAT = 32)] = `FLOAT`),
    (e52[(e52.DOUBLE = 64)] = `DOUBLE`),
    (e52[(e52.PRESENCE = 128)] = `PRESENCE`))
})((YS ||= {}))
var XS
;(function (e52) {
  ;((e52[(e52.FALSE = 0)] = `FALSE`),
    (e52[(e52.TRUE = 1)] = `TRUE`),
    (e52[(e52.START_MAP = 2)] = `START_MAP`),
    (e52[(e52.START_LIST = 3)] = `START_LIST`),
    (e52[(e52.COUNT = 4)] = `COUNT`))
})((XS ||= {}))
function ZS(e52, t2, n2, r2) {
  let i2 = QS(n2)
  if (r2 === 0) return i2.map(e53 => new JS(e53, []))
  let a2 = $S(e52, t2, r2),
    o2 =
      (a2.presentStream ? a2.presentCount : a2.lengthStream.length) / i2.length,
    s2 = [],
    c2 = 0,
    l2 = 0
  for (let e53 = 0; e53 < i2.length; e53++) {
    let t3 = iC(a2, e53, o2, c2, l2)
    ;(s2.push(new JS(i2[e53], t3.value, t3.nullabilityBuffer)),
      (c2 = t3.countsEnd),
      (l2 = t3.valuesEnd))
  }
  return s2
}
function QS(e52) {
  let t2 = e52.type === `complexType` ? e52.complexType.children : void 0
  return !t2 || t2.length === 0
    ? [e52.name]
    : t2.map(t3 => e52.name + (t3.name ?? ``))
}
function $S(e52, t2, n2) {
  let r2 = e52[t2.get()]
  t2.add(1)
  let i2 = Ix(e52, t2, Q(e52, t2)),
    a2 = n2 - 1,
    o2 = []
  ;(r2 & YS.STRING && (a2 -= eC(e52, t2, o2)),
    (a2 -= tC(e52, t2, r2, o2)),
    (a2 -= nC(e52, t2, r2, o2)))
  let s2,
    c2 = 0
  if (r2 & YS.PRESENCE) {
    let n3 = rC(e52, t2)
    ;((s2 = n3.value), (c2 = n3.count), a2--)
  }
  let l2 = new Uint32Array()
  if ((a2 > 0 && ((l2 = Ix(e52, t2, Q(e52, t2))), a2--), a2 !== 0))
    throw Error(
      `Unexpected number of remaining streams while decoding map column: ${a2}`
    )
  return {
    lengthStream: i2,
    dictionary: o2,
    presentStream: s2,
    presentCount: c2,
    flattenedValues: l2,
  }
}
function eC(e52, t2, n2) {
  let r2 = e52[t2.get()]
  t2.add(1)
  let i2 = US(``, e52, t2, r2)
  if (i2) for (let e53 = 0; e53 < i2.size; e53++) n2.push(i2.getValue(e53))
  return r2
}
function tC(e52, t2, n2, r2) {
  let i2 = 0
  return (
    n2 & YS.INT32
      ? (uC(r2, Fx(e52, t2, Q(e52, t2))), i2++)
      : n2 & YS.INT64 && (uC(r2, Wx(e52, t2, Q(e52, t2))), i2++),
    n2 & YS.UINT32
      ? (uC(r2, Ix(e52, t2, Q(e52, t2))), i2++)
      : n2 & YS.UINT64 && (uC(r2, Gx(e52, t2, Q(e52, t2))), i2++),
    i2
  )
}
function nC(e52, t2, n2, r2) {
  let i2 = 0
  return (
    n2 & YS.FLOAT && (uC(r2, Ox(e52, t2, Q(e52, t2).numValues)), i2++),
    n2 & YS.DOUBLE && (uC(r2, kx(e52, t2, Q(e52, t2).numValues)), i2++),
    i2
  )
}
function rC(e52, t2) {
  let n2 = Q(e52, t2)
  if (n2.physicalStreamType !== lx.PRESENT)
    throw Error(
      `Expected PRESENT stream for map column but found: ${n2.physicalStreamType}`
    )
  let r2 = n2.numValues,
    i2 = t2.get(),
    a2 = new Sx(Ex(e52, r2, n2.byteLength, t2), r2)
  return (t2.set(i2 + n2.byteLength), {value: a2, count: r2})
}
function iC(e52, t2, n2, r2, i2) {
  let {
      lengthStream: a2,
      flattenedValues: o2,
      presentStream: s2,
      dictionary: c2,
    } = e52,
    l2 = t2 * n2,
    u2 = n2,
    d2
  if (s2) {
    ;((d2 = new Sx(new Uint8Array(Math.ceil(n2 / 8)), n2)), (u2 = 0))
    for (let e53 = 0; e53 < n2; e53++)
      s2.get(l2 + e53) && (d2.set(e53, true), u2++)
  }
  let f2 = r2 + u2
  if (f2 > a2.length)
    throw Error(`Merged map counts underflow while decoding child streams`)
  let p2 = Array(n2),
    m2 = r2,
    h2 = i2
  for (let e53 = 0; e53 < n2; e53++) {
    if (s2 && !s2.get(l2 + e53)) {
      p2[e53] = null
      continue
    }
    let t3 = h2 + a2[m2++]
    if (t3 > o2.length)
      throw Error(`Map value stream underflow while decoding feature payload`)
    let n3 = aC(o2, h2, t3, c2)
    ;((p2[e53] = n3.value), (h2 = n3.nextIndex))
  }
  let g2 = 0
  for (let e53 = r2; e53 < f2; e53++) g2 += a2[e53]
  let _2 = i2 + g2
  if (h2 !== _2) throw Error(`Unused flattened map values remain after decode`)
  return {value: p2, nullabilityBuffer: d2, countsEnd: f2, valuesEnd: _2}
}
function aC(e52, t2, n2, r2) {
  return n2 - t2 === 1 || e52[t2] === XS.START_LIST
    ? sC(e52, t2, n2, r2)
    : oC(e52, t2, n2, r2)
}
function oC(e52, t2, n2, r2) {
  let i2 = /* @__PURE__ */ Object.create(null),
    a2 = t2
  for (; a2 < n2;) {
    let t3 = lC(e52[a2++], r2)
    if (typeof t3 != `string`)
      throw Error(
        `Map key dictionary index does not resolve to a string: ${t3}`
      )
    let o2 = sC(e52, a2, n2, r2)
    ;((i2[t3] = o2.value), (a2 = o2.nextIndex))
  }
  return {value: i2, nextIndex: a2}
}
function sC(e52, t2, n2, r2) {
  if (t2 >= n2) throw Error(`Unexpected end of map value stream`)
  let i2 = e52[t2]
  if (i2 === XS.FALSE) return {value: false, nextIndex: t2 + 1}
  if (i2 === XS.TRUE) return {value: true, nextIndex: t2 + 1}
  if (i2 === XS.START_MAP) {
    let i3 = cC(e52, t2, n2)
    return {value: oC(e52, t2 + 2, i3, r2).value, nextIndex: i3}
  }
  if (i2 === XS.START_LIST) {
    let i3 = cC(e52, t2, n2),
      a2 = [],
      o2 = t2 + 2
    for (; o2 < i3;) {
      let t3 = sC(e52, o2, i3, r2)
      ;(a2.push(t3.value), (o2 = t3.nextIndex))
    }
    return {value: a2, nextIndex: i3}
  }
  return {value: lC(i2, r2), nextIndex: t2 + 1}
}
function cC(e52, t2, n2) {
  if (t2 + 1 >= n2) throw Error(`Missing length for nested map/list payload`)
  let r2 = e52[t2 + 1]
  if (r2 < 2) throw Error(`Invalid nested payload length: ${r2}`)
  let i2 = t2 + r2
  if (i2 > n2) throw Error(`Nested payload exceeds containing payload bounds`)
  return i2
}
function lC(e52, t2) {
  let n2 = e52 - XS.COUNT
  if (n2 < 0 || n2 >= t2.length)
    throw Error(`Scalar dictionary index out of range: ${e52}`)
  return t2[n2]
}
function uC(e52, t2) {
  for (let n2 of t2) e52.push(n2)
}
function dC(e52, t2, n2, r2, i2, a2) {
  return n2.type === `scalarType`
    ? a2 && !a2.has(n2.name)
      ? (Tx(r2, e52, t2), null)
      : fC(r2, e52, t2, i2, n2.scalarType, n2)
    : n2.complexType?.physicalType === wy.MAP
      ? ZS(e52, t2, n2, r2)
      : r2 === 0
        ? null
        : qS(e52, t2, n2, a2)
}
function fC(e52, t2, n2, r2, i2, a2) {
  let o2
  if (e52 === 0) return null
  if (a2.nullable) {
    let e53 = Q(t2, n2),
      r3 = e53.numValues,
      i3 = n2.get(),
      a3 = Ex(t2, r3, e53.byteLength, n2)
    ;(n2.set(i3 + e53.byteLength), (o2 = new Sx(a3, e53.numValues)))
  }
  let s2 = o2 ?? r2
  switch (i2.physicalType) {
    case Y.UINT_32:
    case Y.INT_32:
      return _C(t2, n2, a2, i2, s2)
    case Y.STRING: {
      let r3 = a2.nullable ? e52 - 1 : e52
      return US(a2.name, t2, n2, r3, o2) ?? null
    }
    case Y.BOOLEAN:
      return pC(t2, n2, a2, r2, s2)
    case Y.UINT_64:
    case Y.INT_64:
      return gC(t2, n2, a2, s2, i2)
    case Y.FLOAT:
      return mC(t2, n2, a2, s2)
    case Y.DOUBLE:
      return hC(t2, n2, a2, s2)
    default:
      throw Error(
        `The specified data type for the field is currently not supported: ${i2}`
      )
  }
}
function pC(e52, t2, n2, r2, i2) {
  let a2 = Q(e52, t2),
    o2 = a2.numValues,
    s2 = t2.get(),
    c2 = vC(i2) ? i2 : void 0,
    l2 = Ex(e52, o2, a2.byteLength, t2, c2)
  t2.set(s2 + a2.byteLength)
  let u2 = new Sx(l2, o2)
  return new PS(n2.name, u2, i2)
}
function mC(e52, t2, n2, r2) {
  let i2 = Q(e52, t2),
    a2 = vC(r2) ? r2 : void 0,
    o2 = Ox(e52, t2, i2.numValues, a2)
  return new FS(n2.name, o2, r2)
}
function hC(e52, t2, n2, r2) {
  let i2 = Q(e52, t2),
    a2 = vC(r2) ? r2 : void 0,
    o2 = kx(e52, t2, i2.numValues, a2)
  return new vy(n2.name, o2, r2)
}
function gC(e52, t2, n2, r2, i2) {
  let a2 = Q(e52, t2),
    o2 = nS(a2, r2, e52, t2, `int64`),
    s2 = i2.physicalType === Y.INT_64
  if (o2 === $.FLAT) {
    let i3 = vC(r2) ? r2 : void 0,
      o3 = s2 ? Wx(e52, t2, a2, i3) : Gx(e52, t2, a2, i3)
    return new aS(n2.name, o3, r2)
  }
  if (o2 === $.SEQUENCE) {
    let r3 = Ux(e52, t2, a2)
    return new oS(n2.name, r3[0], r3[1], a2.numRleValues, s2)
  }
  let c2 = s2 ? Jx(e52, t2, a2) : Yx(e52, t2, a2)
  return new IS(n2.name, c2, r2, s2)
}
function _C(e52, t2, n2, r2, i2) {
  let a2 = Q(e52, t2),
    o2 = nS(a2, i2, e52, t2),
    s2 = r2.physicalType === Y.INT_32
  if (o2 === $.FLAT) {
    let r3 = vC(i2) ? i2 : void 0,
      o3 = s2 ? Fx(e52, t2, a2, void 0, r3) : Ix(e52, t2, a2, void 0, r3)
    return new _y(n2.name, o3, i2)
  }
  if (o2 === $.SEQUENCE) {
    let r3 = Hx(e52, t2, a2)
    return new by(n2.name, r3[0], r3[1], a2.numRleValues, s2)
  }
  let c2 = s2 ? Bx(e52, t2, a2) : Vx(e52, t2, a2)
  return new xy(n2.name, c2, i2, s2)
}
function vC(e52) {
  return e52 instanceof Sx
}
const yC = {
  ID: 0,
  ID_NULLABLE: 1,
  ID_LONG: 2,
  GEOMETRY: 4,
  SCALAR_BASE: 10,
  STRUCT: 30,
  MAP: 31,
}
function bC(e52) {
  switch (e52) {
    case yC.ID:
    case yC.ID | yC.ID_NULLABLE:
    case yC.ID | yC.ID_LONG:
    case yC.ID | yC.ID_LONG | yC.ID_NULLABLE:
      return {
        nullable: (e52 & yC.ID_NULLABLE) !== 0,
        columnScope: Cy.FEATURE,
        type: `scalarType`,
        scalarType: {
          longID: (e52 & yC.ID_LONG) !== 0,
          type: `logicalType`,
          logicalType: Ty.ID,
        },
      }
    case yC.GEOMETRY:
      return {
        nullable: false,
        columnScope: Cy.FEATURE,
        type: `complexType`,
        complexType: {
          type: `physicalType`,
          physicalType: wy.GEOMETRY,
          children: [],
        },
      }
    case yC.STRUCT:
      return {
        nullable: false,
        columnScope: Cy.FEATURE,
        type: `complexType`,
        complexType: {
          type: `physicalType`,
          physicalType: wy.STRUCT,
          children: [],
        },
      }
    case yC.MAP:
      return {
        nullable: true,
        columnScope: Cy.FEATURE,
        type: `complexType`,
        complexType: {type: `physicalType`, physicalType: wy.MAP, children: []},
      }
    default:
      return EC(e52)
  }
}
function xC(e52) {
  return e52 >= yC.SCALAR_BASE
}
function SC(e52) {
  return e52 === yC.STRUCT || e52 === yC.MAP
}
function CC(e52) {
  if (e52.type === `scalarType`) {
    let t2 = e52.scalarType
    if (t2.type === `physicalType`)
      switch (t2.physicalType) {
        case Y.BOOLEAN:
        case Y.INT_8:
        case Y.UINT_8:
        case Y.INT_32:
        case Y.UINT_32:
        case Y.INT_64:
        case Y.UINT_64:
        case Y.FLOAT:
        case Y.DOUBLE:
          return false
        case Y.STRING:
          return true
        default:
          return false
      }
    if (t2.type === `logicalType`) return false
  } else if (e52.type === `complexType`) {
    let t2 = e52.complexType
    if (t2.type === `physicalType`)
      switch (t2.physicalType) {
        case wy.GEOMETRY:
        case wy.STRUCT:
        case wy.MAP:
          return true
        default:
          return false
      }
  }
  return (console.warn(`Unexpected column type in hasStreamCount`, e52), false)
}
function wC(e52) {
  return (
    e52.type === `scalarType` &&
    e52.scalarType?.type === `logicalType` &&
    e52.scalarType.logicalType === Ty.ID
  )
}
function TC(e52) {
  return (
    e52.type === `complexType` &&
    e52.complexType?.type === `physicalType` &&
    e52.complexType.physicalType === wy.GEOMETRY
  )
}
function EC(e52) {
  let t2
  switch (e52) {
    case 10:
    case 11:
      t2 = Y.BOOLEAN
      break
    case 12:
    case 13:
      t2 = Y.INT_8
      break
    case 14:
    case 15:
      t2 = Y.UINT_8
      break
    case 16:
    case 17:
      t2 = Y.INT_32
      break
    case 18:
    case 19:
      t2 = Y.UINT_32
      break
    case 20:
    case 21:
      t2 = Y.INT_64
      break
    case 22:
    case 23:
      t2 = Y.UINT_64
      break
    case 24:
    case 25:
      t2 = Y.FLOAT
      break
    case 26:
    case 27:
      t2 = Y.DOUBLE
      break
    case 28:
    case 29:
      t2 = Y.STRING
      break
    default:
      return null
  }
  return {
    nullable: !!(e52 & 1),
    columnScope: Cy.FEATURE,
    type: `scalarType`,
    scalarType: {longID: false, type: `physicalType`, physicalType: t2},
  }
}
const DC = new TextDecoder(),
  OC = `0-3(ID), 4(GEOMETRY), 10-29(scalars), 30(STRUCT), 31(MAP)`
function kC(e52, t2) {
  let n2 = xb(e52, t2, 1)[0]
  if (n2 === 0) return ``
  let r2 = t2.get(),
    i2 = r2 + n2,
    a2 = e52.subarray(r2, i2)
  return (t2.add(n2), DC.decode(a2))
}
function AC(e52) {
  let t2 = e52.name,
    n2 = e52.nullable
  return e52.type === `scalarType`
    ? {type: `scalarField`, scalarField: e52.scalarType, name: t2, nullable: n2}
    : {
        type: `complexField`,
        complexField: e52.complexType,
        name: t2,
        nullable: n2,
      }
}
function jC(e52, t2) {
  let n2 = xb(e52, t2, 1)[0] >>> 0,
    r2 = n2 >= yC.SCALAR_BASE ? bC(n2) : null
  if (!r2)
    throw Error(
      `Unsupported field type code ${n2}. Supported: 10-29(scalars), 30(STRUCT), 31(MAP)`
    )
  let i2 = {...r2, name: kC(e52, t2)}
  if (i2.type === `complexType` && SC(n2)) {
    let n3 = i2.complexType,
      r3 = xb(e52, t2, 1)[0] >>> 0
    n3.children = Array(r3)
    for (let i3 = 0; i3 < r3; i3++) n3.children[i3] = jC(e52, t2)
  }
  return AC(i2)
}
function MC(e52, t2) {
  let n2 = xb(e52, t2, 1)[0] >>> 0,
    r2 = bC(n2)
  if (!r2) throw Error(`Unsupported column type code ${n2}. Supported: ${OC}`)
  let i2
  if (xC(n2)) i2 = kC(e52, t2)
  else if (n2 < yC.GEOMETRY) i2 = `id`
  else if (n2 === yC.GEOMETRY) i2 = `geometry`
  else throw Error(`Unsupported column type code ${n2}. Supported: ${OC}`)
  let a2 = {...r2, name: i2}
  if (a2.type === `complexType` && SC(n2)) {
    let n3 = xb(e52, t2, 1)[0] >>> 0,
      r3 = a2.complexType
    r3.children = Array(n3)
    for (let i3 = 0; i3 < n3; i3++) r3.children[i3] = jC(e52, t2)
  }
  return a2
}
function NC(e52, t2) {
  let n2 = {}
  n2.featureTables = []
  let r2 = {}
  if (((r2.name = kC(e52, t2)), r2.name.length === 0))
    throw Error(`Missing layer name`)
  let i2 = xb(e52, t2, 1)[0] >>> 0,
    a2 = xb(e52, t2, 1)[0] >>> 0
  r2.columns = Array(a2)
  for (let n3 = 0; n3 < a2; n3++) r2.columns[n3] = MC(e52, t2)
  return (n2.featureTables.push(r2), [n2, i2])
}
function PC(e52, t2, n2 = true) {
  let r2 = new Ey(0),
    i2 = []
  for (; r2.get() < e52.length;) {
    let a2 = xb(e52, r2, 1)[0] >>> 0,
      o2 = r2.get() + a2
    if (o2 > e52.length)
      throw Error(`Block overruns tile: ${o2} > ${e52.length}`)
    let s2 = xb(e52, r2, 1)[0] >>> 0
    if (s2 !== 1 && s2 !== 2) {
      r2.set(o2)
      continue
    }
    let [c2, l2] = NC(e52, r2),
      u2 = c2.featureTables[0],
      d2 = null,
      f2 = null,
      p2 = [],
      m2 = 0
    for (let i3 of u2.columns) {
      let a3 = i3.name
      if (wC(i3)) {
        let t3 = null
        if (i3.nullable) {
          let n3 = Q(e52, r2),
            i4 = r2.get(),
            a4 = Ex(e52, n3.numValues, n3.byteLength, r2)
          ;(r2.set(i4 + n3.byteLength), (t3 = new Sx(a4, n3.numValues)))
        }
        let o3 = Q(e52, r2)
        ;((m2 = t3 ? t3.size() : o3.decompressedCount),
          (d2 = FC(e52, i3, r2, a3, o3, t3 ?? m2, n2)))
      } else if (TC(i3)) {
        let n3 = xb(e52, r2, 1)[0]
        if (m2 === 0) {
          let t3 = r2.get()
          ;((m2 = Q(e52, r2).decompressedCount), r2.set(t3))
        }
        ;(t2 && (t2.scale = t2.extent / l2), (f2 = kS(e52, n3, r2, m2, t2)))
      } else {
        let t3 = CC(i3) ? xb(e52, r2, 1)[0] : 1
        if (t3 === 0) continue
        let n3 = dC(e52, r2, i3, t3, m2, void 0)
        if (n3) {
          if (Array.isArray(n3)) for (let e53 of n3) p2.push(e53)
          else p2.push(n3)
        }
      }
    }
    let h2 = new Sy(u2.name, f2, d2, p2, l2)
    ;(i2.push(h2), r2.set(o2))
  }
  return i2
}
function FC(e52, t2, n2, r2, i2, a2, o2 = false) {
  let s2 = t2.scalarType?.longID ? Y.UINT_64 : Y.UINT_32,
    c2 = typeof a2 == `number` ? void 0 : a2,
    l2 = nS(i2, a2, e52, n2, s2 === Y.UINT_64 ? `int64` : `int32`)
  if (s2 === Y.UINT_32)
    switch (l2) {
      case $.FLAT:
        return new _y(r2, Ix(e52, n2, i2, void 0, c2), a2)
      case $.SEQUENCE: {
        let t3 = Hx(e52, n2, i2)
        return new by(r2, t3[0], t3[1], i2.numRleValues, false)
      }
      case $.CONST:
        return new xy(r2, Vx(e52, n2, i2), a2, false)
    }
  switch (l2) {
    case $.FLAT:
      return o2
        ? new vy(r2, Kx(e52, n2, i2, c2), a2)
        : new aS(r2, Gx(e52, n2, i2, c2), a2)
    case $.SEQUENCE: {
      let t3 = Ux(e52, n2, i2)
      return new oS(r2, t3[0], t3[1], i2.numRleValues, false)
    }
    case $.CONST:
      return new IS(r2, Yx(e52, n2, i2), a2, false)
  }
  throw Error(`Vector type not supported for id column.`)
}
var IC = class {
    constructor(e52, t2) {
      switch (
        ((this._featureData = e52),
        (this.properties = this._featureData.properties || {}),
        this._featureData.geometry?.type)
      ) {
        case lS.POINT:
        case lS.MULTIPOINT:
          this.type = 1
          break
        case lS.LINESTRING:
        case lS.MULTILINESTRING:
          this.type = 2
          break
        case lS.POLYGON:
        case lS.MULTIPOLYGON:
          this.type = 3
          break
        default:
          this.type = 0
      }
      ;((this.extent = t2), (this.id = Number(this._featureData.id)))
    }
    loadGeometry() {
      let e52 = []
      for (let t2 of this._featureData.geometry.coordinates) {
        let n2 = []
        for (let e53 of t2) n2.push(new l(e53.x, e53.y))
        e52.push(n2)
      }
      return e52
    }
  },
  LC = class {
    constructor(e52) {
      ;((this.features = []),
        (this.featureTable = e52),
        (this.name = e52.name),
        (this.extent = e52.extent),
        (this.version = 2),
        (this.features = e52.getFeatures()),
        (this.length = this.features.length))
    }
    feature(e52) {
      return new IC(this.features[e52], this.extent)
    }
  },
  RC = class {
    constructor(e52) {
      this.layers = {}
      let t2 = PC(new Uint8Array(e52))
      this.layers = t2.reduce(
        (e53, t3) => ({...e53, [t3.name]: new LC(t3)}),
        {}
      )
    }
  },
  zC = class {
    constructor(e52, t2) {
      ;((this.tileID = e52),
        (this.x = e52.canonical.x),
        (this.y = e52.canonical.y),
        (this.z = e52.canonical.z),
        (this.grid = new gc(j, 16, 0)),
        (this.grid3D = new gc(j, 16, 0)),
        (this.featureIndexArray = new nu()),
        (this.promoteId = t2))
    }
    insert(e52, t2, n2, r2, i2, a2) {
      let o2 = this.featureIndexArray.length
      this.featureIndexArray.emplaceBack(n2, r2, i2)
      let s2 = a2 ? this.grid3D : this.grid
      for (let e53 of t2) {
        let t3 = [1 / 0, 1 / 0, -1 / 0, -1 / 0]
        for (let n3 of e53)
          ((t3[0] = Math.min(t3[0], n3.x)),
            (t3[1] = Math.min(t3[1], n3.y)),
            (t3[2] = Math.max(t3[2], n3.x)),
            (t3[3] = Math.max(t3[3], n3.y)))
        t3[0] < 8192 &&
          t3[1] < 8192 &&
          t3[2] >= 0 &&
          t3[3] >= 0 &&
          s2.insert(o2, t3[0], t3[1], t3[2], t3[3])
      }
    }
    loadVTLayers() {
      if (!this.vtLayers) {
        switch (this.encoding) {
          case `mlt`:
            this.vtLayers = new RC(this.rawTileData).layers
            break
          default:
            this.vtLayers = new $p(new i_(this.rawTileData)).layers
        }
        this.sourceLayerCoder = new py(
          this.vtLayers ? Object.keys(this.vtLayers).sort() : [ny]
        )
      }
      return this.vtLayers
    }
    query(e52, t2, n2, r2) {
      this.loadVTLayers()
      let i2 = e52.params,
        a2 = j / e52.tileSize / e52.scale,
        o2 = ts(i2.filter, `queryRenderedFeatures filter`, i2.globalState),
        s2 = e52.queryGeometry,
        c2 = e52.queryPadding * a2,
        l2 = Wp.fromPoints(s2),
        u2 = this.grid.query(
          l2.minX - c2,
          l2.minY - c2,
          l2.maxX + c2,
          l2.maxY + c2
        ),
        d2 = Wp.fromPoints(e52.cameraQueryGeometry).expandBy(c2),
        f2 = this.grid3D.query(
          d2.minX,
          d2.minY,
          d2.maxX,
          d2.maxY,
          (t3, n3, r3, i3) =>
            wd(e52.cameraQueryGeometry, t3 - c2, n3 - c2, r3 + c2, i3 + c2)
        )
      for (let e53 of f2) u2.push(e53)
      u2.sort(HC)
      let p2 = {},
        m2
      for (let c3 of u2) {
        if (c3 === m2) continue
        m2 = c3
        let l3 = this.featureIndexArray.get(c3),
          u3 = null
        this.loadMatchingFeature(
          p2,
          l3.bucketIndex,
          l3.sourceLayerIndex,
          l3.featureIndex,
          o2,
          i2.layers,
          i2.availableImages,
          t2,
          n2,
          r2,
          (t3, n3, r3) => (
            (u3 ||= cd(t3)),
            n3.queryIntersectsFeature({
              queryGeometry: s2,
              feature: t3,
              featureState: r3,
              geometry: u3,
              zoom: this.z,
              transform: e52.transform,
              pixelsToTileUnits: a2,
              pixelPosMatrix: e52.pixelPosMatrix,
              unwrappedTileID: this.tileID.toUnwrapped(),
              getElevation: e52.getElevation,
            })
          )
        )
      }
      return p2
    }
    loadMatchingFeature(e52, t2, n2, r2, i2, a2, o2, s2, c2, l2, u2) {
      let d2 = this.bucketLayerIDs[t2]
      if (a2 && !d2.some(e53 => a2.has(e53))) return
      let f2 = this.sourceLayerCoder.decode(n2),
        p2 = this.vtLayers[f2].feature(r2)
      if (i2.needGeometry) {
        let e53 = ld(p2, true)
        if (
          !i2.filter(new U(this.tileID.overscaledZ), e53, this.tileID.canonical)
        )
          return
      } else if (!i2.filter(new U(this.tileID.overscaledZ), p2)) return
      let m2 = this.getId(p2, f2)
      for (let t3 of d2) {
        if (a2 && !a2.has(t3)) continue
        let n3 = s2[t3]
        if (!n3) continue
        let i3 = {}
        m2 &&
          l2 &&
          (i3 = l2.getState(n3.sourceLayer || `_geojsonTileLayer`, m2))
        let d3 = St({}, c2[t3])
        ;((d3.paint = VC(d3.paint, n3.paint, p2, i3, o2)),
          (d3.layout = VC(d3.layout, n3.layout, p2, i3, o2)))
        let f3 = !u2 || u2(p2, n3, i3)
        if (!f3) continue
        let h2 = new my(p2, this.z, this.x, this.y, m2)
        h2.layer = d3
        let g2 = e52[t3]
        ;(g2 === void 0 && (g2 = e52[t3] = []),
          g2.push({featureIndex: r2, feature: h2, intersectionZ: f3}))
      }
    }
    lookupSymbolFeatures(e52, t2, n2, r2, i2, a2, o2, s2) {
      let c2 = {}
      this.loadVTLayers()
      let l2 = ts(
        i2.filterSpec,
        `queryRenderedFeatures symbol filter`,
        i2.globalState
      )
      for (let i3 of e52)
        this.loadMatchingFeature(c2, n2, r2, i3, l2, a2, o2, s2, t2)
      return c2
    }
    hasLayer(e52) {
      for (let t2 of this.bucketLayerIDs)
        for (let n2 of t2) if (e52 === n2) return true
      return false
    }
    getId(e52, t2) {
      let n2 = e52.id
      if (this.promoteId) {
        let r2 =
          typeof this.promoteId == `string`
            ? this.promoteId
            : this.promoteId[t2]
        ;((n2 = e52.properties[r2]),
          typeof n2 == `boolean` && (n2 = Number(n2)),
          n2 === void 0 &&
            e52.properties?.cluster &&
            this.promoteId &&
            (n2 = Number(e52.properties.cluster_id)))
      }
      return n2
    }
  }
H(`FeatureIndex`, zC, {omit: [`rawTileData`, `sourceLayerCoder`]})
function BC(e52) {
  return typeof e52 == `object` && !!e52 && `evaluate` in e52
}
function VC(e52, t2, n2, r2, i2) {
  return jt(e52, (e53, a2) => {
    let o2 = t2 instanceof nl ? t2.get(a2) : null
    return BC(o2) ? o2.evaluate(n2, r2, void 0, i2) : o2
  })
}
function HC(e52, t2) {
  return t2 - e52
}
var UC = class {
    constructor(e52, t2) {
      ;((this.max = e52), (this.onRemove = t2), this.reset())
    }
    reset() {
      for (let e52 in this.data)
        for (let t2 of this.data[e52])
          (t2.timeout && clearTimeout(t2.timeout), this.onRemove(t2.value))
      return ((this.data = {}), (this.order = []), this)
    }
    add(e52, t2, n2) {
      let r2 = e52.wrapped().key
      this.data[r2] === void 0 && (this.data[r2] = [])
      let i2 = {value: t2, timeout: void 0}
      if (
        (n2 !== void 0 &&
          (i2.timeout = setTimeout(() => {
            this.remove(e52, i2)
          }, n2)),
        this.data[r2].push(i2),
        this.order.push(r2),
        this.order.length > this.max)
      ) {
        let e53 = this._getAndRemoveByKey(this.order[0])
        e53 && this.onRemove(e53)
      }
      return this
    }
    has(e52) {
      return e52.wrapped().key in this.data
    }
    getAndRemove(e52) {
      return this.has(e52) ? this._getAndRemoveByKey(e52.wrapped().key) : null
    }
    _getAndRemoveByKey(e52) {
      let t2 = this.data[e52].shift()
      return (
        t2.timeout && clearTimeout(t2.timeout),
        this.data[e52].length === 0 && delete this.data[e52],
        this.order.splice(this.order.indexOf(e52), 1),
        t2.value
      )
    }
    getByKey(e52) {
      let t2 = this.data[e52]
      return t2 ? t2[0].value : null
    }
    get(e52) {
      return this.has(e52) ? this.data[e52.wrapped().key][0].value : null
    }
    remove(e52, t2) {
      if (!this.has(e52)) return this
      let n2 = e52.wrapped().key,
        r2 = t2 === void 0 ? 0 : this.data[n2].indexOf(t2),
        i2 = this.data[n2][r2]
      return (
        this.data[n2].splice(r2, 1),
        i2.timeout && clearTimeout(i2.timeout),
        this.data[n2].length === 0 && delete this.data[n2],
        this.onRemove(i2.value),
        this.order.splice(this.order.indexOf(n2), 1),
        this
      )
    }
    setMaxSize(e52) {
      for (this.max = e52; this.order.length > this.max;) {
        let e53 = this._getAndRemoveByKey(this.order[0])
        e53 && this.onRemove(e53)
      }
      return this
    }
    filter(e52) {
      let t2 = []
      for (let n2 in this.data)
        for (let r2 of this.data[n2]) e52(r2.value) || t2.push(r2)
      for (let e53 of t2) this.remove(e53.value.tileID, e53)
    }
  },
  WC = class {
    constructor(e52) {
      ;((this.maxEntries = e52), (this.map = /* @__PURE__ */ new Map()))
    }
    get(e52) {
      let t2 = this.map.get(e52)
      return (
        t2 !== void 0 && (this.map.delete(e52), this.map.set(e52, t2)), t2
      )
    }
    set(e52, t2) {
      if (this.map.has(e52)) this.map.delete(e52)
      else if (this.map.size >= this.maxEntries) {
        let e53 = this.map.keys().next().value
        this.map.delete(e53)
      }
      this.map.set(e52, t2)
    }
    clear() {
      this.map.clear()
    }
  }
function GC(e52, t2, n2, r2, i2) {
  let a2 = []
  for (let o2 of e52) {
    let e53
    for (let s2 = 0; s2 < o2.length - 1; s2++) {
      let c2 = o2[s2],
        u2 = o2[s2 + 1]
      ;(c2.x < t2 && u2.x < t2) ||
        (c2.x < t2
          ? (c2 = new l(
              t2,
              c2.y + (u2.y - c2.y) * ((t2 - c2.x) / (u2.x - c2.x))
            )._round())
          : u2.x < t2 &&
            (u2 = new l(
              t2,
              c2.y + (u2.y - c2.y) * ((t2 - c2.x) / (u2.x - c2.x))
            )._round()),
        !(c2.y < n2 && u2.y < n2) &&
          (c2.y < n2
            ? (c2 = new l(
                c2.x + (u2.x - c2.x) * ((n2 - c2.y) / (u2.y - c2.y)),
                n2
              )._round())
            : u2.y < n2 &&
              (u2 = new l(
                c2.x + (u2.x - c2.x) * ((n2 - c2.y) / (u2.y - c2.y)),
                n2
              )._round()),
          !(c2.x >= r2 && u2.x >= r2) &&
            (c2.x >= r2
              ? (c2 = new l(
                  r2,
                  c2.y + (u2.y - c2.y) * ((r2 - c2.x) / (u2.x - c2.x))
                )._round())
              : u2.x >= r2 &&
                (u2 = new l(
                  r2,
                  c2.y + (u2.y - c2.y) * ((r2 - c2.x) / (u2.x - c2.x))
                )._round()),
            !(c2.y >= i2 && u2.y >= i2) &&
              (c2.y >= i2
                ? (c2 = new l(
                    c2.x + (u2.x - c2.x) * ((i2 - c2.y) / (u2.y - c2.y)),
                    i2
                  )._round())
                : u2.y >= i2 &&
                  (u2 = new l(
                    c2.x + (u2.x - c2.x) * ((i2 - c2.y) / (u2.y - c2.y)),
                    i2
                  )._round()),
              (!e53 || !c2.equals(e53[e53.length - 1])) &&
                ((e53 = [c2]), a2.push(e53)),
              e53.push(u2)))))
    }
  }
  return a2
}
function KC(e52, t2, n2, r2, i2, a2) {
  let o2 = qC(e52, t2, n2, i2, 0)
  return ((o2 = qC(o2, t2, r2, a2, 1)), o2)
}
function qC(e52, t2, n2, r2, i2) {
  switch (t2) {
    case 1:
      return JC(e52, n2, r2, i2)
    case 2:
      return XC(e52, n2, r2, i2, false)
    case 3:
      return XC(e52, n2, r2, i2, true)
  }
  return []
}
function JC(e52, t2, n2, r2) {
  let i2 = []
  for (let a2 of e52)
    for (let e53 of a2) {
      let a3 = r2 === 0 ? e53.x : e53.y
      a3 >= t2 && a3 <= n2 && i2.push([e53])
    }
  return i2
}
function YC(e52, t2, n2, r2, i2) {
  let a2 = r2 === 0 ? ZC : QC,
    o2 = [],
    s2 = []
  for (let c3 = 0; c3 < e52.length - 1; c3++) {
    let l2 = e52[c3],
      u3 = e52[c3 + 1],
      d2 = r2 === 0 ? l2.x : l2.y,
      f2 = r2 === 0 ? u3.x : u3.y,
      p2 = false
    ;(d2 < t2
      ? f2 > t2 && o2.push(a2(l2, u3, t2))
      : d2 > n2
        ? f2 < n2 && o2.push(a2(l2, u3, n2))
        : o2.push(l2),
      f2 < t2 && d2 >= t2 && (o2.push(a2(l2, u3, t2)), (p2 = true)),
      f2 > n2 && d2 <= n2 && (o2.push(a2(l2, u3, n2)), (p2 = true)),
      !i2 && p2 && (s2.push(o2), (o2 = [])))
  }
  let c2 = e52.length - 1,
    u2 = r2 === 0 ? e52[c2].x : e52[c2].y
  return (
    u2 >= t2 && u2 <= n2 && o2.push(e52[c2]),
    i2 &&
      o2.length > 0 &&
      !o2[0].equals(o2[o2.length - 1]) &&
      o2.push(new l(o2[0].x, o2[0].y)),
    o2.length > 0 && s2.push(o2),
    s2
  )
}
function XC(e52, t2, n2, r2, i2) {
  let a2 = []
  for (let o2 of e52) {
    let e53 = YC(o2, t2, n2, r2, i2)
    e53.length > 0 && a2.push(...e53)
  }
  return a2
}
function ZC(e52, t2, n2) {
  let r2 = (n2 - e52.x) / (t2.x - e52.x)
  return new l(n2, e52.y + (t2.y - e52.y) * r2)
}
function QC(e52, t2, n2) {
  let r2 = (n2 - e52.y) / (t2.y - e52.y)
  return new l(e52.x + (t2.x - e52.x) * r2, n2)
}
var $C = class e51 extends l {
  constructor(e52, t2, n2, r2) {
    ;(super(e52, t2), (this.angle = n2), r2 !== void 0 && (this.segment = r2))
  }
  clone() {
    return new e51(this.x, this.y, this.angle, this.segment)
  }
}
H(`Anchor`, $C)
function ew(e52, t2, n2, r2, i2) {
  if (t2.segment === void 0 || n2 === 0) return true
  let a2 = t2,
    o2 = t2.segment + 1,
    s2 = 0
  for (; s2 > -n2 / 2;) {
    if ((o2--, o2 < 0)) return false
    ;((s2 -= e52[o2].dist(a2)), (a2 = e52[o2]))
  }
  ;((s2 += e52[o2].dist(e52[o2 + 1])), o2++)
  let c2 = [],
    l2 = 0
  for (; s2 < n2 / 2;) {
    let t3 = e52[o2 - 1],
      n3 = e52[o2],
      a3 = e52[o2 + 1]
    if (!a3) return false
    let u2 = t3.angleTo(n3) - n3.angleTo(a3)
    for (
      u2 = Math.abs(((u2 + 3 * Math.PI) % (Math.PI * 2)) - Math.PI),
        c2.push({distance: s2, angleDelta: u2}),
        l2 += u2;
      s2 - c2[0].distance > r2;
    )
      l2 -= c2.shift().angleDelta
    if (l2 > i2) return false
    ;(o2++, (s2 += n3.dist(a3)))
  }
  return true
}
function tw(e52) {
  let t2 = 0
  for (let n2 = 0; n2 < e52.length - 1; n2++) t2 += e52[n2].dist(e52[n2 + 1])
  return t2
}
function nw(e52, t2, n2) {
  return e52 ? (3 / 5) * t2 * n2 : 0
}
function rw(e52, t2) {
  return Math.max(e52 ? e52.right - e52.left : 0, t2 ? t2.right - t2.left : 0)
}
function iw(e52, t2, n2, r2, i2, a2) {
  let o2 = nw(n2, i2, a2),
    s2 = rw(n2, r2) * a2,
    c2 = 0,
    l2 = tw(e52) / 2
  for (let n3 = 0; n3 < e52.length - 1; n3++) {
    let r3 = e52[n3],
      i3 = e52[n3 + 1],
      a3 = r3.dist(i3)
    if (c2 + a3 > l2) {
      let u2 = (l2 - c2) / a3,
        d2 = new $C(
          ti.number(r3.x, i3.x, u2),
          ti.number(r3.y, i3.y, u2),
          i3.angleTo(r3),
          n3
        )
      return (d2._round(), !o2 || ew(e52, d2, s2, o2, t2) ? d2 : void 0)
    }
    c2 += a3
  }
}
function aw(e52, t2, n2, r2, i2, a2, o2, s2, c2) {
  let l2 = nw(r2, a2, o2),
    u2 = rw(r2, i2),
    d2 = u2 * o2,
    f2 = e52[0].x === 0 || e52[0].x === c2 || e52[0].y === 0 || e52[0].y === c2
  t2 - d2 < t2 / 4 && (t2 = d2 + t2 / 4)
  let p2 = a2 * 2
  return ow(
    e52,
    f2 ? ((t2 / 2) * s2) % t2 : ((u2 / 2 + p2) * o2 * s2) % t2,
    t2,
    l2,
    n2,
    d2,
    f2,
    false,
    c2
  )
}
function ow(e52, t2, n2, r2, i2, a2, o2, s2, c2) {
  let l2 = a2 / 2,
    u2 = tw(e52),
    d2 = 0,
    f2 = t2 - n2,
    p2 = []
  for (let t3 = 0; t3 < e52.length - 1; t3++) {
    let o3 = e52[t3],
      s3 = e52[t3 + 1],
      m2 = o3.dist(s3),
      h2 = s3.angleTo(o3)
    for (; f2 + n2 < d2 + m2;) {
      f2 += n2
      let g2 = (f2 - d2) / m2,
        _2 = ti.number(o3.x, s3.x, g2),
        v2 = ti.number(o3.y, s3.y, g2)
      if (
        _2 >= 0 &&
        _2 < c2 &&
        v2 >= 0 &&
        v2 < c2 &&
        f2 - l2 >= 0 &&
        f2 + l2 <= u2
      ) {
        let n3 = new $C(_2, v2, h2, t3)
        ;(n3._round(), (!r2 || ew(e52, n3, a2, r2, i2)) && p2.push(n3))
      }
    }
    d2 += m2
  }
  return (
    !s2 &&
      !p2.length &&
      !o2 &&
      (p2 = ow(e52, d2 / 2, n2, r2, i2, a2, o2, true, c2)),
    p2
  )
}
function sw(e52, t2, n2, r2) {
  let i2 = [],
    a2 = e52.image,
    o2 = a2.pixelRatio,
    s2 = a2.paddedRect.w - 2,
    c2 = a2.paddedRect.h - 2,
    u2 = {x1: e52.left, y1: e52.top, x2: e52.right, y2: e52.bottom},
    d2 = a2.stretchX || [[0, s2]],
    f2 = a2.stretchY || [[0, c2]],
    p2 = (e53, t3) => e53 + t3[1] - t3[0],
    m2 = d2.reduce(p2, 0),
    h2 = f2.reduce(p2, 0),
    g2 = s2 - m2,
    _2 = c2 - h2,
    v2 = 0,
    y2 = m2,
    b2 = 0,
    x2 = h2,
    S2 = 0,
    C2 = g2,
    w2 = 0,
    T2 = _2
  if (a2.content && r2) {
    let t3 = a2.content,
      n3 = t3[2] - t3[0],
      r3 = t3[3] - t3[1]
    ;((a2.textFitWidth || a2.textFitHeight) && (u2 = iv(e52)),
      (v2 = cw(d2, 0, t3[0])),
      (b2 = cw(f2, 0, t3[1])),
      (y2 = cw(d2, t3[0], t3[2])),
      (x2 = cw(f2, t3[1], t3[3])),
      (S2 = t3[0] - v2),
      (w2 = t3[1] - b2),
      (C2 = n3 - y2),
      (T2 = r3 - x2))
  }
  let E2 = u2.x1,
    D2 = u2.y1,
    O2 = u2.x2 - E2,
    k2 = u2.y2 - D2,
    A2 = (e53, r3, i3, s3) => {
      let c3 = uw(e53.stretch - v2, y2, O2, E2),
        u3 = dw(e53.fixed - S2, C2, e53.stretch, m2),
        d3 = uw(r3.stretch - b2, x2, k2, D2),
        f3 = dw(r3.fixed - w2, T2, r3.stretch, h2),
        p3 = uw(i3.stretch - v2, y2, O2, E2),
        g3 = dw(i3.fixed - S2, C2, i3.stretch, m2),
        _3 = uw(s3.stretch - b2, x2, k2, D2),
        A3 = dw(s3.fixed - w2, T2, s3.stretch, h2),
        ee2 = new l(c3, d3),
        te2 = new l(p3, d3),
        ne2 = new l(p3, _3),
        re2 = new l(c3, _3),
        ie2 = new l(u3 / o2, f3 / o2),
        ae2 = new l(g3 / o2, A3 / o2),
        oe2 = (t2 * Math.PI) / 180
      if (oe2) {
        let e54 = Math.sin(oe2),
          t3 = Math.cos(oe2),
          n3 = [t3, -e54, e54, t3]
        ;(ee2._matMult(n3),
          te2._matMult(n3),
          re2._matMult(n3),
          ne2._matMult(n3))
      }
      let se2 = e53.stretch + e53.fixed,
        ce2 = i3.stretch + i3.fixed,
        le2 = r3.stretch + r3.fixed,
        ue2 = s3.stretch + s3.fixed
      return {
        tl: ee2,
        tr: te2,
        bl: re2,
        br: ne2,
        tex: {
          x: a2.paddedRect.x + 1 + se2,
          y: a2.paddedRect.y + 1 + le2,
          w: ce2 - se2,
          h: ue2 - le2,
        },
        writingMode: void 0,
        glyphOffset: [0, 0],
        sectionIndex: 0,
        pixelOffsetTL: ie2,
        pixelOffsetBR: ae2,
        minFontScaleX: C2 / o2 / O2,
        minFontScaleY: T2 / o2 / k2,
        isSDF: n2,
      }
    }
  if (!r2 || (!a2.stretchX && !a2.stretchY))
    i2.push(
      A2(
        {fixed: 0, stretch: -1},
        {fixed: 0, stretch: -1},
        {fixed: 0, stretch: s2 + 1},
        {fixed: 0, stretch: c2 + 1}
      )
    )
  else {
    let e53 = lw(d2, g2, m2),
      t3 = lw(f2, _2, h2)
    for (let n3 = 0; n3 < e53.length - 1; n3++) {
      let r3 = e53[n3],
        a3 = e53[n3 + 1]
      for (let e54 = 0; e54 < t3.length - 1; e54++) {
        let n4 = t3[e54],
          o3 = t3[e54 + 1]
        i2.push(A2(r3, n4, a3, o3))
      }
    }
  }
  return i2
}
function cw(e52, t2, n2) {
  let r2 = 0
  for (let i2 of e52)
    r2 += Math.max(t2, Math.min(n2, i2[1])) - Math.max(t2, Math.min(n2, i2[0]))
  return r2
}
function lw(e52, t2, n2) {
  let r2 = [{fixed: -1, stretch: 0}]
  for (let [t3, n3] of e52) {
    let e53 = r2[r2.length - 1]
    ;(r2.push({fixed: t3 - e53.stretch, stretch: e53.stretch}),
      r2.push({fixed: t3 - e53.stretch, stretch: e53.stretch + (n3 - t3)}))
  }
  return (r2.push({fixed: t2 + 1, stretch: n2}), r2)
}
function uw(e52, t2, n2, r2) {
  return (e52 / t2) * n2 + r2
}
function dw(e52, t2, n2, r2) {
  return e52 - (t2 * n2) / r2
}
function fw(e52, t2, n2, r2, i2, a2, o2, s2) {
  let c2 = (r2.layout.get(`text-rotate`).evaluate(a2, {}) * Math.PI) / 180,
    u2 = []
  for (let e53 of t2.positionedLines)
    for (let r3 of e53.positionedGlyphs) {
      if (!r3.rect) continue
      let a3 = r3.rect || {},
        d2 = 4,
        f2 = true,
        p2 = 1,
        m2 = 0,
        h2 = (i2 || s2) && r3.vertical,
        g2 = (r3.metrics.advance * r3.scale) / 2
      if (s2 && t2.verticalizable) {
        let t3 = (r3.scale - 1) * 24,
          n3 = (24 - r3.metrics.width * r3.scale) / 2
        m2 = e53.lineOffset / 2 - (r3.imageName ? -n3 : t3)
      }
      if (r3.imageName) {
        let e54 = o2[r3.imageName]
        ;((f2 = e54.sdf), (p2 = e54.pixelRatio), (d2 = 1 / p2))
      }
      let _2 = i2 ? [r3.x + g2, r3.y] : [0, 0],
        v2 = i2 ? [0, 0] : [r3.x + g2 + n2[0], r3.y + n2[1] - m2],
        y2 = [0, 0]
      h2 && ((y2 = v2), (v2 = [0, 0]))
      let b2 = r3.metrics.isDoubleResolution ? 2 : 1,
        x2 = (r3.metrics.left - d2) * r3.scale - g2 + v2[0],
        S2 = (-r3.metrics.top - d2) * r3.scale + v2[1],
        C2 = x2 + ((a3.w / b2) * r3.scale) / p2,
        w2 = S2 + ((a3.h / b2) * r3.scale) / p2,
        T2 = new l(x2, S2),
        E2 = new l(C2, S2),
        D2 = new l(x2, w2),
        O2 = new l(C2, w2)
      if (h2) {
        let e54 = new l(-g2, g2 - -17),
          t3 = -Math.PI / 2,
          n3 = 12 - g2,
          i3 = r3.imageName ? n3 : 0,
          a4 = new l(22 - n3, -i3),
          o3 = new l(...y2)
        ;(T2._rotateAround(t3, e54)._add(a4)._add(o3),
          E2._rotateAround(t3, e54)._add(a4)._add(o3),
          D2._rotateAround(t3, e54)._add(a4)._add(o3),
          O2._rotateAround(t3, e54)._add(a4)._add(o3))
      }
      if (c2) {
        let e54 = Math.sin(c2),
          t3 = Math.cos(c2),
          n3 = [t3, -e54, e54, t3]
        ;(T2._matMult(n3), E2._matMult(n3), D2._matMult(n3), O2._matMult(n3))
      }
      let k2 = new l(0, 0),
        A2 = new l(0, 0)
      u2.push({
        tl: T2,
        tr: E2,
        bl: D2,
        br: O2,
        tex: a3,
        writingMode: t2.writingMode,
        glyphOffset: _2,
        sectionIndex: r3.sectionIndex,
        isSDF: f2,
        pixelOffsetTL: k2,
        pixelOffsetBR: A2,
        minFontScaleX: 0,
        minFontScaleY: 0,
      })
    }
  return u2
}
var pw = class {
    constructor(e52, t2, n2, r2, i2, a2, o2, s2, c2, u2) {
      if (((this.boxStartIndex = e52.length), c2)) {
        let e53 = a2.top,
          t3 = a2.bottom,
          n3 = a2.collisionPadding
        n3 && ((e53 -= n3[1]), (t3 += n3[3]))
        let r3 = t3 - e53
        r3 > 0 && ((r3 = Math.max(10, r3)), (this.circleDiameter = r3))
      } else {
        let c3 =
          a2.image?.content && (a2.image.textFitWidth || a2.image.textFitHeight)
            ? iv(a2)
            : {x1: a2.left, y1: a2.top, x2: a2.right, y2: a2.bottom}
        ;((c3.y1 = c3.y1 * o2 - s2[0]),
          (c3.y2 = c3.y2 * o2 + s2[2]),
          (c3.x1 = c3.x1 * o2 - s2[3]),
          (c3.x2 = c3.x2 * o2 + s2[1]))
        let d2 = a2.collisionPadding
        if (
          (d2 &&
            ((c3.x1 -= d2[0] * o2),
            (c3.y1 -= d2[1] * o2),
            (c3.x2 += d2[2] * o2),
            (c3.y2 += d2[3] * o2)),
          u2)
        ) {
          let e53 = new l(c3.x1, c3.y1),
            t3 = new l(c3.x2, c3.y1),
            n3 = new l(c3.x1, c3.y2),
            r3 = new l(c3.x2, c3.y2),
            i3 = (u2 * Math.PI) / 180
          ;(e53._rotate(i3),
            t3._rotate(i3),
            n3._rotate(i3),
            r3._rotate(i3),
            (c3.x1 = Math.min(e53.x, t3.x, n3.x, r3.x)),
            (c3.x2 = Math.max(e53.x, t3.x, n3.x, r3.x)),
            (c3.y1 = Math.min(e53.y, t3.y, n3.y, r3.y)),
            (c3.y2 = Math.max(e53.y, t3.y, n3.y, r3.y)))
        }
        e52.emplaceBack(t2.x, t2.y, c3.x1, c3.y1, c3.x2, c3.y2, n2, r2, i2)
      }
      this.boxEndIndex = e52.length
    }
  },
  mw = class {
    constructor(e52 = [], t2 = (e53, t3) => (e53 < t3 ? -1 : +(e53 > t3))) {
      if (
        ((this.data = e52),
        (this.length = this.data.length),
        (this.compare = t2),
        this.length > 0)
      )
        for (let e53 = (this.length >> 1) - 1; e53 >= 0; e53--) this._down(e53)
    }
    push(e52) {
      ;(this.data.push(e52), this._up(this.length++))
    }
    pop() {
      if (this.length === 0) return
      let e52 = this.data[0],
        t2 = this.data.pop()
      return (--this.length > 0 && ((this.data[0] = t2), this._down(0)), e52)
    }
    peek() {
      return this.data[0]
    }
    _up(e52) {
      let {data: t2, compare: n2} = this,
        r2 = t2[e52]
      for (; e52 > 0;) {
        let i2 = (e52 - 1) >> 1,
          a2 = t2[i2]
        if (n2(r2, a2) >= 0) break
        ;((t2[e52] = a2), (e52 = i2))
      }
      t2[e52] = r2
    }
    _down(e52) {
      let {data: t2, compare: n2} = this,
        r2 = this.length >> 1,
        i2 = t2[e52]
      for (; e52 < r2;) {
        let r3 = (e52 << 1) + 1,
          a2 = r3 + 1
        if (
          (a2 < this.length && n2(t2[a2], t2[r3]) < 0 && (r3 = a2),
          n2(t2[r3], i2) >= 0)
        )
          break
        ;((t2[e52] = t2[r3]), (e52 = r3))
      }
      t2[e52] = i2
    }
  }
function hw(e52, t2 = 1) {
  let n2 = Wp.fromPoints(e52[0]),
    r2 = Math.min(n2.width(), n2.height()),
    i2 = r2 / 2,
    a2 = new mw([], gw),
    {minX: o2, minY: s2, maxX: c2, maxY: u2} = n2
  if (r2 === 0) return new l(o2, s2)
  for (let t3 = o2; t3 < c2; t3 += r2)
    for (let n3 = s2; n3 < u2; n3 += r2)
      a2.push(new _w(t3 + i2, n3 + i2, i2, e52))
  let d2 = yw(e52),
    f2 = d2
  for (; a2.length;) {
    let n3 = a2.pop()
    ;((n3.d > f2.d || !f2.d) && (f2 = n3),
      !(n3.max - f2.d <= t2) &&
        ((i2 = n3.h / 2),
        a2.push(new _w(n3.p.x - i2, n3.p.y - i2, i2, e52)),
        a2.push(new _w(n3.p.x + i2, n3.p.y - i2, i2, e52)),
        a2.push(new _w(n3.p.x - i2, n3.p.y + i2, i2, e52)),
        a2.push(new _w(n3.p.x + i2, n3.p.y + i2, i2, e52))))
  }
  return d2.d > 0 && f2.d - d2.d <= t2 ? d2.p : f2.p
}
function gw(e52, t2) {
  return t2.max - e52.max
}
var _w = class {
  constructor(e52, t2, n2, r2) {
    ;((this.p = new l(e52, t2)),
      (this.h = n2),
      (this.d = vw(this.p, r2)),
      (this.max = this.d + this.h * Math.SQRT2))
  }
}
function vw(e52, t2) {
  let n2 = false,
    r2 = 1 / 0
  for (let i2 of t2)
    for (let t3 = 0, a2 = i2.length, o2 = a2 - 1; t3 < a2; o2 = t3++) {
      let a3 = i2[t3],
        s2 = i2[o2]
      ;(a3.y > e52.y != s2.y > e52.y &&
        e52.x < ((s2.x - a3.x) * (e52.y - a3.y)) / (s2.y - a3.y) + a3.x &&
        (n2 = !n2),
        (r2 = Math.min(r2, xd(e52, a3, s2))))
    }
  return (n2 ? 1 : -1) * Math.sqrt(r2)
}
function yw(e52) {
  let t2 = 0,
    n2 = 0,
    r2 = 0,
    i2 = e52[0]
  for (let e53 = 0, a2 = i2.length, o2 = a2 - 1; e53 < a2; o2 = e53++) {
    let a3 = i2[e53],
      s2 = i2[o2],
      c2 = a3.x * s2.y - s2.x * a3.y
    ;((n2 += (a3.x + s2.x) * c2), (r2 += (a3.y + s2.y) * c2), (t2 += c2 * 3))
  }
  return new _w(n2 / t2, r2 / t2, 0, e52)
}
let bw = (function (e52) {
  return (
    (e52[(e52.center = 1)] = `center`),
    (e52[(e52.left = 2)] = `left`),
    (e52[(e52.right = 3)] = `right`),
    (e52[(e52.top = 4)] = `top`),
    (e52[(e52.bottom = 5)] = `bottom`),
    (e52[(e52[`top-left`] = 6)] = `top-left`),
    (e52[(e52[`top-right`] = 7)] = `top-right`),
    (e52[(e52[`bottom-left`] = 8)] = `bottom-left`),
    (e52[(e52[`bottom-right`] = 9)] = `bottom-right`),
    e52
  )
})({})
const xw = 1 / 0
function Sw(e52, t2) {
  function n2(e53, t3) {
    let n3 = 0,
      r3 = 0
    t3 < 0 && (t3 = 0)
    let i2 = t3 / Math.SQRT2
    switch (e53) {
      case `top-right`:
      case `top-left`:
        r3 = i2 - 7
        break
      case `bottom-right`:
      case `bottom-left`:
        r3 = -i2 + 7
        break
      case `bottom`:
        r3 = -t3 + 7
        break
      case `top`:
        r3 = t3 - 7
    }
    switch (e53) {
      case `top-right`:
      case `bottom-right`:
        n3 = -i2
        break
      case `top-left`:
      case `bottom-left`:
        n3 = i2
        break
      case `left`:
        n3 = t3
        break
      case `right`:
        n3 = -t3
    }
    return [n3, r3]
  }
  function r2(e53, t3, n3) {
    let r3 = 0,
      i2 = 0
    switch (((t3 = Math.abs(t3)), (n3 = Math.abs(n3)), e53)) {
      case `top-right`:
      case `top-left`:
      case `top`:
        i2 = n3 - 7
        break
      case `bottom-right`:
      case `bottom-left`:
      case `bottom`:
        i2 = -n3 + 7
    }
    switch (e53) {
      case `top-right`:
      case `bottom-right`:
      case `right`:
        r3 = -t3
        break
      case `top-left`:
      case `bottom-left`:
      case `left`:
        r3 = t3
    }
    return [r3, i2]
  }
  return t2[1] === xw ? n2(e52, t2[0]) : r2(e52, t2[0], t2[1])
}
function Cw(e52, t2, n2) {
  let r2 = e52.layout,
    i2 = r2.get(`text-variable-anchor-offset`)?.evaluate(t2, {}, n2)
  if (i2) {
    let e53 = i2.values,
      t3 = []
    for (let n3 = 0; n3 < e53.length; n3 += 2) {
      let r3 = (t3[n3] = e53[n3]),
        i3 = e53[n3 + 1].map(e54 => e54 * 24)
      ;(r3.startsWith(`top`)
        ? (i3[1] -= 7)
        : r3.startsWith(`bottom`) && (i3[1] += 7),
        (t3[n3 + 1] = i3))
    }
    return new zr(t3)
  }
  let a2 = r2.get(`text-variable-anchor`)
  if (a2) {
    let i3
    i3 =
      e52._unevaluatedLayout.getValue(`text-radial-offset`) === void 0
        ? r2
            .get(`text-offset`)
            .evaluate(t2, {}, n2)
            .map(e53 => e53 * 24)
        : [r2.get(`text-radial-offset`).evaluate(t2, {}, n2) * 24, xw]
    let o2 = []
    for (let e53 of a2) o2.push(e53, Sw(e53, i3))
    return new zr(o2)
  }
  return null
}
function ww(e52) {
  e52.bucket.createArrays()
  let t2 = 512 * e52.bucket.overscaling
  ;((e52.bucket.tilePixelRatio = j / t2),
    (e52.bucket.compareText = {}),
    (e52.bucket.iconsNeedLinear = false))
  let n2 = e52.bucket.layers[0],
    r2 = n2.layout,
    i2 = n2._unevaluatedLayout._values,
    a2 = {
      layoutIconSize: i2[`icon-size`].possiblyEvaluate(
        new U(e52.bucket.zoom + 1),
        e52.canonical
      ),
      layoutTextSize: i2[`text-size`].possiblyEvaluate(
        new U(e52.bucket.zoom + 1),
        e52.canonical
      ),
      textMaxSize: i2[`text-size`].possiblyEvaluate(new U(18)),
    }
  if (e52.bucket.textSizeData.kind === `composite`) {
    let {minZoom: t3, maxZoom: n3} = e52.bucket.textSizeData
    a2.compositeTextSizes = [
      i2[`text-size`].possiblyEvaluate(new U(t3), e52.canonical),
      i2[`text-size`].possiblyEvaluate(new U(n3), e52.canonical),
    ]
  }
  if (e52.bucket.iconSizeData.kind === `composite`) {
    let {minZoom: t3, maxZoom: n3} = e52.bucket.iconSizeData
    a2.compositeIconSizes = [
      i2[`icon-size`].possiblyEvaluate(new U(t3), e52.canonical),
      i2[`icon-size`].possiblyEvaluate(new U(n3), e52.canonical),
    ]
  }
  let o2 = r2.get(`text-line-height`) * 24,
    s2 =
      r2.get(`text-rotation-alignment`) !== `viewport` &&
      r2.get(`symbol-placement`) !== `point`,
    c2 = r2.get(`text-keep-upright`),
    l2 = r2.get(`text-size`)
  for (let t3 of e52.bucket.features) {
    let i3 = r2.get(`text-font`).evaluate(t3, {}, e52.canonical).join(`,`),
      u2 = l2.evaluate(t3, {}, e52.canonical),
      d2 = a2.layoutTextSize.evaluate(t3, {}, e52.canonical),
      f2 = a2.layoutIconSize.evaluate(t3, {}, e52.canonical),
      p2 = {horizontal: {}, vertical: void 0},
      m2 = t3.text,
      h2 = [0, 0]
    if (m2) {
      let a3 = m2.toString(),
        l3 = r2.get(`text-letter-spacing`).evaluate(t3, {}, e52.canonical) * 24,
        f3 = Fc(a3) ? l3 : 0,
        g3 = r2.get(`text-anchor`).evaluate(t3, {}, e52.canonical),
        _3 = Cw(n2, t3, e52.canonical)
      if (!_3) {
        let n3 = r2.get(`text-radial-offset`).evaluate(t3, {}, e52.canonical)
        h2 = n3
          ? Sw(g3, [n3 * 24, xw])
          : r2
              .get(`text-offset`)
              .evaluate(t3, {}, e52.canonical)
              .map(e53 => e53 * 24)
      }
      let v3 = s2
          ? `center`
          : r2.get(`text-justify`).evaluate(t3, {}, e52.canonical),
        y2 =
          r2.get(`symbol-placement`) === `point`
            ? r2.get(`text-max-width`).evaluate(t3, {}, e52.canonical) * 24
            : 1 / 0,
        b2 = () => {
          e52.bucket.allowVerticalPlacement &&
            Pc(a3) &&
            (p2.vertical = z_(
              m2,
              e52.glyphMap,
              e52.glyphPositions,
              e52.imagePositions,
              i3,
              y2,
              o2,
              g3,
              `left`,
              f3,
              h2,
              2,
              true,
              d2,
              u2
            ))
        }
      if (!s2 && _3) {
        let t4 = /* @__PURE__ */ new Set()
        if (v3 === `auto`)
          for (let e53 = 0; e53 < _3.values.length; e53 += 2)
            t4.add(Tw(_3.values[e53]))
        else t4.add(v3)
        let n3 = false
        for (let r3 of t4)
          if (!p2.horizontal[r3]) {
            if (n3) p2.horizontal[r3] = p2.horizontal[0]
            else {
              let t5 = z_(
                m2,
                e52.glyphMap,
                e52.glyphPositions,
                e52.imagePositions,
                i3,
                y2,
                o2,
                `center`,
                r3,
                f3,
                h2,
                1,
                false,
                d2,
                u2
              )
              t5 &&
                ((p2.horizontal[r3] = t5),
                (n3 = t5.positionedLines.length === 1))
            }
          }
        b2()
      } else {
        v3 === `auto` && (v3 = Tw(g3))
        let t4 = z_(
          m2,
          e52.glyphMap,
          e52.glyphPositions,
          e52.imagePositions,
          i3,
          y2,
          o2,
          g3,
          v3,
          f3,
          h2,
          1,
          false,
          d2,
          u2
        )
        ;(t4 && (p2.horizontal[v3] = t4),
          b2(),
          Pc(a3) &&
            s2 &&
            c2 &&
            (p2.vertical = z_(
              m2,
              e52.glyphMap,
              e52.glyphPositions,
              e52.imagePositions,
              i3,
              y2,
              o2,
              g3,
              v3,
              f3,
              h2,
              2,
              false,
              d2,
              u2
            )))
      }
    }
    let g2,
      _2 = false
    if (t3.icon?.name) {
      let n3 = e52.imageMap[t3.icon.name]
      n3 &&
        ((g2 = rv(
          e52.imagePositions[t3.icon.name],
          r2.get(`icon-offset`).evaluate(t3, {}, e52.canonical),
          r2.get(`icon-anchor`).evaluate(t3, {}, e52.canonical)
        )),
        (_2 = !!n3.sdf),
        e52.bucket.sdfIcons === void 0
          ? (e52.bucket.sdfIcons = _2)
          : e52.bucket.sdfIcons !== _2 &&
            It(
              `Style sheet warning: Cannot mix SDF and non-SDF icons in one buffer`
            ),
        n3.pixelRatio === e52.bucket.pixelRatio
          ? r2.get(`icon-rotate`).constantOr(1) !== 0 &&
            (e52.bucket.iconsNeedLinear = true)
          : (e52.bucket.iconsNeedLinear = true))
    }
    let v2 = kw(p2.horizontal) || p2.vertical
    ;((e52.bucket.iconsInText ||= v2 ? v2.iconsInText : false),
      (v2 || g2) &&
        Ew(
          e52.bucket,
          t3,
          p2,
          g2,
          e52.imageMap,
          a2,
          d2,
          f2,
          h2,
          _2,
          e52.canonical,
          e52.subdivisionGranularity
        ))
  }
  e52.showCollisionBoxes && e52.bucket.generateCollisionDebugBuffers()
}
function Tw(e52) {
  switch (e52) {
    case `right`:
    case `top-right`:
    case `bottom-right`:
      return `right`
    case `left`:
    case `top-left`:
    case `bottom-left`:
      return `left`
  }
  return `center`
}
function Ew(e52, t2, n2, r2, i2, a2, o2, s2, c2, l2, u2, d2) {
  let f2 = a2.textMaxSize.evaluate(t2, {})
  f2 === void 0 && (f2 = o2)
  let p2 = e52.layers[0].layout,
    m2 = p2.get(`icon-offset`).evaluate(t2, {}, u2),
    h2 = kw(n2.horizontal),
    g2 = o2 / 24,
    _2 = e52.tilePixelRatio * g2,
    v2 = (e52.tilePixelRatio * f2) / 24,
    y2 = e52.tilePixelRatio * s2,
    b2 = e52.tilePixelRatio * p2.get(`symbol-spacing`),
    x2 = p2.get(`text-padding`) * e52.tilePixelRatio,
    S2 = jv(p2, t2, u2, e52.tilePixelRatio),
    C2 = (p2.get(`text-max-angle`) / 180) * Math.PI,
    w2 =
      p2.get(`text-rotation-alignment`) !== `viewport` &&
      p2.get(`symbol-placement`) !== `point`,
    T2 =
      p2.get(`icon-rotation-alignment`).constantOr(`viewport`) === `map` &&
      p2.get(`symbol-placement`) !== `point`,
    E2 = p2.get(`symbol-placement`),
    D2 = b2 / 2,
    O2 = p2.get(`icon-text-fit`),
    k2
  r2 &&
    O2 !== `none` &&
    (e52.allowVerticalPlacement &&
      n2.vertical &&
      (k2 = av(r2, n2.vertical, O2, p2.get(`icon-text-fit-padding`), m2, g2)),
    h2 && (r2 = av(r2, h2, O2, p2.get(`icon-text-fit-padding`), m2, g2)))
  let A2 = u2 ? d2.line.getGranularityForZoomLevel(u2.z) : 1,
    ee2 = (s3, d3) => {
      d3.x < 0 ||
        d3.x >= 8192 ||
        d3.y < 0 ||
        d3.y >= 8192 ||
        Aw(
          e52,
          d3,
          s3,
          n2,
          r2,
          i2,
          k2,
          e52.layers[0],
          e52.collisionBoxArray,
          t2.index,
          t2.sourceLayerIndex,
          e52.index,
          _2,
          [x2, x2, x2, x2],
          w2,
          c2,
          y2,
          S2,
          T2,
          m2,
          t2,
          a2,
          l2,
          u2,
          o2
        )
    }
  if (E2 === `line`)
    for (let i3 of GC(t2.geometry, 0, 0, j, j)) {
      let t3 = Tp(i3, A2),
        a3 = aw(t3, b2, C2, n2.vertical || h2, r2, 24, v2, e52.overscaling, j)
      for (let n3 of a3) {
        let r3 = h2
        ;(!r3 || !jw(e52, r3.text, D2, n3)) && ee2(t3, n3)
      }
    }
  else if (E2 === `line-center`) {
    for (let e53 of t2.geometry)
      if (e53.length > 1) {
        let t3 = Tp(e53, A2),
          i3 = iw(t3, C2, n2.vertical || h2, r2, 24, v2)
        i3 && ee2(t3, i3)
      }
  } else if (t2.type === `Polygon`)
    for (let e53 of oi(t2.geometry, 0)) {
      let t3 = hw(e53, 16)
      ee2(Tp(e53[0], A2, true), new $C(t3.x, t3.y, 0))
    }
  else if (t2.type === `LineString`)
    for (let e53 of t2.geometry) {
      let t3 = Tp(e53, A2)
      ee2(t3, new $C(t3[0].x, t3[0].y, 0))
    }
  else if (t2.type === `Point`)
    for (let e53 of t2.geometry)
      for (let t3 of e53) ee2([t3], new $C(t3.x, t3.y, 0))
}
function Dw(e52, t2) {
  let n2 = e52.length,
    r2 = t2?.values
  if (r2?.length > 0)
    for (let t3 = 0; t3 < r2.length; t3 += 2) {
      let n3 = bw[r2[t3]],
        i2 = r2[t3 + 1]
      e52.emplaceBack(n3, i2[0], i2[1])
    }
  return [n2, e52.length]
}
function Ow(e52, t2, n2, r2, i2, a2, o2, s2, c2, l2, u2, d2, f2, p2, m2, h2) {
  let g2 = fw(t2, n2, s2, i2, a2, o2, r2, e52.allowVerticalPlacement),
    _2 = e52.textSizeData,
    v2 = null
  ;(_2.kind === `source`
    ? ((v2 = [128 * i2.layout.get(`text-size`).evaluate(o2, {})]),
      v2[0] > 32640 &&
        It(
          `${e52.layerIds[0]}: Value for "text-size" is >= 255. Reduce your "text-size".`
        ))
    : _2.kind === `composite` &&
      ((v2 = [
        128 * m2.compositeTextSizes[0].evaluate(o2, {}, h2),
        128 * m2.compositeTextSizes[1].evaluate(o2, {}, h2),
      ]),
      (v2[0] > 32640 || v2[1] > 32640) &&
        It(
          `${e52.layerIds[0]}: Value for "text-size" is >= 255. Reduce your "text-size".`
        )),
    e52.addSymbols(
      e52.text,
      g2,
      v2,
      s2,
      a2,
      o2,
      u2,
      t2,
      l2.lineStartIndex,
      l2.lineLength,
      p2,
      h2,
      c2
    ))
  for (let t3 of d2) f2[t3] = e52.text.placedSymbolArray.length - 1
  return g2.length * 4
}
function kw(e52) {
  for (let t2 in e52) return e52[t2]
  return null
}
function Aw(
  e52,
  t2,
  n2,
  r2,
  i2,
  a2,
  o2,
  s2,
  c2,
  l2,
  u2,
  d2,
  f2,
  p2,
  m2,
  h2,
  g2,
  _2,
  v2,
  y2,
  b2,
  x2,
  S2,
  C2,
  w2
) {
  let T2 = e52.addToLineVertexArray(t2, n2),
    E2 = s2.layout.get(`symbol-height-offset`).evaluate(b2, {}, C2),
    D2,
    O2,
    k2,
    A2,
    ee2 = 0,
    te2 = 0,
    ne2 = 0,
    re2 = 0,
    ie2 = -1,
    ae2 = -1,
    oe2 = {},
    se2 = (0, ju.default)(``)
  if (e52.allowVerticalPlacement && r2.vertical) {
    let e53 = s2.layout.get(`text-rotate`).evaluate(b2, {}, C2) + 90,
      n3 = r2.vertical
    ;((k2 = new pw(c2, t2, l2, u2, d2, n3, f2, p2, m2, e53)),
      o2 && (A2 = new pw(c2, t2, l2, u2, d2, o2, g2, _2, m2, e53)))
  }
  if (i2) {
    let n3 = s2.layout.get(`icon-rotate`).evaluate(b2, {}),
      r3 = s2.layout.get(`icon-text-fit`) !== `none`,
      a3 = sw(i2, n3, S2, r3),
      f3 = o2 ? sw(o2, n3, S2, r3) : void 0
    ;((O2 = new pw(c2, t2, l2, u2, d2, i2, g2, _2, false, n3)),
      (ee2 = a3.length * 4))
    let p3 = e52.iconSizeData,
      m3 = null
    ;(p3.kind === `source`
      ? ((m3 = [128 * s2.layout.get(`icon-size`).evaluate(b2, {})]),
        m3[0] > 32640 &&
          It(
            `${e52.layerIds[0]}: Value for "icon-size" is >= 255. Reduce your "icon-size".`
          ))
      : p3.kind === `composite` &&
        ((m3 = [
          128 * x2.compositeIconSizes[0].evaluate(b2, {}, C2),
          128 * x2.compositeIconSizes[1].evaluate(b2, {}, C2),
        ]),
        (m3[0] > 32640 || m3[1] > 32640) &&
          It(
            `${e52.layerIds[0]}: Value for "icon-size" is >= 255. Reduce your "icon-size".`
          )),
      e52.addSymbols(
        e52.icon,
        a3,
        m3,
        y2,
        v2,
        b2,
        0,
        t2,
        T2.lineStartIndex,
        T2.lineLength,
        -1,
        C2,
        E2
      ),
      (ie2 = e52.icon.placedSymbolArray.length - 1),
      f3 &&
        ((te2 = f3.length * 4),
        e52.addSymbols(
          e52.icon,
          f3,
          m3,
          y2,
          v2,
          b2,
          2,
          t2,
          T2.lineStartIndex,
          T2.lineLength,
          -1,
          C2,
          E2
        ),
        (ae2 = e52.icon.placedSymbolArray.length - 1)))
  }
  let ce2 = Object.keys(r2.horizontal)
  for (let n3 of ce2) {
    let i3 = r2.horizontal[n3]
    D2 ||=
      ((se2 = (0, ju.default)(i3.text)),
      new pw(
        c2,
        t2,
        l2,
        u2,
        d2,
        i3,
        f2,
        p2,
        m2,
        s2.layout.get(`text-rotate`).evaluate(b2, {}, C2)
      ))
    let o3 = i3.positionedLines.length === 1
    if (
      ((ne2 += Ow(
        e52,
        t2,
        i3,
        a2,
        s2,
        m2,
        b2,
        h2,
        E2,
        T2,
        r2.vertical ? 1 : 3,
        o3 ? ce2 : [n3],
        oe2,
        ie2,
        x2,
        C2
      )),
      o3)
    )
      break
  }
  r2.vertical &&
    (re2 += Ow(
      e52,
      t2,
      r2.vertical,
      a2,
      s2,
      m2,
      b2,
      h2,
      E2,
      T2,
      2,
      [`vertical`],
      oe2,
      ae2,
      x2,
      C2
    ))
  let le2 = D2 ? D2.boxStartIndex : e52.collisionBoxArray.length,
    ue2 = D2 ? D2.boxEndIndex : e52.collisionBoxArray.length,
    de2 = k2 ? k2.boxStartIndex : e52.collisionBoxArray.length,
    fe2 = k2 ? k2.boxEndIndex : e52.collisionBoxArray.length,
    pe2 = O2 ? O2.boxStartIndex : e52.collisionBoxArray.length,
    me2 = O2 ? O2.boxEndIndex : e52.collisionBoxArray.length,
    he2 = A2 ? A2.boxStartIndex : e52.collisionBoxArray.length,
    ge2 = A2 ? A2.boxEndIndex : e52.collisionBoxArray.length,
    _e2 = -1,
    ve2 = (e53, t3) =>
      e53?.circleDiameter ? Math.max(e53.circleDiameter, t3) : t3
  ;((_e2 = ve2(D2, _e2)),
    (_e2 = ve2(k2, _e2)),
    (_e2 = ve2(O2, _e2)),
    (_e2 = ve2(A2, _e2)))
  let ye2 = +(_e2 > -1)
  ;(ye2 && (_e2 *= w2 / 24),
    e52.glyphOffsetArray.length >= xv.MAX_GLYPHS &&
      It(
        `Too many glyphs being rendered in a tile. See https://github.com/mapbox/mapbox-gl-js/issues/2907`
      ),
    b2.sortKey !== void 0 &&
      e52.addToSortKeyRanges(e52.symbolInstances.length, b2.sortKey))
  let be2 = Cw(s2, b2, C2),
    [xe2, Se2] = Dw(e52.textAnchorOffsets, be2)
  e52.symbolInstances.emplaceBack(
    t2.x,
    t2.y,
    oe2.right >= 0 ? oe2.right : -1,
    oe2.center >= 0 ? oe2.center : -1,
    oe2.left >= 0 ? oe2.left : -1,
    oe2.vertical || -1,
    ie2,
    ae2,
    se2,
    le2,
    ue2,
    de2,
    fe2,
    pe2,
    me2,
    he2,
    ge2,
    l2,
    ne2,
    re2,
    ee2,
    te2,
    ye2,
    0,
    f2,
    _e2,
    xe2,
    Se2,
    E2
  )
}
function jw(e52, t2, n2, r2) {
  let i2 = e52.compareText
  if (!(t2 in i2)) i2[t2] = []
  else {
    let e53 = i2[t2]
    for (let t3 = e53.length - 1; t3 >= 0; t3--)
      if (r2.dist(e53[t3]) < n2) return true
  }
  return (i2[t2].push(r2), false)
}
export {
  fm as $,
  yt as $n,
  je as $r,
  W as $t,
  uv as A,
  O as Ai,
  On as An,
  rn as Ar,
  Ud as At,
  i_ as B,
  l as Bi,
  cn as Bn,
  Ot as Br,
  Wu as Bt,
  Rv as C,
  ae as Ci,
  Ln as Cn,
  Vt as Cr,
  hf as Ct,
  xv as D,
  T as Di,
  kn as Dn,
  ct as Dr,
  tf as Dt,
  kv as E,
  w as Ei,
  An as En,
  nn as Er,
  rf as Et,
  A_ as F,
  g as Fi,
  vn as Fn,
  st as Fr,
  zu as Ft,
  dg as G,
  bt as Gn,
  Ge as Gr,
  Su as Gt,
  Pg as H,
  qt as Hn,
  j as Hr,
  Tu as Ht,
  k_ as I,
  v as Ii,
  hn as In,
  at as Ir,
  Bu as It,
  vm as J,
  rt as Jn,
  Be as Jr,
  yu as Jt,
  Im as K,
  Pt as Kn,
  Xe as Kr,
  iu as Kt,
  D_ as L,
  h as Li,
  gn as Ln,
  Tt as Lr,
  Vu as Lt,
  M_ as M,
  A as Mi,
  bn as Mn,
  kt as Mr,
  ld as Mt,
  B_ as N,
  D as Ni,
  yn as Nn,
  zt as Nr,
  Ru as Nt,
  _v as O,
  ie as Oi,
  wn as On,
  Yt as Or,
  Qd as Ot,
  j_ as P,
  E as Pi,
  xn as Pn,
  en as Pr,
  Lu as Pt,
  _m as Q,
  Nt as Qn,
  Pe as Qr,
  hl as Qt,
  O_ as R,
  m as Ri,
  _n as Rn,
  It as Rr,
  Hu as Rt,
  Bv as S,
  oe as Si,
  Fn as Sn,
  Dt as Sr,
  gf as St,
  Fv as T,
  C as Ti,
  Sn as Tn,
  ot as Tr,
  nf as Tt,
  Dg as U,
  Gt as Un,
  Ue as Ur,
  Kl as Ut,
  Ug as V,
  lt as Vn,
  Ze as Vr,
  Ku as Vt,
  yg as W,
  vt as Wn,
  Ke as Wr,
  _u as Wt,
  bm as X,
  tt as Xn,
  Le as Xr,
  bu as Xt,
  xm as Y,
  nt as Yn,
  Ve as Yr,
  au as Yt,
  ym as Z,
  et as Zn,
  Re as Zr,
  q as Zt,
  qv as _,
  xe as _i,
  z as _n,
  pn as _r,
  xp as _t,
  GC as a,
  De as ai,
  Tc as an,
  St as ar,
  cm as at,
  Gv as b,
  S as bi,
  M as bn,
  jt as br,
  bp as bt,
  zC as c,
  ge as ci,
  dc as cn,
  ht as cr,
  am as ct,
  py as d,
  we as di,
  uc as dn,
  $t as dr,
  em as dt,
  Ne as ei,
  cl as en,
  tn as er,
  hm as et,
  ny as f,
  pe as fi,
  pc as fn,
  an as fr,
  $p as ft,
  Jv as g,
  ye as gi,
  Vr as gn,
  dn as gr,
  Np as gt,
  Kv as h,
  be as hi,
  ti as hn,
  Ut as hr,
  zp as ht,
  KC as i,
  _e as ii,
  Kc as in,
  At as ir,
  lm as it,
  dv as j,
  k as ji,
  jn,
  sn as jr,
  pd as jt,
  mv as k,
  ne as ki,
  Mn as kn,
  pt as kr,
  $d as kt,
  RC as l,
  Se as li,
  mc as ln,
  on as lr,
  om as lt,
  iy as m,
  Ee as mi,
  No as mn,
  fn as mr,
  Wp as mt,
  ww as n,
  ce as ni,
  Zc as nn,
  dt as nr,
  gm as nt,
  WC as o,
  le as oi,
  wc as on,
  Mt as or,
  sm as ot,
  ry as p,
  me as pi,
  ts as pn,
  Wt as pr,
  Gp as pt,
  km as q,
  it as qn,
  Ye as qr,
  ru as qt,
  bw as r,
  ve as ri,
  U as rn,
  $e as rr,
  dm as rt,
  UC as s,
  he as si,
  H as sn,
  Rt as sr,
  im as st,
  Tw as t,
  de as ti,
  Jc as tn,
  ut as tr,
  pm as tt,
  my as u,
  Ce as ui,
  hc as un,
  gt as ur,
  tm as ut,
  Yv as v,
  Te as vi,
  N as vn,
  Bt as vr,
  Sp as vt,
  Lv as w,
  ee as wi,
  Cn as wn,
  Ct as wr,
  lf as wt,
  Uv as x,
  b as xi,
  In as xn,
  ft as xr,
  vf as xt,
  ey as y,
  x as yi,
  zn as yn,
  mt as yr,
  yp as yt,
  E_ as z,
  f as zi,
  Qe as zn,
  xt as zr,
  Uu as zt,
}
