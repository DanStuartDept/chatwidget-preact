import { useState, useRef, useCallback } from "preact/hooks";
import type { CSSProperties } from "preact";
import { SendIcon } from "../Icons";

/** Props for the {@link ChatInput} component. */
interface ChatInputProps {
  /** Callback invoked with the trimmed message text when the user submits. */
  onSend: (text: string) => void;
  /** Disables the input and send button (e.g. while waiting for a response). */
  disabled?: boolean;
  /** Placeholder text shown in the empty textarea. */
  placeholder?: string;
}

const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    alignItems: "center",
    padding: "12px 14px",
    borderTop: "1px solid var(--cw-border)",
    gap: "8px",
    flexShrink: 0,
  },
  textarea: {
    flex: 1,
    border: "1px solid var(--cw-border)",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "0.92rem",
    fontFamily: "inherit",
    outline: "none",
    resize: "none",
    maxHeight: "100px",
    overflowY: "auto",
    lineHeight: "1.4",
    background: "var(--cw-bg)",
    color: "var(--cw-text)",
  },
  button: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    border: "none",
    background: "var(--cw-primary)",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "opacity 0.2s",
  },
  buttonDisabled: {
    opacity: 0.4,
    cursor: "default",
  },
  icon: {
    width: "18px",
    height: "18px",
  },
};

/** Auto-resizing textarea with a send button. Submits on Enter (Shift+Enter for newline). */
export function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Type a message…",
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = useCallback((e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    setValue(target.value);
    // Auto-resize
    target.style.height = "auto";
    target.style.height = `${Math.min(target.scrollHeight, 100)}px`;
  }, []);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, disabled, onSend]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div style={styles.container}>
      <textarea
        ref={textareaRef}
        style={styles.textarea}
        placeholder={placeholder}
        rows={1}
        value={value}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
      />
      <button
        style={{
          ...styles.button,
          ...(canSend ? {} : styles.buttonDisabled),
        }}
        disabled={!canSend}
        onClick={handleSend}
        aria-label="Send"
      >
        <SendIcon style={styles.icon} />
      </button>
    </div>
  );
}
