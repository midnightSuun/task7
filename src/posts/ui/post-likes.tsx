import { HeartIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Post } from "@/types"
import { UserAvatar } from "@/users/ui/user-avatar"

import { useToggleLike } from "../api/toggle-like"

type Props = {
    postId: Post["id"]
    authorId: Post["authorId"]
    likes: Post["likes"]
}

const MAX_VISIBLE_LIKERS = 3

export const PostLikes = ({ postId, authorId, likes }: Props) => {
    const { mutate: toggleLike, isPending } = useToggleLike()
    const { likedByMe, count, users } = likes
    const visibleLikers = users.slice(0, MAX_VISIBLE_LIKERS)

    const handleToggleLike = () => {
        toggleLike({ postId, authorId })
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isPending}
                aria-pressed={likedByMe}
                aria-label={likedByMe ? "Unlike post" : "Like post"}
                onClick={handleToggleLike}
                className={cn(
                    "h-8 gap-1.5 rounded-full px-2.5 text-muted-foreground",
                    likedByMe &&
                        "bg-rose-500/10 text-rose-500 hover:bg-rose-500/15 hover:text-rose-500",
                    !likedByMe && "hover:bg-rose-500/10 hover:text-rose-500",
                )}
            >
                <HeartIcon
                    className={cn(
                        "size-4 transition-transform duration-200 group-hover/button:scale-110",
                        likedByMe && "fill-current",
                        isPending && "animate-pulse",
                    )}
                />
                <span className="tabular-nums text-sm font-medium">
                    {count.toLocaleString()}
                </span>
            </Button>

            {visibleLikers.length > 0 && (
                <div className="flex items-center -space-x-2">
                    {visibleLikers.map((user) => (
                        <UserAvatar
                            key={user.id}
                            displayName={user.displayName}
                            avatar={user.avatar}
                            className="size-6 ring-2 ring-background"
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
