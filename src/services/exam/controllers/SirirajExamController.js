const asyncHandler = require('express-async-handler')
const { SirirajExamQuestion } = require('../models/ChoiceQuestion')
const { SirirajExamAnswer } = require('../models/ChoiceAnswer')
const { ChoiceExamGrader } = require('../../../libs/ExamLib')

const viewQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params

  const question = await SirirajExamQuestion.findOne({ questionId }).lean().exec()
  if(!question){
    return res.status(404).send('Question not found')
  }
  res.status(200).json(question)
})

const getQuestions = asyncHandler(async (req, res) => {
  const { userId } = req.params

  const already = await SirirajExamAnswer.findOne({ userId }).select('-choices.score').lean().exec()
  if(already){
    if(already.editable){
      return res.status(200).json(already)
    }
    else {
      return res.status(409).json('Answer has been submited')
    }
  }

  const questionSet = Math.floor(Math.random() * 3) // random question set
  let queryQuestions = await SirirajExamQuestion.find({ questionSet }).lean()

  const questions = await SirirajExamAnswer.create({
    userId,
    editable: true,
    recentlyIndex: 0,
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
  const { answers, recentlyIndex } = req.body

  const answer = await SirirajExamAnswer.findOneAndUpdate({ userId, editable: true }, { answers, recentlyIndex }).lean().exec()
  if(!answer){
    return res.status(404).send('Answer not found')
  }
  res.status(200).send('Successful answer save')
})

const submitAnswers = asyncHandler(async (req, res) => {
  const { userId } = req.params

  const answer = await SirirajExamAnswer.findOne({ userId, editable: true })
  if(!answer){
    return res.status(404).send('Answer not found')
  }
  const result = await ChoiceExamGrader(answer.answers, SirirajExamQuestion)
  answer.answers = result
  answer.editable = false
  answer.score = result.reduce((sum, item) => (sum + item.score), 0)
  await answer.save()
  res.status(200).send('Successful answer submit')
})

module.exports = {
  viewQuestion,
  getQuestions,
  saveAnswers,
  submitAnswers
}