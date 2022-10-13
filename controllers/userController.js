const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

const generateJwt = (email) => {
  return jwt.sign({email}, process.env.SECRET_KEY,
    {expiresIn: '24h'})
}

class UserController {
  async registration (req, res, next) {
    const {email, password} = req.body

    if (!email || !password) {
      return
    }
    const candidate = await User.findOne({where: {email}})

    if (candidate) {
      return
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const token = generateJwt(email)

    await User.create({email, password: hashPassword})

    return res.json({token})
  }

  async login (req, res, next) {
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})

    if (!user) {
      return
    }
    const comparePassword = bcrypt.compareSync(password, user.password)

    if (!comparePassword) {
      return
    }
    const token = generateJwt(user.email)

    return res.json({token})
  }

  async check (req, res) {
    const token = generateJwt(req.user.email)
    return res.json({token})
  }
}

module.exports = new UserController()
