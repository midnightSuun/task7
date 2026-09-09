import { CreatePostForm } from "./create-post-form"
import { PostsList } from "./posts-list"

export const PostsPage = () => {
    return (
        <div>
            <CreatePostForm />
            <PostsList />
        </div>
    )
}