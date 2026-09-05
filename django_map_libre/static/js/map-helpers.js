export class DataLoader {
  constructor(url, onData, onComplete, onError, workerUrl) {
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
      this.onError(error.message)
    }
  }

  _cleanup() {
    if (this.worker) {
      this.worker.terminate()
      this.worker = null
    }
  }
}
