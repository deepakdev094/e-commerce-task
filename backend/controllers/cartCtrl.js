const store = require('../store/store');

exports.addItemToCart = (req, res) => {
  const product = req.body;
  if (!product.name || !product.id || !product.price) {
    return res.status(400).json({ success: false, message: 'Product required!' })
  }
  store.carts.push(product);
  return res.status(200).json({ success: true, message: 'Item added to cart' });
};

exports.getCart = (req, res) => {
  const data = store.carts.length > 0 ? store.carts : [];
  return res.status(200).json({ success: data.length > 0 ? true : false, data });
};
