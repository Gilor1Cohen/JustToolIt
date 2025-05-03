const db = require("./Database");

async function ToolsCategories() {
  try {
    const [data] = await db.query(`SELECT * FROM tools_categories;`);

    return data;
  } catch (error) {
    throw new Error("Database query failed");
  }
}

async function ToolsCategoriesIDByName(name) {
  try {
    const [data] = await db.query(
      `SELECT id FROM tools_categories WHERE name = ?;`,
      [name]
    );

    if (!data || data.length === 0) {
      return {
        success: false,
        message: "No categories found",
      };
    }

    return data[0].id;
  } catch (error) {
    return { success: false, message: "Database query failed" };
  }
}

async function ToolsList(id) {
  try {
    const [data] = await db.query(
      `SELECT * FROM tools_details WHERE category_id = ?;`,
      [id]
    );

    if (!data || data.length === 0) {
      return {
        success: false,
        message: "No tools found",
      };
    }
    return data;
  } catch (error) {
    throw new Error("Database query failed");
  }
}

module.exports = { ToolsCategories, ToolsCategoriesIDByName, ToolsList };
