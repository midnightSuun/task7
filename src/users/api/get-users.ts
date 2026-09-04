import { api } from "@/api/client"

export const useUsers = () => api.useSuspenseQuery("get", "/api/users")
