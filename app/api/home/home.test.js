const assert = require('chai').assert,

  getHomeService = require('./home'),
  apiVersion = require('../../../package.json').version

describe('Home Service', () => {
  it('Should retrieve the package.json version', () => {
    const homeService = getHomeService(),
      { version } = homeService.getVersion()

    assert.strictEqual(version, apiVersion)
  })
})
