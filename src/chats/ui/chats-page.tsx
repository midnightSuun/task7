import { ChatsList } from "./chats-list"

export const ChatsPage = () => {
    return (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
            <header className="space-y-1">
                <h1 className="font-heading text-2xl font-semibold tracking-tight">
                    Messages
                </h1>
                <p className="text-sm text-muted-foreground">
                    Your direct messages
                </p>
            </header>
            <ChatsList />
        </div>
    )
}
