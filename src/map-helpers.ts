import type {CompleteCallback, DataCallback, ErrorCallback} from "./map-types"

export class DataLoader {
  private url: string
  private onData: DataCallback
  private onComplete: CompleteCallback
  private onError: ErrorCallback
  private workerUrl: string
  private worker: Worker | null

  constructor(
    url: string,
    onData: DataCallback,
    onComplete: CompleteCallback,
    onError: ErrorCallback,
    workerUrl: string
  ) {
    this.url = url
    this.onData = onData
    this.onComplete = onComplete
    this.onError = onError
    this.workerUrl = workerUrl
    this.worker = null
  }

  load() {
    try {
      this.worker = new Worker(this.workerUrl)
      this.worker.onmessage = e => {
        const {type, data, error} = e.data

        if (type === "line") {
          try {
            const parsed = JSON.parse(data)
            this.onData(parsed)
          } catch (parseError) {
            console.warn("[DataLoader] Failed to parse line:", data, parseError)
          }
        } else if (type === "data") {
          this.onData(data)
        } else if (type === "complete") {
          this.onComplete()
          this._cleanup()
        } else if (type === "error") {
          this.onError(error)
          this._cleanup()
        }
      }

      this.worker.onerror = e => {
        this.onError(e.message)
        this._cleanup()
      }

      this.worker.postMessage({url: this.url})
    } catch (error) {
      console.error("[DataLoader] Failed to create worker:", error)
      this.onError(error instanceof Error ? error.message : String(error))
    }
  }

  _cleanup() {
    if (this.worker) {
      this.worker.terminate()
      this.worker = null
    }
  }
}
