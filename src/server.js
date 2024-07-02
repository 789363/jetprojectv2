const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 配置代理規則
app.use('/api', createProxyMiddleware({
    target: 'http://10.7.21.251:5072', // 目標 API 的基底 URL
    changeOrigin: true, // 為 true 則本地服務會表現得像代理，並且會改變原始主機頭到目標 URL
    pathRewrite: {'^/api' : ''}, // 重寫 URL 路徑（這裡將 '/api' 去掉）
    logLevel: 'debug' // 顯示代理日誌資訊
}));

// 設定伺服器監聽的端口
const PORT = process.env.PORT || 3002; // 使用環境變數指定的端口或默認3002端口
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
