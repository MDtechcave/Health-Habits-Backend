import Stripe from "stripe";
import pool from "../pool.js";
import { sendOrderEmail } from "../services/emailService.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 🎯 PAYMENT SUCCESS EVENT
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    const orderId = paymentIntent.metadata.order_id;

    try {
      // 1. Mark order as paid
      await pool.query(
        "UPDATE orders SET order_status = 'paid' WHERE id = ?",
        [orderId]
      );

      // 2. Get order from DB
      const [rows] = await pool.query(
        "SELECT * FROM orders WHERE id = ?",
        [orderId]
      );

      const order = rows[0];

      // 3. Send email (REAL reliable point)
      await sendOrderEmail("customer@email.com", {
        orderCode: order.order_code,
        amount: order.amount,
        status: "paid",
      });

      console.log("✅ Order processed + email sent");
    } catch (err) {
      console.error("Webhook processing error:", err);
    }
  }

  res.json({ received: true });
};