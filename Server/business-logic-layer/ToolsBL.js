const {
  ToolsCategories,
  ToolsList,
} = require("../data-accsess-layer/ToolsDAL");

async function GetToolsCategories() {
  try {
    return await ToolsCategories();
  } catch (error) {
    throw error;
  }
}

async function GetToolsList() {
  try {
    return await ToolsList();
  } catch (error) {
    throw error;
  }
}

module.exports = { GetToolsCategories, GetToolsList };
