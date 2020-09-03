import React from 'react';
import {IError} from '../../core/models/error.model';

const Error: React.FC<{ error: IError }> = ({error}) => {
    
    return (
        <div className="error">
            <img alt="" src="assets/images/twitch.png"/>
            <h1>{error.title}</h1>
            <span>{error.message}</span>
        </div>
    );
};

export default Error;
