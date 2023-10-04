const asyncHandler = require('express-async-handler')
const Document = require('../models/Document')
const { uploadFile } = require('../libs/FileLib')

const createDocument = asyncHandler(async (req, res) => {
  const { userId } = req.params

  const duplicate = await Document.findOne({ userId }).lean().exec()
  if(duplicate){
    return res.status(409).send('Duplicate document')
  }

  const permissionFile = await uploadFile(req.body.permission)
  const transcriptionFile = await uploadFile(req.body.transcription)

  const document = await Document.create({
    userId,
    permissionId: permissionFile.fileId,
    transcriptionId: transcriptionFile.fileId
  })

  if(document){
    res.status(200).send('Successful document create')
  }
  else {
    res.status(400).send('Failed to create document')
  }
})

const findDocument = asyncHandler(async (req, res) => {
  const { userId } = req.params

  const document = await Document.findOne({ userId }).lean().exec()
  if(!document){
    return res.status(404).send('Document not found')
  }
  res.status(200).json(document)
})

module.exports = {
  createDocument,
  findDocument
}