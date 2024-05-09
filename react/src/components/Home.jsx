import React, { useState, useEffect } from 'react';
import MyContext from "../MyContext";
import axios from 'axios';
import RenderLobbies from './RenderLobbies';
import Nav from './Nav';
import DirectMessage from './DirectMessage';

const Home = () => {
    const token = localStorage.getItem('token');
    const [isLobbyVisible, setIsLobbyVisible] = useState(true);
    const [isDmVisible, setIsDmVisible] = useState(false);
    const [dm, setDm] = useState([]);
    return (
        <>
            <MyContext.Provider value={{isLobbyVisible, setIsLobbyVisible, dm, setDm, isDmVisible, setIsDmVisible}}>
                <Nav isLobbyVisible={isLobbyVisible} setIsLobbyVisible={setIsLobbyVisible} />
                <div className="Container">
                    <RenderLobbies isLobbyVisible={isLobbyVisible} setIsLobbyVisible={setIsLobbyVisible} />
                </div>
            </MyContext.Provider>
        </>
    )
};

export default Home;