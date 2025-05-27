const {
  ToolsCategories,
  ToolsCategoriesIDByName,
  ToolsList,
} = require("../data-accsess-layer/ToolsDAL");

const readingTime = require("reading-time");

const regexTokenList = require("../assets/Regex");

const { Category, CategoryNames, getQuestions } = require("open-trivia-db");

const { faker } = require("@faker-js/faker");

const QRCode = require("qrcode");

const ageGroups = require("../assets/BmiAgesGroups");

const table = require("../assets/TemperatureUnits");

const {
  baseConversionTable,
  ingredientDensity,
} = require("../assets/UnitCalc");

const { LoremIpsum } = require("lorem-ipsum");

const {
  toSmallCaps,
  toCircle,
  toFiglet,
} = require("../assets/coolTextConverter");

const fancy = require("fancy-text-generator");

const { elements } = require("../assets/PeriodicTableJSON.json");

async function GetToolsCategories() {
  try {
    return await ToolsCategories();
  } catch (error) {
    throw error;
  }
}

async function GetToolsList(name) {
  try {
    const CategoriesId = await ToolsCategoriesIDByName(name);

    if (CategoriesId.success === false) {
      return {
        success: false,
        message: CategoriesId.message,
      };
    }

    return await ToolsList(CategoriesId);
  } catch (error) {
    throw error;
  }
}

async function getTriviaCategories() {
  try {
    const names = Object.values(CategoryNames).filter(
      (v) => typeof v === "string"
    );

    const categories = names.map((name) => ({
      id: Category.idByName(name),
      name,
    }));

    if (categories.length === 0) {
      return {
        success: false,
        message: "No valid categories after was found",
      };
    }

    return {
      success: true,
      categories,
    };
  } catch (error) {
    throw error;
  }
}

async function getTriviaQuestions(category, difficulty, amount) {
  try {
    const questions = await getQuestions({
      amount,
      category,
      difficulty,
      type: "multiple",
    });

    return questions;
  } catch (error) {
    throw error;
  }
}

function Base64SizeCalc(base64) {
  if (typeof base64 !== "string" || !base64.trim()) {
    throw new Error("Invalid input: expected non-empty Base64 string");
  }

  const cleaned = base64.replace(/\s+/g, "");
  const raw = cleaned.includes(",") ? cleaned.split(",").pop() : cleaned;
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(raw)) {
    throw new Error("Invalid Base64 format");
  }

  const padding = (raw.match(/=+$/) || [""])[0].length;
  const bytes = Math.round((raw.length * 3) / 4 - padding);
  const kilobytes = Math.round((bytes / 1024) * 100) / 100;
  return { bytes, kilobytes };
}

function BinaryCodeGenerator(text) {
  return text
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}

function JwtTokenDecoder(token) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT structure");
  }

  const payloadBase64 =
    parts[1].replace(/-/g, "+").replace(/_/g, "/") +
    "=".repeat((4 - (parts[1].length % 4)) % 4);

  const payloadBuffer = Buffer.from(payloadBase64, "base64");
  const json = payloadBuffer.toString("utf8");
  return JSON.parse(json);
}

function RegexTest(pattern) {
  try {
    new RegExp(pattern);

    const explanations = [];

    for (const entry of regexTokenList) {
      const tokenRegex = new RegExp(
        entry.token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      );

      if (tokenRegex.test(pattern)) {
        explanations.push({
          token: entry.token,
          explanation: `${entry.token} ➝ ${entry.description}`,
          category: entry.category,
        });
      }
    }

    return {
      pattern,
      explanationCount: explanations.length,
      explanations,
    };
  } catch (err) {
    return {
      pattern,
      error: "Invalid regular expression: " + err.message,
    };
  }
}

function NameGenerator(typeOfName) {
  if (typeOfName === "FirstName") {
    return faker.person.firstName();
  } else if (typeOfName === "LastName") {
    return faker.person.lastName();
  } else if (typeOfName === "StupidName") {
    return faker.internet.username();
  } else {
    return null;
  }
}

function ReadTimeEstimateCalculator(Text) {
  return readingTime(Text);
}

async function QrCodeGenerator(URL) {
  return await QRCode.toDataURL(URL);
}

function BmiCalculator(Weight, Height, Age, Gender) {
  const heightInMeters = Height / 100;
  const bmi = Weight / (heightInMeters * heightInMeters);
  const bmiRounded = parseFloat(bmi.toFixed(2));
  let category = "";

  const group = ageGroups.find((g) => Age >= g.min && Age <= g.max);
  if (!group) return { BMI: bmiRounded, category: "Unknown" };

  const [min, max] = Gender === "male" ? group.male : group.female;

  if (bmi < min) category = "Underweight";
  else if (bmi > max) category = "Overweight";
  else category = "Normal weight";

  return { BMI: bmiRounded, category };
}

function DailyWaterIntakeCalculator(Weight, activityLevel, climate) {
  let baseWaterMl = Weight * 35;

  if (activityLevel === "moderate") {
    baseWaterMl += 500;
  } else if (activityLevel === "high") {
    baseWaterMl += 1000;
  }

  if (climate === "hot") {
    baseWaterMl += 750;
  } else if (climate === "cold") {
    baseWaterMl -= 250;
  }

  return parseFloat((baseWaterMl / 1000).toFixed(2));
}

function calculateCalories(Weight, Height, Age, ActivityLevel, Gender) {
  const bmr =
    Gender === "male"
      ? 10 * Weight + 6.25 * Height - 5 * Age + 5
      : 10 * Weight + 6.25 * Height - 5 * Age - 161;

  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  const multiplier = activityFactors[+ActivityLevel] || 1.2;

  return Math.round(bmr * multiplier);
}

function calculateBodyFat(Gender, Waist, Neck, Height, Hip) {
  if (Gender === "male") {
    const numerator = Waist - Neck;
    if (numerator <= 0) {
      return {
        success: false,
        message: "Waist must be greater than Neck for males.",
      };
    }

    const bodyFat =
      495 /
        (1.0324 -
          0.19077 * Math.log10(numerator) +
          0.15456 * Math.log10(Height)) -
      450;
    return { success: true, bodyFat: +bodyFat.toFixed(2) };
  }

  const numerator = Waist + Hip - Neck;
  if (numerator <= 0) {
    return {
      success: false,
      message: "Waist + Hip must be greater than Neck for females.",
    };
  }

  const bodyFat =
    495 /
      (1.29579 - 0.35004 * Math.log10(numerator) + 0.221 * Math.log10(Height)) -
    450;
  return { success: true, bodyFat: +bodyFat.toFixed(2) };
}

function TemperatureConverter(Value, FromUnit, ToUnit) {
  const raw = table[FromUnit][ToUnit](Value);
  const rounded = Math.round(raw * 100) / 100;

  return { success: true, data: rounded };
}

function UnitsConverter(Value, FromUnit, ToUnit, Ingredient) {
  FromUnit = FromUnit.toLowerCase();
  ToUnit = ToUnit.toLowerCase();
  Ingredient = Ingredient?.toLowerCase();

  if (FromUnit === ToUnit) {
    return {
      success: true,
      from: FromUnit,
      to: ToUnit,
      original: Value,
      converted: Value,
    };
  }

  const toML = baseConversionTable[FromUnit]?.ml;
  const fromML = 1 / (baseConversionTable[ToUnit]?.ml || 1);

  if (ToUnit === "g") {
    if (!toML)
      return {
        success: false,
        message: `Cannot convert ${FromUnit} to g directly.`,
      };
    const ml = Value * toML;
    const density = ingredientDensity[Ingredient] || 1;
    const grams = +(ml * density).toFixed(2);
    return {
      success: true,
      from: FromUnit,
      to: ToUnit,
      original: Value,
      converted: grams,
    };
  }

  if (FromUnit === "g") {
    const density = ingredientDensity[Ingredient] || 1;
    const ml = Value / density;
    const targetUnit = baseConversionTable[ToUnit];
    if (!targetUnit || !targetUnit.ml) {
      return { success: false, message: `Cannot convert from g to ${ToUnit}` };
    }
    const converted = +(ml * fromML).toFixed(2);
    return {
      success: true,
      from: FromUnit,
      to: ToUnit,
      original: Value,
      converted,
    };
  }

  const toFactor = baseConversionTable[FromUnit]?.[ToUnit];
  if (!toFactor) {
    return { success: false, message: "Unsupported unit conversion." };
  }

  const converted = +(Value * toFactor).toFixed(2);
  return {
    success: true,
    from: FromUnit,
    to: ToUnit,
    original: Value,
    converted,
  };
}

function createRandomText(Paragraphs, wordsPerParagraph) {
  const customLorem = new LoremIpsum({
    sentencesPerParagraph: {
      min: Math.max(1, Math.floor(wordsPerParagraph / 5)),
      max: Math.max(1, Math.ceil(wordsPerParagraph / 4)),
    },
    wordsPerSentence: {
      min: 4,
      max: 8,
    },
  });

  return customLorem.generateParagraphs(Paragraphs);
}

async function convertText(text) {
  const ascii = await toFiglet(text);

  return {
    original: text,
    smallCaps: toSmallCaps(text),
    circled: toCircle(text),
    ascii,
    fancyBold: fancy(text, "bold"),
    fancyItalic: fancy(text, "italic"),
    fancyMono: fancy(text, "monospace"),
  };
}

function computeDistanceSpeedTime(distance, speed, time) {
  if (distance == null) return { distance: speed * time };
  if (speed == null) return { speed: distance / time };
  if (time == null) return { time: distance / speed };

  return { distance, speed, time };
}

function calculateAcceleration(initialVelocity, finalVelocity, time) {
  return { acceleration: (finalVelocity - initialVelocity) / time };
}

function solveKinematicMotion(initialVelocity, acceleration, time) {
  const displacement = initialVelocity * time + 0.5 * acceleration * time ** 2;
  const finalVelocity = initialVelocity + acceleration * time;
  return {
    displacement,
    finalVelocity,
    finalPosition: displacement,
  };
}

function calculateFreeFall(height, time, impactSpeed) {
  const g = 9.81;
  let h = height,
    t = time,
    v = impactSpeed;
  if (h != null && t != null) {
    v = g * t;
  } else if (h != null && v != null) {
    t = v / g;
  } else if (t != null && v != null) {
    h = 0.5 * g * t ** 2;
  } else if (h != null) {
    t = Math.sqrt((2 * h) / g);
    v = g * t;
  } else if (t != null) {
    h = 0.5 * g * t ** 2;
    v = g * t;
  } else if (v != null) {
    t = v / g;
    h = 0.5 * g * t ** 2;
  } else {
    throw new Error("Provide at least one of: height, time, or impactSpeed");
  }
  return { height: h, time: t, impactSpeed: v };
}

function calculateForce(mass, acceleration) {
  return { force: mass * acceleration };
}

function calculateWorkAndEnergy(force, displacement) {
  return { work: force * displacement };
}

function calculateKineticPotentialEnergy(mass, velocity, height) {
  const results = {};
  if (velocity != null) {
    results.kineticEnergy = 0.5 * mass * velocity ** 2;
  }
  if (height != null) {
    results.potentialEnergy = mass * 9.81 * height;
  }
  return results;
}

function calculateTorque(force, distance) {
  return { torque: force * distance };
}

function calculateHeatTransfer(mass, specificHeat, temperatureChange) {
  return { heatTransfer: mass * specificHeat * temperatureChange };
}

function calculateRadioactiveHalfLife(initialMass, halfLife, time) {
  const remainingMass = initialMass * 0.5 ** (time / halfLife);
  return { remainingMass };
}

function calculatePhotonEnergy(wavelength, frequency) {
  let energy;
  if (wavelength != null) {
    energy = (6.626e-34 * 3e8) / wavelength;
  } else {
    energy = 6.626e-34 * frequency;
  }
  return { energy };
}

function calculateMassVsWeight(mass, gravity) {
  const weight = mass * gravity;
  return { weight };
}

function calculateEscapeVelocity(mass, radius) {
  const G = 6.6743e-11;
  const escapeVelocity = Math.sqrt((2 * G * mass) / radius);
  return { escapeVelocity };
}

function getElementData(query) {
  return elements.find((el) => {
    return (
      el.symbol?.toLowerCase() === String(query).toLowerCase() ||
      el.name?.toLowerCase() === String(query).toLowerCase() ||
      el.number === Number(query)
    );
  });
}

function solveIdealGasLaw(pressure, volume, moles, temperature) {
  let missing = null;

  if (pressure == null) {
    missing = "pressure";
    pressure = (moles * 0.0821 * temperature) / volume;
  } else if (volume == null) {
    missing = "volume";
    volume = (moles * 0.0821 * temperature) / pressure;
  } else if (moles == null) {
    missing = "moles";
    moles = (pressure * volume) / (0.0821 * temperature);
  } else if (temperature == null) {
    missing = "temperature";
    temperature = (pressure * volume) / (0.0821 * moles);
  }

  return { pressure, volume, moles, temperature, missing };
}

function parseChemicalFormula(formula) {
  if (!/^[A-Za-z0-9()]+$/.test(formula)) throw new Error("Invalid formula");

  const elementRegex = /([A-Z][a-z]?)(\d*)/g;
  const result = {};
  let match;

  while ((match = elementRegex.exec(formula)) !== null) {
    const [, element, count] = match;
    const num = parseInt(count || "1", 10);
    result[element] = (result[element] || 0) + num;
  }

  return result;
}

function calculateProbability(mode, n, r, successfulEvents) {
  n = Number(n);
  r = Number(r);
  successfulEvents = Number(successfulEvents);

  if (!["combination", "permutation"].includes(mode))
    throw new Error("Mode must be 'combination' or 'permutation'");
  if (isNaN(n) || isNaN(r) || isNaN(successfulEvents))
    throw new Error("All inputs must be numbers");
  if (n < 0 || r < 0 || r > n || successfulEvents < 0)
    throw new Error("Invalid values");

  let totalOutcomes;

  if (mode === "combination") {
    if (r > n - r) r = n - r;
    totalOutcomes = 1;
    for (let i = 1; i <= r; i++) {
      totalOutcomes *= n - r + i;
      totalOutcomes /= i;
    }
  } else {
    totalOutcomes = 1;
    for (let i = 0; i < r; i++) {
      totalOutcomes *= n - i;
    }
  }

  const probability = successfulEvents / totalOutcomes;

  return {
    totalOutcomes: Math.round(totalOutcomes),
    probability: +probability.toFixed(4),
  };
}

function checkPrimeAndFactors(number) {
  number = Number(number);

  let isPrime = true;
  const factors = [];

  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      isPrime = false;
      factors.push(i);
    }
  }

  const result = {
    isPrime: number > 1 && isPrime,
    factors,
  };

  if (!result.isPrime) {
    const isPrimeCheck = (num) => {
      if (num < 2) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    };

    let lower = number - 1;
    let upper = number + 1;

    while (lower > 1 || upper < Number.MAX_SAFE_INTEGER) {
      if (lower > 1 && isPrimeCheck(lower)) {
        result.closestPrime = lower;
        break;
      }
      if (isPrimeCheck(upper)) {
        result.closestPrime = upper;
        break;
      }
      lower--;
      upper++;
    }
  }

  return result;
}

function BaseConverter(value, fromBase, toBase) {
  const decimalValue = parseInt(value, fromBase);
  const convertedValue = decimalValue.toString(toBase);
  return { convertedValue };
}

module.exports = {
  GetToolsCategories,
  GetToolsList,
  getTriviaCategories,
  getTriviaQuestions,
  Base64SizeCalc,
  BinaryCodeGenerator,
  JwtTokenDecoder,
  RegexTest,
  NameGenerator,
  ReadTimeEstimateCalculator,
  QrCodeGenerator,
  BmiCalculator,
  DailyWaterIntakeCalculator,
  calculateCalories,
  calculateBodyFat,
  TemperatureConverter,
  UnitsConverter,
  createRandomText,
  convertText,
  computeDistanceSpeedTime,
  calculateAcceleration,
  solveKinematicMotion,
  calculateFreeFall,
  calculateForce,
  calculateWorkAndEnergy,
  calculateKineticPotentialEnergy,
  calculateTorque,
  calculateHeatTransfer,
  calculateRadioactiveHalfLife,
  calculatePhotonEnergy,
  calculateMassVsWeight,
  calculateEscapeVelocity,
  getElementData,
  solveIdealGasLaw,
  parseChemicalFormula,
  calculateProbability,
  checkPrimeAndFactors,
  BaseConverter,
};
