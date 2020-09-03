import {IConfig} from '../models/config.model';

class ConfigService {
    
    readonly BASE_URL = 'https://twitch.tv/';
    
    private static INSTANCE: ConfigService;
    
    private constructor() {}
    
    static getInstance() {
        return ConfigService.INSTANCE
            ? ConfigService.INSTANCE
            : new ConfigService();
    }
    
    async getAll(): Promise<IConfig> {
        const response = await fetch('../config.json');
        return await response.json();
    }
    
    async getTheme(): Promise<string> {
        const config = await this.getAll();
        return config.theme || null;
    }
    
    async getClientId(): Promise<string> {
        const config = await this.getAll();
        return config.client_id || null;
    }
    
    async getClientSecret(): Promise<string> {
        const config = await this.getAll();
        return config.client_secret || null;
    }
    
    async getChannelName(): Promise<string> {
        const config = await this.getAll();
        return config.channel_name || null;
    }
    
    async getChannelUrl(): Promise<string> {
        return this.BASE_URL + await this.getChannelName();
    }
    
    async getNotification(): Promise<any> {
        const config = await this.getAll();
        return config.notification || null;
    }
    
}

export default ConfigService.getInstance();
