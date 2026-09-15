import { useQuery } from "@tanstack/react-query"

import { api } from "@/api/client"

const getMeQueryOptions = api.queryOptions("get", "/api/users/me", undefined, {
    staleTime: 5 * 60 * 1000,
})

export const GET_ME_QUERY_KEY = getMeQueryOptions.queryKey

export const useMe = () => useQuery(getMeQueryOptions)
