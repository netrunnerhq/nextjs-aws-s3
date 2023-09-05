// const webpack = require("webpack");

const config = {
  reactStrictMode: true,
  // webpack: (config, { isServer, nextRuntime }) => {
  //   // Avoid AWS SDK Node.js require issue
  //   if (isServer && nextRuntime === "nodejs")
  //     config.plugins.push(
  //       new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ })
  //     );
  //   return config;
  // },
};

module.exports = config;
