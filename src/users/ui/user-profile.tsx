import { getRouteApi } from "@tanstack/react-router"
import { useUser } from "../api/get-user"
import { UserAvatar } from "./user-avatar"

const route = getRouteApi("/__protected/users/$userId")

export const UserProfile = () => {
    const { userId } = route.useParams()
    const { data: user } = useUser(userId)

    return (
        <div>
            <h1>{user.displayName}</h1>
            <UserAvatar displayName={user.displayName} avatar={user.avatar} />
        </div>
    )
}
