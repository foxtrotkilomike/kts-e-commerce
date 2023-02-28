const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require('path');

module.exports = {
  "stories": [
    "../src/components/**/*.stories.mdx",
    "../src/components/**/*.stories.ts",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../tsconfig.paths.json"),
      }),
    ];
    return config;
  },
}
