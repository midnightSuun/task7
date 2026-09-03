import { api } from "@/api/client"

export const useUser = (userId: string) => api.useSuspenseQuery("get", "/api/users/{id}", {
    params: {
        path: {
            id: userId,
        },
    },
})