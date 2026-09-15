import { api } from "@/api/client"
import { GET_ME_QUERY_KEY } from "@/auth/get-me"
import { useQueryClient } from "@tanstack/react-query"

import { GET_USER_QUERY_KEY } from "./get-user"

export const useUpdateProfile = () => {
    const queryClient = useQueryClient()

    return api.useMutation("put", "/api/users/me", {
        onSuccess: ({ id: userId }) => {
            queryClient.invalidateQueries({
                queryKey: GET_ME_QUERY_KEY,
            })
            queryClient.invalidateQueries({
                queryKey: GET_USER_QUERY_KEY(userId),
            })
        }
    })
}