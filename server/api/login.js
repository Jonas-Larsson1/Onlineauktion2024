import User from "../model/User.js"
import crypto from "crypto"

// const salt = "örtSalt"
// const getHash = (password) => {
//   let hash = crypto.pbkdf2Sync(
//     password, salt, 1000, 64, 'sha512'
//     ).toString('hex')
//   return hash 
// }

// const isValidEmail = (email) => {
//   const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//   return emailRegex.test(email)
// }

export default function (server, db) {

  server.post('/api/login', async(req, res) => {
    if (req.session.user) {
      res.status(409).json({
        message:  "There is already an user logged in"
      })
    } else {
      const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
        // password_hash: getHash(req.body.password)
      })
      
      if (user) {
        req.session.user = user._id
        res.status(201).json({
          loggedIn: user._id
        })
      } else {
        res.status(404).json({
          message: "Invalid email or password"
        })
      }
    }
  })

}