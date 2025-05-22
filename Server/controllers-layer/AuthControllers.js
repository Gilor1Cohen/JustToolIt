const express = require("express");
const bcrypt = require("bcrypt");

const {
  LogIn,
  SignUp,
  handleFreeUserUsage,
} = require("../business-logic-layer/AuthBL");

const checkUserAccess = require("../middlewares/ToolsActions ");

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

    if (LogInData.success === false) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    res.cookie("token", LogInData.token, {
      httpOnly: true,
      sameSite: "Lax",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      userId: LogInData.data.id,
      planId: LogInData.data.plan_id,
      status: LogInData.data.status,
      end_date: LogInData.data.end_date,
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
      sameSite: "Lax",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User created successfully",
      userId,
      planId: 1,
      status: "active",
      end_date: null,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
});

router.get("/GetToken", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.status(200).json({ token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
});

router.get("/LogOut", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Lax",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
});

router.get("/checkUser", checkUserAccess, (req, res) => {
  try {
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
});

router.get("/addFreeUserAction", checkUserAccess, async (req, res) => {
  try {
    if (req.user.plan_id === 1 && req.user.plan_status === "active") {
      await handleFreeUserUsage(req.user);
    }

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
});

module.exports = router;
