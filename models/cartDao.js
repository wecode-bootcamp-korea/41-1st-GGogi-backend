const appDataSource = require("./appDataSource");

const getCartList = async (userId) => {
  const [result] = await appDataSource.query(
    `SELECT 
    u.id as userId,
    u.address,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'cartId', c.id,
        'productId', c.product_id,
        'productName', p.name,
        'price', p.price,
        'thumbnailImage', p.thumbnail_image,
        'quantity', c.quantity)) AS cartList
        from carts c
        left join users u on u.id = c.user_id
        left join products p on p.id = c.product_id
        WHERE u.id = ?`,
    [userId]
  );
  return result;
};

const createCart = async (userId, productId, quantity) => {
  return appDataSource.query(
    `INSERT INTO
   carts
   (user_id,
    product_id,
    quantity)
   VALUES (?, ?, ?)
   ON DUPLICATE KEY UPDATE 
   user_id = ?, product_id =?, quantity = ?`,
    [userId, productId, quantity, userId, productId, quantity]
  );
};

const updateCart = async (cartId, productId, quantity) => {
  return appDataSource.query(
    `UPDATE carts SET product_id = ?, quantity = ?
  WHERE id = ?`,
    [productId, quantity, cartId]
  );
};

const deleteCart = async (cartId) => {
  return appDataSource.query(
    `DELETE FROM carts c 
    WHERE c.id IN (?)  `,
    [cartId]
  );
};
module.exports = {
  getCartList,
  createCart,
  updateCart,
  deleteCart,
};
