import { Button } from "@/components/ui/button"
import { useToggleLike } from "../api/toggle-like"
import type { Post } from "@/types"

type Props = {
    postId: Post["id"],
    likes: Post["likes"]
}

export const PostLikes = ({ postId, likes }: Props) => {
    const { mutate: toggleLike } = useToggleLike()

    const handleToggleLike = () => {
        toggleLike({ params: { path: { id: postId } } })
    }

    return <>
        <Button onClick={handleToggleLike}>{likes.likedByMe ? "Unlike" : "Like"} {likes.count}</Button>
    </>
}