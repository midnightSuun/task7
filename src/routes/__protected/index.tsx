import { createFileRoute, Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { useLogout } from "@/auth/logout"

export const Route = createFileRoute("/__protected/")({
    component: RouteComponent,
})

function RouteComponent() {
    const { mutate: logout } = useLogout()

    return (
        <div>
            <Button onClick={() => logout()}>Logout</Button>
            
            <Link to="/users">Users</Link>
            <Link to="/posts">Posts</Link>
        </div>
    )
}
