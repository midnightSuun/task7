import { api } from "@/api/client"

export const usePosts = () => api.useSuspenseQuery("get", "/api/posts")