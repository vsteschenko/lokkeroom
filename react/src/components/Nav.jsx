import React from 'react';
import DirectMessage from './DirectMessage';

const Nav = ({isLobbyVisible, setIsLobbyVisible}) => {
    return <div className="Nav">
                <div className="SlideMenu">
                    <DirectMessage isLobbyVisible={isLobbyVisible} setIsLobbyVisible={setIsLobbyVisible}/>
                    <div>messages</div>
                </div>
            </div>
};

export default Nav;