import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './prodcuts.css';

import { useNavigate } from 'react-router-dom';

export default function Products() {
    const { id } = useParams();
    const [productData, setProductData] = useState({});
    const [loading, setLoading] = useState(true);

    const getProductData = async () => {
        try {
            const { data } = await axios.get(`https://ecommerce-node4-five.vercel.app/products/${id}`);
            setProductData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductData();
    }, [id]);

    const navigate = useNavigate();

    const back = () => {
        navigate('/');
    };

    const addToCart = async () => {
        try {
            const token = localStorage.getItem('userToken');
            await axios.post(`https://ecommerce-node4-five.vercel.app/cart`, {
                productId: productData.product._id,
                price: productData.product.price
            }, {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            });
            // Navigate to the cart page after adding the product to the cart
            navigate('/cart');
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='product1'>
                    <h2>{productData.product.name}</h2>
                    <img src={productData.product.mainImage.secure_url} alt={productData.product.name} />
                    <p>{productData.product.description}</p>
                    <p>Price: ${productData.product.price}</p>
                    <button onClick={addToCart} className='btn btn-outline-danger opacity-75'>Add To Cart</button>
                    <button onClick={() => back()} className='back-button2'>Continue Shop</button>
                </div>
            )}
        </div>
    );
}
