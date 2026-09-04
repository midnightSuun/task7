import { Button } from "@/components/ui/button"
import type { Post } from "@/types"

import { useToggleLike } from "../api/toggle-like"

type Props = {
    postId: Post["id"]
    likes: Post["likes"]
}

export const PostLikes = ({ postId, likes }: Props) => {
    const { mutate: toggleLike } = useToggleLike()

    const handleToggleLike = () => {
        toggleLike({ params: { path: { id: postId } } })
    }

    return (
        <>
            <Button onClick={handleToggleLike}>
                {likes.likedByMe ? "Unlike" : "Like"} {likes.count}
            </Button>
        </>
    )
}
