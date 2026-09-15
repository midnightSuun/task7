import { initializeApp } from "firebase/app"
import { getAuth, getRedirectResult } from "firebase/auth"

import { env } from "@/env"

const getAuthDomain = () => {
    if (typeof window === "undefined") {
        return env.VITE_FIREBASE_AUTH_DOMAIN
    }

    const { hostname } = window.location

    if (hostname === "localhost" || hostname === "127.0.0.1") {
        return env.VITE_FIREBASE_AUTH_DOMAIN
    }

    return hostname
}

const firebaseConfig = {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: getAuthDomain(),
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)

void getRedirectResult(firebaseAuth)
