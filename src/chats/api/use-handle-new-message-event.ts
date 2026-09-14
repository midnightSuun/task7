import { useQueryClient } from "@tanstack/react-query"
import { z } from "zod"
import { GET_MESSAGES_QUERY_KEY } from "./get-messages"

const newMessageEventSchema = z.object({
    type: z.literal('NEW_MESSAGE'),
    payload: z.object({
        id: z.string(),
        conversationId: z.string(),
        senderId: z.string(),
        body: z.string(),
        createdAt: z.string(),
    }),
})

const GET_CONVERSATIONS_QUERY_KEY = ['conversations']

export const useHandleNewMessageEvent = () => {
    const queryClient = useQueryClient()

    return (message: unknown) => {
        const event = newMessageEventSchema.safeParse(JSON.parse(message as string))
        if (!event.success) return

        const payload = event.data.payload

        queryClient.invalidateQueries({
            queryKey: GET_MESSAGES_QUERY_KEY(payload.conversationId),
        })
        queryClient.invalidateQueries({
            queryKey: GET_CONVERSATIONS_QUERY_KEY,
        })

    }
}
