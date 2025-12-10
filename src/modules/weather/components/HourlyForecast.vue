<template>
  <div class="animate-enter delay-100 mt-6">
    <h3 class="text-lg font-bold text-slate-800 mb-4 px-1">Nas próximas horas</h3>
    
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto pb-2 -mb-2 scrollbar-none">
        <div class="flex gap-8 min-w-max">
          <div
            v-for="(hour, index) in hourly"
            :key="index"
            class="flex flex-col items-center gap-3 min-w-[60px]"
          >
            <span class="text-sm font-medium text-slate-400">{{ getHour(hour.time) }}</span>
            <div class="w-8 h-8 text-slate-600 my-1">
               <WeatherIcon :weather-code="hour.weatherCode" />
            </div>
            <span class="text-lg font-bold text-slate-800">{{ hour.temperature }}°</span>
            
            <!-- probabilidade de chuva -->
            <div v-if="hour.precipitationProbability > 0" class="text-xs font-semibold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md">
              {{ hour.precipitationProbability }}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import WeatherIcon from './WeatherIcon.vue'
import { getHour } from '../../../shared/utils/dateTime'

defineProps({
  hourly: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
