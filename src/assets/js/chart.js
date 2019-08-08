import convertTimestamp from "./util/convertFirebaseTimestamp.js";

export const update = (chart, data) =>
  chart.updateSeries([
    { name: "Shorten", data: data.shorten.map(convertTimestamp) },
    { name: "Visited", data: data.get.map(convertTimestamp) }
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
