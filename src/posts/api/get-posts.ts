import { api } from "@/api/client"
import { useCursorInfiniteQuery } from "@/hooks/use-cursor-infinite-query"

export const GET_POSTS_QUERY_KEY = api.queryOptions(
  "get",
  "/api/posts",
).queryKey

const POSTS_PAGE_SIZE = 10

export const usePosts = () =>
  useCursorInfiniteQuery({
    path: "/api/posts",
    queryKey: GET_POSTS_QUERY_KEY,
    pageSize: POSTS_PAGE_SIZE,
  })
