const withSass = require("@zeit/next-sass");
const dotenv = require("dotenv");
dotenv.config();

let nextConfig = withSass({
  env: {
    CONVERT_KIT_API_KEY: process.env.CONVERT_KIT_API_KEY,
  },
});

// You can pass nextConfig to another plugin, for example:
//nextConfig = withMdx(nextConfig)

module.exports = nextConfig;
