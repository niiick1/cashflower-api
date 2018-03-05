const express = require('express'),
  routeLogger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  debug = require('debug'),

  connectToDatabase = require('./config/database/database'),
  errorHandler = require('./config/middleware/error-handler'),
  notFoundHandler = require('./config/middleware/not-found-handler'),

  api = require('./routes/api')

module.exports = () => {
  const app = express(),
    logger = debug('cashflower-api:app')

  if (process.env.NODE_ENV !== 'test') {
    app.use(routeLogger('dev'))
  }

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())

  return connectToDatabase().then(store => {
    app.use('/api', api({ store }))

    app.use(notFoundHandler)

    app.use(errorHandler)

    return app
  }).catch(error => {
    logger('Failed to start the application due to %O', error)
    process.exit(1)
  })
}
