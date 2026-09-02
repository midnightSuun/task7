import { createFileRoute } from "@tanstack/react-router"

import { api } from "@/api/client"
import { SignInForm } from "@/auth/components/sign-in-form"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/")({
    component: RouteComponent,
})

function RouteComponent() {
    const { data } = api.useQuery("get", "/api/users")

    console.log(data)

    return (
        <div>
            <SignInForm />
            <Button>Hello</Button>
        </div>
    )
}
