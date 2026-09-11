import { useEffect, useRef } from "react"
import { getRouteApi, Link } from "@tanstack/react-router"
import { format, isSameDay, isThisYear, isToday, isYesterday } from "date-fns"
import { SendHorizontalIcon } from "lucide-react"
import { z } from "zod"

import { useMe } from "@/auth/get-me"
import { Form, FormInput } from "@/components/form"
import { FormButton } from "@/components/form/form-button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Field } from "@/components/ui/field"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { UserAvatar } from "@/users/ui/user-avatar"

import { useGetConversations } from "../api/get-conversations"
import { useGetMessages } from "../api/get-messages"
import { useSendMessage } from "../api/send-message"
import { ChatMessage } from "./chat-message"

const route = getRouteApi("/__protected/chats/$chatId")

const schema = z.object({
    message: z.string().min(1, "Message is required"),
})

type FormData = z.infer<typeof schema>

const defaultValues: FormData = {
    message: "",
}

const formatDayLabel = (date: string) => {
    const parsed = new Date(date)

    if (isToday(parsed)) return "Today"
    if (isYesterday(parsed)) return "Yesterday"
    if (isThisYear(parsed)) return format(parsed, "MMMM d")

    return format(parsed, "MMMM d, yyyy")
}

export const ChatDetails = () => {
    const { chatId } = route.useParams()
    const {
        data: messagesData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetMessages(chatId)
    const { data: conversationsData } = useGetConversations()
    const { data: currentUser } = useMe()
    const { mutateAsync: sendMessage } = useSendMessage()

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const lastNewestIdRef = useRef<string | undefined>(undefined)

    const loadMoreRef = useIntersectionObserver({
        enabled: Boolean(hasNextPage) && !isFetchingNextPage,
        onIntersect: fetchNextPage,
        rootMargin: "200px",
    })

    const conversation = conversationsData?.pages
        .flatMap((page) => page.data)
        .find((item) => item.id === chatId)
    const participant = conversation?.participants[0]

    const messages = (messagesData?.pages.flatMap((page) => page.data) ?? []).toReversed()

    useEffect(() => {
        lastNewestIdRef.current = undefined
    }, [chatId])

    useEffect(() => {
        const newestId = messages.at(-1)?.id

        if (!newestId || newestId === lastNewestIdRef.current) return

        lastNewestIdRef.current = newestId
        messagesEndRef.current?.scrollIntoView()
    }, [messages])

    const handleSendMessage = async (data: FormData) => {
        await sendMessage({ body: { body: data.message, conversationId: chatId } })
    }

    return (
        <article className="mx-auto flex h-[min(40rem,calc(100dvh-10rem))] w-full max-w-2xl flex-col">
            <Card className="flex h-full flex-col overflow-hidden">
                <CardHeader className="border-b">
                    {participant ? (
                        <Link
                            to="/users/$userId"
                            params={{ userId: participant.id }}
                            className="flex items-center gap-3 outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <UserAvatar
                                displayName={participant.displayName}
                                avatar={participant.avatar}
                                className="h-11 w-11"
                            />
                            <div className="min-w-0">
                                <p className="truncate font-medium leading-tight">
                                    {participant.displayName}
                                </p>
                                <p className="text-sm text-muted-foreground">Direct message</p>
                            </div>
                        </Link>
                    ) : (
                        <p className="font-medium">Conversation</p>
                    )}
                </CardHeader>
                <CardContent className="flex min-h-0 flex-1 flex-col px-0">
                    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-(--card-spacing)">
                        <div ref={loadMoreRef} />
                        {messages.length === 0 && (
                            <div className="flex flex-1 items-center justify-center py-12">
                                <p className="text-sm text-muted-foreground">
                                    No messages yet. Say hello.
                                </p>
                            </div>
                        )}
                        {messages.map((message, index) => {
                            const previousMessage = messages[index - 1]
                            const showDayLabel =
                                !previousMessage ||
                                !isSameDay(previousMessage.createdAt, message.createdAt)

                            return (
                                <div key={message.id} className="flex flex-col gap-3">
                                    {showDayLabel && (
                                        <p className="py-1 text-center text-xs font-medium text-muted-foreground">
                                            {formatDayLabel(message.createdAt)}
                                        </p>
                                    )}
                                    <ChatMessage
                                        message={message}
                                        isOwn={message.senderId === currentUser?.id}
                                    />
                                </div>
                            )
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                </CardContent>
                <CardFooter className="border-t">
                    <Form
                        onSubmit={handleSendMessage}
                        validationSchema={schema}
                        defaultValues={defaultValues}
                        className="w-full"
                    >
                        <Field orientation="horizontal" className="items-start">
                            <div className="min-w-0 flex-1">
                                <FormInput
                                    name="message"
                                    placeholder="Type your message..."
                                    type="text"
                                    autoComplete="off"
                                />
                            </div>
                            <FormButton>
                                <SendHorizontalIcon />
                                Send
                            </FormButton>
                        </Field>
                    </Form>
                </CardFooter>
            </Card>
        </article>
    )
}
