import { api } from "@/api/client"

export const GET_POST_QUERY_KEY = (postId: string) =>
    api.queryOptions("get", "/api/posts/{id}", {
        params: {
            path: {
                id: postId,
            },
        },
    }).queryKey

export const usePost = (postId: string) =>
    api.useSuspenseQuery("get", "/api/posts/{id}", {
        params: {
            path: {
                id: postId,
            },
        },
    })
