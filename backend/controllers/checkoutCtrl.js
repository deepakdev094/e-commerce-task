let store = require('../store/store');
// let { carts, discountCodes, orderCount, checkouts, n_th_order } = require('../store/store');

exports.checkout = (req, res) => {
  const { discountCode } = req.body;
  let totalItems = 0;
  let totalAmount = 0;
  let totalDiscount = 0;
  const discount = 0.1; // 10% discount

  if (store.carts.length > 0) {
    totalItems = store.carts.length;
    for (let i = 0; i < store.carts.length; i++) {
      totalAmount += store.carts[i].price;
    }
  } else {
    return res.status(400).json({ success: false, message: 'Your cart is empty' })
  }

  if (discountCode) {
    if (store.discountCodes.includes(discountCode)) {
      if (store.orderCount + 1 < parseInt(discountCode.split('-')[1])) {
        return res.status(400).json({ success: false, message: "The applied coupon code is not applicable yet. Please try it later!" })
      }
      totalDiscount = totalAmount * discount;
      totalAmount = totalAmount - totalDiscount;
      store.checkouts.push({
        totalOrders: store.orderCount, totalItems, totalAmount, totalDiscount
      })
      store.carts = [];
      store.orderCount++;
      store.discountCodes = store.discountCodes.filter(item => item !== discountCode)

      return res.status(200).send({
        success: true, message: 'Checkout successful!'
      });
    }else{
      return res.status(400).json({success:false, messsge:"Invalid Coupon!"})
    }
  }
  store.carts = [];
  store.orderCount++;
  store.checkouts.push({
    totalItems, totalAmount, totalDiscount: 0
  })
  if (store.orderCount % store.n_th_order === store.n_th_order - 1) {
    const tempCoupon = `Discount-${(store.orderCount + 1) - store.n_th_order}`;
    store.discountCodes = store.discountCodes.filter(item => item !== tempCoupon);
  }
  res.status(200).send({
    success: true, message: 'Checkout successful!',
  });
};
