import { Input } from "@/components/ui/input"
import { useCreatePost } from "../api/create-post"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export const CreatePostForm = () => {
    const { mutate: createPost } = useCreatePost()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handleCreatePost = () => {
        createPost({ body: { title, content } })
    }

    return <>
        <Input onChange={(e) => setTitle(e.target.value)}></Input>
        <Input onChange={(e) => setContent(e.target.value)}></Input>
        <Button onClick={handleCreatePost}>Create Post</Button>
    </>
}