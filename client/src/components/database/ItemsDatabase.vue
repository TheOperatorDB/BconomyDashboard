<template>
  <CollapsibleModule
    title="📦 Items"
    headerBg="bg-gradient-to-r from-orange-50 to-yellow-50"
    class="bg-white shadow rounded-lg overflow-hidden mt-6"
  >
    <TableModule :columns="itemsColumns" :rows="items" rowKey="id">
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
  </CollapsibleModule>
</template>

<script setup>
import CollapsibleModule from "../CollapsibleModule.vue";
import TableModule from "../TableModule.vue";

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

defineProps({ items: Array });
</script>
