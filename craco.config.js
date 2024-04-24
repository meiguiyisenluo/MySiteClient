/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
    devServer: {
        proxy: {
            '/clientApi': {
                target: 'https://localhost:3000',
                pathRewrite: {
                    '^/clientApi': ''
                },
                secure: false
            }
        }
    },
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
}
