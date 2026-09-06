import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

import { useUsers } from "../api/get-users"
import { UserCard } from "./user-card"

export const UsersList = () => {
    const {
        data: usersData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useUsers()

    const loadMoreRef = useIntersectionObserver({
        enabled: Boolean(hasNextPage) && !isFetchingNextPage,
        onIntersect: fetchNextPage,
        rootMargin: "200px",
    })

    const users = usersData?.pages.flatMap((page) => page.data) ?? []

    return (
        <div className="grid gap-4">
            {users.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
            <div ref={loadMoreRef} />
        </div>
    )
}
