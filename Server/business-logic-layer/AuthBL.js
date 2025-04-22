require("dotenv").config();
const {
  IsEmailExists,
  GetInfoByEmail,
} = require("../data-accsess-layer/AuthDAL");
const jwt = require("jsonwebtoken");

async function LogIn(Email, HashedPassword) {
  try {
    const EmailExists = await IsEmailExists(Email);

    if (!EmailExists) {
      throw new Error({ message: "Invalid Email or Password" });
    }

    const Info = await GetInfoByEmail(Email);

    if (!Info.Password) {
      throw new Error({ message: "Invalid Email or Password" });
    }

    const IsMatch = await bcrypt.compare(Info.Password, HashedPassword);

    if (!IsMatch) {
      throw new Error({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign({ Email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
  } catch (error) {
    throw new Error({ message: error.message || "Internal server error" });
  }
}

async function SignUp(FirstName, Email, Password) {
  try {
    const emailExists = await IsEmailExists(Email);
    if (!emailExists) {
      throw new Error({ message: "Email or Password already exists" });
    }
  } catch (error) {
    throw new Error({ message: error.message || "Internal server error" });
  }
}

module.exports = { LogIn, SignUp };
