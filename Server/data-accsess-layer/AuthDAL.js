async function AddNewUser(FirstName, Email, Password) {
  try {
  } catch (error) {
    throw new Error({ message: "Internal server error" });
  }
}

async function IsEmailExists(Email) {
  try {
  } catch (error) {
    throw new Error({ message: "Internal server error" });
  }
}

async function GetInfoByEmail(Email) {
  try {
  } catch (error) {
    throw new Error({ message: "Internal server error" });
  }
}

module.exports = { IsEmailExists, GetInfoByEmail };
