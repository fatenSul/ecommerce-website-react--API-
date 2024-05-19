import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderPage() {
    const [couponName, setCouponName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = 'Tariq__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmZlYTk4Y2FmNDlmODJiM2IxNGRjNSIsInJvbGUiOiJVc2VyIiwic3RhdHVzIjoiQWN0aXZlIiwiaWF0IjoxNzAxODkxNjYwfQ.-XlhcCILJvhSasCl7HohQvFezIIERupfJtKvnCeEaF8';

        try {
            await axios.post('https://ecommerce-node4-five.vercel.app/order', {
                couponName,
                address,
                phone,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });

            toast.success('Order submitted successfully');
        } catch (error) {
            toast('Order submitted successfully');
        }
    };

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <h1>Order Page</h1>
                <label>
                    Coupon Name:
                    <input
                        type="text"
                        value={couponName}
                        onChange={(e) => setCouponName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Address:
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Phone:
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Submit Order</button>
            </form>
        </>
    );
}

export default OrderPage;
