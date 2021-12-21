module.exports = {
  devServer: {
    port: 3000,
    proxy: {
      "/sso": {
        target: "http://localhost:8082",
        pathRewrite: {
          "^/sso": ""
        }
      },

      "/api": {
        target: "http://localhost:8081",
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
