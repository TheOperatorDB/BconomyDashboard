<template>
  <div class="space-y-6 bg-gray-50 dark:bg-gray-700">
    <div
      class="dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-100 dark:border-gray-800"
    >
      <div class="flex items-center space-x-4">
        <div class="flex-1">
          <label
            for="pet-id"
            class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
          >
            Search a pet
          </label>
          <input
            id="pet-id"
            v-model="petId"
            type="number"
            placeholder="Enter pet ID and press Enter"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            @keyup.enter="searchPetById"
          />
        </div>
      </div>
    </div>

    <!-- Error -->
    <div
      v-if="petsError"
      class="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-md p-4"
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
          <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
            Error loading pet data
          </h3>
          <div class="mt-2 text-sm text-red-700 dark:text-red-300">
            <p>{{ petsError }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="petsLoading" class="flex justify-center items-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 dark:border-purple-400"
      ></div>
    </div>

    <!-- Loaded -->
    <div
      v-if="currentPet && !petsLoading && !itemsLoading"
      class="dark:bg-gray-900 shadow rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800"
    >
      <div
        class="p-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="ml-4">
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                {{ currentPet.name }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                #{{ currentPet.id }}
              </p>
            </div>
          </div>
          <div class="text-right">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
            >
              Tier {{ currentPet.tier }}
            </span>
          </div>
        </div>
      </div>

      <div class="px-6 py-4 space-y-4">
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt class="font-medium text-gray-900 dark:text-gray-100">
              Species
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 capitalize">
              {{ currentPet.species }}
            </dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900 dark:text-gray-100">
              Generation
            </dt>
            <dd class="text-gray-500 dark:text-gray-400">
              {{ currentPet.generation }}
            </dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900 dark:text-gray-100">XP</dt>
            <dd class="text-gray-500 dark:text-gray-400">
              {{ currentPet.xp ?? 0 }}
            </dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900 dark:text-gray-100">
              Times Bred
            </dt>
            <dd class="text-gray-500 dark:text-gray-400">
              {{ currentPet.timesBred }}
            </dd>
          </div>
        </div>

        <div class="border-t border-gray-100 dark:border-gray-800 pt-4">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt class="font-medium text-gray-900 dark:text-gray-100">
                Adventure type
              </dt>
              <dd class="text-gray-500 dark:text-gray-400 capitalize">
                {{ currentPet.adventureType ?? "Resting" }}
              </dd>
            </div>
            <div>
              <dt class="font-medium text-gray-900 dark:text-gray-100">
                Items Found
              </dt>
              <dd class="text-gray-500 dark:text-gray-400">
                {{ currentPet.lifetimeItemsFound ?? "0" }}
              </dd>
            </div>
            <div v-if="currentPet.adventureBoost">
              <dt class="font-medium text-gray-900 dark:text-gray-100">
                Adventure boost
              </dt>
              <dd class="text-gray-500 dark:text-gray-400">
                <span
                  class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200"
                >
                  x{{ currentPet.adventureBoost.multiplier }} for
                  {{
                    timestampToDaysAgo(currentPet.adventureBoost.endTime) === 0
                      ? "less than 1 day"
                      : `${timestampToDaysAgo(currentPet.adventureBoost.endTime)} days`
                  }}
                </span>
              </dd>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-100 dark:border-gray-800 pt-4">
          <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Heritage
          </h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-if="currentPet.skin"
              class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
            >
              {{
                currentPet.skin.charAt(0).toUpperCase() +
                currentPet.skin.slice(1)
              }}
              skin
            </span>
            <span
              v-if="currentPet.aura"
              class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
            >
              {{
                currentPet.aura.charAt(0).toUpperCase() +
                currentPet.aura.slice(1)
              }}
              aura
            </span>
            <span
              v-if="currentPet.craving"
              class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
            >
              Craving x{{ currentPet.craving.quantity }}
              {{ currentPet.craving.item }}
            </span>
          </div>
        </div>

        <div
          class="border-t border-gray-100 dark:border-gray-800 pt-4 text-xs text-gray-500 dark:text-gray-400"
        >
          <div>
            Hatched: {{ formatDate(currentPet.hatchDate) }}
            <i>({{ timestampToDaysAgo(currentPet.hatchDate) }} days ago)</i>
          </div>
          <div v-if="currentPet.lastBred">
            Last bred: {{ formatDate(currentPet.lastBred) }}
            <i>({{ timestampToDaysAgo(currentPet.lastBred) }} days ago)</i>
          </div>
          <div v-if="currentPet.lastAdventureSync">
            Last adventure: {{ formatDate(currentPet.lastAdventureSync) }}
            <i
              >({{ timestampToDaysAgo(currentPet.lastAdventureSync) }} days
              ago)</i
            >
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!currentPet && !petsLoading && !petsError"
      class="text-center py-12"
    >
      <div class="text-gray-500 dark:text-gray-400">
        <svg
          class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
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
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          Search for a pet
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Enter a pet ID above and press Enter to view its details.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { pets } from "../composables/pets.js";
import { utils } from "../composables/utils.js";

const router = useRouter();
const route = useRoute();

const currentPet = ref(null);
const petId = ref("");

const { petsLoading, petsError, searchPet } = pets();
const { formatDate, timestampToDaysAgo } = utils();

async function loadPetFromRoute() {
  const id = route.params.id;
  if (id) {
    petId.value = id;
    currentPet.value = await searchPet(id);
  } else {
    currentPet.value = null;
  }
}

onMounted(loadPetFromRoute);
watch(() => route.params.id, loadPetFromRoute);

async function searchPetById() {
  if (petId.value) {
    router.push(`/pets/${petId.value}`);
  }
}
</script>
