import { apexCharts, elements } from "./constants";
import shorten from "./events/shorten";
import stats from "./events/stats";
import ApexCharts from "apexcharts";

elements.forms.shorten.addEventListener("submit", shorten);
elements.forms.stats.addEventListener("submit", stats);

apexCharts.chart = new ApexCharts(elements.chart, apexCharts.options);
apexCharts.chart.render();
