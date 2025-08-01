<template>
  <div class="space-y-6">
    <div class="bg-white shadow rounded-lg p-6">
      <div class="flex items-center space-x-4">
        <div class="flex-1">
          <label
            for="user-id"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Search a user
          </label>
          <input
            id="user-id"
            v-model="userId"
            type="number"
            placeholder="Enter user ID and press Enter"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            @keyup.enter="searchUserById"
          />
        </div>
      </div>
    </div>

    <!-- Error -->
    <div
      v-if="usersError"
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
            Error loading user data
          </h3>
          <div class="mt-2 text-sm text-red-700">
            <p>{{ usersError }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="usersLoading" class="flex justify-center items-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"
      ></div>
    </div>

    <!-- Empty -->
    <div
      v-if="!userProfile && !usersLoading && !usersError"
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">
          Search for a user
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Enter a user ID above and press Enter to view its details.
        </p>
      </div>
    </div>
  </div>

  <!-- Loaded -->
  <div v-if="userProfile && !usersError && !usersLoading">
    <!-- User profile card -->
    <div class="bg-white shadow rounded-lg overflow-hidden mt-6">
      <div class="p-2 bg-gradient-to-r from-purple-50 to-pink-50">
        <div class="flex justify-between">
          <div class="ml-4 flex">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">
                <template v-if="userProfile.profile.factionTag">
                  [{{ userProfile.profile.factionTag }}]
                </template>
                <template v-if="userProfile.profile.title">
                  <i v-tooltip="userProfile.profile.title.desc">{{
                    userProfile.profile.title.title
                  }}</i>
                </template>
                {{ userProfile.profile.name }}
              </h3>
              <p class="text-sm text-gray-600">#{{ userProfile.profile.id }}</p>
            </div>
          </div>
          <div class="text-right">
            <span
              class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-dark-green-800"
            >
              {{ userProfile.profile.rank.emoji }}
              {{ userProfile.profile.rank.title }}
            </span>
            <span
              class="inline-flex ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
            >
              🌟 {{ userProfile.profile.tier }}
            </span>
          </div>
        </div>
      </div>
      <div class="m-6">
        <div class="py-4 space-y-4">
          <div class="grid grid-cols-3 gap-4 text-sm">
            <div>
              <dt class="font-medium text-gray-900">
                Bconomy Coins <i>(BC)</i>
              </dt>
              <dd class="text-gray-500 capitalize">
                {{ userProfile.profile.bc }}
              </dd>
            </div>
            <div>
              <dt class="font-medium text-gray-900">
                Supporter Points <i>(SP)</i>
              </dt>
              <dd class="text-gray-500">{{ userProfile.profile.sp }}</dd>
            </div>
            <div>
              <dt class="font-medium text-gray-900">
                Karmatic Reputation <i>(KR)</i>
              </dt>
              <dd class="text-gray-500">
                {{ userProfile.profile.kr ?? 0 }}
              </dd>
            </div>
          </div>
        </div>

        <div class="py-4 space-y-4 border-t">
          <div class="grid grid-cols-3 gap-4 text-sm">
            <div>
              <dt class="font-medium text-gray-900">Farm plots</dt>
              <dd class="text-gray-500 capitalize">
                {{
                  userProfile.profile.nbFarmPlots +
                  userProfile.profile.nbFarmPlotsExtra
                }}
                <i>({{ userProfile.profile.nbFarmPlotsExtra }} extra)</i>
              </dd>
            </div>
            <div>
              <dt class="font-medium text-gray-900">Generators</dt>
              <dd class="text-gray-500">
                {{
                  userProfile.profile.nbGenerators +
                  userProfile.profile.nbGeneratorsExtra
                }}
                <i>({{ userProfile.profile.nbGeneratorsExtra }} extra)</i>
              </dd>
            </div>
            <div>
              <dt class="font-medium text-gray-900">Stables</dt>
              <dd class="text-gray-500">
                {{
                  userProfile.profile.nbStables +
                  userProfile.profile.nbStablesExtra
                }}
                <i>({{ userProfile.profile.nbStablesExtra }} extra)</i>
              </dd>
            </div>
          </div>
        </div>

        <div class="py-4 space-y-4 border-t">
          <div class="grid grid-cols-4 gap-4 text-sm">
            <div>
              <dt class="font-medium text-gray-900">Fishing</dt>
              <dd class="text-gray-500 capitalize">
                {{
                  userProfile.profile.upgrades?.fish +
                  userProfile.profile.upgrades?.fishExtra
                }}
                <i
                  >({{ userProfile.profile.upgrades?.fishExtra || 0 }} extra)</i
                >
              </dd>
            </div>
            <div>
              <dt class="font-medium text-gray-900">Hunting</dt>
              <dd class="text-gray-500 capitalize">
                {{
                  userProfile.profile.upgrades?.hunt +
                  userProfile.profile.upgrades?.huntExtra
                }}
                <i
                  >({{ userProfile.profile.upgrades?.huntExtra || 0 }} extra)</i
                >
              </dd>
            </div>
            <div>
              <dt class="font-medium text-gray-900">Exploring</dt>
              <dd class="text-gray-500 capitalize">
                {{
                  userProfile.profile.upgrades?.explore +
                  userProfile.profile.upgrades?.exploreExtra
                }}
                <i
                  >({{
                    userProfile.profile.upgrades?.exploreExtra || 0
                  }}
                  extra)</i
                >
              </dd>
            </div>
            <div>
              <dt class="font-medium text-gray-900">Mining</dt>
              <dd class="text-gray-500 capitalize">
                {{
                  userProfile.profile.upgrades?.mine +
                  userProfile.profile.upgrades?.mineExtra
                }}
                <i
                  >({{ userProfile.profile.upgrades?.mineExtra || 0 }} extra)</i
                >
              </dd>
            </div>
          </div>
        </div>
        <div
          v-if="userProfile.profile.registrationDate"
          class="border-t pt-4 text-xs text-gray-500"
        >
          <div>
            Registration date:
            {{ formatDate(userProfile.profile.registrationDate) }}
            <i
              >({{
                timestampToDaysAgo(userProfile.profile.registrationDate)
              }}
              days ago)</i
            >
          </div>
        </div>
      </div>
    </div>

    <!-- User market inventory -->
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
          :rows="userProfile.marketInventory"
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
              <svg
                class="w-3 h-3 text-gray-400 inline-block"
                fill="none"
                viewBox="0 0 20 20"
                aria-hidden="true"
                v-tooltip="'Based on the current lowest listing price'"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="9"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="white"
                />
                <text
                  x="10"
                  y="14"
                  text-anchor="middle"
                  font-size="11"
                  font-family="Arial, Helvetica, sans-serif"
                  font-weight="bold"
                  fill="currentColor"
                >
                  ?
                </text>
              </svg>
            </div>
          </template>
        </TableModule>
      </div>
    </CollapsibleModule>

    <!-- Boosts -->
    <CollapsibleModule
      v-model:open="isBoostsOpen"
      title="🚀 Active Boosts"
      headerBg="bg-gradient-to-r from-red-50 to-orange-50"
      class="bg-white shadow rounded-lg overflow-hidden mt-6"
    >
      <div
        v-show="isBoostsOpen"
        class="transition-all duration-300 ease-in-out"
      >
        <div v-if="userProfile.effects && userProfile.effects.length > 0">
          <TableModule
            :columns="boostColumns"
            :rows="userProfile.effects"
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

    <!-- Pets -->
    <CollapsibleModule
      v-model:open="isPetsOpen"
      title="🦄 Pets"
      headerBg="bg-gradient-to-r from-orange-50 to-yellow-50"
      class="bg-white shadow rounded-lg overflow-hidden mt-6"
    >
      <div v-show="isPetsOpen" class="transition-all duration-300 ease-in-out">
        <div v-if="userProfile.pets && userProfile.pets.length > 0">
          <TableModule
            :columns="petColumns"
            :rows="userProfile.pets"
            rowKey="id"
            @rowClick="handlePetRowClick"
            class="cursor-pointer"
          >
            <template #name="{ row }">
              <a>{{ row.name }}</a>
              <span
                v-if="row.id === userProfile.profile.buddyId"
                class="text-xs text-gray-500 ml-1"
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

    <!-- User Perks -->
    <CollapsibleModule
      v-model:open="isPerksOpen"
      title="⭐ Perks"
      headerBg="bg-gradient-to-r from-yellow-50 to-green-50"
      class="bg-white shadow rounded-lg overflow-hidden mt-6"
    >
      <div v-if="userProfile.perks && userProfile.perks.length > 0">
        <TableModule
          :columns="perksColumns"
          :rows="userProfile.perks"
          rowKey="title"
        >
          <template #level="{ row }">
            <div class="min-w-56 flex flex-col items-start">
              <div
                class="w-full min-w-full h-3 bg-gray-200 rounded-full overflow-hidden"
              >
                <div
                  class="h-3 rounded-full"
                  :style="{
                    width: (row.level / (row.maxLevel || 1)) * 100 + '%',
                    background:
                      row.level === row.maxLevel ? '#a78bfa' : '#6366f1',
                    transition: 'width 0.3s',
                  }"
                ></div>
              </div>
              <div class="text-xs text-gray-500 mt-1">
                {{ row.level }} / {{ row.maxLevel }}
              </div>
            </div>
          </template>
          <template #description="{ row }">
            {{ row.description }}
          </template>
        </TableModule>
      </div>
      <div v-else class="p-6 text-gray-500 text-sm">No perks available.</div>
    </CollapsibleModule>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { users } from "../composables/users.js";
import { utils } from "../composables/utils.js";
import TableModule from "../components/TableModule.vue";
import CollapsibleModule from "../components/CollapsibleModule.vue";

const router = useRouter();
const route = useRoute();

const { formatDate, timestampToDaysAgo } = utils();
const userProfile = ref(null);
const userId = ref("");
const { usersLoading, usersError, searchUser } = users();

async function loadUserFromRoute() {
  const id = route.params.id;
  if (id) {
    userId.value = id;
    userProfile.value = await searchUser(id);
  } else {
    userProfile.value = null;
  }
}

onMounted(loadUserFromRoute);
watch(() => route.params.id, loadUserFromRoute);

async function searchUserById() {
  if (userId.value) {
    router.push(`/users/${userId.value}`);
  }
}

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

const boostColumns = [
  { key: "title", label: "TITLE", sortable: true },
  { key: "action", label: "ACTION", sortable: true },
  { key: "multiplier", label: "MULTIPLIER", sortable: true },
  { key: "endTime", label: "ENDS IN", sortable: true },
];

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

const perksColumns = [
  { key: "title", label: "TITLE", sortable: true },
  { key: "level", label: "LEVEL" },
  { key: "description", label: "DESCRIPTION" },
];

function handlePetRowClick(pet) {
  router.push(`/pets/${pet.id}`);
}
</script>

<script>
export default {
  data() {
    return {
      isBoostsOpen: false,
      isPerksOpen: false,
      isPetsOpen: false,
      isMarketInventoryOpen: false,
    };
  },
};
</script>
