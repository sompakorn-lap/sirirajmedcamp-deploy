const asyncHandler = require('express-async-handler')
const Questionnaire = require('../models/Questionnaire')

const createQuestionnaire = asyncHandler(async (req, res) => {
  const { userId } = req.params

  const duplicate = await Questionnaire.findOne({ userId }).lean().exec()
  if(duplicate){
    return res.status(409).send('Duplicate questionnaire')
  }

  const { answers } = req.body

  const questionnaire = await Questionnaire.create({
    userId,
    answers
  })

  if(questionnaire){
    res.status(200).send('Successful questionnaire create')
  }
  else {
    res.status(400).send('Failed to create questionnaire')
  }
})

module.exports = {
  createQuestionnaire
}