import Auction from "../model/Auction.js"
import Notification from "../model/Notification.js"
import User from "../model/User.js"
import { isValidAuction } from "../utilities/validation.js"

export default function (server, db) {

  server.get("/api/auctions", async (req, res) => {
    res.json(await Auction.find())
  })

  server.get("/api/auction/:id", async (req, res) => {
    res.json(await Auction.findById(req.params.id))
  })

  server.put("/api/auction/:id", async (req, res) => {
    try {
      const auctionToUpdate = await Auction.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: false}
      )

      if (auctionToUpdate) {
        res.status(200).json({
          message: "Auction successfully updated."
        })
      } else {
        res.status(404).json({
          message: "Auction not found."
        })
      }
    } catch (error) {
      res.status(500).json({message: "Error updating auction", error: error })
    }
  })

  

  server.put("/api/auction/newBid/:id", async (req, res) => {
    try {
      
      const auctionToUpdate = await Auction.findByIdAndUpdate(
        req.params.id, 
        req.body.auction, 
        {new: false}
      )

      if (auctionToUpdate) {
        const sortedBidHistory = auctionToUpdate.bidHistory.sort((a, b) => {
          return b.amount - a.amount
        })

        const userToNotify = sortedBidHistory[1].userId
        const outbiddingUser = await User.findById(req.body.user)

        const newNotification = new Notification ({
          userId: userToNotify,
          auctionId: req.params.id,
          date: Date.now(),
          message: `You have been outbidded by "${outbiddingUser.username}" on auction ${auctionToUpdate.title}`
        })

        await newNotification.save()

        res.status(200).json({
          message: "Auction successfully bidded on."
        })

      } else {
        res.status(404).json({
          message: "Auction not found."
        })
      }
    } catch (error) {
      res.status(500).json({message: "Error updating auction", error: error })
    }

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