import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/preact";
import { useChat } from "./useChat";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("useChat", () => {
  it("initialises with greeting message when provided", () => {
    const { result } = renderHook(() =>
      useChat({ endpoint: "", greeting: "Welcome!", useMock: true })
    );
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].role).toBe("assistant");
    expect(result.current.messages[0].content).toBe("Welcome!");
  });

  it("initialises with empty messages when no greeting", () => {
    const { result } = renderHook(() =>
      useChat({ endpoint: "", useMock: true })
    );
    expect(result.current.messages).toHaveLength(0);
  });

  it("is not loading initially", () => {
    const { result } = renderHook(() =>
      useChat({ endpoint: "", useMock: true })
    );
    expect(result.current.isLoading).toBe(false);
  });

  it("adds user message and gets mock response", async () => {
    const { result } = renderHook(() =>
      useChat({ endpoint: "", useMock: true })
    );

    await act(async () => {
      result.current.send("Hello");
    });

    // User message was added
    expect(result.current.messages.some((m) => m.role === "user" && m.content === "Hello")).toBe(true);

    // Loading state is active
    expect(result.current.isLoading).toBe(true);

    // Resolve mock delay
    await act(async () => {
      await vi.runAllTimersAsync();
    });

    // Mock response was added
    expect(result.current.isLoading).toBe(false);
    expect(result.current.messages.filter((m) => m.role === "assistant")).toHaveLength(1);
  });

  it("does not send empty messages", async () => {
    const { result } = renderHook(() =>
      useChat({ endpoint: "", useMock: true })
    );

    await act(async () => {
      result.current.send("   ");
    });

    expect(result.current.messages).toHaveLength(0);
    expect(result.current.isLoading).toBe(false);
  });

  it("resets to greeting on reset()", async () => {
    const { result } = renderHook(() =>
      useChat({ endpoint: "", greeting: "Hi!", useMock: true })
    );

    // Send a message
    await act(async () => {
      result.current.send("Test");
    });
    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(result.current.messages.length).toBeGreaterThan(1);

    // Reset
    act(() => {
      result.current.reset();
    });

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].content).toBe("Hi!");
    expect(result.current.isLoading).toBe(false);
  });

  it("resets to empty when no greeting", async () => {
    const { result } = renderHook(() =>
      useChat({ endpoint: "", useMock: true })
    );

    await act(async () => {
      result.current.send("Test");
    });
    await act(async () => {
      await vi.runAllTimersAsync();
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.messages).toHaveLength(0);
  });

  it("calls real endpoint in non-mock mode", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ reply: "Server response" }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const { result } = renderHook(() =>
      useChat({ endpoint: "https://api.example.com/chat", useMock: false })
    );

    await act(async () => {
      result.current.send("Hello");
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.example.com/chat",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );

    // Wait for response to be processed
    await act(async () => {
      await vi.runAllTimersAsync();
    });

    const assistantMsgs = result.current.messages.filter((m) => m.role === "assistant");
    expect(assistantMsgs).toHaveLength(1);
    expect(assistantMsgs[0].content).toBe("Server response");
  });

  it("handles API errors gracefully", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    vi.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() =>
      useChat({ endpoint: "https://api.example.com/chat", useMock: false })
    );

    await act(async () => {
      result.current.send("Hello");
    });
    await act(async () => {
      await vi.runAllTimersAsync();
    });

    const lastMsg = result.current.messages[result.current.messages.length - 1];
    expect(lastMsg.role).toBe("assistant");
    expect(lastMsg.content).toContain("something went wrong");
    expect(result.current.isLoading).toBe(false);
  });
});
