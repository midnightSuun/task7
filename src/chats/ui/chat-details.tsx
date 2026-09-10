import { useMe } from "@/auth/get-me"
import { Form, FormInput } from "@/components/form"
import { FormButton } from "@/components/form/form-button"
import {
    Bubble,
    BubbleContent
} from "@/components/ui/bubble"
import { Field } from "@/components/ui/field"
import { getRouteApi } from "@tanstack/react-router"
import { z } from "zod"
import { useGetMessages } from "../api/get-messages"
import { useSendMessage } from "../api/send-message"

const route = getRouteApi("/__protected/chats/$chatId")

const schema = z.object({
    message: z.string().min(1, "Message is required"),
})

type FormData = z.infer<typeof schema>

const defaultValues: FormData = {
    message: "",
}

export function ChatDetails() {
    const { chatId } = route.useParams()
    const { data: messagesData } = useGetMessages(chatId)
    const { data: currentUser } = useMe()
    const { mutateAsync: sendMessage } = useSendMessage()

    const messages = (messagesData?.pages.flatMap((page) => page.data) ?? []).reverse()

    const handleSendMessage = async (data: FormData) => {
        await sendMessage({ body: { body: data.message, conversationId: chatId } })
    }

    return (
        <div className="flex w-full max-w-sm flex-col gap-8 py-12">
            {messages.map(message => (
                <Bubble key={message.id}
                    align={message.senderId === currentUser?.id ? "end" : "start"}
                    variant={message.senderId === currentUser?.id ? "default" : "muted"}>
                    <BubbleContent>{message.body}</BubbleContent>
                </Bubble>
            ))}
            <Form
                onSubmit={handleSendMessage}
                validationSchema={schema}
                defaultValues={defaultValues}
            >
                <Field orientation="horizontal">
                    <FormInput name="message" placeholder="Type your message..." type="text" />
                    <FormButton>Send</FormButton>
                </Field>
            </Form>
        </div >
    )
}
