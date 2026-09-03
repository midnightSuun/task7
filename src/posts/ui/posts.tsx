import { Link } from "@tanstack/react-router"
import { usePosts } from "../api/get-posts"

export const Posts = () => {
    const { data: posts } = usePosts()

    return <>
        {posts.data.map((post) => (
            <Link to={'/posts/$postId'} params={{ postId: post.id }}>
                <h2>{post.title}</h2>
            </Link>
        ))}
    </>
}