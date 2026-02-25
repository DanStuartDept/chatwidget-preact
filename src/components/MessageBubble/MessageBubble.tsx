import type { CSSProperties } from "preact";
import type { ChatMessage } from "@/types";

/** Props for the {@link MessageBubble} component. */
interface MessageBubbleProps {
  /** The chat message to render. */
  message: ChatMessage;
}

const base: CSSProperties = {
  maxWidth: "82%",
  padding: "10px 14px",
  borderRadius: "var(--cw-radius)",
  fontSize: "0.92rem",
  lineHeight: "1.5",
  wordWrap: "break-word",
  animation: "cw-fadeIn 0.25s ease",
};

const variants: Record<ChatMessage["role"], CSSProperties> = {
  user: {
    ...base,
    alignSelf: "flex-end",
    background: "var(--cw-primary)",
    color: "#fff",
    borderBottomRightRadius: "4px",
  },
  assistant: {
    ...base,
    alignSelf: "flex-start",
    background: "var(--cw-bg-muted)",
    color: "var(--cw-text)",
    borderBottomLeftRadius: "4px",
  },
};

/** Styled chat bubble with user/assistant variants (colour, alignment, border radius). */
export function MessageBubble({ message }: MessageBubbleProps) {
  return <div style={variants[message.role]}>{message.content}</div>;
}
