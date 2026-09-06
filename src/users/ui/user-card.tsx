import { Link } from "@tanstack/react-router"

import { Card, CardContent } from "@/components/ui/card"
import type { User } from "@/types"

import { UserAvatar } from "./user-avatar"

type Props = {
    user: User
}

export const UserCard = ({ user }: Props) => (
    <Link
        to="/users/$userId"
        params={{ userId: user.id }}
        className="block rounded-2xl outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
    >
        <Card>
            <CardContent className="flex items-center gap-4">
                <UserAvatar
                    displayName={user.displayName}
                    avatar={user.avatar}
                    className="h-12 w-12"
                />
                <div className="min-w-0">
                    <p className="truncate font-medium">{user.displayName}</p>
                    {user.primaryEmail && (
                        <p className="truncate text-sm text-muted-foreground">
                            {user.primaryEmail}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    </Link>
)
