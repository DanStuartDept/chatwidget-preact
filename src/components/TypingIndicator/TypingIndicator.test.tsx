import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/preact";
import { TypingIndicator } from "./TypingIndicator";

describe("TypingIndicator", () => {
  it("renders with accessible label", () => {
    render(<TypingIndicator />);
    expect(screen.getByLabelText("Typing")).toBeInTheDocument();
  });

  it("renders three dots", () => {
    const { container } = render(<TypingIndicator />);
    const dots = container.querySelectorAll("span");
    expect(dots).toHaveLength(3);
  });
});
