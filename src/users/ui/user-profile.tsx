import { getRouteApi, Link } from "@tanstack/react-router"
import { PencilIcon } from "lucide-react"

import { useMe } from "@/auth/get-me"
import { Button } from "@/components/ui/button"

import { useUser } from "../api/get-user"
import { UserAvatar } from "./user-avatar"
import { UserProfileCard } from "./user-profile-card"

const route = getRouteApi("/__protected/users/$userId")

export const UserProfile = () => {
  const { userId } = route.useParams()
  const { data: user } = useUser(userId)
  const { data: me } = useMe()

  const isMe = me?.id === user.id

  return (
    <div className="grid gap-6">
      <div>
        <h1>{user.displayName}</h1>
        <UserAvatar
          displayName={user.displayName}
          avatar={user.avatar}
          className="h-40 w-40"
        />

        {isMe && (
          <Button variant="outline" render={<Link to="/" />}>
            <PencilIcon className="h-4 w-4" />
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <UserProfileCard label="Followers" value={user.followersCount} />
        <UserProfileCard label="Posts" value={user.postsCount} />
        <UserProfileCard label="Likes" value={user.likesCount} />
      </div>
    </div>
  )
}
