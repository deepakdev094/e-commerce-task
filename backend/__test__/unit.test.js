const { checkout } = require('../controllers/checkoutCtrl');
const { addItemToCart, getCart } = require('../controllers/cartCtrl');
const { generateDiscountCode, getStats, getDiscountCodes } = require('../controllers/adminCtrl');

const store = require('../store/store');

describe('Checkout Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    store.carts = [];
    store.discountCodes = [];
    store.checkouts = [];
    store.orderCount = 0;
    store.n_th_order = 3;
  });

  it('should return 400 if the cart is empty', () => {
    checkout(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Your cart is empty' });
  });

  it('should return 400 if discount code is not yet applicable', () => {
    req.body.discountCode = 'Discount-2';
    store.carts = [{ price: 100 }];
    store.discountCodes = ['Discount-2'];
    store.orderCount = 0;

    checkout(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "The applied coupon code is not applicable yet. Please try it later!" });
  });

  it('should apply the discount code and return 200 with success', () => {
    req.body.discountCode = 'Discount-1';
    store.carts = [{ price: 100 }];
    store.discountCodes = ['Discount-1'];
    store.orderCount = 0;

    checkout(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ success: true, message: 'Checkout successful!' });
    expect(store.checkouts).toHaveLength(1);
    expect(store.carts).toHaveLength(0);
    expect(store.orderCount).toBe(1);
    expect(store.discountCodes).not.toContain('Discount-1');
  });

  it('should process the checkout without a discount code and return 200', () => {
    store.carts = [{ price: 100 }];
    store.orderCount = 2;

    checkout(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ success: true, message: 'Checkout successful!' });
    expect(store.checkouts).toHaveLength(1);
    expect(store.carts).toHaveLength(0);
    expect(store.orderCount).toBe(3);
  });

  it('should remove expired discount codes after the nth order', () => {
    store.carts = [{ price: 100 }];
    store.orderCount = 2;
    store.discountCodes = ['Discount-5'];

    checkout(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ success: true, message: 'Checkout successful!' });
    expect(store.discountCodes).not.toContain('Discount-1');
  });
});

describe('Cart Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    store.carts = [];
  });

  describe('addItemToCart', () => {
    it('should return 400 if product data is missing', () => {
      req.body = { id: 1, price: 100 };

      addItemToCart(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Product required!' });
    });

    it('should add product to cart and return 200', () => {
      const product = { name: 'Product A', id: 1, price: 100 };
      req.body = product;

      addItemToCart(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Item added to cart' });
      expect(store.carts).toContainEqual(product);
    });
  });

  describe('getCart', () => {
    it('should return an empty array and success false when the cart is empty', () => {
      getCart(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: false, data: [] });
    });

    it('should return the cart contents and success true when the cart has items', () => {
      const product = { name: 'Product A', id: 1, price: 100 };
      store.carts.push(product);

      getCart(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: [product] });
    });
  });
});

describe('Discount Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
    store.discountCodes = [];
    store.n_th_order = 3;
    store.checkouts = [];
    count = 0;
  });

  describe('generateDiscountCode', () => {
    it('should generate a new discount code and return 200', () => {
      generateDiscountCode(req, res);

      expect(store.discountCodes).toHaveLength(1);
      expect(store.discountCodes).toContain('Discount-0');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: 'Discount code generated', data: store.discountCodes });
    });

    it('should generate multiple discount codes', () => {
      generateDiscountCode(req, res);
      generateDiscountCode(req, res);

      expect(store.discountCodes).toHaveLength(2);
      expect(store.discountCodes).toContain('Discount-3');
      expect(store.discountCodes).toContain('Discount-6');
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe('getStats', () => {
    it('should return 200 and stats with zeroed values when no checkouts', () => {
      getStats(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Statistics',
        data: {
          totalItems: 0,
          totalAmount: 0,
          totalDiscount: 0,
          totalOrders: 0,
        },
      });
    });

    it('should return 200 and stats with accumulated values', () => {
      store.checkouts.push({ totalItems: 3, totalAmount: 100, totalDiscount: 10 });
      store.checkouts.push({ totalItems: 2, totalAmount: 50, totalDiscount: 5 });

      getStats(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Statistics',
        data: {
          totalItems: 5,
          totalAmount: 150,
          totalDiscount: 15,
          totalOrders: 2,
        },
      });
    });
  });

  describe('getDiscountCodes', () => {
    it('should return 200 and an empty discount codes array', () => {
      getDiscountCodes(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Discount Codes', data: [] });
    });

    it('should return 200 and the discount codes array', () => {
      store.discountCodes.push('Discount-0', 'Discount-3');

      getDiscountCodes(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Discount Codes', data: ['Discount-0', 'Discount-3'] });
    });
  });
});
