const mongoose = require('mongoose')

const WritingQuestionSchema = mongoose.Schema({
  questionId: String,
  questionSet: Number,
  text: String,
  image: String,
  choices: [{
    text: String,
    score: Number
  }]
})

const IqExamQuestion = mongoose.model('iq-exam-question', WritingQuestionSchema)
const EthicExamQuestion = mongoose.model('ethic-exam-question', WritingQuestionSchema)
const SirirajExamQuestion = mongoose.model('siriraj-exam-question', WritingQuestionSchema)

module.exports = {
  IqExamQuestion,
  EthicExamQuestion,
  SirirajExamQuestion
}