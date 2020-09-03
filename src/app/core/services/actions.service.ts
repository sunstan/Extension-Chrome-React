import Config from './config.service';
import {isChrome} from '../utilities/browser';

class ActionsService {
    
    private static INSTANCE: ActionsService;
    
    private constructor() {}
    
    static getInstance() {
        return ActionsService.INSTANCE
            ? ActionsService.INSTANCE
            : new ActionsService();
    }
    
    async createNotification(options: any): Promise<void> {
        
        isChrome()
            ? chrome.notifications.create(options)
            : await browser.notifications.create(options);
    }
    
    async createTab(url: string): Promise<void> {
    
        isChrome()
            ? chrome.tabs.create({url})
            : await browser.tabs.create({url});
    }
    
    async setBrowserIcon(path: string): Promise<void> {
        
        isChrome()
            ? chrome.browserAction.setIcon({path})
            : await browser.browserAction.setIcon({path});
    }
    
    async addOnInstalledListener(callback): Promise<void> {
    
        isChrome()
            ? chrome.runtime.onInstalled.addListener(callback)
            : await browser.runtime.onInstalled.addListener(callback);
    }
    
    async addOnStartupListener(callback): Promise<void> {
        
        isChrome()
            ? chrome.runtime.onStartup.addListener(callback)
            : await browser.runtime.onStartup.addListener(callback);
    }
    
    async addNotificationsOnClickedListener(callback): Promise<void> {
        
        isChrome()
            ? chrome.notifications.onClicked.addListener(callback)
            : await browser.notifications.onClicked.addListener(callback);
    }
}

export default ActionsService.getInstance();
