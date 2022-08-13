const { createProxyMiddleware } = require("http-proxy-middleware");

const router = {
  "/api/": "https://allchains-api.ecokera.com",
};

module.exports = function (app) {
  app.use(
    "/api/",
    createProxyMiddleware({
      target: "https://allchains-api.ecokera.com",
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        "^/api/": "",
      },
      router,
      logLevel: "debug",
    })
  );
};
