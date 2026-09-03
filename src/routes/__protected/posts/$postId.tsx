import { PostDetail } from '@/posts/ui/post-detail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__protected/posts/$postId')({
  component: PostDetail,
})

