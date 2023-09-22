const mongoose = require('mongoose')

const ChoiceAnswerSchema = mongoose.Schema({
  userId: String,
  editable: Boolean,
  recentlyIndex: Number,
  answers: [{
    questionId: String,
    timestamp: Date,
    text: String,
    score: Number
  }],
  score: Number
})

const IqExamAnswer = mongoose.model('iq-exam-answer', ChoiceAnswerSchema)
const EthicExamAnswer = mongoose.model('ethic-exam-answer', ChoiceAnswerSchema)
const SirirajExamAnswer = mongoose.model('siriraj-exam-answer', ChoiceAnswerSchema)

module.exports = {
  IqExamAnswer,
  EthicExamAnswer,
  SirirajExamAnswer
}