import User from "../model/User.js"
import { getHash } from "../utilities/validation.js"

export default function (server, db) {

  server.get("/api/users", async (req, res) => {
    res.json(await User.find())
  })

  server.get('/api/user/:id', async (req,res)=> {
    const user = await User.findById(req.params.id)
    console.log(user)
    res.json(user)
  })

  server.get('/api/user/getUsername/:id', async (req,res) => {
    const user = await User.findById(req.params.id)
    console.log(user.username + " hej from new route")
    res.json(user.username)
  })  

  server.put("/api/user/:id", async (req, res) => {
    try {
      const userToUpdate = await User.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: false}
      )

      if (userToUpdate) {
        res.status(200).json({
          message: "User successfully updated."
        })
      } else {
        res.status(404).json({
          message: "User not found."
        })
      }
    } catch (error) {
      res.status(500).json({message: "Error updating user", error: error })
    }
  })

  server.post('/api/users', async (req, res) => {
    try {
      if (!req.body.username || !req.body.password) {
        return res.status(400).json({
          message: "Missing required fields"
        })
      }

      // if (!isValidEmail(req.body.email)) {
      //   return res.status(400).json({
      //     message: "Invalid email format"
      //   })
      // } 
      
      const existingUser = await User.findOne({
        username: req.body.username
      })

      if (existingUser) {
        return res.status(409).json({
          message: "Username already in use"
        })
      }

      const newUser = new User({
        username: req.body.username,
        password: getHash(req.body.password)
      })

      const savedUser = await newUser.save()
      res.status(201).json({ user_id: savedUser._id })

    } catch (error) {
      res.status(500).json({
        message: "Error creating new user",
        error: error 
      })
    }
  })

}