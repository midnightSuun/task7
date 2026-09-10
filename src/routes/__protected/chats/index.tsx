import { createFileRoute } from '@tanstack/react-router'
import { ChatsPage } from '@/chats/ui/chats-page'

export const Route = createFileRoute('/__protected/chats/')({
  component: ChatsPage,
})

