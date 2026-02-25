import type { CSSProperties } from "preact";
import type { ResolvedConfig } from "@/types";
import { isMockActive } from "@/types";
import { useChat } from "@/hooks";
import { ChatHeader } from "../ChatHeader";
import { MessageList } from "../MessageList";
import { ChatInput } from "../ChatInput";
import { MockBanner } from "../MockBanner";

/** Props for the {@link ChatPanel} component. */
interface ChatPanelProps {
  /** Fully-resolved widget configuration. */
  config: ResolvedConfig;
  /** Whether the panel is currently visible (animated in/out). */
  visible: boolean;
}

const styles: Record<string, CSSProperties> = {
  panel: {
    position: "fixed",
    bottom: "100px",
    width: "380px",
    maxWidth: "calc(100vw - 32px)",
    height: "520px",
    maxHeight: "calc(100vh - 140px)",
    background: "var(--cw-bg)",
    borderRadius: "16px",
    boxShadow: "var(--cw-shadow)",
    zIndex: "var(--cw-z)" as unknown as number,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    transition:
      "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  hidden: {
    opacity: 0,
    transform: "translateY(16px) scale(0.96)",
    pointerEvents: "none",
  },
  visible: {
    opacity: 1,
    transform: "translateY(0) scale(1)",
    pointerEvents: "auto",
  },
};

/**
 * Sliding chat window that contains the header, message list, and input bar.
 * Positioned to the left or right based on `config.position` and animated
 * in/out via the `visible` prop.
 */
export function ChatPanel({ config, visible }: ChatPanelProps) {
  const useMock = isMockActive(config);
  const { messages, isLoading, send } = useChat({
    endpoint: config.endpoint,
    greeting: config.greeting,
    useMock,
  });

  const positionStyle: CSSProperties =
    config.position === "left" ? { left: "24px" } : { right: "24px" };

  return (
    <div
      style={{
        ...styles.panel,
        ...positionStyle,
        ...(visible ? styles.visible : styles.hidden),
      }}
    >
      <ChatHeader title={config.title} />
      {useMock && <MockBanner />}
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInput
        onSend={send}
        disabled={isLoading}
        placeholder={config.placeholder}
      />
    </div>
  );
}
