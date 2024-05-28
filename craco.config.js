/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
    devServer: {
        port: 8000,
        https: true,
        proxy: {
            '/clientApi': {
                // target: 'http://localhost:3000',
                target: 'https://luoyisen.com:3000',
                pathRewrite: {
                    '^/clientApi': ''
                },
                secure: false
            },
            '/share': {
                target: 'https://luoyisen.com',
                secure: false
            }
        }
    },
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        configure(config) {
            config.devtool = false
            return config
        }
    }
}
