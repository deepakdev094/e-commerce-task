const store= require('../store/store');
// const { discountCodes, n_th_order, checkouts } = require('../store/store');
let count = 0;

exports.generateDiscountCode = (req, res) => {
  const coupon = `Discount-${count * store.n_th_order}`;
  store.discountCodes.push(coupon); 
  count++;
  return res.status(200).send({ message: 'Discount code generated', data: store.discountCodes });
};

exports.getStats = (req, res) => {
  const stat = store.checkouts;
  let totalItems = 0;
  let totalAmount = 0;
  let totalDiscount = 0;
  for (let i = 0; i < stat.length; i++) {
    totalItems += stat[i]?.totalItems;
    totalAmount += stat[i]?.totalAmount;
    totalDiscount += stat[i]?.totalDiscount;
  }
  res.status(200).send({ message: 'Statistics', data: { totalItems, totalAmount, totalDiscount, totalOrders: stat.length } });
};

exports.getDiscountCodes = (req, res)=>{
  return res.status(200).json({message:'Discount Codes', data:store.discountCodes})
}