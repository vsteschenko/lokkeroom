import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RenderLobbies from './RenderLobbies';
import Nav from './Nav';

const Home = () => {
    const token = localStorage.getItem('token');
    return (
        <>
            <Nav />
            <div className="Container">
                <RenderLobbies />
            </div>
        </>
    )
};

export default Home;