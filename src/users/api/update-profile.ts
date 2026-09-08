import { api } from "@/api/client"
import { GET_ME_QUERY_KEY } from "@/auth/get-me"
import { useQueryClient } from "@tanstack/react-query"

export const useUpdateProfile = () => {
    const queryClient = useQueryClient()

    return api.useMutation("put", "/api/users/me", {
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: GET_ME_QUERY_KEY,
            })
        }
    })
}