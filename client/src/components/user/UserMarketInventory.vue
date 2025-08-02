<template>
  <CollapsibleModule
    v-model:open="isMarketInventoryOpen"
    title="⚖️ Market Inventory"
    headerBg="bg-gradient-to-r from-purple-50 to-pink-50"
    class="bg-white shadow rounded-lg overflow-hidden mt-6"
  >
    <div
      v-show="isMarketInventoryOpen"
      class="transition-all duration-300 ease-in-out"
    >
      <TableModule
        :columns="marketColumns"
        :rows="marketInventory || []"
        rowKey="itemId"
      >
        <template #itemName="{ row }">
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
            <span v-else class="text-green-600 text-lg">{{
              getItemEmoji(row.emoji)
            }}</span>
            <div class="pl-3 text-xs text-gray-900 font-medium">
              {{ row.itemName || `Item #${row.itemId}` }}
            </div>
          </div>
        </template>
        <template #totalMarketValue="{ row }">
          <div
            class="gap-2 flex items-center text-xs font-medium text-gray-700"
          >
            {{ row.totalMarketValue }} BC
          </div>
        </template>
      </TableModule>
    </div>
  </CollapsibleModule>
</template>

<script setup>
import CollapsibleModule from "../CollapsibleModule.vue";
import TableModule from "../TableModule.vue";

const marketColumns = [
  { key: "itemId", label: "ID", sortable: true },
  { key: "itemName", label: "NAME", sortable: true, filterable: true },
  {
    key: "quantity",
    label: "INVENTORY QUANTITY",
  },
  {
    key: "marketQuantity",
    label: "MARKET LISTINGS",
  },
  {
    key: "totalMarketValue",
    label: "TOTAL MARKET VALUE",
  },
];

defineProps({ marketInventory: Array });
</script>

<script>
export default {
  data() {
    return {
      isMarketInventoryOpen: false,
    };
  },
};
</script>
