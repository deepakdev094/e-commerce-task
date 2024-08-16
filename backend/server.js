const express = require('express');
const cors = require('cors')
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());
app.use(cors({
  origin:'http://localhost:5173'
}))
app.use('/cart', cartRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/admin', adminRoutes);
app.use('/product', productRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

module.exports = app;