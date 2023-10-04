const asyncHandler = require('express-async-handler')
const Transaction = require('../models/Transaction')
const { uploadFile } = require('../libs/FileLib')

const createTransaction = asyncHandler(async (req, res) => {
  const { userId } = req.params

  const duplicate = await Transaction.findOne({ userId }).lean().exec()
  if(duplicate){
    return res.status(409).send('Duplicate transaction')
  }

  const { applicantSurname, transferorSurname, bank, accountId } = req.body
  const transactionFile = await uploadFile(req.body.transaction)

  const transaction = await Transaction.create({
    userId,
    applicantSurname,
    transferorSurname,
    bank,
    accountId,
    transactionId: transactionFile.fileId,
  })

  if(transaction){
    res.status(200).send('Successful transaction create')
  }
  else {
    res.status(400).send('Failed to create transaction')
  }
})

const findTransaction = asyncHandler(async (req, res) => {
  const { userId } = req.params

  const transaction = await Transaction.findOne({ userId }).lean().exec()
  if(!transaction){
    return res.status(404).send('Transaction not found')
  }
  res.status(200).json(transaction)
})

module.exports = {
  createTransaction,
  findTransaction
}