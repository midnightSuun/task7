import { zodResolver } from "@hookform/resolvers/zod";
import { type PropsWithChildren, type Ref, useImperativeHandle } from "react";
import {
    type DefaultValues,
    type FieldValues,
    FormProvider,
    type SubmitHandler,
    useForm,
    type UseFormReset,
    type UseFormSetError,
} from "react-hook-form";
import type { ZodType } from "zod";


export type FormData = FieldValues;

export type FormHandle<T extends FormData> = {
    setError: UseFormSetError<T>;
    submit: () => Promise<void>;
    reset: UseFormReset<T>;
};

export type Props<T extends FormData> = PropsWithChildren<{
    defaultValues: DefaultValues<T>;
    validationSchema: ZodType<T, T>;
    onSubmit: SubmitHandler<T>;
    className?: string;
    ref?: Ref<FormHandle<T>>;
    disabled?: boolean;
}>;

export const Form = <T extends FormData>({
    children,
    className,
    defaultValues,
    validationSchema,
    onSubmit,
    ref,
    disabled,
}: Props<T>) => {
    const methods = useForm({
        disabled,
        defaultValues,
        resolver: zodResolver(validationSchema),
    });
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = methods;

    const handleFormSubmit: SubmitHandler<T> = async (data) => {
        await onSubmit(data);
        reset();
    };

    useImperativeHandle(
        ref,
        () => ({
            setError,
            reset,
            submit: async () => {
                await handleSubmit(handleFormSubmit)();
            },
        }),
        [handleFormSubmit, handleSubmit, reset, setError],
    );

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className={className}>
                {children}

                {/* required to rerender errors and isSubmitting in nested form components */}
                {(errors || isSubmitting !== undefined) && <span data-slot="form-force-update" />}
            </form>
        </FormProvider>
    );
};