import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import App from "./App.jsx";
import ErrorBoundary from "./ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ErrorBoundary>
);
