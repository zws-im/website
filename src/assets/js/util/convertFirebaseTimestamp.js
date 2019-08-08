/**
 * @typedef {Object} FirebaseTimestamp
 * @property {number} _seconds Number of seconds since UNIX epoch
 * @property {number} _nanoseconds Number of nanoseconds since UNIX epoch
 */

/**
 * Function for converting Firebase timestamp objects to ApexCharts datetime data.
 * @param {FirebaseTimestamp} time Firebase timestamp object from the JSON representation of the data
 * @param {number} index Index of the array
 * @return {Array<number>} ApexCharts time series data entry
 */
export default (time, index) => [time._seconds * 1000, index + 1];
