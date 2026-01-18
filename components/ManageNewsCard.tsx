/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { News } from "@/app/generated/prisma/client"
import formatDate from "@/utils/formatDate"
import { Button } from "./ui/button"
import { Link, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { fetchDelete } from "@/lib/actions"
import { toast } from "sonner"
import { useState } from "react"
import { Spinner } from "./ui/spinner"
import { CopyButton } from "./ui/shadcn-io/copy-button"

const ManageNewsCard = ({ payload }: { payload: News }) => {
  const { slug, title, createdAt } = payload
  const router = useRouter()
  const strPostDate = formatDate(createdAt)
  const [loading, setLoading] = useState(false)
  const postUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/news/${slug}`

  const handleDelete = async () => {
    try {
      setLoading(true)
      const res = await fetchDelete(`/news/${slug}`, "news")
      if (res?.success) {
        toast.success(res?.message)
      }
      setLoading(false)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="group flex items-center justify-between p-5 shadow border rounded-lg md:hover:scale-[102%] md:hover:shadow-xl md:hover:border-primary md:transition-all md:duration-300">
      <div className="space-y-0 md:space-y-2">
        <h1
          onClick={() => router.push(`/blogs/news/${slug}`)}
          className="text-xl md:text-3xl font-bold cursor-pointer md:group-hover:text-primary md:transition-colors md:duration-300 md:flex md:items-center md:gap-2"
        >
          {title}{" "}
          <Link className="size-4 opacity-0 md:group-hover:opacity-100 md:transition-opacity" />
        </h1>
        <p className="text-gray-400">{strPostDate}</p>
      </div>
      <div className="flex items-center gap-2">
        <CopyButton
          content={postUrl}
          className="md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-300"
        />
        <Button
          variant={"outline"}
          size="icon"
          onClick={handleDelete}
          className="cursor-pointer hover:bg-red-50 hover:scale-[1.05] md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-300"
        >
          {loading ? <Spinner /> : <Trash2 className="text-red-500" />}
        </Button>
      </div>
    </div>
  )
}

export default ManageNewsCard
