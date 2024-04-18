import BidHistory from "../model/BidHistory";

export default function (server, db) { 
     
    server.get("/api/bidHistory", async (req, res) => {
        res.json(await BidHistory.find());
    }); 
  
    server.get("/api/bidHistory/:id", (req, res) => {
        res.json(BidHistory.findById(req.params.id));
    });

}