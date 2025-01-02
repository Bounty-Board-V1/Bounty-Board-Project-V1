import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import App from "./App.jsx";
import ErrorBoundary from "./ErrorBoundary";

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
