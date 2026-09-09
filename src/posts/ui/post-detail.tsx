import { getRouteApi, Link } from "@tanstack/react-router"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { UserAvatar } from "@/users/ui/user-avatar"
import { format } from "date-fns"

import { usePost } from "../api/get-post"
import { PostLikes } from "./post-likes"

const route = getRouteApi("/__protected/posts/$postId")

export const PostDetail = () => {
    const { postId } = route.useParams()
    const { data: post } = usePost(postId)

    return (
        <article className="mx-auto w-full max-w-2xl">
            <Card>
                <CardHeader className="border-b">
                    <Link to="/users/$userId" params={{ userId: post.authorId }}>
                        <div className="flex items-center gap-3">
                            <UserAvatar
                                displayName={post.author.displayName}
                                avatar={post.author.avatar}
                                className="h-11 w-11"
                            />
                            <div className="min-w-0">
                                <p className="truncate font-medium leading-tight">
                                    {post.author.displayName}
                                </p>
                                <time
                                    dateTime={post.createdAt}
                                    className="text-sm text-muted-foreground"
                                >
                                    {format(post.createdAt, "MMM d, yyyy, HH:mm")}
                                </time>
                            </div>
                        </div>
                    </Link>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                    <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance">
                        {post.title}
                    </h1>
                    <p className="whitespace-pre-wrap text-base leading-relaxed text-foreground/90">
                        {post.content}
                    </p>
                </CardContent>
                <CardFooter className="border-t">
                    <PostLikes postId={post.id} likes={post.likes} authorId={post.authorId} />
                </CardFooter>
            </Card>
        </article>
    )
}
