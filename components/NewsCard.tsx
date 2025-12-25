import { News } from "@/app/generated/prisma/client"
import formatDate from "@/utils/formatDate"
import Link from "next/link"

const NewsCard = ({ payload }: { payload: News }) => {
  const { slug, title, html, createdAt } = payload

  const numPostDate = String(createdAt)?.split("T")[0]
  const strPostDate = formatDate(numPostDate!)

  return (
    <Link
      href={`/blogs/news/${slug}`}
      className="p-5 border rounded-lg hover:border-slate-500"
    >
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm font-semibold text-gray-500 mt-1">{strPostDate}</p>
      <p
        className="text-sm mt-3"
        dangerouslySetInnerHTML={{ __html: html || "<p>Loading content</p>" }}
      />
    </Link>
  )
}

export default NewsCard
