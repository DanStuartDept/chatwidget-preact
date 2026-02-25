import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/preact";
import { MockBanner } from "./MockBanner";

describe("MockBanner", () => {
  it("renders the mock mode message", () => {
    render(<MockBanner />);
    expect(
      screen.getByText("Mock mode — responses are simulated")
    ).toBeInTheDocument();
  });
});
