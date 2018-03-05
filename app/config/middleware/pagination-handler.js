const paginate = require('express-paginate'),
  paginationLinksAppender = require('./pagination-links-appender')

module.exports = getTotalRecordsService => (req, res, next) => {
  paginate.middleware(1, 100)(req, res, error => {
    if (error) {
      next(error)
    }

    paginationLinksAppender(getTotalRecordsService)(req, res, next)
  })
}
