import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { signOut } from "firebase/auth"

import { firebaseAuth } from "@/auth/firebase"
import { GET_ME_QUERY_KEY } from "@/auth/get-me"

const mutationFn = async () => {
    await signOut(firebaseAuth)
}

export const useLogout = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.removeQueries({
                queryKey: GET_ME_QUERY_KEY,
            })
            navigate({ to: "/sign-in" })
        },
    })
}
