/**
 * Worker: Loads data from a URL.
 * Automatically detects format via Content-Type header.
 * - NDJSON: sends each line as raw text.
 * - JSON: sends the entire parsed object.
 */
self.onmessage = async e => {
  const {url} = e.data

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const contentType = response.headers.get("content-type") || ""

    const isNDJSON =
      contentType.includes("ndjson") ||
      contentType.includes("application/x-ndjson")

    if (isNDJSON) {
      // NDJSON streaming: read line by line
      const reader = response.body.getReader()
      const decoder = new TextDecoder("utf-8")
      let buffer = ""

      while (true) {
        // eslint-disable-next-line no-await-in-loop -- Required for stream reading
        const {done, value} = await reader.read()
        if (done) break
        buffer += decoder.decode(value, {stream: true})
        const lines = buffer.split("\n")
        buffer = lines.pop() || ""
        for (const line of lines) {
          if (line.trim() === "") continue
          self.postMessage({type: "line", data: line})
        }
      }
      if (buffer.trim()) {
        self.postMessage({type: "line", data: buffer.trim()})
      }
    } else {
      // JSON mode: send the entire parsed object
      const data = await response.json()
      self.postMessage({type: "data", data: data})
    }

    self.postMessage({type: "complete"})
  } catch (error) {
    console.error("[DataLoader Worker] Error:", error.message)
    self.postMessage({type: "error", error: error.message})
  }
}
