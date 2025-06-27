const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use('/callback', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: { '^/': '' }
}));

app.use('/physical', createProxyMiddleware({
    target: 'http://localhost:3002',
    changeOrigin: true,
    pathRewrite: { '^/physical': '' }
}));

app.listen(3000, () => console.log("Proxy server running on port 3000"));
