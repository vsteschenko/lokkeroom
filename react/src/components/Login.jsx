import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

    const navigate = useNavigate();

    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(event) => {
        event.preventDefault();
        axios.post('https://millenium-falcon-339046ec552e.herokuapp.com/login', {
            email: email,
            password: password
        })
        .then((data) => {
            setToken(data);
            // console.log(data.data.permission);
            // console.log(data.data.token);
            if(data.data.permission === "allowed") {
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("email", email);
                navigate("/");
            }
            
        })
    }
    return (
        <>
            <h1>Login</h1>
            <form className="LoginForm" onSubmit={handleSubmit}>
                <input className="Email" type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email or Username" />
                <input className="Email" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                <button className="ButtonLogin" type="Submit">Login</button>
            </form>
        </>
    )
};

export default Login;