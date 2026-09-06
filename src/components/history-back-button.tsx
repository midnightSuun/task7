import { useRouter } from "@tanstack/react-router"
import { Button } from "./ui/button"
import { ArrowLeftIcon } from "lucide-react"

export const HistoryBackButton = () => {
    const router = useRouter()

    const handleBack = () => {
        router.history.back()
    }

    return (
        <Button onClick={handleBack} variant="outline" size="icon">
            <ArrowLeftIcon className="size-4" />
        </Button>
    )
}