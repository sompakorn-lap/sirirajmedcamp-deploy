const asyncHandler = require('express-async-handler')
const Sponsor = require('../models/Sponsor')

const findSponsors = asyncHandler(async (req, res) => {
  try {
    const sponsors = await Sponsor.find()
    res.status(200).json(sponsors)
  }
  catch (err) {
    res.status(500).send()
  }
})

module.exports = {
  findSponsors
}