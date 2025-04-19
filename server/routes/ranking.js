const express = require("express");
const router = express.Router();

module.exports = (pool) => {
  // 랭킹 조회 API
  router.get("/rankings", async (req, res) => {
    try {
      const conn = await pool.getConnection();
      const [rows] = await conn.query(
        `SELECT u.username, MAX(r.score) AS top_score
         FROM rankings r
         JOIN users u ON r.user_id = u.id
         GROUP BY r.user_id
         ORDER BY top_score DESC
         LIMIT 10`
      );
      conn.release();
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  });

  return router;
};
