export interface IConfig {
    
    readonly theme: string;
    
    readonly client_id: string;
    readonly client_secret: string;
    readonly channel_name: string;
    
    readonly social: {
        readonly youtube: string;
        readonly twitter: string;
        readonly facebook: string;
        readonly instagram: string;
        readonly discord: string;
        readonly shop: string;
    };
    
    readonly notification: {
        readonly type: string;
        readonly title: string;
        readonly message: string;
        readonly iconUrl: string;
    };
    
    readonly assets: {
        readonly on64: string;
        readonly on128: string;
        readonly off64: string;
        readonly off128: string;
        readonly err64: string;
        readonly err128: string;
    };
}
