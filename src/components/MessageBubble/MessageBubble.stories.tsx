import type { Meta, StoryObj } from "@storybook/preact-vite";
import { MessageBubble } from "./MessageBubble";

/** Individual chat message styled differently for user and assistant roles. */
const meta: Meta<typeof MessageBubble> = {
  title: "Components/MessageBubble",
  component: MessageBubble,
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "380px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MessageBubble>;

/** Message sent by the user, aligned to the right. */
export const UserMessage: Story = {
  args: {
    message: {
      id: "msg_1",
      role: "user",
      content: "Hi, I need help with my order.",
      timestamp: Date.now(),
    },
  },
};

/** Response from the assistant, aligned to the left. */
export const AssistantMessage: Story = {
  args: {
    message: {
      id: "msg_2",
      role: "assistant",
      content:
        "Of course! I'd be happy to help you with your order. Could you please share your order number?",
      timestamp: Date.now(),
    },
  },
};

/** Long assistant message demonstrating text wrapping. */
export const LongMessage: Story = {
  args: {
    message: {
      id: "msg_3",
      role: "assistant",
      content:
        "Thank you for reaching out! I've looked into your account and found the order you're referring to. It appears that the shipment was delayed due to unexpected weather conditions in the delivery region. The updated estimated delivery date is within the next 2-3 business days. I'll keep monitoring the status and will notify you if there are any further changes.",
      timestamp: Date.now(),
    },
  },
};
