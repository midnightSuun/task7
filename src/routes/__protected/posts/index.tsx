import { createFileRoute } from "@tanstack/react-router"

import { PostsPage } from "@/posts/ui/posts-page"

export const Route = createFileRoute("/__protected/posts/")({
    component: PostsPage,
})
