const express = require("express");
const router = express.Router();

module.exports = (pool) => {
  // 점수 저장
  router.post("/score", async (req, res) => {
    const { userId, score } = req.body;
    if (!userId || score == null) {
      return res.status(400).json({ error: "userId and score are required" });
    }

    try {
      const conn = await pool.getConnection();
      await conn.query(
        "INSERT INTO rankings (user_id, score) VALUES (?, ?)",
        [userId, score]
      );
      conn.release();
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  });

  return router;
};
