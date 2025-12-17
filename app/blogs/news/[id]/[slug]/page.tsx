import { fetchGet } from "@/lib/actions"
import formatDate from "@/utils/formatDate"

const NewsSinglePage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const news = await fetchGet(`news/${id}`)

  const numPostDate = news?.data?.createdAt?.split("T")[0]
  const strPostDate = formatDate(numPostDate!)

  return (
    <div className="my-10 max-w-xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold">{news?.data?.title}</h1>
      <p className="text-sm md:text-base font-semibold text-gray-500 mt-3">
        {strPostDate}
      </p>
      <p className="text-sm md:text-base mt-5">{news?.data?.description}</p>
    </div>
  )
}

export default NewsSinglePage
