<template>
  <div class="container mx-auto px-4 py-8 animate-fade-in">
    <div v-if="isLoading" class="flex justify-center items-center min-h-[60vh]">
      <LoadingSpinner size="lg" />
    </div>
    
    <ErrorMessage
      v-else-if="error"
      :message="error"
      :retry="true"
      @retry="initWeather"
    />
    
    <div v-else-if="hasData" class="space-y-6">
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
    
    <div v-else class="text-center py-12">
      <p class="text-gray-600 dark:text-gray-400">
        Carregando dados do clima...
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useWeatherStore } from '../modules/weather/stores/weather'
import { useCitiesStore } from '../modules/location/stores/cities'
import { getCurrentPosition } from '../modules/location/services/geolocation'
import { reverseGeocode } from '../modules/location/services/geocoding'

import LoadingSpinner from '../shared/ui/LoadingSpinner.vue'
import ErrorMessage from '../shared/ui/ErrorMessage.vue'
import RecentCities from '../modules/location/components/RecentCities.vue'
import CurrentWeather from '../modules/weather/components/CurrentWeather.vue'
import WeatherDetails from '../modules/weather/components/WeatherDetails.vue'
import HourlyForecast from '../modules/weather/components/HourlyForecast.vue'
import HourlyChart from '../modules/weather/components/HourlyChart.vue'
import WeeklyForecast from '../modules/weather/components/WeeklyForecast.vue'

const weatherStore = useWeatherStore()
const citiesStore = useCitiesStore()

const { currentWeather, hourlyForecast, dailyForecast, isLoading, error, hasData } = storeToRefs(weatherStore)

const cityName = ref('Sua Localização')

async function initWeather() {
  try {
    // loc
    const position = await getCurrentPosition()
    
    // Cidade
    const city = await reverseGeocode(position.latitude, position.longitude)
    if (city) {
      cityName.value = city.name
      citiesStore.setCurrentCity(city)
    }
    
    await weatherStore.fetchWeather(position.latitude, position.longitude, city)
  } catch (err) {
    console.error('Error initializing weather:', err)
  }
}

onMounted(() => {
  citiesStore.loadRecent()
  initWeather()
})
</script>
