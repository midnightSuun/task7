import { onAuthStateChanged, type User } from "firebase/auth"
import type { Middleware } from "openapi-fetch"
import createFetchClient from "openapi-fetch"
import createClient from "openapi-react-query"

import { firebaseAuth } from "@/auth/firebase"
import { env } from "@/env.ts"

import type { paths } from "./schema.d.ts"

let authReadyPromise: Promise<User | null> | null = null

const waitForAuthReady = (): Promise<User | null> => {
    if (authReadyPromise) {
        return authReadyPromise
    }

    if (firebaseAuth.currentUser) {
        return Promise.resolve(firebaseAuth.currentUser)
    }

    authReadyPromise = new Promise<User | null>((resolve) => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            unsubscribe()
            authReadyPromise = null

            resolve(user)
        })
    })

    return authReadyPromise
}

const authMiddleware: Middleware = {
    async onRequest({ request }) {
        let user = firebaseAuth.currentUser

        if (!user) {
            user = await waitForAuthReady()
        }

        if (!user) {
            return request
        }

        const token = await user.getIdToken()
        request.headers.set("Authorization", `Bearer ${token}`)
        return request
    },
}

const fetchClient = createFetchClient<paths>({
    baseUrl: env.VITE_API_URL,
})

fetchClient.use(authMiddleware)

export const api = createClient(fetchClient)
