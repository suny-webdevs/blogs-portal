/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { FieldValues, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import DyInput from "./DyInput"
import { useState } from "react"
import { fetchPost } from "@/lib/actions"
import { toast } from "sonner"
import DyForm from "./DyForm"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import Tiptap from "../editor/TipTap"
import DyNativeSelect from "./DyNativeSelect"
import DyInputGroup from "./DyInputGroup"
import DySubmitButton from "./DySubmitButton"

export const newsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  titleBorder: z.boolean().optional(),
  titleBorderArea: z.string().optional(),
  titleBorderColor: z.string().optional(),
  content: z.any(),
})

export type TNews = z.infer<typeof newsSchema>

const titleBorderAreas = [
  {
    label: "Border Top",
    value: "border-top",
  },
  {
    label: "Border Bottom",
    value: "border-bottom",
  },
  {
    label: "Border Right",
    value: "border-right",
  },
  {
    label: "Border Left",
    value: "border-left",
  },
  {
    label: "Border X",
    value: "border-x",
  },
  {
    label: "Border Y",
    value: "border-y",
  },
]

const NewsForm = () => {
  const [loading, setLoading] = useState(false)
  const [titleBorder, setTitleBorder] = useState(false)
  const [content, setContent] = useState({})
  const [html, setHtml] = useState("")

  const defaultValues = {
    title: "",
    titleBorderArea: "",
    titleBorderColor: "",
    content: {},
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setLoading(true)
      const finalData = {
        ...data,
        titleBorderColor: data.titleBorderColor
          ? `#${data.titleBorderColor}`
          : "",
        content,
        html,
        titleBorder,
      }
      // console.log({ finalData })
      const res = await fetchPost("news", finalData)
      if (!res?.success) {
        toast.success(res?.message)
      } else {
        toast.success(res?.message)
      }
      setLoading(false)
    } catch (error: any) {
      toast.error(error?.message)
    }
  }

  return (
    <DyForm<TNews>
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      resolver={zodResolver(newsSchema)}
      className="space-y-10"
    >
      <div className="space-y-3">
        <DyInput
          name="title"
          label="Title"
          placeholder="Enter title"
        />
        <div className="space-y-3">
          <div className="flex items-center gap-3 px-3 py-2 rounded">
            <Label htmlFor="title-border">Title Border</Label>
            <Switch
              name="titleBorder"
              checked={titleBorder}
              onCheckedChange={setTitleBorder}
              id="title-border"
              className="cursor-pointer"
            />
          </div>
          <div
            className={`w-full ${
              titleBorder ? "block" : "hidden"
            } space-y-5 pl-5 md:pl-10`}
          >
            <div>
              <DyNativeSelect
                label="Border Area"
                name="titleBorderArea"
                options={titleBorderAreas}
                placeholder="Select Border Area"
                disabled={!titleBorder}
              />
            </div>
            <div>
              <DyInputGroup
                label="Border Color"
                name="titleBorderColor"
                disabled={!titleBorder}
                placeholder="Border color code"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <Label htmlFor="content">Content</Label>
        <Tiptap
          id="content"
          onChange={(json, html) => {
            setContent(json)
            setHtml(html)
          }}
        />
      </div>
      <div>
        <DySubmitButton
          label="Publish"
          loadingLabel="Publishing..."
          loadingState={loading}
        />
      </div>
    </DyForm>
  )
}

export default NewsForm
