import { Posts } from '@/posts/ui/posts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__protected/posts/')({
  component: Posts,
})

