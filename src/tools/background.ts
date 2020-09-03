import Auth from '../app/core/services/auth.service';
import Twitch from '../app/core/services/twitch.service';
import Config from '../app/core/services/config.service';
import Storage from '../app/core/services/storage.service';
import Actions from '../app/core/services/actions.service';

const Background = async () => {
    
    const config = await Config.getAll();
    const isLogged = await Auth.isLogged() || await Auth.login();
    
    if (isLogged) {
        
        const stream = await Twitch.getStream();
        if (stream && stream.type === 'live') {
            
            const path = config.assets.on64;
            await Actions.setBrowserIcon(path);
            
            if ( await Storage.getItem('notify') &&
                !await Storage.getItem('notified')) {
    
                await Actions.createNotification({
                    ...config.notification,
                    title: config.notification.title || stream.title,
                });
                await Storage.setItem('notified', true);
            }

        } else {
            const path = config.assets.off64;
            await Actions.setBrowserIcon(path);
            await Storage.setItem('notified', false);
        }

    } else {
        const path = config.assets.err64;
        await Actions.setBrowserIcon(path);
    }
};

Background();
setInterval(() => Background(), 60000);
