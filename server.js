import express from "express";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

import homeRoutes from './routes/homeRoutes.js';
import goalRoutes from './routes/goalRoutes.js';


const PORT = 2534;

// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:5174'],
//   credentials: true
// }));

app.use('/api/', homeRoutes);
app.use('/api/', goalRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

