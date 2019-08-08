
const add = (time, index) => [time, index + 1];

export const update = (chart, data) =>
  chart.updateSeries([
    { name: "Shorten", data: data.shorten.map(add) },
    { name: "Visited", data: data.get.map(add) }
  ]);

export const options = {
  chart: {
    type: "area"
  },
  series: [],
  xaxis: {
    type: "datetime"
  }
};
