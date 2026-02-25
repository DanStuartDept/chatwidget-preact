import type { Meta, StoryObj } from "@storybook/preact-vite";
import type { ChatMessage } from "@/types";
import { MessageList } from "./MessageList";

const sampleMessages: ChatMessage[] = [
  {
    id: "msg_1",
    role: "assistant",
    content: "Hi there! How can I help you today?",
    timestamp: Date.now() - 60000,
  },
  {
    id: "msg_2",
    role: "user",
    content: "I have a question about my subscription.",
    timestamp: Date.now() - 45000,
  },
  {
    id: "msg_3",
    role: "assistant",
    content:
      "Of course! I'd be happy to help you with your subscription. What would you like to know?",
    timestamp: Date.now() - 30000,
  },
  {
    id: "msg_4",
    role: "user",
    content: "How do I upgrade to the Pro plan?",
    timestamp: Date.now() - 15000,
  },
  {
    id: "msg_5",
    role: "assistant",
    content:
      'You can upgrade to the Pro plan by going to Settings > Billing > Change Plan. From there, select the Pro plan and follow the prompts to complete the upgrade. Would you like me to walk you through it step by step?',
    timestamp: Date.now(),
  },
];

/** Scrollable container that renders message bubbles and the typing indicator. */
const meta: Meta<typeof MessageList> = {
  title: "Components/MessageList",
  component: MessageList,
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: "380px",
          height: "400px",
          border: "1px solid #e4e4e7",
          borderRadius: "12px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MessageList>;

/** Conversation with several back-and-forth messages. */
export const WithMessages: Story = {
  args: {
    messages: sampleMessages,
    isLoading: false,
  },
};

/** List showing the typing indicator while a response loads. */
export const Loading: Story = {
  args: {
    messages: sampleMessages.slice(0, 2),
    isLoading: true,
  },
};

/** Empty state before any messages are sent. */
export const Empty: Story = {
  args: {
    messages: [],
    isLoading: false,
  },
};

/** List with only the initial greeting message. */
export const SingleGreeting: Story = {
  args: {
    messages: [sampleMessages[0]],
    isLoading: false,
  },
};
