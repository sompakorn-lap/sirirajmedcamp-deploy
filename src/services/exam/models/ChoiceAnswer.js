const mongoose = require('mongoose')

const WritingAnswerSchema = mongoose.Schema({
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

const IqExamAnswer = mongoose.model('iq-exam-answer', WritingAnswerSchema)
const EthicExamAnswer = mongoose.model('ethic-exam-answer', WritingAnswerSchema)
const SirirajExamAnswer = mongoose.model('siriraj-exam-answer', WritingAnswerSchema)

module.exports = {
  IqExamAnswer,
  EthicExamAnswer,
  SirirajExamAnswer
}