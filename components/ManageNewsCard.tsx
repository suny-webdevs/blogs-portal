/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { News } from "@/app/generated/prisma/client"
import formatDate from "@/utils/formatDate"
import { Button } from "./ui/button"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { fetchDelete } from "@/lib/actions"
import { toast } from "sonner"
import { useState } from "react"
import { Spinner } from "./ui/spinner"

const ManageNewsCard = ({ payload }: { payload: News }) => {
  const { slug, title, createdAt } = payload
  const router = useRouter()
  const strPostDate = formatDate(createdAt)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      const res = await fetchDelete(`/news/${slug}`)
      if (res?.success) {
        toast.success(res?.message)
      }
      setLoading(false)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="group flex items-center justify-between p-5 shadow rounded-lg">
      <div className="space-y-2">
        <div>
          <p className="text-sm font-mono text-gray-300">{slug}</p>
          <h1
            onClick={() => router.push(`/blogs/news/${slug}`)}
            className="text-3xl font-bold cursor-pointer"
          >
            {title}
          </h1>
        </div>
        <p className="text-gray-400">{strPostDate}</p>
      </div>
      <div>
        <Button
          variant={"ghost"}
          size="icon"
          onClick={handleDelete}
          className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {loading ? <Spinner /> : <Trash2 className="text-red-500" />}
        </Button>
      </div>
    </div>
  )
}

export default ManageNewsCard
