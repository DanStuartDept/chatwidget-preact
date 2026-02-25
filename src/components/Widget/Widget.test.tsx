import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/preact";
import { Widget } from "./Widget";

describe("Widget", () => {
  it("renders the chat bubble", () => {
    render(<Widget />);
    expect(screen.getByLabelText("Open chat")).toBeInTheDocument();
  });

  it("opens the chat panel when bubble is clicked", () => {
    render(<Widget config={{ title: "Test Chat" }} />);

    // Panel should initially not show title visibly (hidden via pointer-events: none / opacity: 0)
    // but the DOM still contains it. Let's check the bubble toggles.
    fireEvent.click(screen.getByLabelText("Open chat"));

    // After click, bubble label should change to "Close chat"
    expect(screen.getByLabelText("Close chat")).toBeInTheDocument();
  });

  it("closes the panel when bubble is clicked again", () => {
    render(<Widget />);

    // Open
    fireEvent.click(screen.getByLabelText("Open chat"));
    expect(screen.getByLabelText("Close chat")).toBeInTheDocument();

    // Close
    fireEvent.click(screen.getByLabelText("Close chat"));
    expect(screen.getByLabelText("Open chat")).toBeInTheDocument();
  });

  it("applies custom config", () => {
    render(<Widget config={{ title: "Help Center", greeting: "Hey!" }} />);
    expect(screen.getByText("Help Center")).toBeInTheDocument();
    expect(screen.getByText("Hey!")).toBeInTheDocument();
  });

  it("renders greeting message by default", () => {
    render(<Widget />);
    expect(
      screen.getByText("Hi there! How can I help you today?")
    ).toBeInTheDocument();
  });
});
