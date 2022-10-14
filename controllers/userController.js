const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const ApiError = require('../error/ApiError')

const generateJwt = (email) => {
  return jwt.sign({email},
    process.env.SECRET_KEY,
    {expiresIn: '24h'})
}

class UserController {
  async registration (req, res, next) {
    const {email, password} = req.body

    if (!email || !password) {
      return ApiError.badRequest('Wrong email or password')
    }
    try {
      const candidate = await User.findOne({where: {email}})

      if (candidate) {
        return ApiError.badRequest('User already exists')
      }
    } catch (e) {
      return next(ApiError.internal(e.message))
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const token = generateJwt(email)

    try {
      await User.create({email, password: hashPassword})

      return res.json({token})
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async login (req, res, next) {
    const {email, password} = req.body
    try {
      const user = await User.findOne({where: {email}})

      if (!user) {
        return next(ApiError.badRequest('User not found'))
      }
      const comparePassword = bcrypt.compareSync(password, user.password)

      if (!comparePassword) {
        return next(ApiError.badRequest('Incorrect password'))
      }
      const token = generateJwt(user.email)

      return res.json({token})
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async check (req, res) {
    const token = generateJwt(req.user.email)
    return res.json({token})
  }
}

module.exports = new UserController()
