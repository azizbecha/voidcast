export const capitalizeWords = (str: string): string => {
    // Trim the string, split words, then capitalize each word
    return str.trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}