import Auction from "../model/Auction.js"
import { isValidAuction } from "../utilities/validation.js"

export default function (server, db) {

  server.get("/api/auctions", async (req, res) => {
    res.json(await Auction.find())
  })

  server.post("/api/auctions", async (req, res) => {
    try {
      if (isValidAuction(req.body)) {
        const newAuction = new Auction ({
          sellerId: req.body.sellerId,
          title: req.body.title, 
          description: req.body.description, 
          images: req.body.images,
          startDate: req.body.startDate, 
          endDate: req.body.endDate,
          startingPrice: req.body.startingPrice, 
          reservePrice: req.body.reservePrice,
          category: req.body.category
        })

        const savedAuction = await newAuction.save()
        res.status(201).json(savedAuction)
      } else {
        res.status(400).json({ message: "Invalid format for auction!" })
      }
    } catch (error) {
      res.status(500).json({message: "Error posting auction", error: error })
    }
  })

}