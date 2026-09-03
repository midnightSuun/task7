import { UsersList } from '@/users'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__protected/users/')({
  component: UsersList,
})
