/**
 * Converts a size in bytes to a formatted string in gigabytes (Go).
 *
 * @param {number} bytes - The size in bytes.
 * @returns {string} The formatted size in gigabytes with two decimal places, followed by "Go".
 */
export default function formatBytes(bytes) {
  const giga = (bytes / (1024 ** 3)).toFixed(2)
  return `${giga} Go`
};
