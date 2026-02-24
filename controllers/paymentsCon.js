// import Stripe from "stripe";
// import dotenv from "dotenv";

// dotenv.config();

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const createPaymentIntent = async (req, res) => {
//   try {
//     const { amount } = req.body; // amount in rands

//     if (amount === undefined || amount === null) {
//       return res.status(400).json({ error: "Amount is required" });
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(Number(amount) * 100), // cents
//       currency: "zar",
//       automatic_payment_methods: { enabled: true },
//     });

//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error("Stripe full error:", error);
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };
import Stripe from "stripe";
import dotenv from "dotenv";
import pool from "../pool.js"; 

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, sub_id } = req.body; // amount in rands

    if (amount === undefined || amount === null) {
      return res.status(400).json({ error: "Amount is required" });
    }
    if (sub_id === undefined || sub_id === null) {
      return res.status(400).json({ error: "sub_id is required" });
    }

    // Convert rands -> cents
    const amountCents = Math.round(Number(amount) * 100);
    if (!Number.isFinite(amountCents) || amountCents <= 0) {
      return res.status(400).json({ error: "Amount must be a valid positive number" });
    }

    // 1) Insert order as pending
    const [result] = await pool.query(
      `INSERT INTO orders (sub_id, amount, order_status)
       VALUES (?, ?, 'pending')`,
      [sub_id, amountCents]
    );

    const orderId = result.insertId;

    // 2) Create PaymentIntent + attach order_id in metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "zar",
      automatic_payment_methods: { enabled: true },
      metadata: {
        order_id: String(orderId),
        sub_id: String(sub_id),
      },
    });

    // 3) Return both so frontend can track the order
    res.json({
      clientSecret: paymentIntent.client_secret,
      orderId,
    });
  } catch (error) {
    console.error("Stripe full error:", error);
    res.status(500).json({ error: error.message });
  }
};