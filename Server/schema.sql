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
  ("Online Ordering Tools", "online-ordering-tools.png"),
  ("Accessibility Tools", "accessibility-tools.png"),
  ("Parenting Tools", "parenting-tools.png"),
  ("Religious Tools", "religious-tools.png"),
  ("Women’s Tools", "womens-tools.png"),
  ("Kids Tools", "kids-tools.png"),
  ("Football Tools", "football-tools.png"),
  ("Finance and Money Tools", "finance-money-tools.png"),
  ("Vehicle Tools", "vehicle-tools.png"),
  ("Physics Tools", "physics-tools.png"),
  ("Astronomy and Astrophysics Tools", "astronomy-tools.png"),
  ("Chemistry Tools", "chemistry-tools.png"),
  ("Math Tools", "math-tools.png"),
  ("Weather Tools", "weather-tools.png"),
  ("History Tools", "history-tools.png"),
  ("Random Tools", "random-tools.png"),
  ("Other Tools", "other-tools.png");


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
 ("Topic Trivia Quiz", "Generates randomized quizzes on selected subjects to test knowledge retention in a fun, engaging way.", 1, "teacher-tools/topic-trivia-quiz");



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Base64 Size Calculator", "Estimates the exact size of data when encoded to Base64, aiding in storage and transmission planning.", 2, "developer-tools/base64-size-calculator"),
  ("Binary Code Generator", "Converts text or numbers into binary sequences for low-level programming and learning purposes.", 2, "developer-tools/binary-code-generator"),
  ("Regex Tester with Explanations", "Allows testing regular expressions and provides detailed breakdowns of each matching group.", 2, "developer-tools/regex-tester-with-explanations"),
  ("JWT Token Decoder", "Decodes JSON Web Tokens to reveal payload claims and validate token integrity for debugging auth flows.", 2, "developer-tools/jwt-token-decoder"),
  ("Image to Base64 Converter", "Converts uploaded image files into Base64-encoded strings for embedding or API transfer purposes.", 2, "developer-tools/image-to-base64-converter");



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Name Generator", "Randomly crafts brand or project names based on keywords, themes and language preferences.", 3, "content-creator-tools/name-generator"),
  ("Text-to-Audio Converter", "Transforms written text into natural-sounding speech using Google's TTS engine for podcasts or videos.", 3, "content-creator-tools/text-to-audio-converter"),
  ("Read Time Estimate Calculator", "Calculates how long an average reader would take to finish a given text, optimizing content length.", 3, "content-creator-tools/read-time-estimate-calculator")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("BMI Calculator", "Determines Body Mass Index from height and weight, offering health-based category guidance.", 4, "food-and-health-tools/bmi-calculator"),
  ("Daily Water Intake Calculator", "Recommends optimal daily water consumption based on weight, activity level and climate.", 4, "food-and-health-tools/daily-water-intake-calculator"),
  ("Daily Calorie Calculator", "Estimates daily caloric needs by factoring in age, sex, height, weight and exercise habits.", 4, "food-and-health-tools/daily-calorie-calculator"),
  ("Body Fat Percentage Calculator", "Calculates body fat using common formulas and measures, providing personalized fitness targets.", 4, "food-and-health-tools/body-fat-percentage-calculator"),
  ("Muscle Mass and Fitness Plan Calculator", "Suggests muscle-building routines and nutrition plans tailored to specific fitness goals.", 4, "food-and-health-tools/muscle-mass-and-fitness-plan-calculator")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Random Recipe Generator", "Suggests new recipes based on cuisine type or dietary preferences for meal inspiration.", 5, "random-recipe-generator"),
  ("Temperature Converter", "Quickly converts between Celsius, Fahrenheit and Kelvin to ensure precise cooking temperatures.", 5, "cooking-and-baking-tools/temperature-converter"),
  ("Ingredient Quantity Calculator", "Adjusts ingredient amounts proportionally for any number of servings to avoid miscalculations.", 5, "cooking-and-baking-tools/ingredient-quantity-calculator"),
  ("Total Baking Time Calculator", "Estimates complete baking durations by summing prep, rise and bake times for accurate scheduling.", 5, "cooking-and-baking-tools/total-baking-time-calculator"),
  ("Unit Converter for Ingredients (teaspoons/cups/grams etc.)", "Translates between common kitchen measurement units to simplify recipe scaling.", 5, "cooking-and-baking-tools/unit-converter-ingredients"),
  ("Recipe Finder by Available Ingredients", "Finds recipes that use only the ingredients you have at home, reducing waste and grocery trips.", 5, "cooking-and-baking-tools/recipe-finder-by-available-ingredients"),
  ("Nutritional Values Checker", "Provides macro and micronutrient breakdowns for ingredients to plan balanced meals.", 5, "cooking-and-baking-tools/nutritional-values-checker"),
  ("Cake/Pastry Ideas Generator by Category", "Offers themed cake and pastry suggestions based on occasion or flavor preferences.", 5, "cooking-and-baking-tools/cake-pastry-ideas-generator")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Product Availability Checker", "Checks real-time stock availability for products on various e-commerce platforms to help you find in-stock items quickly.", 6, "online-ordering-tools/product-availability-checker"),
  ("Ratings and Reviews Checker", "Aggregates and displays user ratings and reviews from multiple sources to help gauge product quality and reliability.", 6, "online-ordering-tools/ratings-reviews-checker"),
  ("Secure Shopping Site Checker", "Verifies SSL certificates and site security protocols to ensure safe transactions on online stores.", 6, "online-ordering-tools/secure-shopping-site-checker")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Website Accessibility Checker", "Analyzes web pages against WCAG standards to identify accessibility issues and suggest improvements for inclusive design.", 7, "accessibility-tools/website-accessibility-checker"),
  ("Text to Sign Language Translator", "Converts written text into sign language animations or images to facilitate communication for deaf users.", 7, "accessibility-tools/text-to-sign-language-translator"),
  ("Transportation/Public Accessibility Checker", "Evaluates public transport routes and venues for accessibility features like ramps and elevators to aid planning.", 7,"accessibility-tools/transportation-accessibility-checker")
;

INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Baby Sleep Schedule Calculator", "Creates personalized sleep schedules for infants and children based on age and developmental needs to optimize rest cycles.", 8, "parenting-tools/baby-sleep-schedule-calculator"),
  ("Feeding Tracker", "Logs feeding times and durations to help parents maintain consistent feeding routines and track intake.", 8, "parenting-tools/feeding-tracker"),
  ("Baby Development Tracker", "Monitors milestone progress such as crawling, walking, and speech to ensure children meet expected developmental stages.", 8, "parenting-tools/baby-development-tracker"),
  ("Baby Name Generator", "Generates curated baby name lists based on cultural themes, meanings, and language preferences for expecting parents.", 8,  "parenting-tools/baby-name-generator"),
  ("Game Suggestions by Age", "Recommends age-appropriate games and activities to support learning, creativity, and skill development at each stage.", 8,  "parenting-tools/game-suggestions-by-age"),
  ("Weekly Healthy Meal Planner", "Designs balanced weekly meal plans tailored to children’s nutritional needs and dietary restrictions for healthy growth.", 8, "parenting-tools/weekly-healthy-meal-planner"),
  ("Story Narrator for Kids", "Transforms text stories into narrated audio with engaging voices and sound effects to entertain and educate young listeners.", 8, "parenting-tools/story-narrator-for-kids")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Daily Prayer Times", "Calculates precise prayer times for any location based on astronomical data and local conventions to support daily worship.", 9,  "religious-tools/daily-prayer-times"),
  ("Scripture Search", "Provides keyword and phrase search across multiple sacred texts with context and cross-references for study and reflection.", 9, "religious-tools/scripture-search"),
  ("Daily Blessings Generator", "Delivers a randomized blessing or verse each day for spiritual inspiration and guidance in various traditions.", 9, "religious-tools/daily-blessings-generator"),
  ("Fasting Time Calculator", "Determines start and end times for religious fasts by calculating sunrise and sunset based on geographic coordinates.", 9, "religious-tools/fasting-time-calculator"),
  ("Places of Worship Locator", "Finds nearby mosques, churches, synagogues, and temples with directions and contact information for easy access.", 9, "religious-tools/places-of-worship-locator"),
  ("Sabbath Candle Lighting Time", "Computes exact times to light Sabbath candles based on local sunset times and halachic rules.", 9, "religious-tools/sabbath-candle-lighting-time");



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Ovulation and Fertility Calculator", "Estimates fertile windows and ovulation dates using cycle length and past period data to assist family planning.", 10, "women’s-tools/ovulation-and-fertility-calculator"),
  ("Cosmetic Ingredient Checker", "Analyzes skincare and makeup ingredient lists to identify harmful substances and potential allergens.", 10, "women’s-tools/cosmetic-ingredient-checker"),
  ("Pregnancy Week Calculator", "Tracks pregnancy progression by calculating current gestational week and expected due date from last menstrual period.", 10, "women’s-tools/pregnancy-week-calculator")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Word Puzzle Generator", "Creates custom word puzzles like crosswords and word searches from user-provided word lists for fun educational games.", 11, "kids-tools/word-puzzle-generator"),
  ("Funny Story Generator", "Crafts short, humorous stories with randomized characters and plots to spark children’s imagination.", 11, "kids-tools/funny-story-generator"),
  ("Random Text Generator", "Generates creative sentences or paragraphs with whimsical themes for writing prompts and language practice.", 11, "kids-tools/random-text-generator"),
  ("Cool Text Converter", "Transforms plain text into stylized Unicode and ASCII art for fun social media posts.", 11, "kids-tools/cool-text-converter"),
  ("Emoji Translator", "Transforms words and phrases into emoji sequences that capture the intended meaning playfully.", 11, "kids-tools/emoji-translator"),
  ("Emoji Stories Generator", "Composes short narratives using only emojis to challenge kids to interpret visual storytelling.", 11, "kids-tools/emoji-stories-generator"),
  ("Random Jokes Generator", "Serves age-appropriate jokes and riddles at random to entertain children.", 11, "kids-tools/random-jokes-generator"),
  ("Silly Daily Forecast", "Provides quirky, playful daily “horoscopes” with imaginative predictions to amuse kids.", 11, "kids-tools/silly-daily-forecast"),
  ("Faux Facts Generator", "Produces believable-sounding but fictitious facts to inspire creativity and critical thinking.", 11, "kids-tools/faux-facts-generator")
;



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Live Match Scores", "Streams real-time scores and key events for ongoing football matches across major leagues.", 12, "football-tools/live-match-scores"),
  ("Match Schedule Lookup", "Displays upcoming fixtures filtered by league or team with dates, times, and broadcast information.", 12, "football-tools/match-schedule-lookup"),
  ("Player Stats Analysis", "Analyzes player performance metrics such as goals and assists to generate in-depth reports.", 12, "football-tools/player-stats-analysis"),
  ("Football Trivia Quiz", "Challenges fans with randomized quizzes on football history, records, and legends.", 12, "football-tools/football-trivia-quiz"),
  ("Open Fields Locator", "Finds public football pitches and facilities in your area with maps and availability details.", 12, "football-tools/open-fields-locator"),
  ("Player Profile Search", "Retrieves player bios, career stats, and news updates by entering their name.", 12, "football-tools/player-profile-search"),
  ("Player Comparison Tool", "Compares two players side-by-side across key metrics to highlight strengths and weaknesses.", 12, "football-tools/player-comparison-tool")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Currency Converter", "Converts amounts between multiple currencies using live exchange rates for accurate transactions.", 13, "finance-and-money-tools/currency-converter"),
  ("Investment Calculator", "Projects returns on investments or loans by calculating compound interest over custom periods.", 13, "finance-and-money-tools/investment-calculator")
;

INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Fuel Consumption Checker", "Estimates average fuel consumption for specific car models based on manufacturer data.", 14, "vehicle-tools/fuel-consumption-checker"),
  ("Gas Stations Locator", "Finds nearby petrol stations that are currently open, including fuel prices and amenities.", 14, "vehicle-tools/gas-stations-locator"),
  ("Tire Size Checker", "Matches compatible tire sizes and pressure recommendations for your vehicle make and model.", 14, "vehicle-tools/tire-size-checker"),
  ("Traffic Load Checker", "Analyzes live traffic data to identify congested routes and suggest faster alternatives.", 14, "vehicle-tools/traffic-load-checker"),
  ("Used Car Price Checker", "Provides market price estimates for used vehicles based on make, model, year, and condition.", 14, "vehicle-tools/used-car-price-checker")
;



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Distance/Speed/Time Calculator", "Computes missing variables among distance, speed, and time relationships for physics problem-solving.", 15, "physics-tools/distance-speed-time-calculator"),
  ("Acceleration Calculator", "Determines acceleration from given initial and final velocities and time intervals.", 15, "physics-tools/acceleration-calculator"),
  ("Kinematic Motion Solver", "Solves equations for objects under constant acceleration to predict future states.", 15, "physics-tools/kinematic-motion-solver"),
  ("Free Fall Calculator", "Calculates fall time and impact speed neglecting air resistance to model simple gravity.", 15, "physics-tools/free-fall-calculator"),
  ("Force Calculator (F = ma)", "Applies Newton’s second law to compute force given mass and acceleration inputs.", 15, "physics-tools/force-calculator"),
  ("Work and Energy Calculator", "Evaluates work done and changes in energy for systems based on force and displacement.", 15, "physics-tools/work-and-energy-calculator"),
  ("Kinetic/Potential Energy Calculator", "Determines energy values and transition points for mechanical systems.", 15, "physics-tools/kinetic-potential-energy-calculator"),
  ("Torque Calculator", "Computes torque produced by forces acting at distances from pivot points.", 15, "physics-tools/torque-calculator"),
  ("Heat Transfer Calculator", "Calculates heat transfer using mass, specific heat, and temperature change inputs (Q=mcΔT).", 15, "physics-tools/heat-transfer-calculator"),
  ("Temp Conversion Calculator", "Converts temperatures between Celsius, Fahrenheit, and Kelvin scales.", 15, "physics-tools/temp-conversion-calculator"),
  ("Radioactive Half-Life Calculator", "Models radioactive decay by computing remaining mass over half-life periods.", 15, "physics-tools/radioactive-half-life-calculator"),
  ("Photon Energy Calculator", "Determines photon energy from wavelength or frequency using Planck’s relation.", 15, "physics-tools/photon-energy-calculator")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Mass vs Weight Calculator", "Compares how mass translates to weight under varying gravity fields of different planets.", 16, "astronomy-and-astrophysics-tools/mass-vs-weight-calculator"),
  ("Escape Velocity Calculator", "Computes the minimum speed needed to break free from a celestial body’s gravity.", 16, "astronomy-and-astrophysics-tools/escape-velocity-calculator"),
  ("Gravitational Force Calculator", "Applies Newton’s law of universal gravitation to calculate force between two masses.", 16, "astronomy-and-astrophysics-tools/gravitational-force-calculator"),
  ("Solar/Lunar Cycle Calculator", "Determines local sunrise, sunset, and moon phase times based on date and location.", 16, "astronomy-and-astrophysics-tools/solar-lunar-cycle-calculator")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Periodic Table Lookup", "Provides elemental properties and atomic data lookup alongside interactive periodic table views.", 17, "chemistry-tools/periodic-table-lookup"),
  ("Ideal Gas Law Solver", "Solves PV=nRT and related equations to predict gas behavior under varying conditions.", 17, "chemistry-tools/ideal-gas-law-solver"),
  ("Molecular Diagram Generator", "Renders 2D structural diagrams from chemical formulas for presentations and study.", 17, "chemistry-tools/molecular-diagram-generator"),
  ("Chemical Formula Parser", "Breaks down complex chemical formulas into constituent elements and rebuilds them.", 17, "chemistry-tools/chemical-formula-parser"),
  ("SMILES to Structure Converter", "Converts SMILES notation into interactive molecular structures for research and education.", 17, "chemistry-tools/smiles-to-structure-converter")
;



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Function Graph Plotter", "Plots mathematical functions and allows zooming and annotation for detailed analysis.", 18, "math-tools/function-graph-plotter"),
  ("Prime Number Checker", "Determines primality of integers and highlights their factors for demonstrations.", 18, "math-tools/prime-number-checker"),
  ("Base Converter", "Transforms numbers between binary, hexadecimal, and other bases for computing tasks.", 18,  "math-tools/base-converter"),
  ("Matrix Operations Calculator", "Performs matrix addition, multiplication, inversion, and more for linear algebra.", 18, "math-tools/matrix-operations-calculator"),
  ("Equation Solver", "Solves linear and polynomial equations symbolically or numerically with steps.", 18,  "math-tools/equation-solver"),
  ("Probability Calculator", "Calculates discrete event probabilities using combinatorial formulas.", 18,  "math-tools/probability-calculator"),
  ("Combinatorics Tool", "Computes permutations, combinations, and factorials for counting problems.", 18,  "math-tools/combinatorics-tool"),
  ("Symmetry Checker", "Analyzes functions or graphs to determine lines or points of symmetry.", 18, "math-tools/symmetry-checker"),
  ("Limits and Derivatives Calculator", "Computes symbolic limits and derivatives to support calculus learning.", 18, "math-tools/limits-and-derivatives-calculator")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Solar and Lunar Calculator", "Calculates daily solar and lunar cycles including golden hours and moon phases.", 19, "weather-tools/solar-and-lunar-calculator"),
  ("Live Weather Checker", "Fetches real-time weather data such as temperature, humidity, and wind speed.", 19, "weather-tools/live-weather-checker"),
  ("7-Day Forecast", "Provides a detailed week-long weather forecast with temperature, precipitation, and alerts.", 19, "weather-tools/7-day-forecast")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Fun Fact by Date", "Delivers surprising historical trivia tied to specific calendar dates.", 20, "history-tools/fun-fact-by-date"),
  ("History Trivia Quiz", "Generates quizzes on historical events and figures with varying difficulty levels.", 20,  "history-tools/history-trivia-quiz"),
  ("Period Distance Calculator", "Calculates the exact time span between two historical events in years, months, and days.", 20, "history-tools/period-distance-calculator"),
  ("Historical Figure Search", "Filters historical personalities by era, field, or country for research insights.", 20, "history-tools/historical-figure-search"),
  ("Border History Viewer", "Displays historical national borders on chosen dates using interactive maps.", 20, "history-tools/border-history-viewer")
;



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Random Fact", "Generates unexpected random facts across various topics to entertain and educate.", 21, "random-tools/random-fact"),
  ("Random Sentence", "Creates quirky sentences for creative inspiration.", 21, "random-tools/random-sentence"),
  ("Random Joke", "Serves up a fresh joke to lighten the mood.", 21, "random-tools/random-joke"),
  ("random-tools/Scientific Fact Generator", "Provides verifiable scientific trivia about the natural world.", 21, "scientific-fact-generator"),
  ("Philosophical Quote Generator", "Delivers thought-provoking quotes from philosophers to stimulate reflection.", 21, "random-tools/philosophical-quote-generator"),
  ("Date-based Fun Fact", "Offers historical trivia based on dates for variety in random facts.", 21, "random-tools/date-based-fun-fact"),
  ("Inspirational Sentence Generator", "Produces motivational sentences to boost productivity and confidence.", 21, "random-tools/inspirational-sentence-generator"),
  ("Relaxing Music Generator", "Composes short ambient music clips for relaxation sessions.", 21, "random-tools/relaxing-music-generator")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Video Downloader", "Downloads videos for offline viewing and archiving.", 22, "other-tools/video-downloader"),
  ("File Converter", "Converts files between formats while preserving layout and quality.", 22, "other-tools/file-converter"),
  ("QR Code Generator", "Creates customizable QR codes with logos and color options for marketing materials.", 22, "other-tools/qr-code-generator"),
  ("Color Blindness Simulator", "Simulates various types of color blindness to test design accessibility.", 22, "other-tools/color-blindness-simulator"),
  ("Password Generator", "Generates secure, random passwords with configurable length and character sets.", 22, "other-tools/password-generator")
;
