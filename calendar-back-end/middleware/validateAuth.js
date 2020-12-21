const jwt = require('jsonwebtoken')

const validateAuth = (req, res, next) => {
  const token = req.header('auth-token')

  if (!token) {
    return res.status(401).json({
      error: "Access denied"
    })
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET || 'TEST')
    req.user = verified
    if (verified) {
      next()
    } else {
      res.status(401).json({ error: 'Acess denied' })
    }
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' })
  }

}

module.exports = validateAuth