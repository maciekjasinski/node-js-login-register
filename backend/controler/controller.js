const User = require("../models/User");

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password)
    res.status(200).json(user)
  }
  catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}

module.exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user)
  }
  catch (err) {
    if (err.code === 11000) {
      res.status(400).json({
        message: "This email is already registered"
      })
    }
    else {
      res.status(400).json({
        message: err.message
      })
    }
  }
}
