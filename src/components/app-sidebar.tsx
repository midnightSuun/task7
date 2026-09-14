import { Link, useMatchRoute } from "@tanstack/react-router"
import { MessageSquareIcon, NewspaperIcon, UsersIcon } from "lucide-react"

import { NavUser } from "@/auth/components/user-nav"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"

const sidebarItems = [
    {
        label: "Posts",
        icon: NewspaperIcon,
        to: "/posts",
    },
    {
        label: "Users",
        icon: UsersIcon,
        to: "/users",
    },
    {
        label: "Chats",
        icon: MessageSquareIcon,
        to: "/chats",
    },
] as const

export function AppSidebar() {
    const matchRoute = useMatchRoute()

    return (
        <Sidebar variant="inset">
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarItems.map((item) => {
                                const Icon = item.icon
                                const isActive =
                                    !!matchRoute({ to: item.to, fuzzy: true }) ||
                                    (item.to === "/posts" && !!matchRoute({ to: "/" }))

                                return (
                                    <SidebarMenuItem key={item.to}>
                                        <SidebarMenuButton
                                            isActive={isActive}
                                            tooltip={item.label}
                                            render={<Link to={item.to} />}
                                            className="h-10"
                                        >
                                            <Icon />
                                            <span>{item.label}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarSeparator />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
