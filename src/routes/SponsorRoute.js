const router = require('express').Router()
const SponsorController = require('../controllers/SponsorController')

router.route('/')
  .get(SponsorController.findSponsors)

module.exports = router