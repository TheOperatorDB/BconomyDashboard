<template>
  <div class="flex justify-center">
    <div class="w-full max-w-md">
      <div
        class="rounded-lg shadow-sm border dark:border-table-border-dark p-3 flex flex-col min-h-32 dark:bg-gray-800"
      >
        <div class="text-base dark:text-table-primary-dark mb-2">
          Price Change <i>({{ period }})</i>
        </div>
        <div
          class="flex items-center text-xl font-semibold py-2"
          :class="colorClass"
        >
          <span class="mr-3">
            <!-- Up Arrow -->
            <svg
              v-if="icon === 1"
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
              v-else-if="icon === -1"
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
            <span v-else class="text-gray-400 text-xl font-bold">=</span>
          </span>
          {{ priceChange?.value }} BC<br />
          ({{ priceChange?.percent }})
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  period: {
    type: String,
    required: true,
  },
  priceChange: {
    type: Object,
    required: true,
  },
  colorClass: {
    type: String,
    required: true,
  },
  icon: {
    type: Number,
    required: true,
  },
});
</script>
