const router = require('express').Router()

router.use('/auth', require('./AuthRoute'))
router.use('/profile', require('./ProfileRoute'))
router.use('/transaction', require('./TransactionRoute'))
router.use('/document', require('./DocumentRoute'))
router.use('/file', require('./FileRoute'))
router.use('/user', require('./UserRoute'))
router.use('/sponsor', require('./SponsorRoute'))
router.use('/questionnaire', require('./QuestionnaireRoute'))

router.use('/exam', require('../services/exam/routes/ExamRoute'))

module.exports = router