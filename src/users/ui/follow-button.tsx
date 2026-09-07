import { Button } from "@/components/ui/button"
import { useToggleFollow } from "../api/toggle-follow"
import type { User } from "@/types"

type Props = {
    userId: User["id"],
    isFollowing: boolean,
}

export const FollowButton = ({userId, isFollowing}: Props) => {
    const {mutateAsync: toggleFollow, isPending} = useToggleFollow()

    const handleToggleFollow = async () => {
        await toggleFollow({
            params: {
                path: {
                    id: userId,
                },
            },
        })
    }

    return (
        <Button variant="outline" onClick={handleToggleFollow} disabled={isPending}>
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    )
}