import React, {useContext} from 'react';
import AppContext from '../../../core/contexts/app.context';
import Actions from '../../../core/services/actions.service';
import Config from '../../../core/services/config.service';

const Header: React.FC = () => {
    
    const {user, stream, config} = useContext(AppContext);
    
    const live = stream && stream.type === 'live';
    const img = live
        ? stream.thumbnail_url.replace('-{width}x{height}', '')
        : user.profile_image_url || null;
    
    const goToChannel = async () => {
        const url = await Config.getChannelUrl();
        await Actions.createTab(url);
    };
    
    return (
        live
            ?   <div className="header" onClick={goToChannel}>
                    <img alt="" className="thumb" src={img} />
                </div>
            :   <div className="header" onClick={goToChannel}>
                    <img alt="" className="cover" src={img} />
                    <img alt="" className="avatar" src={img} />
                </div>
        
    );
};

export default Header;
