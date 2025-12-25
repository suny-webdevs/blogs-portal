import { useFormContext } from "react-hook-form"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"

const DySubmitButton = ({
  label,
  loadingLabel,
}: {
  label: string
  loadingLabel: string
}) => {
  const {
    formState: { isSubmitting },
  } = useFormContext()

  return (
    <Button
      disabled={isSubmitting}
      type="submit"
      className="cursor-pointer"
    >
      {isSubmitting ? (
        <span className="flex items-center gap-2">
          <Spinner /> {loadingLabel}
        </span>
      ) : (
        label
      )}
    </Button>
  )
}

export default DySubmitButton
