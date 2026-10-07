import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource/press-start-2p/latin-400.css";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/space-grotesk/wght.css";

import App from "./App";
import "./index.css";

// Dark-only app: 8bitcn's `dark:` styles key off this class.
document.documentElement.classList.add("dark");
document.documentElement.style.colorScheme = "dark";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
