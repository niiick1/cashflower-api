const assert = require('chai').assert,
  httpMocks = require('node-mocks-http'),
  sinon = require('sinon'),

  notFoundHandler = require('./not-found-handler')

describe('Not Found Handler Middleware', () => {
  it('Should forward a Not Found error', () => {
    const req = httpMocks.createRequest(),
      res = httpMocks.createResponse(),
      next = sinon.spy()

    notFoundHandler(req, res, next)

    assert.isTrue(next.calledOnce)

    const argument = next.getCall(0).args[0]

    assert.instanceOf(argument, Error)
    assert.strictEqual(argument.message, 'Not Found')
    assert.strictEqual(argument.status, 404)
  })
})
