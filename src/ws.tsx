import type { PropsWithChildren } from "react"
import useWebSocketImport from "react-use-websocket"

import { env } from "./env"

type UseWebSocket = typeof useWebSocketImport

const useWebSocket: UseWebSocket =
  (useWebSocketImport as unknown as { default?: UseWebSocket }).default ??
  useWebSocketImport

export const WebSocketProvider = ({ children }: PropsWithChildren) => {
  useWebSocket(env.VITE_WS_URL)

  return children
}
