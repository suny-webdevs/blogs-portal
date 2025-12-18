"use client"

import DyForm from "./DyForm"
import DyInput from "./DyInput"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { Spinner } from "../ui/spinner"

const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
})

export type TLogin = z.infer<typeof loginSchema>

const LoginForm = () => {
  const router = useRouter()
  const [loading, startTransition] = useTransition()

  const defaultValues = {
    email: "",
    password: "",
  }

  const onSubmit = async (data: TLogin) => {
    startTransition(async () => {
      try {
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    })
  }

  return (
    <DyForm<TLogin>
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      resolver={zodResolver(loginSchema)}
      className="flex flex-col gap-5"
    >
      <div className="w-full flex flex-col items-center gap-1 text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold">
          Login to your account
        </h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email and password below <br /> to login to your account
        </p>
      </div>
      <DyInput
        type="email"
        name="email"
        label="Email"
        placeholder="your-email@domain.host"
      />
      <DyInput
        type="password"
        name="password"
        label="Password"
        placeholder="********"
      />
      <div>
        <Button
          disabled={loading}
          type="submit"
          className="cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Spinner /> Logging in...
            </span>
          ) : (
            "Login"
          )}
        </Button>
      </div>
    </DyForm>
  )
}

export default LoginForm
