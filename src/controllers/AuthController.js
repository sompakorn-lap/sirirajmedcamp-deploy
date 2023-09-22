const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

const tokenSecretKey = process.env.AUTH_TOKEN_SECRET_KEY
const passwordSecretKey = process.env.AUTH_PASSWORD_SECRET_KEY

const register = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  const duplicate = await User.findOne({ username }).lean().exec()
  if(duplicate){
    return res.status(409).send('Duplicate username')
  }

  const userId = crypto.randomUUID()
  const hashPassword = crypto.createHash('sha256', passwordSecretKey).update(password).digest('hex')

  const user = await User.create({
    userId,
    username,
    password: hashPassword
  })

  if(user){
    res.status(201).json({ userId })
  }
  else {
    res.status(400).send('Failed to create user')
  }
})

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  if(!username || !password){
    return res.status(400).send('Login failed')
  }

  const hashPassword = crypto.createHash('sha256', passwordSecretKey).update(password).digest('hex')

  const user = await User.findOne({ username }).lean().exec()
  if(!user){
    return res.status(404).send('User not found')
  }

  const match = (hashPassword === user.password)
  if(!match){
    return res.status(401).send('Unauthorized')
  }

  const { userId } = user
  const authToken = jwt.sign({ userId }, tokenSecretKey, { expiresIn: '1d' })
  res.cookie('authToken', authToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 24* 60 * 60 * 1000
  })
  res.status(200).json({ userId })
})

const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies

  if(!cookies?.authToken){
    return res.status(204).send('Unauthorized')
  }

  res.clearCookie('authToken', { httpOnly: true, secure: true, sameSite: 'none' })
  res.status(200).send('Logout successful')

})

const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies

  if(!cookies?.authToken){
    return res.status(401).send('Unauthorized')
  }

  const authToken = cookies.authToken

  jwt.verify(
    authToken,
    tokenSecretKey,
    async function (err, decoded) {
      if(err){
        return res.status(403).send('Forbidden')
      }

      const user = await User.findOne({ userId: decoded.userId }).lean().exec()
      if(!user){
        return res.status(401).send('Unauthorized')
      }

      const { userId } = user
      const newAuthToken = jwt.sign({ userId }, tokenSecretKey, { expiresIn: '1d' })
      res.cookie('authToken', newAuthToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000
      })
      res.status(200).json({ userId })
    }
  )
})

module.exports = {
  register,
  login,
  logout,
  refresh
}