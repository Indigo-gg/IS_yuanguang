module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title= '信息检索系统'
                return args
            })
    }
}
