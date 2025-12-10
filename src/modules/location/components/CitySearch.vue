<template>
  <div class="relative">
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar cidade..."
        class="input-field pl-10 pr-10"
        @input="handleSearch"
        @focus="showResults = true"
        @keydown.esc="clearSearch"
      />
      
      <svg
        class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    
    <transition name="fade">
      <div
        v-if="showResults && (searchResults.length > 0 || isSearching)"
        class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto z-50"
      >
        <div v-if="isSearching" class="p-4 text-center text-gray-500 dark:text-gray-400">
          <LoadingSpinner size="sm" />
        </div>
        
        <div v-else>
          <button
            v-for="city in searchResults"
            :key="city.id"
            @click="selectCity(city)"
            class="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0"
          >
            <p class="font-medium text-gray-900 dark:text-gray-100">
              {{ city.name }}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ city.admin1 ? `${city.admin1}, ` : '' }}{{ city.country }}
            </p>
          </button>
        </div>
      </div>
    </transition>
    
    <div
      v-if="showResults"
      @click="showResults = false"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCitiesStore } from '../stores/cities'
import { debounce } from '../services/geocoding'
import LoadingSpinner from '../../../shared/ui/LoadingSpinner.vue'

const router = useRouter()
const citiesStore = useCitiesStore()
const { searchResults, isSearching } = storeToRefs(citiesStore)

const searchQuery = ref('')
const showResults = ref(false)

const handleSearch = debounce(() => {
  if (searchQuery.value.trim().length >= 2) {
    citiesStore.searchCities(searchQuery.value)
    showResults.value = true
  } else {
    citiesStore.clearSearchResults()
  }
}, 300)

function selectCity(city) {
  citiesStore.setCurrentCity(city)
  router.push({
    name: 'city',
    params: {
      lat: city.latitude,
      lon: city.longitude
    },
    query: {
      name: city.name
    }
  })
  clearSearch()
}

function clearSearch() {
  searchQuery.value = ''
  showResults.value = false
  citiesStore.clearSearchResults()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
