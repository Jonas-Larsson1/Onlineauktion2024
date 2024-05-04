import stripePackage from 'stripe';
import { getHash } from '../utilities/validation.js';
import { v4 as uuidv4 } from 'uuid';
import Auction from '../model/Auction.js';
import dotenv from 'dotenv';
dotenv.config();

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

export default function (server, db) {
  
  server.post('/api/create-checkout-session', async (req, res) => {
    const wonAuctions = req.body.wonAuctions;
    const lineItems = [];

    try {
      const pricePromises = wonAuctions.map(async auction => {
        const price = await stripe.prices.create({
          currency: 'eur',
          unit_amount: auction.highestBid.amount * 100,
          product_data: {
            name: auction.title
          }
        })
        return price.id
      })

      const priceIds = await Promise.all(pricePromises);

      priceIds.forEach(priceId => {
        lineItems.push({
          price: priceId,
          quantity: 1
        });
      });

      const paymentId = uuidv4()

      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: `http://localhost:5173/checkout?success=true&payment_id=${paymentId}`,
        cancel_url: `http://localhost:5173/checkout?success=false`,
      });

      req.session.hashedPaymentId = getHash(paymentId)
      req.session.wonAuctions = wonAuctions

      res.json({url: session.url})
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: 'Error creating checkout session' });
    }
  });


  server.put("/api/pay-for-auctions/:paymentId", async (req, res) => {
    try {
      if (!req.body.auctionIds) {
        return res.status(400).json({ message: "Missing auctionIds" });
      }

      if (!req.session.wonAuctions || !req.session.hashedPaymentId) {
        return res.status(400).json({ message: "No active payments to process" });
      }

      if (getHash(req.params.paymentId) != req.session.hashedPaymentId) {
        return res.status(400).json({ message: "Invalid paymentId" });
      }
      
      const result = await Auction.updateMany(
        { _id: { $in: req.body.auctionIds } },
        {
          "$set": {
            "paid": true
          }
        },
        { multi: true }
      )

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "No auctions found with the provided IDs" });
      }

      res.status(200).json({
        message: "Auctions successfully paid for.",
        modifiedCount: result.modifiedCount
      })
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
}
