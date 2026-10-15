import { Loaddable } from "@/data/loader";
import type { Overlay } from "../helpers/overlay-helpers";
import type { FetchData, LegendConfig } from "../types/map-types";
import type { MapLibre } from "@/helpers/map-wrapper";

/**
 * Shared base for every legend implementation.
 *
 * A legend is responsible for styling one MapLibre layer according to a
 * {@link LegendConfig}. There is one legend instance per `LegendConfig`
 * attached to an {@link Overlay}, and the overlay delegates style
 * application to its active legend.
 *
 * `BaseLegend` holds the state and lifecycle common to every legend type:
 * the shared references (`map`, `layerId`, `parentOverlay`, `legendConfig`),
 * the load-complete signalling, and the hooks that concrete subclasses
 * implement.
 *
 * @see FixedLegend
 * @see CategoricalLegend
 * @see RangeLegend
 * @see InterpolatedLegend
 */
export abstract class BaseLegend extends Loaddable {
    /**
     * Configuration this legend is responsible for.
     *
     * Subclasses may mutate it in place when a remote configuration
     * arrives (see {@link onLoadData}), so downstream consumers read the
     * resolved values from the same object.
     */
    legendConfig: LegendConfig;

    /** Whether the legend has finished loading, locally or remotely. */
    isLoaded: boolean = false;

    /** MapLibre map instance the legend styles. */
    map: MapLibre;

    /** Id of the MapLibre layer the legend styles. */
    layerId: string;

    /** Overlay this legend belongs to. */
    parentOverlay: Overlay;

    /**
     * Whether a repaint has already been scheduled.
     *
     * Reserved for subclasses that need to coalesce multiple style
     * updates into a single `requestAnimationFrame` callback.
     */
    paintScheduled: boolean = false;

    /**
     * Callback fired once the legend has applied its style.
     *
     * Receives the layer id and the legend id so listeners can correlate
     * the event with the overlay and legend that produced it.
     */
    onLoadCompleteListener: (layerID: string, legendID: string) => void =
        () => {};

    /**
     * @param layerId - Id of the MapLibre layer this legend styles.
     * @param legendConfig - Configuration for this legend.
     * @param overlay - Parent overlay.
     * @param map - MapLibre map instance.
     * @param onLoadCompleteListener - Fired when the legend finishes
     *   applying its style.
     */
    constructor(
        layerId: string,
        legendConfig: LegendConfig,
        overlay: Overlay,
        map: MapLibre,
        onLoadCompleteListener: (layerID: string, legendID: string) => void
    ) {
        super();
        this.layerId = layerId;
        this.legendConfig = legendConfig;
        this.map = map;
        this.parentOverlay = overlay;
        this.onLoadCompleteListener = onLoadCompleteListener;
    }

    // -----------------------------------------------------------------
    // Abstract hooks
    // -----------------------------------------------------------------

    /**
     * Applies the legend style to the MapLibre layer.
     *
     * Implementations that need to wait for a remote configuration should
     * call {@link load} and resolve once the style has been applied. The
     * returned promise gates the parent overlay's own loading: the overlay
     * does not start fetching its features until every legend has resolved.
     * Implementations that depend on the overlay's features (for example,
     * to compute bounds or discover categories) should resolve early and
     * defer the actual styling to {@link doExtraStyling}.
     *
     * @returns Promise that resolves once the style has been applied, or
     *   once the legend has decided to defer styling.
     */
    abstract updateMapLayout(): Promise<void>;

    /**
     * Called after the parent overlay has finished loading its features.
     *
     * Use this hook when the legend needs to inspect the underlying
     * `FeatureCollection` (for example, to compute bounds or discover
     * categories). Implementations that do not need post-load work must
     * still provide an empty body.
     */
    abstract doExtraStyling(): void;

    // -----------------------------------------------------------------
    // Optional hooks
    // -----------------------------------------------------------------

    /**
     * Populates the color cache for the legend.
     *
     * Called by {@link onLoadComplete} before `updateMapLayout`. Subclasses
     * that do not use colors may leave the default empty implementation.
     */
    cacheColors(): void {}

    /**
     * Populates the icon cache for the legend.
     *
     * Called by {@link onLoadComplete} before `updateMapLayout`. Subclasses
     * that do not use icons may leave the default empty implementation.
     */
    cacheIcons(): void {}

    /**
     * Parses a chunk received from the worker while loading a remote
     * configuration.
     *
     * The default implementation ignores the payload and returns a resolved
     * promise, which is appropriate for legends that do not support remote
     * configuration (for example, `fixed`). Subclasses that do support it
     * override this method and mutate {@link legendConfig} in place.
     *
     * @param _data - Parsed payload received from the worker.
     * @returns Promise that resolves once the payload has been applied.
     */
    onLoadData(_data: FetchData): Promise<void> {
        return Promise.resolve();
    }

    // -----------------------------------------------------------------
    // Lifecycle
    // -----------------------------------------------------------------

    /**
     * Final step of the load cycle.
     *
     * Marks the legend as loaded, lets subclasses populate their caches,
     * and triggers the style application via {@link updateMapLayout}.
     *
     * Called by {@link Loaddable.tryComplete} once the worker has signalled
     * completion and every `onLoadData` promise has settled.
     */
    onLoadComplete(): void {
        this.isLoaded = true;
        this.cacheColors();
        this.cacheIcons();
        this.updateMapLayout();
    }

    /**
     * URL from which the remote configuration is fetched.
     *
     * Returns `undefined` by default, which tells {@link Loaddable.load} to
     * skip the worker and complete immediately. Legends that support remote
     * configuration override this method and return their `configUrl`.
     *
     * @returns The configuration URL, or `undefined` when none applies.
     */
    getUrl(): string | undefined {
        return undefined;
    }
}
