import DyTab from "@/components/DyTab"
import AddNewsPageComponent from "@/components/pages/AddNewsPageComponent"
import NewsPageComponent from "@/components/pages/NewsPageComponent"

const tabItems = [
  {
    value: "add-news",
    label: "Add News",
    component: <AddNewsPageComponent />,
  },
  {
    value: "news",
    label: "News",
    component: <NewsPageComponent />,
  },
]

const DashboardPage = () => {
  return (
    <div className="my-5">
      <DyTab
        defaultValue="add-news"
        tabItems={tabItems}
        classContent=""
      />
    </div>
  )
}

export default DashboardPage
