import type { CSSProperties } from "preact";

const style: CSSProperties = {
  background: "#fef3c7",
  color: "#92400e",
  fontSize: "0.72rem",
  fontWeight: 500,
  textAlign: "center",
  padding: "4px 12px",
  letterSpacing: "0.02em",
  flexShrink: 0,
};

/** Small amber banner rendered below the header when mock mode is active. */
export function MockBanner() {
  return <div style={style}>Mock mode — responses are simulated</div>;
}
