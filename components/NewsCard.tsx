"use client"

import { News } from "@/app/generated/prisma/client"
import formatDate from "@/utils/formatDate"
import HTMLContent from "./HtmlContent"
import { useRouter } from "next/navigation"

const NewsCard = ({ payload }: { payload: News }) => {
  const { slug, title, html, createdAt } = payload

  const router = useRouter()

  const strPostDate = formatDate(createdAt)

  return (
    <div
      className="p-5 border rounded-lg hover:border-slate-500 cursor-pointer space-y-5"
      onClick={() => router.push(`/blogs/news/${slug}`)}
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm font-semibold text-gray-500 mt-1">
          {strPostDate}
        </p>
      </div>
      <HTMLContent codeString={html} />
    </div>
  )
}

export default NewsCard
