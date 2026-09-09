import { Link } from "@tanstack/react-router"

import { Card, CardContent } from "@/components/ui/card"
import type { Post } from "@/types"

import { PostLikes } from "./post-likes"
import { UserAvatar } from "@/users/ui/user-avatar"

type Props = {
    post: Post
}

export const PostCard = ({ post }: Props) => (
    <Card>
        <CardContent className="flex flex-col gap-3">
            <Link to="/users/$userId" params={{ userId: post.authorId }}>
                <div className="flex items-center gap-2">
                    <UserAvatar displayName={post.author.displayName} avatar={post.author.avatar} />
                    <p>{post.author.displayName}</p>
                </div>
            </Link>
            <Link
                to="/posts/$postId"
                params={{ postId: post.id }}
                className="block rounded-lg outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
            >

                <p className="truncate font-medium">{post.title}</p>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                    {post.content}
                </p>
            </Link>
            <PostLikes postId={post.id} authorId={post.authorId} likes={post.likes} />
        </CardContent>
    </Card>
)
