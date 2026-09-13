import { useNavigate } from "@tanstack/react-router"
import { MessageCircleIcon } from "lucide-react"

import { useGetConversations } from "@/chats/api/get-conversations"
import { Button } from "@/components/ui/button"
import type { User } from "@/types"

import { useCreateConversation } from "../api/create-conversation"

type Props = {
    userId: User["id"]
    size?: "sm" | "default"
}

export const MessageUserButton = ({ userId, size = "sm" }: Props) => {
    const navigate = useNavigate()
    const { mutateAsync: createConversation, isPending } = useCreateConversation()
    const { data: conversationsData } = useGetConversations()

    const existingConversation = conversationsData?.pages
        .flatMap((page) => page.data)
        .find((conversation) =>
            conversation.participants.some((participant) => participant.id === userId),
        )

    const handleMessage = async () => {
        if (existingConversation) {
            navigate({
                to: "/chats/$chatId",
                params: { chatId: existingConversation.id },
            })
            return
        }

        const { id: conversationId } = await createConversation({
            body: { recipientId: userId },
        })

        navigate({
            to: "/chats/$chatId",
            params: { chatId: conversationId },
        })
    }

    return (
        <Button
            type="button"
            variant="outline"
            size={size}
            disabled={isPending}
            onClick={handleMessage}
        >
            <MessageCircleIcon className="size-4" aria-hidden />
            Message
        </Button>
    )
}
