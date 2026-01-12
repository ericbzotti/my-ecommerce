const mysql = require("mysql2/promise");

function buildSslOptions() {
  const useSsl = String(process.env.DB_SSL || "").toLowerCase() === "true";
  if (!useSsl) return undefined;

  const caB64 = process.env.DB_CA_CERT_BASE64;
  if (caB64 && caB64.trim().length > 0) {
    const ca = Buffer.from(caB64, "base64").toString("utf-8");
    return { ca, rejectUnauthorized: true };
  }

  // ⚠️ Cours/dev: si vous n'avez pas le CA. À éviter en production.
  const insecure = String(process.env.DB_SSL_INSECURE || "").toLowerCase() === "true";
  if (insecure) return { rejectUnauthorized: false };

  // Si SSL=true mais pas de CA et pas insecure, on force quand même une tentative stricte.
  return { rejectUnauthorized: true };
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  ssl: buildSslOptions(),
});

async function ping() {
  const conn = await pool.getConnection();
  try {
    await conn.ping();
  } finally {
    conn.release();
  }
}

module.exports = { pool, ping };
