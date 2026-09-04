import { createFileRoute } from "@tanstack/react-router"

import { AuthPage } from "@/auth/components/auth-page"

export const Route = createFileRoute("/__public/sign-in")({
    component: AuthPage,
})
