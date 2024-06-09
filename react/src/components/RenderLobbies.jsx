import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import MyContext from '../MyContext';
import axios from 'axios';
import CreateLobbyInChat from './CreateLobbyInChat';

const RenderLobbies = ({isLobbyVisible, setIsLobbyVisible}) => {
    const token = localStorage.getItem('token');
    const emailAddress = localStorage.getItem('email');
    const [lobby, setLobby] = useState([]);
    const [currentLobby, setCurrentLobby] = useState(null);
    const { dm, setDm } = useContext(MyContext);
    const [currentDm, setCurrentDm] = useState(null);
    useEffect(() => {
        axios.get('https://millenium-falcon-e8394498af5e.herokuapp.com/mylobbies', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setLobby(response.data);
        })
        .catch((error) => {
            console.log(error)
        });
    }, []);
    const [messages,setMessages] = useState([]);
    const handleClick = (lobby) => {
        setCurrentLobby(lobby);
        axios.get(`https://millenium-falcon-e8394498af5e.herokuapp.com/lobby/${lobby}/messages`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setMessages(response.data);
            console.log(response.data);
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
    // const handleSubmit = async(event) => {
    //     event.preventDefault();
    //     try {
    //         const response = await axios.post(
    //             `https://millenium-falcon-e8394498af5e.herokuapp.com/lobby/${currentLobby}/writeMessage`,
    //             { text: text },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             }
    //         );
    //         console.log(response.data);
    //         setMessages([...messages, response.data]);
    //         handleClick(currentLobby);
    //         setText('');
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log(isLobbyVisible);
        if(isLobbyVisible) {
            try {
                const response = await axios.post(`https://millenium-falcon-e8394498af5e.herokuapp.com/lobby/${currentLobby}/writeMessage`,
                    { text: text },
                    { headers: { Authorization: `Bearer ${token}`} }
                );
                //console.log(response.data);
                setMessages([...messages, response.data]);
                handleClick(currentLobby);
                setText('');
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const response = await axios.post(`https://millenium-falcon-e8394498af5e.herokuapp.com/directMessage`,
                    { text: text, userEmail: currentDm },
                    { headers: { Authorization: `Bearer ${token}` } })
                // console.log(response.data);
                setPrivateMessages([...privateMessage, response.data]);
                // console.log(privateMessage);
                setText('')
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleCreateLobby = (newLobby) => {
        setLobby(prevLobbies => [...prevLobbies, newLobby]);
    };
    const [privateMessage, setPrivateMessages] = useState([]);
    const handleClickDm = async(email) => {
        console.log(email);
        setCurrentDm(email);
        await axios.get(`https://millenium-falcon-e8394498af5e.herokuapp.com/getMessagesWithUser?email=${email}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
        .then((response) => {
            setPrivateMessages(response.data);
        })
    };


    return (
        <>  
            <div className="DivLobbiesAndCreateLobby">
                <div className="ContainerLobbiesOrMessages">
                    {isLobbyVisible ? 
                        lobby.map((lobb, index) => {
                            return <div key={index} className={`Lobby ${isLobbyVisible ? '' : 'hidden'}`} onClick={() => handleClick(lobb)}>{lobb}</div>
                        }) : dm.reduce((unique, message) => {
                            return unique.includes(message.email) ? unique : [...unique, message.email];
                        }, []).map((email, index) => {
                            return <div key={index} className="Lobby" onClick={() => handleClickDm(email)}>{email}</div>
                        })
                    }
                </div>
                <CreateLobbyInChat onCreateLobby={handleCreateLobby} />
            </div>
            <div className="DivMessagesAndInput">
                <div className="Messages">
                    {isLobbyVisible ?
                        !messages ? <div>write a message</div> : messages.map((message, index) => {
                            return emailAddress === message.email ? <div key={index} className="MyMessage">{message.email}<br></br> {message.text} </div> : <div key={index} className="OtherMessages">{message.email} <br></br>{message.text}</div>
                        }) : privateMessage.map((message, index) => {
                            return currentDm === message.email ? <div key={index} className="OtherMessages">{message.email}<br></br>{message.text}</div> : <div key={index} className="MyMessage">{message.email} <br></br> {message.text}</div>
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