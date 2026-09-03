import { api } from "@/api/client"

export const GET_POSTS_QUERY_KEY = api.queryOptions(
    "get",
    "/api/posts",
).queryKey

export const usePosts = () => api.useSuspenseQuery("get", "/api/posts")