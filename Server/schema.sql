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


CREATE TABLE free_user_actions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  count INT NOT NULL DEFAULT 1,
  action_date DATE NOT NULL,
  UNIQUE KEY unique_user_day (user_id, action_date)
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


INSERT INTO subscription_plans (type, price, billing_interval)
VALUES 
  ( 'free', 0.00, 'none'),
  ( 'monthly', 9.90, 'month'),
  ( 'yearly', 99.90, 'year');



INSERT INTO users (user_name, email, password_hash)
VALUES ('Gilor', 'gilor6811@gmail.com', '$2b$10$0uXxKXR4MZmknRkK77UlGuGBQrhCpS5J48VJN05yeP1xAqMhJlrUG'), -- password: 123456789

 ('Gil', 'gilor6812@gmail.com', '$2b$10$0uXxKXR4MZmknRkK77UlGuGBQrhCpS5J48VJN05yeP1xAqMhJlrUG'), -- password: 123456789

 ('Or', 'gilor6813@gmail.com', '$2b$10$0uXxKXR4MZmknRkK77UlGuGBQrhCpS5J48VJN05yeP1xAqMhJlrUG'); -- password: 123456789



INSERT INTO user_subscriptions (user_id, plan_id, status, start_date, end_date)
VALUES
  (1, 1, 'active', CURDATE(), NULL),
  (2, 2, 'active', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 MONTH)),
  (3, 3, 'active', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 YEAR));



INSERT INTO payments (user_id, subscription_id, amount, status)
VALUES
  (2, 2, 9.90, 'success'),
  (3, 3, 99.90, 'success');
  

CREATE TABLE IF NOT EXISTS tools_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  image_url VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tools_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category_id INT NOT NULL,
  endpoint VARCHAR(255) NOT NULL
);

ALTER TABLE tools_details
  ADD CONSTRAINT fk_tools_details_categories
    FOREIGN KEY (category_id)
    REFERENCES tools_categories(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;



INSERT INTO tools_categories (name, image_url) VALUES
  ("Student Tools", "student-tools.png"),
  ("Developer Tools", "developer-tools.png"),
  ("Content Creator Tools", "content-creator-tools.png"),
  ("Food and Health Tools", "food-health-tools.png"),
  ("Cooking and Baking Tools", "cooking-baking-tools.png"),
  ("Religious Tools", "religious-tools.png"),
  ("Kids Tools", "kids-tools.png"),
  ("Physics Tools", "physics-tools.png"),
  ("Astronomy and Astrophysics Tools", "astronomy-tools.png"),
  ("Chemistry Tools", "chemistry-tools.png"),
  ("Math Tools", "math-tools.png"),
  ("History Tools", "history-tools.png"),
  ("Random Tools", "random-tools.png");



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
 ("Topic Trivia Quiz", "Generates randomized quizzes on selected subjects to test knowledge retention in a fun, engaging way.", 1, "student-tools/topic-trivia-quiz");



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Base64 Size Calculator", "Estimates the exact size of data when encoded to Base64, aiding in storage and transmission planning.", 2, "developer-tools/base64-size-calculator"),
  ("Binary Code Generator", "Converts text or numbers into binary sequences for low-level programming and learning purposes.", 2, "developer-tools/binary-code-generator"),
  ("Regex Tester with Explanations", "Allows testing regular expressions and provides detailed breakdowns of each matching group.", 2, "developer-tools/regex-tester-with-explanations"),
  ("JWT Token Decoder", "Decodes JSON Web Tokens to reveal payload claims and validate token integrity for debugging auth flows.", 2, "developer-tools/jwt-token-decoder");



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Name Generator", "Randomly crafts brand or project names based on keywords, themes and language preferences.", 3, "content-creator-tools/name-generator"),
  ("Read Time Estimate Calculator", "Calculates how long an average reader would take to finish a given text, optimizing content length.", 3, "content-creator-tools/read-time-estimate-calculator"),  
  ("QR Code Generator", "Generates scannable QR codes from URLs, text, or other data formats for easy sharing and access.", 3, "content-creator-tools/qr-code-generator")
  ;



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("BMI Calculator", "Determines Body Mass Index from height and weight, offering health-based category guidance.", 4, "food-and-health-tools/bmi-calculator"),
  ("Daily Water Intake Calculator", "Recommends optimal daily water consumption based on weight, activity level and climate.", 4, "food-and-health-tools/daily-water-intake-calculator"),
  ("Daily Calorie Calculator", "Estimates daily caloric needs by factoring in age, sex, height, weight and exercise habits.", 4, "food-and-health-tools/daily-calorie-calculator"),
  ("Body Fat Percentage Calculator", "Calculates body fat using common formulas and measures, providing personalized fitness targets.", 4, "food-and-health-tools/body-fat-percentage-calculator")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Random Recipe Generator", "Suggests new recipes based on cuisine type or dietary preferences for meal inspiration.", 5, "cooking-and-baking-tools/random-recipe-generator"),
  ("Temperature Converter", "Quickly converts between Celsius, Fahrenheit and Kelvin to ensure precise cooking temperatures.", 5, "cooking-and-baking-tools/temperature-converter"),
  ("Unit Converter for Ingredients (teaspoons/cups/grams etc.)", "Translates between common kitchen measurement units to simplify recipe scaling.", 5, "cooking-and-baking-tools/unit-converter-ingredients")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Daily Prayer Times", "Calculates precise prayer times for any location based on astronomical data and local conventions to support daily worship.", 6,  "religious-tools/daily-prayer-times"),
  ("Sabbath Candle Lighting Time", "Computes exact times to light Sabbath candles based on local sunset times and halachic rules.", 6, "religious-tools/sabbath-candle-lighting-time");



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Random Text Generator", "Generates creative sentences or paragraphs with whimsical themes for writing prompts and language practice.", 7, "kids-tools/random-text-generator"),
  ("Cool Text Converter", "Transforms plain text into stylized Unicode and ASCII art for fun social media posts.", 7, "kids-tools/cool-text-converter"),
  ("Random Jokes Generator", "Serves age-appropriate jokes and riddles at random to entertain children.", 7, "kids-tools/random-jokes-generator"),
  ("Faux Facts Generator", "Produces believable-sounding but fictitious facts to inspire creativity and critical thinking.", 7, "kids-tools/faux-facts-generator")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Distance/Speed/Time Calculator", "Computes missing variables among distance, speed, and time relationships for physics problem-solving.", 8, "physics-tools/distance-speed-time-calculator"),
  ("Acceleration Calculator", "Determines acceleration from given initial and final velocities and time intervals.",8, "physics-tools/acceleration-calculator"),
  ("Kinematic Motion Solver", "Solves equations for objects under constant acceleration to predict future states.", 8, "physics-tools/kinematic-motion-solver"),
  ("Free Fall Calculator", "Calculates fall time and impact speed neglecting air resistance to model simple gravity.", 8, "physics-tools/free-fall-calculator"),
  ("Force Calculator (F = ma)", "Applies Newton’s second law to compute force given mass and acceleration inputs.", 8, "physics-tools/force-calculator"),
  ("Work and Energy Calculator", "Evaluates work done and changes in energy for systems based on force and displacement.", 8, "physics-tools/work-and-energy-calculator"),
  ("Kinetic/Potential Energy Calculator", "Determines energy values and transition points for mechanical systems.", 8, "physics-tools/kinetic-potential-energy-calculator"),
  ("Torque Calculator", "Computes torque produced by forces acting at distances from pivot points.", 8, "physics-tools/torque-calculator"),
  ("Heat Transfer Calculator", "Calculates heat transfer using mass, specific heat, and temperature change inputs (Q=mcΔT).",8, "physics-tools/heat-transfer-calculator"),
  ("Radioactive Half-Life Calculator", "Models radioactive decay by computing remaining mass over half-life periods.", 8, "physics-tools/radioactive-half-life-calculator"),
  ("Photon Energy Calculator", "Determines photon energy from wavelength or frequency using Planck’s relation.", 8, "physics-tools/photon-energy-calculator")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Mass vs Weight Calculator", "Compares how mass translates to weight under varying gravity fields of different planets.", 9, "astronomy-and-astrophysics-tools/mass-vs-weight-calculator"),
  ("Escape Velocity Calculator", "Computes the minimum speed needed to break free from a celestial body’s gravity.", 9, "astronomy-and-astrophysics-tools/escape-velocity-calculator")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Periodic Table Lookup", "Provides elemental properties and atomic data lookup alongside interactive periodic table views.", 10, "chemistry-tools/periodic-table-lookup"),
  ("Ideal Gas Law Solver", "Solves PV=nRT and related equations to predict gas behavior under varying conditions.", 10, "chemistry-tools/ideal-gas-law-solver"),
  ("Chemical Formula Parser", "Breaks down complex chemical formulas into constituent elements and rebuilds them.", 10, "chemistry-tools/chemical-formula-parser")
;



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Prime Number Checker", "Determines primality of integers and highlights their factors for demonstrations.", 11, "math-tools/prime-number-checker"),
  ("Base Converter", "Transforms numbers between binary, hexadecimal, and other bases for computing tasks.", 11,  "math-tools/base-converter"),
  ("Probability Calculator", "Calculates discrete event probabilities using combinatorial formulas.", 11,  "math-tools/probability-calculator")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Historical Figure Search", "Filters historical personalities by era, field, or country for research insights.", 12, "history-tools/historical-figure-search")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Random Fact", "Generates unexpected random facts across various topics to entertain and educate.", 13, "random-tools/random-fact"),
  ("Programming Joke Generator", "Fetches random programming jokes to amuse developers.", 13, "random-tools/programming-joke-generator"),
  ("Chuck Norris Joke Generator", "Random Chuck Norris jokes for a laugh.", 13, "random-tools/chuck-norris-joke-generator"),
  ("Cat Fact Generator", "Provides fascinating facts about cats.", 13, "random-tools/cat-fact-generator"),
  ("Random User Generator", "Generates random user profile data for testing purposes.", 13, "random-tools/random-user-generator"),
  ("Dog Image Generator", "Fetches random dog images from various breeds.", 13, "random-tools/dog-image-generator"),
  ("Pokemon Info Generator", "Retrieves information about Pokémon characters.", 13, "random-tools/pokemon-info-generator"),
  ("YesNo Generator", "Provides random yes, no, or maybe answers with illustrative GIFs.", 13, "random-tools/yesno-generator"),
  ("Kanye Quote Generator", "Supplies random Kanye West quotes.", 13, "random-tools/kanye-quote-generator"),
  ("Deck of Cards Generator", "Creates and draws cards from virtual decks.", 13, "random-tools/deck-of-cards-generator"),
  ("Fox Image Generator", "Provides random fox images.", 13, "random-tools/fox-image-generator"),
  ("SpaceX Launch Generator", "Provides details on the latest SpaceX launch.", 13, "random-tools/spacex-launch-generator")
;
