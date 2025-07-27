<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Bconomy Overview</h1>
        <p class="text-gray-600 mt-1">
          Real-time game data and insights
        </p>
      </div>
      <button
        @click="refreshData"
        :disabled="isAnyLoading"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg v-if="isAnyLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ isAnyLoading ? 'Refreshing...' : 'Refresh Data' }}
      </button>
    </div>

    <!-- Error Alert -->
    <div v-if="hasAnyError" class="bg-red-50 border border-red-200 rounded-md p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Error loading data</h3>
          <div class="mt-2 text-sm text-red-700">
            <p v-if="error.items">Items: {{ error.items }}</p>
            <p v-if="error.users">Users: {{ error.users }}</p>
            <p v-if="error.market">Market: {{ error.market }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Pets Card -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                <span class="text-purple-600 text-lg">🐾</span>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Pets</dt>
                <dd class="text-lg font-medium text-gray-900">
                  Search by ID
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-5 py-3">
          <div class="text-sm">
            <router-link to="/pets" class="font-medium text-blue-600 hover:text-blue-500">
              View details →
            </router-link>
          </div>
        </div>
      </div>

      <!-- Items Card -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <span class="text-green-600 text-lg">🎒</span>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Items</dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ getItemsList.length }} loaded
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-5 py-3">
          <div class="text-sm">
            <router-link to="/items" class="font-medium text-blue-600 hover:text-blue-500">
              View details →
            </router-link>
          </div>
        </div>
      </div>

      <!-- Market Card -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                <span class="text-yellow-600 text-lg">💰</span>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Market</dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ Object.keys(marketData).length }} types
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-5 py-3">
          <div class="text-sm">
            <router-link to="/market" class="font-medium text-blue-600 hover:text-blue-500">
              View details →
            </router-link>
          </div>
        </div>
      </div>

      <!-- Users Card -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <span class="text-blue-600 text-lg">👥</span>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Users</dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ getUsersList.length }} loaded
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-5 py-3">
          <div class="text-sm">
            <router-link to="/users" class="font-medium text-blue-600 hover:text-blue-500">
              View details →
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Game Activity</h3>
        <div class="mt-5">
          <div v-if="lastUpdated" class="text-sm text-gray-500">
            Last updated: {{ formatDate(lastUpdated) }}
          </div>
          <div v-else class="text-sm text-gray-500">
            No data available
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
const store = useBconomyDataStore()

const { 
  marketData, 
  error, 
  lastUpdated,
  isAnyLoading,
  hasAnyError,
  getItemsList,
  getUsersList,
  fetchAllData 
} = useBconomyDataStore()

const refreshData = () => {
  fetchAllData()
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString()
}

onMounted(() => {
  fetchAllData()
})
</script> 