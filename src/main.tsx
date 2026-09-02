import "./index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Router } from "@/router"
import { QueryProvider } from "@/query"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryProvider>
            <Router />
        </QueryProvider>
    </StrictMode>,
)
