import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getCompleteWeather } from '../services/openMeteo'

export const useWeatherStore = defineStore('weather', () => {
    const currentWeather = ref(null)
    const hourlyForecast = ref([])
    const dailyForecast = ref([])
    const isLoading = ref(false)
    const error = ref(null)
    const lastUpdate = ref(null)
    const location = ref(null)

    const hasData = computed(() => currentWeather.value !== null)
    const isStale = computed(() => {
        if (!lastUpdate.value) return true
        const now = new Date()
        const diff = now - lastUpdate.value
        return diff > 30 * 60 * 1000 // 30 minutos
    })

    async function fetchWeather(lat, lon, cityInfo = null) {
        isLoading.value = true
        error.value = null

        try {
            const data = await getCompleteWeather(lat, lon)

            currentWeather.value = data.current
            hourlyForecast.value = data.hourly
            dailyForecast.value = data.daily
            lastUpdate.value = new Date()

            if (cityInfo) {
                location.value = cityInfo
            } else {
                location.value = { latitude: lat, longitude: lon }
            }

            return data
        } catch (err) {
            error.value = err.message || 'Erro ao buscar dados do clima'
            console.error('Error fetching weather:', err)
            throw err
        } finally {
            isLoading.value = false
        }
    }

    async function refreshWeather() {
        if (!location.value) {
            throw new Error('No location set')
        }

        return fetchWeather(
            location.value.latitude,
            location.value.longitude,
            location.value
        )
    }

    function clearWeather() {
        currentWeather.value = null
        hourlyForecast.value = []
        dailyForecast.value = []
        error.value = null
        lastUpdate.value = null
        location.value = null
    }

    return {
        currentWeather,
        hourlyForecast,
        dailyForecast,
        isLoading,
        error,
        lastUpdate,
        location,
        hasData,
        isStale,
        fetchWeather,
        refreshWeather,
        clearWeather
    }
})
