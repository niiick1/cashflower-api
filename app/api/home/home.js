const version = require('../../../package.json').version

module.exports = () => ({
  getVersion() {
    return { version }
  }
})
