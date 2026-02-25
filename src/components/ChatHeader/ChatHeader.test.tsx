import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/preact";
import { ChatHeader } from "./ChatHeader";

describe("ChatHeader", () => {
  it("renders the title text", () => {
    render(<ChatHeader title="Support Chat" />);
    expect(screen.getByText("Support Chat")).toBeInTheDocument();
  });

  it("renders a different title", () => {
    render(<ChatHeader title="Help Desk" />);
    expect(screen.getByText("Help Desk")).toBeInTheDocument();
  });
});
