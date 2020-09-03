import Http from './http.service';
import Config from './config.service';
import {IAuth} from '../models/auth.model';
import {IUser} from '../models/user.model';
import {IGame} from '../models/game.model';
import {IStream} from '../models/stream.model';
import {AxiosResponse} from 'axios';

class TwitchService {
    
    private static INSTANCE: TwitchService;
    
    private constructor() {}
    
    static getInstance() {
        return TwitchService.INSTANCE
            ? TwitchService.INSTANCE
            : new TwitchService();
    }
    
    async getAuth(): Promise<IAuth> {
        try {
            const config = {params: {}};
            const url = 'https://id.twitch.tv/oauth2/token';
            config.params['grant_type'] = 'client_credentials';
            config.params['client_id'] = await Config.getClientId();
            config.params['client_secret'] = await Config.getClientSecret();
            const {data}: AxiosResponse<IAuth> = await Http.axiosInstance.post(url, null, config);
            return data || null
            
        } catch (e) { console.log(e); }
    }
    
    async getUser(): Promise<IUser> {
        try {
            const url = 'https://api.twitch.tv/helix/users';
            const config = {params: {login: await Config.getChannelName()}};
            const {data}: AxiosResponse<{data: IUser}> = await Http.axiosInstance.get(url, config);
            
            return data && data.data && data.data[0]
                ? data.data[0]
                : null;
            
        } catch (e) { console.log(e); }
    }
    
    async getStream(): Promise<IStream> {
        try {
            const url = 'https://api.twitch.tv/helix/streams';
            const config = {params: {user_login: await Config.getChannelName()}};
            const {data}: AxiosResponse<{data: IStream[]}> = await Http.axiosInstance.get(url, config);
            return data && data.data && data.data[0]
                ? data.data[0]
                : null;
            
        } catch (e) { console.log(e); }
    }
    
    async getGame(id: string): Promise<IGame> {
        try {
            const config = {params: {id}};
            const url = 'https://api.twitch.tv/helix/games';
            const {data}: AxiosResponse<{data: IGame[]}> = await Http.axiosInstance.get(url, config);
            return data && data.data && data.data[0]
                ? data.data[0]
                : null;
            
        } catch (e) { console.log(e); }
    }
}

export default TwitchService.getInstance();
