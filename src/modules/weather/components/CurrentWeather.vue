<template>
  <div class="card-main animate-enter">
    <div class="flex flex-col items-center relative z-10 w-full">

      <h1 class="text-4xl font-extrabold text-slate-800 mb-2 mt-2 tracking-tight">{{ cityName }}</h1>
      <p class="text-slate-500 font-medium capitalize mb-8 text-lg bg-slate-50 px-4 py-1 rounded-lg">{{ weatherDescription }}</p>
      
      <div class="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full max-w-2xl">
        
        <div class="text-center flex-1">
          <div class="w-40 h-40 mx-auto mb-4 text-blue-500 drop-shadow-sm transition-transform hover:scale-105 duration-300">
             <WeatherIcon :weather-code="weather.weatherCode" />
          </div>
          <div class="relative inline-block">
             <span class="text-9xl font-bold text-slate-800 tracking-tighter">{{ weather.temperature }}°</span>
          </div>
        </div>

        <div class="bg-slate-50 rounded-3xl p-8 min-w-[240px] border border-slate-100 shadow-sm flex-1 w-full md:w-auto">
           <div class="space-y-6">
              <div class="flex items-center justify-between">
                 <div class="flex items-center gap-3">
                    <div class="p-2 bg-white rounded-full text-slate-400 shadow-sm">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                    <span class="text-slate-500 font-medium">Sensação</span>
                 </div>
                 <span class="text-xl font-bold text-slate-700">{{ weather.feelsLike }}°</span>
              </div>
              <div class="w-full h-px bg-slate-200/60"></div>
           </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import WeatherIcon from './WeatherIcon.vue'
import { getWeatherDescription } from '../../../shared/utils/weatherCodes'

const props = defineProps({
  weather: {
    type: Object,
    required: true
  },
  cityName: {
    type: String,
    default: 'Cidade'
  }
})

const weatherDescription = computed(() => 
  getWeatherDescription(props.weather.weatherCode)
)
</script>
