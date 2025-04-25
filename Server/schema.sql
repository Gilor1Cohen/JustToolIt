CREATE DATABASE IF NOT EXISTS JustToolIt;

USE JustToolIt;


CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS subscription_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(50) NOT NULL UNIQUE, 
  price DECIMAL(10,2) NOT NULL,
  billing_interval ENUM('none', 'month', 'year') NOT NULL
);

CREATE TABLE IF NOT EXISTS user_subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  plan_id INT NOT NULL,
  status ENUM('active', 'cancelled', 'expired') DEFAULT 'active',
  start_date DATE NOT NULL,
  end_date DATE DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  subscription_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending', 'success', 'failed') DEFAULT 'pending'
);


ALTER TABLE user_subscriptions
ADD CONSTRAINT fk_user_subscriptions_user_id
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;

ALTER TABLE user_subscriptions
ADD CONSTRAINT fk_user_subscriptions_plan_id
FOREIGN KEY (plan_id)
REFERENCES subscription_plans(id)
ON DELETE RESTRICT;

ALTER TABLE payments
ADD CONSTRAINT fk_payments_user_id
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;

ALTER TABLE payments
ADD CONSTRAINT fk_payments_subscription_id
FOREIGN KEY (subscription_id)
REFERENCES user_subscriptions(id)
ON DELETE CASCADE;


INSERT INTO subscription_plans (id, type, price, billing_interval)
VALUES 
  (1, 'free', 0.00, 'none'),
  (2, 'monthly', 9.90, 'month'),
  (3, 'yearly', 99.90, 'year');

