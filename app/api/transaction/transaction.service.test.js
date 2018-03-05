const assert = require('chai').assert,
  sinon = require('sinon'),

  transactionService = require('./transaction.service')(),
  Transaction = require('./transaction')

describe('Transaction Service', () => {
  let saveStub

  afterEach(() => {
    if (saveStub) {
      saveStub.restore()
    }
  })

  it('Should add a transaction', () => {
    const transaction = {
        description: 'Transaction #1',
        amount: 300,
        paymentType: 'credit'
      },

      expectedTransaction = Object.assign({
        createdAt: 1520191368
      }, transaction)

    saveStub = sinon.stub(Transaction.prototype, 'save')
      .returns(Promise.resolve(expectedTransaction))

    return transactionService.add(transaction)
      .then(newTransaction => {
        assert.deepEqual(newTransaction, expectedTransaction)
        assert.isTrue(saveStub.calledOnce)
      })
  })

  describe('Find Transactions', () => {
    let findStub

    afterEach(() => {
      if (findStub) {
        findStub.restore()
      }
    })

    it('Should find transactions', () => {
      const transactions = [
          {
            description: 'Transaction #1',
            amount: 300,
            paymentType: 'credit'
          },
          {
            description: 'Transaction #3',
            amount: 500,
            paymentType: 'credit'
          }
        ],

        searchParams = {
          paymentType: 'credit'
        }

      findStub = sinon.stub(Transaction, 'find')
        .returns(Promise.resolve(transactions))

      return transactionService.find(searchParams, {}, {})
        .then(results => {
          assert.isTrue(findStub.calledWith(searchParams), 'Find method was called with incorrect arguments')
          assert.strictEqual(results.length, 2)
        })
    })
  })
})
