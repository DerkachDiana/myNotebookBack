const {User} = require('../models/models')

class UserController {
  async addUser (req, res) {
    const {name, password} = req.body
    const user = await User.create({name, password})
    return res.json(user)
  }
}

module.exports = new UserController()
