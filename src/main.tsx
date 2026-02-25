import { render } from "preact";
import { Widget } from "@/components";
import type { WidgetConfig } from "@/types";
import widgetStyles from "@/styles/widget.css?inline";

declare global {
  interface Window {
    /** User-provided widget configuration set before the script loads. */
    ChatWidgetConfig?: Partial<WidgetConfig>;
  }
}

/**
 * Creates the widget host element, attaches a Shadow DOM for style isolation,
 * injects CSS custom properties from the user config, and renders the Preact
 * component tree into the shadow root.
 */
function mount() {
  // Create host element
  const host = document.createElement("div");
  host.id = "chat-widget-host";
  document.body.appendChild(host);

  // Attach shadow DOM
  const shadow = host.attachShadow({ mode: "open" });

  // Inject styles into shadow root
  const style = document.createElement("style");
  style.textContent = widgetStyles;
  shadow.appendChild(style);

  // Apply dynamic CSS custom properties from config
  const config = window.ChatWidgetConfig ?? {};
  const hostEl = shadow.host as HTMLElement;
  if (config.primaryColor) {
    hostEl.style.setProperty("--cw-primary", config.primaryColor);
  }
  if (config.zIndex !== undefined) {
    hostEl.style.setProperty("--cw-z", String(config.zIndex));
  }

  // Create a mount point inside the shadow DOM
  const mountPoint = document.createElement("div");
  mountPoint.id = "chat-widget-root";
  shadow.appendChild(mountPoint);

  // Render
  render(<Widget config={config} />, mountPoint);
}

// Boot
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
