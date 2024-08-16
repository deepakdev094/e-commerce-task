const store = new Map();

store['products'] = [
    { id: 101, name: 'Product-1', price: 20 },
    { id: 102, name: 'Product-2', price: 30 },
    { id: 103, name: 'Product-3', price: 20 },
    { id: 104, name: 'Product-4', price: 40 },
    { id: 105, name: 'Product-5', price: 30 },
    { id: 106, name: 'Product-6', price: 50 },
    { id: 107, name: 'Product-7', price: 20 },
    { id: 108, name: 'Product-8', price: 30 },
];
store['carts'] = [];
store['discountCodes'] = [];
store['orderCount'] = 0;
store['n_th_order'] = 5;
store['checkouts'] = [];

module.exports = store;