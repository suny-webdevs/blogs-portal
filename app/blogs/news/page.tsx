import NewsCard from "@/components/NewsCard"
import { News } from "@/app/generated/prisma/client"
import { fetchGet } from "@/lib/actions"

const NewsPage = async () => {
  const news = await fetchGet("news")

  return (
    <div className="my-10">
      <h1 className="text-4xl md:text-5xl font-bold">News</h1>
      {/* Payloads */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-1">
        {news?.data?.map((item: News) => (
          <NewsCard
            key={item?.id}
            payload={item}
          />
        ))}
      </div>
    </div>
  )
}

export default NewsPage
