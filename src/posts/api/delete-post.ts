import { api } from "@/api/client"
import { GET_POSTS_QUERY_KEY } from "./get-posts"
import { useQueryClient } from "@tanstack/react-query"

export const useDeletePost = () => {
    const queryClient = useQueryClient()

    return api.useMutation("delete", "/api/posts/{id}", {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: GET_POSTS_QUERY_KEY })
        },
    })
}
