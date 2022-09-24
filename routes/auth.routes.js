const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Min length 6 symbols').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid data on registration"
        })
      }

      const {email, password} = req.body
      
      const isUniqEmail = await User.findOne({ email })

      if (isUniqEmail) {
        return res.status(400).json({ message: 'This Email is already taken!' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const user = new User({ email, password: hashedPassword })

      await user.save()

      res.status(201).json({ message: "User created successfully!" })

    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', 'Enter password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid data on login"
        })
      }

      const {email, password} = req.body
      
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'User not found' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Your password incorrect!' })
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )

      res.json({ token, userId: user.id })

    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })

module.exports = router