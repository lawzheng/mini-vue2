module.exports = {
  devServer: {
    open: true, // 设置自动打开
    port: 8080, // 设置端口
    host: '127.0.0.1' // 解决websocket自动断开问题
  }
}
