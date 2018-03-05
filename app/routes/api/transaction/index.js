const Router = require('express').Router,
  paginationHandler = require('../../../config/middleware/pagination-handler'),
  sortHandler = require('../../../config/middleware/sort-param-handler'),

  transactionAPI = require('../../../api/transaction')()

module.exports = ({ store }) => {
  const router = Router()

  router.get('/', paginationHandler(transactionAPI.count), sortHandler, transactionAPI.find)
  router.post('/', transactionAPI.add)
  router.put('/:id', transactionAPI.update)
  router.delete('/:id', transactionAPI.remove)

  return router
}
