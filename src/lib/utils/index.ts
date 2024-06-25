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
