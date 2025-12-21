const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.post("/api/save", async (req, res) => {
  const { name, email } = req.body;
  await pool.query(
    "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT, email TEXT)"
  );
  await pool.query(
    "INSERT INTO users(name, email) VALUES($1,$2)",
    [name, email]
  );
  res.send("Data saved successfully");
});

app.listen(3000, () => console.log("Backend running"));
