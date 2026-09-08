import type { ComponentProps } from "react"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form";


type Props = ComponentProps<typeof Input> & {
    name: string;
};

export const FormInput = ({ name, ...props }: Props) => {
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