<template>
  <CollapsibleModule
    v-model:open="isPerksOpen"
    title="⭐ Perks"
    headerBg="bg-gradient-to-r from-gray-50 to-blue-100 dark:from-gray-900  dark:to-blue-900"
  >
    <div class="bg-white">
      <div v-if="perks && perks.length > 0">
        <TableModule :columns="perksColumns" :rows="perks" rowKey="title">
          <template #level="{ row }">
            <div class="min-w-56 flex flex-col items-start">
              <div
                class="w-full min-w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
              >
                <div
                  class="h-3 rounded-full"
                  :style="{
                    width: (row.level / (row.maxLevel || 1)) * 100 + '%',
                    background:
                      row.level === row.maxLevel
                        ? $attrs['class'] && $attrs['class'].includes('dark')
                          ? '#c4b5fd'
                          : '#a78bfa'
                        : $attrs['class'] && $attrs['class'].includes('dark')
                          ? '#818cf8'
                          : '#6366f1',
                    transition: 'width 0.3s',
                  }"
                ></div>
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {{ row.level }} / {{ row.maxLevel }}
              </div>
            </div>
          </template>
          <template #description="{ row }">
            {{ row.description }}
          </template>
        </TableModule>
      </div>
      <div
        v-else
        class="p-6 text-gray-500 dark:bg-gray-800 dark:text-gray-400 text-sm"
      >
        No perks available.
      </div>
    </div>
  </CollapsibleModule>
</template>

<script setup>
import CollapsibleModule from "../CollapsibleModule.vue";
import TableModule from "../TableModule.vue";

const perksColumns = [
  { key: "title", label: "TITLE", sortable: true },
  { key: "level", label: "LEVEL" },
  { key: "description", label: "DESCRIPTION" },
];

defineProps({ perks: Array });
</script>

<script>
export default {
  data() {
    return {
      isPerksOpen: false,
    };
  },
};
</script>
