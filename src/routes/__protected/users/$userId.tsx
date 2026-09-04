import { createFileRoute } from "@tanstack/react-router"

import { UserProfile } from "@/users/ui/user-profile"

export const Route = createFileRoute("/__protected/users/$userId")({
    component: UserProfile,
})
