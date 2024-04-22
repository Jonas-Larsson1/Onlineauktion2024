import BidHistory from "../model/BidHistory";

export default function (server, db) { 
     
    server.get("/api/bidHistory", async (req, res) => {
        res.json(await BidHistory.find());
    }); 
  
    server.get("/api/bidHistory/:id", (req, res) => {
        res.json(BidHistory.findById(req.params.id));
    });

    server.put("/api/bidHistory/:id", async (req, res) => {
      try {
        const updatedBidHistory = await BidHistory.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: false }
        )

        if (!updatedBidHistory) {
          res.status(404).send("BidHistory not found");
        } else {
          res.status(200).send("BidHistory updated successfully");
        }
      } catch (error) {
        res.status(500).send({ message: "Error updating BidHistory", error: error })
      }
    });

}