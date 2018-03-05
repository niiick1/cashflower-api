const url = require('url')

function getTotalNumberOfPages(totalRecords, recordsPerPage) {
  return Math.ceil(totalRecords / recordsPerPage)
}

function rebuildURL(req, queryObject) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.baseUrl + req.path,
    query: queryObject
  })
}

function formatLink(uri, rel) {
  return `<${uri}>; rel="${rel}"`
}

function buildLinkHeader(req, paginationData, totalRecords) {
  const { page, limit } = paginationData,
    totalPages = getTotalNumberOfPages(totalRecords, limit),

    links = []

  if (page !== 1) {
    const first = {
        page: 1
      },

      prev = {
        page: page - 1
      }

    if (limit) {
      first.limit = limit
      prev.limit = limit
    }

    links.push(formatLink(rebuildURL(req, first), 'first'))
    links.push(formatLink(rebuildURL(req, prev), 'prev'))
  }

  if (page < totalPages) {
    const next = {
        page: page + 1
      },

      last = {
        page: totalPages
      }

    if (limit) {
      next.limit = limit
      last.limit = limit
    }

    links.push(formatLink(rebuildURL(req, next), 'next'))
    links.push(formatLink(rebuildURL(req, last), 'last'))
  }

  return links.join()
}

function getPaginationData(req) {
  const { page, limit } = req.query

  return {page, limit}
}

module.exports = getTotalRecordsService => (req, res, next) => {
  return getTotalRecordsService()
    .then(totalRecords => {
      const links = buildLinkHeader(req, getPaginationData(req), totalRecords)

      res.set('Link', links)

      next()
    })
    .catch(next)
}
