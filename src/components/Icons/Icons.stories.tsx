import type { Meta, StoryObj } from "@storybook/preact-vite";
import { ChatIcon, SendIcon, CloseIcon } from "./Icons";

/** SVG icons used throughout the widget (chat, send, close). */
const meta: Meta = {
  title: "Components/Icons",
};

export default meta;

/** Chat bubble icon used on the floating button. */
export const Chat: StoryObj = {
  render: () => (
    <ChatIcon style={{ width: "32px", height: "32px", color: "#0b6e4f" }} />
  ),
};

/** Arrow icon used on the send button. */
export const Send: StoryObj = {
  render: () => (
    <SendIcon style={{ width: "32px", height: "32px", color: "#0b6e4f" }} />
  ),
};

/** X icon used to dismiss the chat panel. */
export const Close: StoryObj = {
  render: () => (
    <CloseIcon style={{ width: "32px", height: "32px", color: "#0b6e4f" }} />
  ),
};
