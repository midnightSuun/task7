import { Link } from "@tanstack/react-router"
import { format, isThisYear, isToday, isYesterday } from "date-fns"

import { Card, CardContent } from "@/components/ui/card"
import type { Conversation } from "@/types"
import { UserAvatar } from "@/users/ui/user-avatar"

type Props = {
    conversation: Conversation
}

const formatLastMessageAt = (date: string) => {
    const parsed = new Date(date)

    if (isToday(parsed)) 
        return format(parsed, "HH:mm")
    if (isYesterday(parsed)) 
        return "Yesterday"
    if (isThisYear(parsed)) 
        return format(parsed, "MMM d")

    return format(parsed, "MMM d, yyyy")
}

export const ChatCard = ({ conversation }: Props) => {
    const participant = conversation.participants[0]
    const lastMessageAt = conversation.lastMessage?.createdAt ?? conversation.lastMessageAt

    if (!participant) return null

    return (
        <Link
            to="/chats/$chatId"
            params={{ chatId: conversation.id }}
            className="block rounded-2xl outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
        >
            <Card>
                <CardContent className="flex items-center gap-4">
                    <UserAvatar
                        displayName={participant.displayName}
                        avatar={participant.avatar}
                        className="h-12 w-12"
                    />
                    <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                            <p className="truncate font-medium">{participant.displayName}</p>
                            {lastMessageAt && (
                                <time dateTime={lastMessageAt} className="shrink-0 text-xs tabular-nums text-muted-foreground">
                                    {formatLastMessageAt(lastMessageAt)}
                                </time>
                            )}
                        </div>
                        <p className="truncate text-sm text-muted-foreground">
                            {conversation.lastMessage?.body ?? "No messages yet"}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
