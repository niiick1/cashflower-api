const mongoose = require('mongoose')

const TransactionSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentType: {
    type: String,
    required: true,
    enum: ['credit', 'money']
  }
})

module.exports = mongoose.model('Transaction', TransactionSchema)
