import stripePackage from 'stripe';

const stripe = stripePackage('sk_test_51P6pSYIOdyjaVUZksOvMpUtwiiHOCQMWcyORGSCnC4bPCy6nEbYytmK4VAYJaADTuUQQhW8SBmLZhJktVBXR7NBO00sBktHY9G');

export default function (server, db) {
  
  server.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: '{{PRICE_ID}}',
          quantity: 1,
        },
      ],
      currency: "eur", 

      
      mode: 'payment',
      success_url: `http://localhost:5173/checkout?success=true`,
      cancel_url: `http://localhost:5173/checkout?canceled=true`,
    });

    res.redirect(303, session.url);
  });


}