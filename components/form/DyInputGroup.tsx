"use client"

import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { CircleQuestionMark, Hash } from "lucide-react"

const DyInputGroup = ({
  name,
  label,
  type = "text",
  placeholder,
  disabled = false,
}: {
  name: string
  label?: string
  type?: "text"
  placeholder?: string
  disabled?: boolean
}) => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputGroup>
              <InputGroupInput
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className="autofill:bg-transparent"
                {...field}
              />
              <InputGroupAddon>
                <Hash />
              </InputGroupAddon>
            </InputGroup>
          </FormControl>
          <FormDescription className="flex items-center gap-2">
            <CircleQuestionMark className="size-4" /> Input correct hex color
            code e.g.
            <code className="bg-[#ffffff] px-1 rounded-sm">#f0f0f0</code>
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default DyInputGroup
