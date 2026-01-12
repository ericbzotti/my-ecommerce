require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { ping } = require("./db");

const productsRouter = require("./routes/products");

const app = express();

// --- Middlewares
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("combined"));

// Rate limit (simple)
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 120,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// CORS
const corsOrigin = process.env.CORS_ORIGIN;
app.use(
  cors({
    origin: corsOrigin ? corsOrigin.split(",").map((s) => s.trim()) : true,
    credentials: false, // Passe à true si tu utilises des cookies cross-site
  })
);

// --- Routes
app.get("/health", async (req, res) => {
  try {
    await ping();
    res.json({ ok: true, service: "api", time: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ ok: false, error: "DB unreachable" });
  }
});

app.use("/products", productsRouter);

// 404
app.use((req, res) => res.status(404).json({ error: "Not found" }));

const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  console.log(`API listening on :${port}`);
});
