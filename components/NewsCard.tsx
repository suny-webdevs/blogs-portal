import { News } from "@/app/generated/prisma/client"
import formatDate from "@/utils/formatDate"
import Link from "next/link"

const NewsCard = ({ payload }: { payload: News }) => {
  const { id, slug, title, description, createdAt } = payload

  const numPostDate = String(createdAt)?.split("T")[0]
  const strPostDate = formatDate(numPostDate!)

  return (
    <Link
      href={`/blogs/news/${id}/${slug}`}
      className="p-5 border rounded-lg"
    >
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm font-semibold text-gray-500 mt-1">{strPostDate}</p>
      <p className="text-sm mt-3">{description}</p>
    </Link>
  )
}

export default NewsCard
