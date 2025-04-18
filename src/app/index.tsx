import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "@/app/App.tsx";

import "./styles/styles.scss";
import { ModalProvider, QueryProvider } from "@/app/providers";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <QueryProvider>
            <ModalProvider>
                <App />
            </ModalProvider>
        </QueryProvider>
    </BrowserRouter>,
);
