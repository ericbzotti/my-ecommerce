-- Schéma minimal (MySQL/Aiven)
CREATE TABLE IF NOT EXISTS products (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- Données de test
INSERT INTO products (name, price) VALUES
  ('T-shirt', 19.99),
  ('Casquette', 14.50)
ON DUPLICATE KEY UPDATE name = VALUES(name), price = VALUES(price);
