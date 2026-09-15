import type { ChangeEvent, ComponentProps } from "react"
import { Controller, useFormContext } from "react-hook-form"

import { Textarea } from "@/components/ui/textarea"

import type { FormData } from "./form"
import { clampWithCharacterLimit } from "./form-input"

type Props<T extends FormData> = ComponentProps<typeof Textarea> & {
    name: keyof T
}

export const FormTextarea = <T extends FormData>({ name, maxLength, ...props }: Props<T>) => {
    const { control } = useFormContext()

    return (
        <Controller
            name={String(name)}
            control={control}
            render={({ field, fieldState }) => {
                const errorMessage = fieldState.error?.message
                const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
                    field.onChange(clampWithCharacterLimit(event.target.value, maxLength))
                }

                return (
                    <div className="grid gap-1">
                        <Textarea
                            {...props}
                            name={field.name}
                            value={field.value ?? ""}
                            onBlur={field.onBlur}
                            ref={field.ref}
                            onChange={handleChange}
                            aria-invalid={Boolean(fieldState.error)}
                        />
                        {typeof errorMessage === "string" && (
                            <p className="text-sm text-destructive">{errorMessage}</p>
                        )}
                    </div>
                )
            }}
        />
    )
}
