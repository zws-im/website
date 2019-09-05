import ApexCharts from "apexcharts";
import Usage from "../../types/usage";

/**
 * Generates data in the ApexCharts format for an area chart.
 * @param value Value of the entry
 * @param index The index of the entry in the set of all entries
 */
const generateAreaChart = (value: any, index: number): [any, number] => [value, index + 1];

/**
 * Update the data in a chart.
 */
export const update = (chart: ApexCharts, data: Usage) =>
  chart.updateSeries([
    {
      name: "Shortened",
      data: data.shorten.map(generateAreaChart)
    },
    { name: "Visited", data: data.get.map(generateAreaChart) }
  ]);

/**
 * Clear the data from a chart.
 * @param chart Chart to clear the date for
 */
export const reset = (chart: ApexCharts) => {
  chart.updateSeries([{ name: "Shortened", data: [] }, { name: "Visited", data: [] }]);
};
