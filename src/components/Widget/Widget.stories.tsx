import type { Meta, StoryObj } from "@storybook/preact-vite";
import { Widget } from "./Widget";

/** Top-level widget combining the chat bubble and chat panel. */
const meta: Meta<typeof Widget> = {
  title: "Widget",
  component: Widget,
  args: {
    config: { mockMode: true },
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ position: "relative", height: "700px", overflow: "hidden" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Widget>;

/** Widget with default configuration and mock mode enabled. */
export const Default: Story = {};

/** Widget with a custom primary colour, title, and greeting. */
export const CustomTheme: Story = {
  args: {
    config: {
      mockMode: true,
      primaryColor: "#1a73e8",
      title: "Support Team",
      greeting: "Welcome! How can we assist you today?",
    },
  },
};

/** Widget positioned on the left side of the viewport. */
export const LeftPosition: Story = {
  args: {
    config: {
      mockMode: true,
      position: "left",
    },
  },
};

/** Widget with an enlarged 76px floating button. */
export const LargeBubble: Story = {
  args: {
    config: {
      mockMode: true,
      bubbleSize: 76,
    },
  },
};
