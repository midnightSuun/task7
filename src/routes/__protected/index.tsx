import { createFileRoute } from "@tanstack/react-router"

import { api } from "@/api/client"
import { Button } from "@/components/ui/button"
import { useLogout } from "@/auth/logout"

export const Route = createFileRoute("/__protected/")({
    component: RouteComponent,
})

function RouteComponent() {
    const { data } = api.useQuery("get", "/api/users")
    const { mutate: logout } = useLogout()

    return (
        <div>
            <Button onClick={() => logout()}>Logout</Button>
            <ul>
                {data?.data.map((user) => (
                    <li>
                        <span>{user.displayName}</span>
                        {/* @ts-expect-error Avatar is optional */}
                        <img src={user.avatar} alt={user.displayName} className="w-10 h-10 rounded-full" />
                    </li>
                ))}
            </ul>
            <Button>Hello</Button>
        </div>
    )
}
