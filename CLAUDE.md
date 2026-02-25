# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install          # Install dependencies (pnpm is required — enforced by preinstall script)
pnpm dev              # Start Vite dev server with HMR at localhost:5173
pnpm build            # Type-check (tsc) then build → dist/chatwidget.js
pnpm preview          # Preview production build locally
```

No test framework is configured.

## Architecture

This is an embeddable chat widget that builds to a single IIFE JS file (~10KB gzipped). It renders inside **Shadow DOM** for full CSS isolation from the host page.

### Entry & Mounting (`src/main.tsx`)

On DOMContentLoaded, creates a host `<div>`, attaches a Shadow DOM, injects styles from `widget.css`, reads config from `window.ChatWidgetConfig`, sets CSS custom properties (`--cw-primary`, `--cw-z`), and renders the Preact component tree into the shadow root.

### Component Tree

```
Widget (open/close state)
├── ChatPanel (chat window — positioned left/right per config)
│   ├── ChatHeader (title + pulse indicator)
│   ├── MockBanner (shown when mock mode active)
│   ├── MessageList (scrollable, auto-scrolls to bottom)
│   │   ├── MessageBubble[] (user/assistant variants)
│   │   └── TypingIndicator (bouncing dots while loading)
│   └── ChatInput (auto-resizing textarea, Enter to send)
└── ChatBubble (floating action button, toggles panel)
```

### Core Hook: `useChat` (`src/hooks/useChat.ts`)

Manages messages state, loading state, and API communication. Supports two modes:
- **Real mode**: POSTs `{ messages: [{role, content}...] }` to the configured endpoint; expects `{ reply }` (falls back to `message` or `content` keys)
- **Mock mode**: Uses `src/services/mockResponses.ts` with simulated delay. Activated when `mockMode: true` or `mockMode: "auto"` with no endpoint set.

Supports request cancellation via AbortController.

### Configuration (`src/types/config.ts`)

`WidgetConfig` interface with options: `endpoint`, `primaryColor`, `title`, `greeting`, `position`, `bubbleSize`, `zIndex`, `placeholder`, `mockMode`. Defaults defined in `DEFAULT_CONFIG`.

### Styling (`src/styles/widget.css`)

All styles scoped to the shadow root via CSS custom properties prefixed `--cw-*`. Font is DM Sans (loaded from Google Fonts). Animations: `cw-fadeIn`, `cw-pulse`, `cw-bounce`.

### Build Output

Vite library mode produces a single IIFE bundle (`dist/chatwidget.js`) with CSS inlined and Terser minification. Path alias `@/*` maps to `src/*`.
