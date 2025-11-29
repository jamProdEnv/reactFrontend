import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

console.log(import.meta.env.VITE_LOCAL_BACKEND_URL);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
