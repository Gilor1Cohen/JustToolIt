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
};
