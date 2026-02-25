import type { CSSProperties } from "preact";

/** Props for the {@link ChatHeader} component. */
interface ChatHeaderProps {
  /** Text displayed in the header bar. */
  title: string;
}

const styles: Record<string, CSSProperties> = {
  header: {
    background: "var(--cw-primary)",
    color: "#fff",
    padding: "18px 20px",
    fontSize: "1.05rem",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexShrink: 0,
  },
  dot: {
    width: "10px",
    height: "10px",
    background: "rgba(255, 255, 255, 0.5)",
    borderRadius: "50%",
    animation: "cw-pulse 2s infinite",
  },
};

/** Branded header bar with a pulsing status dot and the widget title. */
export function ChatHeader({ title }: ChatHeaderProps) {
  return (
    <div style={styles.header}>
      <div style={styles.dot} />
      {title}
    </div>
  );
}
