const path = require('path')
const alias = {
    'components': path.resolve(__dirname, '../src/components'),
    'containers': path.resolve(__dirname, '../src/containers'),
    'store': path.resolve(__dirname, '../src/store'),
    'utils': path.resolve(__dirname, '../src/utils'),
    'assets': path.resolve(__dirname, '../src/assets')
}
module.exports = alias
