import { api } from "@/api/client"

export const GET_ME_QUERY_KEY = api.queryOptions(
    "get",
    "/api/users/me",
).queryKey

export const useMe = () => api.useSuspenseQuery("get", "/api/users/me")
