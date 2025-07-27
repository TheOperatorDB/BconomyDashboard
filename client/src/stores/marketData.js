import { defineStore } from 'pinia'
import axios from 'axios'

export const useBconomyDataStore = defineStore('bconomyData', {
  state: () => ({
    petsData: {},
    itemsData: {},
    usersData: {},
    marketData: {},
    adventuresData: {},
    loading: {
      pets: false,
      items: false,
      users: false,
      market: false,
      adventures: false
    },
    error: {
      pets: null,
      items: null,
      users: null,
      market: null,
      adventures: null
    },
    lastUpdated: null
  }),

  getters: {
    isAnyLoading: (state) => Object.values(state.loading).some(loading => loading),
    hasAnyError: (state) => Object.values(state.error).some(error => error !== null),
    
    // Pet-specific getters
    getPetById: (state) => (id) => state.petsData[id] || null,
    getPetsList: (state) => Object.values(state.petsData).filter(pet => !pet.error),
    
    // Item-specific getters
    getItemById: (state) => (id) => {
      if (Array.isArray(state.itemsData)) {
        return state.itemsData.find(item => item.id === id) || null
      }
      return state.itemsData[id] || null
    },
    getItemsList: (state) => {
      if (Array.isArray(state.itemsData)) {
        return state.itemsData
      }
      return Object.values(state.itemsData).filter(item => !item.error)
    },
    
    // User-specific getters
    getUserById: (state) => (id) => state.usersData[id] || null,
    getUsersList: (state) => Object.values(state.usersData).filter(user => !user.error)
  },

  actions: {
    async fetchPetData(petId) {
      this.loading.pets = true
      this.error.pets = null
      
      try {
        const response = await axios.get(`/api/pets/${petId}`)
        this.petsData[petId] = response.data.data
        this.lastUpdated = new Date().toISOString()
      } catch (error) {
        this.error.pets = error.response?.data?.error || 'Failed to fetch pet data'
        console.error('Error fetching pet data:', error)
      } finally {
        this.loading.pets = false
      }
    },

    async fetchItemData(itemId) {
      this.loading.items = true
      this.error.items = null
      
      try {
        const response = await axios.get(`/api/items/${itemId}`)
        this.itemsData[itemId] = response.data.data
        this.lastUpdated = new Date().toISOString()
      } catch (error) {
        this.error.items = error.response?.data?.error || 'Failed to fetch item data'
        console.error('Error fetching item data:', error)
      } finally {
        this.loading.items = false
      }
    },

    async fetchAllItemsData() {
      this.loading.items = true
      this.error.items = null
      
      try {
        const response = await axios.get(`/api/items`)
        this.itemsData = response.data.data
        this.lastUpdated = new Date().toISOString()
      } catch (error) {
        this.error.items = error.response?.data?.error || 'Failed to fetch items data'
        console.error('Error fetching items data:', error)
      } finally {
        this.loading.items = false
      }
    },

    async fetchUserData(userId) {
      this.loading.users = true
      this.error.users = null
      
      try {
        const response = await axios.get(`/api/users/${userId}`)
        this.usersData[userId] = response.data.data
        this.lastUpdated = new Date().toISOString()
      } catch (error) {
        this.error.users = error.response?.data?.error || 'Failed to fetch user data'
        console.error('Error fetching user data:', error)
      } finally {
        this.loading.users = false
      }
    },

    async fetchMarketData(type = 'pets') {
      this.loading.market = true
      this.error.market = null
      
      try {
        const response = await axios.get(`/api/market?type=${type}`)
        this.marketData[type] = response.data.data
        this.lastUpdated = new Date().toISOString()
      } catch (error) {
        this.error.market = error.response?.data?.error || 'Failed to fetch market data'
        console.error('Error fetching market data:', error)
      } finally {
        this.loading.market = false
      }
    },

    async fetchAdventureData(adventureId) {
      this.loading.adventures = true
      this.error.adventures = null
      
      try {
        const response = await axios.get(`/api/adventures/${adventureId}`)
        this.adventuresData[adventureId] = response.data.data
        this.lastUpdated = new Date().toISOString()
      } catch (error) {
        this.error.adventures = error.response?.data?.error || 'Failed to fetch adventure data'
        console.error('Error fetching adventure data:', error)
      } finally {
        this.loading.adventures = false
      }
    },

    async fetchAllData() {
      await Promise.all([
        this.fetchMarketData('pets'),
        this.fetchItemData(1),
        this.fetchUserData(1)
      ])
    },

    clearErrors() {
      this.error = {
        pets: null,
        items: null,
        users: null,
        market: null,
        adventures: null
      }
    }
  }
}) 