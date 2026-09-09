import { useMutation, useQueryClient } from "@tanstack/react-query"

import { fetchClient } from "@/api/client"

import type { Post } from "@/types"
import { GET_USER_QUERY_KEY } from "@/users/api/get-user"
import { GET_POST_QUERY_KEY } from "./get-post"
import { GET_POSTS_QUERY_KEY } from "./get-posts"

type Args = {
    postId: Post["id"],
    authorId: Post["authorId"],
}

const mutationFn = async ({ postId }: Args) => {
    const { data } = await fetchClient.POST("/api/posts/{id}/like", {
        params: {
            path: {
                id: postId,
            }
        }
    })
    return data
}

export const useToggleLike = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn,
        onSuccess: (_, {authorId, postId}) => {
            queryClient.invalidateQueries({ queryKey: GET_POSTS_QUERY_KEY })
            queryClient.invalidateQueries({ queryKey: GET_POST_QUERY_KEY(postId) })

            queryClient.invalidateQueries({ queryKey: GET_USER_QUERY_KEY(authorId) })
        },
    })
}
