import { createFileRoute } from "@tanstack/react-router"

import { SignInForm } from "@/auth/components/sign-in-form"

export const Route = createFileRoute("/__public/sign-in")({
    component: SignInForm,
})
