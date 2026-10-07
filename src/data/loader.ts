import type {
    CompleteCallback,
    DataCallback,
    ErrorCallback,
    FetchData,
} from "../types/map-types";

export class DataLoader {
    private url: string;
    private onData: DataCallback;
    private onComplete: CompleteCallback;
    private onError: ErrorCallback;
    private workerUrl: string;
    private worker: Worker | null;

    constructor(
        url: string,
        onData: DataCallback,
        onComplete: CompleteCallback,
        onError: ErrorCallback,
        workerUrl: string
    ) {
        this.url = url;
        this.onData = onData;
        this.onComplete = onComplete;
        this.onError = onError;
        this.workerUrl = workerUrl;
        this.worker = null;
    }

    load() {
        try {
            this.worker = new Worker(this.workerUrl);
            this.worker.onmessage = (e) => {
                const { type, data, error } = e.data;

                if (type === "line") {
                    try {
                        const parsed = JSON.parse(data);
                        this.onData(parsed);
                    } catch (parseError) {
                        console.warn(
                            "[DataLoader] Failed to parse line:",
                            data,
                            parseError
                        );
                    }
                } else if (type === "data") {
                    this.onData(data);
                } else if (type === "complete") {
                    this.onComplete();
                } else if (type === "error") {
                    this.onError(error);
                }
            };

            this.worker.onerror = (e) => {
                this.onError(e.message);
            };

            this.worker.postMessage({ url: this.url });
        } catch (error) {
            console.error("[DataLoader] Failed to create worker:", error);
            this.onError(
                error instanceof Error ? error.message : String(error)
            );
        }
    }
}

export class Loaddable {
    loader: DataLoader | null = null;
    private pendingTasks: Set<Promise<void>> = new Set();
    private completeReceived = false;
    load(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.loader) resolve(); // Prevent multiple loads
            if (this.getUrl() === null || this.getUrl() === undefined) {
                this.onLoadComplete();
                return resolve();
            }
            this.loader = new DataLoader(
                this.getUrl() as string,
                (data: FetchData) => {
                    this.pendingTasks.add(this.onLoadData(data));
                    this.tryComplete(resolve);
                },
                () => {
                    this.completeReceived = true;
                    this.tryComplete(resolve);
                },
                (error: string) => {
                    this.onLoadError(error);
                    reject();
                },
                import.meta.resolve("map-worker")
            );
            this.loader.load();
        });
    }
    private tryComplete(resolve: (value: void | PromiseLike<void>) => void) {
        if (this.completeReceived) {
            Promise.all(this.pendingTasks).then(() => {
                this.pendingTasks.clear();
                this.onLoadComplete();
                resolve();
            });
        }
    }
    onLoadComplete(): void {}
    onLoadError(error: string): void {
        console.error(`Error loading data:`, error);
        this.loader = null; // Reset loader on error to allow retry
    }
    onLoadData(_data: FetchData): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getUrl(): string | undefined {
        throw new Error("Method not implemented.");
    }
}
