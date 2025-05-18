const {
  ToolsCategories,
  ToolsCategoriesIDByName,
  ToolsList,
} = require("../data-accsess-layer/ToolsDAL");

const regexTokenList = require("../assets/Regex");

const { Category, CategoryNames, getQuestions } = require("open-trivia-db");

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

module.exports = {
  GetToolsCategories,
  GetToolsList,
  getTriviaCategories,
  getTriviaQuestions,
  Base64SizeCalc,
  BinaryCodeGenerator,
  JwtTokenDecoder,
  RegexTest,
};
