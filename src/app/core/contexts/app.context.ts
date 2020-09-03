import React from 'react';
import {IUser} from '../models/user.model';
import {IGame} from '../models/game.model';
import {IStream} from '../models/stream.model';
import {IConfig} from '../models/config.model';

export default React.createContext({
    
    user: <IUser>{},
    game: <IGame>{},
    stream: <IStream>{},
    config: <IConfig>{},
})
