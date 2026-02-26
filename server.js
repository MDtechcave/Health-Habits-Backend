// server.js
import dotenv from "dotenv";
dotenv.config();

import cors from 'cors';
import express from "express";

// Import all routes
import paymentRoutes from "./routes/payments.routes.js";
import mealsRoutes from "./routes/meals.routes.js";
import drinksRoutes from "./routes/drinks.routes.js";
import usersRoutes from "./routes/users.routes.js";
import packagesRoutes from "./routes/packages.routes.js";
import orderRoutes from "./routes/order.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import goalRoutes from './routes/goal.routes.js';
import stripeWebhookRoutes from './routes/stripeWebhook.routes.js';
import authRoutes from './routes/auth.routes.js';  //  Auth routes

const app = express();

// ✅ 1. CORS first
app.use(cors());

// ✅ 2. JSON parser MUST come BEFORE any routes that need req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //  Add this too

// ✅ 3. Stripe webhook (needs raw body - register separately)
app.use(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhookRoutes
);

// ✅ 4. NOW register all API routes (AFTER json parser)
app.use("/api/auth", authRoutes);           // Login route
app.use("/api/payments", paymentRoutes);
app.use("/api", mealsRoutes);
app.use("/api", drinksRoutes);
app.use("/api", usersRoutes);
app.use("/api", packagesRoutes);
app.use("/api", orderRoutes);
app.use("/api", subscriptionRoutes);
app.use('/api/', goalRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Server is running ");
});

const PORT = process.env.PORT || 2534;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});