import { getRouteApi, Link, useNavigate } from "@tanstack/react-router"
import { MessageCircleIcon, PencilIcon } from "lucide-react"

import { useMe } from "@/auth/get-me"
import { Button } from "@/components/ui/button"

import { useUser } from "../api/get-user"
import { FollowButton } from "./follow-button"
import { UserAvatar } from "./user-avatar"
import { UserProfileCard } from "./user-profile-card"
import { PostsList } from "@/posts/ui/posts-list"
import { useCreateConversation } from "../api/create-conversation"

const route = getRouteApi("/__protected/users/$userId")

export const UserProfile = () => {
  const { userId } = route.useParams()
  const navigate = useNavigate()

  const { data: user } = useUser(userId)
  const { data: me } = useMe()
  const { mutateAsync: createConversation } = useCreateConversation()

  const isMe = me?.id === user.id

  const handleCreateConversation = async () => {
    const {id: conversationId} = await createConversation({
      body: {recipientId: user.id},
    })
    navigate({
      to: "/chats/$chatId",
      params: { chatId: conversationId },
    })
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col items-center gap-6">
        <h1>{user.displayName}</h1>
        <UserAvatar
          displayName={user.displayName}
          avatar={user.avatar}
          className="h-40 w-40 text-xl"
        />

        {isMe && (
          <Button variant="outline" render={<Link to="/users/$userId/edit" params={{ userId }} />}>
            <PencilIcon className="h-4 w-4" />
            Edit Profile
          </Button>
        )}
        {!isMe && (
          <div className="flex items-center gap-2">
            <FollowButton userId={userId} isFollowing={user.isFollowedByMe} />
            <Button
              variant="outline"
              onClick={() => handleCreateConversation()}
            >
              <MessageCircleIcon className="h-4 w-4" />
              Message
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <UserProfileCard label="Followers" value={user.followersCount} />
        <UserProfileCard label="Posts" value={user.postsCount} />
        <UserProfileCard label="Likes" value={user.likesCount} />
      </div>

      <div>
        <PostsList authorId={userId} />
      </div>

    </div>
  )
}
