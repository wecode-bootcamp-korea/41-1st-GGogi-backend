const appDataSource = require("./appDataSource");

const createUser = async (email, name, password, address, phone, birthdate) => {
  try {
    return await appDataSource.query(
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
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const signIn = async (email, password) => {
  try {
    const [pwd] = await appDataSource.query(
      `SELECT * FROM users WHERE email = ?;`,

      [email]
    );
    return pwd;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const checkMail = async (email) => {
  const [emailC] = await appDataSource.query(
    `SELECT * FROM users WHERE email = ?;`,

    [email]
  );
  return emailC;
};

module.exports = {
  createUser,
  signIn,
  checkMail,
};