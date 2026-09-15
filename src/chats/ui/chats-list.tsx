import { MessageSquareIcon } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

import { useGetConversations } from "../api/get-conversations"
import { ChatCard } from "./chat-card"

export const ChatsList = () => {
    const {
        data: conversationsData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
    } = useGetConversations()

    const loadMoreRef = useIntersectionObserver({
        enabled: Boolean(hasNextPage) && !isFetchingNextPage,
        onIntersect: fetchNextPage,
        rootMargin: "200px",
        skipFirstIntersect: (conversationsData?.pages.length ?? 0) > 1,
    })

    const conversations =
        conversationsData?.pages.flatMap((page) => page.data) ?? []

    if (isPending) {
        return (
            <div className="grid gap-3">
                {Array.from({ length: 5 }, (_, index) => (
                    <Skeleton key={index} className="h-20 w-full rounded-2xl" />
                ))}
            </div>
        )
    }

    if (conversations.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-card px-6 py-16 text-center ring-1 ring-foreground/10">
                <MessageSquareIcon
                    className="size-8 text-muted-foreground"
                    aria-hidden
                />
                <p className="font-medium">No chats yet</p>
                <p className="text-sm text-muted-foreground">
                    Start a conversation from someone's profile.
                </p>
            </div>
        )
    }

    return (
        <div className="grid gap-3">
            {conversations.map((conversation) => (
                <ChatCard key={conversation.id} conversation={conversation} />
            ))}
            {isFetchingNextPage && (
                <p className="py-2 text-center text-sm text-muted-foreground">
                    Loading more…
                </p>
            )}
            <div ref={loadMoreRef} />
        </div>
    )
}
