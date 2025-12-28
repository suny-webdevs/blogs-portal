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
// import DyInputGroup from "./DyInputGroup"
import DySubmitButton from "./DySubmitButton"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { CircleQuestionMark, Hash } from "lucide-react"
import { FormDescription } from "../ui/form"
import { AnimatePresence, motion } from "motion/react"

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
    value: "border-t",
  },
  {
    label: "Border Bottom",
    value: "border-b",
  },
  {
    label: "Border Right",
    value: "border-r",
  },
  {
    label: "Border Left",
    value: "border-l",
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
  const [borderColor, setBorderColor] = useState("")
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
        titleBorderColor: borderColor ? `#${borderColor}` : "",
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
          placeholder="Input news title"
        />
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Label htmlFor="title-border">Title Border</Label>
            <Switch
              name="titleBorder"
              checked={titleBorder}
              onCheckedChange={setTitleBorder}
              id="title-border"
              className="cursor-pointer"
            />
          </div>
          <AnimatePresence>
            {titleBorder && (
              <motion.div
                initial={{ height: 0, opacity: 0, y: -8 }}
                animate={{ height: "auto", opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div
                  className={`w-full ${
                    titleBorder ? "block" : "hidden"
                  } space-y-5 pl-2 md:pl-4 border-l`}
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
                  <div className="space-y-2">
                    <Label
                      htmlFor="border-color"
                      className="flex items-center gap-2"
                    >
                      Border Color{" "}
                      <span
                        style={{
                          backgroundColor: borderColor
                            ? `#${borderColor}`
                            : "transparent",
                        }}
                        className={`size-4 rounded-full border`}
                      ></span>
                    </Label>
                    <InputGroup>
                      <InputGroupInput
                        type="text"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        placeholder="Input border color code"
                        id="border-color"
                        className="autofill:bg-transparent"
                      />
                      <InputGroupAddon>
                        <Hash className="size-3" />
                      </InputGroupAddon>
                    </InputGroup>
                    <FormDescription className="flex items-center gap-2">
                      <CircleQuestionMark className="size-4" /> Input 6 digit
                      hex color code without hash e.g.
                      <code className="bg-secondary px-1 rounded-sm">
                        f0f0f0
                      </code>
                    </FormDescription>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
