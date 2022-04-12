export function ellipseString(str: string = "", width: number = 10): string {
    return `${str.slice(0, width)}...`;
}