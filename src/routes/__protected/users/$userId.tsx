import { UserProfile } from '@/users/ui/user-profile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__protected/users/$userId')({
  component: UserProfile,
})
