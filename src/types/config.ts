/** A single message in the chat conversation. */
export interface ChatMessage {
  /** Unique identifier for the message. */
  id: string;
  /** Whether the message was sent by the user or the assistant. */
  role: "user" | "assistant";
  /** Plain-text body of the message. */
  content: string;
  /** Unix-epoch millisecond timestamp of when the message was created. */
  timestamp: number;
}

/**
 * User-facing configuration options for the chat widget.
 * All fields are optional — sensible defaults are provided by {@link DEFAULT_CONFIG}.
 */
export interface WidgetConfig {
  /** POST endpoint that receives { messages } and returns { reply } */
  endpoint?: string;
  /** Primary brand colour (hex) */
  primaryColor?: string;
  /** Header title text */
  title?: string;
  /** Initial greeting from the bot */
  greeting?: string;
  /** Which side to render the bubble — "left" | "right" */
  position?: "left" | "right";
  /** Bubble diameter in px */
  bubbleSize?: number;
  /** z-index for the widget */
  zIndex?: number;
  /** Placeholder text in the input */
  placeholder?: string;
  /**
   * Enable mock mode for development/demos.
   * - `true`  → always use mock responses (ignores endpoint)
   * - `false` → always use the real endpoint
   * - `"auto"` (default) → mock if no endpoint is provided
   */
  mockMode?: boolean | "auto";
}

/** {@link WidgetConfig} with every field guaranteed present. */
export type ResolvedConfig = Required<WidgetConfig>;

/** Sensible defaults applied when the user omits a config option. */
export const DEFAULT_CONFIG: ResolvedConfig = {
  endpoint: "",
  primaryColor: "#0b6e4f",
  title: "Chat with us",
  greeting: "Hi there! How can I help you today?",
  position: "right",
  bubbleSize: 60,
  zIndex: 2147483647,
  placeholder: "Type a message…",
  mockMode: "auto",
};

/**
 * Determine whether mock mode should be active for the given config.
 *
 * @param config - The fully-resolved widget configuration.
 * @returns `true` if the widget should use simulated responses instead of a real endpoint.
 */
export function isMockActive(config: ResolvedConfig): boolean {
  if (config.mockMode === true) return true;
  if (config.mockMode === false) return false;
  // "auto" — mock when there's no endpoint
  return !config.endpoint;
}
