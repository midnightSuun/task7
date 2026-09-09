import { api } from "@/api/client"
import { GET_ME_QUERY_KEY } from "@/auth/get-me"
import { useQueryClient } from "@tanstack/react-query"
import { GET_USER_QUERY_KEY } from "./get-user"

export const useDeleteAvatar = () => {
    const queryClient = useQueryClient()

    return api.useMutation("delete", "/api/users/me/avatar", {
        onSuccess: ({id: userId}) => {
            queryClient.invalidateQueries({ queryKey: GET_ME_QUERY_KEY })
            queryClient.invalidateQueries({ queryKey: GET_USER_QUERY_KEY(userId) })
        },
    })
}