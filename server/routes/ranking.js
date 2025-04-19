app.get("/api/rankings", async (req, res) => {
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
    router.get("/rankings", async (req, res) => {
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
    });
    
  });
  