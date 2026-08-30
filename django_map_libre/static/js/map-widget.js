import { Map } from "maplibre-gl";

const map = new Map({
    container: "map",
    style: "static/styles/fiord.json",
    zoom: 13,
    center: [-122.447303, 37.753574],
});

// map.on("load", () => {
//     map.addSource("contours", {
//         type: "tile",
//         url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
//     });
// });
