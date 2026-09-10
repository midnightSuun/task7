import { api } from "@/api/client"
import { useCursorInfiniteQuery } from "@/hooks/use-cursor-infinite-query"

export const GET_CONVERSATIONS_QUERY_KEY = api.queryOptions(
    "get",
    "/api/conversations",
).queryKey

const CONVERSATIONS_PAGE_SIZE = 20

export const useGetConversations = () => 
    useCursorInfiniteQuery({
        path: "/api/conversations",
        queryKey: GET_CONVERSATIONS_QUERY_KEY,
        pageSize: CONVERSATIONS_PAGE_SIZE,
    })