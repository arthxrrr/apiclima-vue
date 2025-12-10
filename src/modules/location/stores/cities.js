import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loadRecentCities, addRecentCity as addToStorage, removeRecentCity as removeFromStorage } from '../../../shared/services/storage'
import { searchCities as searchCitiesAPI } from '../services/geocoding'

export const useCitiesStore = defineStore('cities', () => {
    const recentCities = ref([])
    const searchResults = ref([])
    const isSearching = ref(false)
    const currentCity = ref(null)

    function loadRecent() {
        recentCities.value = loadRecentCities()
    }

    function addRecentCity(city) {
        const updated = addToStorage(city)
        recentCities.value = updated
    }

    function removeRecentCity(city) {
        const updated = removeFromStorage(city)
        recentCities.value = updated
    }

    async function searchCities(query) {
        if (!query || query.trim().length < 2) {
            searchResults.value = []
            return
        }

        isSearching.value = true

        try {
            const results = await searchCitiesAPI(query)
            searchResults.value = results
        } catch (error) {
            console.error('Error searching cities:', error)
            searchResults.value = []
        } finally {
            isSearching.value = false
        }
    }

    function clearSearchResults() {
        searchResults.value = []
    }

    function setCurrentCity(city) {
        currentCity.value = city
        if (city) {
            addRecentCity(city)
        }
    }

    return {
        recentCities,
        searchResults,
        isSearching,
        currentCity,
        loadRecent,
        addRecentCity,
        removeRecentCity,
        searchCities,
        clearSearchResults,
        setCurrentCity
    }
})
