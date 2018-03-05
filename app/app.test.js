const assert = require('chai').assert,
  sinon = require('sinon'),
  proxyquire = require('proxyquire'),
  request = require('supertest'),

  config = require('../package.json')

const fakeDatabase = () => Promise.resolve({})

const configureApp = proxyquire('./app', {
  './config/database/database': fakeDatabase
})

describe('Express Server', () => {
  it('Should expose an /api endpoint with the application version', () => {
    return configureApp().then(app => request(app)
      .get('/api')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        assert.strictEqual(response.body.version, config.version)
      })
    )
  })

  it('Should return 404 when acessing an inexistent route', () => {
    return configureApp().then(app => request(app)
      .get('/inexistent')
      .expect('Content-Type', /json/)
      .expect(404)
    )
  })

  it('Should terminate the app if it fails to connect to the database', () => {
    const failingDatabaseStub = sinon.stub().returns(Promise.reject(new Error())),
      processExitStub = sinon.stub(process, 'exit'),

      configureApp = proxyquire('./app', {
        './config/database/database': failingDatabaseStub
      }),

      appPromise = configureApp()

    return appPromise.catch(e => e)
      .then(() => {
        assert.isTrue(processExitStub.calledOnce, 'process.exit() was not called')
        assert.isTrue(processExitStub.calledWith(1))

        failingDatabaseStub.resetBehavior()
        processExitStub.resetBehavior()
      })
  })
})
