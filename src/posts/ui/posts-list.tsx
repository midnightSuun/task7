import { FileTextIcon } from "lucide-react"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { Skeleton } from "@/components/ui/skeleton"
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
        isPending,
    } = usePosts(authorId)

    const loadMoreRef = useIntersectionObserver({
        enabled: Boolean(hasNextPage) && !isFetchingNextPage,
        onIntersect: fetchNextPage,
        rootMargin: "200px",
    })

    const posts = postsData?.pages.flatMap((page) => page.data) ?? []

    if (isPending) {
        return (
            <div className="grid gap-4">
                {Array.from({ length: 3 }, (_, index) => (
                    <Skeleton key={index} className="h-40 w-full rounded-2xl" />
                ))}
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-card px-6 py-16 text-center ring-1 ring-foreground/10">
                <FileTextIcon className="size-8 text-muted-foreground" aria-hidden/>
                <p className="font-medium">No posts yet</p>
                <p className="text-sm text-muted-foreground">
                    Nothing to show here yet.
                </p>
            </div>
        )
    }

    return (
        <div className="grid gap-4">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
            {isFetchingNextPage && (
                <p className="py-2 text-center text-sm text-muted-foreground">
                    Loading more…
                </p>
            )}
            <div ref={loadMoreRef} />
        </div>
    )
}
