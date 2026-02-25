import type { CSSProperties } from "preact";

const styles: Record<string, CSSProperties> = {
  container: {
    alignSelf: "flex-start",
    display: "flex",
    gap: "5px",
    padding: "12px 16px",
    background: "var(--cw-bg-muted)",
    borderRadius: "var(--cw-radius)",
    borderBottomLeftRadius: "4px",
    animation: "cw-fadeIn 0.2s ease",
  },
  dot: {
    width: "7px",
    height: "7px",
    background: "var(--cw-text-muted)",
    borderRadius: "50%",
    animation: "cw-bounce 0.6s infinite alternate",
  },
};

/** Three bouncing dots displayed while the assistant response is loading. */
export function TypingIndicator() {
  return (
    <div style={styles.container} aria-label="Typing">
      <span style={styles.dot} />
      <span style={{ ...styles.dot, animationDelay: "0.15s" }} />
      <span style={{ ...styles.dot, animationDelay: "0.3s" }} />
    </div>
  );
}
