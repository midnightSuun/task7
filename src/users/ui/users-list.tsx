import { UsersIcon } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

import { useUsers } from "../api/get-users"
import { UserCard } from "./user-card"

export const UsersList = () => {
    const {
        data: usersData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
    } = useUsers()

    const loadMoreRef = useIntersectionObserver({
        enabled: Boolean(hasNextPage) && !isFetchingNextPage,
        onIntersect: fetchNextPage,
        rootMargin: "200px",
        skipFirstIntersect: (usersData?.pages.length ?? 0) > 1,
    })

    const users = usersData?.pages.flatMap((page) => page.data) ?? []

    if (isPending) {
        return (
            <div className="grid gap-3">
                {Array.from({ length: 5 }, (_, index) => (
                    <Skeleton key={index} className="h-20 w-full rounded-2xl" />
                ))}
            </div>
        )
    }

    if (users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-card px-6 py-16 text-center ring-1 ring-foreground/10">
                <UsersIcon className="size-8 text-muted-foreground" aria-hidden />
                <p className="font-medium">No people yet</p>
                <p className="text-sm text-muted-foreground">
                    Nothing to show here yet.
                </p>
            </div>
        )
    }

    return (
        <div className="grid gap-3">
            {users.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
            {isFetchingNextPage && (
                <p className="py-2 text-center text-sm text-muted-foreground">
                    Loading more…
                </p>
            )}
            <div ref={loadMoreRef} />
        </div>
    )
}
