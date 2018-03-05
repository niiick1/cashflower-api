const assert = require('chai').assert,
  sinon = require('sinon'),
  httpMocks = require('node-mocks-http'),
  proxyquire = require('proxyquire')

describe('Transaction API', () => {
  describe('Add Transaction', () => {
    it('Should return a JSON response with the new object', () => {
      const sampleTransaction = {
          description: 'Transaction #1',
          amount: 300,
          paymentType: 'credit'
        },

        savedTransaction = Object.assign({
          id: '1',
          createdAt: '2018-03-03T23:50:46.780Z'
        }, sampleTransaction),

        fakeTransactionService = {
          add: sinon.stub().returns(Promise.resolve(savedTransaction))
        },

        transactionAPI = proxyquire('./', {
          './transaction.service': () => fakeTransactionService
        })()

      const req = httpMocks.createRequest(),
        res = httpMocks.createResponse(),
        resJsonSpy = sinon.spy(res, 'json')

      req.body = sampleTransaction

      return transactionAPI.add(req, res)
        .then(() => {
          assert.isTrue(resJsonSpy.calledOnce, 'Did not return a JSON response')
          assert.isTrue(fakeTransactionService.add.calledOnce, 'TransactionService.add was not called')
          assert.deepEqual(resJsonSpy.getCall(0).args[0], savedTransaction, 'Did not return the saved transaction')
        })
    })
  })

  describe('Find Transactions', () => {
    it('Should return a JSON response with all objects', () => {
      const transactions = [
          {
            description: 'Transaction #1',
            amount: 300,
            paymentType: 'credit'
          },
          {
            description: 'Transaction #2',
            amount: 500,
            paymentType: 'money'
          }
        ],

        fakeTransactionService = {
          find: sinon.stub().returns(Promise.resolve(transactions))
        },

        transactionAPI = proxyquire('./', {
          './transaction.service': () => fakeTransactionService
        })()

      const req = httpMocks.createRequest(),
        res = httpMocks.createResponse(),
        resJsonSpy = sinon.spy(res, 'json')

      return transactionAPI.find(req, res)
        .then(() => {
          assert.isTrue(resJsonSpy.calledOnce, 'Did not return a JSON response')
          assert.isTrue(fakeTransactionService.find.calledOnce, 'TransactionService.find was not called')
          assert.deepEqual(fakeTransactionService.find.getCall(0).args[0], {}, 'TransactionService.find arguments are wrong')
          assert.deepEqual(resJsonSpy.getCall(0).args[0], transactions, 'Did not return the found transactions')
        })
    })
  })
})
