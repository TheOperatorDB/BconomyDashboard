<template>
  <div class="space-y-6">
    <!-- Error -->
    <div
      v-if="itemsError"
      class="bg-red-50 border border-red-200 rounded-md p-4"
    >
      <div class="flex">
        <div class="flex-shrink-0">
          <svg
            class="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">
            Error loading items data
          </h3>
          <div class="mt-2 text-sm text-red-700">
            <p>{{ itemsError }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="itemsLoading" class="flex justify-center items-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"
      ></div>
    </div>

    <!-- Loaded -->
    <div
      v-if="itemsList?.length > 0 && !itemsError && !itemsLoading"
      class="bg-white shadow rounded-lg overflow-hidden"
    >
      <TableModule :columns="itemsColumns" :rows="itemsList" rowKey="id">
        <template #id="{ row }"> #{{ row.id }} </template>
        <template #name="{ row }">
          <div class="gap-2 flex items-center">
            <img
              v-if="row.imageUrl && row.imageUrl.endsWith('.webp')"
              :src="row.imageBase64"
              class="w-8 h-8 object-contain"
            />
            <img
              v-else-if="row.imageUrl && row.imageUrl.endsWith('.svg')"
              :src="row.imageUrl"
              class="w-8 h-8 object-contain"
            />
            <div class="text-xs text-gray-900 font-medium">
              {{ row.name || `Item #${row.id}` }}
            </div>
          </div>
        </template>
        <template #value="{ row }">
          <span v-if="row.cost">{{ row.cost }} BC</span>
        </template>
        <template #craftability="{ row }">
          <span
            v-if="row.uncraftable"
            class="px-2 py-1 rounded text-xs bg-red-100 text-red-800"
          >
            Uncraftable
          </span>
          <span
            v-else
            class="px-2 py-1 rounded text-xs bg-green-100 text-green-800"
          >
            Craftable
          </span>
        </template>
        <template #lootSources="{ row }">
          <div
            v-if="row.lootSources && row.lootSources.length > 0"
            class="flex flex-wrap gap-1"
          >
            <span
              v-for="source in row.lootSources"
              :key="source"
              :class="[
                'px-2 py-1 rounded text-xs',
                source === 'Mining'
                  ? 'bg-yellow-100 text-yellow-800'
                  : source === 'Hunting'
                    ? 'bg-green-100 text-green-800'
                    : source === 'Exploring'
                      ? 'bg-blue-100 text-blue-800'
                      : source === 'Fishing'
                        ? 'bg-cyan-100 text-cyan-800'
                        : 'bg-gray-100 text-gray-800',
              ]"
            >
              {{ source }}
            </span>
          </div>
        </template>
      </TableModule>
    </div>

    <div
      v-if="!itemsLoading && itemsList.value?.length && !itemsError"
      class="text-center py-12"
    >
      <div class="text-gray-500">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">
          No items available
        </h3>
        <p class="mt-1 text-sm text-gray-500">Try refreshing the data.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { items } from "../composables/items.js";
import TableModule from "../components/TableModule.vue";

const itemsList = ref([]);

const { fetchItems, itemsLoading, itemsError } = items();

let itemsColumns = [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Name", sortable: true, filterable: true },
  { key: "value", label: "Value" },
  {
    key: "craftability",
    label: "Craftability",
    sortable: true,
    filterable: true,
    filterOptions: ["Craftable", "Uncraftable"],
  },
  { key: "lootSources", label: "Sources", filterable: true },
];

onMounted(async () => {
  itemsList.value = await fetchItems();
});
</script>
