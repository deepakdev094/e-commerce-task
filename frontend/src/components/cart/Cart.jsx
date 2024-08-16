import React, { useState, useContext, useEffect } from 'react';
import './Cart.css';
import MyContext from '../../context/myContext';
import { getCartApi ,makeCheckout} from '../../service/cartService';
const nthOrder = import.meta.env.VITE_N_TH_ORDER;
const Cart = () => {
    const {
        cartItems,
        setCartItems,
        coupons,
        setCoupons,
        orderCount,
        setOrderCount,
    } = useContext(MyContext);

    const [selectedCoupon, setSelectedCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    useEffect(() => {
        const tAmount = cartItems.reduce((total, item) => total + item.price, 0);
        setTotalAmount(tAmount);
        setGrandTotal(tAmount);
        setSelectedCoupon('');
        setDiscount(0);
    }, [cartItems.length])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getCartApi(localStorage.getItem('userId'));
            setCartItems([...response])

        }
        fetchData();
    }, [])

    const handleApplyCoupon = () => {
        if (selectedCoupon && coupons.includes(selectedCoupon)) {
            const discountAmount = totalAmount * 0.1; // 10% discount
            setGrandTotal(totalAmount - discountAmount);
            setDiscount(discountAmount);
        } else {
            setDiscount(0);
            alert('Invalid or no coupon selected');
        }
    };

    const onCheckout = async () => {
        if (selectedCoupon) {
            if (orderCount + 2 < parseInt(selectedCoupon.split('-')[1])) {
                alert("The applied coupon code is not applicable yet. Please try it later!");
                return;
            }
            await makeCheckout({discountCode:selectedCoupon});
            setCoupons(coupons.filter(item => item !== selectedCoupon));
            setOrderCount(orderCount + 1);
            setCartItems([]);
            setDiscount(0);
            setSelectedCoupon('');
            alert('Checkout successful!');
            return;
        }
        await makeCheckout({discountCode:selectedCoupon});
        if ((orderCount + 1) % nthOrder === nthOrder - 1) {
            const tempCoupon = `Discount-${(orderCount + 2) - nthOrder}`;
            setCoupons(coupons.filter(item => item !== tempCoupon));
        }
        setOrderCount(orderCount + 1);
        setCartItems([]);
        setDiscount(0);
        alert('Checkout successful!');
    };

    return (
        <div className="cart">
            <h3 className="cart-title">Cart</h3>
            <div className="cart-items">
                {cartItems.length === 0 ? (
                    <p className="cart-empty">Your cart is empty.</p>
                ) : (
                    cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <span className="cart-item-name">{item.name}</span>
                            <span className="cart-item-price">${item.price.toFixed(2)}</span>
                        </div>
                    ))
                )}
            </div>

            <div className="coupon-section">
                <select
                    className="coupon-select"
                    value={selectedCoupon}
                    onChange={(e) => setSelectedCoupon(e.target.value)}
                >
                    <option value="" disabled>Select a coupon</option>
                    {coupons.map((coupon, index) => (
                        <option key={index} value={coupon}>
                            {coupon}
                        </option>
                    ))}
                </select>
                <button
                    className="apply-coupon-button"
                    onClick={handleApplyCoupon}
                    disabled={!selectedCoupon}
                >
                    Apply Coupon
                </button>
            </div>

            <div className="total-amount-section">
                <p className="total-amount">Total: ${totalAmount.toFixed(2)}</p>
                {discount > 0 && (
                    <p className="discount-amount">
                        Discount: - ${discount.toFixed(2)}
                    </p>
                )}
                <p className="total-amount">
                    Grand Total: ${grandTotal.toFixed(2)}
                </p>
            </div>

            <button
                className="checkout-button"
                onClick={onCheckout}
                disabled={cartItems.length === 0}
            >
                Checkout
            </button>
        </div>
    );
};

export default Cart;

