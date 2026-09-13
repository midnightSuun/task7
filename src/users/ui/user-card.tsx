import { Link } from "@tanstack/react-router"

import { useMe } from "@/auth/get-me"
import { Card, CardContent } from "@/components/ui/card"
import type { User } from "@/types"

import { MessageUserButton } from "./message-user-button"
import { UserAvatar } from "./user-avatar"

type Props = {
    user: User
}

export const UserCard = ({ user }: Props) => {
    const { data: me } = useMe()
    const isMe = me?.id === user.id

    return (
        <Card className="transition-colors hover:bg-accent/30 hover:ring-foreground/15">
            <CardContent className="flex items-center gap-4">
                <Link
                    to="/users/$userId"
                    params={{ userId: user.id }}
                    className="flex min-w-0 flex-1 items-center gap-4 rounded-lg outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
                >
                    <UserAvatar
                        displayName={user.displayName}
                        avatar={user.avatar}
                        className="size-12"
                    />
                    <div className="min-w-0">
                        <p className="truncate font-medium">{user.displayName}</p>
                    </div>
                </Link>
                {!isMe && <MessageUserButton userId={user.id} />}
            </CardContent>
        </Card>
    )
}
