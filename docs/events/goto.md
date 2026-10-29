# `goTo` event

Moves the camera to a coordinate, a bounding box, or a specific feature. Dispatch
the event on the map container:

```js
container.dispatchEvent(new CustomEvent("goTo", { detail: { /* ... */ } }));
```

The payload has a `kind` discriminator.

## Coordinate

```js
container.dispatchEvent(new CustomEvent("goTo", {
  detail: {
    kind: "coord",
    coord: [-3.7038, 40.4168],
    zoom: 12, // optional, defaults to 17
  },
}));
```

## Bounding box

```js
container.dispatchEvent(new CustomEvent("goTo", {
  detail: {
    kind: "bbox",
    bbox: [-3.8, 40.3, -3.6, 40.5], // [minLng, minLat, maxLng, maxLat]
  },
}));
```

The map fits the box with 40 px of padding.

## Feature

```js
container.dispatchEvent(new CustomEvent("goTo", {
  detail: {
    kind: "feature",
    feature: { id: "FID0", layerID: "parcels" },
  },
}));
```

The map computes the bounding box of the feature and fits it. Point features
(zero-area bbox) are expanded by a small padding so they remain visible.

## Combining with highlight

Set `highlight: true` on a feature payload to also highlight the feature:

```js
container.dispatchEvent(new CustomEvent("goTo", {
  detail: {
    kind: "feature",
    feature: { id: "FID0", layerID: "parcels" },
    highlight: true,
  },
}));
```