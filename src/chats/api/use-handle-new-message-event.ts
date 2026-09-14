import { type InfiniteData, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"

import type { Message } from "@/types"

import { GET_MESSAGES_QUERY_KEY } from "./get-messages"

const newMessageEventSchema = z.object({
    type: z.literal("NEW_MESSAGE"),
    payload: z.object({
        id: z.string(),
        conversationId: z.string(),
        senderId: z.string(),
        body: z.string(),
        createdAt: z.string(),
    }),
})

type MessagesPage = {
    data: Message[]
    meta: { hasMore: boolean; nextCursor?: string | null }
}

export const useHandleNewMessageEvent = () => {
    const queryClient = useQueryClient()

    return (message: unknown) => {
        const event = newMessageEventSchema.safeParse(JSON.parse(message as string))
        if (!event.success) return

        const payload = event.data.payload

        queryClient.setQueryData<InfiniteData<MessagesPage>>(
            GET_MESSAGES_QUERY_KEY(payload.conversationId),
            (current) => {
                if (!current) return current

                const isDuplicate = current.pages.some((page) =>
                    page.data.some((item) => item.id === payload.id),
                )
                if (isDuplicate) return current

                const [firstPage, ...restPages] = current.pages
                if (!firstPage) return current

                return {
                    ...current,
                    pages: [
                        { ...firstPage, data: [payload, ...firstPage.data] },
                        ...restPages,
                    ],
                }
            },
        )
    }
}
