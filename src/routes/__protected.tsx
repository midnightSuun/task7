import { createFileRoute } from "@tanstack/react-router"
import { Outlet } from "@tanstack/react-router"

import { AuthGuard } from "@/auth/components/auth-guard"
import { Layout } from "@/components/ui/layout"

export const Route = createFileRoute("/__protected")({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <AuthGuard>
            <Layout>
                <Outlet />
            </Layout>
        </AuthGuard>
    )
}
