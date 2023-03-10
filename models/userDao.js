const appDataSource = require("./appDataSource");

const createUser = async (email, name, password, address, phone, birthdate) => {
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
};

const getUserByEmail = async (email) => {
  const [user] = await appDataSource.query(
    `SELECT
      id,
      email,
      password
      FROM 
      users 
      WHERE email = ?;`,

    [email]
  );
  return user;
};

const checkMail = async (email) => {
  const [result] = await appDataSource.query(
    `SELECT EXISTS (SELECT id FROM users WHERE email = ?
      ) as registerd`,
    [email]
  );
  return !!parseInt(result.registerd);
};

const getUserById = async (userId) => {
  return await appDataSource.query(
    `SELECT id, point FROM users WHERE id =?;`,

    [userId]
  );
};

const getUserInfo = async (userId) => {
  return await appDataSource.query(
    `SELECT
      users.name,
      point,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "productId", products.id,
      "orderStatus", order_status.status,
      "orderNum", orders.order_num,
      "productName", products.name,
      "thumbnailImage", products.thumbnail_image)) as orderList
       FROM users 
      left join orders on users.id = orders.user_id
      left join order_status on orders.order_status_id = order_status.id
      left join order_products on orders.id = order_products.orders_id
      left join products on products.id = order_products.product_id
       WHERE users.id =?;`,
    [userId]
  );
};

const getUserAddress = async (userId) => {
  return await appDataSource.query(
    `SELECT
    name,
    phone,
      address
       FROM users 
       WHERE users.id =?;`,
    [userId]
  );
};

const updateUserAddress = async (address, userId) => {
  return await appDataSource.query(
    `UPDATE users
      SET address =?
      WHERE users.id =?;`,
    [address, userId]
  );
};

const getUserProfile = async (userId) => {
  return await appDataSource.query(
    `SELECT
      email,
      name,
      phone,

      birthdate,
      point
       FROM users 
       WHERE users.id =?;`,
    [userId]
  );
};

const getUserInfoById = async (userId) => {
  const [result] = await appDataSource.query(
    `SELECT
    id,
  email,
  password
  FROM users
  WHERE id =?`,
    [userId]
  );
  return result;
};

const updateUserPassword = async (password, userId) => {
  return await appDataSource.query(
    `UPDATE users
      SET password =?
      WHERE users.id =?;`,
    [password, userId]
  );
};
module.exports = {
  createUser,
  getUserByEmail,
  checkMail,
  getUserById,
  getUserInfo,
  getUserAddress,
  updateUserAddress,
  getUserProfile,
  updateUserPassword,
  getUserInfoById,
};
