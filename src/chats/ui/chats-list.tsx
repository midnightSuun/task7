import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

import { useGetConversations } from "../api/get-conversations"
import { ChatCard } from "./chat-card"

export const ChatsList = () => {
    const {
        data: conversationsData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetConversations()

    const loadMoreRef = useIntersectionObserver({
        enabled: Boolean(hasNextPage) && !isFetchingNextPage,
        onIntersect: fetchNextPage,
        rootMargin: "200px",
    })

    const conversations = conversationsData?.pages.flatMap((page) => page.data) ?? []

    return (
        <div className="grid gap-4">
            {conversations.map((conversation) => (
                <ChatCard key={conversation.id} conversation={conversation} />
            ))}
            <div ref={loadMoreRef} />
        </div>
    )
}
