"use client"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { NativeSelect, NativeSelectOption } from "../ui/native-select"

type Option = {
  label: string
  value: string
}

type DyNativeSelectProps = {
  name: string
  label: string
  options: Option[]
  placeholder?: string
  disabled?: boolean
}

const DyNativeSelect = ({
  name,
  label,
  options,
  placeholder = "Select option",
  disabled = false,
}: DyNativeSelectProps) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <NativeSelect
              disabled={disabled}
              value={field.value}
              onChange={field.onChange}
            >
              <NativeSelectOption value="">{placeholder}</NativeSelectOption>

              {options.map((option) => (
                <NativeSelectOption
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default DyNativeSelect
