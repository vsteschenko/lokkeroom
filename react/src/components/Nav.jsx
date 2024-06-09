import React from 'react';
import DirectMessage from './DirectMessage';

const Nav = () => {
    const email = localStorage.getItem('email');
    return <div className="Nav">
                <div className="SlideMenu">
                    <DirectMessage />
                </div>
                <div className={"email"}>Logged in as: {email}</div>
            </div>
};

export default Nav;