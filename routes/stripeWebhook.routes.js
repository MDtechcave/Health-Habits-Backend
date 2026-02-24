import express from "express";
import Stripe from "stripe";
import pool from "../pool.js"; // change path if needed

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, // raw body buffer
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "payment_intent.succeeded") {
      const pi = event.data.object;
      const orderId = Number(pi.metadata?.order_id);

      await pool.query(
        `UPDATE orders SET order_status='paid' WHERE order_id=?`,
        [orderId]
      );
    }

    if (event.type === "payment_intent.payment_failed") {
      const pi = event.data.object;
      const orderId = Number(pi.metadata?.order_id);

      await pool.query(
        `UPDATE orders SET order_status='failed' WHERE order_id=?`,
        [orderId]
      );
    }

    res.json({ received: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;