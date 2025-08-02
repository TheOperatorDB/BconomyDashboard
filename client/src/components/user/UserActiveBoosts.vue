<template>
  <CollapsibleModule
    v-model:open="isBoostsOpen"
    title="🚀 Active Boosts"
    headerBg="bg-gradient-to-r from-red-50 to-orange-50"
    class="bg-white shadow rounded-lg overflow-hidden mt-6"
  >
    <div v-show="isBoostsOpen" class="transition-all duration-300 ease-in-out">
      <div v-if="activeBoosts && activeBoosts.length > 0">
        <TableModule
          :columns="boostColumns"
          :rows="activeBoosts"
          rowKey="title"
        >
          <template #action="{ row }">
            <span
              v-if="row.action"
              :class="[
                'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
                row.action === 'Mining'
                  ? 'bg-yellow-100 text-yellow-800'
                  : row.action === 'Hunting'
                    ? 'bg-green-100 text-green-800'
                    : row.action === 'Exploring'
                      ? 'bg-blue-100 text-blue-800'
                      : row.action === 'Fishing'
                        ? 'bg-cyan-100 text-cyan-800'
                        : 'bg-orange-100 text-orange-800',
              ]"
            >
              {{ row.action }}
            </span>
          </template>
          <template #multiplier="{ row }">
            <span
              :class="[
                row.multiplier === 2
                  ? 'text-purple-700'
                  : row.multiplier === 3
                    ? 'text-blue-700'
                    : row.multiplier === 5
                      ? 'text-red-700'
                      : 'text-green-700',
              ]"
            >
              x{{ row.multiplier }}
            </span>
          </template>
          <template #endTime="{ row }">
            <span v-if="row.endTime">{{ row.endTime }}</span>
          </template>
        </TableModule>
      </div>
      <div v-else class="p-6 text-gray-500 text-sm">No active boosts.</div>
    </div>
  </CollapsibleModule>
</template>

<script setup>
import CollapsibleModule from "../CollapsibleModule.vue";
import TableModule from "../TableModule.vue";

const boostColumns = [
  { key: "title", label: "TITLE", sortable: true },
  { key: "action", label: "ACTION", sortable: true },
  { key: "multiplier", label: "MULTIPLIER", sortable: true },
  { key: "endTime", label: "ENDS IN", sortable: true },
];

defineProps({ activeBoosts: Array });
</script>

<script>
export default {
  data() {
    return {
      isBoostsOpen: false,
    };
  },
};
</script>
