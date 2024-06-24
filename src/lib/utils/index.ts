/**
 * Creates a debounced function that delays the execution of the provided function 
 * @param {F} func - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay.
 * @returns {(...args: Parameters<F>) => void} A new debounced function.
 */
export const debounce = <F extends (...args: any[]) => void>(
  func: F,
  delay: number
) => {
  let timerId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<F>) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/**
 * Formats a given Date object (or the current date and time by default) into a string in the format "HH:MM:SS".
 * @param {Date} [date=new Date()] - The date object to format. 
 * @returns {string} The formatted time string in "HH:MM:SS" format.
 */
export const formatTime = (date: Date = new Date()): string => {

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const formattedHours = hours < 10 ? '0' + hours : hours.toString();
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds.toString();
  const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  return formattedTime;
}

/**
 * Pushes new content to an array stored in localStorage.
 * @param key - The key under which the array is stored in localStorage.
 * @param value - The new value to push to the array.
 */
export function pushToLocalStorage<T>(key: string, value: T): void {
  // Retrieve the current array from localStorage
  const storedData = localStorage.getItem(key);
  let dataArray: T[] = [];

  if (storedData) {
    try {
      dataArray = JSON.parse(storedData);
      if (!Array.isArray(dataArray)) {
        throw new Error('Stored data is not an array');
      }
    } catch (error) {
      console.error('Error parsing stored data', error);
    }
  }

  // Push the new value to the array
  dataArray.push(value);

  // Save the updated array back to localStorage
  localStorage.setItem(key, JSON.stringify(dataArray));
}

/**
 * Retrieves and parses JSON data from localStorage.
 * @param key - The key under which the data is stored in localStorage.
 * @returns The parsed data, or null if the data is not present or not valid JSON.
 */
export function getFromLocalStorage<T>(key: string): T | null {
  // Retrieve the data from localStorage
  const storedData = localStorage.getItem(key);

  if (storedData) {
    try {
      // Parse and return the JSON data
      return JSON.parse(storedData) as T;
    } catch (error) {
      console.error('Error parsing stored data', error);
      return null;
    }
  }

  // Return null if no data is present
  return null;
}

/**
 * Removes an item from localStorage.
 * @param key - The key of the item to remove.
 */
export const removeLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
