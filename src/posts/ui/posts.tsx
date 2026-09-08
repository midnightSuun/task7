import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

import { usePosts } from "../api/get-posts"
import { PostCard } from "./post-card"
import { CreatePostForm } from "./create-post-form"

export const Posts = () => {
    const {
        data: postsData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = usePosts()

    const loadMoreRef = useIntersectionObserver({
        enabled: Boolean(hasNextPage) && !isFetchingNextPage,
        onIntersect: fetchNextPage,
        rootMargin: "200px",
    })

    const posts = postsData?.pages.flatMap((page) => page.data) ?? []

    return (
        <div className="grid gap-4">
            <CreatePostForm />
            {posts.map((post) => (
                <PostCard key={post.id} post={post}/>
            ))}
            <div ref={loadMoreRef} />
        </div>
    )
}
