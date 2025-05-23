const baseConversionTable = {
  tsp: { tbsp: 1 / 3, cup: 1 / 48, ml: 4.93 },
  tbsp: { tsp: 3, cup: 1 / 16, ml: 14.79 },
  cup: { tsp: 48, tbsp: 16, ml: 240 },
  ml: { tsp: 1 / 4.93, tbsp: 1 / 14.79, cup: 1 / 240 },
};

const ingredientDensity = {
  water: 1,
  sugar: 0.85,
  flour: 0.53,
  oil: 0.92,
  honey: 1.42,
  milk: 1.03,
};

module.exports = { baseConversionTable, ingredientDensity };
