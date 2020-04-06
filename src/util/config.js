if (typeof window === "undefined") {
  /**
   * Settings exposed to the server.
   */
  module.exports = {
    CONVERT_KIT_API_KEY: process.env.CONVERT_KIT_API_KEY,
  };
} else {
  /**
   * Settings exposed to the client.
   */
  module.exports = {};
}
