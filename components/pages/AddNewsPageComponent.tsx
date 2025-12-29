import NewsForm from "../form/NewsForm"

const AddNewsPageComponent = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <h1 className="text-3xl md:text-4xl font-bold">Create News</h1>
      <div>
        <NewsForm />
      </div>
      <div></div>
    </div>
  )
}

export default AddNewsPageComponent
