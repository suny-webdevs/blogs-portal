import { fetchGet } from "@/app/actions"
import NewsCard, { TNews } from "@/components/NewsCard"

const NewsPage = async () => {
  const news = await fetchGet("news")
  console.log(news)
  return (
    <div className="my-10">
      <h1 className="text-5xl font-bold">News</h1>
      {/* Payloads */}
      <div className="mt-10 grid grid-cols-2 gap-5">
        {news?.data?.map((item: TNews) => (
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
