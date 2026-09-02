import { z } from "zod"

const requiredString = z.string().min(1)

const envSchema = z.object({
    VITE_FIREBASE_API_KEY: requiredString,
    VITE_FIREBASE_AUTH_DOMAIN: requiredString,
    VITE_FIREBASE_PROJECT_ID: requiredString,
    VITE_FIREBASE_STORAGE_BUCKET: requiredString,
    VITE_FIREBASE_MESSAGING_SENDER_ID: requiredString,
    VITE_FIREBASE_APP_ID: requiredString,

    VITE_API_URL: requiredString,
})

const parsedEnv = envSchema.safeParse(import.meta.env)

if (!parsedEnv.success) {
    const details = parsedEnv.error.issues
        .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
        .join(" ")
    throw new Error(`Invalid environment variables: ${details}`)
}

export const env = parsedEnv.data
