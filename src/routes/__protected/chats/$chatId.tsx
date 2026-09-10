import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__protected/chats/$chatId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/__protected/chats/$chatId"!</div>
}
