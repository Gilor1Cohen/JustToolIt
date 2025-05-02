const express = require("express");

const {
  GetToolsCategories,
  GetToolsList,
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

router.get("/GetToolsList", async (req, res) => {
  try {
    const list = await GetToolsList();

    if (!list || list.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    return res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message | "Internal server error" });
  }
});

module.exports = router;
