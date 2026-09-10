import { api } from "@/api/client"
import { useQueryClient } from "@tanstack/react-query"
import { GET_MESSAGES_QUERY_KEY } from "./get-messages"

export const useSendMessage = () => {
    const queryClient = useQueryClient()

    api.useMutation("post", "/api/messages")
}