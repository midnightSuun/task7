import { Link } from "@tanstack/react-router"
import { useUsers } from "../api/get-users"

export const UsersList = () => {
    const { data: users } = useUsers()

    return <>
        {users.data.map((user) => (
            <Link to={'/users/$userId'} params={{ userId: user.id }}>
                {user.displayName}
            </Link>
        ))}
    </>
}