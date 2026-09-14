import "./index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { QueryProvider } from "@/query"
import { Router } from "@/router"

import { ThemeProvider } from "./components/theme-provider"
import { WebSocketProvider } from "./ws"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <QueryProvider>
                <WebSocketProvider>
                    <Router />
                </WebSocketProvider>
            </QueryProvider>
        </ThemeProvider>
    </StrictMode>,
)
