import { Input } from "@/components/ui/input"
import { useCreatePost } from "../api/create-post"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export const CreatePostForm = () => {
    const { mutate: createPost } = useCreatePost()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const isFormEmpty = !title.trim() || !content.trim()

    const handleCreatePost = () => {
        createPost({ body: { title, content } })
    }

    return <>
        <Input onChange={(e) => setTitle(e.target.value)} placeholder="Title"></Input>
        <Input onChange={(e) => setContent(e.target.value)} placeholder="Content"></Input>
        <Button onClick={handleCreatePost} disabled={isFormEmpty}>Create Post</Button>
    </>
}