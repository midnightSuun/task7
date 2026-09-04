import { createFileRoute } from "@tanstack/react-router"

import { Posts } from "@/posts/ui/posts"

export const Route = createFileRoute("/__protected/posts/")({
    component: Posts,
})
