import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

import type { Post } from "@/types"
import { usePosts } from "../api/get-posts"
import { PostCard } from "./post-card"

type Props = {
    authorId?: Post["authorId"]
}

export const PostsList = ({ authorId }: Props) => {
    const {
        data: postsData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = usePosts(authorId)

    const loadMoreRef = useIntersectionObserver({
        enabled: Boolean(hasNextPage) && !isFetchingNextPage,
        onIntersect: fetchNextPage,
        rootMargin: "200px",
    })

    const posts = postsData?.pages.flatMap((page) => page.data) ?? []

    return (
        <div className="grid gap-4">
            {posts.map((post) => (
                <PostCard key={post.id} post={post}/>
            ))}
            <div ref={loadMoreRef} />
        </div>
    )
}
