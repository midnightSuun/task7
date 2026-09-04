import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/__protected/")({
    component: RouteComponent,
})

function RouteComponent() {

    return (
        <div>
            <Link to="/users">Users</Link>
            <Link to="/posts">Posts</Link>
        </div>
    )
}
