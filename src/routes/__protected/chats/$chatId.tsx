import { createFileRoute } from '@tanstack/react-router'
import { ChatDetails } from '@/chats/ui/chat-details'

export const Route = createFileRoute('/__protected/chats/$chatId')({
  component: ChatDetails,
})
