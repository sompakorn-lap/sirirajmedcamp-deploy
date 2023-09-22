const router = require('express').Router()

router.use('/iq', require('./IqExamRoute'))
router.use('/ethic', require('./EthicExamRoute'))
router.use('/siriraj', require('./SirirajExamRoute'))
router.use('/medical', require('./MedicalExamRoute'))
router.use('/creative', require('./CreativeExamRoute'))

module.exports = router