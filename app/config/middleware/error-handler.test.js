const assert = require('chai').assert,
  sinon = require('sinon'),
  httpMocks = require('node-mocks-http'),
  statuses = require('statuses'),

  errorHandler = require('./error-handler')

describe('Error Handler Middleware', () => {
  let req,
    res

  beforeEach(() => {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()

    // Mock express app inside request
    req.app = {
      get() {}
    }
  })

  it('Should return a 500 Error response', () => {
    errorHandler(new Error(), req, res)

    const body = JSON.parse(res._getData())

    assert.isTrue(res._isJSON())

    assert.strictEqual(res.statusCode, 500)

    assert.strictEqual(body.status, 500)
    assert.strictEqual(body.message, 'Internal Server Error')
    assert.isDefined(body.stack)
  })

  it('Should set status with received error status', () => {
    const errorCode = 403,
      error = new Error('Oops')

    error.status = errorCode

    errorHandler(error, req, res)

    const body = JSON.parse(res._getData())

    assert.strictEqual(res.statusCode, errorCode)
    assert.strictEqual(body.status, errorCode)
  })

  it('Should set status to 500 when receiving a non-error status code', () => {
    const error = new Error('Oops')

    error.status = 200

    errorHandler(error, req, res)

    assert.strictEqual(res.statusCode, 500)
  })

  it('Should display the Error\'s message when status < 500', () => {
    const message = 'You don\'t have permissions to access this resource',
      error = new Error(message)

    error.status = 403

    errorHandler(error, req, res)

    const body = JSON.parse(res._getData())

    assert.strictEqual(body.message, message)
  })

  it('Should override the Error\'s message when status >= 500', () => {
    const message = 'Really bad problem happened',
      error = new Error(message)

    error.status = 503

    errorHandler(error, req, res)

    const body = JSON.parse(res._getData()),
      errorStatusMessage = statuses[error.status]

    assert.notStrictEqual(message, errorStatusMessage)
    assert.strictEqual(body.message, errorStatusMessage)
  })

  it('Should not display the stack trace when in production environment', () => {
    let appGetStub = sinon.stub(req.app, 'get')
      .withArgs('env').returns('production')

    errorHandler(new Error(), req, res)

    const body = JSON.parse(res._getData())

    assert.strictEqual(res.statusCode, 500)
    assert.isUndefined(body.stack)

    appGetStub.resetBehavior()
  })
})
