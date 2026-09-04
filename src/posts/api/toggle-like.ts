import { useQueryClient } from "@tanstack/react-query"

import { api } from "@/api/client"

import { GET_POSTS_QUERY_KEY } from "./get-posts"
//import { GET_POST_QUERY_KEY } from "./get-post"

export const useToggleLike = () => {
    const queryClient = useQueryClient()

    return api.useMutation("post", "/api/posts/{id}/like", {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: GET_POSTS_QUERY_KEY })
            //queryClient.invalidateQueries({ queryKey: GET_POST_QUERY_KEY }),
        },
    })
}
