import React, { useState } from 'react';
import axios from 'axios';
import { object, string } from 'yup';
import { Bounce, Slide, toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

export default function RealCart() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const [resetEmail, setResetEmail] = useState('');
    const [errors, setErrors] = useState([]);
    const [loader, setLoader] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('https://ecommerce-node4.vercel.app/auth/reset-password', {
                email: resetEmail
            });
            if (data.message === 'success') {
                toast.success('Password reset email sent!');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const validateData = async () => {
        const LoginScheme = object({
            email: string().email().required(),
            password: string().min(6).max(20).required(),
        });
        try {
            await LoginScheme.validate(user, { abortEarly: false });
            return true;
        } catch (error) {
            setErrors(error.errors);
            error.errors.forEach(e => {
                toast.error(e)
            })
            return false;
        } finally {
            setLoader(false)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        const validateDataResult = await validateData()
        if (validateDataResult === true) {
            try {
                const { data } = await axios.post(`https://ecommerce-node4.vercel.app/auth/signin`,
                    {
                        email: user.email,
                        password: user.password
                    });

                setUser({
                    email: '',
                    password: '',
                });

                if (data.message === 'success') {
                    toast.success("You are logged in successfully!")
                    navigate('/')
                }

                console.log(data); // Check the response from the server

            } catch (error) {
                toast.error(error.response.data.message)
            } finally {
                setLoader(false)
            }
        }
    };

    return (
        <>
            <h2>Sign in </h2>
            <form onSubmit={handleSubmit}>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={user.email} name="email" onChange={handleChange} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={user.password} name="password" onChange={handleChange} />

                <button type='submit' disabled={loader ? 'disabled' : null} > {!loader ? 'login' : 'wait...'}</button>

            </form>
            
            <div>
                <p>Forgot your password? <Link to="/request-reset">Reset Password</Link></p>
            </div>
            
        </>
    );
}
