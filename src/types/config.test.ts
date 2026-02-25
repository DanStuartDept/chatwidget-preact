import { describe, it, expect } from "vitest";
import { isMockActive, DEFAULT_CONFIG } from "./config";
import type { ResolvedConfig } from "./config";

function makeConfig(overrides: Partial<ResolvedConfig> = {}): ResolvedConfig {
  return { ...DEFAULT_CONFIG, ...overrides };
}

describe("isMockActive", () => {
  it("returns true when mockMode is true", () => {
    expect(isMockActive(makeConfig({ mockMode: true }))).toBe(true);
  });

  it("returns false when mockMode is false", () => {
    expect(isMockActive(makeConfig({ mockMode: false }))).toBe(false);
  });

  it('returns true for "auto" with no endpoint', () => {
    expect(isMockActive(makeConfig({ mockMode: "auto", endpoint: "" }))).toBe(true);
  });

  it('returns false for "auto" with an endpoint', () => {
    expect(
      isMockActive(makeConfig({ mockMode: "auto", endpoint: "https://api.example.com" }))
    ).toBe(false);
  });
});

describe("DEFAULT_CONFIG", () => {
  it("has expected default values", () => {
    expect(DEFAULT_CONFIG.position).toBe("right");
    expect(DEFAULT_CONFIG.bubbleSize).toBe(60);
    expect(DEFAULT_CONFIG.mockMode).toBe("auto");
    expect(DEFAULT_CONFIG.endpoint).toBe("");
  });
});
