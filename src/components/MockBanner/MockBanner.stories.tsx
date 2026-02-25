import type { Meta, StoryObj } from "@storybook/preact-vite";
import { MockBanner } from "./MockBanner";

/** Banner displayed at the top of the chat panel when mock mode is active. */
const meta: Meta<typeof MockBanner> = {
  title: "Components/MockBanner",
  component: MockBanner,
};

export default meta;
type Story = StoryObj<typeof MockBanner>;

/** Banner as it appears at the top of the chat panel. */
export const Default: Story = {};
