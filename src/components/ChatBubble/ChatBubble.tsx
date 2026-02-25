import type { CSSProperties } from "preact";
import { ChatIcon, CloseIcon } from "../Icons";

/** Props for the {@link ChatBubble} component. */
interface ChatBubbleProps {
  /** Whether the chat panel is currently open (controls which icon is shown). */
  isOpen: boolean;
  /** Callback to toggle the panel open/closed. */
  onClick: () => void;
  /** Diameter of the bubble in pixels. */
  size: number;
  /** Which corner of the viewport the bubble is anchored to. */
  position: "left" | "right";
}

const styles: Record<string, CSSProperties> = {
  bubble: {
    position: "fixed",
    bottom: "24px",
    borderRadius: "50%",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.18)",
    transition:
      "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease",
  },
  icon: {
    width: "28px",
    height: "28px",
    transition: "transform 0.3s ease",
  },
};

/** Floating action button fixed to the bottom corner. Toggles between chat and close icons. */
export function ChatBubble({ isOpen, onClick, size, position }: ChatBubbleProps) {
  const positionStyle: CSSProperties =
    position === "left" ? { left: "24px" } : { right: "24px" };

  return (
    <button
      style={{
        ...styles.bubble,
        ...positionStyle,
        width: `${size}px`,
        height: `${size}px`,
        background: "var(--cw-primary)",
        zIndex: "var(--cw-z)" as unknown as number,
      }}
      onClick={onClick}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {isOpen ? (
        <CloseIcon style={styles.icon} />
      ) : (
        <ChatIcon style={styles.icon} />
      )}
    </button>
  );
}
