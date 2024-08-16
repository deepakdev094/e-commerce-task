import React, { useContext, useEffect, useState } from 'react';
import './Product.css';
import MyContext from '../../context/myContext'
import { getProductsApi } from '../../service/productService';
import { addToCartApi } from '../../service/cartService';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="product-card">
            <h3 className="product-title">{product.name}</h3>
            <p className="product-price">${product.price}</p>
            <button
                className="add-to-cart-button"
                onClick={() => onAddToCart(product)}
            >
                Add to Cart
            </button>
        </div>
    );
};

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { cartItems, setCartItems } = useContext(MyContext);

    useEffect(() => {
        const fetchData = async () => {
            let response = await getProductsApi();
            setProducts(response);
        }
        fetchData();
    }, [])

    const addToCart = async (product) => {
        setCartItems([...cartItems, product])
        await addToCartApi(product);
    }

    return (
        <div className="product-list">
            {products.map((product, index) => (
                <ProductCard
                    key={index}
                    product={product}
                    onAddToCart={addToCart}
                />
            ))}
        </div>
    );
};

export default ProductList;
