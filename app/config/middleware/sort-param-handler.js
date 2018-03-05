function isSortedDescending(sortOption) {
  return sortOption[0] === '-'
}

function parseSortOptions(sortOptions) {
  let sort = {}

  if (sortOptions) {
    sortOptions = sortOptions.split(',')

    if (Array.isArray(sortOptions)) {
      sort = sortOptions.reduce((sort, sortOption) => {
        const sortedField = sortOption.replace(/^-/, '')

        sort[sortedField] = isSortedDescending(sortOption) ? -1 : 1

        return sort
      }, {})
    }
  }

  return sort
}

module.exports = (req, res, next) => {
  req.query.sort = parseSortOptions(req.query.sort)

  next()
}
