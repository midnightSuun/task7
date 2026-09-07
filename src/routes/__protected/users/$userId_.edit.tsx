import { UserProfileEdit } from '@/users/ui/user-profile-edit'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__protected/users/$userId_/edit')({
  component: UserProfileEdit,
})