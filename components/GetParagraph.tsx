import { load } from "cheerio"

const GetParagraph = ({ html, para = 0 }: { html: string; para?: number }) => {
  const $ = load(html)

  const paragraphs = $("p")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean)

  return (
    <div>
      <div>{paragraphs[para]}</div>
    </div>
  )
}

export default GetParagraph
