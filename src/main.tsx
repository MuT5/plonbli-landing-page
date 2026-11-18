import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./fonts.css";
import "./index.css";
import "./atlas-sections.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Missing #root element");
}

if (root.hasChildNodes()) {
  hydrateRoot(root, <App initialAnimations={false} />);
} else {
  createRoot(root).render(<App />);
}
