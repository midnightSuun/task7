import type { ComponentProps } from "react"
import { Controller, useFormContext } from "react-hook-form"

import { Input } from "@/components/ui/input"

import type { FormData } from "./form"

type Props<T extends FormData> = ComponentProps<typeof Input> & {
    name: keyof T
}

export const FormInput = <T extends FormData>({ name, ...props }: Props<T>) => {
    const { control } = useFormContext()

    return (
        <Controller
            name={String(name)}
            control={control}
            render={({ field, fieldState }) => {
                const errorMessage = fieldState.error?.message
                const handleValueChange = (value: string) => {
                    field.onChange(value)
                }

                return (
                    <div className="grid gap-1">
                        <Input
                            {...props}
                            name={field.name}
                            value={field.value ?? ""}
                            onBlur={field.onBlur}
                            ref={field.ref}
                            onValueChange={handleValueChange}
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
