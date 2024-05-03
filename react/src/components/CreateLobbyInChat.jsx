import React from 'react';
import axios from 'axios';

const CreateLobbyInChat = ({onCreateLobby, isLobbyVisible, setIsLobbyVisible}) => {
    const token = localStorage.getItem('token');
    const handleClick = async(event) => {
        event.preventDefault();
        axios.post('https://millenium-falcon-339046ec552e.herokuapp.com/createNewLobbyAndPostMessage', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data);
            onCreateLobby(response.data.lobby);
            console.log(response.data.lobbyId);
        })
        .catch((error) => {
            if (error.response && error.response.status === 403) {
                alert("You are no allowed to create a new lobby")
            }
            console.log(error)
        })
    };
    return (
        <div className="DivForCreateLobbby">
            <button className="CreateLobbyInChat" onClick={handleClick}>New Lobby</button>
        </div>)
};

export default CreateLobbyInChat;