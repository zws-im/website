import ApexCharts from "apexcharts";
import ClipboardJS from "clipboard";
import { apexCharts, elements } from "./constants";
import shorten from "./events/shorten";
import stats from "./events/stats";

elements.forms.shorten.addEventListener("submit", shorten);
elements.forms.stats.addEventListener("submit", stats);
new ClipboardJS(elements.copyButton);

apexCharts.chart = new ApexCharts(elements.chart, apexCharts.options);
apexCharts.chart.render();
