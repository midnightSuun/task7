import { type PropsWithChildren } from "react"
import useWebSocketImport from "react-use-websocket"
import { useFirebaseToken } from "./auth/use-firebase-token"
import { env } from "./env"
import { useHandleNewMessageEvent } from "./chats/api/use-handle-new-message-event"

type UseWebSocket = typeof useWebSocketImport

const useWebSocket: UseWebSocket =
    (useWebSocketImport as unknown as { default?: UseWebSocket }).default ??
    useWebSocketImport

export const WebSocketProvider = ({ children }: PropsWithChildren) => {
    const token = useFirebaseToken()

    const handleNewMessageEvent = useHandleNewMessageEvent()
    const url = `${env.VITE_WS_URL}?token=${token}`

    useWebSocket(url, {
        onMessage: (message) => {
            handleNewMessageEvent(message.data)
        },
    })

    return children
}
