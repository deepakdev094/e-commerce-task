const store = require('../store/store');

exports.getProduct = async (req, res) => {
  res.status(200).send({ message: 'Product List', products:store.products });
};
