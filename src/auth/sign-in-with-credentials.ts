import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signInWithEmailAndPassword } from "firebase/auth"

import { firebaseAuth } from "./firebase"
import { GET_ME_QUERY_KEY } from "./get-me"

type Params = {
    email: string
    password: string
}

const mutationFn = async ({ email, password }: Params) => {
    const credential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
    )

    return credential.user
}

export const useSignInWithCredentials = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn,
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: GET_ME_QUERY_KEY,
            }),
    })
}
