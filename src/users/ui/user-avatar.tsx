import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { User } from "@/types"

type Props = {
    displayName: User["displayName"]
    avatar: User["avatar"]
    className?: string
}

export const UserAvatar = ({ displayName, avatar, className }: Props) => (
    <Avatar className={cn("h-8 w-8 rounded-full", className)}>
        {avatar ? <AvatarImage src={avatar} alt={displayName} /> : null}
        <AvatarFallback className="rounded-full">{displayName?.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
)