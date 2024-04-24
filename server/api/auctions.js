import Auction from "../model/Auction.js"
import Notification from "../model/Notification.js"
import User from "../model/User.js"
import { isValidAuction } from "../utilities/validation.js"
import { Types } from 'mongoose';

export default function (server, db) {

  server.get("/api/auctions", async (req, res) => {
    res.json(await Auction.find())
  })

  server.get("/api/auction/:id", async (req, res) => {
    try {
      const auction = await Auction.findById(req.params.id)
      res.json(auction)
    } catch (error) {
      res.status(500).json({message: "Error getting auction", error: error })
    }
  })

  server.get('/api/wonAuctions', async (req, res) => {
    try {
      const userId = req.session.user
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' })
      }

      // const validUserId = new Types.ObjectId(userId);
      const auctions = await Auction.aggregate([
        {
          $match: {
            endDate: { $lt: (new Date() / 1000) } // Auction has ended
          }
        },
        {
          $unwind: '$bidHistory' // Split bidHistory array into separate documents
        },
        {
          $sort: {
            'bidHistory.amount': -1 // Sort bidHistory by amount, highest first
          }
        },
        {
          $group: {
            _id: '$_id',
            auction: { $first: '$$ROOT' },
            highestBid: { $first: '$bidHistory' }, // Get the first (highest) bid after sorting
            // Include other fields as needed
          }
        },
        {
          $addFields: {
            'auction.highestBid': '$highestBid', // Add highestBid property to the auction object
          }
        },
        {
          $unset: 'auction.bidHistory' // Remove the bidHistory property from the auction object
        },
        {
          $match: {
            'highestBid.userId': userId.toString(), // Filter by user's highest bid
            $expr: { $gt: ['$highestBid.amount', '$reservePrice'] }, // Check if highest bid is higher than reservePrice
            'auction.paid': false // Check if the auction is not paid
          }
        },
        {
          $replaceRoot: { newRoot: '$auction' } // Replace root with the saved auction object
        }
      ]);

      res.json(auctions);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  // server.put("/api/auctions", async (req, res) => {
  //   try {

  //     if (!req.body.auctionIds || !req.body.update) {
  //       return res.status(400).json({ message: "Missing auctionIds or update parameters" });
  //     }
      
  //     const result = await Auction.updateMany(
  //       { _id: { $in: req.body.auctionIds } },
  //       req.body.update,
  //       { multi: true }
  //     )

  //     if (result.matchedCount === 0) {
  //       return res.status(404).json({ message: "No auctions found with the provided IDs" });
  //     }

  //     res.status(200).json({
  //       message: "Auctions successfully updated.",
  //       modifiedCount: result.modifiedCount
  //     })
      
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // })

  server.put("/api/auction/:id", async (req, res) => {
    try {
      const auctionToUpdate = await Auction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: false }
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
      res.status(500).json({ message: "Error updating auction", error: error })
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

        const userToNotify = sortedBidHistory[0].userId
        const outbiddingUser = await User.findById(req.body.user)
        const image = auctionToUpdate.images[0]

        if(userToNotify.toString() !== outbiddingUser._id.toString()){
       


        const newNotification = new Notification ({
          userId: userToNotify,
          auctionId: req.params.id,
          date: Date.now(),
          message: `You have been outbidded by "${outbiddingUser.username}" on auction ${auctionToUpdate.title}`,
          image: image
        })
     
        await newNotification.save()

 
      } 

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
        const newAuction = new Auction({
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
      res.status(500).json({ message: "Error posting auction", error: error })
    }
  });

  server.delete("/api/auction/:id", async (req, res) => {
    try {
      const deletedAuction = await Auction.findByIdAndDelete(req.params.id);
      if (deletedAuction) {
        res.status(200).json({ message: "Auction deleted successfully" });
      } else {
        res.status(404).json({ message: "Auction not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting auction", error: error });
    }
  });
}