require("dotenv").config();

const {
  GetUserPlanInfoByID,
  CreateNewSubscription,
  ChangePlanInTransaction,
} = require("../data-accsess-layer/PaymentDAL");

const jwt = require("jsonwebtoken");

async function ChangePlan(planID, userID) {
  try {
    const UserPlanInfoResult = await GetUserPlanInfoByID(userID);

    if (!UserPlanInfoResult.success || UserPlanInfoResult.data.length === 0) {
      return { success: false, message: "User subscription not found." };
    }

    const UserPlan = UserPlanInfoResult.data[0];

    if (UserPlan.plan_id === planID && UserPlan.status === "active") {
      return { success: false, message: "You're already on this plan." };
    }

    if (planID === 1) {
      const ChangeResult = await ChangePlanInTransaction(
        UserPlan.plan_id,
        userID,
        1,
        new Date(UserPlan.end_date),
        null
      );

      if (!ChangeResult.success) {
        return {
          success: false,
          message: "Unable to switch to free plan. Please try again later.",
        };
      }

      const updatedRes = await GetUserPlanInfoByID(userID);

      if (!updatedRes.success) {
        return {
          success: false,
          message:
            "Free plan scheduled, but failed to retrieve updated subscription info.",
        };
      }

      const token = jwt.sign(
        {
          id: updatedRes.data[0].user_id,
          plan_id: updatedRes.data[0].plan_id,
          plan_status: updatedRes.data[0].status,
          end_date:
            updatedRes.data[0].end_date === null
              ? null
              : new Date(updatedRes.data[0].end_date).toLocaleDateString(),
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "15m",
        }
      );

      return {
        success: true,
        message: `Free plan will start on ${new Date(
          UserPlan.end_date
        ).toLocaleDateString()}`,
        token,
        data: updatedRes.data[0],
      };
    }

    let ExtraDays = 0;

    if (UserPlan.plan_id !== 1) {
      const Today = new Date();
      const EndDate = new Date(UserPlan.end_date);

      if (EndDate > Today) {
        const DifferenceInTime = EndDate.getTime() - Today.getTime();
        ExtraDays = Math.ceil(DifferenceInTime / (1000 * 60 * 60 * 24));
      }
    }

    let StartDate = new Date();
    let EndDate = null;

    if (planID === 2) {
      EndDate = new Date();
      EndDate.setMonth(EndDate.getMonth() + 1);
      if (ExtraDays > 0) EndDate.setDate(EndDate.getDate() + ExtraDays);
    } else if (planID === 3) {
      EndDate = new Date();
      EndDate.setFullYear(EndDate.getFullYear() + 1);
      if (ExtraDays > 0) EndDate.setDate(EndDate.getDate() + ExtraDays);
    }

    const ChangeResult = await ChangePlanInTransaction(
      UserPlan.plan_id,
      userID,
      planID,
      StartDate,
      EndDate
    );

    if (!ChangeResult.success) {
      return {
        success: false,
        message: "Unable to change the subscription. Please try again later.",
      };
    }

    const updatedRes = await GetUserPlanInfoByID(userID);

    if (!updatedRes.success) {
      return {
        success: false,
        message:
          "Plan changed successfully, but failed to retrieve updated subscription info.",
      };
    }

    const token = jwt.sign(
      {
        id: updatedRes.data[0].user_id,
        plan_id: updatedRes.data[0].plan_id,
        plan_status: updatedRes.data[0].status,
        end_date:
          updatedRes.data[0].end_date === null
            ? null
            : new Date(updatedRes.data[0].end_date).toLocaleDateString(),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    return {
      success: true,
      message: "Plan changed successfully.",
      token,
      data: updatedRes.data[0],
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

module.exports = { ChangePlan };
