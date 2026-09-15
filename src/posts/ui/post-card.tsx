import { format, isThisYear, isToday, isYesterday } from "date-fns"
import { Link } from "@tanstack/react-router"

import { Card, CardContent } from "@/components/ui/card"
import type { Post } from "@/types"
import { UserAvatar } from "@/users/ui/user-avatar"

import { PostLikes } from "./post-likes"

type Props = {
    post: Post
}

const formatPostDate = (date: string) => {
    const parsed = new Date(date)
    const time = format(parsed, "HH:mm")

    if (isToday(parsed)) return `Today, ${time}`
    if (isYesterday(parsed)) return `Yesterday, ${time}`
    if (isThisYear(parsed)) return format(parsed, "MMM d, HH:mm")

    return format(parsed, "MMM d, yyyy, HH:mm")
}

export const PostCard = ({ post }: Props) => (
    <Card className="transition-colors hover:bg-accent/30 hover:ring-foreground/15">
        <CardContent className="flex flex-col gap-4">
            <Link
                to="/users/$userId"
                params={{ userId: post.authorId }}
                className="flex items-center gap-3 rounded-lg outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
            >
                <UserAvatar
                    displayName={post.author.displayName}
                    avatar={post.author.avatar}
                    className="size-10"
                />
                <div className="min-w-0 flex-1">
                    <p className="truncate font-medium leading-tight">
                        {post.author.displayName}
                    </p>
                    <time dateTime={post.createdAt} className="text-xs text-muted-foreground">
                        {formatPostDate(post.createdAt)}
                    </time>
                </div>
            </Link>
            <Link
                to="/posts/$postId"
                params={{ postId: post.id }}
                className="block space-y-1.5 rounded-lg outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
            >
                {post.title ? (
                    <p className="font-heading text-base font-semibold tracking-tight">
                        {post.title}
                    </p>
                ) : null}
                <p className="line-clamp-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                    {post.content}
                </p>
            </Link>
            <div className="border-t border-border/70 pt-1">
                <PostLikes postId={post.id} authorId={post.authorId} likes={post.likes}/>
            </div>
        </CardContent>
    </Card>
)
