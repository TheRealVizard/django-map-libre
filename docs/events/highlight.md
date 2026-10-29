# `highlight` event

Highlights one or more features by drawing them again on a dedicated layer above
the base layer. Dispatch the event on the map container:

The `id` in the payload is the GeoJSON `Feature.id`, not a property value.

## Single feature

```js
container.dispatchEvent(new CustomEvent("highlight", {
  detail: {
    layerID: "parcels",
    id: "FID0",
    highlightColor: "#00e5ff", // optional
    goTo: true,                // optional
  },
}));
```

## Multiple features on the same layer

```js
container.dispatchEvent(new CustomEvent("highlight", {
  detail: {
    layerID: "parcels",
    ids: ["FID0", "FID1", "FID2"],
    goTo: true, // optional, fits the combined bbox
  },
}));
```

## Multiple layers

Pass an array of targets. Each target is processed independently:

```js
container.dispatchEvent(new CustomEvent("highlight", {
  detail: [
    { layerID: "parcels", ids: ["FID0", "FID1"] },
    { layerID: "buildings", ids: ["B0", "B1"], highlightColor: "#ff0000" },
  ],
}));
```

If any target has `goTo: true`, the camera fits the combined bounding box of all
highlighted features in a single move.

## Color precedence

For each layer, the highlight color is resolved in this order:

1. `highlightColor` on the event target.
2. `OverlayLayer.highlight_color` from Python.
3. `"#ff4500"`.

## Clearing highlights

Dispatching a new `highlight` event clears the previous highlights first. To
clear without highlighting anything new, dispatch an event with empty `ids`:

```js
container.dispatchEvent(new CustomEvent("highlight", {
  detail: { layerID: "parcels", ids: [] },
}));
```

Highlights are also removed automatically when the base layer is hidden.

## Combining with goTo

Set `goTo: true` on any target to move the camera to the highlighted features:

```js
container.dispatchEvent(new CustomEvent("highlight", {
  detail: {
    layerID: "parcels",
    id: "FID0",
    goTo: true,
  },
}));
```

## Icon layers

Highlight is ignored for `ICON` layers.