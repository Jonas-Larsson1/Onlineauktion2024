import stripePackage from 'stripe';

const stripe = stripePackage('sk_test_51P6pSYIOdyjaVUZksOvMpUtwiiHOCQMWcyORGSCnC4bPCy6nEbYytmK4VAYJaADTuUQQhW8SBmLZhJktVBXR7NBO00sBktHY9G');

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

      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: `http://localhost:5173/checkout?success=true`,
        cancel_url: `http://localhost:5173/checkout?success=false`,
      });

      res.json({url: session.url})
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: 'Error creating checkout session' });
    }
  });
}
