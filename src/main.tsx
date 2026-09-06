import "./index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { QueryProvider } from "@/query"
import { Router } from "@/router"
import { ThemeProvider } from "./components/theme-provider"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <QueryProvider>
                <Router />
            </QueryProvider>
        </ThemeProvider>
    </StrictMode>,
)
