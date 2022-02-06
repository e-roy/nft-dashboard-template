const webpack = require("webpack");
const path = require("path");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    util: require.resolve("util"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify/browser"),
    // url: require.resolve("url"),
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      "@": path.resolve(__dirname, "./src"),
    },
  };
  config.ignoreWarnings = [/Failed to parse source map/];
  return config;
};
