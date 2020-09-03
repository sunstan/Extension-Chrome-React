import React, {useEffect, useState} from 'react';
import Storage from '../../../core/services/storage.service';

const Notifications: React.FC = () => {

    const [notify, setNotify] = useState(false);
    
    const onInit = async () => {
        const notify = await Storage.getItem('notify');
        setNotify(notify);
    };
    
    const updateNotify = async () => {
        await Storage.setItem('notify', !notify);
        setNotify(!notify);
    };
    
    useEffect(() => { onInit(); }, []);
    
    return (
        <label className="item">
            <span className="label">Notifications</span>
            <label className="switch">
                <input type="checkbox" checked={notify} onChange={updateNotify}/>
                <span className="slider round"/>
            </label>
        </label>
    )
};

export default Notifications;
