import type { Meta, StoryObj } from "@storybook/preact-vite";
import { ChatInput } from "./ChatInput";

/** Auto-resizing textarea with send button for composing messages. */
const meta: Meta<typeof ChatInput> = {
  title: "Components/ChatInput",
  component: ChatInput,
  args: {
    onSend: (text: string) => console.log("Send:", text),
    placeholder: "Type a message\u2026",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "380px", border: "1px solid #e4e4e7" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChatInput>;

/** Input in its default interactive state. */
export const Default: Story = {};

/** Input disabled while a response is loading. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/** Input with custom placeholder text. */
export const CustomPlaceholder: Story = {
  args: {
    placeholder: "Ask me anything...",
  },
};
