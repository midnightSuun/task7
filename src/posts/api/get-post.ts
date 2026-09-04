import { api } from "@/api/client"

export const usePost = (postid: string) =>
    api.useSuspenseQuery("get", "/api/posts/{id}", {
        params: {
            path: {
                id: postid,
            },
        },
    })
