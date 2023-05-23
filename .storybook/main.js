const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  'stories': ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  'addons': ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config, { configType }) => {
    config.resolve.plugins = [new TsconfigPathsPlugin()];
    config.module.rules.push({
      test: /\.(scss|sass)$/i,
      use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader'],
    });
    return config;
  },
};
