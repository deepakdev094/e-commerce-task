import React from 'react';
import ProductList from '../components/product/Product';
import Cart from '../components/cart/Cart';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="product-list-container">
                <ProductList />
            </div>
            <div className="cart-container">
                <Cart />
            </div>
        </div>
    );
}

export default Home;

