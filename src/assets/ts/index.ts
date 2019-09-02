import ApexCharts from "apexcharts/dist/apexcharts.js";
import ClipboardJS from "clipboard";
import { reset } from "./chart";
import { apexCharts, elements } from "./constants";
import shorten from "./events/shorten";
import stats from "./events/stats";

if (elements.forms.shorten) {
  elements.forms.shorten.addEventListener("submit", shorten);
}

if (elements.forms.stats) {
  elements.forms.stats.addEventListener("submit", stats);
}
new ClipboardJS(elements.copyButton);

apexCharts.chart = new ApexCharts(elements.chart, apexCharts.options);

if (apexCharts.chart) {
  apexCharts.chart.render();
}
reset(apexCharts.chart);
