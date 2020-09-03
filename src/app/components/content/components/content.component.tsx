import React, {useContext} from 'react';
import AppContext from '../../../core/contexts/app.context';
import Config from '../../../core/services/config.service';
import Actions from '../../../core/services/actions.service';
import {numberToString} from '../../../core/utilities/numbers';

const Content: React.FC = () => {
    
    const {user, game, stream, config} = useContext(AppContext);
    
    const live = stream && stream.type === 'live';
    const viewCount = user ? numberToString(user.view_count, 1) + ' Vues' : null;
    const viewerCount = stream ? numberToString(stream.viewer_count, 1) + ' Spectateurs' : null;
    
    const goToChannel = async () => {
        const url = await Config.getChannelUrl();
        await Actions.createTab(url);
    };
    
    return (
        live
            ?   <div className="content">
                    <h1 onClick={goToChannel}>{stream.title}</h1>
                    <div className="item">
                        <span className="label">{game.name}</span>
                        <img src="/assets/icons/gamepad.png"/>
                    </div>
                    <div className="item">
                        <span className="label">{viewerCount}</span>
                        <img src="/assets/icons/account.png"/>
                    </div>
                </div>
            
            :   <div className="content">
                    <h1 onClick={goToChannel}>{user.display_name}</h1>
                    <div className="item">
                        <span className="label">Stream hors-ligne</span>
                        <img src="/assets/icons/gamepad.png"/>
                    </div>
                    <div className="item">
                        <span className="label">{viewCount}</span>
                        <img src="/assets/icons/eye.png"/>
                    </div>
                </div>
    );
};

export default Content;
