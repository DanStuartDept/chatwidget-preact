import { describe, it, expect, vi, beforeEach } from "vitest";
import { getMockResponse } from "./mockResponses";

beforeEach(() => {
  vi.useFakeTimers();
});

describe("getMockResponse", () => {
  it("returns a non-empty string", async () => {
    const promise = getMockResponse();
    vi.runAllTimersAsync();
    const result = await promise;
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("resolves after the simulated delay", async () => {
    const promise = getMockResponse();
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(result).toBeTruthy();
  });
});
