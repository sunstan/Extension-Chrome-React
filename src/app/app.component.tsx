import React, {useEffect, useState} from 'react';

import Themes from './core/constants/themes';
import Auth from './core/services/auth.service';
import Config from './core/services/config.service';
import Twitch from './core/services/twitch.service';
import Actions from './core/services/actions.service';
import AppContext from './core/contexts/app.context';

import {IUser} from './core/models/user.model';
import {IGame} from './core/models/game.model';
import {IStream} from './core/models/stream.model';
import {IConfig} from './core/models/config.model';

import Error from './components/error/error.component';
import Pending from './components/pending/pending.component';
import Logged from './components/content/logged.component';

const App: React.FC = () => {
    
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(true);
    
    const [user, setUser] = useState<IUser>(null);
    const [game, setGame] = useState<IGame>(null);
    const [stream, setStream] = useState<IStream>(null);
    const [config, setConfig] = useState<IConfig>(null);
    
    const appContext = {user, game, stream, config};
    
    const onInit = async () => {
    
        // Get Configuration from JSON
        const config = await Config.getAll();
    
        // Manage Colors
        const body = document.querySelector('body');
        const theme = Themes.includes(config.theme) ? config.theme : 'default';
        body.classList.add('theme-' + theme);
        
        const isLogged = await Auth.isLogged() || await Auth.login();
        
        if (isLogged) {
            
            // Get User from TWITCH
            const user = await Twitch.getUser();
            
            if (user) {
    
                // Get Informations from TWITCH
                const stream = await Twitch.getStream();
                const game = stream ? await Twitch.getGame(stream.game_id) : null;
    
                // Update App State
                setUser(user);
                setGame(game);
                setStream(stream);
                setConfig(config);
    
                const path = stream && stream.type === 'live'
                    ? config.assets.on64
                    : config.assets.off64;
                await Actions.setBrowserIcon(path);
                
            } else {
                
                const path = config.assets.err64;
                await Actions.setBrowserIcon(path);
                setError({
                    title: 'Utilisateur introuvable',
                    message: `Impossible de récupérer les informations de la chaine. Renseignez-vous auprès de l'administrateur de l'extension.`,
                });
                
            }
            
        } else {
            const path = config.assets.err64;
            await Actions.setBrowserIcon(path);
            setError({
                title: 'Erreur de connexion',
                message: "Impossible de se connecter à l'API Twitch. La tentative de reconnexion est automatique. Nous vous invitons à patienter.",
            });
        }
        
        setPending(false);
    };
    
    useEffect(() => { onInit(); }, []);
    
    return (
        <AppContext.Provider value={appContext}>
            {
                pending
                    ? <Pending />
                    : error
                        ? <Error error={error}/>
                        : <Logged />
            }
        </AppContext.Provider>
    );
};

export default App
