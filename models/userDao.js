const appDataSource = require("./appDataSource");

const createUser = async (email, name, password, address, phone, birthdate) => {
  try {
    return appDataSource.query(
      `INSERT INTO users(
        name,
        password,
        address,
        phone,
        email,
        birthdate
        ) VALUES (?, ?, ?, ?, ?, ?);
  `,
      [name, password, address, phone, email, birthdate]
    );
  } catch {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = appDataSource.query(
      `SELECT 
      email,
      password
      FROM 
      users 
      WHERE email = ?;`,

      [email]
    );
    return user;
  } catch {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const checkMail = async (email) => {
  const [emailC] = appDataSource.query(
    `SELECT * FROM users WHERE email = ?;`,

    [email]
  );
  return emailC;
};

module.exports = {
  createUser,
  getUserByEmail,
  checkMail,
};
