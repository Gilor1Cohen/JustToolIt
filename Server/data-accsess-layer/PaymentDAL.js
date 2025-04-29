const db = require("./Database");

async function CreateNewSubscription(userID, planID, startDate, endDate) {
  try {
    const [result] = await db.query(
      `INSERT INTO user_subscriptions
      (user_id, plan_id, status, start_date, end_date)
       VALUES (?, ?, 'active', ?, ?)`,
      [userID, planID, startDate, endDate]
    );

    if (result.affectedRows === 0) {
      return { success: false, message: "Internal server error" };
    }

    const [data] = await db.query(
      `SELECT plan_id, status, end_date
      FROM user_subscriptions
        WHERE id = ?`,
      [result.insertId]
    );
    if (data.length === 0) {
      return { success: false, message: "Failed to retrieve new subscription" };
    }

    return {
      success: true,
      data: {
        plan_id: data[0].plan_id,
        status: data[0].status,
        end_date: data[0].end_date,
      },
      message: "Subscription created successfully.",
    };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

async function GetUserPlanInfoByID(id) {
  try {
    const [data] = await db.query(
      "SELECT users.id AS 'user_id' ,user_subscriptions.plan_id, user_subscriptions.status, user_subscriptions.start_date, user_subscriptions.end_date, user_subscriptions.created_at FROM users INNER JOIN user_subscriptions ON users.id = user_subscriptions.user_id WHERE users.id = ? AND user_subscriptions.start_date <= CURDATE() AND (user_subscriptions.end_date >= CURDATE() OR user_subscriptions.end_date IS NULL) ORDER BY user_subscriptions.start_date DESC, user_subscriptions.plan_id  DESC  LIMIT 1 ",
      [id]
    );

    if (!data.length) {
      return {
        success: false,
        message: "No subscription data found for this user.",
      };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
}

async function ChangePlanInTransaction(
  oldPlanID,
  userID,
  newPlanID,
  startDate,
  endDate
) {
  try {
    if (oldPlanID == 1) {
      const [cancelRes] = await db.query(
        `DELETE FROM user_subscriptions
         WHERE user_id = ? AND plan_id = 1`,
        [userID]
      );

      if (cancelRes.affectedRows === 0) {
        return { success: false, message: "Free subscription not found." };
      }
    } else {
      const [cancelRes] = await db.query(
        `UPDATE user_subscriptions
         SET status = 'cancelled'
       WHERE user_id = ? AND plan_id = ? AND status = 'active'`,
        [userID, oldPlanID]
      );
      if (cancelRes.affectedRows === 0) {
        return { success: false, message: "Subscription not found." };
      }
    }

    const [insertRes] = await db.query(
      `INSERT INTO user_subscriptions
         (user_id, plan_id, status, start_date, end_date)
       VALUES (?, ?, 'active', ?, ?)`,
      [userID, newPlanID, startDate, endDate]
    );

    if (insertRes.affectedRows === 0) {
      return { success: false, message: "Failed to create new subscription." };
    }

    return { success: true, message: "Plan changed successfully." };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

module.exports = {
  CreateNewSubscription,
  GetUserPlanInfoByID,
  ChangePlanInTransaction,
};
