import { Navigate } from "@tanstack/react-router"
import type { PropsWithChildren } from "react"

import { useMe } from "../get-me"

export const UnauthorizedGuard = ({ children }: PropsWithChildren) => {
    const { data: me } = useMe()

    if (me) {
        return <Navigate to="/" />
    }

    return children
}
