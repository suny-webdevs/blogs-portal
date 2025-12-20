/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { FieldValues, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import z from "zod"
import DyInput from "./DyInput"
import { useState, useTransition } from "react"
// import { fetchPost } from "@/lib/actions"
import { Spinner } from "../ui/spinner"
import { toast } from "sonner"
import DyForm from "./DyForm"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import { NativeSelect, NativeSelectOption } from "../ui/native-select"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Hash } from "lucide-react"
import Tiptap from "../editor/TipTap"

export const newsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.any(),
})

export type TNews = z.infer<typeof newsSchema>

const NewsForm = () => {
  const [titleBorder, setTitleBorder] = useState(false)
  const [content, setContent] = useState({})
  const [html, setHtml] = useState("")
  const [loading, startTransition] = useTransition()

  const defaultValues = {
    title: "",
    content: {},
    html: "",
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    startTransition(async () => {
      try {
        const finalData = { ...data, content, html }
        console.log(finalData)
        // const res = await fetchPost("news", data)
        // if (!res?.success) {
        //   toast.success(res?.message)
        // } else {
        //   toast.success(res?.message)
        // }
      } catch (error: any) {
        toast.error(error?.message)
      }
    })
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
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 px-3 py-2 rounded">
            <Label htmlFor="title-border">Title Border</Label>
            <Switch
              checked={titleBorder}
              onCheckedChange={setTitleBorder}
              id="title-border"
              className="cursor-pointer"
            />
          </div>
          <div>
            <NativeSelect disabled={!titleBorder}>
              <NativeSelectOption value="">
                Select Border Area
              </NativeSelectOption>
              <NativeSelectOption value="border-right">
                Border Right
              </NativeSelectOption>
              <NativeSelectOption value="border-left">
                Border Left
              </NativeSelectOption>
              <NativeSelectOption value="border-top">
                Border Top
              </NativeSelectOption>
              <NativeSelectOption value="border-bottom">
                Border Bottom
              </NativeSelectOption>
              <NativeSelectOption value="border-x">Border X</NativeSelectOption>
              <NativeSelectOption value="border-y">Border Y</NativeSelectOption>
            </NativeSelect>
          </div>
          <div>
            <InputGroup>
              <InputGroupInput
                placeholder="Border color code (HEX)"
                disabled={!titleBorder}
              />
              <InputGroupAddon>
                <Hash />
              </InputGroupAddon>
            </InputGroup>
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
        <Button
          type="submit"
          className="cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Spinner /> Publishing...
            </span>
          ) : (
            "Publish"
          )}
        </Button>
      </div>
    </DyForm>
  )
}

export default NewsForm
