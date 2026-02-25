import type { Preview } from "storybook";
import type { ComponentChildren } from "preact";

import "../src/styles/widget.css";

const cwVars: Record<string, string> = {
  "--cw-primary": "#0b6e4f",
  "--cw-primary-hover": "#095e43",
  "--cw-bg": "#ffffff",
  "--cw-bg-muted": "#f0f2f5",
  "--cw-text": "#1a1a2e",
  "--cw-text-muted": "#71717a",
  "--cw-border": "#e4e4e7",
  "--cw-radius": "14px",
  "--cw-shadow": "0 12px 48px rgba(0, 0, 0, 0.15)",
  "--cw-z": "2147483647",
};

function WidgetDecorator({ children }: { children: ComponentChildren }) {
  return (
    <div
      style={{
        fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
        ...cwVars,
      }}
    >
      {children}
    </div>
  );
}

const preview: Preview = {
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <WidgetDecorator>
        <Story />
      </WidgetDecorator>
    ),
  ],
};

export default preview;
