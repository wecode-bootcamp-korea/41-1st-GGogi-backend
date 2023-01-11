const appDataSource = require("./appDataSource");

const getOrderUser = async (userId) => {
  return appDataSource.query(
    `SELECT 
    u.name userName,
    JSON_ARRAYAGG(
      JSON_OBJECT(
    "cartId", c.id,
    "productId", c.product_id,
    "productName", p.name, 
    "quantity", c.quantity,
    "price", p.price)) as cartProducts,
    u.phone userPhone,
    u.email userEmail,
    u.address userAddress,
    u.point userPoint
    FROM users u
    JOIN carts c ON u.id = c.user_id
    JOIN products p ON c.product_id = p.id
    WHERE u.id =?
    `,
    [userId]
  );
};

const postOrder = async (userId, cartId, totalPrice, productId, quantity) => {
  //포인트빼기
  await appDataSource.query(
    `UPDATE users u
  set u.point = u.point - ${totalPrice}
  where u.id = ?`,
    [userId]
  );

  // 오더스에 값 넣기
  const ordersResult = await appDataSource.query(
    `INSERT INTO 
    orders ( 
      user_id, 
      order_status_id)
      VALUES (? , 1)`,
    [userId]
  );
  // 오더스 프로덕트에 값넣기
  await appDataSource.query(
    `INSERT INTO 
    order_products (
      orders_id, 
      product_id, 
      quantity,
      total_price, 
      order_status_id)
      VALUES (?, ?, ?, ?, 1)`,
    [ordersResult.orders_id, productId, quantity, totalPrice]
  );
  // 장바구니 지우기
  await appDataSource.query(
    `
  DELETE 
  FROM
   carts c
    WHERE c.id IN (?)`,
    [cartId]
  );
};

module.exports = { getOrderUser, postOrder };
