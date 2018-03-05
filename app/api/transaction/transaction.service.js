const Transaction = require('./transaction'),
  moment = require('moment')

const allowedFieldsOnUpdate = {
  _id: false,
  __v: false,
  createdat: false,
  description: true,
  amount: true,
  paymenttype: true
}

module.exports = () => ({
  add(transaction) {
    var trasactionToAdd = new Transaction(transaction)

    return trasactionToAdd.save()
  },

  find(searchParams, pagination, sort = {}) {
    let { paymentType, startDate, endDate } = searchParams,
      criteria = {}

    if (paymentType) {
      criteria.paymentType = paymentType
    }

    if (startDate || endDate) {
      criteria.createdAt = {}

      startDate = moment(parseInt(startDate, 10))
      endDate = moment(parseInt(endDate, 10))

      if (startDate.isValid()) {
        criteria.createdAt.$gte = startDate.toDate()
      }

      if (endDate.isValid()) {
        criteria.createdAt.$lte = endDate.toDate()
      }
    }

    return Transaction.find(criteria, null, Object.assign({}, {
      sort,
      limit: pagination.limit,
      skip: pagination.skip
    }))
  },

  update(id, updatedTransaction) {
    const updateOptions = {
      runValidators: true,
      new: true
    }

    const fieldsToUpdate = Object.keys(updatedTransaction)
      .filter(field => allowedFieldsOnUpdate[field.toLowerCase()])

    const transactionToUpdate = fieldsToUpdate.reduce((transaction, field) => {
      transaction[field] = updatedTransaction[field]
      return transaction
    }, {})

    return Transaction.findOneAndUpdate({
      _id: id
    }, transactionToUpdate, updateOptions)
  },

  remove(id) {
    return Transaction.deleteOne({
      _id: id
    })
  },

  count() {
    return Transaction.count()
  }
})
