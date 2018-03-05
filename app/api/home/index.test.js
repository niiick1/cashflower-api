const assert = require('chai').assert,
  sinon = require('sinon'),
  httpMocks = require('node-mocks-http'),

  getHomeAPI = require('./')

describe('Home API', () => {
  describe('Get Version', () => {
    it('Should return a JSON response', () => {
      const homeAPI = getHomeAPI(),
        req = httpMocks.createRequest(),
        res = httpMocks.createResponse(),
        resJsonSpy = sinon.spy(res, 'json')

      homeAPI.getVersion(req, res)

      assert.isTrue(resJsonSpy.calledOnce)
    })
  })
})
