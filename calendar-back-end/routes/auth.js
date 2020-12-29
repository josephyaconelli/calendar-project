const router = require("express").Router()
const axios = require('axios')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const validateAuth = require('../middleware/validateAuth')

const { registerValidation } = require('../validations/registerValidation')
const { loginValidation } = require('../validations/loginValidation')


router.post('/login', async (req, res) => {
  // validate incoming data
  const { error } = loginValidation(req.body)
  if (error) {
    return res.status(500).json({ error: error.details[0].message })
  }

  const { email, password } = req.body

  // check if user already exists
  const user = await User.findOne({ email: email })
  if (!user) {
    return res.status(500).json({ error: 'Email and password don\'t match' })
  }

  // compare password
  const passwordMatches = await bcrypt.compare(password, user.password)

  if (!passwordMatches) {
    return res.status(500).json({ error: 'Email and password don\'t match' })
  }

  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    process.env.TOKEN_SECRET || 'TEST',
    { expiresIn: '20m' }
  )

  const refreshToken = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET || 'REFRESH-TEST',
    { expiresIn: '14d' }
  )

  return res.header({
    'auth-token': token,
    'refresh-token': refreshToken
  }).json({
    error: null,
    data: {
      token: token,
      refreshToken: refreshToken
    }
  })

})


router.post('/refresh', async (req, res) => {

  const refreshToken = req.header('refresh-token')


  if (!refreshToken) {
    return res.status(401).json({
      error: "Access denied"
    })
  }

  try {
    const verified = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || 'REFRESH-TEST')
    const user = verified
    if (verified) {
      const token = jwt.sign(
        {
          name: user.name,
          id: user.id,
        },
        process.env.TOKEN_SECRET || 'TEST',
        { expiresIn: '20m' }
      )
    
      return res.header({
        'auth-token': token,
      }).json({
        error: null,
        data: {
          token: token,
        }
      })
    } else {
      res.status(401).json({ error: 'Acess denied' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Token is not valid' })
  }
})


router.post('/register', async (req, res) => {

  // validate incoming data
  const { error } = registerValidation(req.body)
  if (error) {
    return res.status(500).json({ error: error.details[0].message })
  }

  const { name, email, password } = req.body

  // check if user already exists
  const userRecordExists = await User.exists({ email: email })
  if (userRecordExists) {
    return res.status(500).json({ error: 'Email already exists' })
  }

  // hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // generate user object
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword
  })

  // add new user to DB
  try {
    const savedUser = await user.save()

    // log in and return auth-tokens in body

    // compare password
    const passwordMatches = await bcrypt.compare(password, savedUser.password)

    if (!passwordMatches) {
      return res.status(500).json({ error: 'Incorrect password' })
    }

    const token = jwt.sign(
      {
        name: savedUser.name,
        id: savedUser._id,
      },
      process.env.TOKEN_SECRET || 'TEST',
      { expiresIn: '20m' }
    )

    const refreshToken = jwt.sign(
      {
        name: savedUser.name,
        id: savedUser._id,
      },
      process.env.REFRESH_TOKEN_SECRET || 'REFRESH-TEST',
      { expiresIn: '14d' }
    )

    return res.header({
      'auth-token': token,
      'refresh-token': refreshToken
    }).json({
      error: null,
      data: {
        token: token,
        refreshToken: refreshToken
      }
    })
  } catch(error) {
    return res.status(500).json(error)
  }
})

module.exports = router