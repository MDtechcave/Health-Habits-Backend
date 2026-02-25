import dotenv from "dotenv";
dotenv.config();

import cors from 'cors';
import express from "express";


// app.use(express.json());


import paymentRoutes from "./routes/payments.routes.js";
import mealsRoutes from "./routes/meals.routes.js";
import drinksRoutes from "./routes/drinks.routes.js";
import usersRoutes from "./routes/users.routes.js";
import packagesRoutes from "./routes/packages.routes.js";
import orderRoutes from "./routes/order.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import goalRoutes from './routes/goal.routes.js';

import stripeWebhookRoutes from './routes/stripeWebhook.routes.js';

const app = express();
app.use(cors());

app.use(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhookRoutes
);
app.use(express.json());


// register routes
app.use("/api/payments", paymentRoutes);
app.use("/api", mealsRoutes);
app.use("/api", drinksRoutes);
app.use("/api", usersRoutes);
app.use("/api", packagesRoutes);
app.use("/api", orderRoutes);
app.use("/api", subscriptionRoutes);
app.use('/api', goalRoutes);



app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
