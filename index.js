import express from "express";

const app = express();
const PORT = 2534;

app.get("/check", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

