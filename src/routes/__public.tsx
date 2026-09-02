import { createFileRoute } from "@tanstack/react-router"
import { Outlet } from "@tanstack/react-router"

import { UnauthorizedGuard } from "@/auth/components/unauthorized"

export const Route = createFileRoute("/__public")({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <UnauthorizedGuard>
            <Outlet />
        </UnauthorizedGuard>
    )
}
