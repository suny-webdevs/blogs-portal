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
    value: "manage-news",
    label: "Manage News",
    component: <NewsPageComponent />,
  },
]

const DashboardPage = () => {
  return (
    <div className="my-5">
      <DyTab
        defaultValue="add-news"
        tabItems={tabItems}
      />
    </div>
  )
}

export default DashboardPage
