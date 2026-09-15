import { useQueryClient } from "@tanstack/react-query"
import { FirebaseError } from "firebase/app"
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
} from "firebase/auth"

import { firebaseAuth } from "./firebase"
import { GET_ME_QUERY_KEY } from "./get-me"

const googleProvider = new GoogleAuthProvider()

const isPopupBlockedError = (error: unknown) =>
    error instanceof FirebaseError && error.code === "auth/popup-blocked"

const isPopupClosedError = (error: unknown) =>
    error instanceof FirebaseError &&
    error.code === "auth/popup-closed-by-user"

export const useSignInWithGoogle = () => {
    const queryClient = useQueryClient()

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(firebaseAuth, googleProvider)

            await queryClient.invalidateQueries({
                queryKey: GET_ME_QUERY_KEY,
            })

            return result.user
        } catch (error) {
            if (isPopupClosedError(error)) {
                return
            }

            if (isPopupBlockedError(error)) {
                await signInWithRedirect(firebaseAuth, googleProvider)
                return
            }

            throw error
        }
    }

    return { signInWithGoogle }
}
