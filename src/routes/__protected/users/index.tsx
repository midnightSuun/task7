import { createFileRoute } from "@tanstack/react-router"

import { UsersList } from "@/users"

export const Route = createFileRoute("/__protected/users/")({
    component: UsersList,
})
