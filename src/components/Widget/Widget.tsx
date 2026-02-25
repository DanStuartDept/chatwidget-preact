import { useState } from "preact/hooks";
import type { WidgetConfig } from "@/types";
import { DEFAULT_CONFIG } from "@/types";
import type { ResolvedConfig } from "@/types";
import { ChatBubble } from "../ChatBubble";
import { ChatPanel } from "../ChatPanel";

/** Props for the top-level {@link Widget} component. */
interface WidgetProps {
  /** Partial user configuration — missing keys are filled from {@link DEFAULT_CONFIG}. */
  config?: Partial<WidgetConfig>;
}

/**
 * Top-level widget component that merges user config with defaults and
 * manages the open/close state of the chat panel.
 */
export function Widget({ config: userConfig }: WidgetProps) {
  const config: ResolvedConfig = { ...DEFAULT_CONFIG, ...userConfig };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatPanel config={config} visible={isOpen} />
      <ChatBubble
        isOpen={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        size={config.bubbleSize}
        position={config.position}
      />
    </>
  );
}
