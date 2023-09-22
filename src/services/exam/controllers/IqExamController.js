const asyncHandler = require('express-async-handler')
const { IqExamQuestion } = require('../models/ChoiceQuestion')
const { IqExamAnswer } = require('../models/ChoiceAnswer')

const viewQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params

  const question = await IqExamQuestion.findOne({ questionId }).lean().exec()
  if(!question){
    return res.status(404).send('Question not found')
  }
  res.status(200).json(question)
})

const getQuestions = asyncHandler(async (req, res) => {
  const { userId } = req.params

  const already = await IqExamAnswer.findOne({ userId }).lean().exec()
  if(already){
    if(already.editable){
      return res.status(200).json(already)
    }
    else {
      return res.status(409).json('Answer has been submited')
    }
  }

  const questionSet = Math.floor(Math.random() * 3) // random question set
  let queryQuestions = await IqExamQuestion.find({ questionSet }).lean()
  const date = new Date()

  const questions = await IqExamAnswer.create({
    userId,
    editable: true,
    recentlyIndex: 0,
    timestamp: date,
    answers: queryQuestions
      .sort((a, b) => (0.5 - Math.random())) // shuffle questions
      .map(({ questionId }) => ({ questionId, text: '', score: 0 })), // set default value
    score: 0
  })
  if(questions){
    res.status(201).json(questions)
  }
  else {
    res.status(400).send('Failed to create questions')
  }
})

const saveAnswers = asyncHandler(async (req, res) => {
  const { userId } = req.params
  const { answers, recentlyIndex, timestamp } = req.body

  const answer = await IqExamAnswer.findOneAndUpdate({ userId, editable: true }, { answers, recentlyIndex, timestamp }).lean().exec()
  if(!answer){
    return res.status(404).send('Answer not found')
  }
  res.status(200).send('Successful answer save')
})

const submitAnswers = asyncHandler(async (req, res) => {
  const { userId } = req.params

  const answer = await IqExamAnswer.findOneAndUpdate({ userId, editable: true }, { editable: false }).lean().exec()
  if(!answer){
    return res.status(404).send('Answer not found')
  }
  res.status(200).send('Successful answer submit')
})

module.exports = {
  viewQuestion,
  getQuestions,
  saveAnswers,
  submitAnswers
}