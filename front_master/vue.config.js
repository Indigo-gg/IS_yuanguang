// const {baseUrl} = require("@/api/config");
module.exports = {
    publicPath:'/',
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title= '信息检索系统'
                return args
            })
    },
    devServer: {
        // development server port 8000
        port: 9095,
        // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                ws: false,
                changeOrigin: true,
                pathRewrite: { //重写路径 比如'/apis/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': '/api'
                }

            },
        }
    }
}
