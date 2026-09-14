import "./index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { QueryProvider } from "@/query"
import { Router } from "@/router"

import { ThemeProvider } from "./components/theme-provider"
import { WebSocketProvider } from "./ws"

import { TanStackDevtools } from '@tanstack/react-devtools'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <QueryProvider>
                <WebSocketProvider>
                    <Router />
                    <TanStackDevtools
                        plugins={[
                            {
                                name: 'TanStack Query',
                                render: <ReactQueryDevtoolsPanel />,
                            },
                            {
                                name: 'TanStack Router',
                                render: <TanStackRouterDevtoolsPanel />,
                            },
                        ]}
                    />
                </WebSocketProvider>
            </QueryProvider>
        </ThemeProvider>
    </StrictMode>,
)
