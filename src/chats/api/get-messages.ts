import { api } from "@/api/client"
import { useCursorInfiniteQuery } from "@/hooks/use-cursor-infinite-query"

export const GET_MESSAGES_QUERY_KEY = (conversationId: string) =>
    api.queryOptions(
        "get",
        "/api/conversations/{conversationId}/messages",
        {
            params: {
                path: { conversationId },
            },
        }
    ).queryKey

const MESSAGES_PAGE_SIZE = 10

export const useGetMessages = (conversationId: string) =>
    useCursorInfiniteQuery({
        path: "/api/conversations/{conversationId}/messages",
        queryKey: GET_MESSAGES_QUERY_KEY(conversationId),
        pageSize: MESSAGES_PAGE_SIZE,
        query: { conversationId },
    })