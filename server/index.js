const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();





const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "coin_game",
});

// 📌 라우트 파일 연결
const scoreRoutes = require("./routes/score")(pool);
const rankingRoutes = require("./routes/ranking")(pool);

app.use("/api", scoreRoutes);
app.use("/api", rankingRoutes);
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
