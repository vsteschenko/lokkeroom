import React from 'react';
import axios from 'axios';

//remember that only admins can create lobbies
const CreateLobby = () => {
    const token = localStorage.getItem('token');
    // console.log(token);
    const handleSubmit = async(event) => {
        event.preventDefault();
        axios.post('https://millenium-falcon-339046ec552e.herokuapp.com/createlobby', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response);
        })
    };
    return (
        <>
            <div className='CreateLobbyContainer'>
                <h1>Create Lobby</h1>
                <form className='CreateLobbyForm' onSubmit={handleSubmit}>
                    <button className='CreateLobbyButton' type='Submit'>Create Lobby</button>
                </form>
            </div>
        </>
    )
};

export default CreateLobby;