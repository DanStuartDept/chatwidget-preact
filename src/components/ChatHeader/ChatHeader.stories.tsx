import type { Meta, StoryObj } from "@storybook/preact-vite";
import { ChatHeader } from "./ChatHeader";

/** Top bar of the chat panel displaying the title and a pulse indicator. */
const meta: Meta<typeof ChatHeader> = {
  title: "Components/ChatHeader",
  component: ChatHeader,
  args: {
    title: "Chat with us",
  },
};

export default meta;
type Story = StoryObj<typeof ChatHeader>;

/** Header with the default title. */
export const Default: Story = {};

/** Header with a custom title. */
export const CustomTitle: Story = {
  args: {
    title: "Support Team",
  },
};

/** Header demonstrating text overflow with a long title. */
export const LongTitle: Story = {
  args: {
    title: "Welcome to our customer support chat service",
  },
};
