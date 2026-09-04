import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signOut } from "firebase/auth"

import { firebaseAuth } from "@/auth/firebase"
import { GET_ME_QUERY_KEY } from "@/auth/get-me"
import { Navigate } from "@tanstack/react-router"

const mutationFn = async () => {
    await signOut(firebaseAuth)
}

export const useLogout = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.resetQueries({
                queryKey: [GET_ME_QUERY_KEY],
            })
            Navigate({ to: "/sign-in" })
        },
    })
}
