const statuses = require('statuses')

module.exports = (err, req, res, next) => {
  let status = err.status || err.statusCode || 500

  if (status < 400) {
    status = 500
  }

  res.status(status)

  let body = {
    status
  }

  // Show stack trace when not in production
  if (req.app.get('env') !== 'production') {
    body.stack = err.stack
  }

  body.message = status >= 500
    ? statuses[status]
    : err.message

  res.json(body)
}
