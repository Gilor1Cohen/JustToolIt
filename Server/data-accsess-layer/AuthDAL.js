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
      "SELECT users.id, users.password_hash ,user_subscriptions.plan_id, user_subscriptions.status, user_subscriptions.end_date FROM users RIGHT JOIN user_subscriptions ON users.id = user_subscriptions.user_id  WHERE email = ?",
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

async function AddUserToFreePlan(userId) {
  try {
    const [data] = await db.query(
      "INSERT INTO user_subscriptions (user_id, plan_id, status, start_date, end_date, created_at) VALUES (?, 1, 'active', CURDATE(), NULL, NOW());",
      [userId]
    );

    if (data.affectedRows === 0) {
      return { success: false, message: "Internal server error" };
    }

    return { success: true };

    ///  console.log();
  } catch (error) {
    return { success: false, message: "Internal server error", error };
  }
}

module.exports = {
  IsEmailExists,
  GetInfoByEmail,
  AddNewUser,
  AddUserToFreePlan,
};
