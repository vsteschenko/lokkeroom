import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {

    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const handleSubmit = async(event) => {
        event.preventDefault();
        axios.post('https://millenium-falcon-e8394498af5e.herokuapp.com/register', {
            email: email,
            password: password,
            role: isAdmin ? 'admin' : 'user'
        })
        .then((response) => {
            setToken(response.data); 
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        });
    }
    return (
        <>
            <h1>Sign Up</h1>
            <form className="LoginForm" onSubmit={handleSubmit}>
                <input className="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input className="Email" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                <button className="ButtonLogin" type="Submit">register</button>
            </form>
            <div>
                <label>
                    <input type="checkbox" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)}/>Register as administrator
                </label>
            </div>
        </>
    )
};

export default SignUp;