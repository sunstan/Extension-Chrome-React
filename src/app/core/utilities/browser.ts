export function isChrome(): boolean {
    return !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
}
