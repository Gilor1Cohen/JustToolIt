const db = require("./Database");

async function AddNewUser(FirstName, Email, Password) {
  try {
    const [data] = await db.query(
      "INSERT INTO users (user_name, email, password_hash) VALUES (?, ?, ?)",
      [FirstName, Email, Password]
    );

    if (data.affectedRows === 0) {
      return { success: false, message: "Internal server error" };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
}

async function IsEmailExists(Email) {
  try {
    const [data] = await db.query("SELECT * FROM users WHERE email = ?", [
      Email,
    ]);

    if (data.length > 0) {
      return { success: false, message: "Internal server error" };
    }

    return { success: true, email: data };
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
}

async function GetInfoByEmail(Email) {
  try {
    const [data] = await db.query(
      "SELECT users.id, users.password_hash ,user_subscriptions.plan_id, user_subscriptions.status, user_subscriptions.end_date FROM users INNER JOIN user_subscriptions ON users.id = user_subscriptions.user_id  WHERE email = ?   AND user_subscriptions.start_date <= NOW() AND (user_subscriptions.end_date IS NULL OR user_subscriptions.end_date > NOW()) ORDER BY user_subscriptions.start_date DESC, user_subscriptions.plan_id  DESC LIMIT 1",
      [Email]
    );

    if (data.length === 0) {
      return { success: false, message: "Email not found" };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
}

async function getUserActionCountToday(id) {
  try {
    const [data] = await db.query(
      "SELECT count from free_user_actions WHERE user_id = ? AND action_date = CURDATE();",
      [id]
    );

    if (data.length > 0) {
      return { success: true, count: data[0].count };
    } else {
      return { success: true, count: 0 };
    }
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
}

async function incrementUserActionCountToday(userId) {
  try {
    const [data] = await db.query(
      `INSERT INTO free_user_actions (user_id, action_date, count)
       VALUES (?, CURDATE(), 1)
       ON DUPLICATE KEY UPDATE count = count + 1;`,
      [userId]
    );

    return { success: true };
  } catch (error) {
    return { success: false, message: "Failed to update action count." };
  }
}

module.exports = {
  IsEmailExists,
  GetInfoByEmail,
  AddNewUser,
  getUserActionCountToday,
  incrementUserActionCountToday,
};
