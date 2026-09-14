import { onIdTokenChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { firebaseAuth } from "./firebase"

export const useFirebaseToken = () => {
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(firebaseAuth, async (user) => {
            if (!user) {
                setToken(null)
                return
            }

            const newToken = await user.getIdToken()
            setToken(newToken)
        })

        return unsubscribe
    }, [])

    return token
}