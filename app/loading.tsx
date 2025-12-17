import { Spinner } from "@/components/ui/spinner"

const LoadingPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h1 className="text-xl flex items-center gap-2">
        <Spinner /> Loading...
      </h1>
    </div>
  )
}

export default LoadingPage
