import { api } from "@/api/client"
import { useQueryClient } from "@tanstack/react-query"
import { GET_MESSAGES_QUERY_KEY } from "./get-messages"
import { getRouteApi } from "@tanstack/react-router"

const route = getRouteApi("/__protected/chats/$chatId")

export const useSendMessage = () => {
    const queryClient = useQueryClient()
    const { chatId } = route.useParams()

    return api.useMutation("post", "/api/messages", {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: GET_MESSAGES_QUERY_KEY(chatId) })
        },
    })
}