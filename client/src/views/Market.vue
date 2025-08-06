<template>
  <div class="space-y-6 dark:bg-gray-700">
    <!-- Chart Section -->
    <div class="max-w-4xl mx-auto">
      <div
        class="rounded-lg shadow-sm border dark:border-table-border-dark overflow-hidden dark:bg-gray-900"
      >
        <!-- Chart Header -->
        <div
          class="px-6 py-4 border-b border-table-border-light dark:border-table-border-dark dark:bg-gray-800"
        >
          <div class="flex items-center">
            <div class="w-1/3">
              <label
                class="block text-sm font-medium dark:text-table-primary-dark mb-2"
              >
                Select an item to view its market trends
              </label>
              <v-select
                :items="filteredItems"
                item-title="name"
                item-value="id"
                v-model="selectedItemId"
                :menu-props="{
                  eager: true,
                  closeOnContentClick: false,
                  contentClass: 'custom-select-menu',
                }"
                @update:menu="handleMenuToggle"
                variant="outlined"
                class="custom-select w-full dark:bg-gray-900 dark:border-table-border-dark dark:text-content-primary-dark"
                hide-details
              >
                <template v-slot:append-inner>
                  <svg
                    class="w-5 h-5 dark:text-table-secondary-dark"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </template>
                <template v-slot:prepend-item>
                  <v-list-item
                    @mousedown.stop
                    class="dark:bg-gray-800 dark:text-table-primary-dark"
                  >
                    <v-text-field
                      ref="searchField"
                      v-model="searchTerm"
                      placeholder="Search items..."
                      clearable
                      @mousedown.stop
                      @keydown="handleKeydown"
                      variant="outlined"
                      density="compact"
                      hide-details
                      class="search-field dark:bg-gray-900 dark:text-table-primary-dark"
                    />
                  </v-list-item>
                </template>
              </v-select>
            </div>
          </div>
        </div>

        <!-- Chart -->
        <div
          class="chart-wrapper dark:bg-gray-900 shadow-inner overflow-hidden"
        >
          <template v-if="chartData.length > 0">
            <LWChart :data="chartData" />
          </template>
          <template v-else>
            <div
              class="flex items-center justify-center p-12 text-gray-500 dark:text-gray-400"
            >
              <div class="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p class="mb-2">No market data available for this item</p>
                <p class="text-sm">
                  Select a different item or check back later
                </p>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Price Change Cards -->
      <div class="w-full flex justify-center mt-8">
        <div class="max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <!-- Current Price Card -->
          <div class="flex justify-center">
            <div class="w-full max-w-md">
              <div
                class="rounded-lg shadow-sm border dark:border-table-border-dark p-3 flex flex-col min-h-32 dark:bg-gray-800"
              >
                <div
                  class="text-base text-table-primary-light dark:text-table-primary-dark mb-2 flex items-center gap-2"
                >
                  Last Price
                </div>
                <div class="flex flex-col gap-1">
                  <div class="text-xl font-bold dark:text-table-primary-dark">
                    {{ latestData.value }} BC
                  </div>
                  <template v-if="latestData.time">
                    <div
                      class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2"
                    >
                      {{ latestData.time.toLocaleString("en-US") }}
                      <div v-if="isDataOld" class="relative group">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5 text-amber-500"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                          />
                        </svg>
                        <div
                          class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity"
                        >
                          Data is more than 1 hour old
                          <div
                            class="absolute left-1/2 -translate-x-1/2 top-full -mt-1 border-4 border-transparent border-t-gray-900"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>

          <PriceChangeCard
            v-if="priceChange1h"
            period="Last hour"
            :price-change="priceChange1h"
            :color-class="priceChange1hColorClass"
            :icon="priceChange1hIcon"
          />

          <PriceChangeCard
            v-if="priceChange24h"
            period="Last day"
            :price-change="priceChange24h"
            :color-class="priceChange24hColorClass"
            :icon="priceChange24hIcon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LWChart from "../components/market/LWChart.vue";
import PriceChangeCard from "../components/market/PriceChangeCard.vue";
import { market } from "../composables/market.js";
import { items } from "../composables/items.js";
import { ref, onMounted, onUnmounted, watch, computed } from "vue";

const chartData = ref([]);
const itemsList = ref([]);
const selectedItemId = ref(null);
const searchTerm = ref("");
const searchField = ref(null);
let refreshInterval;

const { fetchItemsSimple } = items();
const { fetchItemMarketDataById } = market();

const filteredItems = computed(() => {
  let filtered = itemsList.value;

  if (searchTerm.value) {
    filtered = filtered.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }

  if (selectedItemId.value) {
    const selectedItem = itemsList.value.find(
      (item) => item.id === selectedItemId.value
    );
    if (selectedItem && !filtered.includes(selectedItem)) {
      filtered = [selectedItem, ...filtered];
    }
  }

  return filtered;
});

const latestData = computed(() => {
  if (chartData.value.length === 0) return { value: 0, time: null };
  const lastPoint = chartData.value[chartData.value.length - 1];
  return {
    value: lastPoint.value
      ? Math.floor(lastPoint.value).toLocaleString("en-US")
      : "0",
    time: lastPoint.time ? new Date(lastPoint.time * 1000) : null,
  };
});

const isDataOld = computed(() => {
  if (!latestData.value.time) return false;
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  return latestData.value.time < oneHourAgo;
});

function calculatePriceChange(hoursAgo) {
  if (chartData.value.length < 2) return null;

  const latest = chartData.value[chartData.value.length - 1].value;
  const pastValue = findValueHoursAgo(hoursAgo * 60 * 60 * 1000);

  if (!pastValue) return null;

  const diff = latest - pastValue;
  const percent = (diff / pastValue) * 100;

  return {
    value:
      diff > 0
        ? `+${diff.toLocaleString("en-US")}`
        : diff.toLocaleString("en-US"),
    percent: percent > 0 ? `+${percent.toFixed(2)}%` : `${percent.toFixed(2)}%`,
  };
}

function createPriceChange(hours) {
  const priceChange = computed(() => calculatePriceChange(hours));

  const colorClass = computed(() => {
    if (!priceChange.value) return "text-gray-600";
    const value = priceChange.value.value;
    return value.startsWith("+")
      ? "text-green-600 dark:text-green-500"
      : value.startsWith("-")
        ? "text-red-600 dark:text-red-500"
        : "text-table-secondary-light dark:text-table-secondary-dark";
  });

  const icon = computed(() => {
    if (!priceChange.value) return 0;
    const value = priceChange.value.value;
    return value.startsWith("+") ? 1 : value.startsWith("-") ? -1 : 0;
  });

  return { priceChange, colorClass, icon };
}

const {
  priceChange: priceChange1h,
  colorClass: priceChange1hColorClass,
  icon: priceChange1hIcon,
} = createPriceChange(1);

const {
  priceChange: priceChange24h,
  colorClass: priceChange24hColorClass,
  icon: priceChange24hIcon,
} = createPriceChange(24);

const handleKeydown = (event) => {
  const allowedKeys = ["ArrowDown", "ArrowUp", "Enter"];

  if (allowedKeys.includes(event.key)) return;

  event.stopPropagation();
};

function findValueHoursAgo(millisecondsAgo) {
  const targetTimestamp = Date.now() - millisecondsAgo;

  let closestIndex = 0;
  let minDiff = Infinity;

  for (let i = 0; i < chartData.value.length; i++) {
    let itemTime = chartData.value[i].time * 1000;

    const diff = Math.abs(itemTime - targetTimestamp);
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = i;
    }
  }

  return chartData.value[closestIndex]?.value;
}

async function updateChartData(itemId) {
  try {
    const marketData = await fetchItemMarketDataById(itemId);
    chartData.value =
      marketData?.length > 0
        ? marketData.map((item) => ({ time: item.time, value: item.value }))
        : [];
  } catch (error) {
    console.warn("Failed to fetch market data:", error);
    chartData.value = [];
  }
}

function handleMenuToggle(isOpen) {
  if (isOpen) {
    setTimeout(() => {
      const input = searchField.value?.$el?.querySelector("input");
      input?.focus();
    }, 100);
  } else {
    searchTerm.value = "";
  }
}

function setDefaultSelection() {
  const defaultItem = itemsList.value.find((item) => item.id === 111);
  if (defaultItem) {
    selectedItemId.value = defaultItem.id;
  }
}

onMounted(async () => {
  try {
    itemsList.value = await fetchItemsSimple();
    setDefaultSelection();
  } catch (error) {
    console.error("Failed to load items:", error);
  }
});

refreshInterval = setInterval(
  () => {
    if (selectedItemId.value) {
      updateChartData(selectedItemId.value);
    }
  },
  5 * 60 * 1000
);

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
});

watch(selectedItemId, async (newItemId) => {
  await updateChartData(newItemId);
});
</script>

<style>
.dark {
  --v-theme-surface: #1f2937;
}

.dark .v-list {
  background-color: transparent !important;
}

.dark .v-list,
.dark .v-menu > .v-overlay__content > .v-card,
.dark .v-select .v-field__input,
.dark .v-text-field .v-field__input {
  background-color: #111827;
}

.dark .v-list {
  background-color: #1f2937;
}

.dark .v-list-item {
  color: #f9fafb;
  background-color: #1f2937;
}

.dark .v-list-item:hover {
  color: #f9fafb;
  background-color: #1f2937;
}

.dark .v-field__field {
  background-color: #111827;
}
</style>
