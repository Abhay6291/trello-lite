const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ PRODUCTION CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "https://trello-lite-beta.vercel.app", // your live frontend
    ],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/boards", require("./routes/boardRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);