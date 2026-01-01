import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"

const DySubmitButton = ({
  label,
  loadingLabel,
  loadingState,
}: {
  label: string
  loadingLabel: string
  loadingState: boolean
}) => {
  return (
    <Button
      disabled={loadingState}
      type="submit"
      className="cursor-pointer"
    >
      {loadingState ? (
        <span className="flex items-center gap-2">
          <Spinner className="text-primary-foreground" /> {loadingLabel}
        </span>
      ) : (
        label
      )}
    </Button>
  )
}

export default DySubmitButton
