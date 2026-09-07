import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle"
import { HistoryBackButton } from "./history-back-button"

export function Header() {
    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-14"
                />
                <div className="flex items-center gap-2">
                    <HistoryBackButton />
                    {/* <h1 className="text-base font-medium">Documents</h1> */}
                </div>

                <div className="ml-auto flex items-center gap-2 py-2">
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}
