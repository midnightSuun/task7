import { api } from "@/api/client"

export const useCreateConversation = () => {
    return api.useMutation("post", "/api/conversations")
}