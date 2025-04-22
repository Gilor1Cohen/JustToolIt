const express = require("express");
const bcrypt = require("bcrypt");
const { LogIn, SignUp } = require("../business-logic-layer/AuthBL");
const router = express.Router();

router.post("/LogIn", async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  try {
    const LogInData = await LogIn(Email, Password);
  } catch (error) {
    const errorMessage = error.message;

    if (errorMessage === "Invalid Email or Password") {
      return res.status(401).json({ message: "Invalid email or password" });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
});

router.post("/SignUp", async (req, res) => {
  const { FirstName, Email, Password } = req.body;

  if (!FirstName || !Email || !Password) {
    return res
      .status(400)
      .json({ message: "Name, Email and Password are required" });
  }

  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(Password, saltRounds);

  const SignUpData = await SignUp(FirstName, Email, hashedPassword);

  try {
  } catch (error) {
    const errorMessage = error.message;
    if (errorMessage === "Email or Password already exists") {
      return res.status(409).json({ message: "Email already exists" });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
});

module.exports = router;
