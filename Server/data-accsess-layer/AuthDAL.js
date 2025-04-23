const db = require("./Database");

async function AddNewUser(FirstName, Email, Password) {
  try {
    const [data] = await db.query(
      "INSERT INTO users (user_name, email, password_hash) VALUES (?, ?, ?)",
      [FirstName, Email, Password]
    );

    if (data.affectedRows === 0) {
      throw new Error({ success: false, message: "Failed to add user" });
    }

    return { success: true, data };
  } catch (error) {
    throw new Error({ success: false, message: "Internal server error" });
  }
}

async function IsEmailExists(Email) {
  try {
    const [data] = await db.query("SELECT * FROM users WHERE email = ?", [
      Email,
    ]);

    if (data.length > 0) {
      return { success: false, message: "Email already exists" };
    }

    return { success: true, email: data };
  } catch (error) {
    throw new Error({ success: false, message: "Internal server error" });
  }
}

async function GetInfoByEmail(Email) {
  try {
    const [data] = await db.query(
      "SELECT users.id, users.password_hash ,user_subscriptions.plan_id, user_subscriptions.status FROM users RIGHT JOIN user_subscriptions ON users.id = user_subscriptions.user_id  WHERE email = ?",
      [Email]
    );

    if (data.length === 0) {
      return { success: false, message: "Email not found" };
    }

    return { success: true, data };
  } catch (error) {
    throw new Error({ success: false, message: "Internal server error" });
  }
}

module.exports = { IsEmailExists, GetInfoByEmail, AddNewUser };
