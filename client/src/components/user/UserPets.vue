<template>
  <CollapsibleModule
    v-model:open="isPetsOpen"
    title="🦄 Pets"
    headerBg="bg-gradient-to-r from-orange-50 to-yellow-50"
    class="bg-white shadow rounded-lg overflow-hidden mt-6"
  >
    <div v-show="isPetsOpen" class="transition-all duration-300 ease-in-out">
      <div v-if="pets && pets.length > 0">
        <TableModule
          :columns="petColumns"
          :rows="pets"
          rowKey="id"
          @rowClick="handlePetRowClick"
          class="cursor-pointer"
        >
          <template #name="{ row }">
            <a>{{ row.name }}</a>
            <span v-if="row.id === buddyId" class="text-xs text-gray-500 ml-1"
              ><i>(Buddy)</i></span
            >
          </template>
          <template #adventureType="{ row }">
            <span
              v-if="row.adventureType"
              :class="[
                'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
                row.adventureType === 'Fishing'
                  ? 'bg-cyan-100 text-cyan-800'
                  : row.adventureType === 'Mining'
                    ? 'bg-yellow-100 text-yellow-800'
                    : row.adventureType === 'Hunting'
                      ? 'bg-green-100 text-green-800'
                      : row.adventureType === 'Exploring'
                        ? 'bg-blue-100 text-blue-800'
                        : row.adventureType === 'Resting'
                          ? 'bg-gray-200 text-gray-900'
                          : 'bg-gray-100 text-gray-800',
              ]"
            >
              {{ row.adventureType }}
            </span>
          </template>
          <template #skin="{ row }">
            <span
              v-if="row.skin"
              :class="[
                'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
                row.skin === 'Alpha'
                  ? 'bg-gray-200 text-gray-900'
                  : row.skin === 'Beta'
                    ? 'bg-blue-100 text-blue-800'
                    : row.skin === 'Gamma'
                      ? 'bg-green-100 text-green-800'
                      : row.skin === 'Delta'
                        ? 'bg-yellow-100 text-yellow-800'
                        : row.skin === 'Epsilon'
                          ? 'bg-purple-100 text-purple-800'
                          : row.skin === 'Zeta'
                            ? 'bg-pink-100 text-pink-800'
                            : row.skin === 'Eta'
                              ? 'bg-orange-100 text-orange-800'
                              : row.skin === 'Sunkissed'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-gray-100 text-gray-800',
              ]"
            >
              {{ row.skin }}
            </span>
          </template>
          <template #aura="{ row }">
            <span
              v-if="row.aura"
              :class="[
                'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
                row.aura === 'Red'
                  ? 'bg-red-100 text-red-800'
                  : row.aura === 'Blue'
                    ? 'bg-blue-100 text-blue-800'
                    : row.aura === 'Green'
                      ? 'bg-green-100 text-green-800'
                      : row.aura === 'Yellow'
                        ? 'bg-yellow-100 text-yellow-800'
                        : row.aura === 'Purple'
                          ? 'bg-purple-100 text-purple-800'
                          : row.aura === 'Orange'
                            ? 'bg-orange-100 text-orange-800'
                            : row.aura === 'Cyan'
                              ? 'bg-cyan-100 text-cyan-800'
                              : row.aura === 'Pink'
                                ? 'bg-pink-100 text-pink-800'
                                : 'bg-gray-100 text-gray-800',
              ]"
            >
              {{ row.aura }}
            </span>
          </template>
        </TableModule>
      </div>
      <div v-else class="p-6 text-gray-500 text-sm">No pets found.</div>
    </div>
  </CollapsibleModule>
</template>

<script setup>
import { useRouter } from "vue-router";
import CollapsibleModule from "../CollapsibleModule.vue";
import TableModule from "../TableModule.vue";

const petColumns = [
  { key: "name", label: "NAME", sortable: true, filterable: true },
  { key: "tier", label: "TIER", sortable: true },
  { key: "species", label: "SPECIES", sortable: true, filterable: true },
  { key: "generation", label: "GENERATION", sortable: true },
  {
    key: "adventureType",
    label: "ADVENTURE TYPE",
    sortable: true,
    filterable: true,
    filterOptions: ["Fishing", "Mining", "Hunting", "Exploring", "Resting"],
  },
  {
    key: "skin",
    label: "SKIN",
    sortable: true,
    filterable: true,
    filterOptions: [
      "Alpha",
      "Beta",
      "Gamma",
      "Delta",
      "Epsilon",
      "Zeta",
      "Eta",
      "Sunkissed",
    ],
  },
  {
    key: "aura",
    label: "AURA",
    sortable: true,
    filterable: true,
    filterOptions: [
      "Red",
      "Blue",
      "Green",
      "Yellow",
      "Purple",
      "Orange",
      "Cyan",
      "Pink",
    ],
  },
];

const router = useRouter();

function handlePetRowClick(pet) {
  router.push(`/pets/${pet.id}`);
}

defineProps({ pets: Array, buddyId: Number });
</script>

<script>
export default {
  data() {
    return {
      isPetsOpen: false,
    };
  },
};
</script>
