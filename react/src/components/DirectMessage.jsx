import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import MyContext from '../MyContext';

const DirectMessage = () => {
    const token = localStorage.getItem('token');
    const { isLobbyVisible, setIsLobbyVisible } = useContext(MyContext);
    const { isDmVisible, setIsDmVisible} = useContext(MyContext);
    const { dm, setDm } = useContext(MyContext);
    const handleClick = (event) => {
        if(isLobbyVisible) {
            setIsLobbyVisible(false);
            setIsDmVisible(true);
        } else {
            setIsLobbyVisible(true);
            setIsDmVisible(false);
        }
        axios.get('https://millenium-falcon-e8394498af5e.herokuapp.com/mymessages', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setDm(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
    };

    return (
        <>  
            <div className="Channels">channels</div>
            <div className={`Channels ${isLobbyVisible ? "" : "NotActive"}`} onClick={handleClick}>private messages</div>
        </>)
};

export default DirectMessage;