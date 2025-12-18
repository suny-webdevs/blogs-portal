import LoginForm from "@/components/form/LoginForm"
import { Newspaper } from "lucide-react"
import Link from "next/link"

const LoginPage = () => {
  return (
    <div className="grid min-h-svh grid-cols-">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            href="/blogs/news"
            className="flex items-center gap-2 font-medium"
          >
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Newspaper className="size-4" />
            </div>
            Blogs News Portal
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
