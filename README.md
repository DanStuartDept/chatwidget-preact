# ChatWidget

A lightweight, embeddable chatbot widget built with **Preact**, **TypeScript**, and **Vite**.

Outputs a single `chatwidget.js` file (~10KB gzipped) that can be dropped onto any website via GTM or a `<script>` tag. Renders inside Shadow DOM for full CSS isolation.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server with HMR
pnpm dev

# Build for production
pnpm build
# → dist/chatwidget.js
```

## Usage

### Via GTM (Custom HTML tag)

```html
<script>
window.ChatWidgetConfig = {
  endpoint: "https://api.yoursite.com/chat",
  primaryColor: "#0b6e4f",
  title: "Chat with us",
  greeting: "Hi! How can I help?",
};
</script>
<script src="https://cdn.yoursite.com/chatwidget.js" defer></script>
```

### Via script tag

Same as above — paste into your HTML before `</body>`.

## Configuration

| Option         | Type     | Default               | Description                      |
|----------------|----------|-----------------------|----------------------------------|
| `endpoint`     | `string` | `""`                  | **Required.** Your backend URL   |
| `primaryColor` | `string` | `"#0b6e4f"`           | Brand colour (hex)               |
| `title`        | `string` | `"Chat with us"`      | Panel header text                |
| `greeting`     | `string` | `"Hi there! How..."`  | Bot's initial message            |
| `position`     | `string` | `"right"`             | `"left"` or `"right"`           |
| `bubbleSize`   | `number` | `60`                  | Bubble diameter in px            |
| `zIndex`       | `number` | `2147483647`          | Widget z-index                   |
| `placeholder`  | `string` | `"Type a message…"`   | Input placeholder text           |

## Backend Contract

The widget sends:

```
POST <endpoint>
Content-Type: application/json

{
  "messages": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi there!" },
    { "role": "user", "content": "What's your name?" }
  ]
}
```

Your backend should return:

```json
{ "reply": "I'm your helpful assistant!" }
```

The widget also checks for `message` and `content` keys as fallbacks.

## Project Structure

```
src/
├── main.tsx                 # Entry — Shadow DOM mount & config
├── vite-env.d.ts            # Type declarations
├── components/
│   ├── Widget.tsx           # Root component
│   ├── ChatBubble.tsx       # Floating action button
│   ├── ChatPanel.tsx        # Chat window container
│   ├── ChatHeader.tsx       # Panel header bar
│   ├── ChatInput.tsx        # Auto-resizing textarea + send
│   ├── MessageBubble.tsx    # Individual message bubble
│   ├── MessageList.tsx      # Scrollable message container
│   ├── TypingIndicator.tsx  # Bouncing dots
│   ├── Icons.tsx            # SVG icon components
│   └── index.ts             # Barrel export
├── hooks/
│   ├── useChat.ts           # Chat state + API communication
│   └── index.ts
├── types/
│   ├── config.ts            # WidgetConfig interface + defaults
│   └── index.ts
└── styles/
    └── widget.css           # Base styles (injected into Shadow DOM)
```

## Tech Stack

- **Preact** — 3KB React alternative (JSX, hooks, components)
- **TypeScript** — Full type safety
- **Vite** — Dev server with HMR + library-mode build
- **Shadow DOM** — CSS isolation from host page
- **Zero runtime deps** — Just Preact

## Extending

Each component is independently importable. To add features:

- **Markdown support** — Add a lightweight renderer in `MessageBubble.tsx`
- **Streaming** — Swap `fetch` for `EventSource`/SSE in `useChat.ts`
- **Theming** — Add CSS custom properties to `widget.css`
- **Lead capture** — Add a pre-chat form component before `MessageList`
- **Persistence** — Store messages in `localStorage` in `useChat.ts`
