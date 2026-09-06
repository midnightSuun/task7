import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from "@/auth/components/user-nav"
import { Link, useMatchRoute } from "@tanstack/react-router"
import { FileIcon, UserIcon } from "lucide-react"

const sidebarItems = [
    {
        label: "Users",
        icon: <UserIcon />,
        to: "/users",
    },
    {
        label: "Posts",
        icon: <FileIcon />,
        to: "/posts",
    },
] as const

export function AppSidebar() {
    const matchRoute = useMatchRoute()

    return (
        <Sidebar variant="inset">
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {sidebarItems.map((item) => (
                            <SidebarMenuItem key={item.to}>
                                <SidebarMenuButton
                                    isActive={!!matchRoute({ to: item.to, fuzzy: true })}
                                    render={<Link to={item.to} />}
                                >
                                    {item.icon}
                                    {item.label}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
