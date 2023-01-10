const appDataSource = require("./appDataSource");

const getCartList = async (userId) => {
  const [result] = await appDataSource.query(
    `SELECT 
    u.id as userId,
    u.address,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'cartId', c.id,
        'productName', p.name,
        'price', p.price,
        'thumbnailImage', p.thumbnail_image,
        'quantity', c.quantity)) AS cartList
        from carts c
        right join users u on u.id = c.user_id
        left join products p on p.id = c.product_id
        WHERE u.id = ?`,
    [userId]
  );
  return result;
};

const addCartItems = async (userId, productId) => {
  await appDataSource.query(
    `INSERT INTO
   carts
   (user_id,
    product_id,
    quantity)
   VALUES (?, ?, 1)
   ON DUPLICATE KEY UPDATE 
   user_id = ?, product_id =?, quantity = quantity + 1;`,
    [userId, productId, userId, productId]
  );
};

const updateItemQuantity = async (userId, productId, quantity) => {
  await appDataSource.query(
    `UPDATE carts SET quantity = ?
  WHERE user_id = ? AND product_id = ?`,
    [quantity, userId, productId]
  );
};

const deleteCart = async (userId, cartId) => {
  await appDataSource.query(
    `DELETE FROM carts c
  WHERE c.user_id = ? 
  AND WHERE c.id IN (?)  `,
    [userId, cartId]
  );
};
module.exports = {
  getCartList,
  addCartItems,
  updateItemQuantity,
  deleteCart,
};
