import NewsCard from "@/components/NewsCard"
import { News } from "@/app/generated/prisma/client"
import { fetchGet } from "@/lib/actions"

const NewsPage = async () => {
  const news = await fetchGet("news")

  return (
    <div className="my-10 md:px-10">
      <h1 className="text-4xl md:text-5xl font-bold">News</h1>
      {/* Payloads */}
      <div className="mt-10 space-y-5">
        <div>
          <NewsCard payload={news?.data?.[0]} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {news?.data?.slice(1, 3).map((item: News) => (
            <NewsCard
              key={item?.id}
              payload={item}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {news?.data?.slice(3).map((item: News) => (
            <NewsCard
              key={item?.id}
              payload={item}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewsPage
