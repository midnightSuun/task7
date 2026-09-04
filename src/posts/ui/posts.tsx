import { Link, useRouter } from "@tanstack/react-router"

import { usePosts } from "../api/get-posts"
import { CreatePostForm } from "./create-post-form"
import { PostLikes } from "./post-likes"
import { Button } from "@/components/ui/button"

export const Posts = () => {
    const { data: posts } = usePosts()
    const router = useRouter()

    const handleBack = () => {
        router.history.back()
    }

    return (
        <>
            <Button onClick={handleBack}>Back</Button>
            {posts.data.map((post) => (
                <div>
                    <Link to={"/posts/$postId"} params={{ postId: post.id }}>
                        <h2>{post.title}</h2>
                    </Link>

                    <PostLikes postId={post.id} likes={post.likes} />
                </div>
            ))}
            <CreatePostForm />
        </>
    )
}
