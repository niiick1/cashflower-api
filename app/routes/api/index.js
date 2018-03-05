const Router = require('express').Router,
  getHomeAPI = require('../../api/home'),

  getTransactionRouter = require('./transaction')

module.exports = ({ store }) => {
  const router = Router(),
    homeAPI = getHomeAPI()

  router.get('/', homeAPI.getVersion)

  router.use('/transaction', getTransactionRouter({ store }))

  return router
}
