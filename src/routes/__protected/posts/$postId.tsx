import { createFileRoute } from "@tanstack/react-router"

import { PostDetail } from "@/posts/ui/post-detail"

export const Route = createFileRoute("/__protected/posts/$postId")({
    component: PostDetail,
})
