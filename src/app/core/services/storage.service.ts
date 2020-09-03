import {isChrome} from '../utilities/browser';

class StorageService {
    
    private static INSTANCE: StorageService;
    
    private constructor() {
    }
    
    static getInstance() {
        return StorageService.INSTANCE
            ? StorageService.INSTANCE
            : new StorageService();
    }
    
    async getItem(key: string): Promise<any> {
        
        return !isChrome()
            ? await browser.storage.local.get(key)
            : await new Promise(
                resolve => chrome.storage.local.get(key,
                    res => resolve(chrome.runtime.lastError || res[key])
                )
            );
    }
    
    async setItem(key: string, value: any): Promise<boolean | void> {
        
        return !isChrome()
            ? await browser.storage.local.set({[key]: value})
            : await new Promise(
                resolve => chrome.storage.local.set({[key]: value},
                    () => resolve(!chrome.runtime.lastError)
                )
            );
    }
    
    async removeItem(key: string) {
        
        return !isChrome()
            ? await browser.storage.local.remove(key)
            : await new Promise(
                resolve => chrome.storage.local.remove(key,
                    () => resolve(!chrome.runtime.lastError)
                )
            );
    }
}

export default StorageService.getInstance();
