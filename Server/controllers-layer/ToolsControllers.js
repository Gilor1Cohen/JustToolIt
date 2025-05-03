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

router.get("/GetToolsList/:name", async (req, res) => {
  try {
    const { name } = req.params;

    console.log(`name: ${name}`);

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

module.exports = router;
