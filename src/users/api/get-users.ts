import { api } from "@/api/client"
import { useCursorInfiniteQuery } from "@/hooks/use-cursor-infinite-query"

const USERS_PAGE_SIZE = 10

export const GET_USERS_QUERY_KEY = api.queryOptions("get", "/api/users", {
  params: {
    query: {
      limit: USERS_PAGE_SIZE,
    },
  },
}).queryKey

export const useUsers = () =>
  useCursorInfiniteQuery({
    path: "/api/users",
    queryKey: GET_USERS_QUERY_KEY,
    pageSize: USERS_PAGE_SIZE,
  })
