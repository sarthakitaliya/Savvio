import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ContentPage } from "./content/content";

const blockedSites = ["savvio.com", "localhost"];

if (!blockedSites.some((site) => window.location.hostname.includes(site))) {
  if (!document.getElementById("savvio-extension-root")) {
    const host = document.createElement("div");
    const shadowRoot = host.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `
  :host, * {
    box-sizing: border-box;
    font-family: system-ui, sans-serif;
    line-height: 1.4;
    font-size: 14px;
    margin: 0;
    padding: 0;
  }
    .heading{
        font-size: 120px;  
    }
`;
    shadowRoot.appendChild(style);
    const root = document.createElement("div");
    root.id = "savvio-extension-root";
    root.style.position = "fixed";
    root.style.bottom = "20px";
    root.style.right = "20px";
    root.style.zIndex = "2147483647";

    shadowRoot.appendChild(root);
    document.body.appendChild(host);

    createRoot(root).render(
      <StrictMode>
        <ContentPage />
      </StrictMode>
    );
  }
}
