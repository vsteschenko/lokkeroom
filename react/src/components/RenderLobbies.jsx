import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateLobbyInChat from './CreateLobbyInChat';

const RenderLobbies = () => {
    const token = localStorage.getItem('token');
    const emailAddress = localStorage.getItem('email');
    const [lobby, setLobby] = useState([]);

    const [currentLobby, setCurrentLobby] = useState(null);

    useEffect(() => {
        axios.get('https://millenium-falcon-339046ec552e.herokuapp.com/mylobbies', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setLobby(response.data);
            // console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        });
    }, []);
    const [messages,setMessages] = useState([]);
    const handleClick = (lobby) => {
        setCurrentLobby(lobby);
        axios.get(`https://millenium-falcon-339046ec552e.herokuapp.com/lobby/${lobby}/messages`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setMessages(response.data);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        });
    };
    const [text, setText] = useState('');

    const handleKeyDown = (event) => {
        if (event.keyCode == 13) {
            handleSubmit(event)
        }
    };
    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                `https://millenium-falcon-339046ec552e.herokuapp.com/lobby/${currentLobby}/writeMessage`,
                { text: text },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
            const newMessage = text;
            // setMessages([...messages, newMessage]);
            setMessages([...messages, response.data]);
            handleClick(currentLobby);
            setText('');
        } catch (error) {
            console.error(error);
        }
    };

const handleCreateLobby = (newLobby) => {
    setLobby(prevLobbies => [...prevLobbies, newLobby]);
};

    return (
        <>  
            <div className="DivLobbiesAndCreateLobby">
                <div className="Lobbies">
                    {lobby.map((lobb, index) => {
                        return <div key={index} className="Lobby" onClick={() => handleClick(lobb)}>{lobb}</div>
                    })}
                </div>
                <CreateLobbyInChat onCreateLobby={handleCreateLobby}/>
            </div>
            <div className="DivMessagesAndInput">
                <div className="Messages">
                    {!messages ? <div>write a message</div> : messages.map((message, index) => {
                        return emailAddress === message.email ? <div key={index} className="MyMessage">{message.email}<br></br> {message.text} </div> : <div key={index} className="OtherMessages">{message.email} <br></br>{message.text}</div>
                        //return <div key={index}>{message.text} {message.email}</div>
                    })}
                </div>
                <form className="InputDiv" onSubmit={handleSubmit}>
                    <input className="Input" type="text" placeholder="write a message..." value={text} onChange={(event) => setText(event.target.value)} onKeyDown={handleKeyDown}></input>
                </form>
            </div>
        </>
    )
};

export default RenderLobbies;