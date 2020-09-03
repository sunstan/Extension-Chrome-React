import React from 'react';
import Content from './components/content.component';
import Social from './components/social.component';
import Notifications from './components/notifications.component';
import Header from './components/header.component';

const Logged: React.FC = () => {
    
    return (
        <>
            <Header />
            <Content />
            <Notifications />
            <Social />
        </>
    );
};

export default Logged;
