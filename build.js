import esbuild from "esbuild"

esbuild
  .build({
    entryPoints: ["src/map-widget.ts"],
    bundle: true,
    format: "esm",
    platform: "browser",
    target: "esnext",
    outfile: "django_map_libre/static/js/map-widget.js",
    sourcemap: true,
  })
  .catch(() => process.exit(1))

esbuild
  .build({
    entryPoints: ["src/map-worker.ts"],
    bundle: true,
    format: "esm",
    platform: "browser",
    target: "esnext",
    outfile: "django_map_libre/static/js/map-worker.js",
    sourcemap: true,
    define: {
      window: "undefined",
    },
  })
  .catch(() => process.exit(1))

esbuild
  .build({
    entryPoints: ["node_modules/maplibre-gl/dist/maplibre-gl.css"],
    outfile: "django_map_libre/static/vendor/css/maplibre-gl.css",
    loader: {".css": "css"},
    minify: true,
  })
  .catch(() => process.exit(1))

esbuild
  .build({
    entryPoints: ["node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs"],
    outfile: "django_map_libre/static/vendor/js/maplibre-gl-worker.mjs",
    bundle: false,
    platform: "browser",
    target: "esnext",
  })
  .catch(() => process.exit(1))

esbuild
  .build({
    entryPoints: ["node_modules/maplibre-gl/dist/maplibre-gl-shared.mjs"],
    outfile: "django_map_libre/static/vendor/js/maplibre-gl-shared.mjs",
    bundle: false,
    platform: "browser",
    target: "esnext",
  })
  .catch(() => process.exit(1))
