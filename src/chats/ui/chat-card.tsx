import { Link } from "@tanstack/react-router"

import { Card, CardContent } from "@/components/ui/card"
import type { Conversation } from "@/types"
import { UserAvatar } from "@/users/ui/user-avatar"

type Props = {
    conversation: Conversation
}

export const ChatCard = ({ conversation }: Props) => {
    const participant = conversation.participants[0]

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
                    <div className="min-w-0">
                        <p className="truncate font-medium">{participant.displayName}</p>
                        <p className="truncate text-sm text-muted-foreground">
                            {conversation.lastMessage?.body ?? "No messages yet"}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
