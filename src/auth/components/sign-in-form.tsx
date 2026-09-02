import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useSignInWithCredentials } from "../sign-in-with-credentials"

export const SignInForm = () => {
    const { mutateAsync } = useSignInWithCredentials()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignIn = async () => {
        await mutateAsync({
            email,
            password,
        })
    }

    return (
        <div>
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleSignIn}>Sign in</Button>
        </div>
    )
}
