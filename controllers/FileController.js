const asyncHandler = require('express-async-handler')
const { drive } = require('../configs/googleConfig')

const findFile = asyncHandler(async (req, res) => {
  const { fileId } = req.params

  try {
    const { headers, data } = await drive.files.get(
      { fileId, alt: 'media', fields: 'mimeType' },
      { responseType: 'stream' }
    )
    res.setHeader('Content-Type', headers['content-type'])
    data.pipe(res)
  }
  catch(err) {
    res.status(400).send(error)
  }
})

module.exports = {
  findFile
}