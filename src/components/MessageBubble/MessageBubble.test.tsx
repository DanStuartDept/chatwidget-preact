import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/preact";
import { MessageBubble } from "./MessageBubble";
import type { ChatMessage } from "@/types";

const userMessage: ChatMessage = {
  id: "msg_1",
  role: "user",
  content: "Hello there!",
  timestamp: Date.now(),
};

const assistantMessage: ChatMessage = {
  id: "msg_2",
  role: "assistant",
  content: "Hi! How can I help?",
  timestamp: Date.now(),
};

describe("MessageBubble", () => {
  it("renders user message content", () => {
    render(<MessageBubble message={userMessage} />);
    expect(screen.getByText("Hello there!")).toBeInTheDocument();
  });

  it("renders assistant message content", () => {
    render(<MessageBubble message={assistantMessage} />);
    expect(screen.getByText("Hi! How can I help?")).toBeInTheDocument();
  });

  it("aligns user messages to flex-end", () => {
    const { container } = render(<MessageBubble message={userMessage} />);
    const bubble = container.firstElementChild as HTMLElement;
    expect(bubble.style.alignSelf).toBe("flex-end");
  });

  it("aligns assistant messages to flex-start", () => {
    const { container } = render(<MessageBubble message={assistantMessage} />);
    const bubble = container.firstElementChild as HTMLElement;
    expect(bubble.style.alignSelf).toBe("flex-start");
  });
});
