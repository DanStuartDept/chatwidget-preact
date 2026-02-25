import { useState, useCallback, useRef } from "preact/hooks";
import type { ChatMessage } from "@/types";
import { getMockResponse } from "@/services";

/** Auto-incrementing counter combined with a timestamp to produce unique message IDs. */
let nextId = 0;
/** Generate a unique message ID (e.g. `msg_1_1700000000000`). */
const uid = () => `msg_${++nextId}_${Date.now()}`;

/** Options accepted by the {@link useChat} hook. */
interface UseChatOptions {
  /** Backend URL to POST message history to. Ignored when {@link useMock} is `true`. */
  endpoint: string;
  /** Optional greeting shown as the first assistant message. */
  greeting?: string;
  /** When `true`, bypass the real endpoint and return simulated responses. */
  useMock: boolean;
}

/**
 * Core chat hook that manages message state and API communication.
 *
 * Sends user messages to either a real endpoint or the mock service,
 * appends assistant replies, and exposes loading / reset controls.
 * Supports request cancellation via {@link AbortController}.
 *
 * @param options - Configuration for the chat session.
 * @returns An object containing `messages`, `isLoading`, `send`, and `reset`.
 */
export function useChat({ endpoint, greeting, useMock }: UseChatOptions) {
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    greeting
      ? [{ id: uid(), role: "assistant", content: greeting, timestamp: Date.now() }]
      : []
  );
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMsg: ChatMessage = {
        id: uid(),
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        let reply: string;

        if (useMock) {
          reply = await getMockResponse();
        } else {
          // Build message history for the API (exclude ids/timestamps)
          const history = [...messages, userMsg].map(({ role, content }) => ({
            role,
            content,
          }));

          abortRef.current = new AbortController();

          const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: history }),
            signal: abortRef.current.signal,
          });

          if (!res.ok) throw new Error(`HTTP ${res.status}`);

          const data = await res.json();
          reply = data.reply ?? data.message ?? data.content ?? "No response.";
        }

        const botMsg: ChatMessage = {
          id: uid(),
          role: "assistant",
          content: reply,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, botMsg]);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;

        console.error("[ChatWidget]", err);
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            content: "Sorry, something went wrong. Please try again.",
            timestamp: Date.now(),
          },
        ]);
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [endpoint, messages, isLoading, useMock]
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages(
      greeting
        ? [{ id: uid(), role: "assistant", content: greeting, timestamp: Date.now() }]
        : []
    );
    setIsLoading(false);
  }, [greeting]);

  return { messages, isLoading, send, reset };
}
