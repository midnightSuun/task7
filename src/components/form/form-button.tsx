import { Button } from "@/components/ui/button"
import type { ComponentProps } from "react"
import { useFormContext } from "react-hook-form"

type Props = ComponentProps<typeof Button>

export const FormButton = ( { children }: Props) => {
    const { formState: { isSubmitting } } = useFormContext()

    return (
        <Button type="submit" disabled={isSubmitting}>{children}</Button>
    )
}
