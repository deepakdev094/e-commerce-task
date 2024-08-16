import React, { useState } from 'react';
import './Admin.css';
import Coupon from '../components/coupon/Coupon';
import Statistics from '../components/statistics/Statistics';

const Admin = () => {
    return (
        <div className="admin-container">
            <h2 className="admin-title">Admin Panel</h2>
            <div className="admin-content">
                <div className="admin-section">
                    <Coupon />
                </div>
                <div className="admin-section">
                    <Statistics />
                </div>
            </div>
        </div>
    );
};

export default Admin;
