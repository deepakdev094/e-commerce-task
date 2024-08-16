const request = require("supertest");
const app = require("../server");

describe("Cart test suite", () => {

    it("test get statistics, /admin/stats", async () => {
        // calling api
        const response = await request(app).get("/admin/stats");
        const rspData = response.body.data;
        expect(rspData).toHaveProperty("totalItems");
        expect(rspData).toHaveProperty("totalItems", 0);
        expect(rspData).toHaveProperty("totalAmount");
        expect(rspData).toHaveProperty("totalAmount", 0);
        expect(rspData).toHaveProperty("totalDiscount");
        expect(rspData).toHaveProperty("totalDiscount", 0);
        expect(rspData).toHaveProperty("totalOrders");
        expect(rspData).toHaveProperty("totalOrders", 0);
    });

    it("test get discount codes(test when req body is missing) /admin/discountCodes", async () => {
        const response = await request(app).get("/admin/discountCodes");
        const rspData = response.body;
        expect(rspData).toHaveProperty("data");
        expect(rspData).toHaveProperty("data", []);
    });

    it("test checkout at empty cart, /admin/discount", async () => {
        // calling api
        await request(app).get("/admin/discount");
        await request(app).get("/admin/discount");
        await request(app).get("/admin/discount");
        await request(app).get("/admin/discount");
    });

    it("test get discount codes(test when req body is missing) /admin/discountCodes", async () => {
        const response = await request(app).get("/admin/discountCodes");
        const rspData = response.body;
        expect(rspData).toHaveProperty("data");
        expect(rspData).toHaveProperty("data", ['Discount-0', 'Discount-5', 'Discount-10', 'Discount-15']);
    });

    it("test get from cart, /cart/get", async () => {
        // calling api
        const response = await request(app).get("/cart/get");
        const rspData = response.body;
        expect(rspData.success).toBe(false);
        expect(rspData.data).toEqual([]);
    });

    it("test checkout at empty cart, /checkout", async () => {
        // calling api
        const response = await request(app).post("/checkout").send();
        const rspData = response.body;
        expect(rspData).toHaveProperty("success");
        expect(rspData).toHaveProperty("success", false);
        expect(rspData).toHaveProperty("message");
        expect(rspData).toHaveProperty("message", 'Your cart is empty');
    });

    it("test add to cart(test when req body is missing) /cart/add", async () => {
        // calling api
        const response = await request(app).post("/cart/add").send({});
        const rspData = response.body;
        expect(rspData).toHaveProperty("success");
        expect(rspData).toHaveProperty("success", false);
    });

    it("test add to cart(test when req body is passing) /cart/add", async () => {
        // calling api
        const response = await request(app).post("/cart/add").send({
            "id": 101,
            "name": "Product-1",
            "price": 50
        });
        const rspData = response.body;
        expect(rspData).toHaveProperty("success");
        expect(rspData).toHaveProperty("success", true);
    });

    it("test get from cart, /cart/get", async () => {
        // calling api
        const response = await request(app).get("/cart/get");
        const rspData = response.body;
        expect(rspData).toHaveProperty("success");
        expect(rspData).toHaveProperty("success", true);
        expect(rspData).toHaveProperty("data");
        expect(rspData).toHaveProperty("data", [{
            "id": 101,
            "name": "Product-1",
            "price": 50
        }]);
    });

    it("test checkout with coming soon coupon, /checkout", async () => {
        // calling api
        const response = await request(app).post("/checkout").send({ "discountCode": "Discount-10" });
        const rspData = response.body;
        expect(rspData).toHaveProperty("success");
        expect(rspData).toHaveProperty("success", false);
        expect(rspData).toHaveProperty("message");
        expect(rspData).toHaveProperty("message", 'The applied coupon code is not applicable yet. Please try it later!');
    });

    it("test checkout with coming soon coupon, /checkout", async () => {
        const response = await request(app).post("/checkout").send({});
        const rspData = response.body;
        expect(rspData).toHaveProperty("success");
        expect(rspData).toHaveProperty("success", true);
        expect(rspData).toHaveProperty("message");
        expect(rspData).toHaveProperty("message", 'Checkout successful!');
    });

    it("test get discount codes(test when req body is missing) /admin/discountCodes", async () => {
        const response = await request(app).get("/admin/discountCodes");
        const rspData = response.body;
        expect(rspData).toHaveProperty("data");
        expect(rspData).toHaveProperty("data", ['Discount-0', 'Discount-5', 'Discount-10', 'Discount-15']);
    });

    it("test get from cart, /cart/get", async () => {
        // calling api
        const response = await request(app).get("/cart/get");
        const rspData = response.body;
        expect(rspData.success).toBe(false);
        expect(rspData.data).toEqual([]);
    });

    it("test get statistics, /admin/stats", async () => {
        // calling api
        const response = await request(app).get("/admin/stats");
        const rspData = response.body.data;
        expect(rspData).toHaveProperty("totalItems");
        expect(rspData).toHaveProperty("totalItems", 1);
        expect(rspData).toHaveProperty("totalAmount",);
        expect(rspData).toHaveProperty("totalAmount", 50);
        expect(rspData).toHaveProperty("totalOrders");
        expect(rspData).toHaveProperty("totalOrders", 1);
        expect(rspData).toHaveProperty("totalDiscount");
        expect(rspData).toHaveProperty("totalDiscount", 0);
    });

    it("test checkout with coming soon coupon, /checkout", async () => {
        // again inserting item into cart api
        await request(app).post("/cart/add").send({
            "id": 102,
            "name": "Product-2",
            "price": 60
        });
        const response = await request(app).post("/checkout").send({ "discountCode": "Discount-0" });
        const rspData = response.body;
        expect(rspData).toHaveProperty("success");
        expect(rspData).toHaveProperty("success", true);
        expect(rspData).toHaveProperty("message");
        expect(rspData).toHaveProperty("message", 'Checkout successful!');
    });

    it("test get statistics, /admin/stats", async () => {
        // calling api
        const response = await request(app).get("/admin/stats");
        const rspData = response.body.data;
        expect(rspData).toHaveProperty("totalItems");
        expect(rspData).toHaveProperty("totalItems", 2);
        expect(rspData).toHaveProperty("totalAmount",);
        expect(rspData).toHaveProperty("totalAmount", 104);
        expect(rspData).toHaveProperty("totalOrders");
        expect(rspData).toHaveProperty("totalOrders", 2);
        expect(rspData).toHaveProperty("totalDiscount");
        expect(rspData).toHaveProperty("totalDiscount", 6);
    });

    it("test get discount codes(test when req body is missing) /admin/discountCodes", async () => {
        const response = await request(app).get("/admin/discountCodes");
        const rspData = response.body;
        expect(rspData).toHaveProperty("data");
        expect(rspData).toHaveProperty("data", ['Discount-5', 'Discount-10', 'Discount-15']);
    });

    it("test checkout with coming soon coupon, /checkout", async () => {
        // again inserting item into cart api
        await request(app).post("/cart/add").send({
            "id": 103,
            "name": "Product-3",
            "price": 40
        })
        await request(app).post("/cart/add").send({
            "id": 104,
            "name": "Product-4",
            "price": 50
        });
        const response = await request(app).post("/checkout").send({});
        const rspData = response.body;
        expect(rspData).toHaveProperty("success");
        expect(rspData).toHaveProperty("success", true);
        expect(rspData).toHaveProperty("message");
        expect(rspData).toHaveProperty("message", 'Checkout successful!');
    });

    it("test get statistics, /admin/stats", async () => {
        // calling api
        const response = await request(app).get("/admin/stats");
        const rspData = response.body.data;
        expect(rspData).toHaveProperty("totalItems");
        expect(rspData).toHaveProperty("totalItems", 4);
        expect(rspData).toHaveProperty("totalAmount",);
        expect(rspData).toHaveProperty("totalAmount", 194);
        expect(rspData).toHaveProperty("totalOrders");
        expect(rspData).toHaveProperty("totalOrders", 3);
        expect(rspData).toHaveProperty("totalDiscount");
        expect(rspData).toHaveProperty("totalDiscount", 6);
    });

});
