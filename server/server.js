import express from "express"
import session from "express-session"
import mongoose from "mongoose"
import apiRegister from "./apiRegister.js"

const server = express()

const port = 3000

server.use(express.json())

server.use(session({
  secret: 'ssshhh', // en hemlig nyckel för att signera session-cookie
  resave: false, // undviker att spara sessionen om den inte ändras
  saveUninitialized: true, // spara en ny session som inte har blivit initialiserad
  cookie: { secure: false } // cookie-inställningar, secure bör vara true i produktion med HTTPS
}))

mongoose.connect("mongodb+srv://starke:awesomeauction@clustera.di6rkdy.mongodb.net/onlineauktion2024")

apiRegister(server, mongoose)

server.listen(port, () => console.log(`Listening on port http://localhost:${port}`))