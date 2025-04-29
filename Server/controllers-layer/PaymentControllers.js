const express = require("express");

const { ChangePlan } = require("../business-logic-layer/PaymentBL");

const router = express.Router();

router.post("/Change-Plan", async (req, res) => {
  try {
    const planID = req.body.plan;
    const userID = req.body.userID;

    const result = await ChangePlan(planID, userID);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Lax",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("token", result.token, {
      httpOnly: true,
      sameSite: "Lax",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Plan changed successfully.",
      data: result.data,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
});

module.exports = router;
