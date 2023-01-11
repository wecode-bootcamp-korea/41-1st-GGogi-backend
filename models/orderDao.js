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

const postOrder = async (userId, totalPrice, cartInfos) => {
  //포인트빼기
  await appDataSource.query(
    `UPDATE users u
  set u.point = u.point - ${totalPrice}
  where u.id = ?`,
    [userId]
  );

  // 오더스에 값 넣기
  const getOrdersId = await appDataSource.query(
    `INSERT INTO 
    orders ( 
      user_id, 
      order_num,
      order_status_id)
      VALUES (? ,1,1)`,
    [userId]
  );

  const orderId = getOrdersId.insertId;
  // 오더스 프로덕트에 값넣기
  const query = `INSERT INTO 
    order_products (
      orders_id, 
      product_id, 
      quantity,
      order_status_id)
      VALUES ?;`;

  let values = [];
  let cartIds = [];

  for (let i = 0; i < cartInfos.length; i++) {
    values.push([orderId, cartInfos[i].product_id, cartInfos[i].quantity, 1]);
    cartIds.push([cartInfos[i].cart_id]);
  }
  await appDataSource.query(query, [values]);
  // 장바구니 지우기
  await appDataSource.query(
    `
  DELETE 
  FROM
   carts c
    WHERE c.id IN (?)`,
    [cartIds]
  );
};

module.exports = { getOrderUser, postOrder };
