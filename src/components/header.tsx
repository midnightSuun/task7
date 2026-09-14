import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle"
import { HistoryBackButton } from "./history-back-button"

export function Header() {
    return (
        <header className="flex h-14 shrink-0 items-center gap-2 border-b">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-6"
                />
                <div className="flex items-center gap-2">
                    <HistoryBackButton />
                </div>

                <div className="ml-auto flex items-center gap-2 py-2">
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}
