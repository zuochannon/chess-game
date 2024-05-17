import React from "react";
import ReactDOM from "react-dom/client";
import App from "./layouts/app/App.tsx";
import "./index.css";
import { WhoAmIProvider } from "./context/WhoAmIContext";
import { Toaster } from "./components/ui/toaster.tsx";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { WebSocketProvider } from "./context/WebSocketContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WhoAmIProvider>
      <WebSocketProvider>
        <Toaster />
        <SonnerToaster />
        <App />
      </WebSocketProvider>
    </WhoAmIProvider>
  </React.StrictMode>
);
