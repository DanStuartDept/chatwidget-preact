/**
 * Mock response service for development and demo use.
 *
 * Returns random paragraphs with a simulated network delay.
 * No real AI — just plausible-looking text for UI testing.
 */

const MOCK_PARAGRAPHS = [
  "That's a great question. Let me walk you through how this works. The system is designed to handle multiple concurrent requests while maintaining state consistency across sessions. Each request is processed independently, but shares a common context window.",

  "I'd recommend starting with the documentation for the core API. It covers authentication, rate limiting, and the basic request/response lifecycle. Once you're comfortable with those concepts, the advanced features like streaming and webhooks will make a lot more sense.",

  "Here's what I found: the issue seems to be related to how the cache invalidation is handled during deployments. When the CDN edge nodes receive a purge request, there's a brief window where stale content can still be served. The typical workaround is to use versioned asset URLs.",

  "Absolutely, I can help with that. There are a few different approaches depending on your requirements. For most use cases, the standard integration takes about 15 minutes to set up. If you need custom event tracking or advanced segmentation, you'll want to look at the enterprise SDK instead.",

  "The short answer is yes, but with some caveats. Performance will depend heavily on the size of your dataset and how frequently the underlying data changes. For datasets under 100k records, you should see sub-second response times. Beyond that, you'll want to consider implementing pagination or cursor-based fetching.",

  "Good news — that feature shipped last week. You can enable it in your dashboard under Settings → Integrations → Advanced. There's a toggle for the beta programme that gives you early access to upcoming features as well.",

  "I've looked into this and there are three main options to consider. The first is the most straightforward but has some limitations around customisation. The second gives you full control but requires more setup time. The third is somewhere in between — it uses sensible defaults but lets you override specific behaviours when needed.",

  "Based on what you've described, I think the issue might be simpler than it appears. Have you checked whether the environment variables are being loaded correctly? A common gotcha is that the .env file needs to be in the project root, not in the src directory. Also worth checking that you're using the right prefix for client-side variables.",

  "That's actually one of the most common questions we get. The pricing model is based on usage, so you only pay for what you consume. There's a generous free tier that covers most hobby projects and early-stage startups. Once you exceed those limits, it scales linearly with no surprise jumps.",

  "Let me break this down step by step. First, you'll need to set up the authentication flow. This typically involves generating an API key, configuring your redirect URIs, and setting the appropriate scopes. The whole process usually takes about 10 minutes if you have your domain already configured.",

  "I've seen this pattern before in similar projects. The key insight is that you don't actually need real-time updates for this use case — near real-time with a 2-3 second delay is usually perfectly acceptable, and it dramatically simplifies the architecture. You can use server-sent events instead of WebSockets, which eliminates the need for sticky sessions.",

  "Happy to explain. The way it works is that each request goes through a middleware pipeline before reaching your handler. You can add custom middleware at any point in the chain, which makes it easy to add things like logging, rate limiting, or request validation without modifying your core business logic.",
];

const MOCK_SHORT = [
  "Got it, let me look into that for you.",
  "That makes sense. Here's what I'd suggest.",
  "Sure thing — give me a moment.",
  "Great question!",
  "I can definitely help with that.",
  "Let me check on that.",
];

/** Pick a uniformly random element from a non-empty array. */
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Return a random delay in milliseconds (400–1400 ms) to simulate network latency. */
function randomDelay(): number {
  // 400ms–1400ms to feel realistic
  return 400 + Math.random() * 1000;
}

/**
 * Returns a mock response: sometimes short, sometimes multi-paragraph.
 * The distribution roughly mirrors real chat — mostly medium responses
 * with occasional short and long ones.
 */
export async function getMockResponse(): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, randomDelay()));

  const roll = Math.random();

  // 20% chance: short one-liner
  if (roll < 0.2) {
    return pickRandom(MOCK_SHORT);
  }

  // 50% chance: single paragraph
  if (roll < 0.7) {
    return pickRandom(MOCK_PARAGRAPHS);
  }

  // 30% chance: 2-3 paragraphs
  const count = Math.random() < 0.5 ? 2 : 3;
  const shuffled = [...MOCK_PARAGRAPHS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).join("\n\n");
}
