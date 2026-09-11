import { format } from "date-fns"

import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { cn } from "@/lib/utils"
import type { Message } from "@/types"

type Props = {
    message: Message
    isOwn: boolean
}

export const ChatMessage = ({ message, isOwn }: Props) => (
    <Bubble align={isOwn ? "end" : "start"} variant={isOwn ? "default" : "muted"}>
        <BubbleContent className="whitespace-pre-wrap">{message.body}</BubbleContent>
        <time
            dateTime={message.createdAt}
            className={cn(
                "px-1.5 text-[11px] tabular-nums text-muted-foreground",
                isOwn && "self-end",
            )}
        >
            {format(message.createdAt, "HH:mm")}
        </time>
    </Bubble>
)
