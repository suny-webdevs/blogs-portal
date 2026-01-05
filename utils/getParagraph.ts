const getParagraph = (html: string, para: number) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")
  const paragraphs = Array.from(doc.querySelectorAll("p"))
    .map((p) => p.textContent?.trim())
    .filter(Boolean)

  return paragraphs[para - 1]
}

export default getParagraph
