"use client"

import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Hash } from "lucide-react"

const DyInputGroup = ({
  name,
  label,
  type = "text",
  placeholder,
  disabled = false,
}: {
  name: string
  label: string
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
                className="focus:bg-transparent"
                {...field}
              />
              <InputGroupAddon>
                <Hash />
              </InputGroupAddon>
            </InputGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default DyInputGroup
