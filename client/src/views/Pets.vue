<template>
  <div class="space-y-6 dark:bg-surface-dark">
    <div
      class="bg-card-light dark:bg-card-dark shadow rounded-lg p-6 border border-table-border-light dark:border-table-border-dark"
    >
      <div class="flex items-center space-x-4">
        <div class="flex-1">
          <label
            for="pet-id"
            class="block text-sm font-medium text-content-primary-light dark:text-content-primary-dark mb-2"
          >
            Search a pet
          </label>
          <input
            id="pet-id"
            v-model="petId"
            type="number"
            placeholder="Enter pet ID"
            class="w-full px-3 py-2 border border-table-border-light dark:border-table-border-dark rounded-md dark:bg-surface-dark text-content-primary-light dark:text-content-primary-dark focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
    <div v-if="currentPet && !petsLoading && !petsLoading">
      <PetCard :pet="currentPet" @owner-click="goToOwner" />

      <PetOffsprings :offsprings="currentPet?.offsprings" />
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
import PetCard from "../components/pets/PetCard.vue";
import PetOffsprings from "../components/pets/PetOffsprings.vue";
import CollapsibleModule from "../components/CollapsibleModule.vue";

const router = useRouter();
const route = useRoute();

const currentPet = ref(null);
const petId = ref("");

const { petsLoading, petsError, searchPet } = pets();

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
function goToOwner(userId) {
  router.push(`/users/${userId}`);
}
</script>
