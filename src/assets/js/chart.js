const add = (time, index) => [time, index + 1];

export const update = (chart, data) =>
  chart.updateSeries([
    { name: "Shortened", data: data.shorten.map(add) },
    { name: "Visited", data: data.get.map(add) }
  ]);
