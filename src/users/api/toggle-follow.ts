import { useQueryClient } from "@tanstack/react-query"
import { GET_USER_QUERY_KEY } from "./get-user"
import { api } from "@/api/client"

export const useToggleFollow = () => {
    const queryClient = useQueryClient()

    return api.useMutation("post", "/api/users/{id}/follow", {
        onSuccess: ({userId}) => {
            queryClient.invalidateQueries({ queryKey: GET_USER_QUERY_KEY(userId) })
        },
    })
}