import { api } from "@/api/client"

export const GET_USER_QUERY_KEY = (userId: string) =>
    api.queryOptions("get", "/api/users/{id}", {
        params: {
            path: {
                id: userId,
            },
        },
    }).queryKey

export const useUser = (userId: string) =>
    api.useSuspenseQuery("get", "/api/users/{id}", {
        params: {
            path: {
                id: userId,
            },
        },
    })
