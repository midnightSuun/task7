import { signOut } from "firebase/auth"
import { firebaseAuth } from "@/auth/firebase"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GET_ME_QUERY_KEY } from "@/auth/get-me"

const mutationFn = async () => {
    await signOut(firebaseAuth)
}

export const useLogout = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [GET_ME_QUERY_KEY],
            })
        }
    })
}