import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReactNode } from "react"

type TabItems = {
  value: string
  label: string
  component: ReactNode
}

type DynamicTabProps = {
  defaultValue: string
  tabItems: TabItems[]
  classContent?: string
}

const DyTab = ({ defaultValue, tabItems, classContent }: DynamicTabProps) => {
  return (
    <Tabs defaultValue={defaultValue}>
      <div className="flex items-center justify-center">
        <TabsList className="rounded-lg flex items-center justify-start flex-wrap h-auto gap-1">
          {tabItems.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="cursor-pointer"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tabItems.map((item) => (
        <TabsContent
          key={item.value}
          value={item.value}
          className={classContent}
        >
          {item.component}
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default DyTab
