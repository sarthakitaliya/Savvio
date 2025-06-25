export function detectType(url: string) {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube"
  if (url.includes("twitter.com") && url.includes("/status/")) return "tweet"
  if (url.match(/\.(jpeg|jpg|png|webp|gif)$/)) return "image"
  if (url.endsWith(".svg")) return "svg"
  return "url"
}   