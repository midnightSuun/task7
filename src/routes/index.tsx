import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { api } from '@/api/client'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = api.useQuery(
    "get",
    "/api/users"
  )

  console.log(data)

  return <div>
    <Button>Hello</Button>
  </div>
}
