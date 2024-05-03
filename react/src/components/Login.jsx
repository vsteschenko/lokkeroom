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
            <div className="LoginDiv">
            <h1>Login</h1>
                <form className="LoginForm" onSubmit={handleSubmit}>
                    <input className="Email" type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email or Username" />
                    <input className="Email" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                    <button className="ButtonLogin" type="Submit">Login</button>
                </form>
            </div>
        </>
    )
};

export default Login;
// import React from 'react';
// import './../styles/Login.css';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faApple } from '@fortawesome/free-brands-svg-icons';
// const Login = () => {
//     const apple = <FontAwesomeIcon icon={faApple} />;
//     return (
//         <>
//             <div className="LoginDiv">
//                 <div className="LogoLogin">{apple}</div>
//                 <h1>Sign In or Sign Up</h1>
//                 <p>Enter your email to get started.</p>
//                 <form className="Login">
//                     <input className="Email" type="text" placeholder="Email or Username" />
//                     <input className="Email" type="password" placeholder="Password" />
//                     <Link to="/"><button className="ButtonLogin" type="submit">Login</button></Link>
//                 </form>
//             </div>
//         </>
//     )
// };
// export default Login;