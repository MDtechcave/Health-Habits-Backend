import Stripe from "stripe";
import dotenv from "dotenv";
import pool from "../pool.js"; 

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const generateOrderCode = () => {
  return 'HH-' + Math.random().toString(36).slice(2,8).toUpperCase()
}

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, sub_id } = req.body; // amount in rands

    if (amount === undefined || amount === null) {
      return res.status(400).json({ error: "Amount is required" });
    }
    if (sub_id === undefined || sub_id === null) {
      return res.status(400).json({ error: "sub_id is required" });
    }

    
    const amountCents = Math.round(Number(amount) * 100);
    if (!Number.isFinite(amountCents) || amountCents <= 0) {
      return res.status(400).json({ error: "Amount must be a valid positive number" });
    }

    // Generates unique order code
    const orderCode = generateOrderCode()

    // 1) Inserting order as pending
const [result] = await pool.query(
  `INSERT INTO orders (sub_id, amount, order_status, order_date, order_code)
   VALUES (?, ?, 'pending', CURDATE(), ?)`,
  [sub_id, amount, orderCode]
);    

const orderId = result.insertId;

    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "zar",
      automatic_payment_methods: { enabled: true },
      metadata: {
        order_id: String(orderId),
        sub_id: String(sub_id),
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      orderId,
      orderCode,
    });
  } catch (error) {
    console.error("Stripe full error:", error);
    res.status(500).json({ error: error.message });
  }
};