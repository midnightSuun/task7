import { z } from "zod"

import { Form, FormInput } from "@/components/form"
import { Button } from "@/components/ui/button"

import { useCreatePost } from "../api/create-post"

const schema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
})

type FormData = z.infer<typeof schema>

const defaultValues: FormData = {
    title: "",
    content: "",
}

export const CreatePostForm = () => {
    const { mutateAsync: createPost, isPending } = useCreatePost()

    const handleSubmit = async (data: FormData) => {
        await createPost({ body: data })
    }

    return (
        <Form
            className="grid gap-3"
            onSubmit={handleSubmit}
            validationSchema={schema}
            defaultValues={defaultValues}
        >
            <FormInput name="title" placeholder="Title" />
            <FormInput name="content" placeholder="Content" />
            <Button type="submit" disabled={isPending}>
                Create Post
            </Button>
        </Form>
    )
}
