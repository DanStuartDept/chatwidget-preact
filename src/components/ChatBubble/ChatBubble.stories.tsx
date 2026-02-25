import type { Meta, StoryObj } from "@storybook/preact-vite";
import { ChatBubble } from "./ChatBubble";

/** Floating action button that toggles the chat panel open and closed. */
const meta: Meta<typeof ChatBubble> = {
  title: "Components/ChatBubble",
  component: ChatBubble,
  args: {
    isOpen: false,
    onClick: () => {},
    size: 60,
    position: "right",
  },
  argTypes: {
    position: { control: "inline-radio", options: ["left", "right"] },
    size: { control: { type: "range", min: 40, max: 80, step: 4 } },
  },
  decorators: [
    (Story) => (
      <div style={{ position: "relative", height: "120px", overflow: "hidden" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChatBubble>;

/** Default closed state showing the chat icon. */
export const Closed: Story = {};

/** Open state showing the close (X) icon. */
export const Open: Story = {
  args: {
    isOpen: true,
  },
};

/** Bubble anchored to the bottom-left corner. */
export const LeftPosition: Story = {
  args: {
    position: "left",
  },
};

/** Enlarged 76px bubble. */
export const LargeBubble: Story = {
  args: {
    size: 76,
  },
};
