import { CreatePostForm } from "./create-post-form"
import { PostsList } from "./posts-list"

export const PostsPage = () => {
    return (
        <div>
            <div className="mb-4">
                <CreatePostForm />
            </div>
            <PostsList />
        </div>
    )
}