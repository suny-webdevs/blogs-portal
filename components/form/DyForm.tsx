import { ReactNode } from "react"
import { Form } from "../ui/form"
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form"

type TFormConfig<T extends FieldValues> = {
  defaultValues?: UseFormProps<T>["defaultValues"]
  resolver?: UseFormProps<T>["resolver"]
}

type TFormProps<T extends FieldValues> = {
  children: ReactNode
  onSubmit: SubmitHandler<T>
  className?: string
} & TFormConfig<T>

const DyForm = <T extends FieldValues>({
  children,
  onSubmit,
  defaultValues,
  resolver,
  className,
}: TFormProps<T>) => {
  const formConfig: TFormConfig<T> = {}

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues
  }

  if (resolver) {
    formConfig["resolver"] = resolver
  }

  const form = useForm<T>(formConfig)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmit(data)
        })}
        className={className}
      >
        {children}
      </form>
    </Form>
  )
}

export default DyForm
