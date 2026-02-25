import { useRef, useEffect } from "preact/hooks";
import type { CSSProperties } from "preact";
import type { ChatMessage } from "@/types";
import { MessageBubble } from "../MessageBubble";
import { TypingIndicator } from "../TypingIndicator";

/** Props for the {@link MessageList} component. */
interface MessageListProps {
  /** Ordered array of chat messages to render. */
  messages: ChatMessage[];
  /** When `true`, a typing indicator is appended after the last message. */
  isLoading: boolean;
}

const styles: Record<string, CSSProperties> = {
  container: {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    scrollBehavior: "smooth",
  },
};

/** Scrollable container that renders message bubbles and auto-scrolls to the latest entry. */
export function MessageList({ messages, isLoading }: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length, isLoading]);

  return (
    <div ref={containerRef} style={styles.container}>
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {isLoading && <TypingIndicator />}
    </div>
  );
}
