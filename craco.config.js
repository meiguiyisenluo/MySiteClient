/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
    devServer: {
        https: true
    },
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
}
