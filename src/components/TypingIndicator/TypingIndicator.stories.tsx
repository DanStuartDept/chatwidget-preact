import type { Meta, StoryObj } from "@storybook/preact-vite";
import { TypingIndicator } from "./TypingIndicator";

/** Animated bouncing dots shown while waiting for an assistant response. */
const meta: Meta<typeof TypingIndicator> = {
  title: "Components/TypingIndicator",
  component: TypingIndicator,
};

export default meta;
type Story = StoryObj<typeof TypingIndicator>;

/** Animated dots in their default looping state. */
export const Default: Story = {};
