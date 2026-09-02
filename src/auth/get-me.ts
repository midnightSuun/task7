import { api } from "@/api/client"

export const GET_ME_QUERY_KEY = api.queryOptions(
    "get",
    "/api/users/me",
).queryKey

export const useMe = () => api.useQuery("get", "/api/users/me")
