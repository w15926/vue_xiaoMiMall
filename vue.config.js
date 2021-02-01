module.exports = {
  devServer: {
    host: 'localhost',
    prot: 8080,
    // 代理
    proxy: {
      'api': {
        target: 'https://www.imocc.com',
        changeOrigin: true,
        pathRewrite: {
          'api': ''
        }
      }
    }
  }
}