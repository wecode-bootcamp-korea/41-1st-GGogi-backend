const appDataSource = require("./appDataSource");

const getCartList = async (userId) => {
  const [result] = await appDataSource.query(
    `SELECT 
    users.id,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        '상품명', products.name,
        '가격', products.price,
        '썸네일이미지', products.thumbnail_image,
        '수량', carts.quantity)) AS cartList
        from carts
        join users on users.id = carts.user_id
        join products on products.id = carts.product_id
        WHERE users.id = ?`,
    [userId]
  );
  return result;
};

const getCartItems = async (userId, productId, quantity) => {
  ``;
};

module.exports = { getCartList };
