<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { createChart, LineSeries } from "lightweight-charts";

const props = defineProps({
  type: {
    type: String,
    default: "line",
  },
  data: {
    type: Array,
    required: true,
  },
  autosize: {
    default: true,
    type: Boolean,
  },
  chartOptions: {
    type: Object,
  },
  seriesOptions: {
    type: Object,
  },
  timeScaleOptions: {
    type: Object,
  },
  priceScaleOptions: {
    type: Object,
  },
});

let series;
let chart;

const chartContainer = ref();

const fitContent = () => {
  if (!chart) return;
  chart.timeScale().fitContent();
};

const getChart = () => {
  return chart;
};

defineExpose({ fitContent, getChart });

const resizeHandler = () => {
  if (!chart || !chartContainer.value) return;
  const dimensions = chartContainer.value.getBoundingClientRect();
  chart.resize(dimensions.width, dimensions.height);
};

const addSeriesAndData = (props) => {
  series = chart.addSeries(LineSeries, props.seriesOptions);
  if (!series || !props.data) return;
  series.setData(props.data);
};

onMounted(() => {
  const defaultChartOptions = {
    width: 600,
    height: 350,
    layout: {
      background: { type: "solid", color: "#f8fafc" },
      textColor: "#222",
    },
    grid: {
      vertLines: { color: "#e5e7eb", style: 1, visible: true },
      horzLines: { color: "#e5e7eb", style: 1, visible: true },
    },
    timeScale: {
      borderColor: "#e5e7eb",
      timeVisible: true,
      secondsVisible: false,
    },
    rightPriceScale: {
      borderColor: "#e5e7eb",
    },
    localization: {
      priceFormatter: (price) => `${price.toLocaleString("en-US")} BC`,
      dateFormat: "yyyy-MM-dd",
    },
  };

  const chartOptionsWithLocalization = {
    ...defaultChartOptions,
    ...(props.chartOptions || {}),
    localization: {
      ...defaultChartOptions.localization,
      ...(props.chartOptions?.localization || {}),
    },
  };

  chart = createChart(chartContainer.value, chartOptionsWithLocalization);
  const defaultSeriesOptions = {
    color: "#2563eb",
    lineWidth: 2,
    priceLineVisible: false,
    lastValueVisible: true,
    crosshairMarkerVisible: true,
    crosshairMarkerRadius: 4,
    crosshairMarkerBorderColor: "#2563eb",
    crosshairMarkerBackgroundColor: "#fff",
  };
  // Merge series options without mutating props
  const mergedProps = {
    ...props,
    seriesOptions: {
      ...defaultSeriesOptions,
      ...(props.seriesOptions || {}),
    },
  };
  addSeriesAndData(mergedProps);

  if (props.priceScaleOptions) {
    chart.priceScale().applyOptions(props.priceScaleOptions);
  }

  if (props.timeScaleOptions) {
    chart.timeScale().applyOptions(props.timeScaleOptions);
  }

  chart.timeScale().fitContent();

  if (props.autosize) {
    window.addEventListener("resize", resizeHandler);
  }
});

onUnmounted(() => {
  if (chart) {
    chart.remove();
    chart = null;
  }
  if (series) {
    series = null;
  }
  window.removeEventListener("resize", resizeHandler);
});

watch(
  () => props.autosize,
  (enabled) => {
    if (!enabled) {
      window.removeEventListener("resize", resizeHandler);
      return;
    }
    window.addEventListener("resize", resizeHandler);
  }
);

watch(
  () => props.type,
  (newType) => {
    if (series && chart) {
      chart.removeSeries(series);
    }
    addSeriesAndData(props);
  }
);

watch(
  () => props.data,
  (newData) => {
    if (!series) return;
    series.setData(newData);
  }
);

watch(
  () => props.chartOptions,
  (newOptions) => {
    if (!chart) return;
    chart.applyOptions(newOptions);
  }
);

watch(
  () => props.seriesOptions,
  (newOptions) => {
    if (!series) return;
    series.applyOptions(newOptions);
  }
);

watch(
  () => props.priceScaleOptions,
  (newOptions) => {
    if (!chart) return;
    chart.priceScale().applyOptions(newOptions);
  }
);

watch(
  () => props.timeScaleOptions,
  (newOptions) => {
    if (!chart) return;
    chart.timeScale().applyOptions(newOptions);
  }
);
</script>

<template>
  <div class="lw-chart" ref="chartContainer"></div>
</template>

<style scoped>
.lw-chart {
  height: 100%;
}
</style>
