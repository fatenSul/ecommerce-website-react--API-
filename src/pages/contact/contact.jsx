import React, { useState } from 'react';
import './contact.css';

function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', { name, email, message });
    };

    return (
    <>
    <div className="holderContainer">
        <div className="container2">
                <h1>Need Help ?</h1>
                <h2> Do not hesitate to call us or send a message♥</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label>
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Message:
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>

            <div className="container2">
                <h1>Contact Us</h1>
                <br></br>
                <br></br>
                <br></br>

                <form onSubmit={handleSubmit}>
                    <h2> Telephone NUMBER</h2>
                    <p>02-2457145</p>
                    
                    <h2> Telephone NUMBER</h2>
                    <p>02-25744784</p>
                </form>
            </div>

        </div>
    </>
    );
}

export default ContactPage;
