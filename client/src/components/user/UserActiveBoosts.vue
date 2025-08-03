<template>
  <CollapsibleModule v-model:open="isBoostsOpen" title="🚀 Active Boosts">
    <div
      v-show="isBoostsOpen"
      class="transition-all bg-white duration-300 ease-in-out"
    >
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
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : row.action === 'Hunting'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : row.action === 'Exploring'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : row.action === 'Fishing'
                        ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200'
                        : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
              ]"
            >
              {{ row.action }}
            </span>
          </template>
          <template #multiplier="{ row }">
            <span
              :class="[
                row.multiplier === 2
                  ? 'text-purple-700 dark:text-purple-300'
                  : row.multiplier === 3
                    ? 'text-blue-700 dark:text-blue-300'
                    : row.multiplier === 5
                      ? 'text-red-700 dark:text-red-300'
                      : 'text-green-700 dark:text-green-300',
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
      <div
        v-else
        class="p-6 text-gray-500 dark:bg-gray-800 dark:text-gray-400 text-sm"
      >
        No active boosts.
      </div>
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
