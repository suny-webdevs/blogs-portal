"use client"

import parse from "html-react-parser"

const HTMLContent = ({
  codeString,
}: {
  codeString: string | null | undefined
}) => {
  return <article className="parsed-html">{parse(`${codeString}`)}</article>
}

export default HTMLContent
