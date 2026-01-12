import React, { useEffect, useState } from "react";
import { apiGet } from "./lib/api";

type Health = { ok: boolean; service?: string; time?: string };
type Product = { id: number; name: string; price: number };

export default function App() {
  const [health, setHealth] = useState<Health | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const h = await apiGet<Health>("/health");
        setHealth(h);
        const p = await apiGet<Product[]>("/products");
        setProducts(p);
      } catch (e: any) {
        setErr(e?.message || "Erreur inconnue");
      }
    })();
  }, []);

  return (
    <div style={{ fontFamily: "system-ui", padding: 16, maxWidth: 900, margin: "0 auto" }}>
      <h1>Déploiement — Front Vercel + API Render + DB Aiven</h1>

      {err ? (
        <div style={{ padding: 12, border: "1px solid #999" }}>
          <strong>Erreur</strong>
          <pre style={{ whiteSpace: "pre-wrap" }}>{err}</pre>
        </div>
      ) : null}

      <h2>/health</h2>
      <pre style={{ background: "#f3f3f3", padding: 12, borderRadius: 8 }}>
        {health ? JSON.stringify(health, null, 2) : "Chargement..."}
      </pre>

      <h2>/products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            #{p.id} — {p.name} — {p.price}$
          </li>
        ))}
      </ul>

      <p style={{ marginTop: 24 }}>
        <strong>Important :</strong> Sur Vercel, configure la variable{" "}
        <code>VITE_API_BASE_URL</code> vers l’URL Render (ex:{" "}
        <code>https://ton-api.onrender.com</code>).
      </p>
    </div>
  );
}
