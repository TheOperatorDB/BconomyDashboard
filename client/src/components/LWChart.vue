<script setup>
import { ref, onMounted, onUnmounted, watch, computed, inject } from "vue";
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

const isDark = inject("isDark", ref(false));

const getChartOptions = computed(() => {
  const lightTheme = {
    background: { type: "solid", color: "#f8fafc" },
    textColor: "#222",
    gridColor: "#e5e7eb",
    borderColor: "#e5e7eb",
  };

  const darkTheme = {
    background: { type: "solid", color: "#0f172a" },
    textColor: "#e2e8f0",
    gridColor: "#334155",
    borderColor: "#475569",
  };

  const theme = isDark.value ? darkTheme : lightTheme;

  return {
    width: 900,
    height: 500,
    layout: {
      background: theme.background,
      textColor: theme.textColor,
    },
    grid: {
      vertLines: { color: theme.gridColor, style: 1, visible: true },
      horzLines: { color: theme.gridColor, style: 1, visible: true },
    },
    timeScale: {
      borderColor: theme.borderColor,
      timeVisible: true,
      lockVisibleTimeRangeOnResize: true,
      rightBarStaysOnScroll: true,
    },
    rightPriceScale: {
      borderColor: theme.borderColor,
    },
    localization: {
      priceFormatter: (price) => `${price.toLocaleString("en-US")} BC`,
      dateFormat: "yyyy-MM-dd",
      timeFormat: "HH:mm",
    },
  };
});

// Computed series options based on dark mode
const getSeriesOptions = computed(() => {
  const theme = isDark.value
    ? {
        color: "#60a5fa",
        crosshairMarkerBorderColor: "#60a5fa",
        crosshairMarkerBackgroundColor: "#1e293b",
      }
    : {
        color: "#2563eb",
        crosshairMarkerBorderColor: "#2563eb",
        crosshairMarkerBackgroundColor: "#fff",
      };

  const defaultSeriesOptions = {
    ...theme,
    lineWidth: 2,
    priceLineVisible: false,
    lastValueVisible: true,
    crosshairMarkerVisible: true,
    crosshairMarkerRadius: 4,
    lineType: 2,
    pointMarkersVisible: false,
  };

  return {
    ...defaultSeriesOptions,
    ...(props.seriesOptions || {}),
    // Force theme colors to take precedence over props
    color: theme.color,
    crosshairMarkerBorderColor: theme.crosshairMarkerBorderColor,
    crosshairMarkerBackgroundColor: theme.crosshairMarkerBackgroundColor,
  };
});

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

const addSeriesAndData = () => {
  if (series && chart) {
    chart.removeSeries(series);
  }
  series = chart.addSeries(LineSeries, getSeriesOptions.value);
  if (!series || !props.data) return;
  series.setData(props.data);
};

const updateChartTheme = () => {
  if (!chart) return;

  // Update chart options
  chart.applyOptions(getChartOptions.value);

  // Update series options
  if (series) {
    series.applyOptions(getSeriesOptions.value);
  }
};

onMounted(() => {
  // Create chart with initial theme
  chart = createChart(chartContainer.value, getChartOptions.value);
  addSeriesAndData();

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

// Watch for dark mode changes and update chart theme
watch(isDark, () => {
  updateChartTheme();
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
  () => {
    addSeriesAndData();
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
  () => props.seriesOptions,
  (newOptions) => {
    if (!series) return;
    series.applyOptions(getSeriesOptions.value);
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
