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
  description TEXT NOT NULL,
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



INSERT INTO tools_categories (name, description, image_url) VALUES
  ("Student Tools", "Interactive and intelligent utilities that help students calculate, translate and practice topics for enhanced learning.", "student-tools.png"),
  ("Teacher Tools", "A suite of tools designed to streamline and automate teachers’ workflows, from test creation to multimedia recommendations.", "teacher-tools.png"),
  ("Developer Tools", "A collection of practical coding assistants and format converters to speed up development and debugging tasks.", "developer-tools.png"),
  ("Content Creator Tools", "Creative helpers for generating names, audio files, and precise read-time estimates to optimize content production.", "content-creator-tools.png"),
  ("Food and Health Tools", "Lifestyle calculators and trackers for managing BMI, water intake, calories and personalized fitness goals.", "food-health-tools.png"),
  ("Cooking and Baking Tools", "Kitchen assistants that convert units, suggest recipes, and calculate accurate baking times for perfect results.", "cooking-baking-tools.png"),
  ("Online Ordering Tools", "Verification utilities to check product availability, read reviews, and ensure secure shopping on e-commerce sites.", "online-ordering-tools.png"),
  ("Accessibility Tools", "Diagnostic and translation services to evaluate website and public accessibility, including sign-language conversion.", "accessibility-tools.png"),
  ("Parenting Tools", "Comprehensive planners and trackers for baby sleep, feeding schedules, developmental milestones and child activities.", "parenting-tools.png"),
  ("Religious Tools", "Faith-based utilities providing prayer times, scripture search, fasting calculators and nearby worship locations.", "religious-tools.png"),
  ("Women’s Tools", "Health-focused calculators for fertility tracking, pregnancy progression, and checking cosmetic ingredients safely.", "womens-tools.png"),
  ("Kids Tools", "Fun and educational generators to create puzzles, stories, jokes and playful “horoscope” forecasts for children.", "kids-tools.png"),
  ("Football Tools", "Live updates, statistical insights and trivia quizzes to engage football fans with real-time and historical data.", "football-tools.png"),
  ("Finance and Money Tools", "Financial calculators and converters that help manage currency exchange, interest projections and investments.", "finance-money-tools.png"),
  ("Vehicle Tools", "Automotive assistants for checking fuel efficiency, locating gas stations, and comparing tire and used-car specs.", "vehicle-tools.png"),
  ("Physics Tools", "Scientific calculators covering mechanics, energy, thermodynamics and motion to support students and professionals.", "physics-tools.png"),
  ("Astronomy and Astrophysics Tools", "Space science utilities for computing planetary weights, escape velocities, and lunar phases at any location.", "astronomy-tools.png"),
  ("Chemistry Tools", "Molecular and gas-law calculators, visual formula parsers, and SMILES reconstructions for chemists.", "chemistry-tools.png"),
  ("Math Tools", "Advanced mathematical tools for graph plotting, equation solving, probability and calculus operations.", "math-tools.png"),
  ("Weather Tools", "Meteorological utilities offering current weather checks, 7-day forecasts and astronomical cycle calculations.", "weather-tools.png"),
  ("History Tools", "Interactive history helpers delivering fun facts, trivia quizzes and period-distance calculators between events.", "history-tools.png"),
  ("Music Tools", "Musical assistants such as chord converters and more to support musicians in composition and practice.", "music-tools.png"),
  ("Random Tools", "Generative fun utilities that produce facts, jokes, quotes and relaxing music to entertain and inspire.", "random-tools.png"),
  ("Other Tools", "A broad miscellaneous category including converters, downloaders, QR code generators and utility managers.", "other-tools.png");


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Automatic Test Generator", "Creates fully customizable exams in seconds by drawing from predefined question banks and formats.", 1, "automatic-test-generator"),
  ("Educational Video Recommendation System", "Analyzes learning objectives and suggests curated videos to reinforce lesson plans and concepts.", 1, "educational-video-recommendation-system");



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Average Calculator", "Computes the arithmetic mean for any set of numbers, helping students analyze data distributions easily.", 2, "average-calculator"),
  ("Smart Dictionary", "Provides context-aware definitions, synonyms and usage examples to improve vocabulary learning.", 2, "smart-dictionary"),
  ("Advanced Math Calculator", "Solves complex equations and expressions, including symbolic manipulation and step-by-step explanations.", 2, "advanced-math-calculator"),
  ("Graphing Calculator", "Plots functions, inequalities and data points on interactive graphs for visual exploration of math concepts.", 2, "graphing-calculator"),
  ("Topic Trivia Quiz", "Generates randomized quizzes on selected subjects to test knowledge retention in a fun, engaging way.", 2, "topic-trivia-quiz");



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Base64 Size Calculator", "Estimates the exact size of data when encoded to Base64, aiding in storage and transmission planning.", 3, "base64-size-calculator"),
  ("Binary Code Generator", "Converts text or numbers into binary sequences for low-level programming and learning purposes.", 3, "binary-code-generator"),
  ("Regex Tester with Explanations", "Allows testing regular expressions and provides detailed breakdowns of each matching group.", 3, "regex-tester-with-explanations"),
  ("JWT Token Decoder", "Decodes JSON Web Tokens to reveal payload claims and validate token integrity for debugging auth flows.", 3, "jwt-token-decoder");

INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Name Generator", "Randomly crafts brand or project names based on keywords, themes and language preferences.", 4, "name-generator"),
  ("Text-to-Audio Converter (gTTS.js)", "Transforms written text into natural-sounding speech using Google's TTS engine for podcasts or videos.", 4, "text-to-audio-converter"),
  ("Read Time Estimate Calculator", "Calculates how long an average reader would take to finish a given text, optimizing content length.", 4, "read-time-estimate-calculator")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("BMI Calculator", "Determines Body Mass Index from height and weight, offering health-based category guidance.", 5, "bmi-calculator"),
  ("Daily Water Intake Calculator", "Recommends optimal daily water consumption based on weight, activity level and climate.", 5, "daily-water-intake-calculator"),
  ("Daily Calorie Calculator", "Estimates daily caloric needs by factoring in age, sex, height, weight and exercise habits.", 5, "daily-calorie-calculator"),
  ("Body Fat Percentage Calculator", "Calculates body fat using common formulas and measures, providing personalized fitness targets.", 5, "body-fat-percentage-calculator"),
  ("Muscle Mass and Fitness Plan Calculator", "Suggests muscle-building routines and nutrition plans tailored to specific fitness goals.", 5, "muscle-mass-and-fitness-plan-calculator")
;



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Random Recipe Generator", "Suggests new recipes based on cuisine type or dietary preferences for meal inspiration.", 6, "random-recipe-generator"),
  ("Temperature Converter", "Quickly converts between Celsius, Fahrenheit and Kelvin to ensure precise cooking temperatures.", 6, "temperature-converter"),
  ("Ingredient Quantity Calculator", "Adjusts ingredient amounts proportionally for any number of servings to avoid miscalculations.", 6, "ingredient-quantity-calculator"),
  ("Total Baking Time Calculator", "Estimates complete baking durations by summing prep, rise and bake times for accurate scheduling.", 6, "total-baking-time-calculator"),
  ("Unit Converter for Ingredients (teaspoons/cups/grams etc.)", "Translates between common kitchen measurement units to simplify recipe scaling.", 6, "unit-converter-ingredients"),
  ("Recipe Finder by Available Ingredients", "Finds recipes that use only the ingredients you have at home, reducing waste and grocery trips.", 6, "recipe-finder-by-available-ingredients"),
  ("Nutritional Values Checker", "Provides macro and micronutrient breakdowns for ingredients to plan balanced meals.", 6, "nutritional-values-checker"),
  ("Cake/Pastry Ideas Generator by Category", "Offers themed cake and pastry suggestions based on occasion or flavor preferences.", 6, "cake-pastry-ideas-generator")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Product Availability Checker", "Checks real-time stock availability for products on various e-commerce platforms to help you find in-stock items quickly.", 7, "product-availability-checker"),
  ("Ratings and Reviews Checker", "Aggregates and displays user ratings and reviews from multiple sources to help gauge product quality and reliability.", 7, "ratings-reviews-checker"),
  ("Secure Shopping Site Checker", "Verifies SSL certificates and site security protocols to ensure safe transactions on online stores.", 7, "secure-shopping-site-checker")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Website Accessibility Checker", "Analyzes web pages against WCAG standards to identify accessibility issues and suggest improvements for inclusive design.", 8, "website-accessibility-checker"),
  ("Text to Sign Language Translator", "Converts written text into sign language animations or images to facilitate communication for deaf users.", 8, "text-to-sign-language-translator"),
  ("Transportation/Public Accessibility Checker", "Evaluates public transport routes and venues for accessibility features like ramps and elevators to aid planning.", 8,"transportation-accessibility-checker")
;

INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Baby Sleep Schedule Calculator", "Creates personalized sleep schedules for infants and children based on age and developmental needs to optimize rest cycles.", 9, "baby-sleep-schedule-calculator"),
  ("Feeding Tracker", "Logs feeding times and durations to help parents maintain consistent feeding routines and track intake.", 9, "feeding-tracker"),
  ("Baby Development Tracker", "Monitors milestone progress such as crawling, walking, and speech to ensure children meet expected developmental stages.", 9, "baby-development-tracker"),
  ("Baby Name Generator", "Generates curated baby name lists based on cultural themes, meanings, and language preferences for expecting parents.", 9,  "baby-name-generator"),
  ("Game Suggestions by Age", "Recommends age-appropriate games and activities to support learning, creativity, and skill development at each stage.", 9,  "game-suggestions-by-age"),
  ("Weekly Healthy Meal Planner", "Designs balanced weekly meal plans tailored to children’s nutritional needs and dietary restrictions for healthy growth.", 9, "weekly-healthy-meal-planner"),
  ("Story Narrator for Kids", "Transforms text stories into narrated audio with engaging voices and sound effects to entertain and educate young listeners.", 9, "story-narrator-for-kids")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Daily Prayer Times", "Calculates precise prayer times for any location based on astronomical data and local conventions to support daily worship.", 10,  "daily-prayer-times"),
  ("Scripture Search", "Provides keyword and phrase search across multiple sacred texts with context and cross-references for study and reflection.", 10, "scripture-search"),
  ("Daily Blessings Generator", "Delivers a randomized blessing or verse each day for spiritual inspiration and guidance in various traditions.", 10, "daily-blessings-generator"),
  ("Fasting Time Calculator", "Determines start and end times for religious fasts by calculating sunrise and sunset based on geographic coordinates.", 10, "fasting-time-calculator"),
  ("Places of Worship Locator", "Finds nearby mosques, churches, synagogues, and temples with directions and contact information for easy access.", 10, "places-of-worship-locator"),
  ("Sabbath Candle Lighting Time", "Computes exact times to light Sabbath candles based on local sunset times and halachic rules.", 10, "sabbath-candle-lighting-time");



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Ovulation and Fertility Calculator", "Estimates fertile windows and ovulation dates using cycle length and past period data to assist family planning.", 11, "ovulation-and-fertility-calculator"),
  ("Cosmetic Ingredient Checker", "Analyzes skincare and makeup ingredient lists to identify harmful substances and potential allergens.", 11, "cosmetic-ingredient-checker"),
  ("Pregnancy Week Calculator", "Tracks pregnancy progression by calculating current gestational week and expected due date from last menstrual period.", 11, "pregnancy-week-calculator")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Word Puzzle Generator", "Creates custom word puzzles like crosswords and word searches from user-provided word lists for fun educational games.", 12, "word-puzzle-generator"),
  ("Funny Story Generator", "Crafts short, humorous stories with randomized characters and plots to spark children’s imagination.", 12, "funny-story-generator"),
  ("Random Text Generator", "Generates creative sentences or paragraphs with whimsical themes for writing prompts and language practice.", 12, "random-text-generator"),
  ("Cool Text Converter", "Transforms plain text into stylized Unicode and ASCII art for fun social media posts.", 12, "cool-text-converter"),
  ("Emoji Translator", "Transforms words and phrases into emoji sequences that capture the intended meaning playfully.", 12, "emoji-translator"),
  ("Emoji Stories Generator", "Composes short narratives using only emojis to challenge kids to interpret visual storytelling.", 12, "emoji-stories-generator"),
  ("Random Jokes Generator", "Serves age-appropriate jokes and riddles at random to entertain children.", 12, "random-jokes-generator"),
  ("Silly Daily Forecast", "Provides quirky, playful daily “horoscopes” with imaginative predictions to amuse kids.", 12, "silly-daily-forecast"),
  ("Faux Facts Generator", "Produces believable-sounding but fictitious facts to inspire creativity and critical thinking.", 12, "faux-facts-generator")
;



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Live Match Scores", "Streams real-time scores and key events for ongoing football matches across major leagues.", 13, "live-match-scores"),
  ("Match Schedule Lookup", "Displays upcoming fixtures filtered by league or team with dates, times, and broadcast information.", 13, "match-schedule-lookup"),
  ("Player Stats Analysis", "Analyzes player performance metrics such as goals and assists to generate in-depth reports.", 13, "player-stats-analysis"),
  ("Football Trivia Quiz", "Challenges fans with randomized quizzes on football history, records, and legends.", 13, "football-trivia-quiz"),
  ("Open Fields Locator", "Finds public football pitches and facilities in your area with maps and availability details.", 13, "open-fields-locator"),
  ("Player Profile Search", "Retrieves player bios, career stats, and news updates by entering their name.", 13, "player-profile-search"),
  ("Player Comparison Tool", "Compares two players side-by-side across key metrics to highlight strengths and weaknesses.", 13, "player-comparison-tool")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Currency Converter", "Converts amounts between multiple currencies using live exchange rates for accurate transactions.", 14, "currency-converter"),
  ("Investment Calculator", "Projects returns on investments or loans by calculating compound interest over custom periods.", 14, "investment-calculator")
;

INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Fuel Consumption Checker", "Estimates average fuel consumption for specific car models based on manufacturer data.", 15, "fuel-consumption-checker"),
  ("Gas Stations Locator", "Finds nearby petrol stations that are currently open, including fuel prices and amenities.", 15, "gas-stations-locator"),
  ("Tire Size Checker", "Matches compatible tire sizes and pressure recommendations for your vehicle make and model.", 15, "tire-size-checker"),
  ("Traffic Load Checker", "Analyzes live traffic data to identify congested routes and suggest faster alternatives.", 15, "traffic-load-checker"),
  ("Used Car Price Checker", "Provides market price estimates for used vehicles based on make, model, year, and condition.", 15, "used-car-price-checker")
;



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Distance/Speed/Time Calculator", "Computes missing variables among distance, speed, and time relationships for physics problem-solving.", 16, "distance-speed-time-calculator"),
  ("Acceleration Calculator", "Determines acceleration from given initial and final velocities and time intervals.", 16, "acceleration-calculator"),
  ("Kinematic Motion Solver", "Solves equations for objects under constant acceleration to predict future states.", 16, "kinematic-motion-solver"),
  ("Free Fall Calculator", "Calculates fall time and impact speed neglecting air resistance to model simple gravity.", 16, "free-fall-calculator"),
  ("Force Calculator (F = ma)", "Applies Newton’s second law to compute force given mass and acceleration inputs.", 16, "force-calculator"),
  ("Work and Energy Calculator", "Evaluates work done and changes in energy for systems based on force and displacement.", 16, "work-and-energy-calculator"),
  ("Kinetic/Potential Energy Calculator", "Determines energy values and transition points for mechanical systems.", 16, "kinetic-potential-energy-calculator"),
  ("Torque Calculator", "Computes torque produced by forces acting at distances from pivot points.", 16, "torque-calculator"),
  ("Heat Transfer Calculator", "Calculates heat transfer using mass, specific heat, and temperature change inputs (Q=mcΔT).", 16, "heat-transfer-calculator"),
  ("Temp Conversion Calculator", "Converts temperatures between Celsius, Fahrenheit, and Kelvin scales.", 16, "temp-conversion-calculator"),
  ("Radioactive Half-Life Calculator", "Models radioactive decay by computing remaining mass over half-life periods.", 16, "radioactive-half-life-calculator"),
  ("Photon Energy Calculator", "Determines photon energy from wavelength or frequency using Planck’s relation.", 16, "photon-energy-calculator")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Mass vs Weight Calculator", "Compares how mass translates to weight under varying gravity fields of different planets.", 17, "mass-vs-weight-calculator"),
  ("Escape Velocity Calculator", "Computes the minimum speed needed to break free from a celestial body’s gravity.", 17, "escape-velocity-calculator"),
  ("Gravitational Force Calculator", "Applies Newton’s law of universal gravitation to calculate force between two masses.", 17, "gravitational-force-calculator"),
  ("Solar/Lunar Cycle Calculator", "Determines local sunrise, sunset, and moon phase times based on date and location.", 17, "solar-lunar-cycle-calculator")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Periodic Table Lookup", "Provides elemental properties and atomic data lookup alongside interactive periodic table views.", 18, "periodic-table-lookup"),
  ("Ideal Gas Law Solver", "Solves PV=nRT and related equations to predict gas behavior under varying conditions.", 18, "ideal-gas-law-solver"),
  ("Molecular Diagram Generator", "Renders 2D structural diagrams from chemical formulas for presentations and study.", 18, "molecular-diagram-generator"),
  ("Chemical Formula Parser", "Breaks down complex chemical formulas into constituent elements and rebuilds them.", 18, "chemical-formula-parser"),
  ("SMILES to Structure Converter", "Converts SMILES notation into interactive molecular structures for research and education.", 18, "smiles-to-structure-converter")
;



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Function Graph Plotter", "Plots mathematical functions and allows zooming and annotation for detailed analysis.", 19, "function-graph-plotter"),
  ("Prime Number Checker", "Determines primality of integers and highlights their factors for demonstrations.", 19, "prime-number-checker"),
  ("Base Converter", "Transforms numbers between binary, hexadecimal, and other bases for computing tasks.", 19,  "base-converter"),
  ("Matrix Operations Calculator", "Performs matrix addition, multiplication, inversion, and more for linear algebra.", 19, "matrix-operations-calculator"),
  ("Equation Solver", "Solves linear and polynomial equations symbolically or numerically with steps.", 19,  "equation-solver"),
  ("Probability Calculator", "Calculates discrete event probabilities using combinatorial formulas.", 19,  "probability-calculator"),
  ("Combinatorics Tool", "Computes permutations, combinations, and factorials for counting problems.", 19,  "combinatorics-tool"),
  ("Symmetry Checker", "Analyzes functions or graphs to determine lines or points of symmetry.", 19, "symmetry-checker"),
  ("Limits and Derivatives Calculator", "Computes symbolic limits and derivatives to support calculus learning.", 19, "limits-and-derivatives-calculator")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Solar and Lunar Calculator", "Calculates daily solar and lunar cycles including golden hours and moon phases.", 20, "solar-and-lunar-calculator"),
  ("Live Weather Checker", "Fetches real-time weather data such as temperature, humidity, and wind speed.", 20, "live-weather-checker"),
  ("7-Day Forecast", "Provides a detailed week-long weather forecast with temperature, precipitation, and alerts.", 20, "7-day-forecast")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Fun Fact by Date", "Delivers surprising historical trivia tied to specific calendar dates.", 21, "fun-fact-by-date"),
  ("History Trivia Quiz", "Generates quizzes on historical events and figures with varying difficulty levels.", 21,  "history-trivia-quiz"),
  ("Period Distance Calculator", "Calculates the exact time span between two historical events in years, months, and days.", 21, "period-distance-calculator"),
  ("Historical Figure Search", "Filters historical personalities by era, field, or country for research insights.", 21, "historical-figure-search"),
  ("Border History Viewer", "Displays historical national borders on chosen dates using interactive maps.", 21, "border-history-viewer")
;



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Chord Converter", "Transposes chords between keys and formats chord charts for easy reading by performers.", 22, "chord-converter")
;



INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Random Fact", "Generates unexpected random facts across various topics to entertain and educate.", 23, "random-fact"),
  ("Random Sentence", "Creates quirky sentences for creative inspiration.", 23, "random-sentence"),
  ("Random Joke", "Serves up a fresh joke to lighten the mood.", 23, "random-joke"),
  ("Scientific Fact Generator", "Provides verifiable scientific trivia about the natural world.", 23, "scientific-fact-generator"),
  ("Philosophical Quote Generator", "Delivers thought-provoking quotes from philosophers to stimulate reflection.", 23, "philosophical-quote-generator"),
  ("Date-based Fun Fact", "Offers historical trivia based on dates for variety in random facts.", 23, "date-based-fun-fact"),
  ("Inspirational Sentence Generator", "Produces motivational sentences to boost productivity and confidence.", 23, "inspirational-sentence-generator"),
  ("Relaxing Music Generator", "Composes short ambient music clips for relaxation sessions.", 23, "relaxing-music-generator")
;


INSERT INTO tools_details (name, description, category_id, endpoint) VALUES
  ("Video Downloader", "Downloads videos for offline viewing and archiving.", 24, "video-downloader"),
  ("File Converter", "Converts files between formats while preserving layout and quality.", 24, "file-converter"),
  ("QR Code Generator", "Creates customizable QR codes with logos and color options for marketing materials.", 24, "qr-code-generator"),
  ("Color Blindness Simulator", "Simulates various types of color blindness to test design accessibility.", 24, "color-blindness-simulator"),
  ("Password Generator", "Generates secure, random passwords with configurable length and character sets.", 24, "password-generator")
;
