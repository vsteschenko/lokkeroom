import React, { useState } from 'react';

const DirectMessage = ({isLobbyVisible, setIsLobbyVisible}) => {
    const handleClick = (event) => {
        if(isLobbyVisible) {
            setIsLobbyVisible(false);
        } else {
            setIsLobbyVisible(true);
        }
    };
    return (
    <>
        <div className="Channels" onClick={handleClick}>channels</div>
    </>)
};

export default DirectMessage;