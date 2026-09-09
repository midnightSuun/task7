import { useState } from "react"
import { z } from "zod"

import { Button } from "@/components/ui/button"

import { Form, FormInput } from "@/components/form"
import { FormButton } from "@/components/form/form-button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
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
    const { mutateAsync: createPost } = useCreatePost()
    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit = async (data: FormData) => {
        await createPost({ body: data })
        setIsOpen(false)
    }

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open)
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger render={<Button variant="outline">New post</Button>} />
            <DialogContent>
                <Form onSubmit={handleSubmit} validationSchema={schema} defaultValues={defaultValues} className="grid gap-6">
                    <DialogHeader>
                        <DialogTitle>New post</DialogTitle>
                        <DialogDescription>
                            Create a new post to share with your friends
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="title">Title</Label>
                            <FormInput<FormData> id="title" name="title" placeholder="Title" />
                        </Field>
                        <Field>
                            <Label htmlFor="content">Content</Label>
                            <FormInput<FormData> id="content" name="content" placeholder="What's new?" />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        <FormButton>Post</FormButton>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
