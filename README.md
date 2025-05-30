# Just-Tool-It

## Description

Just-Tool-It is a comprehensive web-based toolkit that brings together a wide variety of utilities in one intuitive platform. It offers tools for science, math, chemistry, health, and content generation — all accessible through a clean and responsive user interface.

The project is designed with scalability and modularity in mind, where each tool operates as an independent route and Angular component. The backend is built using a layered architecture in Node.js with Express and MySQL, enabling reliable performance and easy extension.

---

## 🚀 Technologies Used

### 🧠 Backend Stack

- **Node.js** with **Express.js** – REST API with layered architecture (Controllers, BL, DAL)
- **MySQL2** – database driver with support for promises and prepared statements
- **dotenv** – secure environment variable management
- **CORS** – handling cross-origin resource sharing
- **cookie-parser** – cookie handling middleware
- **jsonwebtoken** – token-based authentication (JWT)
- **bcrypt** – password hashing for secure authentication
- **nodemon** – automatic server reload during development

### 📦 Backend Utility Libraries

- **@faker-js/faker** – realistic fake data generation (names, addresses, etc.)
- **fancy-text-generator** – styled/Unicode text generation
- **figlet** – ASCII art text generator
- **lorem-ipsum** – placeholder text generation
- **reading-time** – calculate estimated reading time of content
- **qrcode** – QR code generation
- **open-trivia-db** – trivia question API wrapper

### 🎨 Frontend Stack

- **Angular 19** – main frontend framework
- **Angular Router** – client-side routing per tool
- **Reactive Forms** – dynamic form handling
- **RxJS** – reactive programming with Observables
- **JWT Decode** – client-side token parsing and authentication state
- **TypeScript** – typed JavaScript for scalable frontend logic

## 🌐 External APIs Used

Just-Tool-It integrates with several public APIs to enhance the user experience and provide real-time or random content. Below is the list of external APIs that are used and not routed through the backend server (`localhost:4201`):

### 🍽️ Food & Recipes

- [TheMealDB – List Categories](https://www.themealdb.com/api/json/v1/1/list.php?a=list)
- [TheMealDB – Filter by Area](https://www.themealdb.com/api/json/v1/1/filter.php?a=...)
- [TheMealDB – Lookup by ID](https://www.themealdb.com/api/json/v1/1/lookup.php?i=...)

### 🕋 Prayer Times

- [Aladhan API](http://api.aladhan.com/v1/timingsByCity)

### 🗺️ Location Lookup

- [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/)

### 🌅 Sunrise & Sunset

- [Sunrise-Sunset API](https://api.sunrise-sunset.org/)

### 😂 Fun & Facts

- [Official Joke API](https://official-joke-api.appspot.com/)
- [Useless Facts API](https://uselessfacts.jsph.pl/)
- [Chuck Norris API](https://api.chucknorris.io/)
- [Cat Fact API](https://catfact.ninja/)
- [Kanye Rest API](https://api.kanye.rest/)
- [Yes/No API](https://yesno.wtf/api)

### 👤 Random People & Animals

- [Random User Generator](https://randomuser.me/)
- [Dog CEO API](https://dog.ceo/)
- [RandomFox API](https://randomfox.ca/)

### 🃏 Cards

- [Deck of Cards API](https://deckofcardsapi.com/)

### 🚀 Space

- [SpaceX Launches API](https://api.spacexdata.com/)

### 🧠 History & Wiki

- [Wikimedia Search API](https://api.wikimedia.org/core/v1/wikipedia/en/search/page)

### 🧬 Pokémon

- [PokéAPI](https://pokeapi.co/)

---

## 📂 Project Structure

Just-Tool-It
├── client/ # Angular Frontend
│ ├── app
│ └── Core
├──server/ # Express Backend
│ ├── controllers-layer/
│ ├── business-logic-layer/
│ ├── data-access-layer/
│ ├── middlewares
│ └── assets
└── README.md

## ⚙️ Installation & Setup

To run the Just-Tool-It project locally:

### 1. Clone the repository:

```bash
git clone https://github.com/Gilor1Cohen/JustToolIt
cd JustToolIt
```

### 2. Install dependencies:

```bash

# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 3. Configure environment variables:

```bash

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=justtoolit


```

### 4. Start the backend:

```bash

cd server
npm run dev

```

### 5. Start the frontend:

```bash

cd ../client
ng serve


```

```bash

Frontend: http://localhost:4200

Backend: http://localhost:4201

```

---

## 🗄️ Database Configuration

This project uses **MySQL** as the relational database.

Before running the backend server, follow these steps:

1. Make sure your MySQL server is running.
2. Run the SQL script located at `server/schema.sql` to create the database and seed it with initial data.
   You can execute it using any MySQL client (such as MySQL Workbench or the CLI).

3. Create a `.env` file inside the `server/` directory to store your database credentials:

**server/.env**

4. The backend reads this configuration using `dotenv`.  
   Make sure your `db.js` includes:

```js
require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

module.exports = db;
```

### 🛠️ Available Tools

## 🎓 Student Tools

- Topic Trivia Quiz

## 💻 Developer Tools

- Base64 Size Calculator
- Binary Code Generator
- Regex Tester with Explanations
- JWT Token Decoder

## 🎨 Content Creator Tools

- Name Generator
- Read Time Estimate Calculator
- QR Code Generator

## 🥗 Food and Health Tools

- BMI Calculator
- Daily Water Intake Calculator
- Daily Calorie Calculator
- Body Fat Percentage Calculator

## 👨‍🍳 Cooking and Baking Tools

- Random Recipe Generator
- Temperature Converter
- Unit Converter for Ingredients (teaspoons/cups/grams etc.)

## 🕋 Religious Tools

- Daily Prayer Times
- Sabbath Candle Lighting Time

## 🧒 Kids Tools

- Random Text Generator
- Cool Text Converter
- Random Jokes Generator
- Faux Facts Generator

## 🔬 Physics Tools

- Distance/Speed/Time Calculator
- Acceleration Calculator
- Kinematic Motion Solver
- Free Fall Calculator
- Force Calculator (F = ma)
- Work and Energy Calculator
- Kinetic/Potential Energy Calculator
- Torque Calculator
- Heat Transfer Calculator
- Radioactive Half-Life Calculator
- Photon Energy Calculator

## 🌌 Astronomy and Astrophysics Tools

- Mass vs Weight Calculator
- Escape Velocity Calculator

## 🧪 Chemistry Tools

- Periodic Table Lookup
- Ideal Gas Law Solver
- Chemical Formula Parser

## 📐 Math Tools

- Prime Number Checker
- Base Converter
- Probability Calculator

## 📜 History Tools

- Historical Figure Search

## 🎲 Random Tools

- Random Fact
- Programming Joke Generator
- Chuck Norris Joke Generator
- Cat Fact Generator
- Random User Generator
- Dog Image Generator
- Pokemon Info Generator
- YesNo Generator
- Kanye Quote Generator
- Deck of Cards Generator
- Fox Image Generator
- SpaceX Launch Generator

## 👤 Author

Developed by [Gilor Cohen](https://github.com/Gilor1Cohen)
