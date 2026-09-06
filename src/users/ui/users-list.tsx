import { useUsers } from "../api/get-users"
import { UserCard } from "./user-card"

export const UsersList = () => {
    const { data: users } = useUsers()

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {users.data.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    )
}
