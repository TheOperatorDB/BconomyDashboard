<template>
  <div class="space-y-6 bg-gray-50 min-h-screen dark:bg-gray-700">
    <!-- Chart Section -->
    <div class="max-w-4xl mx-auto" v-if="chartData.length > 0">
      <div class="rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <!-- Chart Header -->
        <div class="px-6 py-4 border-b border-gray-200 dark:bg-gray-800">
          <div class="flex items-center">
            <div class="w-1/3">
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2"
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
                class="custom-select w-full dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                hide-details
              >
                <template v-slot:append-inner>
                  <svg
                    class="w-5 h-5 text-gray-500"
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
                    class="px-4 py-2 dark:bg-gray-800 dark:text-gray-200"
                  >
                    <div class="w-full">
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
                        class="search-field dark:bg-gray-900 dark:text-gray-200"
                      />
                    </div>
                  </v-list-item>
                  <v-divider class="my-2" />
                </template>
              </v-select>
            </div>
          </div>
        </div>

        <!-- Chart -->
        <div class="chart-wrapper bg-white shadow-inner overflow-hidden">
          <LWChart :data="chartData" />
        </div>
      </div>

      <!-- Price Change Cards -->
      <div class="w-full flex justify-center mt-8">
        <div class="max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <!-- Current Price Card -->
          <div v-if="latestValue" class="flex justify-center">
            <div class="w-full max-w-md">
              <div
                class="rounded-lg shadow-sm border border-gray-200 p-3 flex flex-col min-h-32 dark:bg-gray-800 dark:border-gray-800"
              >
                <div class="text-base text-gray-700 dark:text-gray-100 mb-2">
                  Current Price
                </div>
                <div
                  class="flex items-center text-xl font-bold py-2 text-gray-700 dark:text-gray-100"
                >
                  <span>{{ latestValue }} BC</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 1 Hour Price Change Card -->
          <div v-if="priceChange1h" class="flex justify-center">
            <div class="w-full max-w-md">
              <div
                class="rounded-lg shadow-sm border border-gray-200 p-3 flex flex-col min-h-32 dark:bg-gray-800 dark:border-gray-800"
              >
                <div class="text-base text-gray-700 dark:text-gray-100 mb-2">
                  Price Change <i>(Last hour)</i>
                </div>
                <div
                  class="flex items-center text-xl font-semibold py-2"
                  :class="priceChange1hColorClass"
                >
                  <span class="mr-3">
                    <!-- Up Arrow -->
                    <svg
                      v-if="priceChange1hIcon === 1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="h-6 w-6 inline"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                    <!-- Down Arrow -->
                    <svg
                      v-else-if="priceChange1hIcon === -1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="h-6 w-6 inline"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    <!-- Neutral -->
                    <span v-else class="text-gray-400 text-xl font-bold"
                      >=</span
                    >
                  </span>
                  {{ priceChange1h.value }} BC<br />
                  ({{ priceChange1h.percent }})
                </div>
              </div>
            </div>
          </div>

          <!-- 24 Hour Price Change Card -->
          <div v-if="priceChange24h" class="flex justify-center">
            <div class="w-full max-w-md">
              <div
                class="rounded-lg shadow-sm border border-gray-200 p-3 flex flex-col min-h-32 dark:bg-gray-800 dark:border-gray-800"
              >
                <div class="text-base text-gray-700 dark:text-gray-100 mb-2">
                  Price Change <i>(Last day)</i>
                </div>
                <div
                  class="flex items-center text-xl font-semibold py-2"
                  :class="priceChange24hColorClass"
                >
                  <span class="mr-3">
                    <!-- Up Arrow -->
                    <svg
                      v-if="priceChange24hIcon === 1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="h-6 w-6 inline"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                    <!-- Down Arrow -->
                    <svg
                      v-else-if="priceChange24hIcon === -1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="h-6 w-6 inline"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    <!-- Neutral -->
                    <span v-else class="text-gray-400 text-xl font-bold"
                      >=</span
                    >
                  </span>
                  {{ priceChange24h.value }} BC<br />
                  ({{ priceChange24h.percent }})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LWChart from "../components/LWChart.vue";
import { market } from "../composables/market.js";
import { items } from "../composables/items.js";
import { ref, onMounted, watch, computed } from "vue";

const chartData = ref([]);
const itemsList = ref([]);
const selectedItemId = ref(null);
const searchTerm = ref("");
const searchField = ref(null);

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

const latestValue = computed(() => {
  if (chartData.value.length === 0) return null;
  return chartData.value[chartData.value.length - 1]?.value?.toLocaleString(
    "en-US"
  );
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
      ? "text-green-600"
      : value.startsWith("-")
        ? "text-red-600"
        : "text-gray-600";
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

watch(selectedItemId, async (newItemId) => {
  await updateChartData(newItemId);
});
</script>
