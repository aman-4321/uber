import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.tsx";
import CaptainContext from "./context/CaptainContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CaptainContext>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </CaptainContext>
  </StrictMode>,
);
