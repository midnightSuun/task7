import { getRouteApi } from "@tanstack/react-router"
import { usePost } from "../api/get-post"
import { PostLikes } from "./post-likes"

const route = getRouteApi("/__protected/posts/$postId")

export const PostDetail = () => {
    const { postId } = route.useParams()
    const { data: post } = usePost(postId)

    return <>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <PostLikes postId={post.id} likes={post.likes} />
    </>
}