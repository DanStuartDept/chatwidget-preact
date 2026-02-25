import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/preact";
import { ChatInput } from "./ChatInput";

describe("ChatInput", () => {
  it("renders with placeholder text", () => {
    render(<ChatInput onSend={() => {}} />);
    expect(screen.getByPlaceholderText("Type a message…")).toBeInTheDocument();
  });

  it("renders with a custom placeholder", () => {
    render(<ChatInput onSend={() => {}} placeholder="Ask something..." />);
    expect(screen.getByPlaceholderText("Ask something...")).toBeInTheDocument();
  });

  it("calls onSend with trimmed text on button click", () => {
    const onSend = vi.fn();
    render(<ChatInput onSend={onSend} />);

    const textarea = screen.getByPlaceholderText("Type a message…");
    fireEvent.input(textarea, { target: { value: "  hello  " } });
    fireEvent.click(screen.getByLabelText("Send"));

    expect(onSend).toHaveBeenCalledWith("hello");
  });

  it("clears input after sending", () => {
    render(<ChatInput onSend={() => {}} />);

    const textarea = screen.getByPlaceholderText("Type a message…") as HTMLTextAreaElement;
    fireEvent.input(textarea, { target: { value: "hello" } });
    fireEvent.click(screen.getByLabelText("Send"));

    expect(textarea.value).toBe("");
  });

  it("sends on Enter key press", () => {
    const onSend = vi.fn();
    render(<ChatInput onSend={onSend} />);

    const textarea = screen.getByPlaceholderText("Type a message…");
    fireEvent.input(textarea, { target: { value: "hello" } });
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });

    expect(onSend).toHaveBeenCalledWith("hello");
  });

  it("does not send on Shift+Enter", () => {
    const onSend = vi.fn();
    render(<ChatInput onSend={onSend} />);

    const textarea = screen.getByPlaceholderText("Type a message…");
    fireEvent.input(textarea, { target: { value: "hello" } });
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: true });

    expect(onSend).not.toHaveBeenCalled();
  });

  it("does not send empty messages", () => {
    const onSend = vi.fn();
    render(<ChatInput onSend={onSend} />);

    fireEvent.click(screen.getByLabelText("Send"));
    expect(onSend).not.toHaveBeenCalled();
  });

  it("disables send button when disabled prop is true", () => {
    render(<ChatInput onSend={() => {}} disabled={true} />);
    const button = screen.getByLabelText("Send");
    expect(button).toBeDisabled();
  });

  it("does not send when disabled even with text", () => {
    const onSend = vi.fn();
    render(<ChatInput onSend={onSend} disabled={true} />);

    const textarea = screen.getByPlaceholderText("Type a message…");
    fireEvent.input(textarea, { target: { value: "hello" } });
    fireEvent.click(screen.getByLabelText("Send"));

    expect(onSend).not.toHaveBeenCalled();
  });
});
