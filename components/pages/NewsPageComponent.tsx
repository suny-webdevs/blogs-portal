import { News } from "@/app/generated/prisma/client"
import { fetchGet } from "@/lib/actions"
import ManageNewsCard from "../ManageNewsCard"

const NewsPageComponent = async () => {
  const news = await fetchGet("news")

  return (
    <div className="max-w-4xl mx-auto p-5 md:p-10 space-y-3">
      <div className="flex items-center justify-end">
        <p>Total news posts: {news?.data?.length}</p>
      </div>
      <div className="space-y-5">
        {news?.data?.map((item: News) => (
          <ManageNewsCard
            key={item.slug}
            payload={item}
          />
        ))}
      </div>
    </div>
  )
}

export default NewsPageComponent
