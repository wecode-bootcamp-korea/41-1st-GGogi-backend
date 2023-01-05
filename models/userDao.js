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
    const [user] = await appDataSource.query(
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
  const [result] = await appDataSource.query(
    `SELECT EXISTS (SELECT id FROM users WHERE email = ?
      ) as registerd`,
    [email]
  );
  return !!parseInt(result.registerd);
};

const getUserId = async (email) => {
  const result = await appDataSource.query(
    `SELECT email FROM users WHERE email =?;`,

    [email]
  );
  return result;
};

const getUser = async (email) => {
  console.log(email);
  try {
    const result = await appDataSource.query(
      `SELECT
      users.name,
      point,
      order_status.status,
      orders.order_num,
      products.name,
      products.thumbnail_image
       FROM users 
       join orders on users.id = orders.user_id
       join order_status on orders.order_status_id = order_status.id
       join order_products on orders.id = order_products.orders_id
       join products on products.id = order_products.product_id
       WHERE email =?;`,
      [email]
    );
    return result;
  } catch (err) {
    console.log(err);
    const error = new Error("No result");
    error.statusCode = 500;
    throw error;
  }
};

const getMyAddress = async (email) => {
  try {
    const result = await appDataSource.query(
      `SELECT
      address
       FROM users 
       WHERE email =?;`,
      [email]
    );
    return result;
  } catch (err) {
    console.log(err);
    const error = new Error("No result");
    error.statusCode = 500;
    throw error;
  }
};

//주소수정
const patchMyAddress = async (address, email) => {
  try {
    const result = await appDataSource.query(
      `UPDATE users
      SET address =?
      WHERE email =?;`,
      [address, email]
    );
    return result;
  } catch (err) {
    console.log(err);
    const error = new Error("No result");
    error.statusCode = 500;
    throw error;
  }
};
module.exports = {
  createUser,
  getUserByEmail,
  checkMail,
  getUserId,
  getUser,
  getMyAddress,
  patchMyAddress,
};
