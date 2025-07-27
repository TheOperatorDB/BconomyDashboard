<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Items</h1>
        <p class="text-gray-600 mt-1">
          View and manage Bconomy items
        </p>
      </div>
      <button
        @click="refreshData"
        :disabled="loading.items"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg v-if="loading.items" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ loading.items ? 'Refreshing...' : 'Refresh' }}
      </button>
    </div>

    <!-- Error Alert -->
    <div v-if="error.items" class="bg-red-50 border border-red-200 rounded-md p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Error loading items data</h3>
          <div class="mt-2 text-sm text-red-700">
            <p>{{ error.items }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading.items" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>

    <!-- Items Data -->
    <div v-if="!loading.items && Array.isArray(itemsList) && itemsList.length > 0 && !error.items" class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b">
        <h3 class="text-lg font-semibold text-gray-900">Items List</h3>
        <p class="text-sm text-gray-600 mt-1">{{ itemsList.length }} items available</p>
      </div>
      
      <div class="divide-y divide-gray-200">
        <div 
          v-for="item in itemsList" 
          :key="item.id" 
          class="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span class="text-green-600 text-lg">{{ getItemEmoji(item.emoji) }}</span>
                </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center space-x-2">
                  <h4 class="text-sm font-medium text-gray-900 truncate">
                    {{ item.name || `Item #${item.id}` }}
                  </h4>
                  <span class="text-xs text-gray-500">#{{ item.id }}</span>
                </div>
                <div class="flex items-center space-x-4 mt-1">
                  <span v-if="item.cost" class="text-xs text-gray-600">
                    Cost: {{ formatNumber(item.cost) }}
                  </span>
                  <span v-if="item.type" class="text-xs text-gray-600 capitalize">
                    {{ item.type }}
                  </span>
                  <span v-if="item.category" class="text-xs text-gray-600 capitalize">
                    {{ item.category }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="flex items-center space-x-2">
              <span v-if="item.rarity" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {{ item.rarity }}
              </span>
              <span v-if="item.uncraftable" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Uncraftable
              </span>
            </div>
          </div>
          
          <!-- Loot Sources -->
          <div v-if="item.lootSources && item.lootSources.length > 0" class="mt-2">
            <div class="flex items-center space-x-2">
              <span class="text-xs text-gray-500">Sources:</span>
              <div class="flex flex-wrap gap-1">
                <span 
                  v-for="source in item.lootSources" 
                  :key="source"
                  class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700"
                >
                  {{ getSourceName(source) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Data State -->
    <div v-if="!loading.items && (!Array.isArray(itemsList) || itemsList.length === 0) && !error.items" class="text-center py-12">
      <div class="text-gray-500">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No items available</h3>
        <p class="mt-1 text-sm text-gray-500">Try refreshing the data.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useBconomyDataStore } from '../stores/marketData'

const store = useBconomyDataStore()

// Computed property to ensure reactivity
import { computed } from 'vue'

const itemsList = computed(() => store.itemsData)

const { 
  itemsData, 
  loading, 
  error, 
  fetchAllItemsData 
} = store

const refreshData = () => {
  fetchAllItemsData()
}

const formatNumber = (num) => {
  if (!num) return '0'
  return new Intl.NumberFormat('en-US').format(num)
}

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toLocaleDateString()
}

const getItemEmoji = (emoji) => {
  if (emoji && emoji.startsWith('<:') && emoji.includes(':')) {
    return '📦'
  }

  if (emoji && emoji.length <= 4) {
    return emoji
  }

  return '📦'
}

const getSourceName = (source) => {
  if (source.startsWith('item')) {
    const itemId = parseInt(source.replace('item', ''))
    if (!isNaN(itemId)) {
      const item = itemsList.value.find(item => item.id === itemId)
    }
  }
  
  return source
}

onMounted(() => {
  fetchAllItemsData()
})

</script> 