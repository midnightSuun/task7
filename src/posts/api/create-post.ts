import { api } from "@/api/client"

export const useCreatePost = () => api.useMutation("post", "/api/posts")
