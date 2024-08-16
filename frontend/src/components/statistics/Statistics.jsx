import React, { useContext, useEffect, useState } from 'react';
import './Statistics.css';
import { getStatistics } from '../../service/adminService';

const Statistics = () => {
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getStatistics();
            setTotalAmount(response.totalAmount);
            setTotalDiscount(response.totalDiscount);
            setTotalItems(response.totalItems);
            setTotalOrders(response.totalOrders);
        }
        fetchData();
    }, [])

    return (
        <div className="statistics-container">
            <h2 className="statistics-title">Statistics Overview</h2>
            <div className="statistics-item">
                <h3>Total Orders</h3>
                <p className="statistics-value">{totalOrders}</p>
            </div>

            <div className="statistics-item">
                <h3>Total Items Purchased</h3>
                <p className="statistics-value">{totalItems}</p>
            </div>

            <div className="statistics-item">
                <h3>Total Purchase Amount</h3>
                <p className="statistics-value">${totalAmount.toFixed(2)}</p>
            </div>

            <div className="statistics-item">
                <h3>Total Discount Amount</h3>
                <p className="statistics-value">${totalDiscount.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default Statistics;
