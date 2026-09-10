import { UserAvatar } from "@/users/ui/user-avatar"
import { Link } from "@tanstack/react-router"
import { useGetConversations } from "../api/get-conversations"

export const ChatsList = () => {
    const { data: conversationsData } = useGetConversations()
    const conversations = conversationsData?.pages.flatMap((page) => page.data) ?? []

    return (
        <div className="grid gap-4">
            {conversations.map(item => (
                <div key={item.id}>
                    <Link to={"/chats/$chatId"} params={{ chatId: item.id }}>
                        <UserAvatar displayName={item.participants[0].displayName} avatar={item.participants[0].avatar} />
                        <p>{item.participants[0].displayName}</p>
                        <p>{item.lastMessage?.body}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}