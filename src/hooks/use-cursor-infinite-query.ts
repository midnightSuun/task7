import { type QueryKey, useInfiniteQuery } from "@tanstack/react-query"

import { fetchClient } from "@/api/client"
import type { paths } from "@/api/schema"

type PathsWithGet = {
  [Path in keyof paths]: paths[Path]["get"] extends never | undefined
    ? never
    : Path
}[keyof paths]

type JsonSuccess<Path extends PathsWithGet> =
  NonNullable<paths[Path]["get"]> extends {
    responses: {
      200: {
        content: {
          "application/json": infer Response
        }
      }
    }
  }
    ? Response
    : never

type CursorPaginatedPath = {
  [Path in PathsWithGet]: JsonSuccess<Path> extends {
    meta: { hasMore: boolean; nextCursor?: string | null }
  }
    ? Path
    : never
}[PathsWithGet]

type GetQuery<Path extends CursorPaginatedPath> =
  NonNullable<paths[Path]["get"]> extends {
    parameters: { query?: infer Query }
  }
    ? Query
    : never

type ExtraQuery<Path extends CursorPaginatedPath> = Omit<
  NonNullable<GetQuery<Path>>,
  "limit" | "cursor"
>

type CursorPage<Path extends CursorPaginatedPath> = JsonSuccess<Path> & {
  meta: { hasMore: boolean; nextCursor?: string | null }
}

type UseCursorInfiniteQueryOptions<Path extends CursorPaginatedPath> = {
  path: Path
  queryKey: QueryKey
  pageSize?: number
  query?: ExtraQuery<Path>
}

const DEFAULT_PAGE_SIZE = 10

export const useCursorInfiniteQuery = <Path extends CursorPaginatedPath>({
  path,
  queryKey,
  pageSize = DEFAULT_PAGE_SIZE,
  query,
}: UseCursorInfiniteQueryOptions<Path>) =>
  useInfiniteQuery({
    queryKey: [...queryKey, path, pageSize, query],
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam, signal }) => {
      const { data, error } = await fetchClient.GET(path, {
        params: {
          query: {
            ...query,
            limit: pageSize,
            ...(pageParam ? { cursor: pageParam } : {}),
          },
        },
        signal,
      } as never)

      if (error || !data) {
        throw error
      }

      return data as CursorPage<Path>
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.meta.hasMore) {
        return undefined
      }

      return lastPage.meta.nextCursor ?? undefined
    },
  })
