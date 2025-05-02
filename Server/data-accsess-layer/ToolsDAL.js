const db = require("./Database");

async function ToolsCategories() {
  try {
    const [data] = await db.query(`SELECT * FROM tools_categories;`);

    return data;
  } catch (error) {
    throw new Error("Database query failed");
  }
}

async function ToolsList() {
  try {
    const [data] = await db.query(`SELECT * FROM tools_categories;`);

    return data;
  } catch (error) {
    throw new Error("Database query failed");
  }
}

module.exports = { ToolsCategories, ToolsList };
