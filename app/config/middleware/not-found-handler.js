// Catch 404 errors and forward to next handler
module.exports = (req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
}
