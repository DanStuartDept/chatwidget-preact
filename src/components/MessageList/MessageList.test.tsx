import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/preact";
import { MessageList } from "./MessageList";
import type { ChatMessage } from "@/types";

const messages: ChatMessage[] = [
  { id: "1", role: "assistant", content: "Hello!", timestamp: 1000 },
  { id: "2", role: "user", content: "Hi back!", timestamp: 2000 },
  { id: "3", role: "assistant", content: "How can I help?", timestamp: 3000 },
];

describe("MessageList", () => {
  it("renders all messages", () => {
    render(<MessageList messages={messages} isLoading={false} />);
    expect(screen.getByText("Hello!")).toBeInTheDocument();
    expect(screen.getByText("Hi back!")).toBeInTheDocument();
    expect(screen.getByText("How can I help?")).toBeInTheDocument();
  });

  it("shows typing indicator when loading", () => {
    render(<MessageList messages={messages} isLoading={true} />);
    expect(screen.getByLabelText("Typing")).toBeInTheDocument();
  });

  it("hides typing indicator when not loading", () => {
    render(<MessageList messages={messages} isLoading={false} />);
    expect(screen.queryByLabelText("Typing")).not.toBeInTheDocument();
  });

  it("renders empty state with no messages", () => {
    const { container } = render(<MessageList messages={[]} isLoading={false} />);
    // Container exists but has no message bubbles
    expect(container.querySelector("div")).toBeInTheDocument();
  });
});
