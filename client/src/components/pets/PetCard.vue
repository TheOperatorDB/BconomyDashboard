<template>
  <div
    class="bg-card-light dark:bg-card-dark shadow rounded-lg overflow-hidden border border-table-border-light dark:border-table-border-dark"
  >
    <div
      class="p-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-900"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="ml-4">
            <h3
              class="text-lg font-semibold text-content-primary-light dark:text-content-primary-dark"
            >
              {{ pet.name }}
            </h3>
            <div class="flex items-center gap-2">
              <p
                class="text-sm text-content-secondary-light dark:text-content-secondary-dark"
              >
                #{{ pet.id }}
              </p>
              <span v-if="pet.owner" class="text-sm">
                •
                <a
                  @click.prevent="onOwnerClick(pet.owner.id)"
                  href="#"
                  class="inline-flex items-center ml-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                >
                  <svg
                    class="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z"
                    />
                  </svg>
                  {{ pet.owner.name }}
                </a>
              </span>
              <span v-else> 🕊️ Released </span>
            </div>
          </div>
        </div>
        <div class="text-right">
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-badge-purple-light dark:text-badge-purple-dark"
          >
            Tier {{ pet.tier }}
          </span>
        </div>
      </div>
    </div>

    <div class="px-6 py-4 space-y-4">
      <div class="grid grid-cols-3 gap-4 text-sm">
        <div>
          <dt class="font-medium text-gray-900 dark:text-gray-100">Species</dt>
          <dd class="text-gray-500 dark:text-gray-400 capitalize">
            {{ pet.species }}
          </dd>
        </div>
        <div>
          <dt class="font-medium text-gray-900 dark:text-gray-100">
            Generation
          </dt>
          <dd class="text-gray-500 dark:text-gray-400">
            {{ pet.generation }}
          </dd>
        </div>
        <div>
          <dt class="font-medium text-gray-900 dark:text-gray-100">XP</dt>
          <dd class="text-gray-500 dark:text-gray-400 flex items-center gap-2">
            {{ pet.xp ?? 0 }}
          </dd>
        </div>
      </div>
      <div class="border-t border-gray-100 dark:border-gray-800 pt-4">
        <div>
          <dt class="font-medium text-gray-900 dark:text-gray-100">
            Times Bred
          </dt>
          <dd class="text-gray-500 dark:text-gray-400">
            {{ pet.timesBred }}
          </dd>
        </div>
      </div>

      <div class="border-t border-gray-100 dark:border-gray-800 pt-4">
        <div class="grid grid-cols-3 gap-4 text-sm">
          <div>
            <dt class="font-medium text-gray-900 dark:text-gray-100">
              Adventure type
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 capitalize">
              {{ pet.adventureType ?? "Resting" }}
            </dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900 dark:text-gray-100">
              Items Found
            </dt>
            <dd class="text-gray-500 dark:text-gray-400">
              {{ pet.lifetimeItemsFound ?? "0" }}
            </dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900 dark:text-gray-100">
              Adventure boost
            </dt>
            <dd class="text-gray-500 dark:text-gray-400">
              <span
                class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 dark:bg-orange-900 text-badge-orange-light dark:text-badge-orange-dark"
                v-if="pet.adventureBoost && pet.adventureBoost.endTime"
              >
                x{{ pet.adventureBoost.multiplier }} for
                {{
                  timestampToDaysAgo(pet.adventureBoost.endTime) === 0
                    ? "less than 1 day"
                    : `${timestampToDaysAgo(pet.adventureBoost.endTime)} days`
                }}
              </span>
              <span v-else class="text-gray-500 dark:text-gray-400">
                No active boost
              </span>
            </dd>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-100 dark:border-gray-800 pt-4">
        <div class="grid grid-cols-3 gap-4">
          <div v-if="pet.skin || pet.aura">
            <h4
              class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
            >
              Heritage
            </h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-if="pet.skin"
                class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900 text-badge-blue-light dark:text-badge-blue-dark"
              >
                {{ pet.skin.charAt(0).toUpperCase() + pet.skin.slice(1) }}
                skin
              </span>
              <span
                v-if="pet.aura"
                class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 dark:bg-green-900 text-badge-green-light dark:text-badge-green-dark"
              >
                {{ pet.aura.charAt(0).toUpperCase() + pet.aura.slice(1) }}
                aura
              </span>
            </div>
          </div>
          <div v-if="pet.craving">
            <h4
              class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
            >
              Cravings
            </h4>
            <div class="flex flex-wrap gap-2">
              <span
                class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-badge-yellow-light dark:text-badge-yellow-dark"
              >
                x{{ pet.craving.quantity }}
                {{ pet.craving.item }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        class="border-t border-gray-100 dark:border-gray-800 pt-4 text-xs text-gray-500 dark:text-gray-400"
      >
        <div>
          Hatched: {{ formatDate(pet.hatchDate) }}
          <i>({{ timestampToDaysAgo(pet.hatchDate) }} days ago)</i>
        </div>
        <div v-if="pet.lastBred">
          Last bred: {{ formatDate(pet.lastBred) }}
          <i>({{ timestampToDaysAgo(pet.lastBred) }} days ago)</i>
        </div>
        <div v-if="pet.lastAdventureSync">
          Last adventure: {{ formatDate(pet.lastAdventureSync) }}
          <i>({{ timestampToDaysAgo(pet.lastAdventureSync) }} days ago)</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { utils } from "../../composables/utils.js";

const props = defineProps({
  pet: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["ownerClick"]);

const { formatDate, timestampToDaysAgo } = utils();

function onOwnerClick(userId) {
  emit("ownerClick", userId);
}
</script>
