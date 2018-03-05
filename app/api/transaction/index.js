const transactionService = require('./transaction.service')()

module.exports = () => ({
  add(req, res, next) {
    const transactionToAdd = req.body

    return transactionService.add(transactionToAdd)
      .then(newTransaction => {
        res.json(newTransaction)
      })
      .catch(next)
  },

  find(req, res, next) {
    const { query, skip } = req,
      { page, limit, sort } = query,

      pagination = {
        page,
        limit,
        skip
      }

    return transactionService.find(query, pagination, sort)
      .then(transactions => {
        res.json(transactions)
      })
      .catch(next)
  },

  update(req, res, next) {
    const transactionToUpdate = req.body

    transactionToUpdate._id = req.params.id

    return transactionService.update(transactionToUpdate._id, transactionToUpdate)
      .then(transaction => {
        res.send(transaction)
      })
      .catch(next)
  },

  remove(req, res, next) {
    return transactionService.remove(req.params.id)
      .then(result => {
        if (result.ok) {
          res.sendStatus(204)
        } else {
          next(result)
        }
      })
      .catch(next)
  },

  count(req, res, next) {
    return transactionService.count()
      .catch(next)
  }
})
