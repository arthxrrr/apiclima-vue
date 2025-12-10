<template>
  <div v-if="recentCities.length > 0" class="card animate-fade-in">
    <h3 class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
      Cidades Recentes
    </h3>
    
    <div class="flex flex-wrap gap-2">
      <button
        v-for="city in recentCities"
        :key="`${city.latitude}-${city.longitude}`"
        @click="selectCity(city)"
        class="group relative flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded-lg transition-all duration-200"
      >
        <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
        </svg>
        <span class="text-sm font-medium text-purple-900 dark:text-purple-100">
          {{ city.name }}
        </span>
        
        <span
          @click.stop="removeCity(city)"
          class="ml-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          <svg class="w-4 h-4 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCitiesStore } from '../stores/cities'

const router = useRouter()
const citiesStore = useCitiesStore()
const { recentCities } = storeToRefs(citiesStore)

function selectCity(city) {
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
}

function removeCity(city) {
  citiesStore.removeRecentCity(city)
}
</script>
