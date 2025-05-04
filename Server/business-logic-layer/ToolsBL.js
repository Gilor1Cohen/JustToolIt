const {
  ToolsCategories,
  ToolsCategoriesIDByName,
  ToolsList,
} = require("../data-accsess-layer/ToolsDAL");

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

module.exports = {
  GetToolsCategories,
  GetToolsList,
  getTriviaCategories,
  getTriviaQuestions,
};
