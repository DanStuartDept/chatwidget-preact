import type { StorybookConfig } from "@storybook/preact-vite";
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
  stories: ["../src/stories/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    {
      name: "@storybook/addon-mcp",
      options: {
        toolsets: {
          dev: true,
          docs: true,
        },
      },
    },
  ],
  framework: "@storybook/preact-vite",
};

export default config;
