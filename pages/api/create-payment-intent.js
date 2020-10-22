import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

export default async function paymentIntentHandler(req, res) {
  const {
    body: { items },
    method,
  } = req;

  switch (method) {
    case "POST":
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
