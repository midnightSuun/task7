import { useQueryClient } from "@tanstack/react-query"

import { api } from "@/api/client"

import { GET_POSTS_QUERY_KEY } from "./get-posts"

export const useCreatePost = () => {
    const queryClient = useQueryClient()

    return api.useMutation("post", "/api/posts", {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: GET_POSTS_QUERY_KEY })
        },
    })
}
