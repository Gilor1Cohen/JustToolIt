const express = require("express");
const bcrypt = require("bcrypt");

const { LogIn, SignUp } = require("../business-logic-layer/AuthBL");

const router = express.Router();

router.post("/LogIn", async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res
      .status(400)
      .json({ message: error.message || "Internal server error" });
  }

  try {
    const LogInData = await LogIn(Email, Password);
    console.log(LogInData);

    if (LogInData.success === false) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    return res.status(200).json({
      message: "Login successful",
      token: LogInData.token,
      userId: LogInData.data.id,
      planId: LogInData.data.plan_id,
      status: LogInData.data.status,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
});

router.post("/SignUp", async (req, res) => {
  const { FirstName, Email, Password } = req.body;

  if (!FirstName || !Email || !Password) {
    return res
      .status(400)
      .json({ message: error.message || "Internal server error" });
  }

  try {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    const SignUpData = await SignUp(FirstName, Email, hashedPassword);

    if (SignUpData.success === false) {
      return res.status(500).json({ message: "Failed to add user" });
    }

    const token = SignUpData.token;
    const userId = SignUpData.userId;

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
    });

    return res.status(201).json({
      message: "User created successfully",
      token,
      userId,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
});

module.exports = router;
