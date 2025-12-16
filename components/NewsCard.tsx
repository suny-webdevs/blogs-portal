export type TNews = {
  id?: string
  title: string
  description: string
  createdAt?: string
}

const NewsCard = ({ payload }: { payload: TNews }) => {
  const { title, description, createdAt } = payload

  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm">{createdAt}</p>
      <p className="text-sm mt-3">{description}</p>
    </div>
  )
}

export default NewsCard
