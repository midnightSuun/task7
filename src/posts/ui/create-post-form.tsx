import { useState } from "react"
import { PlusIcon } from "lucide-react"
import { z } from "zod"

import { useMe } from "@/auth/get-me"
import { CHARACTER_LIMIT_EXCEEDED_MESSAGE, Form, FormInput, FormTextarea } from "@/components/form"
import { FormButton } from "@/components/form/form-button"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { UserAvatar } from "@/users/ui/user-avatar"

import { useCreatePost } from "../api/create-post"

const POST_TITLE_MAX_LENGTH = 100
const POST_CONTENT_MAX_LENGTH = 500

const schema = z.object({
    title: z.string().max(POST_TITLE_MAX_LENGTH, CHARACTER_LIMIT_EXCEEDED_MESSAGE),
    content: z
        .string()
        .min(1, "Content is required")
        .max(POST_CONTENT_MAX_LENGTH, CHARACTER_LIMIT_EXCEEDED_MESSAGE),
})

type FormData = z.infer<typeof schema>

const defaultValues: FormData = {
    title: "",
    content: "",
}

export const CreatePostForm = () => {
    const { mutateAsync: createPost } = useCreatePost()
    const { data: me } = useMe()
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
            <DialogTrigger
                render={
                    <button
                        type="button"
                        className="flex w-full items-center gap-3 rounded-2xl bg-card px-4 py-3 text-left ring-1 ring-foreground/10 outline-none transition-colors hover:bg-accent/50 hover:ring-foreground/15 focus-visible:ring-2 focus-visible:ring-ring"
                    />
                }
            >
                <UserAvatar
                    displayName={me?.displayName ?? "You"}
                    avatar={me?.avatar}
                />
                <span className="min-w-0 flex-1 text-sm text-muted-foreground">
                    What's on your mind?
                </span>
                <span className="inline-flex h-8 shrink-0 items-center gap-1 rounded-full bg-primary px-3 text-sm font-medium text-primary-foreground">
                    <PlusIcon className="size-3.5" aria-hidden />
                    Post
                </span>
            </DialogTrigger>
            <DialogContent>
                <Form
                    onSubmit={handleSubmit}
                    validationSchema={schema}
                    defaultValues={defaultValues}
                    className="grid gap-6"
                >
                    <DialogHeader>
                        <DialogTitle>New post</DialogTitle>
                        <DialogDescription>
                            Create a new post to share with your friends
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="title">Title (optional)</Label>
                            <FormInput<FormData>
                                id="title"
                                name="title"
                                placeholder="Title"
                                maxLength={POST_TITLE_MAX_LENGTH}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="content">Content</Label>
                            <FormTextarea<FormData>
                                id="content"
                                name="content"
                                placeholder="What's new?"
                                rows={5}
                                maxLength={POST_CONTENT_MAX_LENGTH}
                            />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Cancel</Button>}/>
                        <FormButton>Post</FormButton>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
