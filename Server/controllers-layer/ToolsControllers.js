const express = require("express");

const {
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
  computeDistanceSpeedTime,
  calculateAcceleration,
  solveKinematicMotion,
  calculateFreeFall,
  calculateForce,
  calculateWorkAndEnergy,
  calculateKineticPotentialEnergy,
  calculateTorque,
  calculateHeatTransfer,
  calculateRadioactiveHalfLife,
  calculatePhotonEnergy,
} = require("../business-logic-layer/ToolsBL");

const { handleFreeUserUsage } = require("../business-logic-layer/AuthBL");

const checkUserAccess = require("../middlewares/ToolsActions ");
const { F } = require("../assets/TemperatureUnits");

const router = express.Router();

router.get("/GetToolsCategories", async (req, res) => {
  try {
    const categories = await GetToolsCategories();

    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    return res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message | "Internal server error" });
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
    res.status(500).json({ message: error.message | "Internal server error" });
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
    res.status(500).json({ message: error.message | "Internal server error" });
  }
});

router.get(
  "/getTriviaQuestions/:category/:difficulty/:amount",
  checkUserAccess,
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

      if (req.user.plan_id === 1 && req.user.plan_status === "active") {
        await handleFreeUserUsage(req.user);
      }

      return res.status(200).json(Questions);
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  }
);

router.post("/Base64SizeCalc", checkUserAccess, async (req, res) => {
  try {
    const { base64 } = req.body;

    const size = Base64SizeCalc(base64);

    if (req.user.plan_id === 1 && req.user.plan_status === "active") {
      await handleFreeUserUsage(req.user);
    }
    return res.status(200).json(size);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

router.post("/BinaryCodeGenerator", checkUserAccess, async (req, res) => {
  try {
    const { text } = req.body;

    const BinaryCode = BinaryCodeGenerator(text);

    if (req.user.plan_id === 1 && req.user.plan_status === "active") {
      await handleFreeUserUsage(req.user);
    }
    return res.status(200).json(BinaryCode);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

router.post("/JwtTokenDecoder", checkUserAccess, async (req, res) => {
  try {
    const { token } = req.body;

    const TokenDecoder = JwtTokenDecoder(token);

    if (req.user.plan_id === 1 && req.user.plan_status === "active") {
      await handleFreeUserUsage(req.user);
    }
    return res.status(200).json(TokenDecoder);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

router.post(
  "/RegexTesterWithExplanations",
  checkUserAccess,
  async (req, res) => {
    try {
      const { pattern } = req.body;

      if (typeof pattern !== "string" || !pattern.trim()) {
        return res
          .status(400)
          .json({ message: "Pattern must be a non-empty string." });
      }

      const Test = RegexTest(pattern);

      if (Test.error) {
        return res.status(400).json({
          message: Test.error,
        });
      }

      if (req.user.plan_id === 1 && req.user.plan_status === "active") {
        await handleFreeUserUsage(req.user);
      }

      return res.status(200).json(Test);
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  }
);

router.post("/NameGenerator", checkUserAccess, async (req, res) => {
  try {
    const { typeOfName } = req.body;

    if (!typeOfName) {
      return res.status(404).json({ message: "No categories of name found" });
    }

    const name = NameGenerator(typeOfName);

    if (!name) {
      return res.status(404).json({ message: "No categories of name found" });
    }

    if (req.user.plan_id === 1 && req.user.plan_status === "active") {
      await handleFreeUserUsage(req.user);
    }

    return res.status(200).json(name);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

router.post(
  "/ReadTimeEstimateCalculator",
  checkUserAccess,
  async (req, res) => {
    try {
      const { Text } = req.body;

      if (!Text) {
        return res.status(404).json({ message: "No text found" });
      }

      const data = ReadTimeEstimateCalculator(Text);

      if (req.user.plan_id === 1 && req.user.plan_status === "active") {
        await handleFreeUserUsage(req.user);
      }

      return res.status(200).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  }
);

router.post("/QrCodeGenerator", checkUserAccess, async (req, res) => {
  try {
    const { URL } = req.body;

    if (!URL) {
      return res.status(404).json({ message: "No URL found" });
    }

    const data = await QrCodeGenerator(URL);

    if (req.user.plan_id === 1 && req.user.plan_status === "active") {
      await handleFreeUserUsage(req.user);
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

router.post("/BmiCalculator", checkUserAccess, async (req, res) => {
  try {
    const { Weight, Height, Age, Gender } = req.body;

    if (!Weight || !Height || !Age || !Gender) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    if (Weight <= 0 || Height <= 0 || Age <= 0) {
      return res.status(400).json({ message: "Invalid input values." });
    }

    const data = BmiCalculator(Weight, Height, Age, Gender);

    if (req.user.plan_id === 1 && req.user.plan_status === "active") {
      await handleFreeUserUsage(req.user);
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

router.post(
  "/DailyWaterIntakeCalculator",
  checkUserAccess,
  async (req, res) => {
    try {
      const { Weight, activityLevel, climate } = req.body;

      if (!Weight || !activityLevel || !climate) {
        return res.status(400).json({ message: "Missing required fields." });
      }

      if (Weight <= 0) {
        return res.status(400).json({ message: "Invalid input values." });
      }

      const data = DailyWaterIntakeCalculator(Weight, activityLevel, climate);

      if (req.user.plan_id === 1 && req.user.plan_status === "active") {
        await handleFreeUserUsage(req.user);
      }

      return res.status(200).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  }
);

router.post("/DailyCalorieCalculator", checkUserAccess, async (req, res) => {
  try {
    const { Weight, Height, Age, ActivityLevel, Gender } = req.body;

    if (!Age || !Gender || !Height || !Weight || !ActivityLevel) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (Weight <= 0 || Height <= 0 || Age <= 0) {
      return res.status(400).json({ message: "Invalid input values." });
    }

    const data = calculateCalories(Weight, Height, Age, ActivityLevel, Gender);

    if (req.user.plan_id === 1 && req.user.plan_status === "active") {
      await handleFreeUserUsage(req.user);
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

router.post(
  "/BodyFatPercentageCalculator",
  checkUserAccess,
  async (req, res) => {
    try {
      const { Gender, Waist, Neck, Height, Hip } = req.body;

      if (!Gender || !Waist || !Height || !Neck || !Hip) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      if (Waist <= 0 || Height <= 0 || Neck <= 0 || Hip <= 0) {
        return res.status(400).json({ message: "Invalid input values." });
      }

      const data = calculateBodyFat(Gender, Waist, Neck, Height, Hip);

      if (!data.success) {
        return res.status(400).json({ message: data.message });
      }

      if (req.user.plan_id === 1 && req.user.plan_status === "active") {
        await handleFreeUserUsage(req.user);
      }

      return res.status(200).json(data.bodyFat);
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  }
);

router.post("/TemperatureConverter", checkUserAccess, async (req, res) => {
  try {
    const { Value, FromUnit, ToUnit } = req.body;

    if (
      typeof Value !== "number" ||
      isNaN(Value) ||
      !["C", "F", "K"].includes(FromUnit) ||
      !["C", "F", "K"].includes(ToUnit)
    ) {
      return res.status(400).json({ message: "Invalid input data." });
    }

    if (FromUnit === ToUnit) {
      return res.status(400).json({ message: "No conversion needed." });
    }

    const data = TemperatureConverter(Value, FromUnit, ToUnit);

    if (!data.success) {
      return res.status(400).json({ message: data.message });
    }

    if (req.user.plan_id === 1 && req.user.plan_status === "active") {
      await handleFreeUserUsage(req.user);
    }

    return res.status(200).json(data.data);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

router.post("/UnitsConverter", checkUserAccess, async (req, res) => {
  try {
    const { Value, FromUnit, ToUnit, Ingredient } = req.body;

    if (!Value || !FromUnit || !ToUnit || !Ingredient) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (FromUnit === ToUnit) {
      return res.status(400).json({ message: "No conversion needed." });
    }

    const data = UnitsConverter(Value, FromUnit, ToUnit, Ingredient);

    if (!data.success) {
      return res.status(400).json({ message: data.message });
    }

    if (req.user.plan_id === 1 && req.user.plan_status === "active") {
      await handleFreeUserUsage(req.user);
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

router.post("/RandomTextGenerator", checkUserAccess, async (req, res) => {
  try {
    const { Paragraphs, wordsPerParagraph } = req.body;

    if (
      !Paragraphs ||
      +Paragraphs < 1 ||
      !wordsPerParagraph ||
      +wordsPerParagraph < 10
    ) {
      return res.status(400).json({ message: "Invalid input data." });
    }

    const data = createRandomText(Paragraphs, wordsPerParagraph);

    if (req.user.plan_id === 1 && req.user.plan_status === "active") {
      await handleFreeUserUsage(req.user);
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

router.post("/CoolTextConverter", checkUserAccess, async (req, res) => {
  try {
    const { Text } = req.body;

    if (!Text || typeof Text !== "string") {
      return res.status(400).json({ message: "Invalid text input." });
    }

    const data = await convertText(Text);

    if (req.user.plan_id === 1 && req.user.plan_status === "active") {
      await handleFreeUserUsage(req.user);
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

router.post("/computeDistanceSpeedTime", checkUserAccess, async (req, res) => {
  try {
    const { distance, speed, time } = req.body;

    if ([distance, speed, time].filter((v) => v == null).length > 1) {
      return res.status(400).json({
        message: "At least two values (distance, speed, time) are required",
      });
    }

    const data = computeDistanceSpeedTime(distance, speed, time);

    if (req.user.plan_id === 1 && req.user.plan_status === "active") {
      await handleFreeUserUsage(req.user);
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

router.post("/calculateAcceleration", checkUserAccess, async (req, res) => {
  try {
    const { initialVelocity, finalVelocity, time } = req.body;

    if (initialVelocity == null || finalVelocity == null || time == null) {
      return res.status(400).json({
        message:
          "Provide initialVelocity, finalVelocity and time to compute acceleration",
      });
    }

    if (time === 0) {
      return res.status(400).json({
        message: "Time must be non-zero",
      });
    }

    const data = calculateAcceleration(initialVelocity, finalVelocity, time);

    if (req.user.plan_id === 1 && req.user.plan_status === "active") {
      await handleFreeUserUsage(req.user);
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

router.post("/solveKinematicMotion", checkUserAccess, async (req, res) => {
  try {
    const { initialVelocity, acceleration, time } = req.body;

    if (initialVelocity == null || acceleration == null || time == null) {
      return res.status(400).json({
        message:
          "Provide initialVelocity, acceleration and time to solve kinematic motion",
      });
    }

    const data = solveKinematicMotion(initialVelocity, acceleration, time);

    if (req.user.plan_id === 1 && req.user.plan_status === "active") {
      await handleFreeUserUsage(req.user);
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

router.post("/calculateFreeFall", checkUserAccess, async (req, res) => {
  try {
    const { height, time, impactSpeed } = req.body;

    const data = calculateFreeFall(height, time, impactSpeed);

    if (req.user.plan_id === 1 && req.user.plan_status === "active") {
      await handleFreeUserUsage(req.user);
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

router.post("/calculateForce", checkUserAccess, async (req, res) => {
  try {
    const { mass, acceleration } = req.body;

    if (mass == null || acceleration == null) {
      return res.status(400).json({
        message: "Provide mass and acceleration to compute acceleration",
      });
    }

    const data = calculateForce(mass, acceleration);

    if (req.user.plan_id === 1 && req.user.plan_status === "active") {
      await handleFreeUserUsage(req.user);
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

router.post("/calculateWorkAndEnergy", checkUserAccess, async (req, res) => {
  try {
    const { force, displacement } = req.body;

    if (force == null || displacement == null) {
      return res.status(400).json({
        message: "Provide force and displacement to compute work",
      });
    }

    const data = calculateWorkAndEnergy(force, displacement);

    if (req.user.plan_id === 1 && req.user.plan_status === "active") {
      await handleFreeUserUsage(req.user);
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

router.post(
  "/calculateKineticPotentialEnergy",
  checkUserAccess,
  async (req, res) => {
    try {
      const { mass, velocity, height } = req.body;

      if (mass == null) {
        return res.status(400).json({
          message: "Provide mass",
        });
      }

      const data = calculateKineticPotentialEnergy(mass, velocity, height);

      if (req.user.plan_id === 1 && req.user.plan_status === "active") {
        await handleFreeUserUsage(req.user);
      }

      return res.status(200).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  }
);

router.post("/calculateTorque", checkUserAccess, async (req, res) => {
  try {
    const { force, distance } = req.body;

    if (force == null || distance == null) {
      return res.status(400).json({
        message: "Provide force and distance to compute torque",
      });
    }

    const data = calculateTorque(force, distance);

    if (req.user.plan_id === 1 && req.user.plan_status === "active") {
      await handleFreeUserUsage(req.user);
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

router.post("/calculateHeatTransfer", checkUserAccess, async (req, res) => {
  try {
    const { mass, specificHeat, temperatureChange } = req.body;

    if (mass == null || specificHeat == null || temperatureChange == null) {
      return res.status(400).json({
        message: "Provide mass, specificHeat and temperatureChange",
      });
    }

    const data = calculateHeatTransfer(mass, specificHeat, temperatureChange);

    if (req.user.plan_id === 1 && req.user.plan_status === "active") {
      await handleFreeUserUsage(req.user);
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

router.post(
  "/calculateRadioactiveHalfLife",
  checkUserAccess,
  async (req, res) => {
    try {
      const { initialMass, halfLife, time } = req.body;

      if (initialMass == null || halfLife == null || time == null) {
        return res.status(400).json({
          message: "Provide initialMass, halfLife and time",
        });
      }

      const data = calculateRadioactiveHalfLife(initialMass, halfLife, time);

      if (req.user.plan_id === 1 && req.user.plan_status === "active") {
        await handleFreeUserUsage(req.user);
      }

      return res.status(200).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  }
);

router.post("/calculatePhotonEnergy", checkUserAccess, async (req, res) => {
  try {
    const { wavelength, frequency } = req.body;

    if (wavelength == null && frequency == null) {
      return res.status(400).json({
        message: "Provide wavelength or frequency",
      });
    }

    const data = calculatePhotonEnergy(wavelength, frequency);

    if (req.user.plan_id === 1 && req.user.plan_status === "active") {
      await handleFreeUserUsage(req.user);
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

module.exports = router;
