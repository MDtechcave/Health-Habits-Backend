import express from "express";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


import express from "express";
import cors from "cors";

import paymentRoutes from "./routes/payments.routes.js";
import mealsRoutes from "./routes/meals.routes.js";
import drinksRoutes from "./routes/drinks.routes.js";
import usersRoutes from "./routes/users.routes.js";
import packagesRoutes from "./routes/packages.routes.js";
import orderRoutes from "./routes/order.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import homeRoutes from './routes/homeRoutes.js';
import goalRoutes from './routes/goalRoutes.js';




// register routes
app.use("/api/payments", paymentRoutes);
app.use("/api", mealsRoutes);
app.use("/api", drinksRoutes);
app.use("/api", usersRoutes);
app.use("/api", packagesRoutes);
app.use("/api", orderRoutes);
app.use("/api", subscriptionRoutes);
app.use('/api/', homeRoutes);
app.use('/api/', goalRoutes);



app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 2534;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
