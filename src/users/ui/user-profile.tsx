import { getRouteApi, useRouter } from "@tanstack/react-router"
import { useUser } from "../api/get-user"
import { Button } from "@/components/ui/button"

const route = getRouteApi("/__protected/users/$userId")

export const UserProfile = () => {
    const { userId } = route.useParams()
    const { data: user } = useUser(userId)
    const router = useRouter()

    const handleBack = () => {
        router.history.back()
    }

    return (
        <div>
            <Button onClick={handleBack}>Back</Button>  
            <h1>{user.displayName}</h1>
            {/* @ts-expect-error user.avatar is not defined */}
            <img src={user.avatar} alt={user.displayName} className="w-10 h-10 rounded-full" />
            
        </div>
    )
}