/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Retrieves a value from localStorage.
 * @param key - The key to retrieve from localStorage.
 * @param defaultValue - The default value to return if the key doesn't exist or an error occurs.
 * @returns The value from localStorage if it exists, otherwise the defaultValue.
 */
export function getLocalStorage(key: string, defaultValue: any) {
    if (typeof window === 'undefined') {
        return defaultValue;
    }
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
    }
}

/**
 * Sets a value in localStorage.
 * @param key - The key under which to store the value.
 * @param value - The value to store in localStorage.
 */
export function setLocalStorage(key: string, value: any) {
    if (typeof window === 'undefined') {
        return;
    }
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error writing to localStorage:', error);
    }
}
