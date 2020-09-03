import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import Config from './config.service';
import Auth from './auth.service';

class HttpService {
    
    readonly axiosInstance: AxiosInstance;
    
    private static INSTANCE: HttpService;
    
    private constructor() {
        this.axiosInstance = axios.create({});
    
        this.axiosInstance.interceptors.request.use(
            this.handleRequest,
            this.handleError,
        );
        
        this.axiosInstance.interceptors.response.use(
            this.handleResponse,
            this.handleError,
        );
    }

    static getInstance() {
        return HttpService.INSTANCE
            ? HttpService.INSTANCE
            : new HttpService();
    }
    
    private handleRequest = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
        
        console.log(config);
        
        const clientId = await Config.getClientId();
        const accessToken = await Auth.getAccessToken();
        
        if (clientId && !config.url.includes('oauth')) config.headers['Client-ID'] = clientId;
        if (accessToken) config.headers['Authorization'] = 'Bearer ' + accessToken;
        
        return config;
    };
    
    private handleResponse = async (res: AxiosResponse): Promise<any> => {
        return res;
    };
    
    private handleError = async (error: any) => {
    
        if (error.response &&
            error.response.request &&
            error.response.request.responseURL
        ) {

            // If Request Was Not Login
            if (!error.response.request.responseURL.includes('oauth')) {
    
                // If Authentication Error
                if (error.response.status === 401) {

                    return await Auth.login()
                        ? this.axiosInstance(error.response.config)
                        : Promise.reject(error);

                // If Unknown Error
                } else { return Promise.reject(error); }
    
            // If Request Was Login
            } else {
                await Auth.logout();
                return Promise.reject(error);
            }
        }
    };
}

export default HttpService.getInstance();
