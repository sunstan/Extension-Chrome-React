export function numberToString(n: number, decimals: number = 2): string {
    
    let string;
    
    if (n >= Math.pow(10, 9))       string = (n / Math.pow(10, 9)).toFixed(decimals) + 'Md';
    else if (n >= Math.pow(10, 6))  string = (n / Math.pow(10, 6)).toFixed(decimals) + 'M';
    else if (n >= Math.pow(10, 5))  string = (n / Math.pow(10, 3)).toFixed(decimals) + 'K';
    else                            string = n.toLocaleString('fr-FR');
    
    return string;
}
