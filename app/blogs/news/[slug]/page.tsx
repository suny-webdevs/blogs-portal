import HTMLContent from "@/components/HtmlContent"
import { fetchGet } from "@/lib/actions"
import formatDate from "@/utils/formatDate"

const NewsSinglePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const news = await fetchGet(`news/${slug}`)

  const strPostDate = formatDate(news?.data?.createdAt)

  return (
    <div className="my-10 bg-white p-5 md:p-10 max-w-4xl mx-auto space-y-5 md:space-y-10">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold">{news?.data?.title}</h1>
        <p className="text-sm md:text-base font-semibold text-gray-500 mt-3">
          {strPostDate}
        </p>
      </div>
      <HTMLContent codeString={news?.data?.html} />
    </div>
  )
}

export default NewsSinglePage
