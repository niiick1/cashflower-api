const chai = require('chai'),
  assert = chai.assert,
  Transaction = require('./transaction')

describe('Transaction Model', () => {
  it('Should be invalid if description is empty', () => {
    const transaction = new Transaction()

    return transaction.validate()
      .then(() => assert.fail(undefined, undefined, 'Transaction was created without description'),
        ({ errors }) => {
          assert.exists(errors.description)
        })
  })

  it('Should be invalid if amount is empty', () => {
    const transaction = new Transaction({
      description: 'Transaction #1'
    })

    return transaction.validate()
      .then(() => assert.fail(undefined, undefined, 'Transaction was created without an amount'),
        ({ errors }) => {
          assert.exists(errors.amount)
        })
  })

  describe('Payment Type Validation', () => {
    it('Should be invalid if paymentType is empty', () => {
      const transaction = new Transaction({
        description: 'Transaction #1',
        amount: 100
      })

      return transaction.validate()
        .then(() => assert.fail(undefined, undefined, 'Transaction was created without paymentType'),
          ({ errors }) => {
            assert.exists(errors.paymentType)
          })
    })

    it('Should be invalid if paymentType is not credit or money', () => {
      const transaction = new Transaction({
        description: 'Transaction #1',
        amount: 100,
        paymentType: 'invalid'
      })

      return transaction.validate()
        .then(() => assert.fail(undefined, undefined, `Transaction was created with invalid paymentType: '${transaction.paymentType}'. paymentType must be 'credit' or 'money'`),
          ({ errors }) => {
            assert.exists(errors.paymentType)
          })
    })
  })
})
