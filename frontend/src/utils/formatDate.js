/**
 * Converts a duration in seconds into a human-readable format.
 *
 * @param {number} seconds - The duration in seconds.
 * @returns {string} A formatted string representing the duration in days, hours, and minutes.
 */
export default function secondsToReadable(seconds) {
  const minutes = Math.floor(seconds/60)
  const hours = Math.floor(minutes/60)
  const days = Math.floor(hours/24)

  return (days > 0 ? `${days} jours ` : '') + (hours%24 > 0 ? `${hours%24} heures et ` : '') + (minutes%60 > 0 ? `${minutes%60} minutes` : '')
}
