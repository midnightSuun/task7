import { createFileRoute } from "@tanstack/react-router"
import { Outlet } from "@tanstack/react-router"

import { AuthGuard } from "@/auth/components/auth-guard"

export const Route = createFileRoute("/__protected")({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <AuthGuard>
            <Outlet />
        </AuthGuard>
    )
}
