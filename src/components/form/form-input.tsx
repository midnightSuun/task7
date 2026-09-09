import type { ComponentProps } from "react"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form";
import type { FormData } from "./form";

type Props<T extends FormData> = ComponentProps<typeof Input> & {
    name: keyof T;
};

export const FormInput = <T extends FormData>({ name, ...props }: Props<T>) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const error = errors[name];
    const errorMessage = error?.message;

    return (
        <div className="grid gap-1">
            <Input aria-invalid={Boolean(error)} {...props} {...register(name)} />
            {typeof errorMessage === "string" && (
                <p className="text-sm text-destructive">{errorMessage}</p>
            )}
        </div>
    );
};