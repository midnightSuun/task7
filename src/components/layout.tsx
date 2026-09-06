import type { PropsWithChildren } from "react"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { AppSidebar } from "./app-sidebar"
import { Header } from "./header"

export function Layout({ children }: PropsWithChildren) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <main className="p-4 flex flex-col gap-4">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
