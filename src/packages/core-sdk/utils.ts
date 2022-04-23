export function ellipseString(str: string = "", width: number = 10): string {
    if (width >= str.length) {
        return str;
    }
    return `${str.slice(0, width)}...`;
}