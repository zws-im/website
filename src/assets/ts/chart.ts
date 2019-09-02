import ApexCharts from "apexcharts";

/**
 * Generates data in the ApexCharts format for an area chart.
 * @param value Value of the entry
 * @param index The index of the entry in the set of all entries
 */
const add = (value: any, index: number) => [value, index + 1];

/**
 * Update the data in a chart.
 */
export const update = (chart: ApexCharts, data) =>
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
