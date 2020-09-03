import React, {useContext} from 'react';
import AppContext from '../../../core/contexts/app.context';
import Actions from '../../../core/services/actions.service';

const Social: React.FC = () => {
    
    const {config} = useContext(AppContext);
    
    const goToUrl = async (url: string) => {
        await Actions.createTab(url);
    };
    
    return (
        <div className="social">
            {
                Object.keys(config.social).map(k => config.social[k] &&
                    <a onClick={() => goToUrl(config.social[k])} key={k}>
                        <img alt={k} src={'assets/icons/' + k + '.png'}/>
                    </a>
                )
            }
        </div>
    )
};

export default Social;
