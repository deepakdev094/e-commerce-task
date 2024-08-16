import React, { useState, useContext, useEffect } from 'react';
import './Coupon.css';
import MyContext from '../../context/myContext';
import {createNewCoupon, getCoupons} from '../../service/adminService';
const Coupon = () => {
    const {
        coupons,
        setCoupons,
    } = useContext(MyContext);

    const handleCreateCoupon = async () => {
        const response = await createNewCoupon();
        setCoupons([...response]);
    };

    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await getCoupons();
            setCoupons([...response]);
        }
        fetchData()
    },[])

    return (
        <>
            <div className="create-coupon-section">
                <button
                    onClick={handleCreateCoupon}
                    className="create-coupon-button"
                >
                    Create New Coupon
                </button>
            </div>

            <div className="coupon-list-section">
                <h3>Coupon List</h3>
                {coupons.length === 0 ? (
                    <p className="no-coupons">No coupons available.</p>
                ) : (
                    <ul className="coupon-list">
                        {coupons.map((coupon, index) => (
                            <li key={index} className="coupon-item">
                                <span className="coupon-code">{coupon}</span> -
                                (10% off)
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Coupon;
