import { api } from "@/api/client"
import {
    getCursorInfiniteQueryKey,
    useCursorInfiniteQuery,
} from "@/hooks/use-cursor-infinite-query"

const MESSAGES_PATH = "/api/conversations/{conversationId}/messages" as const
const MESSAGES_PAGE_SIZE = 10

const getMessagesQueryOptions = (conversationId: string) => ({
    path: MESSAGES_PATH,
    queryKey: api.queryOptions("get", MESSAGES_PATH, {
        params: {
            path: { conversationId },
        },
    }).queryKey,
    pageSize: MESSAGES_PAGE_SIZE,
    pathParams: { conversationId },
})

export const GET_MESSAGES_QUERY_KEY = (conversationId: string) =>
    getCursorInfiniteQueryKey(getMessagesQueryOptions(conversationId))

export const useGetMessages = (conversationId: string) =>
    useCursorInfiniteQuery(getMessagesQueryOptions(conversationId))