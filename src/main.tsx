import React from "react";
import ReactDOM from "react-dom/client";
import App from "./layouts/app/App.tsx";
import "./index.css";
import { WhoAmIProvider } from "./context/WhoAmIContext";
import { Toaster } from "./components/ui/toaster.tsx";
import { Toaster as SonnerToaster } from "@/components/ui/sonner"


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WhoAmIProvider>
      <Toaster />
      <SonnerToaster />
      <App />
    </WhoAmIProvider>
  </React.StrictMode>
);
