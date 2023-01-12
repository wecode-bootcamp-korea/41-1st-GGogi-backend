const appDataSource = require("./appDataSource");

const getOrderUser = async (userId) => {
  const [result] = await appDataSource.query(
    `SELECT 
    u.name userName,
    u.phone userPhone,
    u.email userEmail,
    u.address userAddress,
    u.point userPoint,
    JSON_ARRAYAGG(
      JSON_OBJECT(
    "cartId", c.id,
    "thumbnailImage", p.thumbnail_image,
    "productId", c.product_id,
    "productName", p.name, 
    "quantity", c.quantity,
    "price", p.price)) as cartProducts
    FROM users u
    JOIN carts c ON u.id = c.user_id
    JOIN products p ON c.product_id = p.id
    WHERE u.id =?
    `,
    [userId]
  );
  return result;
};

const postOrder = async (userId, totalPrice, cartInfos) => {
  const queryRunner = appDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  await queryRunner.query(
    `UPDATE users u
  set u.point = u.point - ${totalPrice}
  where u.id = ?`,
    [userId]
  );

  const getOrdersId = await queryRunner.query(
    `INSERT INTO 
    orders ( 
      user_id, 
      order_num,
      order_status_id)
      VALUES (? ,1,1)`,
    [userId]
  );

  const orderId = getOrdersId.insertId;
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
  await queryRunner.query(query, [values]);
  await queryRunner.query(
    `
  DELETE 
  FROM
   carts c
    WHERE c.id IN (?)`,
    [cartIds]
  );

  await queryRunner.commitTransaction();
  await queryRunner.release();
};

module.exports = { getOrderUser, postOrder };
