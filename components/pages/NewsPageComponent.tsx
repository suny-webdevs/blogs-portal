import { News } from "@/app/generated/prisma/client"
import { fetchGet } from "@/lib/actions"

const NewsPageComponent = async () => {
  const news = await fetchGet("news")

  return (
    <div>
      {news?.data?.map((item: News) => {
        ;<div>
          <p className="font-bold">{item.title}</p>
        </div>
      })}
    </div>
  )
}

export default NewsPageComponent
