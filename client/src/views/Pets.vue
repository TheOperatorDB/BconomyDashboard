<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Pets</h1>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg p-6">
      <div class="flex items-center space-x-4">
        <div class="flex-1">
          <label for="pet-id" class="block text-sm font-medium text-gray-700 mb-2">
            Pet ID
          </label>
          <input
            id="pet-id"
            v-model="searchPetId"
            type="number"
            placeholder="Enter pet ID and press Enter (e.g., 1)"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            @keyup.enter="searchPet"
          />
        </div>
      </div>
    </div>

    <div v-if="error.pets" class="bg-red-50 border border-red-200 rounded-md p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Error loading pet data</h3>
          <div class="mt-2 text-sm text-red-700">
            <p>{{ error.pets }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading.pets" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>

    <div v-if="currentPet && !loading.pets && !loading.items" class="bg-white shadow rounded-lg overflow-hidden">
      <div class="p-2 bg-gradient-to-r from-purple-50 to-pink-50">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">{{ currentPet.name }}</h3>
              <p class="text-sm text-gray-600">ID: {{ currentPet.id }}</p>
            </div>
          </div>
          <div class="text-right">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Tier {{ currentPet.tier }}
            </span>
          </div>
        </div>
      </div>

      <div class="px-6 py-4 space-y-4">
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt class="text-gray-500">Species</dt>
            <dd class="font-medium text-gray-900 capitalize">{{ currentPet.species }}</dd>
          </div>
          <div>
            <dt class="text-gray-500">Generation</dt>
            <dd class="font-medium text-gray-900">{{ currentPet.generation }}</dd>
          </div>
          <div>
            <dt class="text-gray-500">XP</dt>
            <dd class="font-medium text-gray-900">{{ formatNumber(currentPet.xp) }}</dd>
          </div>
          <div>
            <dt class="text-gray-500">Times Bred</dt>
            <dd class="font-medium text-gray-900">{{ currentPet.timesBred }}</dd>
          </div>
        </div>

        <div class="border-t pt-4">
          <h4 class="text-sm font-medium text-gray-900 mb-2">Adventure</h4>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt class="text-gray-500">Type</dt>
              <dd class="font-medium text-gray-900 capitalize">{{ currentPet.adventureType }}</dd>
            </div>
            <div>
              <dt class="text-gray-500">Items Found</dt>
              <dd class="font-medium text-gray-900">{{ formatNumber(currentPet.lifetimeItemsFound) }}</dd>
            </div>
          </div>
        </div>

        <div class="border-t pt-4">
          <h4 class="text-sm font-medium text-gray-900 mb-2">Status</h4>
          <div class="flex flex-wrap gap-2">
            <span v-if="currentPet.skin" class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
              {{ currentPet.skin.charAt(0).toUpperCase() + currentPet.skin.slice(1) }} skin
            </span>
            <span v-if="currentPet.aura" class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
              {{ currentPet.aura.charAt(0).toUpperCase() + currentPet.aura.slice(1) }} aura
            </span>
            <span v-if="currentPet.craving" class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
              Craving x{{ currentPet.craving.amount }} {{ getItemName(currentPet.craving.itemId) }}
            </span>
          </div>
        </div>

        <div class="border-t pt-4 text-xs text-gray-500">
          <div>Hatched: {{ formatDate(currentPet.hatchDate) }}</div>
          <div v-if="currentPet.lastBred">Last bred: {{ formatDate(currentPet.lastBred) }}</div>
          <div v-if="currentPet.lastAdventureSync">Last adventure: {{ formatDate(currentPet.lastAdventureSync) }}</div>
        </div>
      </div>
    </div>

    <div v-if="!currentPet && !loading.pets && !error.pets" class="text-center py-12">
      <div class="text-gray-500">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Search for a pet</h3>
        <p class="mt-1 text-sm text-gray-500">Enter a pet ID above and press Enter to view its details.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'

const searchPetId = ref('')
const currentPet = ref(null)
const itemsData = ref([])
const loading = reactive({ pets: false, items: false })
const error = reactive({ pets: '', items: '' })


const searchPet = async () => {
  if (!searchPetId.value) return

  const petId = parseInt(searchPetId.value)
  if (isNaN(petId)) {
    alert('Please enter a valid pet ID number')
    return
  }

  await Promise.all([
    fetchPetData(petId),
    fetchAllItemsData()
  ])
}

const fetchPetData = async (petId) => {
  loading.pets = true
  error.pets = ''

  try {
    const response = await axios.get(`/api/pets/${petId}`)
    currentPet.value = response.data.data 
  } catch (error) {
    error.pets = error.response?.data?.error || 'Failed to fetch pet data'
    currentPet.value = null
  } finally {
    loading.pets = false
  }
}


const fetchAllItemsData = async () => {
  if (itemsData.value.length > 0) return;

  loading.items = true
  error.items = ''
  
  try {
    const response = await axios.get(`/api/items`)
    itemsData.value = response.data.data
    lastUpdated = new Date().toISOString()
  } catch (error) {
    error.items = error.response?.data?.error || 'Failed to fetch items data'
  } finally {
    loading.items = false
  }
}

const getItemName = (itemId) => {
  const item = itemsData.value.find(item => item.id === itemId)
  return item ? item.name : `Item #${itemId}`
}

const formatNumber = (num) => {
  if (!num) return '0'
  return new Intl.NumberFormat('en-US').format(num)
}

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toLocaleDateString()
}
</script> 