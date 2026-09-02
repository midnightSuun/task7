import createFetchClient from "openapi-fetch"
import createClient from "openapi-react-query"
import type { paths } from "./schema.d.ts"

const fetchClient = createFetchClient<paths>({
  baseUrl: "http://138.68.186.204:3000",
})

export const api = createClient(fetchClient)