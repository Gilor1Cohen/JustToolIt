const express = require("express");

const {
  GetToolsCategories,
  GetToolsList,
  getTriviaCategories,
  getTriviaQuestions,
  Base64SizeCalc,
  RegexTest,
} = require("../business-logic-layer/ToolsBL");

const router = express.Router();

router.get("/GetToolsCategories", async (req, res) => {
  try {
    const categories = await GetToolsCategories();

    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    return res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message | "Internal server error" });
  }
});

router.get("/GetToolsList/:name", async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const list = await GetToolsList(`${name.replace(/-/g, " ")}`);

    if (!list || list.success === false) {
      return res.status(404).json({ message: "No categories found" });
    }

    return res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error: error.message | "Internal server error" });
  }
});

router.get("/getTriviaCategories", async (req, res) => {
  try {
    const Categories = await getTriviaCategories();

    if (!Categories.length === 0 || Categories.success === false) {
      return res.status(404).json({ message: "No categories found" });
    }

    return res.status(200).json(Categories.categories);
  } catch (error) {
    res.status(500).json({ error: error.message | "Internal server error" });
  }
});

router.get(
  "/getTriviaQuestions/:category/:difficulty/:amount",
  async (req, res) => {
    try {
      const { category, difficulty, amount } = req.params;

      if (!category || !difficulty || !amount || amount < 0 || amount > 49) {
        return res
          .status(400)
          .json({ message: "Missing category or amount parameter" });
      }

      const Questions = await getTriviaQuestions(
        +category,
        difficulty,
        +amount
      );

      return res.status(200).json(Questions);
    } catch (error) {
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  }
);

router.post("/Base64SizeCalc", async (req, res) => {
  try {
    const { base64 } = req.body;

    const size = Base64SizeCalc(base64);

    return res.status(200).json(size);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

router.post("/RegexTesterWithExplanations", (req, res) => {
  try {
    const { pattern } = req.body;

    if (typeof pattern !== "string" || !pattern.trim()) {
      return res
        .status(400)
        .json({ error: "Pattern must be a non-empty string." });
    }

    const Test = RegexTest(pattern);

    if (Test.error) {
      return res.status(400).json({
        message: Test.error,
      });
    }

    return res.status(200).json(Test);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

module.exports = router;
