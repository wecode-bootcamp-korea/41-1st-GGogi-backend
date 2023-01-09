const appDataSource = require("./appDataSource");

const getCartList = async (userId) => {
  const [result] = await appDataSource.query(
    `SELECT 
    users.id,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'productName', products.name,
        'price', products.price,
        'thumbnailImage', products.thumbnail_image,
        'quantity', carts.quantity)) AS cartList
        from carts
        join users on users.id = carts.user_id
        join products on products.id = carts.product_id
        WHERE users.id = ?`,
    [userId]
  );
  return result;
};

const addCartItems = async (userId, productId) => {
  `INSERT INTO
   carts
   (user_id,
    product_id,
    quantity)
   VALUES (?, ?, 1)
   ON DUPLICATE KEY UPDATE user_id = ?, product_id =?, quantity = quantity +1;`,
    [userId, productId, quantity];
};

const updateItemQuantity = async (userId, productId, quantity) => {
  `UPDATE carts SET quantity = ?
  where user_id = ?, product_id = ?`,
    [userId, productId, quantity];
};

const deleteItem = async (userId, productId) => {
  `DELETE FROM carts
  WHERE user_id =? AND product_id =?`,
    [userId, productId];
};
module.exports = { getCartList, addCartItems, updateItemQuantity, deleteItem };