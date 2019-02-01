const path = require('path')

// this file is for WebStorm webpack loader which can display correct code highlighting
module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../', 'src/'),
      'config': path.resolve(__dirname, '../', 'config.js')
    }
  }
}
