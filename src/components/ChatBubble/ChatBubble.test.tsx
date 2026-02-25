import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/preact";
import { ChatBubble } from "./ChatBubble";

describe("ChatBubble", () => {
  it('shows "Open chat" label when closed', () => {
    render(
      <ChatBubble isOpen={false} onClick={() => {}} size={60} position="right" />
    );
    expect(screen.getByLabelText("Open chat")).toBeInTheDocument();
  });

  it('shows "Close chat" label when open', () => {
    render(
      <ChatBubble isOpen={true} onClick={() => {}} size={60} position="right" />
    );
    expect(screen.getByLabelText("Close chat")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    let clicked = false;
    render(
      <ChatBubble
        isOpen={false}
        onClick={() => { clicked = true; }}
        size={60}
        position="right"
      />
    );
    fireEvent.click(screen.getByLabelText("Open chat"));
    expect(clicked).toBe(true);
  });

  it("positions to the right by default", () => {
    render(
      <ChatBubble isOpen={false} onClick={() => {}} size={60} position="right" />
    );
    const button = screen.getByLabelText("Open chat");
    expect(button.style.right).toBe("24px");
  });

  it("positions to the left when configured", () => {
    render(
      <ChatBubble isOpen={false} onClick={() => {}} size={60} position="left" />
    );
    const button = screen.getByLabelText("Open chat");
    expect(button.style.left).toBe("24px");
  });

  it("applies the configured size", () => {
    render(
      <ChatBubble isOpen={false} onClick={() => {}} size={80} position="right" />
    );
    const button = screen.getByLabelText("Open chat");
    expect(button.style.width).toBe("80px");
    expect(button.style.height).toBe("80px");
  });
});
