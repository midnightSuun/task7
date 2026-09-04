import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "./firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_ME_QUERY_KEY } from "./get-me";

const mutationFn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(firebaseAuth, provider);

    return result.user;
}

export const useSignInWithGoogle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: GET_ME_QUERY_KEY,
            });
        },
    })
}