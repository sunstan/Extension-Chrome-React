import Twitch from './twitch.service';
import Storage from './storage.service';
import {IAuth} from '../models/auth.model';

class AuthService {
    
    private static INSTANCE: AuthService;
    
    private constructor() {}
    
    static getInstance() {
        return AuthService.INSTANCE
            ? AuthService.INSTANCE
            : new AuthService();
    }
    
    async login(): Promise<boolean> {
        try {
            const auth = await Twitch.getAuth();
            await Storage.setItem('auth', auth);
            return !!auth;
            
        } catch (e) { return false; }
    }
    
    async getAuth(): Promise<IAuth> {
        return await Storage.getItem('auth');
    }
    
    async getAccessToken(): Promise<string> {
        const auth = await this.getAuth();
        return auth ? auth.access_token : null;
    }
    
    async isLogged(): Promise<boolean> {
        const auth = await this.getAuth();
        
        if (!auth) return false;
        
        const now = new Date();
        const expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + auth.expires_in);
        
        return auth.access_token && expirationDate > now;
    }
    
    async logout(): Promise<void> {
        await Storage.removeItem('auth');
    }
}

export default AuthService.getInstance();
