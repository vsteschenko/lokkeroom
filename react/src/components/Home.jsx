import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RenderLobbies from './RenderLobbies';
import Nav from './Nav';

const Home = () => {
    const token = localStorage.getItem('token');
    const [isLobbyVisible, setIsLobbyVisible] = useState(true);
    return (
        <>
            <Nav isLobbyVisible={isLobbyVisible} setIsLobbyVisible={setIsLobbyVisible} />
            <div className="Container">
                <RenderLobbies isLobbyVisible={isLobbyVisible} setIsLobbyVisible={setIsLobbyVisible} />
            </div>
        </>
    )
};

export default Home;