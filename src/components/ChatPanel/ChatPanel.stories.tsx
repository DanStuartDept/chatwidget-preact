import type { Meta, StoryObj } from "@storybook/preact-vite";
import { DEFAULT_CONFIG } from "@/types";
import { ChatPanel } from "./ChatPanel";

/** The main chat window containing the header, message list, and input. */
const meta: Meta<typeof ChatPanel> = {
  title: "Components/ChatPanel",
  component: ChatPanel,
  args: {
    config: { ...DEFAULT_CONFIG, mockMode: true },
    visible: true,
  },
  argTypes: {
    visible: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div style={{ position: "relative", height: "600px", overflow: "hidden" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChatPanel>;

/** Panel in its default visible state with mock mode. */
export const Default: Story = {};

/** Panel toggled off — verifies the hide animation. */
export const Hidden: Story = {
  args: {
    visible: false,
  },
};

/** Panel with a custom title, colour, and placeholder. */
export const CustomBranding: Story = {
  args: {
    config: {
      ...DEFAULT_CONFIG,
      mockMode: true,
      title: "Support Team",
      primaryColor: "#1a73e8",
      placeholder: "Ask us anything...",
    },
  },
};

/** Panel anchored to the bottom-left corner. */
export const LeftPosition: Story = {
  args: {
    config: { ...DEFAULT_CONFIG, mockMode: true, position: "left" as const },
  },
};

/** Auto mock mode with no endpoint — falls back to mock responses. */
export const RealModeNoEndpoint: Story = {
  args: {
    config: { ...DEFAULT_CONFIG, mockMode: "auto" as const },
  },
};
