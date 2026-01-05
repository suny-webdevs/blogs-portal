"use client"

import { News } from "@/app/generated/prisma/client"
import formatDate from "@/utils/formatDate"
import { useRouter } from "next/navigation"
import GetParagraph from "./GetParagraph"

const NewsCard = ({ payload }: { payload: News }) => {
  const { slug, title, html, createdAt } = payload
  const router = useRouter()

  const strPostDate = formatDate(createdAt)

  return (
    <div
      className="group p-5 border rounded-lg hover:scale-[102%] hover:shadow-xl hover:border-primary transition-all duration-300 cursor-pointer space-y-5"
      onClick={() => router.push(`/blogs/news/${slug}`)}
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-bold group-hover:text-3xl group-hover:text-primary transition-all duration-300">
          {title}
        </h1>
        <p className="text-sm font-semibold text-gray-500 mt-1">
          {strPostDate}
        </p>
      </div>
      <GetParagraph html={html} />
    </div>
  )
}

export default NewsCard
