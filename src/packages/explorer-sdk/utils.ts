export function ellipseString(str: string = "", width: number = 5): string {
    return `${str.slice(0, width)}...${str.slice(-width)}`;
}