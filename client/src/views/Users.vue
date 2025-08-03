<template>
  <div class="space-y-6">
    <div
      class="dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-100 dark:border-gray-800"
    >
      <div class="flex items-center space-x-4">
        <div class="flex-1">
          <label
            for="user-id"
            class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
          >
            Search a user
          </label>
          <input
            id="user-id"
            v-model="userId"
            type="number"
            placeholder="Enter user ID"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            @keyup.enter="searchUserById"
          />
        </div>
      </div>
    </div>

    <!-- Error -->
    <div
      v-if="usersError"
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
            Error loading user data
          </h3>
          <div class="mt-2 text-sm text-red-700 dark:text-red-300">
            <p>{{ usersError }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="usersLoading" class="flex justify-center items-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 dark:border-purple-400"
      ></div>
    </div>

    <!-- Empty -->
    <div
      v-if="!userProfile && !usersLoading && !usersError"
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
          Search for a user
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Enter a user ID above and press Enter to view its details.
        </p>
      </div>
    </div>
  </div>

  <!-- Loaded -->
  <div v-if="userProfile && !usersError && !usersLoading">
    <UserProfileCard :profile="userProfile.profile" />
    <UserMarketInventory :marketInventory="userProfile.marketInventory" />
    <UserActiveBoosts :activeBoosts="userProfile.effects" />
    <UserPets
      :pets="userProfile.pets"
      :buddy-id="userProfile.profile.buddyId"
    />
    <UserPerks :perks="userProfile.perks" />
    <UserPetsCollection :pets="userProfile.pets" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { users } from "../composables/users.js";

import UserProfileCard from "../components/user/UserProfileCard.vue";
import UserMarketInventory from "../components/user/UserMarketInventory.vue";
import UserActiveBoosts from "../components/user/UserActiveBoosts.vue";
import UserPets from "../components/user/UserPets.vue";
import UserPerks from "../components/user/UserPerks.vue";
import UserPetsCollection from "../components/user/UserPetsCollection.vue";

const router = useRouter();
const route = useRoute();

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
</script>
