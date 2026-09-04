import { Link } from "@tanstack/react-router"

import { useUsers } from "../api/get-users"
import { Button } from "@/components/ui/button"
import { useRouter } from "@tanstack/react-router"

export const UsersList = () => {
    const { data: users } = useUsers()
    const router = useRouter()

    const handleBack = () => {
        router.history.back()
    }

    return (
        <>
            <Button onClick={handleBack}>Back</Button>
            {users.data.map((user) => (
                <Link to={"/users/$userId"} params={{ userId: user.id }}>
                    {user.displayName}
                </Link>
            ))}
        </>
    )
}
