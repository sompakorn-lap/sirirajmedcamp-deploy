const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
  userId: String,
  applicantSurname: String,
  transferorSurname: String,
  bank: String,
  acccountId: String,
  transactionId: String
})

const Transaction = mongoose.model('transaction', transactionSchema)

module.exports = Transaction