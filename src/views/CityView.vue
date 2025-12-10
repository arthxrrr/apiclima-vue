<template>
  <div class="container mx-auto px-4 py-8 animate-fade-in">
    <div v-if="isLoading" class="flex justify-center items-center min-h-[60vh]">
      <LoadingSpinner size="lg" />
    </div>
    
    <ErrorMessage
      v-else-if="error"
      :message="error"
      :retry="true"
      @retry="loadCityWeather"
    />
    
    <div v-else-if="hasData" class="space-y-6">
      <!-- botão de voltar -->
      <button
        @click="$router.push('/')"
        class="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Voltar
      </button>
      
      <RecentCities />
      
      <CurrentWeather
        :weather="currentWeather"
        :city-name="cityName"
      />
      
      <WeatherDetails :weather="currentWeather" />
      <HourlyForecast :hourly="hourlyForecast" />
      <HourlyChart :hourly="hourlyForecast" />
      <WeeklyForecast :daily="dailyForecast" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useWeatherStore } from '../modules/weather/stores/weather'
import { useCitiesStore } from '../modules/location/stores/cities'

import LoadingSpinner from '../shared/ui/LoadingSpinner.vue'
import ErrorMessage from '../shared/ui/ErrorMessage.vue'
import RecentCities from '../modules/location/components/RecentCities.vue'
import CurrentWeather from '../modules/weather/components/CurrentWeather.vue'
import WeatherDetails from '../modules/weather/components/WeatherDetails.vue'
import HourlyForecast from '../modules/weather/components/HourlyForecast.vue'
import HourlyChart from '../modules/weather/components/HourlyChart.vue'
import WeeklyForecast from '../modules/weather/components/WeeklyForecast.vue'

const props = defineProps({
  lat: {
    type: Number,
    required: true
  },
  lon: {
    type: Number,
    required: true
  },
  cityName: {
    type: String,
    default: 'Cidade'
  }
})

const weatherStore = useWeatherStore()
const citiesStore = useCitiesStore()

const { currentWeather, hourlyForecast, dailyForecast, isLoading, error, hasData } = storeToRefs(weatherStore)

async function loadCityWeather() {
  const cityInfo = {
    name: props.cityName,
    latitude: props.lat,
    longitude: props.lon
  }
  
  await weatherStore.fetchWeather(props.lat, props.lon, cityInfo)
  citiesStore.setCurrentCity(cityInfo)
}

watch(
  () => [props.lat, props.lon],
  () => {
    loadCityWeather()
  }
)

onMounted(() => {
  loadCityWeather()
})
</script>
