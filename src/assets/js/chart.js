const add = (time, index) => [time, index + 1];

/**
 * Update the data in a chart.
 */
export const update = (chart, data) =>
  chart.updateSeries([
    { name: "Shortened", data: data.shorten.map(add) },
    { name: "Visited", data: data.get.map(add) }
  ]);

/**
 * Clear the data from a chart.
 */
export const reset = chart => {
  chart.updateSeries([{ name: "Shortened", data: [] }, { name: "Visited", data: [] }]);
};
