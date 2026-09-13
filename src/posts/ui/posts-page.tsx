import { CreatePostForm } from "./create-post-form"
import { PostsList } from "./posts-list"

export const PostsPage = () => {
    return (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
            <CreatePostForm />
            <PostsList />
        </div>
    )
}
