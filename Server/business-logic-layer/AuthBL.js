require("dotenv").config();
const {
  IsEmailExists,
  GetInfoByEmail,
  AddNewUser,
  AddUserToFreePlan,
} = require("../data-accsess-layer/AuthDAL");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

async function LogIn(Email, HashedPassword) {
  try {
    const EmailExists = await IsEmailExists(Email);

    if (EmailExists.success === true) {
      throw new Error("Invalid Email or Password");
    }

    const Info = await GetInfoByEmail(Email);

    if (Info.success === false) {
      throw new Error("Invalid Email or Password");
    }

    const IsMatch = await bcrypt.compare(
      HashedPassword,
      Info.data[0].password_hash
    );

    if (!IsMatch) {
      throw new Error("Invalid Email or Password");
    }

    const token = jwt.sign(
      {
        Email,
        id: Info.data[0].id,
        plan_id: Info.data[0].plan_id,
        plan_status: Info.data[0].status,
        end_date:
          Info.data[0].end_date === null
            ? null
            : new Date(Info.data[0].end_date).toLocaleDateString(),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    return {
      success: true,
      token,
      data: Info.data[0],
    };
  } catch (error) {
    throw new Error(error.message || "Internal server error");
  }
}

async function SignUp(FirstName, Email, Password) {
  try {
    const EmailExists = await IsEmailExists(Email);

    if (EmailExists.success === false) {
      throw new Error("Email or Password already exists");
    }

    const add = await AddNewUser(FirstName, Email, Password);

    if (add.success === false) {
      throw new Error("Failed to add user");
    }

    const userId = add.data.insertId;

    const addFreePlan = await AddUserToFreePlan(userId);
    if (addFreePlan.success === false) {
      throw new Error("Failed to add user plan");
    }

    const token = jwt.sign(
      {
        Email,
        userId,
        plan_id: 1,
        plan_status: "active",
        end_date: null,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    return {
      success: true,
      token,
      userId,
      plan_id: addFreePlan.plan_id,
      plan_status: addFreePlan.status,
      end_date: new Date(addFreePlan.end_date).toLocaleDateString(),
    };
  } catch (error) {
    throw new Error(error.message || "Internal server error");
  }
}

module.exports = { LogIn, SignUp };
