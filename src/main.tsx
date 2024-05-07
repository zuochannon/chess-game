import React from "react";
import ReactDOM from "react-dom/client";
import App from "./layouts/app/App.tsx";
import "./index.css";
import { WhoAmIProvider } from "./context/WhoAmIContext";
import { Toaster } from "./components/ui/toaster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WhoAmIProvider>
      <Toaster />
      <App />
    </WhoAmIProvider>
  </React.StrictMode>
);
